import { WhatIfScenario } from "@/lib/types/performance";

export class WhatIfSimulatorEngine {
  public static simulate(extraHours: number, attendanceRate: number): WhatIfScenario {
    const scoreIncrease = Math.min(25, Math.round(extraHours * 2.8 + (attendanceRate - 80) * 0.3));
    const baseScore = 84;
    const finalScore = Math.min(100, baseScore + scoreIncrease);

    const gradeLetter = finalScore >= 93 ? "A+" : finalScore >= 88 ? "A" : finalScore >= 80 ? "B+" : "B";

    return {
      extraStudyHoursPerWeek: extraHours,
      attendancePercent: attendanceRate,
      projectedScoreIncreasePercent: scoreIncrease,
      newPredictedGrade: `${gradeLetter} (${finalScore}%)`,
    };
  }
}
