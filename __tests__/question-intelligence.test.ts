import test from "node:test";
import assert from "node:assert/strict";

// Schemas & Types
import {
  GeneratedQuestionSchema,
  QuestionGenerationInputSchema,
} from "../lib/ai/schemas/questionGenerationSchema";

// Validation Engine
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";

// Service & Providers
import { QuestionIntelligenceService } from "../lib/ai/services/questionIntelligenceService";
import {
  IQuestionIntelligenceProvider,
  RawAIQuestionResponse,
  AIProviderError,
  AITimeoutError,
} from "../lib/ai/server/IQuestionIntelligenceProvider";
import { AIServerConfig } from "../lib/ai/server/aiConfig";

/**
 * Test Suite 1: Runtime Schema Validation (Zod)
 */
test("Schema Validation: Valid question passes schema contract", () => {
  const validPayload = {
    title: "What is the primary function of ribosomes in eukaryotic cells?",
    type: "mcq_single",
    subject: "Biology",
    category: "Cell Biology",
    topic: "Cellular Organelles",
    gradeLevel: "Grade 9-10",
    learningObjective: "Identify the site and functional mechanism of protein synthesis in eukaryotic cells.",
    bloomsLevel: "Remember",
    difficulty: "Easy",
    options: [
      {
        id: "opt-1",
        text: "Translating mRNA sequences into polypeptide chains",
        isCorrect: true,
        explanation: "Ribosomes catalyze the synthesis of proteins by translating mRNA into amino acid chains.",
      },
      {
        id: "opt-2",
        text: "Synthesizing ATP through oxidative phosphorylation",
        isCorrect: false,
        explanation: "ATP synthesis is the primary function of mitochondria, not ribosomes.",
        misconceptionType: "confused_organelle_function",
      },
      {
        id: "opt-3",
        text: "Packaging lipids for vesicular exocytosis",
        isCorrect: false,
        explanation: "Packaging lipids and proteins for transport is the function of the Golgi apparatus.",
        misconceptionType: "confused_organelle_function",
      },
      {
        id: "opt-4",
        text: "Degrading cellular debris using hydrolytic enzymes",
        isCorrect: false,
        explanation: "Hydrolytic degradation is carried out by lysosomes.",
        misconceptionType: "confused_organelle_function",
      },
    ],
    generalExplanation: "Ribosomes are molecular ribonucleoprotein complexes that assemble amino acids into polypeptide chains based on genetic code carried by mRNA.",
    hints: ["Consider protein translation."],
    tags: ["biology", "cells", "organelles"],
  };

  const parseResult = GeneratedQuestionSchema.safeParse(validPayload);
  assert.equal(parseResult.success, true);
});

test("Schema Validation: Rejects single-choice question with multiple correct answers", () => {
  const invalidPayload = {
    title: "Which organelle synthesizes proteins?",
    type: "mcq_single",
    subject: "Biology",
    category: "Cell Biology",
    topic: "Organelles",
    gradeLevel: "Grade 9-10",
    learningObjective: "Identify organelles responsible for synthesis.",
    bloomsLevel: "Remember",
    difficulty: "Easy",
    options: [
      { id: "1", text: "Ribosome", isCorrect: true, explanation: "Correct." },
      { id: "2", text: "Rough ER", isCorrect: true, explanation: "Also has ribosomes." },
      { id: "3", text: "Vacuole", isCorrect: false, explanation: "Incorrect." },
    ],
    generalExplanation: "Ribosomes synthesize proteins.",
  };

  const parseResult = GeneratedQuestionSchema.safeParse(invalidPayload);
  assert.equal(parseResult.success, false);
});

test("Schema Validation: Rejects single-choice question with zero correct answers", () => {
  const invalidPayload = {
    title: "Which organelle synthesizes proteins?",
    type: "mcq_single",
    subject: "Biology",
    category: "Cell Biology",
    topic: "Organelles",
    gradeLevel: "Grade 9-10",
    learningObjective: "Identify organelles.",
    bloomsLevel: "Remember",
    difficulty: "Easy",
    options: [
      { id: "1", text: "Ribosome", isCorrect: false, explanation: "No." },
      { id: "2", text: "Mitochondria", isCorrect: false, explanation: "No." },
      { id: "3", text: "Vacuole", isCorrect: false, explanation: "No." },
    ],
    generalExplanation: "Ribosomes synthesize proteins.",
  };

  const parseResult = GeneratedQuestionSchema.safeParse(invalidPayload);
  assert.equal(parseResult.success, false);
});

/**
 * Test Suite 2: Distractor Homogeneity & Categorical Mismatch Rules (The Audit Smoking Gun)
 */
test("Categorical Gate: Rejects Year Question with Person/Entity Distractors (q-bank-0001 failure)", () => {
  // This is the EXACT defective question discovered in the audit:
  const defectiveQuestion: any = {
    title: "UPSC was established in which year?",
    type: "mcq_single",
    subject: "National Affairs",
    topic: "Indian Institutions",
    options: [
      { id: "opt-1", text: "1926", isCorrect: true, explanation: "Established on Oct 1, 1926." },
      { id: "opt-2", text: "India's first 3D concrete-printed housing project.", isCorrect: false },
      { id: "opt-3", text: "Amar Preet Singh", isCorrect: false },
      { id: "opt-4", text: "Air Chief Marshal Amar Preet Singh", isCorrect: false },
    ],
    generalExplanation: "Correct Answer: 1926",
  };

  const result = QuestionIntelligenceValidator.validate(defectiveQuestion);

  assert.equal(result.isValid, false, "Must fail validation due to categorical mismatch");
  assert.equal(result.recommendedStatus, "rejected");

  const yearMismatchIssues = result.issues.filter(
    (i) => i.code === "CATEGORICAL_YEAR_MISMATCH"
  );
  assert.equal(
    yearMismatchIssues.length,
    3,
    "All 3 non-year distractors must be flagged with CATEGORICAL_YEAR_MISMATCH"
  );
  assert.ok(result.distractorHomogeneityScore < 40, "Distractor score must be severely penalized");
});

test("Categorical Gate: Rejects Person Question with Date/Program Distractors (q-bank-0004 failure)", () => {
  // Verified audit failure: "Who is the 29th Chief of the Air Staff?" -> [Ashutosh Dixit, Rural employment, 31 Oct 2026, 128]
  const defectivePersonQuestion: any = {
    title: "Who is the 29th Chief of the Air Staff of the Indian Air Force?",
    type: "mcq_single",
    subject: "Defence",
    options: [
      { id: "opt-1", text: "Air Chief Marshal Ashutosh Dixit", isCorrect: true, explanation: "Appointed as 29th CAS." },
      { id: "opt-2", text: "Rural employment/development", isCorrect: false },
      { id: "opt-3", text: "31 Oct 2026", isCorrect: false },
      { id: "opt-4", text: "128", isCorrect: false },
    ],
    generalExplanation: "Ashutosh Dixit took charge as CAS.",
  };

  const result = QuestionIntelligenceValidator.validate(defectivePersonQuestion);
  assert.equal(result.isValid, false);

  const personMismatchIssues = result.issues.filter(
    (i) => i.code === "CATEGORICAL_PERSON_MISMATCH"
  );
  assert.ok(
    personMismatchIssues.length >= 2,
    "Expected CATEGORICAL_PERSON_MISMATCH issues for date, number, or program distractors"
  );
});

test("Categorical Gate: Rejects Numerical Question with Descriptive Text Distractors", () => {
  const defectiveNumericQuestion: any = {
    title: "How many permissible public works were notified under the rural infrastructure scheme?",
    type: "mcq_single",
    subject: "Governance",
    options: [
      { id: "opt-1", text: "375", isCorrect: true, explanation: "375 works were notified." },
      { id: "opt-2", text: "Ashutosh Dixit", isCorrect: false },
      { id: "opt-3", text: "Water Security", isCorrect: false },
      { id: "opt-4", text: "HAL", isCorrect: false },
    ],
    generalExplanation: "375 works were notified.",
  };

  const result = QuestionIntelligenceValidator.validate(defectiveNumericQuestion);
  assert.equal(result.isValid, false);

  const numMismatch = result.issues.filter(
    (i) => i.code === "CATEGORICAL_NUMERICAL_MISMATCH"
  );
  assert.ok(numMismatch.length >= 2);
});

test("Categorical Gate: Approves Homogeneous and Balanced Options", () => {
  const wellFormedQuestion: any = {
    title: "In which year was the Union Public Service Commission (UPSC) established in India?",
    type: "mcq_single",
    subject: "Politics & Governance",
    options: [
      { id: "opt-1", text: "1926", isCorrect: true, explanation: "Established on Oct 1, 1926 following the Lee Commission." },
      { id: "opt-2", text: "1935", isCorrect: false, explanation: "1935 was the Government of India Act, establishing the Federal Public Service Commission." },
      { id: "opt-3", text: "1947", isCorrect: false, explanation: "1947 was the year of Indian Independence." },
      { id: "opt-4", text: "1950", isCorrect: false, explanation: "1950 was the inauguration of the Constitution designating UPSC." },
    ],
    generalExplanation: "The Public Service Commission was first established on October 1, 1926 pursuant to Section 96C of the Government of India Act 1919.",
  };

  const result = QuestionIntelligenceValidator.validate(wellFormedQuestion);
  assert.equal(result.isValid, true);
  assert.equal(result.recommendedStatus, "approved");
  assert.equal(result.distractorHomogeneityScore, 100);
});

/**
 * Test Suite 3: Stem Context & Ambiguity Checks
 */
test("Stem Gate: Flags orphan pronouns lacking context (q-bank-0006 failure)", () => {
  const orphanQuestion: any = {
    title: "Who is he succeeding?",
    type: "mcq_single",
    options: [
      { id: "1", text: "Amar Preet Singh", isCorrect: true, explanation: "Predecessor." },
      { id: "2", text: "V. R. Chaudhari", isCorrect: false, explanation: "Prior." },
      { id: "3", text: "R. K. S. Bhadauria", isCorrect: false, explanation: "Prior." },
      { id: "4", text: "B. S. Dhanoa", isCorrect: false, explanation: "Prior." },
    ],
    generalExplanation: "Amar Preet Singh was succeeded.",
  };

  const result = QuestionIntelligenceValidator.validate(orphanQuestion);
  assert.equal(result.isValid, false);

  const orphanIssue = result.issues.find((i) => i.code === "STEM_ORPHAN_PRONOUN");
  assert.ok(orphanIssue, "Must flag orphan pronoun 'he' without context");
});

test("Stem Gate: Flags raw OCR pagination delimiters (<<<PAGE_...>>>)", () => {
  const ocrLeakedQuestion: any = {
    title: "How many permissible works were notified? <<<PAGE_13>>>",
    type: "mcq_single",
    options: [
      { id: "1", text: "375", isCorrect: true, explanation: "Notified." },
      { id: "2", text: "350", isCorrect: false, explanation: "Incorrect." },
      { id: "3", text: "400", isCorrect: false, explanation: "Incorrect." },
      { id: "4", text: "425", isCorrect: false, explanation: "Incorrect." },
    ],
    generalExplanation: "375 works.",
  };

  const result = QuestionIntelligenceValidator.validate(ocrLeakedQuestion);
  assert.equal(result.isValid, false);

  const ocrIssue = result.issues.find((i) => i.code === "STEM_CONTAINS_OCR_ARTIFACTS");
  assert.ok(ocrIssue, "Must flag <<<PAGE_13>>> raw delimiter leak");
});

/**
 * Test Suite 4: Duplicate & Overlapping Options
 */
test("Options Gate: Detects exact and overlapping numerical options ('4' and 'four')", () => {
  const overlappingQuestion: any = {
    title: "How many fundamental pillars organize the development initiative?",
    type: "mcq_single",
    options: [
      { id: "1", text: "4", isCorrect: true, explanation: "Four pillars." },
      { id: "2", text: "Four", isCorrect: false, explanation: "Also four." },
      { id: "3", text: "6", isCorrect: false, explanation: "Six pillars." },
      { id: "4", text: "8", isCorrect: false, explanation: "Eight pillars." },
    ],
    generalExplanation: "Four pillars organize the works.",
  };

  const result = QuestionIntelligenceValidator.validate(overlappingQuestion);
  assert.equal(result.isValid, false);

  const overlapIssue = result.issues.find((i) => i.code === "OVERLAPPING_NUMERIC_OPTIONS");
  assert.ok(overlapIssue, "Must flag '4' and 'Four' overlapping choices");
});

/**
 * Test Suite 5: Modular Service Layer & Error Handling
 */
test("Service Layer: Handles provider failures without fabricating fake questions", async () => {
  class FailingMockProvider implements IQuestionIntelligenceProvider {
    id = "failing-mock";
    name = "Failing Mock Provider";

    async generateQuestionRaw(): Promise<RawAIQuestionResponse> {
      throw new AIProviderError("Simulated upstream 503 Service Unavailable", this.id, 503, true);
    }

    async checkHealth() {
      return { configured: true, model: "failing-model" };
    }
  }

  const result = await QuestionIntelligenceService.generateAndValidate(
    {
      topic: "Quantum Computing",
      subject: "Computer Science",
      gradeLevel: "Undergraduate",
    },
    { providerOverride: new FailingMockProvider() }
  );

  assert.equal(result.success, false);
  assert.equal(result.question, undefined, "Must NOT return fabricated questions on provider failure");
  assert.equal(result.errorCode, "PROVIDER_ERROR");
  assert.ok(result.error?.includes("503 Service Unavailable"));
});

test("Service Layer: Handles provider timeouts cleanly", async () => {
  class TimeoutMockProvider implements IQuestionIntelligenceProvider {
    id = "timeout-mock";
    name = "Timeout Mock Provider";

    async generateQuestionRaw(): Promise<RawAIQuestionResponse> {
      throw new AITimeoutError(5000, this.id);
    }

    async checkHealth() {
      return { configured: true, model: "timeout-model" };
    }
  }

  const result = await QuestionIntelligenceService.generateAndValidate(
    {
      topic: "Calculus",
      subject: "Mathematics",
      gradeLevel: "Grade 11-12",
    },
    { providerOverride: new TimeoutMockProvider() }
  );

  assert.equal(result.success, false);
  assert.equal(result.question, undefined);
  assert.ok(result.error?.includes("TIMEOUT"));
});

test("Service Layer: Handles malformed non-JSON provider output without crashing", async () => {
  class MalformedMockProvider implements IQuestionIntelligenceProvider {
    id = "malformed-mock";
    name = "Malformed Mock Provider";

    async generateQuestionRaw(): Promise<RawAIQuestionResponse> {
      return {
        rawJsonString: "This is plain text with no JSON at all.",
        modelUsed: "mock-model",
        latencyMs: 120,
      };
    }

    async checkHealth() {
      return { configured: true, model: "mock-model" };
    }
  }

  const result = await QuestionIntelligenceService.generateAndValidate(
    {
      topic: "Optics",
      subject: "Physics",
      gradeLevel: "Grade 11-12",
    },
    { providerOverride: new MalformedMockProvider() }
  );

  assert.equal(result.success, false);
  assert.equal(result.errorCode, "MALFORMED_JSON");
  assert.ok(result.error?.includes("Malformed JSON"));
});

/**
 * Test Suite 6: Full End-to-End Structured Generation Pipeline
 */
test("End-to-End Pipeline: Validates, structures and scores well-formed AI response", async () => {
  const simulatedValidJsonResponse = JSON.stringify({
    title: "Which process describes the movement of water molecules across a selectively permeable membrane down a water potential gradient?",
    type: "mcq_single",
    subject: "Biology",
    category: "Cell Biology",
    topic: "Membrane Transport",
    gradeLevel: "Grade 9-10",
    learningObjective: "Distinguish osmosis from active transport and facilitated diffusion.",
    bloomsLevel: "Understand",
    difficulty: "Medium",
    options: [
      {
        id: "opt-1",
        text: "Osmosis",
        isCorrect: true,
        explanation: "Osmosis is the net movement of water across a semipermeable membrane down its concentration gradient.",
      },
      {
        id: "opt-2",
        text: "Active transport",
        isCorrect: false,
        explanation: "Active transport moves solutes against their concentration gradient using ATP.",
        misconceptionType: "energy_inversion",
      },
      {
        id: "opt-3",
        text: "Facilitated diffusion",
        isCorrect: false,
        explanation: "Facilitated diffusion involves transmembrane carrier/channel proteins transporting solutes, not free water osmosis.",
        misconceptionType: "solute_vs_solvent_confusion",
      },
      {
        id: "opt-4",
        text: "Endocytosis",
        isCorrect: false,
        explanation: "Endocytosis is bulk transport via vesicle invagination, not passive osmotic flow.",
        misconceptionType: "bulk_transport_confusion",
      },
    ],
    generalExplanation: "Osmosis is a passive thermodynamic process driven by chemical potential differences of water across a semipermeable barrier.",
    hints: ["Focus on the specific term for solvent diffusion."],
    tags: ["biology", "osmosis", "cell_transport"],
  });

  class SuccessfulMockProvider implements IQuestionIntelligenceProvider {
    id = "successful-mock";
    name = "Successful Mock Provider";

    async generateQuestionRaw(): Promise<RawAIQuestionResponse> {
      return {
        rawJsonString: simulatedValidJsonResponse,
        modelUsed: "gemini-2.5-flash",
        latencyMs: 340,
        tokenUsage: { promptTokens: 380, completionTokens: 210, totalTokens: 590 },
      };
    }

    async checkHealth() {
      return { configured: true, model: "gemini-2.5-flash" };
    }
  }

  const result = await QuestionIntelligenceService.generateAndValidate(
    {
      topic: "Membrane Transport",
      subject: "Biology",
      gradeLevel: "Grade 9-10",
      difficulty: "Medium",
      bloomsLevel: "Understand",
    },
    { providerOverride: new SuccessfulMockProvider() }
  );

  assert.equal(result.success, true);
  assert.ok(result.question);
  assert.equal(result.question.title.includes("selectively permeable"), true);
  assert.equal(result.question.options.length, 4);
  assert.equal(result.validation.isValid, true);
  assert.equal(result.validation.recommendedStatus, "approved");
  assert.ok(result.validation.qualityScore >= 85);
  assert.equal(result.modelUsed, "gemini-2.5-flash");
});

test("Security: Server-Side AI Config asserts server context safely", () => {
  // In Node.js environment, window is undefined
  assert.equal(typeof window, "undefined");
  // isGeminiConfigured returns boolean without exposing secrets
  const configured = AIServerConfig.isGeminiConfigured();
  assert.equal(typeof configured, "boolean");
});

test("Categorical Gate: Approves calendar date distractors across different months", () => {
  const dateQuestion: any = {
    title: "On which date did the Constitution of India formally come into effect in 1950?",
    type: "mcq_single",
    options: [
      { id: "opt-1", text: "26 January", isCorrect: true, explanation: "Correct date." },
      { id: "opt-2", text: "15 August", isCorrect: false, explanation: "Independence Day." },
      { id: "opt-3", text: "2 October", isCorrect: false, explanation: "Gandhi Jayanti." },
      { id: "opt-4", text: "26 November", isCorrect: false, explanation: "Constitution Day." },
    ],
    generalExplanation: "Constitution came into effect on 26 January 1950.",
  };

  const validation = QuestionIntelligenceValidator.validate(dateQuestion);
  const unitIssue = validation.issues.find((i) => i.code === "UNIT_INCONSISTENCY_DISTRACTOR");
  assert.equal(unitIssue, undefined, "Calendar dates in different months must not trigger unit inconsistency");
  assert.equal(validation.isValid, true);
});

test("Categorical Gate: Retains unit inconsistency check when real physical units mismatch ('hours' vs 'days')", () => {
  const mismatchedUnitQuestion: any = {
    title: "How long does planet Earth take to complete one full rotation on its axis?",
    type: "mcq_single",
    options: [
      { id: "opt-1", text: "24 hours", isCorrect: true, explanation: "Correct time." },
      { id: "opt-2", text: "12 hours", isCorrect: false, explanation: "Incorrect." },
      { id: "opt-3", text: "48 hours", isCorrect: false, explanation: "Incorrect." },
      { id: "opt-4", text: "365 days", isCorrect: false, explanation: "Mismatched unit and concept." },
    ],
    generalExplanation: "Earth rotates once in 24 hours.",
  };

  const validation = QuestionIntelligenceValidator.validate(mismatchedUnitQuestion);
  const unitIssue = validation.issues.find((i) => i.code === "UNIT_INCONSISTENCY_DISTRACTOR");
  assert.ok(unitIssue, "Must retain UNIT_INCONSISTENCY_DISTRACTOR for genuine physical unit mismatches");
});

test("Categorical Gate: Approves ordinal ranking suffixes ('1st', '2nd', '3rd', '4th')", () => {
  const ordinalQuestion: any = {
    title: "What was India's final standing on the overall medal tally at the 2026 Asian Games?",
    type: "mcq_single",
    options: [
      { id: "opt-1", text: "4th", isCorrect: true, explanation: "India finished fourth." },
      { id: "opt-2", text: "3rd", isCorrect: false, explanation: "South Korea." },
      { id: "opt-3", text: "2nd", isCorrect: false, explanation: "Japan." },
      { id: "opt-4", text: "1st", isCorrect: false, explanation: "China." },
    ],
    generalExplanation: "India placed 4th overall.",
  };

  const validation = QuestionIntelligenceValidator.validate(ordinalQuestion);
  const unitIssue = validation.issues.find((i) => i.code === "UNIT_INCONSISTENCY_DISTRACTOR");
  assert.equal(unitIssue, undefined, "Ordinal suffixes must not trigger unit inconsistency");
  assert.equal(validation.isValid, true);
});

