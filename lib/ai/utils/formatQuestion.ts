import { GeneratedQuestion } from "@/lib/ai/schemas/questionGenerationSchema";
import { DifficultyLevel,QuestionItem,QuestionType } from "@/lib/types/question";

/**
 * Converts a validated GeneratedQuestion into a standardized QuestionItem for the Question Bank
 */
export function formatGeneratedQuestionToQuestionItem(
  gq: GeneratedQuestion,
  index: number = 0
): QuestionItem {
  const qTopic = gq.topic || "General";
  const qSubject = gq.subject || "General Academic";
  const qCategory = gq.category || qSubject;
  const qDifficulty: DifficultyLevel = gq.difficulty || "Medium";

  const qTags = Array.from(
    new Set([
      ...(gq.tags || []),
      qSubject.toLowerCase().replace(/[ &]+/g, "-"),
      qTopic.toLowerCase().replace(/[ &]+/g, "-"),
      "ai-generated",
      gq.bloomsLevel ? `bloom-${gq.bloomsLevel.toLowerCase()}` : "bloom-understand",
    ])
  ).filter(Boolean);

  const qMarks = qDifficulty === "Hard" ? 4 : qDifficulty === "Medium" ? 2 : 1;
  const qTime = qDifficulty === "Hard" ? 90 : qDifficulty === "Medium" ? 60 : 45;

  return {
    id: `ai-gen-${Date.now()}-${index + 1}-${Math.random().toString(36).substring(2, 7)}`,
    title: gq.title,
    description: gq.context || undefined,
    type: gq.type as QuestionType,
    subject: qSubject,
    category: qCategory,
    topic: qTopic,
    topics: gq.topics && gq.topics.length > 0 ? gq.topics : [qTopic],
    subtopic: gq.subtopic || undefined,
    difficulty: qDifficulty,
    gradeLevel: gq.gradeLevel || "Grade 9-10",
    grade: gq.gradeLevel || "Grade 9-10",
    marks: qMarks,
    timeLimitSeconds: qTime,
    explanation: gq.generalExplanation,
    hints: gq.hints || [],
    tags: qTags,
    options: (gq.options || []).map((o, optIdx) => ({
      id: o.id || `opt-${optIdx + 1}`,
      text: o.text,
      isCorrect: Boolean(o.isCorrect),
      explanation: o.explanation,
    })),
    matchingPairs: gq.matchingPairs?.map((m) => ({
      id: m.id,
      leftItem: m.leftItem,
      rightItem: m.rightItem,
    })),
    fillBlanks: gq.fillBlanks,
    sequenceItems: gq.sequenceItems?.map((s) => ({
      id: s.id,
      text: s.text,
      order: s.order,
    })),
    dragDropCategories: gq.dragDropCategories?.map((c) => ({
      id: c.id,
      name: c.title || c.id,
      title: c.title,
    })),
    dragDropItems: gq.dragDropItems?.map((i) => ({
      id: i.id,
      text: i.text,
      targetCategoryId: i.categoryId,
      categoryId: i.categoryId,
    })),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
}
