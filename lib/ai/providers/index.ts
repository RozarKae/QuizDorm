import { AIProviderType } from "@/lib/types/ai";
import { AnthropicProvider } from "./anthropicProvider";
import { GeminiProvider } from "./geminiProvider";
import { MockAIProvider } from "./mockProvider";
import { OpenAIProvider } from "./openaiProvider";
import { IAIProvider } from "./provider";

const providerRegistry: Record<string, IAIProvider> = {
  gemini: new GeminiProvider(),
  openai: new OpenAIProvider(),
  anthropic: new AnthropicProvider(),
  mock: new MockAIProvider(),
};

export function getAIProvider(providerId: AIProviderType): IAIProvider {
  return providerRegistry[providerId] || providerRegistry.mock;
}

export function getAllAIProviders(): IAIProvider[] {
  return Object.values(providerRegistry);
}
