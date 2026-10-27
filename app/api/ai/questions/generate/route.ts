import { QuestionIntelligenceService } from "@/lib/ai/services/questionIntelligenceService";
import { checkRateLimit } from "@/lib/security/rateLimiter";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request: Request) {
  // 1. Rate Limiting: 25 requests per minute per IP
  const rateLimit = checkRateLimit(request, {
    keyPrefix: "ai-question-generate",
    maxRequests: 25,
    windowMs: 60 * 1000,
  });

  if (!rateLimit.allowed) {
    return NextResponse.json(
      {
        success: false,
        error: `Rate limit exceeded. Please wait ${rateLimit.retryAfterSeconds} seconds before requesting AI question generation.`,
        errorCode: "RATE_LIMIT_EXCEEDED",
        retryAfter: rateLimit.retryAfterSeconds,
      },
      {
        status: 429,
        headers: rateLimit.headers,
      }
    );
  }

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

    const isBatchRequest =
      Boolean(body.isBatch) ||
      (typeof body.questionCount === "number" && body.questionCount > 1) ||
      body.sourceMode === "syllabus" ||
      body.sourceMode === "text";

    if (isBatchRequest) {
      const batchResult = await QuestionIntelligenceService.generateBatch(body);
      if (!batchResult.success) {
        const statusCode =
          batchResult.errorCode === "CONFIGURATION_ERROR"
            ? 503
            : batchResult.errorCode === "INVALID_INPUT"
            ? 400
            : batchResult.errorCode === "MALFORMED_JSON" || batchResult.errorCode === "SCHEMA_VALIDATION_FAILURE"
            ? 422
            : 500;

        return NextResponse.json(
          {
            success: false,
            error: batchResult.error,
            errorCode: batchResult.errorCode,
          },
          { status: statusCode }
        );
      }

      return NextResponse.json({
        success: true,
        isBatch: true,
        documentTitle: batchResult.documentTitle,
        summary: batchResult.summary,
        detectedSubject: batchResult.detectedSubject,
        detectedTopic: batchResult.detectedTopic,
        data: batchResult.questions.map((item) => item.question),
        items: batchResult.questions,
        count: batchResult.questions.length,
        validationSummary: {
          total: batchResult.questions.length,
          approved: batchResult.questions.filter((q) => q.validation.recommendedStatus === "approved").length,
          averageQualityScore: Math.round(
            batchResult.questions.reduce((sum, q) => sum + (q.validation.qualityScore || 0), 0) /
              (batchResult.questions.length || 1)
          ),
        },
        metadata: {
          modelUsed: batchResult.modelUsed,
          latencyMs: batchResult.latencyMs,
          tokenUsage: batchResult.tokenUsage,
        },
      });
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
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Internal server error occurred during question generation.";
    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
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
