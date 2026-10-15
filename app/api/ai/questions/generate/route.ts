import { NextResponse } from "next/server";
import { QuestionIntelligenceService } from "@/lib/ai/services/questionIntelligenceService";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid JSON request payload.",
          errorCode: "INVALID_BODY",
        },
        { status: 400 }
      );
    }

    const result = await QuestionIntelligenceService.generateAndValidate(body);

    if (!result.success) {
      const statusCode =
        result.errorCode === "CONFIGURATION_ERROR"
          ? 503
          : result.errorCode === "INVALID_INPUT"
            ? 400
            : result.errorCode === "MALFORMED_JSON" || result.errorCode === "SCHEMA_ERROR"
              ? 422
              : 500;

      return NextResponse.json(
        {
          success: false,
          error: result.error,
          errorCode: result.errorCode,
          validation: result.validation,
        },
        { status: statusCode }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.question,
      validation: result.validation,
      metadata: {
        modelUsed: result.modelUsed,
        latencyMs: result.latencyMs,
        tokenUsage: result.tokenUsage,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Internal server error occurred during question generation.",
        errorCode: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const health = await QuestionIntelligenceService.checkHealth();
  return NextResponse.json({
    service: "QuizDorm Question Intelligence API",
    version: "v1.0",
    status: health.configured ? "ready" : "unconfigured",
    provider: health.providerId,
    activeModel: health.model,
    configured: health.configured,
  });
}
