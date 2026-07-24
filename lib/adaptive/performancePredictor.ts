import { PerformancePrediction, StudentKnowledgeProfile } from "@/lib/types/adaptive";
import { KnowledgeProfileManager } from "./profileManager";

export class PerformancePredictor {
  /**
   * Forecast future quiz scores, exam readiness, competition readiness & risk of falling behind
   */
  public static predictPerformance(
    profile: StudentKnowledgeProfile = KnowledgeProfileManager.getProfile()
  ): PerformancePrediction {
    const overall = profile.overallMasteryPercent;
    const accuracy = profile.overallAccuracyPercent;

    const predictedScorePercent = Math.round(overall * 0.9 + accuracy * 0.1);
    const examReadinessPercent = Math.min(98, Math.round(overall * 1.05));
    const competitionReadinessPercent = Math.round(overall * 0.95);

    let riskStatus: PerformancePrediction["riskStatus"] = "low";
    if (overall < 65) riskStatus = "high";
    else if (overall < 78) riskStatus = "medium";

    const improvementPotentialPercent = 100 - overall;

    const explanation =
      riskStatus === "low"
        ? `Strong 82% mastery foundation. Predicted exam score: ${predictedScorePercent}%. Low risk of falling behind.`
        : `Moderate risk in ${profile.weakTopics.join(", ")}. Revision recommended to avoid score drops.`;

    return {
      predictedScorePercent,
      examReadinessPercent,
      competitionReadinessPercent,
      riskStatus,
      improvementPotentialPercent,
      explanation,
    };
  }
}
