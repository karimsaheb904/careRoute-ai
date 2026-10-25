import { describe, it, expect } from "vitest";
import {
  stripPatientIdentifiers,
  PrescriptionExtractionOutputSchema,
  ReportExplanationOutputSchema,
  getSamplePrescriptionExtraction,
  getSampleReportExplanation,
  callGeminiSafe,
} from "./gemini-pipeline";

describe("Gemini AI Pipeline & Zod Validation Unit Tests (Phase 9)", () => {
  describe("Privacy by Design: Patient Identifier Redaction", () => {
    it("redacts patient names, MRN/IDs, and phone/Aadhaar numbers from raw notes", () => {
      const rawWithPII =
        "Patient Name: Ramesh Varma, ID: P-7821. Phone: 987654321099. Rx: Tab Telmisartan 40mg.";

      const sanitized = stripPatientIdentifiers(rawWithPII);
      expect(sanitized).not.toContain("Ramesh Varma");
      expect(sanitized).toContain("[ANONYMIZED_PATIENT]");
      expect(sanitized).not.toContain("P-7821");
      expect(sanitized).toContain("[ANONYMIZED_ID]");
      expect(sanitized).not.toContain("987654321099");
      expect(sanitized).toContain("[PHONE_OR_AADHAAR_REDACTED]");
      expect(sanitized).toContain("Tab Telmisartan 40mg"); // Clinical content preserved
    });
  });

  describe("Zod Output Schema Validation", () => {
    it("validates well-formed prescription extraction JSON", () => {
      const sample = getSamplePrescriptionExtraction();
      const validation = PrescriptionExtractionOutputSchema.safeParse(sample);
      expect(validation.success).toBe(true);
      if (validation.success) {
        expect(validation.data.medications.length).toBeGreaterThanOrEqual(1);
        expect(validation.data.medications[0].name.value).toBe("Telmisartan");
      }
    });

    it("rejects malformed extraction JSON missing required fields", () => {
      const invalidData = {
        rawSummary: "Incomplete",
        medications: [
          {
            // Missing name, dose, unit, frequency etc.
            dose: "40mg",
          },
        ],
      };

      const validation = PrescriptionExtractionOutputSchema.safeParse(invalidData);
      expect(validation.success).toBe(false);
    });

    it("validates well-formed report explanation JSON", () => {
      const sampleReport = getSampleReportExplanation();
      const validation = ReportExplanationOutputSchema.safeParse(sampleReport);
      expect(validation.success).toBe(true);
      if (validation.success) {
        expect(validation.data.measurements[0].testCode).toBe("CHOL");
        expect(validation.data.questionsForDoctorEn.length).toBeGreaterThan(0);
      }
    });
  });

  describe("SC7 Compliance: Missing API Key Graceful Fallback", () => {
    it("returns certified sample data with setup instructions when GEMINI_API_KEY is not set", async () => {
      // Ensure no live key in test environment
      const originalKey = process.env.GEMINI_API_KEY;
      delete process.env.GEMINI_API_KEY;

      const result = await callGeminiSafe({
        systemPrompt: "Extract prescription",
        userPrompt: "Tab Telmisartan 40mg",
        schema: PrescriptionExtractionOutputSchema,
        sampleFallback: getSamplePrescriptionExtraction,
      });

      expect(result.isSample).toBe(true);
      expect(result.modelUsed).toBe("synthetic-sample-generator");
      expect(result.setupInstructions).toContain("GEMINI_API_KEY is not configured");
      expect(result.data.medications.length).toBeGreaterThanOrEqual(1);

      // Restore key
      if (originalKey) process.env.GEMINI_API_KEY = originalKey;
    });
  });
});
