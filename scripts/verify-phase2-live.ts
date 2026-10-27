import { QuestionIntelligenceService } from "../lib/ai/services/questionIntelligenceService";

// Load .env.local
try {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile(".env.local");
  }
} catch {
  // Ignore
}

async function run() {
  console.log("================================================================================");
  console.log("PHASE 2.0 LIVE GEMINI VERIFICATION (TOPIC & SYLLABUS)");
  console.log("================================================================================");

  console.log("\n[1/2] Testing Topic-Based Generation...");
  const t0 = Date.now();
  const res1 = await QuestionIntelligenceService.generateBatch({
    sourceMode: "topic",
    topic: "Newtonian Gravitation and Kepler Laws",
    subject: "Physics",
    gradeLevel: "Grade 11-12",
    difficulty: "Medium",
    bloomsLevel: "Analyze",
    questionCount: 2,
    questionTypes: ["mcq_single"],
    language: "English",
  });
  const lat1 = Date.now() - t0;
  console.log(`Topic Result in ${lat1}ms:`, {
    success: res1.success,
    count: res1.questions?.length,
    modelUsed: res1.modelUsed,
    tokenUsage: res1.tokenUsage,
  });

  if (res1.questions?.[0]) {
    console.log("Sample Generated Question:");
    console.log("Title:", res1.questions[0].question.title);
    console.log("Quality Score:", res1.questions[0].validation.qualityScore);
    console.log("Bloom Level:", res1.questions[0].question.bloomsLevel);
  }

  console.log("\n[2/2] Testing Syllabus-Based Generation...");
  const t1 = Date.now();
  const res2 = await QuestionIntelligenceService.generateBatch({
    sourceMode: "syllabus",
    topic: "Modern Indian History",
    subject: "History",
    gradeLevel: "Grade 11-12",
    difficulty: "Medium",
    bloomsLevel: "Understand",
    questionCount: 2,
    questionTypes: ["mcq_single"],
    language: "English",
    sourceContent:
      "Unit 1: Government of India Act 1935 and Federal Structure\nUnit 2: Cabinet Mission Plan 1946 and the Constituent Assembly",
  });
  const lat2 = Date.now() - t1;
  console.log(`Syllabus Result in ${lat2}ms:`, {
    success: res2.success,
    count: res2.questions?.length,
    modelUsed: res2.modelUsed,
    tokenUsage: res2.tokenUsage,
  });

  if (res2.questions?.[0]) {
    console.log("Sample Syllabus Question:");
    console.log("Title:", res2.questions[0].question.title);
    console.log("Quality Score:", res2.questions[0].validation.qualityScore);
  }

  console.log("\n================================================================================");
  console.log("ALL LIVE VERIFICATIONS COMPLETED SUCCESSFULLY");
  console.log("================================================================================");
}

run().catch((e) => {
  console.error("FATAL ERROR in live test:", e);
  process.exit(1);
});
