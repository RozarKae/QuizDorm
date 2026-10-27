import { DuplicateMatch,ExtractedQuestion } from "@/lib/types/ocr";
import { QuestionItem } from "@/lib/types/question";

export class DuplicateDetectorService {
  /**
   * Calculate string similarity score between 0 and 100
   */
  private static calculateSimilarity(str1: string, str2: string): number {
    const s1 = str1.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();
    const s2 = str2.toLowerCase().replace(/[^a-z0-9]/g, " ").trim();

    if (s1 === s2) return 100;

    const words1 = new Set(s1.split(/\s+/).filter((w) => w.length > 2));
    const words2 = new Set(s2.split(/\s+/).filter((w) => w.length > 2));

    if (words1.size === 0 || words2.size === 0) return 0;

    let intersection = 0;
    words1.forEach((word) => {
      if (words2.has(word)) intersection++;
    });

    const union = new Set([...words1, ...words2]).size;
    const jaccardScore = (intersection / union) * 100;

    return Math.round(jaccardScore);
  }

  /**
   * Run duplicate check for a list of extracted questions against existing Question Bank items
   */
  public static checkDuplicates(
    extractedQuestions: ExtractedQuestion[],
    existingQuestions: QuestionItem[]
  ): ExtractedQuestion[] {
    return extractedQuestions.map((eq) => {
      let bestMatch: DuplicateMatch | undefined = undefined;
      let highestScore = 0;

      existingQuestions.forEach((qbItem) => {
        const score = this.calculateSimilarity(eq.title, qbItem.title);
        if (score > highestScore) {
          highestScore = score;
          let matchType: "exact" | "similar" | "concept" = "concept";
          if (score >= 90) matchType = "exact";
          else if (score >= 70) matchType = "similar";

          bestMatch = {
            existingQuestionId: qbItem.id,
            existingTitle: qbItem.title,
            similarityScore: score,
            matchType,
          };
        }
      });

      if (bestMatch && (bestMatch as DuplicateMatch).similarityScore >= 60) {
        return {
          ...eq,
          duplicateMatch: bestMatch,
        };
      }

      return eq;
    });
  }
}
