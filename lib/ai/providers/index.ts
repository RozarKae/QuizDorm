import { IAIProvider } from "./provider";
import { GeminiProvider } from "./geminiProvider";
import { OpenAIProvider } from "./openaiProvider";
import { AnthropicProvider } from "./anthropicProvider";
import { MockAIProvider } from "./mockProvider";
import { AIProviderType } from "@/lib/types/ai";

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
