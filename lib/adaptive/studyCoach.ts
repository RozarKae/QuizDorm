import { AICoachMessage } from "@/lib/types/adaptive";

export class AICoachService {
  /**
   * Generate daily AI Study Coach advice messages
   */
  public static getCoachAdvice(): AICoachMessage[] {
    return [
      {
        id: "coach-1",
        title: "Keep Up Your 7-Day Study Streak! 🔥",
        adviceText: "Outstanding momentum, Alex! You've logged active quiz practice for 7 days in a row. Complete today's 5-minute revision to maintain your streak.",
        category: "motivation",
        suggestedAction: "Start Today's Revision",
        timestamp: new Date().toISOString(),
      },
      {
        id: "coach-[2]",
        title: "Focus Tip for Circulatory Anatomy",
        adviceText: "Your accuracy in Biology drops slightly on questions taking >50 seconds. Try breaking down cardiac muscle diagrams into smaller visual components.",
        category: "study_tip",
        suggestedAction: "Practice Diagram Labeling",
        timestamp: new Date().toISOString(),
      },
    ];
  }
}
