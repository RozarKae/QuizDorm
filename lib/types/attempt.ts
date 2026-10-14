import { QuestionItem } from "./question";

export type AttemptStatus = "in_progress" | "submitted" | "timed_out";

export interface QuizAttempt {
  id: string;
  quizId: string;
  quizTitle: string;
  userId: string;
  userName: string;
  status: AttemptStatus;
  startedAt: string;
  submittedAt?: string;
  timeTakenSeconds: number;
  durationMinutes: number;
  answers: Record<string, any>; // questionId -> answer
  markedForReview: string[]; // questionIds
  score: number;
  totalMarks: number;
  passMarks: number;
  percentage: number;
  isPassed: boolean;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
  questions: QuestionItem[];
}
