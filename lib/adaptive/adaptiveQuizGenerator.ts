import { AdaptiveQuizConfig } from "@/lib/types/adaptive";

export class AdaptiveQuizGenerator {
  public static generateQuizConfig(
    subject: string = "Mathematics",
    mode: AdaptiveQuizConfig["mode"] = "practice"
  ): AdaptiveQuizConfig {
    return {
      mode,
      targetDifficulty: mode === "challenge" ? "Expert" : "Intermediate",
      subject,
      topics: mode === "revision" ? ["Circulatory Anatomy", "Cellular Respiration"] : ["Algebra & Calculus"],
      questionCount: mode === "revision" ? 5 : 10,
      timeLimitMinutes: mode === "exam" ? 15 : 10,
      includeMultimedia: true,
    };
  }
}
