import { AIModel, AIProviderType } from "@/lib/types/ai";
import { getAllAIProviders } from "../providers";

export class AIModelManager {
  /**
   * Get all registered models across all active providers
   */
  public static getAllModels(): AIModel[] {
    const providers = getAllAIProviders();
    return providers.flatMap((p) => p.getAvailableModels());
  }

  /**
   * Get models for a specific provider
   */
  public static getModelsForProvider(providerId: AIProviderType): AIModel[] {
    return this.getAllModels().filter((m) => m.providerId === providerId);
  }

  /**
   * Find a specific model by ID
   */
  public static getModelById(modelId: string): AIModel | undefined {
    return this.getAllModels().find((m) => m.id === modelId);
  }

  /**
   * Estimate cost in USD for prompt and completion token counts
   */
  public static estimateCostUSD(
    modelId: string,
    promptTokens: number,
    completionTokens: number
  ): number {
    const model = this.getModelById(modelId);
    if (!model) return 0;

    const inputCost = (promptTokens / 1000) * model.inputCostPer1KTokensUSD;
    const outputCost = (completionTokens / 1000) * model.outputCostPer1KTokensUSD;

    return Number((inputCost + outputCost).toFixed(6));
  }
}
