import { QuestionItem } from "@/lib/types/question";
import { DuplicateAlert } from "@/lib/types/quality";

export class DuplicateDetectionEngine {
  /**
   * Compare target question against candidate items in Question Bank to detect duplicates
   */
  public static detectDuplicates(
    target: Partial<QuestionItem>,
    existingQuestions: QuestionItem[] = []
  ): DuplicateAlert[] {
    if (!target.title || existingQuestions.length === 0) return [];

    const targetText = this.normalizeText(target.title);
    const alerts: DuplicateAlert[] = [];

    for (const q of existingQuestions) {
      if (q.id === target.id) continue;

      const qText = this.normalizeText(q.title);
      const similarityPercent = this.calculateSimilarity(targetText, qText);

      if (similarityPercent >= 60) {
        let matchType: DuplicateAlert["matchType"] = "similar_concept";
        let recommendation: DuplicateAlert["recommendation"] = "keep_both";

        if (similarityPercent >= 95) {
          matchType = "exact";
          recommendation = "delete";
        } else if (similarityPercent >= 80) {
          matchType = "near_duplicate";
          recommendation = "merge";
        } else if (similarityPercent >= 65) {
          matchType = "reworded";
          recommendation = "keep_both";
        }

        alerts.push({
          matchedQuestionId: q.id,
          matchedTitle: q.title,
          similarityPercent,
          matchType,
          recommendation,
        });
      }
    }

    return alerts.sort((a, b) => b.similarityPercent - a.similarityPercent);
  }

  private static normalizeText(text: string): string {
    return text
      .toLowerCase()
      .replace(/[^\w\s]/gi, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  private static calculateSimilarity(str1: string, str2: string): number {
    if (str1 === str2) return 100;
    const words1 = new Set(str1.split(" "));
    const words2 = new Set(str2.split(" "));

    const intersection = new Set([...words1].filter((w) => words2.has(w)));
    const union = new Set([...words1, ...words2]);

    if (union.size === 0) return 0;
    return Math.round((intersection.size / union.size) * 100);
  }
}
