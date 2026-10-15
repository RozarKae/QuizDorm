import { GeminiQuestionProvider } from "../lib/ai/server/geminiQuestionProvider";
import { QuestionIntelligenceService } from "../lib/ai/services/questionIntelligenceService";

// Load .env.local if present
try {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile(".env.local");
  }
} catch (e) {
  // Ignore if already loaded or missing
}

async function runLiveTest() {
  console.log("================================================================================");
  console.log("QUIZDORM LIVE GEMINI API VERIFICATION");
  console.log("================================================================================");

  const provider = new GeminiQuestionProvider();
  const health = await provider.checkHealth();
  console.log(`Configured: ${health.configured}`);
  console.log(`Model: ${health.model}`);

  if (!health.configured) {
    console.error("FAIL: GEMINI_API_KEY is not configured in process.env");
    process.exit(1);
  }

  console.log(`\nAttempting live question generation request with default model (${health.model})...`);
  const startTime = Date.now();

  try {
    const result = await QuestionIntelligenceService.generateAndValidate(
      {
        topic: "Mitochondrial Chemiosmosis",
        subject: "Science",
        category: "Biology",
        gradeLevel: "Grade 11-12",
        bloomsLevel: "Analyze",
        difficulty: "Medium",
        questionType: "mcq_single",
        learningObjective: "Understand the proton electrochemical gradient during oxidative phosphorylation.",
      },
      { timeoutMs: 30000 }
    );

    const latency = Date.now() - startTime;
    if (!result.success || !result.question) {
      console.error(`\n>>> API Request Returned Error in ${latency}ms:`, result.error, `(Code: ${result.errorCode})`);
      if (result.validation?.issues) {
        console.error("Validation issues:", JSON.stringify(result.validation.issues, null, 2));
      }
      process.exit(1);
    }

    console.log(`\n================================================================================`);
    console.log(`>>> LIVE GENERATION SUCCESSFUL in ${latency}ms (Provider Latency: ${result.latencyMs}ms)`);
    console.log(`================================================================================`);
    console.log(`Model Used: ${result.modelUsed}`);
    console.log(`Token Usage: Prompt=${result.tokenUsage?.promptTokens}, Completion=${result.tokenUsage?.completionTokens}, Total=${result.tokenUsage?.totalTokens}`);
    console.log(`\nQUESTION STEM:`);
    console.log(`"${result.question.title}"`);
    console.log(`\nOPTIONS:`);
    result.question.options.forEach((opt, idx) => {
      const marker = opt.isCorrect ? "[CORRECT]" : "[DISTRACTOR]";
      console.log(`  ${String.fromCharCode(65 + idx)}. ${marker} ${opt.text}`);
      console.log(`     Explanation: ${opt.explanation}`);
      if (opt.misconceptionType) {
        console.log(`     Misconception: ${opt.misconceptionType}`);
      }
    });
    console.log(`\nGENERAL EXPLANATION:`);
    console.log(result.question.generalExplanation);
    console.log(`\nQUALITY VALIDATION:`);
    console.log(`  Overall Quality Score: ${result.validation.qualityScore}/100`);
    console.log(`  Stem Clarity Score: ${result.validation.stemClarityScore}/100`);
    console.log(`  Distractor Homogeneity Score: ${result.validation.distractorHomogeneityScore}/100`);
    console.log(`  Recommended Status: ${result.validation.recommendedStatus.toUpperCase()}`);
    console.log(`  Issues Detected: ${result.validation.issues.length}`);
    if (result.validation.issues.length > 0) {
      console.log("  Issues:", result.validation.issues);
    }
    console.log(`================================================================================\n`);
  } catch (err: any) {
    const latency = Date.now() - startTime;
    console.error(`\n>>> EXCEPTION in ${latency}ms:`, err.message);
    process.exit(1);
  }
}

runLiveTest();
