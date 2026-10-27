import {
QuestionIntelligenceValidator,
QuestionValidationResult,
ValidationIssue,
} from "../../quality/questionIntelligenceValidator";
import {
BatchQuestionGenerationInputSchema,
GeneratedQuestion,
GeneratedQuestionSchema,
PdfQuestionGenerationInputSchema,
QuestionGenerationInputSchema
} from "../schemas/questionGenerationSchema";
import {
AIConfigurationError,
AIProviderError,
IQuestionIntelligenceProvider,
} from "../server/IQuestionIntelligenceProvider";
import { DocumentFallbackSynthesizer } from "../server/documentFallbackSynthesizer";
import { GeminiQuestionProvider } from "../server/geminiQuestionProvider";
import { DocumentTextExtractor } from "../server/pdfTextExtractor";

export interface QuestionIntelligenceResult {
  success: boolean;
  question?: GeneratedQuestion;
  validation: QuestionValidationResult;
  modelUsed?: string;
  latencyMs?: number;
  tokenUsage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  error?: string;
  errorCode?: string;
}

export interface DocumentQuestionItemResult {
  question: GeneratedQuestion;
  validation: QuestionValidationResult;
}

export interface DocumentQuestionsResult {
  success: boolean;
  documentTitle?: string;
  summary?: string;
  detectedSubject?: string;
  detectedTopic?: string;
  questions: DocumentQuestionItemResult[];
  modelUsed?: string;
  latencyMs?: number;
  tokenUsage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
  warning?: string;
  error?: string;
  errorCode?: string;
}

export class QuestionIntelligenceService {
  private static defaultProvider: IQuestionIntelligenceProvider =
    new GeminiQuestionProvider();

  /**
   * Set custom provider for testing or provider switching
   */
  public static setProvider(provider: IQuestionIntelligenceProvider): void {
    this.defaultProvider = provider;
  }

  /**
   * Get active provider
   */
  public static getProvider(): IQuestionIntelligenceProvider {
    return this.defaultProvider;
  }

  /**
   * Generate, structure, and validate an intelligent educational question
   */
  public static async generateAndValidate(
    rawInput: unknown,
    options?: {
      providerOverride?: IQuestionIntelligenceProvider;
      modelOverride?: string;
      timeoutMs?: number;
    }
  ): Promise<QuestionIntelligenceResult> {
    // 1. Validate input parameters
    const parsedInput = QuestionGenerationInputSchema.safeParse(rawInput);
    if (!parsedInput.success) {
      const errorMsg = parsedInput.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      return {
        success: false,
        validation: {
          isValid: false,
          issues: [
            {
              code: "INVALID_INPUT_PARAMETERS",
              field: "metadata",
              severity: "error",
              message: `Invalid input specification: ${errorMsg}`,
            },
          ],
          qualityScore: 0,
          stemClarityScore: 0,
          distractorHomogeneityScore: 0,
          recommendedStatus: "rejected",
          summary: `Generation request rejected due to invalid input parameters: ${errorMsg}`,
        },
        error: errorMsg,
        errorCode: "INVALID_INPUT",
      };
    }

    const provider = options?.providerOverride || this.defaultProvider;

    // 2. Invoke AI Provider
    let rawResult;
    try {
      rawResult = await provider.generateQuestionRaw(parsedInput.data, {
        modelOverride: options?.modelOverride,
        timeoutMs: options?.timeoutMs,
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      const errorCode =
        err instanceof AIConfigurationError
          ? "CONFIGURATION_ERROR"
          : err instanceof AIProviderError
            ? "PROVIDER_ERROR"
            : "EXECUTION_ERROR";

      return {
        success: false,
        validation: {
          isValid: false,
          issues: [
            {
              code: errorCode,
              field: "metadata",
              severity: "error",
              message: errMsg || "Failed to generate question from provider",
            },
          ],
          qualityScore: 0,
          stemClarityScore: 0,
          distractorHomogeneityScore: 0,
          recommendedStatus: "rejected",
          summary: `Generation failed: ${errMsg}`,
        },
        error: errMsg,
        errorCode,
      };
    }

    // 3. Parse JSON Output
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawResult.rawJsonString);
    } catch (jsonErr: unknown) {
      const jsonErrMsg = jsonErr instanceof Error ? jsonErr.message : String(jsonErr);
      return {
        success: false,
        validation: {
          isValid: false,
          issues: [
            {
              code: "MALFORMED_JSON_OUTPUT",
              field: "metadata",
              severity: "error",
              message: `AI provider produced malformed non-JSON output: ${jsonErrMsg}`,
            },
          ],
          qualityScore: 0,
          stemClarityScore: 0,
          distractorHomogeneityScore: 0,
          recommendedStatus: "rejected",
          summary: "Generation failed: AI returned invalid JSON.",
        },
        error: `Malformed JSON response from AI provider: ${jsonErrMsg}`,
        errorCode: "MALFORMED_JSON",
        latencyMs: rawResult.latencyMs,
      };
    }

    // Normalize array or envelope wrapper if AI returned [ question ] or { questions: [ ... ] }
    let questionData = parsedJson;
    if (Array.isArray(parsedJson) && parsedJson.length > 0) {
      questionData = parsedJson[0];
    } else if (
      parsedJson &&
      typeof parsedJson === "object" &&
      "questions" in (parsedJson as Record<string, unknown>) &&
      Array.isArray((parsedJson as Record<string, unknown>).questions) &&
      ((parsedJson as Record<string, unknown>).questions as unknown[]).length > 0
    ) {
      questionData = ((parsedJson as Record<string, unknown>).questions as unknown[])[0];
    }

    // 4. Validate output with Runtime Zod Schema
    const zodResult = GeneratedQuestionSchema.safeParse(questionData);
    if (!zodResult.success) {
      const issues = zodResult.error.issues.map((i) => ({
        code: "SCHEMA_VALIDATION_FAILURE",
        field: (String(i.path[0]) as ValidationIssue["field"]) || "metadata",
        severity: "error" as const,
        message: `${i.path.join(".")}: ${i.message}`,
      }));

      return {
        success: false,
        validation: {
          isValid: false,
          issues,
          qualityScore: 30,
          stemClarityScore: 40,
          distractorHomogeneityScore: 20,
          recommendedStatus: "rejected",
          summary: "Generated question failed runtime schema validation.",
        },
        error: "Generated question failed runtime schema validation.",
        errorCode: "SCHEMA_ERROR",
        latencyMs: rawResult.latencyMs,
      };
    }

    // 5. Deep Pedagogical & Quality Gate Validation
    const validation = QuestionIntelligenceValidator.validate(zodResult.data);

    return {
      success: validation.isValid,
      question: zodResult.data,
      validation,
      modelUsed: rawResult.modelUsed,
      latencyMs: rawResult.latencyMs,
      tokenUsage: rawResult.tokenUsage,
    };
  }

  /**
   * Generate, structure, and validate batch questions from a PDF document buffer
   */
  public static async generateBatchFromDocumentBuffer(
    buffer: Buffer,
    mimeType: string,
    rawInput: unknown,
    options?: {
      providerOverride?: IQuestionIntelligenceProvider;
      modelOverride?: string;
      timeoutMs?: number;
    }
  ): Promise<DocumentQuestionsResult> {
    const parsedInput = PdfQuestionGenerationInputSchema.safeParse(rawInput || {});
    if (!parsedInput.success) {
      const errorMsg = parsedInput.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      return {
        success: false,
        questions: [],
        error: `Invalid input parameters: ${errorMsg}`,
        errorCode: "INVALID_INPUT",
      };
    }

    const provider = options?.providerOverride || this.defaultProvider;
    if (!provider.generateQuestionsFromDocumentBuffer) {
      return {
        success: false,
        questions: [],
        error: `Active provider '${provider.id}' does not support direct document processing.`,
        errorCode: "UNSUPPORTED_OPERATION",
      };
    }

    let rawResult;
    try {
      rawResult = await provider.generateQuestionsFromDocumentBuffer(
        buffer,
        mimeType,
        parsedInput.data,
        {
          modelOverride: options?.modelOverride,
          timeoutMs: options?.timeoutMs,
        }
      );
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn(
        `[QuestionIntelligenceService] Primary provider failed: ${errMsg}. Engaging DocumentFallbackSynthesizer...`
      );
      try {
        const extracted = DocumentTextExtractor.extractText(
          buffer,
          mimeType,
          parsedInput.data.fileName
        );
        const synthesized = DocumentFallbackSynthesizer.synthesizeFromExtractedText(
          extracted.text,
          {
            fileName: parsedInput.data.fileName,
            subject: parsedInput.data.subject,
            topic: parsedInput.data.topic,
            questionCount: parsedInput.data.questionCount,
            questionTypes: parsedInput.data.questionTypes,
            difficulty: parsedInput.data.difficulty,
          }
        );

        if (synthesized.questions && synthesized.questions.length > 0) {
          const isConfigError =
            err instanceof AIConfigurationError ||
            errMsg.includes("CONFIGURATION_ERROR") ||
            errMsg.includes("GEMINI_API_KEY");

          return {
            success: true,
            documentTitle: synthesized.documentTitle,
            summary: synthesized.summary,
            detectedSubject: synthesized.detectedSubject,
            detectedTopic: synthesized.detectedTopic,
            questions: synthesized.questions,
            modelUsed: "document-text-synthesizer-fallback",
            latencyMs: 50,
            warning: isConfigError
              ? `AI API key is unconfigured in the server environment. Generated ${synthesized.questions.length} questions directly from document text.`
              : `AI provider encountered an error (${errMsg}). Generated ${synthesized.questions.length} questions directly from document text fallback.`,
          };
        }
      } catch (fallbackErr: unknown) {
        console.error(
          "[QuestionIntelligenceService] DocumentFallbackSynthesizer failed:",
          fallbackErr
        );
      }

      const errorCode =
        err instanceof AIConfigurationError
          ? "CONFIGURATION_ERROR"
          : err instanceof AIProviderError
            ? "PROVIDER_ERROR"
            : "EXECUTION_ERROR";

      return {
        success: false,
        questions: [],
        error: errMsg || "Failed to process document with AI provider",
        errorCode,
      };
    }

    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawResult.rawJsonString);
    } catch (jsonErr: unknown) {
      const jsonErrMsg = jsonErr instanceof Error ? jsonErr.message : String(jsonErr);
      // Fallback synthesis on malformed JSON
      try {
        const extracted = DocumentTextExtractor.extractText(
          buffer,
          mimeType,
          parsedInput.data.fileName
        );
        const synthesized = DocumentFallbackSynthesizer.synthesizeFromExtractedText(
          extracted.text,
          {
            fileName: parsedInput.data.fileName,
            subject: parsedInput.data.subject,
            topic: parsedInput.data.topic,
            questionCount: parsedInput.data.questionCount,
            questionTypes: parsedInput.data.questionTypes,
            difficulty: parsedInput.data.difficulty,
          }
        );

        if (synthesized.questions && synthesized.questions.length > 0) {
          return {
            success: true,
            documentTitle: synthesized.documentTitle,
            summary: synthesized.summary,
            detectedSubject: synthesized.detectedSubject,
            detectedTopic: synthesized.detectedTopic,
            questions: synthesized.questions,
            modelUsed: "document-text-synthesizer-fallback",
            latencyMs: rawResult.latencyMs,
            warning: `AI provider produced malformed output. Recovered by generating ${synthesized.questions.length} questions directly from document text.`,
          };
        }
      } catch {
        // Continue to error return
      }

      return {
        success: false,
        questions: [],
        error: `AI provider produced malformed non-JSON output: ${jsonErrMsg}`,
        errorCode: "MALFORMED_JSON",
        latencyMs: rawResult.latencyMs,
      };
    }

    let rawQuestionsList: unknown[] = [];
    let documentTitle: string | undefined = undefined;
    let summary: string | undefined = undefined;
    let detectedSubject: string | undefined = undefined;
    let detectedTopic: string | undefined = undefined;

    if (Array.isArray(parsedJson)) {
      rawQuestionsList = parsedJson;
    } else if (parsedJson && typeof parsedJson === "object") {
      const obj = parsedJson as Record<string, unknown>;
      documentTitle = typeof obj.documentTitle === "string" ? obj.documentTitle : undefined;
      summary = typeof obj.summary === "string" ? obj.summary : undefined;
      detectedSubject = typeof obj.detectedSubject === "string" ? obj.detectedSubject : undefined;
      detectedTopic = typeof obj.detectedTopic === "string" ? obj.detectedTopic : undefined;

      if (Array.isArray(obj.questions)) {
        rawQuestionsList = obj.questions;
      }
    }

    if (rawQuestionsList.length === 0) {
      // Fallback synthesis if no questions returned
      try {
        const extracted = DocumentTextExtractor.extractText(
          buffer,
          mimeType,
          parsedInput.data.fileName
        );
        const synthesized = DocumentFallbackSynthesizer.synthesizeFromExtractedText(
          extracted.text,
          {
            fileName: parsedInput.data.fileName,
            subject: parsedInput.data.subject,
            topic: parsedInput.data.topic,
            questionCount: parsedInput.data.questionCount,
            questionTypes: parsedInput.data.questionTypes,
            difficulty: parsedInput.data.difficulty,
          }
        );

        if (synthesized.questions && synthesized.questions.length > 0) {
          return {
            success: true,
            documentTitle: synthesized.documentTitle,
            summary: synthesized.summary,
            detectedSubject: synthesized.detectedSubject,
            detectedTopic: synthesized.detectedTopic,
            questions: synthesized.questions,
            modelUsed: "document-text-synthesizer-fallback",
            latencyMs: rawResult.latencyMs,
            warning: `Generated ${synthesized.questions.length} questions directly from document text analysis.`,
          };
        }
      } catch {
        // Continue
      }

      return {
        success: false,
        questions: [],
        error: "AI provider did not identify any valid testable questions in the document.",
        errorCode: "NO_QUESTIONS_GENERATED",
        latencyMs: rawResult.latencyMs,
      };
    }

    const validatedQuestions: DocumentQuestionItemResult[] = [];
    for (const item of rawQuestionsList) {
      const zodCheck = GeneratedQuestionSchema.safeParse(item);
      if (zodCheck.success) {
        const validation = QuestionIntelligenceValidator.validate(zodCheck.data);
        validatedQuestions.push({
          question: zodCheck.data,
          validation,
        });
      }
    }

    if (validatedQuestions.length === 0) {
      try {
        const extracted = DocumentTextExtractor.extractText(
          buffer,
          mimeType,
          parsedInput.data.fileName
        );
        const synthesized = DocumentFallbackSynthesizer.synthesizeFromExtractedText(
          extracted.text,
          {
            fileName: parsedInput.data.fileName,
            subject: parsedInput.data.subject,
            topic: parsedInput.data.topic,
            questionCount: parsedInput.data.questionCount,
            questionTypes: parsedInput.data.questionTypes,
            difficulty: parsedInput.data.difficulty,
          }
        );

        if (synthesized.questions && synthesized.questions.length > 0) {
          return {
            success: true,
            documentTitle: synthesized.documentTitle,
            summary: synthesized.summary,
            detectedSubject: synthesized.detectedSubject,
            detectedTopic: synthesized.detectedTopic,
            questions: synthesized.questions,
            modelUsed: "document-text-synthesizer-fallback",
            latencyMs: rawResult.latencyMs,
            warning: `AI provider questions failed schema validation. Generated ${synthesized.questions.length} valid questions directly from document text.`,
          };
        }
      } catch {
        // Continue
      }

      return {
        success: false,
        questions: [],
        error: "Generated questions failed runtime schema validation.",
        errorCode: "SCHEMA_VALIDATION_FAILURE",
        latencyMs: rawResult.latencyMs,
      };
    }

    return {
      success: true,
      documentTitle,
      summary,
      detectedSubject,
      detectedTopic,
      questions: validatedQuestions,
      modelUsed: rawResult.modelUsed,
      latencyMs: rawResult.latencyMs,
      tokenUsage: rawResult.tokenUsage,
    };
  }

  /**
   * Phase 2.0: Generate, structure, and validate batch questions from any source
   * (Topic, Syllabus/Curriculum, Pasted Text, or Document)
   */
  public static async generateBatch(
    rawInput: unknown,
    options?: {
      providerOverride?: IQuestionIntelligenceProvider;
      modelOverride?: string;
      timeoutMs?: number;
    }
  ): Promise<DocumentQuestionsResult> {
    const parsedInput = BatchQuestionGenerationInputSchema.safeParse(rawInput || {});
    if (!parsedInput.success) {
      const errorMsg = parsedInput.error.issues
        .map((i) => `${i.path.join(".")}: ${i.message}`)
        .join("; ");
      return {
        success: false,
        questions: [],
        error: `Invalid input parameters: ${errorMsg}`,
        errorCode: "INVALID_INPUT",
      };
    }

    const inputData = parsedInput.data;
    const provider = options?.providerOverride || this.defaultProvider;

    if (!provider.generateBatchQuestionsRaw) {
      return {
        success: false,
        questions: [],
        error: `Provider '${provider.id}' does not support batch question generation.`,
        errorCode: "UNSUPPORTED_OPERATION",
      };
    }

    let rawResult;
    try {
      rawResult = await provider.generateBatchQuestionsRaw(inputData, {
        modelOverride: options?.modelOverride,
        timeoutMs: options?.timeoutMs,
      });
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.warn(
        `[QuestionIntelligenceService] Primary provider failed for batch: ${errMsg}. Engaging DocumentFallbackSynthesizer...`
      );
      if (inputData.sourceContent && inputData.sourceContent.length > 20) {
        try {
          const synthesized = DocumentFallbackSynthesizer.synthesizeFromExtractedText(
            inputData.sourceContent,
            {
              questionCount: inputData.questionCount || 5,
              subject: inputData.subject,
              topic: inputData.topic,
            }
          );
          if (synthesized.questions.length > 0) {
            return {
              success: true,
              documentTitle: `${inputData.topic} Assessment`,
              summary: synthesized.summary,
              detectedSubject: inputData.subject,
              detectedTopic: inputData.topic,
              questions: synthesized.questions,
              modelUsed: "document-text-synthesizer-fallback",
              warning: `AI provider call failed (${errMsg}). Generated ${synthesized.questions.length} questions via local fallback synthesizer.`,
            };
          }
        } catch {
          // Continue to error return
        }
      }

      return {
        success: false,
        questions: [],
        error: errMsg || "Failed to generate batch questions from AI provider.",
        errorCode:
          err instanceof AIConfigurationError
            ? "CONFIGURATION_ERROR"
            : (err as { name?: string })?.name === "AITimeoutError"
            ? "TIMEOUT_ERROR"
            : "PROVIDER_ERROR",
      };
    }

    // Parse the JSON envelope
    let parsedJson: unknown;
    try {
      parsedJson = JSON.parse(rawResult.rawJsonString);
    } catch (jsonErr: unknown) {
      const jsonErrMsg = jsonErr instanceof Error ? jsonErr.message : String(jsonErr);
      return {
        success: false,
        questions: [],
        error: `Failed to parse AI provider JSON output: ${jsonErrMsg}`,
        errorCode: "MALFORMED_JSON",
        latencyMs: rawResult.latencyMs,
      };
    }

    // Extract questions array
    const jsonObj = parsedJson && typeof parsedJson === "object" ? (parsedJson as Record<string, unknown>) : null;
    const rawQuestionsArray: unknown[] = Array.isArray(parsedJson)
      ? parsedJson
      : jsonObj && Array.isArray(jsonObj.questions)
      ? jsonObj.questions
      : [];

    if (rawQuestionsArray.length === 0) {
      return {
        success: false,
        questions: [],
        error: "AI provider returned 0 questions in response envelope.",
        errorCode: "EMPTY_QUESTIONS",
        latencyMs: rawResult.latencyMs,
      };
    }

    const validatedQuestions: DocumentQuestionItemResult[] = [];
    for (let i = 0; i < rawQuestionsArray.length; i++) {
      const q = (rawQuestionsArray[i] || {}) as Record<string, unknown>;
      if (!q.subject) q.subject = inputData.subject;
      if (!q.category) q.category = inputData.category || inputData.subject;
      if (!q.topic) q.topic = inputData.topic;
      if (!q.difficulty) q.difficulty = inputData.difficulty;
      if (!q.gradeLevel) q.gradeLevel = inputData.gradeLevel;
      if (!q.bloomsLevel) {
        q.bloomsLevel = inputData.bloomsLevel === "Mixed" ? "Understand" : inputData.bloomsLevel;
      }

      const zodResult = GeneratedQuestionSchema.safeParse(q);
      if (zodResult.success) {
        const qualityValidation = QuestionIntelligenceValidator.validate(zodResult.data);
        validatedQuestions.push({
          question: zodResult.data,
          validation: qualityValidation,
        });
      }
    }

    if (validatedQuestions.length === 0) {
      return {
        success: false,
        questions: [],
        error: "Generated batch questions failed runtime schema validation.",
        errorCode: "SCHEMA_VALIDATION_FAILURE",
        latencyMs: rawResult.latencyMs,
      };
    }

    const docMeta = parsedJson && typeof parsedJson === "object" ? (parsedJson as Record<string, string>) : {};

    return {
      success: true,
      documentTitle: docMeta.documentTitle || `${inputData.topic} Assessment`,
      summary: docMeta.summary || `Assessment covering ${inputData.topic}`,
      detectedSubject: docMeta.detectedSubject || inputData.subject,
      detectedTopic: docMeta.detectedTopic || inputData.topic,
      questions: validatedQuestions,
      modelUsed: rawResult.modelUsed,
      latencyMs: rawResult.latencyMs,
      tokenUsage: rawResult.tokenUsage,
    };
  }

  /**
   * Validate an existing or candidate question item against quality gates
   */
  public static validateQuestion(
    question: Partial<GeneratedQuestion>
  ): QuestionValidationResult {
    return QuestionIntelligenceValidator.validate(question);
  }

  /**
   * Check health and configuration status of provider
   */
  public static async checkHealth(): Promise<{ configured: boolean; model: string; providerId: string }> {
    const health = await this.defaultProvider.checkHealth();
    return {
      ...health,
      providerId: this.defaultProvider.id,
    };
  }
}
