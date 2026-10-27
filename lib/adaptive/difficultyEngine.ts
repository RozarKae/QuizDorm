
export class DynamicDifficultyEngine {
  /**
   * Adjust target difficulty based on recent performance accuracy
   */
  public static calculateNextDifficulty(
    currentDifficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert",
    consecutiveCorrect: number,
    consecutiveIncorrect: number
  ): "Beginner" | "Intermediate" | "Advanced" | "Expert" {
    if (consecutiveCorrect >= 3) {
      if (currentDifficulty === "Beginner") return "Intermediate";
      if (currentDifficulty === "Intermediate") return "Advanced";
      if (currentDifficulty === "Advanced") return "Expert";
    }

    if (consecutiveIncorrect >= 2) {
      if (currentDifficulty === "Expert") return "Advanced";
      if (currentDifficulty === "Advanced") return "Intermediate";
      if (currentDifficulty === "Intermediate") return "Beginner";
    }

    return currentDifficulty;
  }
}
