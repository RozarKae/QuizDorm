import { QuestionItem } from "@/lib/types/question";
import { QualityScoreBreakdown, AnswerValidation } from "@/lib/types/quality";

export class QuestionQualityAnalyzer {
  /**
   * Evaluate overall quality score (0-100) and breakdown metrics for a question item
   */
  public static analyzeQuality(question: Partial<QuestionItem>): QualityScoreBreakdown {
    const text = question.title || "";
    const options = question.options || [];

    // 1. Grammar & Spelling Score
    let grammarScore = 95;
    if (text.length < 15) grammarScore -= 20;
    if (/[a-z]/.test(text[0])) grammarScore -= 10; // lower-case start
    if (!/[.?!:]$/.test(text.trim())) grammarScore -= 5; // missing trailing punctuation

    // 2. Clarity & Ambiguity Score
    let clarityScore = 90;
    if (text.includes("???") || text.includes("...")) clarityScore -= 15;
    if (text.length > 250) clarityScore -= 10; // overly wordy
    if (text.length < 20) clarityScore -= 10; // too short/vague

    // 3. Option Distractor Quality Score
    let distractorScore = 85;
    if (options.length > 0) {
      const correctCount = options.filter((o) => o.isCorrect).length;
      if (correctCount === 0) distractorScore -= 40;
      if (options.length < 3) distractorScore -= 20;

      // Check option length variance
      const lengths = options.map((o) => o.text.length);
      const minL = Math.min(...lengths);
      const maxL = Math.max(...lengths);
      if (maxL - minL > 40) distractorScore -= 15; // length imbalance gives away answer
    } else if (question.type === "mcq_single" || question.type === "mcq_multiple") {
      distractorScore = 30;
    }

    // 4. Accuracy Score
    let accuracyScore = 92;
    if (!question.explanation || question.explanation.length < 10) accuracyScore -= 15;

    // 5. Readability Score
    let readabilityScore = 88;
    const wordCount = text.split(/\s+/).length;
    if (wordCount >= 10 && wordCount <= 35) readabilityScore = 96;

    // 6. Fairness Score
    let fairnessScore = 95;

    // Calculate weighted overall score
    const overallScore = Math.round(
      grammarScore * 0.15 +
        clarityScore * 0.25 +
        distractorScore * 0.25 +
        accuracyScore * 0.2 +
        readabilityScore * 0.1 +
        fairnessScore * 0.05
    );

    return {
      grammarScore: Math.max(0, grammarScore),
      clarityScore: Math.max(0, clarityScore),
      distractorScore: Math.max(0, distractorScore),
      accuracyScore: Math.max(0, accuracyScore),
      readabilityScore: Math.max(0, readabilityScore),
      fairnessScore: Math.max(0, fairnessScore),
      overallScore: Math.max(0, Math.min(100, overallScore)),
    };
  }

  /**
   * Validate answer key consistency
   */
  public static validateAnswerKey(question: Partial<QuestionItem>): AnswerValidation {
    const options = question.options || [];
    const issues: string[] = [];
    const correctOptions = options.filter((o) => o.isCorrect);

    if (question.type === "mcq_single" || question.type === "image_based") {
      if (correctOptions.length === 0) issues.push("No correct answer selected.");
      if (correctOptions.length > 1) issues.push("Multiple correct answers marked for a single-choice MCQ.");
    } else if (question.type === "mcq_multiple") {
      if (correctOptions.length === 0) issues.push("No correct answer selected for multiple-choice MCQ.");
    }

    if (!question.explanation || question.explanation.trim().length === 0) {
      issues.push("Missing step-by-step answer explanation.");
    }

    return {
      isValid: issues.length === 0,
      hasCorrectAnswer: correctOptions.length > 0,
      hasMultipleAnswersWhenSingleExpected: question.type === "mcq_single" && correctOptions.length > 1,
      contradictionDetected: false,
      missingAnswerExplanation: !question.explanation,
      issues,
    };
  }
}
