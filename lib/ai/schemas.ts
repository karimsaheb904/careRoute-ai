import { z } from "zod";

export const ReportExplanationRequestSchema = z.object({
  reportName: z.string(),
  reportType: z.string(),
  reportDate: z.string(),
  language: z.enum(["en", "te"]).default("en"),
  measurements: z.array(
    z.object({
      testName: z.string(),
      value: z.string(),
      unit: z.string(),
      referenceRangeText: z.string(),
      flag: z.string().optional(),
    })
  ),
});

export const ReportExplanationResponseSchema = z.object({
  simpleSummary: z.string(),
  importantFindings: z.array(z.string()),
  unfamiliarTerms: z.array(
    z.object({
      term: z.string(),
      explanation: z.string(),
    })
  ),
  questionsForDoctor: z.array(z.string()),
  recommendedFollowUp: z.string(),
  safetyDisclaimer: z.string(),
  isLiveAi: z.boolean().default(false),
});

export const PrescriptionAnalysisRequestSchema = z.object({
  rawText: z.string().optional(),
  imageUrl: z.string().optional(),
  language: z.enum(["en", "te"]).default("en"),
});

export const ExtractedMedicineSchema = z.object({
  medicineName: z.string(),
  dosage: z.string(),
  frequency: z.string(),
  timing: z.enum(["before_food", "after_food", "with_food", "empty_stomach", "bedtime"]),
  durationDays: z.number().default(30),
  specificTimes: z.array(z.string()),
  instructionsEn: z.string(),
  instructionsTe: z.string(),
  clarityStatus: z.enum(["clear", "minor_ambiguity", "flagged", "illegible"]),
  flagReason: z.string().optional(),
});

export const PrescriptionAnalysisResponseSchema = z.object({
  doctorName: z.string().default("Consultant Physician"),
  issueDate: z.string().default(new Date().toISOString().split("T")[0]),
  overallHandwritingClarity: z.enum(["clear", "minor_ambiguity", "flagged", "illegible"]),
  hasAmbiguityAlert: z.boolean(),
  medicines: z.array(ExtractedMedicineSchema),
  safetyNotes: z.string(),
  isLiveAi: z.boolean().default(false),
});
