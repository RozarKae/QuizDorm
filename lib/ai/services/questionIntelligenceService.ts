import {
  GeneratedQuestion,
  GeneratedQuestionSchema,
  QuestionGenerationInput,
  QuestionGenerationInputSchema,
  PdfQuestionGenerationInput,
  PdfQuestionGenerationInputSchema,
  BatchGeneratedQuestionsSchema,
} from "../schemas/questionGenerationSchema";
import {
  IQuestionIntelligenceProvider,
  AIProviderError,
  AIConfigurationError,
} from "../server/IQuestionIntelligenceProvider";
import { GeminiQuestionProvider } from "../server/geminiQuestionProvider";
import {
  QuestionIntelligenceValidator,
  QuestionValidationResult,
} from "../../quality/questionIntelligenceValidator";

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
    } catch (err: any) {
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
              message: err.message || "Failed to generate question from provider",
            },
          ],
          qualityScore: 0,
          stemClarityScore: 0,
          distractorHomogeneityScore: 0,
          recommendedStatus: "rejected",
          summary: `Generation failed: ${err.message}`,
        },
        error: err.message,
        errorCode,
      };
    }

    // 3. Parse JSON Output
    let parsedJson: any;
    try {
      parsedJson = JSON.parse(rawResult.rawJsonString);
    } catch (jsonErr: any) {
      return {
        success: false,
        validation: {
          isValid: false,
          issues: [
            {
              code: "MALFORMED_JSON_OUTPUT",
              field: "metadata",
              severity: "error",
              message: `AI provider produced malformed non-JSON output: ${jsonErr.message}`,
            },
          ],
          qualityScore: 0,
          stemClarityScore: 0,
          distractorHomogeneityScore: 0,
          recommendedStatus: "rejected",
          summary: "Generation failed: AI returned invalid JSON.",
        },
        error: `Malformed JSON response from AI provider: ${jsonErr.message}`,
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
      Array.isArray(parsedJson.questions) &&
      parsedJson.questions.length > 0
    ) {
      questionData = parsedJson.questions[0];
    }

    // 4. Validate output with Runtime Zod Schema
    const zodResult = GeneratedQuestionSchema.safeParse(questionData);
    if (!zodResult.success) {
      const issues = zodResult.error.issues.map((i) => ({
        code: "SCHEMA_VALIDATION_FAILURE",
        field: (i.path[0] as any) || "metadata",
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
    } catch (err: any) {
      const errorCode =
        err instanceof AIConfigurationError
          ? "CONFIGURATION_ERROR"
          : err instanceof AIProviderError
            ? "PROVIDER_ERROR"
            : "EXECUTION_ERROR";

      return {
        success: false,
        questions: [],
        error: err.message || "Failed to process document with AI provider",
        errorCode,
      };
    }

    let parsedJson: any;
    try {
      parsedJson = JSON.parse(rawResult.rawJsonString);
    } catch (jsonErr: any) {
      return {
        success: false,
        questions: [],
        error: `AI provider produced malformed non-JSON output: ${jsonErr.message}`,
        errorCode: "MALFORMED_JSON",
        latencyMs: rawResult.latencyMs,
      };
    }

    let rawQuestionsList: any[] = [];
    let documentTitle: string | undefined = undefined;
    let summary: string | undefined = undefined;
    let detectedSubject: string | undefined = undefined;
    let detectedTopic: string | undefined = undefined;

    if (Array.isArray(parsedJson)) {
      rawQuestionsList = parsedJson;
    } else if (parsedJson && typeof parsedJson === "object") {
      documentTitle = parsedJson.documentTitle;
      summary = parsedJson.summary;
      detectedSubject = parsedJson.detectedSubject;
      detectedTopic = parsedJson.detectedTopic;

      if (Array.isArray(parsedJson.questions)) {
        rawQuestionsList = parsedJson.questions;
      }
    }

    if (rawQuestionsList.length === 0) {
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
