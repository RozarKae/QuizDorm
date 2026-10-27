import {
BatchQuestionGenerationInput,
PdfQuestionGenerationInput,
QuestionGenerationInput,
} from "../schemas/questionGenerationSchema";

export class AIProviderError extends Error {
  public readonly provider: string;
  public readonly statusCode?: number;
  public readonly isRetryable: boolean;

  constructor(
    message: string,
    provider: string = "gemini",
    statusCode?: number,
    isRetryable: boolean = false
  ) {
    super(`[${provider.toUpperCase()}_PROVIDER_ERROR] ${message}`);
    this.name = "AIProviderError";
    this.provider = provider;
    this.statusCode = statusCode;
    this.isRetryable = isRetryable;
  }
}

export class AIConfigurationError extends Error {
  constructor(message: string) {
    super(`[AI_CONFIGURATION_ERROR] ${message}`);
    this.name = "AIConfigurationError";
  }
}

export class AITimeoutError extends Error {
  constructor(timeoutMs: number, provider: string = "gemini") {
    super(
      `[${provider.toUpperCase()}_TIMEOUT] Request exceeded time limit of ${timeoutMs}ms without response.`
    );
    this.name = "AITimeoutError";
  }
}

export class AIParsingError extends Error {
  public readonly rawText: string;

  constructor(message: string, rawText: string) {
    super(`[AI_PARSING_ERROR] ${message}`);
    this.name = "AIParsingError";
    this.rawText = rawText;
  }
}

export interface RawAIQuestionResponse {
  rawJsonString: string;
  modelUsed: string;
  latencyMs: number;
  tokenUsage?: {
    promptTokens?: number;
    completionTokens?: number;
    totalTokens?: number;
  };
}

export interface IQuestionIntelligenceProvider {
  readonly id: string;
  readonly name: string;

  generateQuestionRaw(
    input: QuestionGenerationInput,
    options?: { modelOverride?: string; timeoutMs?: number }
  ): Promise<RawAIQuestionResponse>;

  generateQuestionsFromDocumentBuffer?(
    buffer: Buffer,
    mimeType: string,
    input: PdfQuestionGenerationInput,
    options?: { modelOverride?: string; timeoutMs?: number }
  ): Promise<RawAIQuestionResponse>;

  generateBatchQuestionsRaw?(
    input: BatchQuestionGenerationInput,
    options?: { modelOverride?: string; timeoutMs?: number }
  ): Promise<RawAIQuestionResponse>;

  checkHealth(): Promise<{ configured: boolean; model: string }>;
}

