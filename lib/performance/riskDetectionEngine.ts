import { AtRiskStudent } from "@/lib/types/performance";

export const DEFAULT_AT_RISK_STUDENTS: AtRiskStudent[] = [
  {
    id: "risk-1",
    studentId: "st-101",
    studentName: "Dmitri Volkov",
    subject: "Organic Chemistry",
    riskLevel: "high",
    riskFactors: ["Quiz score drop (-22%)", "Missed 3 assignments", "Low AI Tutor engagement"],
    recommendedIntervention: "Assign 15-minute AI Remedial Practice Set + Notify Parent",
    status: "recommended",
  },
  {
    id: "risk-2",
    studentId: "st-102",
    studentName: "Chloe Dupont",
    subject: "AP Calculus",
    riskLevel: "medium",
    riskFactors: ["Integration by Parts struggle", "Slower response time"],
    recommendedIntervention: "Schedule 1-on-1 AI Tutor Copilot Session",
    status: "in_progress",
  },
];

export class EarlyRiskDetectionEngine {
  public static getAtRiskStudents(): AtRiskStudent[] {
    return DEFAULT_AT_RISK_STUDENTS;
  }
}
