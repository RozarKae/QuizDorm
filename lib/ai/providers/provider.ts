import {
  AIProviderType,
  AIModel,
  AIRequestPayload,
  AIResponsePayload,
  AIStreamChunk,
  ProviderHealth,
} from "@/lib/types/ai";

export interface IAIProvider {
  id: AIProviderType;
  name: string;
  description: string;

  getAvailableModels(): AIModel[];
  generateCompletion(payload: AIRequestPayload, apiKey?: string): Promise<AIResponsePayload>;
  generateStream(
    payload: AIRequestPayload,
    onChunk: (chunk: AIStreamChunk) => void,
    apiKey?: string
  ): Promise<AIResponsePayload>;
  checkHealth(apiKey?: string): Promise<ProviderHealth>;
}
