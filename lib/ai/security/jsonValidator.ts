export interface ValidationResult<T> {
  valid: boolean;
  data?: T;
  error?: string;
  rawString: string;
}

export class AIJsonValidator {
  /**
   * Parse and validate structured JSON output from AI response
   */
  public static parseAndValidate<T>(
    jsonString: string,
    requiredKeys: string[] = []
  ): ValidationResult<T> {
    const cleaned = this.cleanJsonString(jsonString);

    try {
      const parsed = JSON.parse(cleaned) as T;

      if (typeof parsed !== "object" || parsed === null) {
        return {
          valid: false,
          error: "AI response did not return a valid JSON object or array",
          rawString: jsonString,
        };
      }

      // Check required top-level keys if provided
      if (requiredKeys.length > 0 && !Array.isArray(parsed)) {
        const parsedKeys = Object.keys(parsed as object);
        const missing = requiredKeys.filter((k) => !parsedKeys.includes(k));
        if (missing.length > 0) {
          return {
            valid: false,
            data: parsed,
            error: `JSON missing required top-level keys: ${missing.join(", ")}`,
            rawString: jsonString,
          };
        }
      }

      return {
        valid: true,
        data: parsed,
        rawString: jsonString,
      };
    } catch (err: any) {
      return {
        valid: false,
        error: `JSON Syntax Error: ${err.message}`,
        rawString: jsonString,
      };
    }
  }

  /**
   * Clean AI response string by stripping Markdown code fence wrappers ```json ... ```
   */
  public static cleanJsonString(str: string): string {
    let s = str.trim();
    if (s.startsWith("```json")) {
      s = s.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (s.startsWith("```")) {
      s = s.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }
    return s.trim();
  }
}
