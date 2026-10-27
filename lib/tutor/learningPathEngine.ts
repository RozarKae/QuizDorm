import { LearningPathMilestone,SubjectTutor } from "@/lib/types/tutor";

export const DEFAULT_MILESTONES: LearningPathMilestone[] = [
  { id: "m-1", title: "Polynomial Differentiation & Limits", subject: "mathematics", estimatedMins: 30, status: "completed" },
  { id: "m-2", title: "Product & Quotient Rules", subject: "mathematics", estimatedMins: 45, status: "completed" },
  { id: "m-3", title: "Chain Rule & Implicit Differentiation", subject: "mathematics", estimatedMins: 60, status: "current" },
  { id: "m-4", title: "Integration by Parts & Definite Integrals", subject: "mathematics", estimatedMins: 75, status: "locked" },
];

export class AILearningPathEngine {
  public static getMilestones(subject?: SubjectTutor): LearningPathMilestone[] {
    void subject;
    return DEFAULT_MILESTONES;
  }
}
