import { QuestionItem, DifficultyLevel } from "./question";

export type QuizStatus = "Draft" | "Published" | "Archived";

export interface QuizItem {
  id: string;
  title: string;
  description?: string;
  coverImage?: string;
  instructions?: string;
  category: string;
  subject: string;
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
