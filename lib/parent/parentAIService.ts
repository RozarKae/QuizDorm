import { ParentAIInsight } from "@/lib/types/parent";

export class ParentAIService {
  public static getAIInsight(studentId: string): ParentAIInsight {
    return {
      id: `insight-${studentId}`,
      studentId,
      date: new Date().toISOString().split("T")[0],
      summaryTitle: "Strong Calculus Mastery & Focus Area in Biology Anatomy",
      strengths: [
        "Consistently scores >90% in Calculus & Algebra derivative questions.",
        "Maintains an active 7-day study streak with high response speed (14s avg).",
      ],
      weakAreas: [
        "Requires practice in Circulatory Anatomy & Heart Chamber diagrams.",
      ],
      studyHabitAnalysis: "Alex studies most effectively in 25-minute evening bursts between 6:00 PM and 7:30 PM.",
      recommendedHomeActions: [
        "Encourage 15 minutes of interactive hotspot labeling practice on Biology diagrams.",
        "Praise Alex for achieving Gold Master status in Calculus this week!",
      ],
      confidenceScore: 96,
    };
  }
}
