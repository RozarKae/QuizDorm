import { PredictiveScore } from "@/lib/types/performance";

export const DEFAULT_PREDICTIONS: PredictiveScore[] = [
  {
    subject: "Calculus & AP Physics",
    predictedGradePercent: 94.5,
    confidencePercent: 92,
    keyFactors: ["High quiz streak (14 days)", "98% accuracy in Derivatives", "Active AI Tutor usage"],
    explainabilityNote: "Based on 42 recent quiz attempts and spaced repetition mastery score of 4.8/5.",
  },
  {
    subject: "Organic Chemistry",
    predictedGradePercent: 82.0,
    confidencePercent: 88,
    keyFactors: ["Reaction Mechanisms weakness", "Missed 2 practice sets"],
    explainabilityNote: "Confidence high based on 18 quiz attempts. Recommend 2 hours of AI Tutor practice on Carbonyl Reactions.",
  },
  {
    subject: "Cellular Biology",
    predictedGradePercent: 96.0,
    confidencePercent: 95,
    keyFactors: ["Flawless Flashcard Retention", "100% Attendance"],
    explainabilityNote: "Top 1% performing student in school district.",
  },
];

export class PredictiveAnalyticsEngine {
  public static getPredictions(): PredictiveScore[] {
    return DEFAULT_PREDICTIONS;
  }
}
