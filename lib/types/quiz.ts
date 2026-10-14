import { QuestionItem, DifficultyLevel } from "./question";

export type { DifficultyLevel };
export type QuizStatus = "Draft" | "Published" | "Archived";

export interface QuizItem {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  instructions?: string;
  category: string;
  subject: string;
  topic?: string;
  gradeLevel?: string;
  grade?: string;
  difficulty: DifficultyLevel;
  durationMinutes: number;
  totalMarks: number;
  passMarks: number;
  status: QuizStatus;
  randomizeQuestions: boolean;
  shuffleOptions: boolean;
  questions: QuestionItem[];
  createdAt: string;
  updatedAt: string;
}
