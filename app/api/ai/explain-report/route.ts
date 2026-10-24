import { NextRequest, NextResponse } from "next/server";
import { ReportExplanationRequestSchema } from "@/lib/ai/schemas";
import { explainMedicalReportWithGemini } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = ReportExplanationRequestSchema.parse(body);
    const result = await explainMedicalReportWithGemini(validatedInput);

    return NextResponse.json({
      success: true,
      data: result,
      mode: result.isLiveAi ? "live_gemini" : "demo_sample",
    });
  } catch (err: any) {
    console.error("API /api/ai/explain-report error:", err);
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to generate report explanation",
      },
      { status: 400 }
    );
  }
}
