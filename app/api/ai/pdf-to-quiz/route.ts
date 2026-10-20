import { NextResponse } from "next/server";
import { QuestionIntelligenceService } from "@/lib/ai/services/questionIntelligenceService";
import { ExtractedQuestion } from "@/lib/types/ocr";

export const runtime = "nodejs";

// Maximum upload size: 50MB
const MAX_FILE_SIZE_BYTES = 50 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    let formData: FormData;
    try {
      formData = await request.formData();
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid multipart form data in request.",
          errorCode: "INVALID_FORM_DATA",
        },
        { status: 400 }
      );
    }

    const file = formData.get("file");
    if (!file || typeof file === "string" || !(file instanceof Blob)) {
      return NextResponse.json(
        {
          success: false,
          error: "No PDF file provided. Please attach a 'file' parameter with your PDF document.",
          errorCode: "MISSING_FILE",
        },
        { status: 400 }
      );
    }

    const fileName = (file as any).name || "uploaded_document.pdf";

    // 1. Validate file extension
    if (!fileName.toLowerCase().endsWith(".pdf")) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported file format '${fileName}'. Only PDF documents (.pdf) are supported.`,
          errorCode: "INVALID_FILE_TYPE",
        },
        { status: 400 }
      );
    }

    // 2. Validate file size
    if (file.size === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "The uploaded PDF document is empty (0 bytes).",
          errorCode: "EMPTY_FILE",
        },
        { status: 400 }
      );
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `The uploaded PDF exceeds the 50MB limit (${(file.size / (1024 * 1024)).toFixed(1)}MB).`,
          errorCode: "FILE_TOO_LARGE",
        },
        { status: 413 }
      );
    }

    // 3. Extract buffer and verify magic bytes (%PDF-)
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const pdfHeader = buffer.subarray(0, 5).toString("utf-8");
    if (!pdfHeader.startsWith("%PDF-")) {
      return NextResponse.json(
        {
          success: false,
          error: "The uploaded file does not contain a valid PDF signature header (%PDF-).",
          errorCode: "MALFORMED_PDF",
        },
        { status: 400 }
      );
    }

    // Parse optional generation parameters
    const subject = (formData.get("subject") as string) || undefined;
    const topic = (formData.get("topic") as string) || undefined;
    const difficulty = (formData.get("difficulty") as any) || "Medium";
    const rawCount = formData.get("questionCount");
    const questionCount = rawCount ? Math.min(25, Math.max(1, parseInt(String(rawCount), 10))) : 5;

    // 4. Invoke QuestionIntelligenceService for multimodal document processing
    const result = await QuestionIntelligenceService.generateBatchFromDocumentBuffer(
      buffer,
      "application/pdf",
      {
        subject: subject || "General Academic",
        topic: topic || undefined,
        difficulty,
        questionCount,
        questionTypes: ["mcq_single", "true_false", "fill_in_the_blank", "match_following"],
      }
    );

    if (!result.success) {
      const statusCode =
        result.errorCode === "CONFIGURATION_ERROR"
          ? 503
          : result.errorCode === "INVALID_INPUT"
            ? 400
            : result.errorCode === "MALFORMED_JSON" ||
              result.errorCode === "SCHEMA_VALIDATION_FAILURE" ||
              result.errorCode === "NO_QUESTIONS_GENERATED"
              ? 422
              : 500;

      return NextResponse.json(
        {
          success: false,
          error: result.error,
          errorCode: result.errorCode,
        },
        { status: statusCode }
      );
    }

    // 5. Format validated questions into ExtractedQuestion format for the review table
    const formattedQuestions: ExtractedQuestion[] = result.questions.map((item, idx) => {
      const q = item.question;
      const val = item.validation;

      return {
        id: `pdf-gen-${Date.now()}-${idx + 1}`,
        questionNumber: `Question ${idx + 1}`,
        title: q.title,
        description: q.context || undefined,
        type: q.type,
        subject: q.subject,
        category: q.category,
        topic: q.topic,
        subtopic: q.subtopic || undefined,
        difficulty: q.difficulty,
        marks: q.difficulty === "Hard" ? 5 : q.difficulty === "Medium" ? 4 : 2,
        timeLimitSeconds: 60,
        options: (q.options || []).map((opt) => ({
          id: opt.id,
          text: opt.text,
          isCorrect: opt.isCorrect,
        })),
        matchingPairs: q.matchingPairs?.map((mp) => ({
          id: mp.id,
          leftItem: mp.leftItem,
          rightItem: mp.rightItem,
        })),
        fillBlanks: q.fillBlanks,
        explanation: q.generalExplanation,
        hints: q.hints,
        confidence: {
          overall: val.qualityScore || 90,
          ocrAccuracy: 95,
          questionDetection: val.stemClarityScore || 95,
          answerDetection: val.distractorHomogeneityScore || 90,
          tableRecognition: 90,
          handwritingRecognition: 90,
        },
        status: "detected",
      };
    });

    return NextResponse.json({
      success: true,
      fileName,
      fileSize: file.size,
      documentTitle: result.documentTitle || fileName.replace(/\.[^/.]+$/, ""),
      summary: result.summary,
      detectedSubject: result.detectedSubject || subject || "General Academic",
      detectedTopic: result.detectedTopic || topic || "Curriculum Unit",
      count: formattedQuestions.length,
      questions: formattedQuestions,
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
        error: err.message || "An unexpected server error occurred during PDF-to-Quiz processing.",
        errorCode: "INTERNAL_ERROR",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  const health = await QuestionIntelligenceService.checkHealth();
  return NextResponse.json({
    service: "QuizDorm AI PDF-to-Quiz Endpoint",
    version: "v1.0",
    status: health.configured ? "ready" : "unconfigured",
    provider: health.providerId,
    activeModel: health.model,
    maxUploadSizeBytes: MAX_FILE_SIZE_BYTES,
    supportedTypes: ["mcq_single", "mcq_multiple", "true_false"],
  });
}
