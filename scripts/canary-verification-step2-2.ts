import { AIServerConfig } from "../lib/ai/server/aiConfig";
import { GeminiQuestionProvider } from "../lib/ai/server/geminiQuestionProvider";
import { QuestionIntelligenceService } from "../lib/ai/services/questionIntelligenceService";
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";
import { GeneratedQuestion } from "../lib/ai/schemas/questionGenerationSchema";
import * as fs from "fs";
import * as path from "path";

// Load .env.local if present
try {
  if (typeof (process as any).loadEnvFile === "function") {
    (process as any).loadEnvFile(".env.local");
  }
} catch (e) {}

interface CanarySpecification {
  id: string;
  categoryType: string;
  topic: string;
  subject: string;
  category: string;
  gradeLevel: string;
  bloomsLevel: "Remember" | "Understand" | "Apply" | "Analyze" | "Evaluate";
  difficulty: "Easy" | "Medium" | "Hard";
  learningObjective: string;
  expectedDefensibleAnswer: string;
  authoritativeSource?: string;
  timeSensitive?: boolean;
}

const CANARY_SPECIFICATIONS: CanarySpecification[] = [
  {
    id: "canary-01-factual-recall",
    categoryType: "1. Factual Recall",
    topic: "Endocrine System & Hormones",
    subject: "Science",
    category: "Human Biology",
    gradeLevel: "Grade 9-10",
    bloomsLevel: "Remember",
    difficulty: "Easy",
    learningObjective: "Recall the primary endocrine gland and specific cell clusters responsible for insulin synthesis in humans.",
    expectedDefensibleAnswer: "Pancreas (beta cells of the islets of Langerhans)",
    authoritativeSource: "Guyton and Hall Textbook of Medical Physiology (14th Ed), Ch 79; NCERT Science Class X",
    timeSensitive: false,
  },
  {
    id: "canary-02-history-entity-date",
    categoryType: "2. History / Current Affairs (Date & Named Entity)",
    topic: "Indian Constitutional Assembly Drafting Committee",
    subject: "History",
    category: "Indian Polity & Constitutional History",
    gradeLevel: "Grade 11-12",
    bloomsLevel: "Remember",
    difficulty: "Medium",
    learningObjective: "Identify the chairperson appointed by the Constituent Assembly to head the Drafting Committee on August 29, 1947.",
    expectedDefensibleAnswer: "Dr. B. R. Ambedkar",
    authoritativeSource: "Constituent Assembly Debates (CAD Vol. V); Gazette of India Extraordinary August 29, 1947",
    timeSensitive: false,
  },
  {
    id: "canary-03-science-core",
    categoryType: "3. Science (Thermodynamics & Physical Chemistry)",
    topic: "Second Law of Thermodynamics & Entropy",
    subject: "Science",
    category: "Physics & Physical Chemistry",
    gradeLevel: "Grade 11-12",
    bloomsLevel: "Understand",
    difficulty: "Medium",
    learningObjective: "State and comprehend the implications of the Second Law of Thermodynamics regarding the entropy of an isolated system.",
    expectedDefensibleAnswer: "The total entropy of an isolated thermodynamic system always increases or remains constant in a reversible process; it never decreases spontaneously.",
    authoritativeSource: "Halliday, Resnick, Walker Fundamentals of Physics (11th Ed), Ch 20 (Entropy and the Second Law)",
    timeSensitive: false,
  },
  {
    id: "canary-04-conceptual-application",
    categoryType: "4. Conceptual Application",
    topic: "Central Banking & Cash Reserve Ratio (CRR)",
    subject: "Economics",
    category: "Macroeconomics",
    gradeLevel: "Undergraduate",
    bloomsLevel: "Apply",
    difficulty: "Hard",
    learningObjective: "Apply macroeconomic liquidity transmission principles to determine the direct consequence of raising the Cash Reserve Ratio on bank credit creation and money supply.",
    expectedDefensibleAnswer: "It restricts the lendable reserves of commercial banks, reduces the money multiplier, and contracts the broad money supply.",
    authoritativeSource: "Mankiw Macroeconomics (10th Ed), Ch 11: The Monetary System; RBI Operating Framework of Monetary Policy",
    timeSensitive: false,
  },
  {
    id: "canary-05-common-misconception",
    categoryType: "5. Testing Common Misconceptions",
    topic: "Planetary Seasons & Earth's Axial Tilt",
    subject: "Science",
    category: "Earth & Planetary Science",
    gradeLevel: "Grade 9-10",
    bloomsLevel: "Understand",
    difficulty: "Medium",
    learningObjective: "Differentiate between the true physical cause of Earth's seasons (axial tilt) and the widespread misconception of distance from the Sun (orbital eccentricity).",
    expectedDefensibleAnswer: "The tilt of Earth's rotational axis (approx. 23.5 degrees) relative to its orbital plane around the Sun.",
    authoritativeSource: "NASA Science Solar System Exploration: What Causes the Seasons?; Tarbuck & Lutgens Earth Science (15th Ed)",
    timeSensitive: false,
  },
];

export async function runCanarySuite() {
  console.log("================================================================================");
  console.log("QUIZDORM STEP 2.2: LIVE GEMINI INTEGRATION & CANARY BENCHMARK");
  console.log("================================================================================\n");

  // 1. Connectivity Check
  const isConfigured = AIServerConfig.isGeminiConfigured();
  console.log(`[Check 1] Environment Configured: ${isConfigured ? "YES (Key Present in Process)" : "NO"}`);
  console.log(`[Check 2] Default Model Configured: ${AIServerConfig.DEFAULT_MODEL}`);
  console.log(`[Check 3] Fallback Model Configured: ${AIServerConfig.FALLBACK_MODEL}`);

  if (!isConfigured) {
    console.error("CRITICAL: GEMINI_API_KEY is not configured. Halting canary execution.");
    process.exit(1);
  }

  // Check .gitignore
  const gitignorePath = path.join(process.cwd(), ".gitignore");
  const gitignoreContent = fs.existsSync(gitignorePath) ? fs.readFileSync(gitignorePath, "utf-8") : "";
  const isEnvIgnored = gitignoreContent.includes(".env");
  console.log(`[Check 4] .env.local Excluded from Git Tracking: ${isEnvIgnored ? "VERIFIED (.env* ignored)" : "FAILED"}\n`);

  // 2. Connectivity Ping
  console.log("--------------------------------------------------------------------------------");
  console.log("PHASE 1: LIVE CONNECTIVITY PING");
  console.log("--------------------------------------------------------------------------------");
  const provider = new GeminiQuestionProvider();
  const pingStart = Date.now();
  try {
    const health = await provider.checkHealth();
    console.log(`Provider Health Check: Ready=${health.configured}, Model=${health.model}`);
  } catch (err: any) {
    console.error(`Connectivity ping failed: ${err.message}`);
    process.exit(1);
  }

  // 3. Canary Question Generation (5 Questions)
  console.log("\n--------------------------------------------------------------------------------");
  console.log("PHASE 2: 5-QUESTION CANARY GENERATION & QUALITY GATE AUDIT");
  console.log("--------------------------------------------------------------------------------\n");

  const results: any[] = [];

  for (let i = 0; i < CANARY_SPECIFICATIONS.length; i++) {
    const spec = CANARY_SPECIFICATIONS[i];
    console.log(`[Canary ${i + 1}/5] Generating: ${spec.categoryType}`);
    console.log(`    Topic: "${spec.topic}" | Bloom: ${spec.bloomsLevel} | Diff: ${spec.difficulty}`);

    const genStart = Date.now();
    try {
      const genResult = await QuestionIntelligenceService.generateAndValidate({
        topic: spec.topic,
        subject: spec.subject,
        category: spec.category,
        gradeLevel: spec.gradeLevel,
        bloomsLevel: spec.bloomsLevel,
        difficulty: spec.difficulty,
        questionType: "mcq_single",
        learningObjective: spec.learningObjective,
      });

      const genDuration = Date.now() - genStart;

      if (!genResult.success || !genResult.question) {
        console.error(`    FAILED (${genDuration}ms): ${genResult.error} (Code: ${genResult.errorCode})`);
        results.push({
          spec,
          success: false,
          error: genResult.error,
          errorCode: genResult.errorCode,
          durationMs: genDuration,
        });
        continue;
      }

      const q = genResult.question;
      const v = genResult.validation;

      console.log(`    SUCCESS in ${genDuration}ms (Model: ${genResult.modelUsed})`);
      console.log(`    Stem: "${q.title}"`);
      const correctOpt = q.options.find((o) => o.isCorrect);
      console.log(`    Designated Correct Option: [${correctOpt?.id}] "${correctOpt?.text}"`);
      console.log(`    Options Count: ${q.options.length}`);
      console.log(`    Distractors Count: ${q.options.filter((o) => !o.isCorrect).length}`);
      console.log(`    Quality Score: ${v.qualityScore}/100 | Stem Clarity: ${v.stemClarityScore}/100 | Distractor Score: ${v.distractorHomogeneityScore}/100`);
      console.log(`    Status: ${v.recommendedStatus.toUpperCase()} | Issues: ${v.issues.length}`);
      if (v.issues.length > 0) {
        console.log(`    Issues:`, JSON.stringify(v.issues));
      }
      console.log(`    Authoritative Source: ${spec.authoritativeSource}\n`);

      results.push({
        spec,
        success: true,
        question: q,
        validation: v,
        durationMs: genDuration,
        modelUsed: genResult.modelUsed,
        tokenUsage: genResult.tokenUsage,
      });
    } catch (err: any) {
      const genDuration = Date.now() - genStart;
      console.error(`    EXCEPTION in ${genDuration}ms: ${err.message}\n`);
      results.push({
        spec,
        success: false,
        error: err.message,
        durationMs: genDuration,
      });
    }
  }

  // 4. Failure Handling Checks
  console.log("--------------------------------------------------------------------------------");
  console.log("PHASE 3: FAILURE HANDLING & SECURITY TESTS");
  console.log("--------------------------------------------------------------------------------");

  // Test 4.1: Missing Body in API Route
  console.log("[Failure Test 1] Missing/invalid generation payload handling:");
  const invalidInputRes = await QuestionIntelligenceService.generateAndValidate({});
  console.log(`  Invalid Payload correctly rejected: ${!invalidInputRes.success} (Code: ${invalidInputRes.errorCode})`);

  // Test 4.2: Timeout handling
  console.log("[Failure Test 2] Enforced timeout handling (1ms timeout):");
  const timeoutRes = await QuestionIntelligenceService.generateAndValidate(
    {
      topic: "Quantum Entanglement",
      subject: "Science",
      category: "Physics",
      gradeLevel: "Undergraduate",
      learningObjective: "Understand quantum non-locality",
    },
    { timeoutMs: 1 }
  );
  console.log(`  Timeout cleanly intercepted: ${!timeoutRes.success} (Code: ${timeoutRes.errorCode})`);

  // Test 4.3: Malformed non-JSON provider handling
  console.log("[Failure Test 3] Malformed non-JSON response handling:");
  const mockBadProvider = {
    id: "mock-bad",
    name: "Mock Bad Provider",
    generateQuestionRaw: async () => ({
      rawJsonString: "<<MALFORMED_NON_JSON_RESPONSE>>",
      modelUsed: "mock-model",
      latencyMs: 10,
    }),
    checkHealth: async () => ({ configured: true, model: "mock" }),
  };
  const malformedRes = await QuestionIntelligenceService.generateAndValidate(
    {
      topic: "Cell Division",
      subject: "Science",
      category: "Biology",
      gradeLevel: "Grade 9-10",
      learningObjective: "Describe mitosis phases",
    },
    { providerOverride: mockBadProvider as any }
  );
  console.log(`  Malformed output cleanly handled: ${!malformedRes.success} (Code: ${malformedRes.errorCode})`);

  console.log("\n================================================================================");
  const passedCount = results.filter((r) => r.success && r.validation?.isValid).length;
  console.log(`CANARY SUMMARY: ${passedCount}/5 Questions Passed Generation & Validation`);
  console.log("================================================================================\n");

  return {
    results,
    passedCount,
    totalCount: CANARY_SPECIFICATIONS.length,
  };
}

if (process.argv[1] && process.argv[1].includes("canary-verification-step2-2")) {
  runCanarySuite();
}
