import { GradebookSyncItem } from "@/lib/types/academic-integration";

export const DEFAULT_GRADEBOOK_LOGS: GradebookSyncItem[] = [
  {
    id: "gb-101",
    studentName: "Alex Rivera",
    quizTitle: "Grade 12 Calculus Master Assessment",
    quizScore: "94%",
    gradebookTarget: "Canvas Gradebook (Assignment #402)",
    syncedAt: "2026-07-24T10:15:00Z",
    status: "synced",
  },
  {
    id: "gb-102",
    studentName: "Sofia Rivera",
    quizTitle: "Cellular Biology Fundamentals Quiz",
    quizScore: "88%",
    gradebookTarget: "Google Classroom Gradebook",
    syncedAt: "2026-07-24T09:30:00Z",
    status: "synced",
  },
  {
    id: "gb-103",
    studentName: "Marcus Sterling",
    quizTitle: "Thermodynamics & Heat Transfer Test",
    quizScore: "91%",
    gradebookTarget: "Moodle Gradebook (Course #88)",
    syncedAt: "2026-07-24T08:45:00Z",
    status: "synced",
  },
];

export class GradebookSyncService {
  public static getLogs(): GradebookSyncItem[] {
    return DEFAULT_GRADEBOOK_LOGS;
  }
}
