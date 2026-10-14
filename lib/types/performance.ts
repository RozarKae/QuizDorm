export type RiskLevel = "low" | "medium" | "high" | "critical";

export type InterventionStatus = "recommended" | "in_progress" | "resolved";

export interface PredictiveScore {
  subject: string;
  predictedGradePercent: number;
  confidencePercent: number;
  keyFactors: string[];
  explainabilityNote: string;
}

export interface AtRiskStudent {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  riskLevel: RiskLevel;
  riskFactors: string[];
  recommendedIntervention: string;
  status: InterventionStatus;
}

export interface WhatIfScenario {
  extraStudyHoursPerWeek: number;
  attendancePercent: number;
  projectedScoreIncreasePercent: number;
  newPredictedGrade: string;
}

export interface OverallSuccessIndex {
  overallScore: number;
  consistencyScore: number;
  accuracyScore: number;
  goalCompletionRate: number;
}
