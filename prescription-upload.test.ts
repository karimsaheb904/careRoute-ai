import { describe, it, expect } from "vitest";
import {
  validatePrescriptionFile,
  formatFileSize,
  getCameraErrorMessage,
  evaluateExtractionConfidence,
  buildPrescriptionRecord,
  MAX_PRESCRIPTION_FILE_SIZE,
} from "./prescription-upload";
import { MedicationItem } from "@/lib/safety/safety-rules";

describe("Prescription Photo Capture & File Upload Tests", () => {
  describe("File Validation & Format Support (JPG, PNG, PDF)", () => {
    it("accepts valid JPG file under 10 MB", () => {
      const result = validatePrescriptionFile({
        name: "prescription_dr_srinivas.jpg",
        size: 2.4 * 1024 * 1024,
        type: "image/jpeg",
      });
      expect(result.valid).toBe(true);
      expect(result.fileType).toBe("image");
    });

    it("accepts valid PNG file under 10 MB", () => {
      const result = validatePrescriptionFile({
        name: "rx_scan.png",
        size: 1.1 * 1024 * 1024,
        type: "image/png",
      });
      expect(result.valid).toBe(true);
      expect(result.fileType).toBe("image");
    });

    it("accepts valid PDF document under 10 MB", () => {
      const result = validatePrescriptionFile({
        name: "hospital_discharge_rx.pdf",
        size: 450 * 1024,
        type: "application/pdf",
      });
      expect(result.valid).toBe(true);
      expect(result.fileType).toBe("pdf");
    });

    it("rejects files exceeding the 10 MB size limit", () => {
      const oversized = validatePrescriptionFile({
        name: "high_res_scan.jpg",
        size: 11 * 1024 * 1024, // 11 MB
        type: "image/jpeg",
      });
      expect(oversized.valid).toBe(false);
      expect(oversized.error).toContain("10 MB limit");
    });

    it("rejects unsupported file formats like DOCX or EXE", () => {
      const invalidDoc = validatePrescriptionFile({
        name: "notes.docx",
        size: 500 * 1024,
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      expect(invalidDoc.valid).toBe(false);
      expect(invalidDoc.error).toContain("Unsupported file format");

      const invalidExe = validatePrescriptionFile({
        name: "script.exe",
        size: 100 * 1024,
        type: "application/x-msdownload",
      });
      expect(invalidExe.valid).toBe(false);
    });
  });

  describe("File Size Formatting", () => {
    it("formats bytes, kilobytes, and megabytes cleanly", () => {
      expect(formatFileSize(512)).toBe("512 B");
      expect(formatFileSize(1024 * 350)).toBe("350.0 KB");
      expect(formatFileSize(1024 * 1024 * 2.5)).toBe("2.5 MB");
    });
  });

  describe("Camera Error Mapping (Bilingual English + Telugu)", () => {
    it("returns helpful guidance when camera permission is denied", () => {
      const err = { name: "NotAllowedError", message: "Permission denied" };
      const res = getCameraErrorMessage(err);
      expect(res.en).toContain("Camera permission denied");
      expect(res.en).toContain("file upload instead");
      expect(res.te).toContain("కెమెరా అనుమతి నిరాకరించబడింది");
    });

    it("handles missing device / camera not found", () => {
      const err = { name: "NotFoundError", message: "No device found" };
      const res = getCameraErrorMessage(err);
      expect(res.en).toContain("No camera found on this device");
      expect(res.te).toContain("ఈ పరికరంలో కెమెరా కనుగొనబడలేదు");
    });

    it("handles camera in use by another app", () => {
      const err = { name: "NotReadableError", message: "Could not start video source" };
      const res = getCameraErrorMessage(err);
      expect(res.en).toContain("Camera is currently in use");
      expect(res.te).toContain("కెమెరా మరొక అప్లికేషన్ ద్వారా ఉపయోగించబడుతోంది");
    });
  });

  describe("Extraction Confidence & Medical Safety Evaluation", () => {
    it("flags unclear fields when confidence is below 80% or isUnclear is true", () => {
      const sampleMeds: MedicationItem[] = [
        {
          id: "m1",
          name: { value: "Telmisartan", isUnclear: false, confidence: 0.95 },
          dose: { value: null, isUnclear: true, confidence: 0.5, flaggedReason: "Illegible handwriting" },
          unit: { value: "mg", isUnclear: false, confidence: 0.95 },
          frequency: { value: "Once daily", isUnclear: false, confidence: 0.9 },
          duration: { value: "30 days", isUnclear: false, confidence: 0.9 },
          timingFood: { value: "after_food", isUnclear: false, confidence: 0.9 },
        },
      ];

      const evalResult = evaluateExtractionConfidence(sampleMeds);
      expect(evalResult.isReviewRequired).toBe(true);
      expect(evalResult.unclearCount).toBeGreaterThanOrEqual(1);
    });

    it("enforces SC3: built prescription records always start with status 'needs_review'", () => {
      const sampleMeds: MedicationItem[] = [
        {
          id: "m2",
          name: { value: "Metformin", isUnclear: false, confidence: 0.98 },
          dose: { value: "500mg", isUnclear: false, confidence: 0.98 },
          unit: { value: "mg", isUnclear: false, confidence: 0.98 },
          frequency: { value: "Twice daily", isUnclear: false, confidence: 0.95 },
          duration: { value: "30 days", isUnclear: false, confidence: 0.95 },
          timingFood: { value: "after_food", isUnclear: false, confidence: 0.95 },
        },
      ];

      const record = buildPrescriptionRecord({
        patientId: "p-01",
        patientName: "Ramesh Varma",
        medications: sampleMeds,
        imageUrl: "data:image/jpeg;base64,sample-image-data",
        fileType: "image",
        fileName: "doctor_rx.jpg",
      });

      expect(record.status).toBe("needs_review"); // SC3 strictly locked
      expect(record.imageUrl).toBe("data:image/jpeg;base64,sample-image-data");
      expect(record.fileType).toBe("image");
      expect(record.fileName).toBe("doctor_rx.jpg");
    });
  });
});
