import { QuestionItem } from "@/lib/types/question";
import { DistractorAnalysis } from "@/lib/types/quality";

export class DistractorAnalyzer {
  public static analyzeDistractors(question: Partial<QuestionItem>): DistractorAnalysis {
    const options = question.options || [];
    const suggestions: string[] = [];

    if (options.length === 0) {
      return {
        plausibilityScore: 50,
        lengthBalanced: true,
        patternBiasDetected: false,
        optionDistributionIssue: true,
        suggestions: ["Question has no multiple choice distractors defined."],
      };
    }

    // 1. Length balance check
    const lengths = options.map((o) => o.text.length);
    const minL = Math.min(...lengths);
    const maxL = Math.max(...lengths);
    const lengthBalanced = maxL - minL <= 30;

    if (!lengthBalanced) {
      suggestions.push("Option lengths are significantly imbalanced. Students can guess longer options.");
    }

    // 2. Pattern bias check (e.g. 'All of the above' or 'None of the above')
    const patternBiasDetected = options.some(
      (o) => o.text.toLowerCase().includes("all of the above") || o.text.toLowerCase().includes("none of the above")
    );

    if (patternBiasDetected) {
      suggestions.push("Avoid using 'All of the above' or 'None of the above' to maintain item discrimination.");
    }

    // 3. Plausibility Score
    let plausibilityScore = 88;
    if (!lengthBalanced) plausibilityScore -= 15;
    if (patternBiasDetected) plausibilityScore -= 10;
    if (options.length < 4) plausibilityScore -= 10;

    return {
      plausibilityScore: Math.max(0, plausibilityScore),
      lengthBalanced,
      patternBiasDetected,
      optionDistributionIssue: options.length < 3,
      suggestions,
    };
  }
}
