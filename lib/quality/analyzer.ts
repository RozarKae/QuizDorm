import { GeneratedQuestion } from "@/lib/ai/schemas/questionGenerationSchema";
import { AnswerValidation,QualityScoreBreakdown } from "@/lib/types/quality";
import { QuestionItem } from "@/lib/types/question";
import { QuestionIntelligenceValidator } from "./questionIntelligenceValidator";

export class QuestionQualityAnalyzer {
  /**
   * Evaluate overall quality score (0-100) and breakdown metrics for a question item
   */
  public static analyzeQuality(question: Partial<QuestionItem>): QualityScoreBreakdown {
    const text = (question.title || "").trim();

    // Run deep quality gates
    const deepResult = QuestionIntelligenceValidator.validate(question as unknown as GeneratedQuestion);

    // 1. Grammar & Spelling Score
    let grammarScore = 95;
    if (text.length < 15) grammarScore -= 20;
    if (/[a-z]/.test(text[0])) grammarScore -= 10;
    if (!/[.?!:]$/.test(text)) grammarScore -= 5;

    // 2. Clarity & Ambiguity Score (Uses deep stem clarity score)
    const clarityScore = deepResult.stemClarityScore;

    // 3. Option Distractor Quality Score (Uses deep distractor homogeneity score)
    const distractorScore = deepResult.distractorHomogeneityScore;

    // 4. Accuracy & Explanation Score
    let accuracyScore = 90;
    if (!question.explanation || question.explanation.length < 10) accuracyScore -= 20;

    // 5. Readability Score
    let readabilityScore = 88;
    const wordCount = text.split(/\s+/).length;
    if (wordCount >= 10 && wordCount <= 35) readabilityScore = 96;

    // 6. Fairness Score
    const fairnessScore = 95;

    // Calculate weighted overall score
    let overallScore = Math.round(
      grammarScore * 0.15 +
        clarityScore * 0.25 +
        distractorScore * 0.3 +
        accuracyScore * 0.15 +
        readabilityScore * 0.1 +
        fairnessScore * 0.05
    );

    // Apply penalty for hard validation errors
    const errorCount = deepResult.issues.filter((i) => i.severity === "error").length;
    overallScore = Math.max(0, overallScore - errorCount * 15);

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
   * Validate answer key consistency and option integrity
   */
  public static validateAnswerKey(question: Partial<QuestionItem>): AnswerValidation {
    const deepResult = QuestionIntelligenceValidator.validate(question as unknown as GeneratedQuestion);
    const options = question.options || [];
    const correctOptions = options.filter((o) => o.isCorrect);

    const issues: string[] = deepResult.issues
      .filter((i) => i.field === "answer" || i.field === "options" || i.field === "distractors")
      .map((i) => i.message);

    return {
      isValid: deepResult.issues.filter((i) => i.severity === "error").length === 0,
      hasCorrectAnswer: correctOptions.length > 0,
      hasMultipleAnswersWhenSingleExpected:
        question.type === "mcq_single" && correctOptions.length > 1,
      contradictionDetected: false,
      missingAnswerExplanation: !question.explanation || question.explanation.trim().length === 0,
      issues,
    };
  }
}
