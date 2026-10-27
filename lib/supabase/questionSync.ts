import { createQuestionAction } from "@/app/dashboard/quizzes/actions";
import { QuestionItem } from "@/lib/types/question";
import { isSupabaseConfigured } from "./client";

export interface SyncQuestionsResult {
  synced: number;
  failed: number;
  error?: string;
}

/**
 * Synchronizes newly created or imported questions to the Supabase database
 * using server-authoritative persistence.
 */
export async function syncQuestionsToSupabase(
  questions: QuestionItem[]
): Promise<SyncQuestionsResult> {
  if (!isSupabaseConfigured() || questions.length === 0) {
    return { synced: 0, failed: 0 };
  }

  let synced = 0;
  let failed = 0;

  for (const q of questions) {
    try {
      const res = await createQuestionAction({
        title: q.title,
        type: q.type,
        subject: q.subject,
        category: q.category,
        topic: q.topic,
        difficulty: q.difficulty,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        explanation: q.explanation,
        timeLimitSeconds: q.timeLimitSeconds || 60,
        tags: q.tags || [],
        image: q.image,
        options: q.options,
      });

      if (res.data) {
        synced++;
      } else {
        failed++;
      }
    } catch {
      failed++;
    }
  }

  return { synced, failed };
}
