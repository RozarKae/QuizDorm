export type AIProviderType =
  | "gemini"
  | "openai"
  | "anthropic"
  | "azure"
  | "ollama"
  | "lm_studio"
  | "local_llm"
  | "mock";

export type AIModelCapability =
  | "text_generation"
  | "structured_json"
  | "streaming"
  | "vision_ocr"
  | "function_calling"
  | "code_interpreter"
  | "multimodal";

export interface AIModel {
  id: string;
  providerId: AIProviderType;
  name: string;
  description: string;
  contextWindow: number; // in tokens
  maxOutputTokens: number;
  capabilities: AIModelCapability[];
  inputCostPer1KTokensUSD: number;
  outputCostPer1KTokensUSD: number;
  speedRating: "fast" | "medium" | "slow";
  status: "active" | "deprecated" | "preview" | "offline";
  defaultTemperature: number;
}

export interface AISafetySettings {
  harmCategory: "harassment" | "hate_speech" | "sexually_explicit" | "dangerous_content";
  threshold: "block_none" | "block_few" | "block_some" | "block_most";
}

export interface AISettings {
  defaultProvider: AIProviderType;
  defaultModel: string;
  fallbackProvider: AIProviderType;
  temperature: number;
  topP: number;
  topK: number;
  maxTokens: number;
  enableStreaming: boolean;
  safetyLevel: "standard" | "strict font" | "permissive";
  language: string;
  retryAttempts: number;
  timeoutMs: number;
  systemPromptPrefix: string;
  enableCache: boolean;
  cacheTtlSeconds: number;
}

export interface AIRequestPayload {
  requestId?: string;
  featureId: "question_gen" | "ocr_enhance" | "quality_review" | "explanation" | "tutor" | "recommendations" | "test_prompt";
  systemPrompt?: string;
  userPrompt: string;
  variables?: Record<string, any>;
  temperature?: number;
  topP?: number;
  maxTokens?: number;
  responseFormat?: "json" | "text" | "markdown";
  providerOverride?: AIProviderType;
  modelOverride?: string;
  stream?: boolean;
}

export interface AIResponseMetadata {
  requestId: string;
  provider: AIProviderType;
  model: string;
  promptTokens: number;
  completionTokens: number;
  totalTokens: number;
  costUSD: number;
  latencyMs: number;
  finishReason: "stop" | "length" | "content_filter" | "error";
  cached: boolean;
}

export interface AIResponsePayload {
  content: string;
  metadata: AIResponseMetadata;
  rawResponse?: any;
}

export interface AIStreamChunk {
  requestId: string;
  tokenChunk: string;
  accumulatedContent: string;
  isFinished: boolean;
  metadata?: AIResponseMetadata;
}

export interface PromptTemplate {
  id: string;
  category: "Question Generation" | "OCR Enhancement" | "Quality Review" | "Explanation" | "Tutor" | "Recommendations";
  name: string;
  description: string;
  systemPrompt: string;
  userPromptTemplate: string;
  requiredVariables: string[];
  version: number;
  updatedAt: string;
}

export interface ProviderHealth {
  providerId: AIProviderType;
  providerName: string;
  status: "online" | "degraded" | "offline";
  latencyMs: number;
  successRate: number; // 0-100%
  lastSuccessTimestamp?: string;
  lastErrorTimestamp?: string;
  lastErrorMessage?: string;
  dailyQuotaUsed: number;
  dailyQuotaMax: number;
}

export interface AILogEntry {
  id: string;
  timestamp: string;
  requestId: string;
  featureId: string;
  provider: AIProviderType;
  model: string;
  promptText: string;
  responseText: string;
  status: "success" | "fallback_success" | "error";
  latencyMs: number;
  tokensTotal: number;
  costEstimateUSD: number;
  errorMessage?: string;
}
