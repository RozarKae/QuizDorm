import { GeneratedQuestion } from "@/lib/ai/schemas/questionGenerationSchema";
import { DistractorAnalysis } from "@/lib/types/quality";
import { QuestionItem } from "@/lib/types/question";
import { QuestionIntelligenceValidator } from "./questionIntelligenceValidator";

export class DistractorAnalyzer {
  /**
   * Deep pedagogical analysis of question distractors
   */
  public static analyzeDistractors(question: Partial<QuestionItem>): DistractorAnalysis {
    const options = question.options || [];
    const suggestions: string[] = [];

    if (options.length === 0) {
      return {
        plausibilityScore: 0,
        lengthBalanced: true,
        patternBiasDetected: false,
        optionDistributionIssue: true,
        suggestions: ["Question has no multiple choice distractors defined."],
      };
    }

    // Run the deep QuestionIntelligenceValidator
    const validation = QuestionIntelligenceValidator.validate(question as unknown as GeneratedQuestion);

    // Extract all distractor and option-related issues
    const distractorIssues = validation.issues.filter(
      (i) => i.field === "distractors" || i.field === "options" || i.field === "answer"
    );

    distractorIssues.forEach((issue) => {
      suggestions.push(`${issue.message}${issue.suggestedFix ? ` (Fix: ${issue.suggestedFix})` : ""}`);
    });

    // 1. Length balance check
    const lengths = options.map((o) => (o.text || "").length);
    const minL = Math.min(...lengths);
    const maxL = Math.max(...lengths);
    const lengthBalanced = maxL - minL <= 35;

    // 2. Pattern bias check (e.g. 'All of the above' or 'None of the above')
    const patternBiasDetected = options.some((o) => {
      const text = (o.text || "").toLowerCase();
      return (
        text.includes("all of the above") ||
        text.includes("none of the above") ||
        text.includes("both a and b")
      );
    });

    // Option count issue
    const optionDistributionIssue =
      question.type === "true_false" ? options.length !== 2 : options.length < 3 || options.length > 5;

    // Plausibility score derived from distractor homogeneity score
    const plausibilityScore = validation.distractorHomogeneityScore;

    return {
      plausibilityScore,
      lengthBalanced,
      patternBiasDetected,
      optionDistributionIssue,
      suggestions,
    };
  }
}
