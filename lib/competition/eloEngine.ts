export class EloRatingEngine {
  public static calculateElo(currentRating: number, opponentRating: number, actualOutcome: 1 | 0 | 0.5, kFactor = 32): { newRating: number; delta: number } {
    const expectedOutcome = 1 / (1 + Math.pow(10, (opponentRating - currentRating) / 400));
    const delta = Math.round(kFactor * (actualOutcome - expectedOutcome));
    return {
      newRating: currentRating + delta,
      delta,
    };
  }
}
