import { StudyGoal } from "@/lib/types/tutor";

export const DEFAULT_STUDY_GOALS: StudyGoal[] = [
  { id: "sg-1", title: "Master Calculus Integration by Parts", subject: "mathematics", targetDate: "2026-07-26", progressPercent: 85, status: "pending" },
  { id: "sg-2", title: "Review Circulatory System & Heart Anatomy", subject: "biology", targetDate: "2026-07-28", progressPercent: 60, status: "pending" },
  { id: "sg-3", title: "Quantum Physics Wave Function Practice", subject: "physics", targetDate: "2026-07-24", progressPercent: 100, status: "completed" },
];

export class AIStudyCoach {
  public static getGoals(): StudyGoal[] {
    return DEFAULT_STUDY_GOALS;
  }

  public static getReadinessScore(): number {
    return 94.2;
  }
}
