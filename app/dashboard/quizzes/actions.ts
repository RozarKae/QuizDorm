"use server";

import {
  createQuestionInDb,
  createQuizInDb,
  deleteQuestionFromDb,
  deleteQuizFromDb,
  getAttemptResultFromDb,
  getAttemptReviewFromDb,
  getQuestionsFromDb,
  getQuizByIdFromDb,
  getQuizzesFromDb,
  getStudentAttemptHistoryFromDb,
  SubmitQuizParams,
  submitQuizAttemptToDb,
} from "@/lib/supabase/quizPersistence";
import { QuestionItem } from "@/lib/types/question";
import { QuizItem } from "@/lib/types/quiz";

export async function getQuizzesAction(filters?: {
  subject?: string;
  difficulty?: string;
  publishedOnly?: boolean;
}) {
  return await getQuizzesFromDb(filters);
}

export async function getQuizByIdAction(quizId: string, options?: { forStudent?: boolean }) {
  return await getQuizByIdFromDb(quizId, options);
}

export async function createQuizAction(
  quizInput: Omit<QuizItem, "id" | "createdAt" | "updatedAt">
) {
  return await createQuizInDb(quizInput);
}

export async function deleteQuizAction(quizId: string) {
  return await deleteQuizFromDb(quizId);
}

export async function getQuestionsAction(filters?: {
  subject?: string;
  topic?: string;
  difficulty?: string;
  type?: string;
  search?: string;
}) {
  return await getQuestionsFromDb(filters);
}

export async function createQuestionAction(
  questionInput: Omit<QuestionItem, "id" | "createdAt" | "updatedAt"> & { quizId?: string }
) {
  return await createQuestionInDb(questionInput);
}

export async function deleteQuestionAction(questionId: string) {
  return await deleteQuestionFromDb(questionId);
}

export async function submitQuizAction(params: SubmitQuizParams) {
  return await submitQuizAttemptToDb(params);
}

export async function getAttemptResultAction(attemptId: string) {
  return await getAttemptResultFromDb(attemptId);
}

export async function getAttemptReviewAction(attemptId: string) {
  return await getAttemptReviewFromDb(attemptId);
}

export async function getStudentHistoryAction() {
  return await getStudentAttemptHistoryFromDb();
}
