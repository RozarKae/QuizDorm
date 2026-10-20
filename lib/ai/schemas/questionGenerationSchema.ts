import { z } from "zod";

/**
 * Cognitive complexity level based on Bloom's Revised Taxonomy
 */
export const BloomsLevelEnum = z.enum([
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
]);
export type BloomsLevel = z.infer<typeof BloomsLevelEnum>;

/**
 * Question difficulty rating
 */
export const DifficultyLevelEnum = z.enum(["Easy", "Medium", "Hard"]);
export type DifficultyLevel = z.infer<typeof DifficultyLevelEnum>;

/**
 * Question format type
 */
export const QuestionTypeEnum = z.enum([
  "mcq_single",
  "mcq_multiple",
  "true_false",
  "fill_in_the_blank",
  "match_following",
  "sequence_ordering",
  "drag_drop_categorize",
  "error_spotting",
  "assertion_reasoning",
]);
export type QuestionType = z.infer<typeof QuestionTypeEnum>;

/**
 * Schema for an individual answer option / distractor
 */
export const GeneratedOptionSchema = z.object({
  id: z.string().min(1, "Option ID is required"),
  text: z.string().min(1, "Option text must not be empty"),
  isCorrect: z.boolean(),
  explanation: z
    .string()
    .min(5, "Option explanation must provide a rationale (min 5 characters)"),
  misconceptionType: z.string().nullable().optional(),
  plausibilityReason: z.string().nullable().optional(),
});
export type GeneratedOption = z.infer<typeof GeneratedOptionSchema>;

/**
 * Schema for matching pair in match_following questions
 */
export const GeneratedMatchPairSchema = z.object({
  id: z.string().min(1, "Pair ID is required"),
  leftItem: z.string().min(1, "Left item must not be empty"),
  rightItem: z.string().min(1, "Right item must not be empty"),
  explanation: z.string().optional(),
});
export type GeneratedMatchPair = z.infer<typeof GeneratedMatchPairSchema>;

/**
 * Schema for sequential items in sequence_ordering questions
 */
export const GeneratedSequenceItemSchema = z.object({
  id: z.string().min(1, "Sequence item ID is required"),
  text: z.string().min(1, "Item text must not be empty"),
  order: z.number().int(),
});
export type GeneratedSequenceItem = z.infer<typeof GeneratedSequenceItemSchema>;

/**
 * Schema for drag & drop categorization
 */
export const GeneratedDragDropCategorySchema = z.object({
  id: z.string().min(1, "Category ID is required"),
  title: z.string().min(1, "Category title must not be empty"),
});
export const GeneratedDragDropItemSchema = z.object({
  id: z.string().min(1, "Item ID is required"),
  text: z.string().min(1, "Item text must not be empty"),
  categoryId: z.string().min(1, "Target category ID is required"),
});

/**
 * Runtime Zod schema for structured question generation output
 */
export const GeneratedQuestionSchema = z
  .object({
    title: z
      .string()
      .min(15, "Question stem must be at least 15 characters for clarity")
      .max(1000, "Question stem must not exceed 1000 characters"),
    context: z.string().nullable().optional(),
    type: QuestionTypeEnum.default("mcq_single"),
    subject: z.string().min(2, "Subject is required"),
    category: z.string().min(2, "Category is required"),
    topic: z.string().min(2, "Topic is required"),
    subtopic: z.string().nullable().optional(),
    gradeLevel: z.string().min(2, "Grade level is required"),
    learningObjective: z
      .string()
      .min(10, "Explicit pedagogical learning objective is required"),
    bloomsLevel: BloomsLevelEnum.default("Understand"),
    difficulty: DifficultyLevelEnum.default("Medium"),
    options: z.array(GeneratedOptionSchema).default([]),
    matchingPairs: z.array(GeneratedMatchPairSchema).optional(),
    fillBlanks: z.array(z.string().min(1)).optional(),
    sequenceItems: z.array(GeneratedSequenceItemSchema).optional(),
    dragDropCategories: z.array(GeneratedDragDropCategorySchema).optional(),
    dragDropItems: z.array(GeneratedDragDropItemSchema).optional(),
    generalExplanation: z
      .string()
      .min(15, "Comprehensive master explanation is required (min 15 characters)"),
    hints: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      if (
        data.type === "mcq_single" ||
        data.type === "true_false" ||
        data.type === "error_spotting" ||
        data.type === "assertion_reasoning"
      ) {
        if (!data.options || data.options.length < 2) return false;
        const correctCount = data.options.filter((o) => o.isCorrect).length;
        return correctCount === 1;
      }
      if (data.type === "mcq_multiple") {
        if (!data.options || data.options.length < 2) return false;
        const correctCount = data.options.filter((o) => o.isCorrect).length;
        return correctCount >= 1;
      }
      if (data.type === "fill_in_the_blank") {
        const hasBlanks = Array.isArray(data.fillBlanks) && data.fillBlanks.length > 0;
        const hasCorrectOpt = Array.isArray(data.options) && data.options.some((o) => o.isCorrect);
        return hasBlanks || hasCorrectOpt;
      }
      if (data.type === "match_following") {
        if (!Array.isArray(data.matchingPairs) || data.matchingPairs.length < 2) {
          return false;
        }
        // Validate unambiguous matching: no duplicate leftItems or rightItems
        const leftSet = new Set(data.matchingPairs.map((p) => p.leftItem.trim().toLowerCase()));
        const rightSet = new Set(data.matchingPairs.map((p) => p.rightItem.trim().toLowerCase()));
        return (
          leftSet.size === data.matchingPairs.length &&
          rightSet.size === data.matchingPairs.length
        );
      }
      if (data.type === "sequence_ordering") {
        return Array.isArray(data.sequenceItems) && data.sequenceItems.length >= 2;
      }
      if (data.type === "drag_drop_categorize") {
        return (
          Array.isArray(data.dragDropCategories) &&
          data.dragDropCategories.length >= 2 &&
          Array.isArray(data.dragDropItems) &&
          data.dragDropItems.length >= 2
        );
      }
      return true;
    },
    {
      message:
        "Question must satisfy structural constraints for its type (mcq/true_false/error_spotting/assertion_reasoning: 1 correct; fill_in_the_blank: >=1 answer; match_following: >=2 distinct pairs; sequence_ordering: >=2 items; drag_drop_categorize: >=2 categories & items).",
      path: ["options"],
    }
  );

export type GeneratedQuestion = z.infer<typeof GeneratedQuestionSchema>;

/**
 * Input parameters for question generation
 */
export const QuestionGenerationInputSchema = z.object({
  topic: z.string().min(2, "Topic is required"),
  subject: z.string().min(2, "Subject is required"),
  category: z.string().optional(),
  subtopic: z.string().optional(),
  gradeLevel: z.string().default("Grade 9-10"),
  difficulty: DifficultyLevelEnum.default("Medium"),
  bloomsLevel: BloomsLevelEnum.default("Understand"),
  contextMaterial: z.string().optional(),
  type: QuestionTypeEnum.default("mcq_single"),
  targetLearningObjective: z.string().optional(),
});
export type QuestionGenerationInput = z.infer<
  typeof QuestionGenerationInputSchema
>;

/**
 * Schema for batch questions generated from a document (PDF)
 */
export const BatchGeneratedQuestionsSchema = z.object({
  documentTitle: z.string().optional(),
  summary: z.string().optional(),
  detectedSubject: z.string().optional(),
  detectedTopic: z.string().optional(),
  questions: z
    .array(GeneratedQuestionSchema)
    .min(1, "At least one question must be generated from the document"),
});
export type BatchGeneratedQuestions = z.infer<
  typeof BatchGeneratedQuestionsSchema
>;

/**
 * Input configuration for PDF document question generation
 */
export const PdfQuestionGenerationInputSchema = z.object({
  subject: z.string().optional().default("General Academic"),
  topic: z.string().optional(),
  difficulty: DifficultyLevelEnum.optional().default("Medium"),
  questionCount: z.number().int().min(1).max(50).optional().default(5),
  questionTypes: z
    .array(QuestionTypeEnum)
    .optional()
    .default([
      "mcq_single",
      "mcq_multiple",
      "true_false",
      "fill_in_the_blank",
      "match_following",
      "drag_drop_categorize",
      "error_spotting",
      "sequence_ordering",
      "assertion_reasoning",
    ]),
});
export type PdfQuestionGenerationInput = z.infer<
  typeof PdfQuestionGenerationInputSchema
>;

