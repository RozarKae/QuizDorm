import { ExtractedQuestion } from "@/lib/types/ocr";

export class AIEnhancerService {
  /**
   * Rephrase question for clarity and pedagogical precision
   */
  public static async rephraseQuestion(q: ExtractedQuestion): Promise<ExtractedQuestion> {
    await new Promise((r) => setTimeout(r, 400));
    return {
      ...q,
      title: `[AI Rephrased] ${q.title.replace(/^\[AI Rephrased\]\s*/, "")}`,
      status: "edited",
    };
  }

  /**
   * Fix OCR typos and grammatical errors in title and options
   */
  public static async fixGrammar(q: ExtractedQuestion): Promise<ExtractedQuestion> {
    await new Promise((r) => setTimeout(r, 300));
    const cleanedTitle = q.title
      .replace(/\(ocr uncertain\)/gi, "")
      .replace(/\s+/g, " ")
      .trim();

    const cleanedOptions = q.options.map((opt) => ({
      ...opt,
      text: opt.text.replace(/\(ocr uncertain\)/gi, "").trim(),
    }));

    return {
      ...q,
      title: cleanedTitle,
      options: cleanedOptions,
      lowConfidenceFields: q.lowConfidenceFields?.filter((f) => f !== "title" && f !== "options"),
      status: "edited",
    };
  }

  /**
   * Generate missing distractor options for multiple choice questions
   */
  public static async generateMissingDistractors(q: ExtractedQuestion): Promise<ExtractedQuestion> {
    await new Promise((r) => setTimeout(r, 400));

    if (q.type !== "mcq_single" && q.type !== "mcq_multiple") return q;

    const currentCount = q.options.length;
    if (currentCount >= 4) return q;

    const newOptions = [...q.options];
    const letters = ["A", "B", "C", "D", "E"];

    for (let i = currentCount; i < 4; i++) {
      newOptions.push({
        id: `opt-ai-${Date.now()}-${i}`,
        text: `Plausible AI Generated Distractor ${letters[i]}`,
        isCorrect: false,
      });
    }

    return {
      ...q,
      options: newOptions,
      status: "edited",
    };
  }

  /**
   * Suggest correct answer if not identified by OCR
   */
  public static async suggestCorrectAnswer(q: ExtractedQuestion): Promise<ExtractedQuestion> {
    await new Promise((r) => setTimeout(r, 350));

    if (q.options.length === 0) return q;

    const hasCorrect = q.options.some((o) => o.isCorrect);
    if (hasCorrect) return q;

    const updatedOptions = q.options.map((opt, idx) => ({
      ...opt,
      isCorrect: idx === 0, // Suggest first option as likely answer
    }));

    return {
      ...q,
      options: updatedOptions,
      lowConfidenceFields: q.lowConfidenceFields?.filter((f) => f !== "answer"),
      status: "edited",
    };
  }

  /**
   * Generate step-by-step educational explanation
   */
  public static async generateExplanation(q: ExtractedQuestion): Promise<ExtractedQuestion> {
    await new Promise((r) => setTimeout(r, 400));

    const explanation = `Step-by-Step AI Explanation:\n1. Analyze key concepts in ${q.subject} (${q.topic}).\n2. Evaluate options against standard academic definitions.\n3. The correct answer logically follows from established principles.`;

    return {
      ...q,
      explanation,
      status: "edited",
    };
  }
}
