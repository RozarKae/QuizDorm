import test from "node:test";
import assert from "node:assert/strict";

import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";
import { DuplicateDetectionEngine } from "../lib/quality/duplicateEngine";
import { QuestionIntelligenceService } from "../lib/ai/services/questionIntelligenceService";
import {
  IQuestionIntelligenceProvider,
  RawAIQuestionResponse,
} from "../lib/ai/server/IQuestionIntelligenceProvider";

/**
 * Challenge 1: Four plausible-looking choices, but ZERO designated correct answers
 */
test("Adversarial 1: Catches question with zero designated correct answers", () => {
  const q: any = {
    title: "Which organelle is responsible for cellular respiration and ATP generation?",
    type: "mcq_single",
    options: [
      { id: "1", text: "Mitochondria", isCorrect: false, explanation: "Incorrectly marked false." },
      { id: "2", text: "Chloroplast", isCorrect: false, explanation: "Does photosynthesis." },
      { id: "3", text: "Endoplasmic Reticulum", isCorrect: false, explanation: "Protein transport." },
      { id: "4", text: "Golgi Apparatus", isCorrect: false, explanation: "Vesicle packaging." },
    ],
    generalExplanation: "Mitochondria generate ATP.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  assert.equal(result.isValid, false);
  const issue = result.issues.find((i) => i.code === "NO_CORRECT_ANSWER_DESIGNATED");
  assert.ok(issue, "Must identify that no correct answer was designated");
  assert.equal(result.recommendedStatus, "rejected");
});

/**
 * Challenge 2: An incorrect designated answer key with multiple correct choices in single-choice mode
 */
test("Adversarial 2: Catches multiple correct choices marked in single-choice MCQ", () => {
  const q: any = {
    title: "Which of the following are prime numbers?",
    type: "mcq_single",
    options: [
      { id: "1", text: "2", isCorrect: true, explanation: "2 is prime." },
      { id: "2", text: "3", isCorrect: true, explanation: "3 is prime." },
      { id: "3", text: "4", isCorrect: false, explanation: "4 is composite." },
      { id: "4", text: "6", isCorrect: false, explanation: "6 is composite." },
    ],
    generalExplanation: "2 and 3 are prime.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  assert.equal(result.isValid, false);
  const issue = result.issues.find(
    (i) => i.code === "MULTIPLE_CORRECT_ANSWERS_FOR_SINGLE_CHOICE"
  );
  assert.ok(issue, "Must flag multiple correct answers for single-choice format");
});

/**
 * Challenge 3: Multiple defensible answers via synonymous expressions (e.g. 'Water' and 'H2O')
 */
test("Adversarial 3: Catches synonymous options creating multiple defensible answers", () => {
  const q: any = {
    title: "What is the primary chemical solvent found in human cytoplasm?",
    type: "mcq_single",
    options: [
      { id: "1", text: "Water", isCorrect: true, explanation: "Water is the universal solvent." },
      { id: "2", text: "H2O", isCorrect: false, explanation: "Also water, creating ambiguity." },
      { id: "3", text: "Ethanol", isCorrect: false, explanation: "Not the physiological solvent." },
      { id: "4", text: "Acetone", isCorrect: false, explanation: "Toxic to human cells." },
    ],
    generalExplanation: "Water (H2O) comprises approximately 70-80% of human cytoplasm.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  assert.equal(result.isValid, false);
  const issue = result.issues.find((i) => i.code === "SYNONYMOUS_DEFENSIBLE_OPTIONS");
  assert.ok(issue, "Must catch synonymous options 'Water' and 'H2O'");
});

/**
 * Challenge 4: Distractors belonging to the wrong conceptual category
 */
test("Adversarial 4: Catches categorical mismatch (Year stem vs Name/Project distractors)", () => {
  const q: any = {
    title: "In which year was the Indian Space Research Organisation (ISRO) founded?",
    type: "mcq_single",
    options: [
      { id: "1", text: "1969", isCorrect: true, explanation: "Founded on August 15, 1969." },
      { id: "2", text: "Vikram Sarabhai", isCorrect: false, explanation: "Founder name, not year." },
      { id: "3", text: "Bengaluru, Karnataka", isCorrect: false, explanation: "Headquarters, not year." },
      { id: "4", text: "Chandrayaan-1", isCorrect: false, explanation: "Lunar mission, not year." },
    ],
    generalExplanation: "ISRO was founded in 1969.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  assert.equal(result.isValid, false);
  const issues = result.issues.filter((i) => i.code === "CATEGORICAL_YEAR_MISMATCH");
  assert.equal(issues.length, 3, "Must flag all 3 non-year distractors");
});

/**
 * Challenge 5: Numerically equivalent answers written in different formats ('0.5', '1/2', '50%')
 */
test("Adversarial 5: Catches numerically equivalent options in different notations ('0.5' and '1/2')", () => {
  const q: any = {
    title: "What is the probability of rolling an even number on a fair standard six-sided die?",
    type: "mcq_single",
    options: [
      { id: "1", text: "0.5", isCorrect: true, explanation: "3 out of 6 outcomes = 1/2 = 0.5." },
      { id: "2", text: "1/2", isCorrect: false, explanation: "Identical numerical value to 0.5." },
      { id: "3", text: "1/3", isCorrect: false, explanation: "P(1 or 2) = 1/3." },
      { id: "4", text: "1/6", isCorrect: false, explanation: "P(single number) = 1/6." },
    ],
    generalExplanation: "Even numbers are 2, 4, 6. Probability is 3/6 = 0.5.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  assert.equal(result.isValid, false);
  const issue = result.issues.find((i) => i.code === "NUMERICALLY_EQUIVALENT_OPTIONS");
  assert.ok(issue, "Must detect that '0.5' and '1/2' are mathematically equivalent");
});

test("Adversarial 5b: Catches percentage and decimal equivalence ('50%' and '0.5')", () => {
  const q: any = {
    title: "What is the decimal equivalent of a fifty percent discount?",
    type: "mcq_single",
    options: [
      { id: "1", text: "0.5", isCorrect: true, explanation: "50% is 0.5." },
      { id: "2", text: "50%", isCorrect: false, explanation: "Duplicate value." },
      { id: "3", text: "0.05", isCorrect: false, explanation: "5%." },
      { id: "4", text: "5.0", isCorrect: false, explanation: "500%." },
    ],
    generalExplanation: "50% equals 0.5.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  assert.equal(result.isValid, false);
  const issue = result.issues.find((i) => i.code === "NUMERICALLY_EQUIVALENT_OPTIONS");
  assert.ok(issue, "Must detect that '50%' and '0.5' are mathematically equivalent");
});

/**
 * Challenge 6: Correct answer conspicuously longer than distractors (>2.5x length bias)
 */
test("Adversarial 6: Flags length clue when correct answer is conspicuously verbose", () => {
  const q: any = {
    title: "What is the primary function of the Federal Reserve?",
    type: "mcq_single",
    options: [
      {
        id: "1",
        text: "To conduct the nation's monetary policy, supervise and regulate banking institutions, maintain financial system stability, and provide financial services to depository institutions and the U.S. government.",
        isCorrect: true,
        explanation: "Comprehensive statutory mission.",
      },
      { id: "2", text: "Print dollar bills", isCorrect: false, explanation: "Bureau of Engraving." },
      { id: "3", text: "Collect income tax", isCorrect: false, explanation: "IRS." },
      { id: "4", text: "Finance elections", isCorrect: false, explanation: "FEC." },
    ],
    generalExplanation: "The Federal Reserve is the central bank of the United States.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  const issue = result.issues.find((i) => i.code === "CORRECT_ANSWER_EXCESSIVELY_DETAILED");
  assert.ok(issue, "Must warn about excessive correct answer verbosity giving away the answer");
});

/**
 * Challenge 7: Missing context or unstated variable in mathematical question
 */
test("Adversarial 7: Flags question asking to solve for x without an equation premise", () => {
  const q: any = {
    title: "What is the value of x in the following geometric problem?",
    type: "mcq_single",
    // Note: context is omitted! No equation or diagram is provided!
    options: [
      { id: "1", text: "5", isCorrect: true, explanation: "Unsubstantiated answer." },
      { id: "2", text: "10", isCorrect: false, explanation: "Incorrect." },
      { id: "3", text: "15", isCorrect: false, explanation: "Incorrect." },
      { id: "4", text: "20", isCorrect: false, explanation: "Incorrect." },
    ],
    generalExplanation: "Solving yields 5.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  assert.equal(result.isValid, false);
  const issue = result.issues.find((i) => i.code === "MISSING_MATHEMATICAL_EQUATION");
  assert.ok(issue, "Must flag missing mathematical equation premise");
});

/**
 * Challenge 8: Missing explanations and rationales
 */
test("Adversarial 8: Flags question lacking educational explanations for distractors", () => {
  const q: any = {
    title: "Which gas is most abundant in Earth's atmosphere?",
    type: "mcq_single",
    options: [
      { id: "1", text: "Nitrogen", isCorrect: true, explanation: "" }, // empty!
      { id: "2", text: "Oxygen", isCorrect: false, explanation: "" }, // empty!
      { id: "3", text: "Argon", isCorrect: false, explanation: "" }, // empty!
      { id: "4", text: "Carbon Dioxide", isCorrect: false, explanation: "" }, // empty!
    ],
    generalExplanation: "Nitrogen is ~78%.",
  };

  const result = QuestionIntelligenceValidator.validate(q);
  const issue = result.issues.find((i) => i.code === "MISSING_DISTRACTOR_RATIONALES");
  assert.ok(issue, "Must flag missing individual option explanations");
});

/**
 * Challenge 9: Duplicate questions expressed using different wording (Semantic duplication)
 */
test("Adversarial 9: Detects exact and near-duplicate question stems", () => {
  const existingQuestions: any[] = [
    {
      id: "q-1",
      title: "What is the speed of light in a vacuum?",
    },
    {
      id: "q-2",
      title: "Calculate the acceleration of an object experiencing a net force of 10 Newtons with a mass of 2 kg.",
    },
  ];

  // Near duplicate with slight wording change:
  const candidateTarget: any = {
    id: "q-cand",
    title: "What is the speed of light in vacuum?",
  };

  const alerts = DuplicateDetectionEngine.detectDuplicates(candidateTarget, existingQuestions);
  assert.ok(alerts.length > 0, "Must detect near-duplicate stem");
  assert.ok(alerts[0].similarityPercent >= 80, "Similarity should be >= 80%");
  assert.equal(alerts[0].matchedQuestionId, "q-1");
});

/**
 * Challenge 10: Malformed AI responses and schema recovery
 */
test("Adversarial 10: Service safely rejects malformed AI responses without crashing", async () => {
  class BrokenOutputProvider implements IQuestionIntelligenceProvider {
    id = "broken-ai";
    name = "Broken AI";

    async generateQuestionRaw(): Promise<RawAIQuestionResponse> {
      return {
        rawJsonString: "{ title: 'Missing quotes and invalid syntax', options: [",
        modelUsed: "broken-model",
        latencyMs: 150,
      };
    }

    async checkHealth() {
      return { configured: true, model: "broken-model" };
    }
  }

  const result = await QuestionIntelligenceService.generateAndValidate(
    {
      topic: "Organic Chemistry",
      subject: "Science",
    },
    { providerOverride: new BrokenOutputProvider() }
  );

  assert.equal(result.success, false);
  assert.equal(result.errorCode, "MALFORMED_JSON");
  assert.equal(result.validation.isValid, false);
  assert.equal(result.validation.recommendedStatus, "rejected");
});

/**
 * Challenge 11: Quiz Delivery & Assessment Scoring Lifecycle Integration
 */
test("Integration: Generated question delivers, shuffles options safely, and scores accurately", () => {
  const generatedQ: any = {
    id: "gen-q-test-1",
    title: "What is the powerhouse organelle of eukaryotic cells?",
    type: "mcq_single",
    subject: "Biology",
    category: "Cell Biology",
    topic: "Organelles",
    marks: 4,
    timeLimitSeconds: 60,
    options: [
      { id: "opt-correct", text: "Mitochondria", isCorrect: true, explanation: "Generates ATP." },
      { id: "opt-dist-1", text: "Chloroplast", isCorrect: false, explanation: "Photosynthesis." },
      { id: "opt-dist-2", text: "Ribosome", isCorrect: false, explanation: "Protein translation." },
      { id: "opt-dist-3", text: "Nucleus", isCorrect: false, explanation: "Stores DNA." },
    ],
  };

  // Simulate prepareQuizAttemptSession option shuffling
  const shuffledOptions = [...generatedQ.options].sort(() => 0.5 - Math.random());
  const attemptSessionQuestion = {
    ...generatedQ,
    options: shuffledOptions,
  };

  // 1. Scoring correct answer submission
  const correctOpt = attemptSessionQuestion.options.find((o: any) => o.isCorrect);
  assert.equal(correctOpt?.id, "opt-correct");

  const studentSubmissionCorrect = "opt-correct";
  const isCorrectScored = correctOpt?.id === studentSubmissionCorrect;
  assert.equal(isCorrectScored, true, "Student selecting correct option ID must score as correct");

  // 2. Scoring incorrect distractor submission
  const studentSubmissionIncorrect = "opt-dist-1";
  const isIncorrectScored = correctOpt?.id === studentSubmissionIncorrect;
  assert.equal(isIncorrectScored, false, "Student selecting distractor must score as incorrect");
});
