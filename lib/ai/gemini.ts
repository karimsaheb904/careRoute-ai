import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  ReportExplanationRequestSchema,
  ReportExplanationResponseSchema,
  PrescriptionAnalysisRequestSchema,
  PrescriptionAnalysisResponseSchema,
} from "./schemas";
import { z } from "zod";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export async function explainMedicalReportWithGemini(
  input: z.infer<typeof ReportExplanationRequestSchema>
) {
  // 1. If no live API key, return the pre-validated realistic clinical demo response
  if (!genAI || !apiKey) {
    return generateFallbackReportExplanation(input);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2, // Low temperature for factual healthcare accuracy
      },
    });

    const prompt = `
You are a senior healthcare AI communication specialist for CareRoute AI.
Your role is to explain medical laboratory results in simple, calm, educational terms in ${
      input.language === "te" ? "Telugu (తెలుగు)" : "plain English"
    }.
Strict Clinical Guardrails:
1. NEVER diagnose diseases or claim a patient is sick or completely healthy.
2. NEVER prescribe treatments or change medication instructions.
3. Compare provided measurement values against their provided reference ranges.
4. Explain unfamiliar medical acronyms or terms simply.
5. Provide actionable, respectful questions the patient can ask their physician.
6. Provide an explicit safety disclaimer stating this is educational AI, not a diagnostic decision.

Input Data:
Report Name: ${input.reportName}
Report Type: ${input.reportType}
Date: ${input.reportDate}
Language: ${input.language}
Measurements:
${JSON.stringify(input.measurements, null, 2)}

Return a valid JSON object matching this schema:
{
  "simpleSummary": string,
  "importantFindings": string[],
  "unfamiliarTerms": [
    { "term": string, "explanation": string }
  ],
  "questionsForDoctor": string[],
  "recommendedFollowUp": string,
  "safetyDisclaimer": string
}
`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const parsed = JSON.parse(responseText);
    const validated = ReportExplanationResponseSchema.parse({
      ...parsed,
      isLiveAi: true,
    });
    return validated;
  } catch (error) {
    console.error("Gemini API call failed, falling back to safe response:", error);
    return generateFallbackReportExplanation(input);
  }
}

function generateFallbackReportExplanation(
  input: z.infer<typeof ReportExplanationRequestSchema>
) {
  if (input.language === "te") {
    return {
      simpleSummary: `మీ ${input.reportName} నివేదికలో పేర్కొన్న ఫలితాలు ఇక్కడ సరళమైన తెలుగులో వివరించబడ్డాయి. సాధారణ శ్రేణి కంటే కొద్దిగా ఎక్కువ లేదా తక్కువగా ఉన్న కొలతలు గుర్తించబడ్డాయి.`,
      importantFindings: input.measurements
        .filter((m) => m.flag && m.flag !== "normal")
        .map(
          (m) =>
            `${m.testName}: ${m.value} ${m.unit} (సాధారణ పరిధి: ${m.referenceRangeText}) - వైద్యుడితో చర్చించవలసిన విలువ.`
        ),
      unfamiliarTerms: [
        {
          term: "HbA1c",
          explanation: "గత 3 నెలల సగటు రక్తంలో చక్కెర స్థాయిలను సూచిస్తుంది.",
        },
        {
          term: "LDL కొలెస్ట్రాల్",
          explanation: "రక్తనాళాల ఆరోగ్యాన్ని కాపాడటానికి తక్కువగా ఉండవలసిన చెడు కొవ్వు.",
        },
        {
          term: "క్రియాటినిన్",
          explanation: "మూత్రపిండాల సహజ వడపోత సామర్థ్యాన్ని తెలిపే ప్రామాణిక సూచిక.",
        },
      ],
      questionsForDoctor: [
        "ఈ ఫలితాల ఆధారంగా నా ప్రస్తుత ఆహార లేదా మందుల ప్రణాళికలో ఏవైనా మార్పులు చేయాలా?",
        "తదుపరి పరీక్షను ఎన్ని వారాలు లేదా నెలల తర్వాత చేయించుకోవాలి?",
      ],
      recommendedFollowUp: "ఈ ల్యాబ్ ఫలితాల సమీక్ష కొరకు మీ వైద్యుడిని సంప్రదించండి.",
      safetyDisclaimer:
        "ఈ సమాచారం కేవలం రోగి అవగాహన కోసం మాత్రమే. ఇది అధికారిక వైద్య నిర్ధారణ లేదా చికిత్స కాదు. (డెమో మోడ్)",
      isLiveAi: false,
    };
  }

  return {
    simpleSummary: `Your ${input.reportName} diagnostic report results have been translated into plain language. Key biomarkers have been compared directly against the lab's reference ranges.`,
    importantFindings: input.measurements
      .filter((m) => m.flag && m.flag !== "normal")
      .map(
        (m) =>
          `${m.testName}: Measured at ${m.value} ${m.unit} (Standard lab range: ${m.referenceRangeText}) - Noted as outside standard baseline.`
      ),
    unfamiliarTerms: [
      {
        term: "HbA1c (Glycated Hemoglobin)",
        explanation: "Measures average blood glucose attached to red blood cells over the prior 90 to 120 days.",
      },
      {
        term: "LDL Cholesterol",
        explanation: "Commonly termed 'bad cholesterol'; optimal cardiovascular guidelines recommend maintaining lower levels.",
      },
      {
        term: "Creatinine & eGFR",
        explanation: "Key laboratory indicators reflecting the filtration efficiency of healthy kidneys.",
      },
    ],
    questionsForDoctor: [
      "Are my out-of-range values expected with my current regimen or should we consider adjustments?",
      "When would you recommend repeating these diagnostic tests?",
    ],
    recommendedFollowUp: "Schedule a routine consultation with your physician to review these laboratory results.",
    safetyDisclaimer:
      "This educational explanation is generated for patient communication and comprehension. It does not replace clinical consultation or diagnostic judgment. (Demo Mode)",
    isLiveAi: false,
  };
}

export async function analyzePrescriptionWithGemini(
  input: z.infer<typeof PrescriptionAnalysisRequestSchema>
) {
  if (!genAI || !apiKey) {
    return generateFallbackPrescriptionAnalysis(input);
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.1,
      },
    });

    const prompt = `
You are a prescription safety analysis AI for CareRoute AI.
Extract medicines, dosages, timing, frequency, and instructions from this prescription note.
Strict Rules:
1. NEVER guess or invent an illegible medicine name. If handwriting or numeral is unclear, flag clarityStatus as "flagged" or "illegible".
2. If dosage numeral is ambiguous (e.g. 1mg vs 2mg), flag it explicitly in flagReason and set hasAmbiguityAlert: true.
3. Provide instructions in both English and Telugu.
4. State safety warning that dose reminders require authorized clinical verification.

Prescription Text:
${input.rawText || "Rx: Metformin 500mg BD after food; Telmisartan 40mg OD morning."}

Output Schema JSON:
{
  "doctorName": string,
  "issueDate": string,
  "overallHandwritingClarity": "clear" | "minor_ambiguity" | "flagged" | "illegible",
  "hasAmbiguityAlert": boolean,
  "medicines": [
    {
      "medicineName": string,
      "dosage": string,
      "frequency": string,
      "timing": "before_food" | "after_food" | "with_food" | "empty_stomach" | "bedtime",
      "durationDays": number,
      "specificTimes": string[],
      "instructionsEn": string,
      "instructionsTe": string,
      "clarityStatus": "clear" | "flagged",
      "flagReason": string (optional)
    }
  ],
  "safetyNotes": string
}
`;

    const result = await model.generateContent(prompt);
    const parsed = JSON.parse(result.response.text());
    return PrescriptionAnalysisResponseSchema.parse({
      ...parsed,
      isLiveAi: true,
    });
  } catch (error) {
    console.error("Gemini prescription analysis failed, using fallback:", error);
    return generateFallbackPrescriptionAnalysis(input);
  }
}

function generateFallbackPrescriptionAnalysis(
  input: z.infer<typeof PrescriptionAnalysisRequestSchema>
) {
  void input;
  return {
    doctorName: "Dr. Anita Sharma, MD",
    issueDate: new Date().toISOString().split("T")[0],
    overallHandwritingClarity: "clear" as const,
    hasAmbiguityAlert: false,
    medicines: [
      {
        medicineName: "Metformin Hydrochloride",
        dosage: "500 mg",
        frequency: "Twice daily",
        timing: "after_food" as const,
        durationDays: 60,
        specificTimes: ["08:30", "20:30"],
        instructionsEn: "Take 1 tablet twice daily with water immediately after breakfast and dinner.",
        instructionsTe: "ఉదయం మరియు రాత్రి భోజనం తర్వాత 1 టాబ్లెట్ నీటితో తీసుకోండి.",
        clarityStatus: "clear" as const,
      },
      {
        medicineName: "Telmisartan",
        dosage: "40 mg",
        frequency: "Once daily",
        timing: "after_food" as const,
        durationDays: 60,
        specificTimes: ["09:00"],
        instructionsEn: "Take 1 tablet every morning after breakfast for blood pressure control.",
        instructionsTe: "రక్తపోటు నియంత్రణకు ప్రతి ఉదయం అల్పాహారం తర్వాత 1 టాబ్లెట్ తీసుకోండి.",
        clarityStatus: "clear" as const,
      },
    ],
    safetyNotes:
      "All extracted instructions require authorized clinic staff sign-off before scheduling automated dose reminders.",
    isLiveAi: false,
  };
}
