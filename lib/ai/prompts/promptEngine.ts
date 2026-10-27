import { PromptTemplate } from "@/lib/types/ai";
import { PROMPT_TEMPLATE_LIBRARY } from "./promptTemplates";

export class PromptEngine {
  /**
   * Get template by ID
   */
  public static getTemplateById(id: string): PromptTemplate | undefined {
    return PROMPT_TEMPLATE_LIBRARY.find((t) => t.id === id);
  }

  /**
   * Interpolate variables into prompt template string
   */
  public static interpolateVariables(
    templateStr: string,
    variables: Record<string, unknown>
  ): string {
    let result = templateStr;
    Object.keys(variables).forEach((key) => {
      const val = typeof variables[key] === "object" ? JSON.stringify(variables[key]) : String(variables[key]);
      const regex = new RegExp(`{{\\s*${key}\\s*}}`, "g");
      result = result.replace(regex, val);
    });
    return result;
  }

  /**
   * Validate required variables are present
   */
  public static validateVariables(
    template: PromptTemplate,
    variables: Record<string, unknown>
  ): { valid: boolean; missing: string[] } {
    const missing = template.requiredVariables.filter(
      (v) => variables[v] === undefined || variables[v] === null
    );
    return {
      valid: missing.length === 0,
      missing,
    };
  }

  /**
   * Compose final user prompt
   */
  public static composeUserPrompt(
    templateId: string,
    variables: Record<string, unknown>
  ): string {
    const template = this.getTemplateById(templateId);
    if (!template) return typeof variables.userPrompt === "string" ? variables.userPrompt : "";

    const validation = this.validateVariables(template, variables);
    if (!validation.valid) {
      console.warn(`Missing required prompt variables: ${validation.missing.join(", ")}`);
    }

    return this.interpolateVariables(template.userPromptTemplate, variables);
  }
}
