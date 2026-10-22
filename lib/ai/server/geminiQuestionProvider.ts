import { GoogleGenAI } from "@google/genai";
import { AIServerConfig } from "./aiConfig";
import { DocumentTextExtractor } from "./pdfTextExtractor";
import {
  IQuestionIntelligenceProvider,
  RawAIQuestionResponse,
  AIProviderError,
  AIConfigurationError,
  AITimeoutError,
  AIParsingError,
} from "./IQuestionIntelligenceProvider";
import {
  QuestionGenerationInput,
  PdfQuestionGenerationInput,
} from "../schemas/questionGenerationSchema";

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

4. SUPPORTED QUESTION TYPES & SPECIFICATIONS:
- "mcq_single": Single-choice with 4 homogeneous options, exactly one with isCorrect: true.
- "mcq_multiple": Multi-select question with 4-5 options, 2 or more with isCorrect: true.
- "true_false": Binary question with exactly two options ("True" and "False"), exactly one with isCorrect: true.
- "fill_in_the_blank": Stem must include "[blank]" placeholder. Must provide accepted keywords in "fillBlanks": ["answer1", "alternative2"].
- "match_following": Stem prompts matching relationships. Must provide "matchingPairs": [{ "id": "m1", "leftItem": "Item 1", "rightItem": "Match 1" }, ...]. All items must be unique and unambiguous.
- "drag_drop_categorize": Stem prompts grouping items into buckets. Must provide "dragDropCategories": [{ "id": "c1", "title": "Category A" }, { "id": "c2", "title": "Category B" }] and "dragDropItems": [{ "id": "i1", "text": "Item 1", "categoryId": "c1" }, ...].
- "error_spotting": Stem provides a statement or passage with labeled parts (e.g. "[A] Part 1 [B] Part 2 [C] Part 3 [D] Part 4"). Exactly one option is marked isCorrect: true identifying the flawed part, with explanation of the error and correction.
- "sequence_ordering": Stem prompts arranging steps/events. Must provide "sequenceItems": [{ "id": "s1", "text": "Step A", "order": 1 }, { "id": "s2", "text": "Step B", "order": 2 }, ...].
- "assertion_reasoning": Stem provides "Assertion (A): [Premise]\nReason (R): [Explanation]". Options must evaluate truth and causal validity with exactly 1 isCorrect: true.

5. FORMAT:
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

  public async generateQuestionsFromDocumentBuffer(
    buffer: Buffer,
    mimeType: string,
    input: PdfQuestionGenerationInput,
    options?: { modelOverride?: string; timeoutMs?: number }
  ): Promise<RawAIQuestionResponse> {
    if (!AIServerConfig.isGeminiConfigured()) {
      throw new AIConfigurationError(
        "GEMINI_API_KEY is not configured in the server environment. Please set GEMINI_API_KEY in .env.local or your environment variables."
      );
    }

    const ai = this.getClient();
    const model = AIServerConfig.getActiveModel(options?.modelOverride);

    // Extract raw text from the document directly to ground the model
    const extractedDoc = DocumentTextExtractor.extractText(buffer, mimeType);
    const extractedText = extractedDoc.text;
    const hasText = extractedText && extractedText.length > 20;

    const questionCount = Math.min(50, Math.max(1, input.questionCount || 5));
    const baseTimeout = AIServerConfig.getRequestTimeoutMs() * 2;
    const timeoutMs = options?.timeoutMs || (questionCount > 15 ? Math.max(baseTimeout, 90000) : baseTimeout);

    const allowedTypes = (
      input.questionTypes || [
        "mcq_single",
        "mcq_multiple",
        "true_false",
        "fill_in_the_blank",
        "match_following",
        "drag_drop_categorize",
        "error_spotting",
        "sequence_ordering",
        "assertion_reasoning",
      ]
    ).join(", ");

    const userPrompt = `You have been provided with an educational document (PDF/Text/Image).
${hasText ? `\n=== SOURCE DOCUMENT EXTRACTED TEXT ===\n${extractedText.slice(0, 45000)}\n=== END OF DOCUMENT TEXT ===\n` : ""}

CRITICAL GROUNDING DIRECTIVE:
1. You MUST thoroughly analyze the factual, historical, scientific, or conceptual content of the provided document.
2. ALL questions, answers, and distractors MUST be grounded strictly in the concepts, definitions, events, formulas, and facts present in this document.
3. DO NOT invent questions about outside domains. If the user provided Target Subject ("${input.subject || "Auto-Detect"}") or Target Topic ("${input.topic || "Auto-Detect"}"), treat them ONLY as general search hints within the document. If the document covers a different topic, ALWAYS extract questions from what is ACTUALLY in the document.
4. Auto-detect the true document title, primary academic subject, and central topic directly from the document.

Generation Targets:
- Number of Questions to Generate: exactly ${questionCount}
- Target Difficulty: "${input.difficulty || "Medium"}"
- Allowed Question Types: ${allowedTypes}

Return a single valid JSON object strictly matching this schema:
{
  "documentTitle": "Accurate document title or inferred subject unit from content",
  "summary": "2-3 sentence overview of the concepts covered in this document",
  "detectedSubject": "Actual primary academic subject of the document (e.g. Physics, History, Biology, Computer Science, Economics)",
  "detectedTopic": "Actual core topic of the document",
  "questions": [
    {
      "title": "Unambiguous question statement (for fill_in_the_blank include '[blank]'; for error_spotting label parts like [A] ... [B] ... [C] ... [D])",
      "context": "Context excerpt from document if needed or null",
      "type": "mcq_single | mcq_multiple | true_false | fill_in_the_blank | match_following | drag_drop_categorize | error_spotting | sequence_ordering | assertion_reasoning",
      "subject": "Academic subject of this question",
      "category": "Academic category",
      "topic": "Specific topic",
      "topics": ["Primary Topic", "Related Cross-Index Topic"],
      "subtopic": "Subtopic concept",
      "gradeLevel": "Grade 9-12 / Undergraduate",
      "learningObjective": "Pedagogical objective tested (at least 10 chars)",
      "bloomsLevel": "Understand | Apply | Analyze | Evaluate",
      "difficulty": "${input.difficulty || "Medium"}",
      "options": [
        { "id": "opt-1", "text": "Choice A", "isCorrect": true, "explanation": "Why correct" },
        { "id": "opt-2", "text": "Choice B", "isCorrect": false, "explanation": "Why incorrect", "misconceptionType": "common_misconception" }
      ],
      "matchingPairs": [
        { "id": "m1", "leftItem": "Item 1", "rightItem": "Match 1" }
      ],
      "fillBlanks": ["accepted_answer_keyword"],
      "sequenceItems": [
        { "id": "s1", "text": "Chronological Step 1", "order": 1 },
        { "id": "s2", "text": "Chronological Step 2", "order": 2 }
      ],
      "dragDropCategories": [
        { "id": "c1", "title": "Category 1" },
        { "id": "c2", "title": "Category 2" }
      ],
      "dragDropItems": [
        { "id": "i1", "text": "Item A", "categoryId": "c1" },
        { "id": "i2", "text": "Item B", "categoryId": "c2" }
      ],
      "generalExplanation": "Comprehensive master explanation with solution steps (min 15 chars)",
      "hints": ["Helpful pedagogical hint"],
      "tags": ["document-extracted"]
    }
  ]
}

Formatting Rules per Type:
- mcq_single: 4 options with exactly 1 isCorrect: true.
- mcq_multiple: 4-5 options with 2 or more isCorrect: true.
- true_false: exactly 2 options ("True" and "False") with 1 isCorrect: true.
- fill_in_the_blank: title has '[blank]', fillBlanks has accepted keywords.
- match_following: matchingPairs has 3-5 distinct left/right pairs.
- drag_drop_categorize: dragDropCategories has 2-3 categories, dragDropItems has 4-8 items with categoryId.
- error_spotting: title has labeled fragments "[A] ... [B] ... [C] ... [D]"; options has the fragments with 1 isCorrect: true identifying the error.
- sequence_ordering: sequenceItems has 3-5 steps in correct sequential order (1, 2, 3...).
- assertion_reasoning: title has "Assertion (A): ... \\nReason (R): ...", options has the 4 standard relationship options with 1 isCorrect: true.
`;

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

      const contents = [
        {
          inlineData: {
            mimeType: mimeType || "application/pdf",
            data: buffer.toString("base64"),
          },
        },
        userPrompt,
      ];

      let response: any;
      let effectiveModel = model;
      try {
        response = await Promise.race([
          ai.models.generateContent({
            model: effectiveModel,
            contents: contents,
            config: {
              systemInstruction: SYSTEM_INSTRUCTION,
              responseMimeType: "application/json",
              temperature: 0.2,
              maxOutputTokens: 16384,
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
              contents: contents,
              config: {
                systemInstruction: SYSTEM_INSTRUCTION,
                responseMimeType: "application/json",
                temperature: 0.2,
                maxOutputTokens: 16384,
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
          "Gemini API returned an empty text response for the uploaded document.",
          this.id
        );
      }

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
        err.message || "Failed to execute Gemini API document request",
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
  "topics": ["${input.topic}"],
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
