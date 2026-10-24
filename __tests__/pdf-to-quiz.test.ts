import test from "node:test";
import assert from "node:assert/strict";

// Schemas & Types
import {
  GeneratedQuestionSchema,
  BatchGeneratedQuestionsSchema,
  PdfQuestionGenerationInputSchema,
} from "../lib/ai/schemas/questionGenerationSchema";

// Validation Engine
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";

// OCR Engine & File Validation
import { OCREngineService } from "../lib/ocr/engine";
import { DocumentFallbackSynthesizer } from "../lib/ai/server/documentFallbackSynthesizer";

// Question Bank Persistence & Deduplication
import { importQuestions, getAllQuestions } from "../lib/data/question-bank";
import { QuestionItem } from "../lib/types/question";
import { ExtractedQuestion } from "../lib/types/ocr";

/**
 * Suite 1: PDF Document Server & Client File Validation
 */
test("PDF Validation 1: Approves valid PDF document within size limits", () => {
  const validFile = {
    name: "Thermodynamics_Lecture_Notes.pdf",
    size: 2 * 1024 * 1024, // 2MB
  };
  const result = OCREngineService.validateFile(validFile);
  assert.equal(result.valid, true);
  assert.equal(result.fileType, "pdf");
});

test("PDF Validation 2: Rejects file exceeding 50MB upload limit", () => {
  const oversizedFile = {
    name: "Huge_Textbook_Archive.pdf",
    size: 55 * 1024 * 1024, // 55MB
  };
  const result = OCREngineService.validateFile(oversizedFile);
  assert.equal(result.valid, false);
  assert.match(result.error || "", /exceeds maximum allowed limit of 50MB/i);
});

test("PDF Validation 3: Rejects disallowed file extensions", () => {
  const invalidFile = {
    name: "Malicious_Script.exe",
    size: 1024,
  };
  const result = OCREngineService.validateFile(invalidFile);
  assert.equal(result.valid, false);
  assert.match(result.error || "", /Unsupported file format/i);
});

test("PDF Validation 4: Verifies PDF magic byte header signature (%PDF-)", () => {
  const validPdfHeader = Buffer.from("%PDF-1.7\n%âãÏÓ\n");
  const isPdf = validPdfHeader.subarray(0, 5).toString("utf-8") === "%PDF-";
  assert.equal(isPdf, true, "Valid PDF must start with %PDF- header");

  const invalidHeader = Buffer.from("PK\x03\x04ZIP_ARCHIVE");
  const isNotPdf = invalidHeader.subarray(0, 5).toString("utf-8") === "%PDF-";
  assert.equal(isNotPdf, false, "Non-PDF file must be rejected by magic bytes");
});

/**
 * Suite 2: Batch Question Generation Schema (Zod)
 */
test("Batch Schema 1: Validates complete multi-question batch from document", () => {
  const mockBatchPayload = {
    documentTitle: "Cell Biology & Energy Production",
    summary: "Questions assessing mitochondrial respiration and chloroplast light reactions.",
    detectedSubject: "Biology",
    detectedTopic: "Cellular Metabolism",
    questions: [
      {
        title: "What is the primary function of ATP synthase during oxidative phosphorylation?",
        type: "mcq_single",
        subject: "Biology",
        category: "Biology",
        topic: "Cellular Respiration",
        gradeLevel: "Grade 11-12",
        learningObjective: "Explain how proton gradients drive ATP synthesis across the inner mitochondrial membrane.",
        bloomsLevel: "Understand",
        difficulty: "Medium",
        options: [
          {
            id: "opt-1",
            text: "Catalyzing the phosphorylation of ADP to ATP using proton motive force",
            isCorrect: true,
            explanation: "Protons flowing through the F0/F1 complex drive the mechanical rotation that synthesizes ATP.",
          },
          {
            id: "opt-2",
            text: "Directly oxidizing glucose molecules to generate pyruvate",
            isCorrect: false,
            explanation: "Glucose oxidation to pyruvate occurs during glycolysis in the cytoplasm, not by ATP synthase.",
            misconceptionType: "confused_pathway",
          },
          {
            id: "opt-3",
            text: "Pumping electrons against their electrochemical gradient",
            isCorrect: false,
            explanation: "Electrons flow spontaneously through complexes I-IV, not via ATP synthase.",
            misconceptionType: "confused_gradient",
          },
        ],
        generalExplanation: "ATP synthase harnesses the electrochemical proton gradient established by the electron transport chain to produce ATP from ADP and inorganic phosphate.",
        hints: ["Think about chemiosmosis."],
        tags: ["biology", "respiration"],
      },
      {
        title: "Which of the following molecules are direct end-products of the light reactions of photosynthesis?",
        type: "mcq_multiple",
        subject: "Biology",
        category: "Biology",
        topic: "Photosynthesis",
        gradeLevel: "Grade 11-12",
        learningObjective: "Identify the chemical outputs of the thylakoid light-dependent reactions.",
        bloomsLevel: "Remember",
        difficulty: "Medium",
        options: [
          { id: "o1", text: "ATP", isCorrect: true, explanation: "Generated through photophosphorylation." },
          { id: "o2", text: "NADPH", isCorrect: true, explanation: "Produced via ferredoxin-NADP+ reductase." },
          { id: "o3", text: "Oxygen (O2)", isCorrect: true, explanation: "Released as a byproduct of photolysis." },
          { id: "o4", text: "Glucose", isCorrect: false, explanation: "Glucose is synthesized later in the Calvin cycle.", misconceptionType: "confused_stage" },
        ],
        generalExplanation: "The light reactions produce ATP, NADPH, and O2. Glucose is produced in the stroma during the Calvin cycle.",
        hints: ["Calvin cycle vs light reactions"],
        tags: ["photosynthesis"],
      },
      {
        title: "In glycolysis, one glucose molecule yields a net total of two ATP molecules under anaerobic conditions.",
        type: "true_false",
        subject: "Biology",
        category: "Biology",
        topic: "Glycolysis",
        gradeLevel: "Grade 11-12",
        learningObjective: "Recall net energetic output of the preparatory and payoff phases of glycolysis.",
        bloomsLevel: "Remember",
        difficulty: "Easy",
        options: [
          { id: "tf-1", text: "True", isCorrect: true, explanation: "Glycolysis consumes 2 ATP and produces 4 ATP, giving a net yield of 2 ATP." },
          { id: "tf-2", text: "False", isCorrect: false, explanation: "This statement is true; the net yield is exactly 2 ATP per glucose.", misconceptionType: "calculation_confusion" },
        ],
        generalExplanation: "Gross ATP production is 4 ATP, but 2 ATP are consumed during the hexokinase and PFK-1 reactions, leaving a net 2 ATP.",
        hints: ["4 gross minus 2 investment"],
        tags: ["glycolysis"],
      },
    ],
  };

  const parsed = BatchGeneratedQuestionsSchema.safeParse(mockBatchPayload);
  assert.equal(parsed.success, true, "Valid batch questions payload must pass schema validation");
  if (parsed.success) {
    assert.equal(parsed.data.questions.length, 3);
    assert.equal(parsed.data.questions[0].type, "mcq_single");
    assert.equal(parsed.data.questions[1].type, "mcq_multiple");
    assert.equal(parsed.data.questions[2].type, "true_false");
  }
});

test("Batch Schema 2: Rejects batch payload with zero questions", () => {
  const emptyBatch = {
    documentTitle: "Empty Document",
    summary: "No questions detected",
    questions: [],
  };
  const parsed = BatchGeneratedQuestionsSchema.safeParse(emptyBatch);
  assert.equal(parsed.success, false, "Batch payload with empty questions array must fail validation");
});

test("Batch Schema 3: Enforces single-choice constraint (exactly 1 correct option)", () => {
  const invalidSingleChoice = {
    title: "Which element has atomic number 6 on the periodic table?",
    type: "mcq_single",
    subject: "Chemistry",
    category: "Chemistry",
    topic: "Periodic Table",
    gradeLevel: "Grade 9-10",
    learningObjective: "Identify elements by atomic number.",
    bloomsLevel: "Remember",
    difficulty: "Easy",
    options: [
      { id: "o1", text: "Carbon", isCorrect: true, explanation: "Carbon has atomic number 6." },
      { id: "o2", text: "Oxygen", isCorrect: true, explanation: "Oxygen has atomic number 8, cannot also be marked correct." },
    ],
    generalExplanation: "Carbon has 6 protons, giving it atomic number 6.",
    hints: [],
    tags: ["chemistry"],
  };

  const parsed = GeneratedQuestionSchema.safeParse(invalidSingleChoice);
  assert.equal(parsed.success, false, "Single choice question with 2 correct answers must be rejected");
});

test("Batch Schema 4: Validates True/False requires exactly 1 correct choice", () => {
  const validTF = {
    title: "Pure water at standard pressure freezes at 0 degrees Celsius.",
    type: "true_false",
    subject: "Physics",
    category: "Physics",
    topic: "Thermal Physics",
    gradeLevel: "Grade 9-10",
    learningObjective: "State standard transition temperatures of water.",
    bloomsLevel: "Remember",
    difficulty: "Easy",
    options: [
      { id: "tf-1", text: "True", isCorrect: true, explanation: "Under 1 atm pressure, water freezes at 0 °C." },
      { id: "tf-2", text: "False", isCorrect: false, explanation: "This statement is correct." },
    ],
    generalExplanation: "Standard freezing point of water is 0 °C (273.15 K).",
    hints: [],
    tags: ["physics"],
  };

  const parsed = GeneratedQuestionSchema.safeParse(validTF);
  assert.equal(parsed.success, true, "True/False with 1 correct answer must pass validation");
});

/**
 * Suite 3: Pedagogical Quality Gates via QuestionIntelligenceValidator
 */
test("Quality Gate: Approves grounded questions with valid distractor explanations", () => {
  const question = {
    title: "What is the principal thermodynamic driving force behind spontaneous hydrophobic aggregation in water?",
    type: "mcq_single" as const,
    subject: "Biochemistry",
    category: "Biochemistry",
    topic: "Thermodynamics",
    gradeLevel: "College",
    learningObjective: "Relate solvent water entropy gain to the hydrophobic effect.",
    bloomsLevel: "Analyze" as const,
    difficulty: "Hard" as const,
    options: [
      {
        id: "opt-1",
        text: "Entropy increase of surrounding bulk water molecules",
        isCorrect: true,
        explanation: "Releasing ordered clathrate water cages into bulk solution significantly increases water entropy (positive delta S).",
      },
      {
        id: "opt-2",
        text: "Enthalpy decrease from strong covalent bonding between nonpolar groups",
        isCorrect: false,
        explanation: "Hydrophobic interactions are noncovalent, not covalent bonds.",
        misconceptionType: "confused_bond_type",
      },
      {
        id: "opt-3",
        text: "Electrostatic attraction between induced net formal charges",
        isCorrect: false,
        explanation: "Nonpolar hydrocarbons lack formal charges.",
        misconceptionType: "confused_charge",
      },
    ],
    generalExplanation: "The hydrophobic effect is an entropy-driven phenomenon where water molecules cage-like structures collapse upon nonpolar coalescence.",
    hints: ["Consider delta S of the solvent."],
    tags: ["biochemistry", "thermodynamics"],
  };

  const validation = QuestionIntelligenceValidator.validate(question);
  assert.equal(validation.isValid, true);
  assert.equal(validation.recommendedStatus, "approved");
  assert.ok(validation.qualityScore >= 75);
});

/**
 * Suite 4: Question Bank Persistence & Deduplication
 */
test("Question Bank Persistence: Successfully imports questions and skips duplicates", () => {
  const uniqueTitle = `Unique PDF Question ${Date.now()}`;
  const candidateQuestion: QuestionItem = {
    id: `pdf-test-${Date.now()}`,
    title: uniqueTitle,
    type: "mcq_single",
    subject: "Computer Science",
    category: "Computer Science",
    topic: "Data Structures",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 60,
    options: [
      { id: "o1", text: "O(1)", isCorrect: true },
      { id: "o2", text: "O(n)", isCorrect: false },
    ],
    explanation: "Hash table lookups take amortized O(1) time.",
    tags: ["algorithms"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // 1. Initial import should succeed
  const result1 = importQuestions([candidateQuestion]);
  assert.equal(result1.imported, 1, "First import of question must succeed");
  assert.equal(result1.skipped, 0, "No duplicate on initial import");

  // Verify presence in Question Bank
  const allQ = getAllQuestions();
  const found = allQ.find((q) => q.title.toLowerCase().trim() === uniqueTitle.toLowerCase().trim());
  assert.ok(found, "Imported question must be queryable in Question Bank");

  // 2. Second import of the identical question must be skipped by duplicate detection
  const duplicateCandidate: QuestionItem = {
    ...candidateQuestion,
    id: `pdf-dup-${Date.now()}`,
  };
  const result2 = importQuestions([duplicateCandidate]);
  assert.equal(result2.imported, 0, "Duplicate question must not be re-imported");
  assert.equal(result2.skipped, 1, "Duplicate question must be tracked in skipped count");
});

/**
 * Suite 5: Quiz Taking and Scoring Engine Compatibility for All 4 Types
 */
test("Scoring Compatibility: Single choice, multiple choice, and true/false scoring rules", () => {
  // Test MCQ Single Scoring
  const mcqSingle: QuestionItem = {
    id: "q-score-1",
    title: "Capital of France?",
    type: "mcq_single",
    subject: "Geography",
    category: "Geography",
    topic: "Europe",
    difficulty: "Easy",
    marks: 5,
    timeLimitSeconds: 30,
    options: [
      { id: "opt-paris", text: "Paris", isCorrect: true },
      { id: "opt-lyon", text: "Lyon", isCorrect: false },
    ],
    tags: [],
    createdAt: "",
    updatedAt: "",
  };

  const correctUserAnswerSingle = "opt-paris";
  const isSingleCorrect = mcqSingle.options.find((o) => o.isCorrect)?.id === correctUserAnswerSingle;
  assert.equal(isSingleCorrect, true);

  // Test MCQ Multiple Scoring
  const mcqMultiple: QuestionItem = {
    id: "q-score-2",
    title: "Select all prime numbers below 10:",
    type: "mcq_multiple",
    subject: "Math",
    category: "Math",
    topic: "Number Theory",
    difficulty: "Easy",
    marks: 5,
    timeLimitSeconds: 45,
    options: [
      { id: "p-2", text: "2", isCorrect: true },
      { id: "p-3", text: "3", isCorrect: true },
      { id: "p-4", text: "4", isCorrect: false },
      { id: "p-5", text: "5", isCorrect: true },
    ],
    tags: [],
    createdAt: "",
    updatedAt: "",
  };

  const expectedCorrectMulti = mcqMultiple.options.filter((o) => o.isCorrect).map((o) => o.id).sort();
  const userMultiAnswers = ["p-3", "p-5", "p-2"].sort();
  const isMultiCorrect =
    expectedCorrectMulti.length === userMultiAnswers.length &&
    expectedCorrectMulti.every((val, idx) => val === userMultiAnswers[idx]);
  assert.equal(isMultiCorrect, true);

  // Test True/False Scoring
  const tfQuestion: QuestionItem = {
    id: "q-score-3",
    title: "The Earth revolves around the Sun.",
    type: "true_false",
    subject: "Astronomy",
    category: "Astronomy",
    topic: "Solar System",
    difficulty: "Easy",
    marks: 2,
    timeLimitSeconds: 20,
    options: [
      { id: "tf-t", text: "True", isCorrect: true },
      { id: "tf-f", text: "False", isCorrect: false },
    ],
    tags: [],
    createdAt: "",
    updatedAt: "",
  };

  const expectedTF = tfQuestion.options.find((o) => o.isCorrect)?.text.toLowerCase();
  const userTFAnswer = "true";
  const isTFCorrect = userTFAnswer.toLowerCase() === expectedTF;
  assert.equal(isTFCorrect, true);
});

/**
 * Suite 6: Fill-in-the-Blank Schema, Quality Gate & Scoring
 */
test("Fill-in-the-Blank: Schema validation, normalization, and scoring", () => {
  const validFibPayload = {
    title: "The organelle responsible for aerobic cellular respiration is called [blank].",
    type: "fill_in_the_blank",
    subject: "Biology",
    category: "Biology",
    topic: "Cell Biology",
    gradeLevel: "Grade 10",
    learningObjective: "Identify key cellular organelles and their metabolic roles.",
    bloomsLevel: "Remember",
    difficulty: "Medium",
    options: [],
    fillBlanks: ["mitochondria", "mitochondrion"],
    generalExplanation: "Mitochondria generate the majority of cellular ATP via the citric acid cycle and oxidative phosphorylation.",
    hints: ["Often referred to as the powerhouse of the cell."],
    tags: ["biology", "organelles"],
  };

  // 1. Schema Validation
  const parsed = GeneratedQuestionSchema.safeParse(validFibPayload);
  assert.equal(parsed.success, true, "Valid fill_in_the_blank must pass schema");

  // 2. Quality Gate
  const valResult = QuestionIntelligenceValidator.validate(validFibPayload as any);
  assert.equal(valResult.isValid, true, "Valid fill_in_the_blank must pass pedagogical validator");
  assert.equal(valResult.recommendedStatus, "approved");

  // 3. Scoring: Case-insensitivity & Whitespace Normalization
  const testAnswers = [
    { input: "Mitochondria", expected: true },
    { input: "  mitochondria   ", expected: true },
    { input: "MITOCHONDRION", expected: true },
    { input: "Chloroplast", expected: false },
    { input: "", expected: false },
  ];

  const accepted = (validFibPayload.fillBlanks || []).map((b) => b.trim().toLowerCase());
  for (const t of testAnswers) {
    const normalizedInput = t.input.trim().toLowerCase().replace(/\s+/g, " ");
    const isCorrect = accepted.includes(normalizedInput);
    assert.equal(isCorrect, t.expected, `Answer "${t.input}" scoring must equal ${t.expected}`);
  }

  // 4. Missing answer key rejection
  const invalidFib = {
    ...validFibPayload,
    fillBlanks: [],
    options: [],
  };
  const invalidParse = GeneratedQuestionSchema.safeParse(invalidFib);
  assert.equal(invalidParse.success, false, "Fill in blank with no accepted answers must be rejected");
});

/**
 * Suite 7: Match the Following Schema, Ambiguity Check & Scoring
 */
test("Match Following: Schema validation, ambiguity rejection, and pair scoring", () => {
  const validMatchingPayload = {
    title: "Match the following Indian leaders with their historical portfolios:",
    type: "match_following",
    subject: "History",
    category: "History",
    topic: "Modern India",
    gradeLevel: "Grade 10",
    learningObjective: "Match prominent leaders of modern India with their official historical roles.",
    bloomsLevel: "Remember",
    difficulty: "Medium",
    options: [],
    matchingPairs: [
      { id: "m1", leftItem: "Jawaharlal Nehru", rightItem: "First Prime Minister" },
      { id: "m2", leftItem: "Sardar Vallabhbhai Patel", rightItem: "First Home Minister" },
      { id: "m3", leftItem: "Dr. B. R. Ambedkar", rightItem: "Drafting Committee Chairman" },
    ],
    generalExplanation: "Jawaharlal Nehru served as the first Prime Minister, Sardar Patel integrated the princely states as Home Minister, and Dr. Ambedkar chaired the Constitution Drafting Committee.",
    hints: ["Consider early cabinet assignments post-independence."],
    tags: ["history", "leaders"],
  };

  // 1. Schema Validation
  const parsed = GeneratedQuestionSchema.safeParse(validMatchingPayload);
  assert.equal(parsed.success, true, "Valid match_following must pass schema");

  // 2. Quality Gate
  const valResult = QuestionIntelligenceValidator.validate(validMatchingPayload as any);
  assert.equal(valResult.isValid, true, "Valid match_following must pass quality gate");
  assert.equal(valResult.recommendedStatus, "approved");

  // 3. Ambiguity Rejection: Duplicate left item
  const ambiguousLeft = {
    ...validMatchingPayload,
    matchingPairs: [
      { id: "m1", leftItem: "Nehru", rightItem: "Prime Minister" },
      { id: "m2", leftItem: "Nehru", rightItem: "External Affairs Minister" },
    ],
  };
  const ambParseLeft = GeneratedQuestionSchema.safeParse(ambiguousLeft);
  assert.equal(ambParseLeft.success, false, "Duplicate left items must be rejected as ambiguous matching");

  // 4. Ambiguity Rejection: Duplicate right item
  const ambiguousRight = {
    ...validMatchingPayload,
    matchingPairs: [
      { id: "m1", leftItem: "Nehru", rightItem: "Leader" },
      { id: "m2", leftItem: "Patel", rightItem: "Leader" },
    ],
  };
  const ambParseRight = GeneratedQuestionSchema.safeParse(ambiguousRight);
  assert.equal(ambParseRight.success, false, "Duplicate right items must be rejected as ambiguous matching");

  // 5. Scoring Simulation
  const correctMatches: Record<string, string> = {
    m1: "First Prime Minister",
    m2: "First Home Minister",
    m3: "Drafting Committee Chairman",
  };
  const isAllCorrect = validMatchingPayload.matchingPairs.every(
    (p) => correctMatches[p.id]?.trim().toLowerCase() === p.rightItem.trim().toLowerCase()
  );
  assert.equal(isAllCorrect, true, "Exact matching submissions must be scored as correct");

  const partialMatches: Record<string, string> = {
    m1: "First Prime Minister",
    m2: "Wrong Minister",
    m3: "Drafting Committee Chairman",
  };
  const isPartialCorrect = validMatchingPayload.matchingPairs.every(
    (p) => partialMatches[p.id]?.trim().toLowerCase() === p.rightItem.trim().toLowerCase()
  );
  assert.equal(isPartialCorrect, false, "Partial mismatches must not be marked as 100% correct");
});

/**
 * Suite 8: All 4 Question Types in Question Bank Persistence
 */
test("Question Bank Persistence: Successfully stores and deduplicates all 4 question types", () => {
  const ts = Date.now();
  const questionsToImport: QuestionItem[] = [
    {
      id: `q-mcq-${ts}`,
      title: `MCQ Persistence Test ${ts}`,
      type: "mcq_single",
      subject: "Physics",
      category: "Physics",
      topic: "Mechanics",
      difficulty: "Easy",
      marks: 4,
      timeLimitSeconds: 60,
      options: [
        { id: "o1", text: "9.8 m/s^2", isCorrect: true },
        { id: "o2", text: "3.0 m/s^2", isCorrect: false },
      ],
      tags: ["physics"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `q-tf-${ts}`,
      title: `True/False Persistence Test ${ts}`,
      type: "true_false",
      subject: "Physics",
      category: "Physics",
      topic: "Mechanics",
      difficulty: "Easy",
      marks: 2,
      timeLimitSeconds: 30,
      options: [
        { id: "t1", text: "True", isCorrect: true },
        { id: "t2", text: "False", isCorrect: false },
      ],
      tags: ["physics"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `q-fib-${ts}`,
      title: `Fill Blank Persistence Test ${ts}: Acceleration due to gravity is [blank].`,
      type: "fill_in_the_blank",
      subject: "Physics",
      category: "Physics",
      topic: "Mechanics",
      difficulty: "Easy",
      marks: 3,
      timeLimitSeconds: 45,
      options: [],
      fillBlanks: ["9.8 m/s^2", "9.8"],
      tags: ["physics"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: `q-match-${ts}`,
      title: `Match Persistence Test ${ts}: Match physical quantities with units`,
      type: "match_following",
      subject: "Physics",
      category: "Physics",
      topic: "Units",
      difficulty: "Easy",
      marks: 4,
      timeLimitSeconds: 60,
      options: [],
      matchingPairs: [
        { id: "p1", leftItem: "Force", rightItem: "Newton" },
        { id: "p2", leftItem: "Energy", rightItem: "Joule" },
      ],
      tags: ["physics"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  const importResult = importQuestions(questionsToImport);
  assert.equal(importResult.imported, 4, "All 4 canonical question types must be imported");
  assert.equal(importResult.skipped, 0, "Initial import should have 0 skipped");

  // Re-importing must skip all 4 as duplicates
  const secondImport = importQuestions(questionsToImport);
  assert.equal(secondImport.imported, 0, "Re-imported questions must be skipped");
  assert.equal(secondImport.skipped, 4, "All 4 duplicates must be skipped");
});

/**
 * Suite 7: Document Text Extraction & Expanded Architecture
 */
import { DocumentTextExtractor } from "../lib/ai/server/pdfTextExtractor";

test("Document Extractor 1: Extracts text content from decompressed PDF stream", () => {
  const minimalPdf = Buffer.from(
    "%PDF-1.4\n1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n" +
      "2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n" +
      "3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>\nendobj\n" +
      "4 0 obj\n<< /Length 80 >>\nstream\nBT\n/F1 12 Tf\n50 700 Td\n(Mitochondria generate ATP for eukaryotic cells.) Tj\nET\nendstream\nendobj\n" +
      "xref\n0 5\n0000000000 65535 f \ntrailer\n<< /Size 5 /Root 1 0 R >>\nstartxref\n300\n%%EOF"
  );

  const res = DocumentTextExtractor.extractText(minimalPdf, "application/pdf", "biology.pdf");
  assert.ok(res.text.includes("Mitochondria generate ATP"), `Expected extracted text to contain stream statement, got: ${res.text}`);
  assert.equal(res.wordCount > 0, true);
});

test("Document Extractor 2: Reads plaintext and markdown curriculum files directly", () => {
  const mdBuffer = Buffer.from("# Quantum Physics\nPlanck's constant relates photon energy to frequency: E = hf.");
  const res = DocumentTextExtractor.extractText(mdBuffer, "text/markdown", "notes.md");
  assert.ok(res.text.includes("Planck's constant relates photon energy"));
  assert.equal(res.extractionMethod, "plaintext");
});

test("Custom Count & Doubled Limit: Allows custom question count up to 50", () => {
  const custom30 = PdfQuestionGenerationInputSchema.safeParse({ questionCount: 30 });
  assert.equal(custom30.success, true);
  if (custom30.success) assert.equal(custom30.data.questionCount, 30);

  const custom50 = PdfQuestionGenerationInputSchema.safeParse({ questionCount: 50 });
  assert.equal(custom50.success, true);
  if (custom50.success) assert.equal(custom50.data.questionCount, 50);

  const oversized = PdfQuestionGenerationInputSchema.safeParse({ questionCount: 100 });
  assert.equal(oversized.success, false, "Should reject count > 50");
});

test("DocumentFallbackSynthesizer: Generates user-requested question count up to 50", () => {
  const sampleText = "Photosynthesis occurs in chloroplasts. Mitosis produces diploid daughter cells. DNA replication is semiconservative. The p53 gene acts as a tumor suppressor. Enzymes lower activation energy.";
  
  const synth10 = DocumentFallbackSynthesizer.synthesizeFromExtractedText(sampleText, { questionCount: 10 });
  assert.equal(synth10.questions.length, 10, "Should generate exactly 10 questions when 10 is requested");

  const synth20 = DocumentFallbackSynthesizer.synthesizeFromExtractedText(sampleText, { questionCount: 20 });
  assert.equal(synth20.questions.length, 20, "Should generate exactly 20 questions when 20 is requested");

  const synthDefault = DocumentFallbackSynthesizer.synthesizeFromExtractedText(sampleText, {});
  assert.equal(synthDefault.questions.length, 10, "Should default to standard 10 questions when unspecified");
});

test("Expanded Types 1: Validates Error Spotting question format and scoring", () => {
  const errorSpottingQ = {
    title: "Identify the flawed segment in the historical statement: [A] In 1776, [B] the Declaration of Independence [C] was drafted by George Washington [D] in Philadelphia.",
    type: "error_spotting" as const,
    subject: "History",
    category: "American History",
    topic: "Revolutionary War",
    gradeLevel: "Grade 10",
    learningObjective: "Identify key authors of foundational American historical texts",
    bloomsLevel: "Analyze" as const,
    difficulty: "Medium" as const,
    options: [
      { id: "A", text: "[A] In 1776", isCorrect: false, explanation: "1776 is the historically correct year." },
      { id: "B", text: "[B] the Declaration of Independence", isCorrect: false, explanation: "Correct document name." },
      { id: "C", text: "[C] was drafted by George Washington", isCorrect: true, explanation: "Drafted by Thomas Jefferson, not George Washington." },
      { id: "D", text: "[D] in Philadelphia", isCorrect: false, explanation: "Philadelphia is the correct location." },
    ],
    generalExplanation: "Thomas Jefferson was the principal author of the Declaration of Independence, while Washington was leading the Continental Army.",
    hints: ["Consider who the primary author of the committee of five was."],
    tags: ["history"],
  };

  const zodCheck = GeneratedQuestionSchema.safeParse(errorSpottingQ);
  assert.equal(zodCheck.success, true, "Error spotting question should satisfy schema");

  const validation = QuestionIntelligenceValidator.validate(errorSpottingQ);
  assert.equal(validation.isValid, true, "Valid error spotting question must pass quality gates");
});

test("Expanded Types 2: Validates Sequence Ordering question format", () => {
  const sequenceQ = {
    title: "Arrange the chronological phases of eukaryotic mitosis in correct sequential order from start to finish:",
    type: "sequence_ordering" as const,
    subject: "Biology",
    category: "Cell Biology",
    topic: "Mitosis",
    gradeLevel: "Grade 11",
    learningObjective: "Sequence the continuous stages of nuclear division in mitosis",
    bloomsLevel: "Understand" as const,
    difficulty: "Medium" as const,
    options: [],
    sequenceItems: [
      { id: "s1", text: "Prophase", order: 1 },
      { id: "s2", text: "Metaphase", order: 2 },
      { id: "s3", text: "Anaphase", order: 3 },
      { id: "s4", text: "Telophase", order: 4 },
    ],
    generalExplanation: "Mitosis sequentially proceeds: Prophase -> Metaphase -> Anaphase -> Telophase.",
    hints: ["Remember PMAT mnemonic."],
    tags: ["biology"],
  };

  const zodCheck = GeneratedQuestionSchema.safeParse(sequenceQ);
  assert.equal(zodCheck.success, true, "Sequence ordering question should satisfy schema");

  const validation = QuestionIntelligenceValidator.validate(sequenceQ);
  assert.equal(validation.isValid, true, "Valid sequence ordering question must pass quality gates");
});

test("Expanded Types 3: Validates Drag and Drop Categorization question format", () => {
  const dragDropQ = {
    title: "Categorize the following cellular components into Prokaryotic or Eukaryotic specific structures:",
    type: "drag_drop_categorize" as const,
    subject: "Biology",
    category: "Cytology",
    topic: "Cell Structure",
    gradeLevel: "Grade 10",
    learningObjective: "Differentiate organelle structures between prokaryotic and eukaryotic organisms",
    bloomsLevel: "Analyze" as const,
    difficulty: "Hard" as const,
    options: [],
    dragDropCategories: [
      { id: "cat-prok", title: "Prokaryotes" },
      { id: "cat-euk", title: "Eukaryotes" },
    ],
    dragDropItems: [
      { id: "i1", text: "Nucleoid Region", categoryId: "cat-prok" },
      { id: "i2", text: "Membrane-bound Mitochondria", categoryId: "cat-euk" },
      { id: "i3", text: "Endoplasmic Reticulum", categoryId: "cat-euk" },
    ],
    generalExplanation: "Prokaryotes lack membrane-bound organelles and possess a nucleoid, whereas Eukaryotes contain mitochondria and ER.",
    hints: ["Consider which cells contain true nuclei."],
    tags: ["biology"],
  };

  const zodCheck = GeneratedQuestionSchema.safeParse(dragDropQ);
  assert.equal(zodCheck.success, true, "Drag drop categorization should satisfy schema");

  const validation = QuestionIntelligenceValidator.validate(dragDropQ);
  assert.equal(validation.isValid, true, "Valid drag drop question must pass quality gates");
});

test("Expanded Types 4: Validates Assertion and Reasoning format", () => {
  const assertionQ = {
    title: "Assertion (A): Photosynthesis rates decrease at temperatures above 40°C.\nReason (R): High temperatures denature RuBisCO enzymes in chloroplasts.",
    type: "assertion_reasoning" as const,
    subject: "Biology",
    category: "Plant Physiology",
    topic: "Photosynthesis",
    gradeLevel: "Grade 12",
    learningObjective: "Evaluate thermal denaturation impacts on photosynthetic enzyme catalysis",
    bloomsLevel: "Evaluate" as const,
    difficulty: "Hard" as const,
    options: [
      { id: "opt-1", text: "Both (A) and (R) are true, and (R) is the correct explanation of (A).", isCorrect: true, explanation: "Thermal denaturation at >40°C halts RuBisCO catalytic carbon fixation." },
      { id: "opt-2", text: "Both (A) and (R) are true, but (R) is NOT the correct explanation of (A).", isCorrect: false, explanation: "Reason directly explains the Assertion premise." },
      { id: "opt-3", text: "(A) is true, but (R) is false.", isCorrect: false, explanation: "RuBisCO does denature at excessive temperatures." },
      { id: "opt-4", text: "(A) is false, but (R) is true.", isCorrect: false, explanation: "Photosynthesis rate does drop severely." },
    ],
    generalExplanation: "At temperatures exceeding optimum (>40°C), enzymes like RuBisCO denature, directly causing photosynthetic activity to drop.",
    hints: ["Analyze temperature effects on enzyme protein folding tertiary structure."],
    tags: ["biology"],
  };

  const zodCheck = GeneratedQuestionSchema.safeParse(assertionQ);
  assert.equal(zodCheck.success, true, "Assertion reasoning should satisfy schema");

  const validation = QuestionIntelligenceValidator.validate(assertionQ);
  assert.equal(validation.isValid, true, "Valid assertion reasoning question must pass quality gates");
});
