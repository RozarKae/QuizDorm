import { AIRequestPayload, AIResponsePayload, AIStreamChunk } from "@/lib/types/ai";
import { AIRouter } from "../router/aiRouter";
import { PromptEngine } from "../prompts/promptEngine";

export class AIService {
  /**
   * Execute standardized AI request through central AIRouter
   */
  public static async execute(payload: AIRequestPayload): Promise<AIResponsePayload> {
    return AIRouter.routeCompletion(payload);
  }

  /**
   * Execute streaming AI request through central AIRouter
   */
  public static async executeStream(
    payload: AIRequestPayload,
    onChunk: (chunk: AIStreamChunk) => void
  ): Promise<AIResponsePayload> {
    return AIRouter.routeStream(payload, onChunk);
  }

  /**
   * Execute template-based AI request
   */
  public static async executeTemplate(
    templateId: string,
    variables: Record<string, any>,
    featureId: AIRequestPayload["featureId"]
  ): Promise<AIResponsePayload> {
    const userPrompt = PromptEngine.composeUserPrompt(templateId, variables);
    return AIRouter.routeCompletion({
      featureId,
      userPrompt,
      variables,
    });
  }
}
