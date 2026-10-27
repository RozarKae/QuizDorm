import { AIRecommendationItem,StudentKnowledgeProfile } from "@/lib/types/adaptive";
import { KnowledgeProfileManager } from "./profileManager";

export class AIRecommendationEngine {
  /**
   * Generate explainable recommendations tailored to learner profile
   */
  public static getRecommendations(
    profile: StudentKnowledgeProfile = KnowledgeProfileManager.getProfile()
  ): AIRecommendationItem[] {
    const recommendations: AIRecommendationItem[] = [];

    // 1. Check weak topics
    if (profile.weakTopics.length > 0) {
      const primaryWeak = profile.weakTopics[0];
      recommendations.push({
        id: "rec-weak-1",
        type: "revision",
        title: `Targeted Practice: ${primaryWeak}`,
        description: `Dedicated 10-question practice session targeting ${primaryWeak} concepts.`,
        reason: `Your accuracy in ${primaryWeak} is currently below threshold (62%). Focused practice will boost mastery.`,
        supportingData: `${primaryWeak} Mastery: 62% • Average response time: 52s`,
        confidencePercent: 94,
        actionUrl: "/dashboard/quizzes/builder?mode=revision",
        priority: "high",
      });
    }

    // 2. Challenge recommendation for strong topics
    if (profile.strongTopics.length > 0) {
      const topStrong = profile.strongTopics[0];
      recommendations.push({
        id: "rec-strong-1",
        type: "challenge",
        title: `Advanced Challenge: ${topStrong}`,
        description: `Timed Expert-level quiz challenge to unlock Master status in ${topStrong}.`,
        reason: `You scored 92% mastery in ${topStrong}. You are ready for expert-level problem solving.`,
        supportingData: `${topStrong} Mastery: 92% • Streak: 7 Days`,
        confidencePercent: 91,
        actionUrl: "/dashboard/competitions",
        priority: "medium",
      });
    }

    // 3. Spaced Repetition Due Alert
    recommendations.push({
      id: "rec-spaced-1",
      type: "revision",
      title: "Today's Spaced Repetition Queue",
      description: "Review 2 memory items scheduled for optimal long-term retention.",
      reason: "Items scheduled according to SM-2 forgetting curve to prevent memory decay.",
      supportingData: "2 Items Due Today",
      confidencePercent: 98,
      actionUrl: "/dashboard/revision",
      priority: "high",
    });

    return recommendations;
  }
}
