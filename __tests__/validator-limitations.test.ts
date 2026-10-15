import test from "node:test";
import assert from "node:assert/strict";
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";
import { GeneratedQuestion } from "../lib/ai/schemas/questionGenerationSchema";

test("Validator Limitation 1: Passes semantically incorrect but plausible factual answer", () => {
  // Factually WRONG: Insulin is produced by beta cells of the pancreas, NOT the spleen.
  // But structurally, grammatically, and categorically, it is indistinguishable to a heuristic validator.
  const factuallyFalseQuestion: GeneratedQuestion = {
    title: "Which organ in the human abdominal cavity is primarily responsible for the synthesis and secretion of insulin?",
    type: "mcq_single",
    subject: "Biology",
    category: "Endocrinology",
    topic: "Hormone Secretion",
    gradeLevel: "Grade 9-10",
    learningObjective: "Identify endocrine hormone secretion sites",
    bloomsLevel: "Remember",
    difficulty: "Medium",
    options: [
      {
        id: "opt-1",
        text: "Spleen", // FACTUALLY WRONG (Designated correct!)
        isCorrect: true,
        explanation: "The spleen synthesizes insulin directly into the splenic vein.",
      },
      {
        id: "opt-2",
        text: "Gallbladder",
        isCorrect: false,
        explanation: "The gallbladder stores bile, not hormones.",
        misconceptionType: "digestive_organ_confusion",
      },
      {
        id: "opt-3",
        text: "Appendix",
        isCorrect: false,
        explanation: "The appendix is a vestigial lymphoid structure.",
        misconceptionType: "lymphoid_confusion",
      },
      {
        id: "opt-4",
        text: "Stomach",
        isCorrect: false,
        explanation: "The stomach secretes gastrin and acid, not insulin.",
        misconceptionType: "gastric_organ_confusion",
      },
    ],
    generalExplanation: "This question tests endocrine organ knowledge.",
    hints: ["It is located in the left upper quadrant."],
    tags: ["biology", "hormones", "anatomy"],
  };

  const validation = QuestionIntelligenceValidator.validate(factuallyFalseQuestion);

  // CRITICAL AUDIT FINDING:
  // The validator marks this as valid and approved because the options are homogeneous anatomical organs,
  // there is 1 correct answer, no length bias, and no orphan pronouns.
  // A heuristic validator CANNOT perform semantic truth verification without ground-truth reference data.
  assert.equal(validation.isValid, true, "Validator superficially approves because syntax and schema match");
  assert.equal(validation.recommendedStatus, "approved", "Demonstrates false positive on semantic factual falsehood");
});

test("Validator Limitation 2: Passes mathematically incorrect answer to complex calculation (Question 4 Reproduction)", () => {
  // Reproducing Canary Question 4: The math yields -$10M or $0, but the designated key says -$350M.
  const mathematicallyFalseQuestion: GeneratedQuestion = {
    title: "A commercial bank operates in an economy with a total demand deposit base of $500 million. The central bank mandates a Cash Reserve Ratio (CRR) of 8% and a Statutory Liquidity Ratio (SLR) of 12%. If the central bank increases the CRR by 2 percentage points while simultaneously injecting $10 million through open market operations (OMO), what is the net change in the banking system's total credit creation capacity, assuming a simple credit multiplier based solely on the required reserve ratio and no excess reserves held by banks?",
    type: "mcq_single",
    subject: "Economics",
    category: "Macroeconomics",
    topic: "Monetary Policy Transmission",
    gradeLevel: "Undergraduate",
    learningObjective: "Calculate credit multiplier impact of CRR adjustments",
    bloomsLevel: "Apply",
    difficulty: "Hard",
    options: [
      {
        id: "opt-1",
        text: "A decrease of $350 million", // MATHEMATICALLY BOGUS
        isCorrect: true,
        explanation: "Applying the simple reserve multiplier leads to a net reduction of $350 million.",
      },
      {
        id: "opt-2",
        text: "An increase of $100 million",
        isCorrect: false,
        explanation: "Fails to deduct the reserve absorption from the existing deposit base.",
        misconceptionType: "single_instrument_neglect",
      },
      {
        id: "opt-3",
        text: "A decrease of $500 million",
        isCorrect: false,
        explanation: "Applies the full multiplier without offsetting the OMO injection.",
        misconceptionType: "multiplier_inversion_error",
      },
      {
        id: "opt-4",
        text: "Zero change because the CRR increase and OMO injection offset each other",
        isCorrect: false,
        explanation: "Assumes simple dollar-for-dollar offset rather than multiplier transmission.",
        misconceptionType: "superficial_offset_confusion",
      },
    ],
    generalExplanation: "Monetary policy instruments combine to impact bank credit creation.",
    hints: ["Calculate the new reserve requirement."],
    tags: ["economics", "monetary-policy", "banking"],
  };

  const validation = QuestionIntelligenceValidator.validate(mathematicallyFalseQuestion);

  // CRITICAL AUDIT FINDING:
  // The validator approves this question with 100/100 because options are all dollar-denominated changes
  // and share identical syntax. Arithmetic errors cannot be caught by regex or heuristic rules alone.
  assert.equal(validation.isValid, true, "Validator passes structurally sound but arithmetically wrong item");
  assert.equal(validation.qualityScore, 100, "Superficially scores 100/100 despite false calculation");
});

test("Validator Limitation 3: Passes authoritative-looking citation masking false claims", () => {
  // An item citing a real textbook ("Mankiw Macroeconomics 10th Ed") but containing a fabricated economic law.
  const fabricatedClaimQuestion: GeneratedQuestion = {
    title: "According to standard neo-classical macroeconomic models, what is the direct long-run effect of a permanent increase in the nominal money supply on the real interest rate?",
    type: "mcq_single",
    subject: "Economics",
    category: "Macroeconomics",
    topic: "Monetary Neutrality",
    gradeLevel: "Undergraduate",
    learningObjective: "Evaluate classical dichotomy and monetary neutrality",
    bloomsLevel: "Understand",
    difficulty: "Medium",
    options: [
      {
        id: "opt-1",
        text: "The real interest rate permanently falls by the exact percentage of the monetary expansion", // FALSE: Money neutrality states real rate is unaffected in long run
        isCorrect: true,
        explanation: "As documented in Chapter 5 of standard macroeconomic textbooks, real interest rates adjust permanently downward.",
      },
      {
        id: "opt-2",
        text: "The real interest rate permanently rises due to elevated risk premia",
        isCorrect: false,
        explanation: "Nominal expansion does not elevate sovereign default risk.",
        misconceptionType: "risk_premium_confusion",
      },
      {
        id: "opt-3",
        text: "The real interest rate fluctuates cyclically with accelerating amplitude",
        isCorrect: false,
        explanation: "No cyclical divergence occurs under long-run neutrality.",
        misconceptionType: "cyclical_divergence_fallacy",
      },
      {
        id: "opt-4",
        text: "The real interest rate becomes zero regardless of capital productivity",
        isCorrect: false,
        explanation: "Capital marginal productivity determines the equilibrium real rate.",
        misconceptionType: "zero_bound_misapplication",
      },
    ],
    generalExplanation: "Classical dichotomy separates real and nominal variables in the long run.",
    hints: ["Recall the Fisher effect."],
    tags: ["economics", "macroeconomics", "money-neutrality"],
  };

  const validation = QuestionIntelligenceValidator.validate(fabricatedClaimQuestion);
  assert.equal(validation.isValid, true);
  assert.equal(validation.recommendedStatus, "approved");
});

test("Validator Strength: Reliably catches structural, categorical, and numerical formatting defects", () => {
  // Test that the validator DOES catch categorical and structural flaws
  const invalidCategorical: GeneratedQuestion = {
    title: "In which year did the Constitution of India formally come into force?",
    type: "mcq_single",
    subject: "History",
    category: "Indian Polity",
    topic: "Constitution Commencement",
    gradeLevel: "Grade 11-12",
    learningObjective: "Identify Constitution commencement date",
    bloomsLevel: "Remember",
    difficulty: "Easy",
    options: [
      { id: "opt-1", text: "1950", isCorrect: true, explanation: "Enacted on January 26, 1950." },
      { id: "opt-2", text: "Dr. B. R. Ambedkar", isCorrect: false, explanation: "He is a person, not a year." },
      { id: "opt-3", text: "New Delhi", isCorrect: false, explanation: "This is a place." },
      { id: "opt-4", text: "Government of India Act", isCorrect: false, explanation: "This is an act." },
    ],
    generalExplanation: "The Constitution of India commenced on January 26, 1950.",
    hints: ["Celebrated as Republic Day."],
    tags: ["history", "polity"],
  };

  const validation = QuestionIntelligenceValidator.validate(invalidCategorical);
  assert.equal(validation.isValid, false, "Successfully rejects categorical mixture (Year vs Person vs Place)");
  assert.equal(validation.recommendedStatus, "rejected");
});
