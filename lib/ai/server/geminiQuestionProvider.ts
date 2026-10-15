import { GoogleGenAI } from "@google/genai";
import { AIServerConfig } from "./aiConfig";
import {
  IQuestionIntelligenceProvider,
  RawAIQuestionResponse,
  AIProviderError,
  AIConfigurationError,
  AITimeoutError,
  AIParsingError,
} from "./IQuestionIntelligenceProvider";
import { QuestionGenerationInput } from "../schemas/questionGenerationSchema";

/**
 * System instruction enforcing pedagogical question authoring and distractor intelligence
 */
const SYSTEM_INSTRUCTION = `You are QuizDorm's Question Intelligence Engine, an expert educational assessment author specializing in curriculum-aligned item design.

You must author educational assessment questions following these non-negotiable rules:

1. STEM INTEGRITY & CONTEXT:
- The question stem must be clear, grammatically precise, and completely self-contained.
- NEVER use orphan pronouns without antecedents (e.g. "Who is he?", "Where did it occur?"). Explicitly state the subject, entity, or person.
- NEVER include exam debris, page numbers (e.g. "<<<PAGE_13>>>"), or document metadata in the stem.
- When asking about a specific context or excerpt, include the necessary background context in the "context" field.

2. ANSWER & DISTRACTOR HOMOGENEITY:
- Exactly ONE option must be marked as correct (isCorrect: true) for single-choice questions.
- ALL distractors must belong to the EXACT same grammatical and conceptual category as the correct answer.
  - If the answer is a year (e.g. "1926"), ALL distractors must be realistic 4-digit years within the same historical era. NEVER mix dates with names or organizations.
  - If the answer is a person's name (e.g. "Ashutosh Dixit"), ALL distractors must be prominent individuals in that domain. NEVER use programs, dates, or places as distractors for a person.
  - If the answer has numerical units (e.g. "128 km"), ALL distractors must share the identical unit.
  - If the answer is a technical concept, ALL distractors must be plausible alternative concepts in the same field.
- Plausibility: Distractors must reflect common student misconceptions, reasonable calculation errors, or closely related concepts. NEVER generate absurd, random, or filler choices.
- Prohibit "All of the above" and "None of the above".

3. EDUCATIONAL FEEDBACK:
- Every option (both correct and distractors) MUST include an "explanation" field detailing WHY it is valid or invalid.
- For distractors, specify the "misconceptionType" (e.g. "calculation_error", "confused_concept", "unit_inversion", "chronological_confusion", "common_misconception").
- Provide a master "generalExplanation" breaking down the solution step-by-step.

4. FORMAT:
- Output MUST be valid, well-formed JSON matching the specified schema.
`;

export class GeminiQuestionProvider implements IQuestionIntelligenceProvider {
  public readonly id = "gemini";
  public readonly name = "Google Gemini AI (Server-Side)";

  private client: GoogleGenAI | null = null;

  private getClient(): GoogleGenAI {
    if (this.client) return this.client;
    const apiKey = AIServerConfig.getGeminiApiKey();
    this.client = new GoogleGenAI({ apiKey });
    return this.client;
  }

  public async checkHealth(): Promise<{ configured: boolean; model: string }> {
    const configured = AIServerConfig.isGeminiConfigured();
    const model = AIServerConfig.getActiveModel();
    return { configured, model };
  }

  public async generateQuestionRaw(
    input: QuestionGenerationInput,
    options?: { modelOverride?: string; timeoutMs?: number }
  ): Promise<RawAIQuestionResponse> {
    if (!AIServerConfig.isGeminiConfigured()) {
      throw new AIConfigurationError(
        "GEMINI_API_KEY is not configured in the server environment. Please set GEMINI_API_KEY in .env.local or your environment variables."
      );
    }

    const ai = this.getClient();
    const model = AIServerConfig.getActiveModel(options?.modelOverride);
    const timeoutMs = options?.timeoutMs || AIServerConfig.getRequestTimeoutMs();

    const userPrompt = this.constructPrompt(input);
    const startTime = Date.now();

    try {
      const abortController = new AbortController();
      let timeoutHandle: NodeJS.Timeout | null = null;
      const timeoutPromise = new Promise<never>((_, reject) => {
        timeoutHandle = setTimeout(() => {
          abortController.abort();
          reject(new AITimeoutError(timeoutMs, this.id));
        }, timeoutMs);
      });

      let response: any;
      let effectiveModel = model;
      try {
        response = await Promise.race([
          ai.models.generateContent({
            model: effectiveModel,
            contents: userPrompt,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              responseMimeType: "application/json",
              temperature: 0.3, // Lower temperature for factual accuracy and schema adherence
            },
          }),
          timeoutPromise,
        ]);
      } catch (genErr: any) {
        const isCapacityError =
          genErr.message?.includes("503") ||
          genErr.message?.includes("high demand") ||
          genErr.message?.includes("UNAVAILABLE") ||
          genErr.status === 503;

        if (
          isCapacityError &&
          !options?.modelOverride &&
          effectiveModel !== AIServerConfig.FALLBACK_MODEL
        ) {
          effectiveModel = AIServerConfig.FALLBACK_MODEL;
          response = await Promise.race([
            ai.models.generateContent({
              model: effectiveModel,
              contents: userPrompt,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                temperature: 0.3,
              },
            }),
            timeoutPromise,
          ]);
        } else {
          throw genErr;
        }
      } finally {
        if (timeoutHandle) clearTimeout(timeoutHandle);
      }

      const latencyMs = Date.now() - startTime;
      const rawText = response.text;

      if (!rawText || rawText.trim().length === 0) {
        throw new AIProviderError(
          "Gemini API returned an empty text response.",
          this.id
        );
      }

      // Clean markdown code blocks if the model wrapped the JSON in ```json ... ```
      const cleanedJson = this.sanitizeJsonString(rawText);

      return {
        rawJsonString: cleanedJson,
        modelUsed: effectiveModel,
        latencyMs,
        tokenUsage: {
          promptTokens: response.usageMetadata?.promptTokenCount,
          completionTokens: response.usageMetadata?.candidatesTokenCount,
          totalTokens: response.usageMetadata?.totalTokenCount,
        },
      };
    } catch (err: any) {
      if (err.name === "AbortError" || err.message?.includes("abort")) {
        throw new AITimeoutError(timeoutMs, this.id);
      }
      if (
        err instanceof AIConfigurationError ||
        err instanceof AIProviderError ||
        err instanceof AITimeoutError
      ) {
        throw err;
      }
      throw new AIProviderError(
        err.message || "Failed to execute Gemini API request",
        this.id,
        err.status || 500,
        this.checkIfRetryable(err)
      );
    }
  }

  private constructPrompt(input: QuestionGenerationInput): string {
    return `Generate a rigorous, curriculum-aligned assessment question based on the following specification:

Target Subject: "${input.subject}"
Category: "${input.category || input.subject}"
Topic: "${input.topic}"
Subtopic: "${input.subtopic || "Core Principles"}"
Target Grade/Level: "${input.gradeLevel}"
Cognitive Depth (Bloom's): "${input.bloomsLevel}"
Intended Difficulty: "${input.difficulty}"
Question Type: "${input.type}"
${input.targetLearningObjective ? `Required Learning Objective: "${input.targetLearningObjective}"` : ""}
${input.contextMaterial ? `Source/Passage Context:\n"${input.contextMaterial}"` : ""}

Generate a JSON object adhering to this structure:
{
  "title": "Complete, unambiguous, self-contained question statement",
  "context": "Optional context passage or null",
  "type": "${input.type}",
  "subject": "${input.subject}",
  "category": "${input.category || input.subject}",
  "topic": "${input.topic}",
  "subtopic": "${input.subtopic || "Core Principles"}",
  "gradeLevel": "${input.gradeLevel}",
  "learningObjective": "Specific learning outcome tested",
  "bloomsLevel": "${input.bloomsLevel}",
  "difficulty": "${input.difficulty}",
  "options": [
    {
      "id": "opt-1",
      "text": "Unambiguously correct answer",
      "isCorrect": true,
      "explanation": "Why this option is correct"
    },
    {
      "id": "opt-2",
      "text": "Plausible distractor in the same conceptual category",
      "isCorrect": false,
      "explanation": "Why this option is wrong",
      "misconceptionType": "Specific student misconception or calculation slip"
    },
    {
      "id": "opt-3",
      "text": "Second plausible distractor in the same category",
      "isCorrect": false,
      "explanation": "Why this option is wrong",
      "misconceptionType": "Common confusion between similar concepts"
    },
    {
      "id": "opt-4",
      "text": "Third plausible distractor in the same category",
      "isCorrect": false,
      "explanation": "Why this option is wrong",
      "misconceptionType": "Alternative incorrect hypothesis"
    }
  ],
  "generalExplanation": "Comprehensive master explanation detailing the underlying principle and step-by-step solution",
  "hints": ["Hint 1", "Hint 2"],
  "tags": ["tag1", "tag2"]
}
`;
  }

  private sanitizeJsonString(raw: string): string {
    let text = raw.trim();
    if (text.startsWith("```json")) {
      text = text.substring(7);
    } else if (text.startsWith("```")) {
      text = text.substring(3);
    }
    if (text.endsWith("```")) {
      text = text.substring(0, text.length - 3);
    }
    text = text.trim();

    // Sanitize unescaped backslashes in string literals (e.g. LaTeX \Delta, \approx, \ge)
    // Converts invalid backslashes (not followed by ", \, /, b, f, n, r, t, or uXXXX) to \\
    text = text.replace(/\\(?![/"\\bfnrt]|u[0-9a-fA-F]{4})/g, "\\\\");

    return text;
  }

  private checkIfRetryable(err: any): boolean {
    const status = err.status || err.statusCode;
    if (status === 429 || status === 503 || status === 504) return true;
    if (
      err.message?.includes("RESOURCE_EXHAUSTED") ||
      err.message?.includes("rate limit")
    )
      return true;
    return false;
  }
}
