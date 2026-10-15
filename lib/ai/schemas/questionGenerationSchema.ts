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
    options: z
      .array(GeneratedOptionSchema)
      .min(2, "Question must have at least 2 options")
      .max(6, "Question cannot have more than 6 options"),
    generalExplanation: z
      .string()
      .min(15, "Comprehensive master explanation is required (min 15 characters)"),
    hints: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  })
  .refine(
    (data) => {
      if (data.type === "mcq_single" || data.type === "true_false") {
        const correctCount = data.options.filter((o) => o.isCorrect).length;
        return correctCount === 1;
      }
      if (data.type === "mcq_multiple") {
        const correctCount = data.options.filter((o) => o.isCorrect).length;
        return correctCount >= 1;
      }
      return true;
    },
    {
      message:
        "Single-choice questions (mcq_single, true_false) must have exactly one correct option. Multiple-choice questions must have at least one correct option.",
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
