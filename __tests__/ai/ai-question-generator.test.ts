import assert from "node:assert/strict";
import test from "node:test";
import {
BatchQuestionGenerationInputSchema,
GeneratedQuestion,
} from "../../lib/ai/schemas/questionGenerationSchema";
import { IQuestionIntelligenceProvider } from "../../lib/ai/server/IQuestionIntelligenceProvider";
import { QuestionIntelligenceService } from "../../lib/ai/services/questionIntelligenceService";
import { formatGeneratedQuestionToQuestionItem } from "../../lib/ai/utils/formatQuestion";
import {
deleteQuestion,
getStoredQuestions,
importQuestions,
} from "../../lib/data/question-bank";

// Test Fixtures
const MOCK_VALID_GENERATED_QUESTION: GeneratedQuestion = {
  title: "What is the primary function of ATP synthase during mitochondrial chemiosmosis?",
  context: null,
  type: "mcq_single",
  subject: "Science",
  category: "Biology",
  topic: "Cellular Respiration",
  topics: ["Cellular Respiration", "Bioenergetics"],
  subtopic: "Oxidative Phosphorylation",
  gradeLevel: "Grade 11-12",
  learningObjective: "Explain how proton electrochemical gradients drive ATP synthesis across membranes.",
  bloomsLevel: "Analyze",
  difficulty: "Medium",
  options: [
    {
      id: "opt-1",
      text: "Synthesizing ATP from ADP and Pi utilizing energy from proton movement down its gradient",
      isCorrect: true,
      explanation: "Protons flowing down the proton-motive force through Fo drive rotational catalysis in F1 to generate ATP.",
    },
    {
      id: "opt-2",
      text: "Actively pumping protons against their concentration gradient into the mitochondrial intermembrane space",
      isCorrect: false,
      explanation: "Proton pumping is performed by electron transport chain complexes I, III, and IV, not ATP synthase.",
      misconceptionType: "confused_concept",
    },
    {
      id: "opt-3",
      text: "Oxidizing NADH directly to NAD+ and transferring electrons directly to molecular oxygen",
      isCorrect: false,
      explanation: "NADH oxidation occurs at Complex I, not at the ATP synthase enzyme.",
      misconceptionType: "common_misconception",
    },
    {
      id: "opt-4",
      text: "Hydrolyzing glucose molecules into two molecules of pyruvate in the mitochondrial matrix",
      isCorrect: false,
      explanation: "Glycolysis occurs in the cytosol, not by ATP synthase in the inner membrane.",
      misconceptionType: "anatomical_distinction_slip",
    },
  ],
  generalExplanation:
    "ATP synthase operates as a molecular turbine driven by the proton-motive force. As protons pass through the transmembrane rotor, conformational changes at the catalytic headpiece synthesize ATP from ADP and inorganic phosphate.",
  hints: ["Consider the direction of proton movement through the enzyme complex."],
  tags: ["mitochondria", "chemiosmosis", "atp-synthase"],
};

test("Phase 2.0 AI Generator: BatchQuestionGenerationInputSchema validation", async (t) => {
  await t.test("approves valid topic-based batch parameters", () => {
    const parsed = BatchQuestionGenerationInputSchema.safeParse({
      sourceMode: "topic",
      topic: "Quantum Superposition & Wave Mechanics",
      subject: "Physics",
      difficulty: "Hard",
      bloomsLevel: "Analyze",
      questionCount: 5,
      questionTypes: ["mcq_single", "true_false"],
      language: "English",
    });

    assert.equal(parsed.success, true);
    if (parsed.success) {
      assert.equal(parsed.data.questionCount, 5);
      assert.equal(parsed.data.difficulty, "Hard");
      assert.equal(parsed.data.language, "English");
    }
  });

  await t.test("approves syllabus-based batch parameters with curriculum blueprint", () => {
    const parsed = BatchQuestionGenerationInputSchema.safeParse({
      sourceMode: "syllabus",
      topic: "Modern Indian History (1857-1947)",
      subject: "History",
      sourceContent: "Unit 1: Revolt of 1857\nUnit 2: Non-Cooperation Movement\nUnit 3: Partition and Independence",
      questionCount: 10,
      bloomsLevel: "Mixed",
    });

    assert.equal(parsed.success, true);
    if (parsed.success) {
      assert.equal(parsed.data.sourceMode, "syllabus");
      assert.equal(parsed.data.questionCount, 10);
      assert.equal(parsed.data.bloomsLevel, "Mixed");
    }
  });

  await t.test("rejects invalid question counts exceeding 20 or less than 1", () => {
    const tooLarge = BatchQuestionGenerationInputSchema.safeParse({
      topic: "Algebra",
      subject: "Mathematics",
      questionCount: 25,
    });
    assert.equal(tooLarge.success, false);

    const tooSmall = BatchQuestionGenerationInputSchema.safeParse({
      topic: "Algebra",
      subject: "Mathematics",
      questionCount: 0,
    });
    assert.equal(tooSmall.success, false);
  });
});

test("Phase 2.0 AI Generator: QuestionIntelligenceService batch synthesis with mock provider", async (t) => {
  const mockProvider: IQuestionIntelligenceProvider = {
    id: "mock-batch-provider",
    name: "Mock Batch Provider",
    async checkHealth() {
      return { configured: true, model: "mock-test-model" };
    },
    async generateQuestionRaw() {
      return {
        rawJsonString: JSON.stringify(MOCK_VALID_GENERATED_QUESTION),
        modelUsed: "mock-test-model",
        latencyMs: 120,
      };
    },
    async generateBatchQuestionsRaw() {
      return {
        rawJsonString: JSON.stringify({
          documentTitle: "Bioenergetics Assessment",
          summary: "Assessment covering cellular respiration and ATP synthase.",
          detectedSubject: "Science",
          detectedTopic: "Cellular Respiration",
          questions: [MOCK_VALID_GENERATED_QUESTION],
        }),
        modelUsed: "mock-test-model",
        latencyMs: 150,
      };
    },
  };

  await t.test("generates and validates structured batch output", async () => {
    const result = await QuestionIntelligenceService.generateBatch(
      {
        sourceMode: "topic",
        topic: "Cellular Respiration",
        subject: "Science",
        questionCount: 1,
      },
      { providerOverride: mockProvider }
    );

    assert.equal(result.success, true);
    assert.equal(result.questions.length, 1);
    assert.equal(result.questions[0].question.title, MOCK_VALID_GENERATED_QUESTION.title);
    assert.equal(result.questions[0].validation.isValid, true);
    assert.ok(result.questions[0].validation.qualityScore >= 80);
  });

  await t.test("falls back gracefully to DocumentFallbackSynthesizer if provider throws", async () => {
    const failingProvider: IQuestionIntelligenceProvider = {
      id: "failing-provider",
      name: "Failing Provider",
      async checkHealth() {
        return { configured: false, model: "none" };
      },
      async generateQuestionRaw() {
        throw new Error("Provider simulated failure");
      },
      async generateBatchQuestionsRaw() {
        throw new Error("Provider simulated batch outage");
      },
    };

    const result = await QuestionIntelligenceService.generateBatch(
      {
        sourceMode: "text",
        topic: "Plant Physiology",
        subject: "Science",
        sourceContent:
          "Photosynthesis converts light energy into chemical energy stored in glucose. Chloroplasts contain chlorophyll pigments that absorb light wavelengths. Water is oxidized to release oxygen gas as a byproduct. Carbon dioxide is fixed in the stroma during the light-independent reactions.",
        questionCount: 2,
      },
      { providerOverride: failingProvider }
    );

    assert.equal(result.success, true);
    assert.ok(result.questions.length >= 1);
    assert.equal(result.modelUsed, "document-text-synthesizer-fallback");
  });
});

test("Phase 2.0 AI Generator: formatGeneratedQuestionToQuestionItem & Bank Persistence", async () => {
  const formattedItem = formatGeneratedQuestionToQuestionItem(MOCK_VALID_GENERATED_QUESTION, 0);

  assert.ok(formattedItem.id.startsWith("ai-gen-"));
  assert.equal(formattedItem.title, MOCK_VALID_GENERATED_QUESTION.title);
  assert.equal(formattedItem.difficulty, "Medium");
  assert.equal(formattedItem.marks, 2);
  assert.equal(formattedItem.timeLimitSeconds, 60);
  assert.equal(formattedItem.options.length, 4);
  assert.equal(formattedItem.options.filter((o) => o.isCorrect).length, 1);
  assert.ok(formattedItem.tags.includes("ai-generated"));
  assert.ok(formattedItem.tags.includes("bloom-analyze"));

  // Verify Question Bank insertion
  const importResult = importQuestions([formattedItem]);
  assert.ok(importResult.imported >= 1);

  const bank = getStoredQuestions();
  const saved = bank.find((q) => q.id === formattedItem.id);
  assert.ok(saved !== undefined);
  assert.equal(saved?.title, MOCK_VALID_GENERATED_QUESTION.title);

  // Clean up test item
  deleteQuestion(formattedItem.id);
  const afterDelete = getStoredQuestions();
  assert.equal(afterDelete.some((q) => q.id === formattedItem.id), false);
});
