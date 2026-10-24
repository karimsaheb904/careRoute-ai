import { NextRequest, NextResponse } from "next/server";
import { PrescriptionAnalysisRequestSchema } from "@/lib/ai/schemas";
import { analyzePrescriptionWithGemini } from "@/lib/ai/gemini";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validatedInput = PrescriptionAnalysisRequestSchema.parse(body);
    const result = await analyzePrescriptionWithGemini(validatedInput);

    return NextResponse.json({
      success: true,
      data: result,
      mode: result.isLiveAi ? "live_gemini" : "demo_sample",
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Failed to analyze prescription";
    console.error("API /api/ai/verify-prescription error:", err);
    return NextResponse.json(
      {
        success: false,
        error: errorMsg,
      },
      { status: 400 }
    );
  }
}
