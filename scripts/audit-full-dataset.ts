import * as fs from "fs";
import * as path from "path";
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";

interface RawQuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  explanation?: string;
}

interface RawQuestion {
  id: string;
  title: string;
  type?: string;
  subject?: string;
  category?: string;
  difficulty?: string;
  options: RawQuestionOption[];
  explanation?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export interface QuestionAuditClassification {
  id: string;
  title: string;
  subject: string;
  category?: string;
  issues: string[];
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "CLEAN";
  details: string[];
  originalQuestion: RawQuestion;
}

export function runFullDatasetAudit() {
  const filePath = path.join(process.cwd(), "lib/data/imported-questions.json");
  const rawData = fs.readFileSync(filePath, "utf-8");
  const questions: RawQuestion[] = JSON.parse(rawData);

  console.log(`Loaded ${questions.length} questions from imported-questions.json\n`);

  const classifications: QuestionAuditClassification[] = [];
  const issueCounts: Record<string, number> = {
    valid_stem_invalid_distractors: 0,
    incomplete_or_context_dependent_stem: 0,
    ocr_or_pdf_extraction_artifact: 0,
    incorrect_or_uncertain_answer_key: 0,
    duplicate_or_near_duplicate_question: 0,
    ambiguous_or_multiple_correct_answers: 0,
    missing_or_unreliable_explanation: 0,
    incomplete_source_evidence: 0,
    structurally_invalid_record: 0,
    unrecoverable_fragment: 0,
  };

  const stemMap = new Map<string, string[]>(); // normalized stem -> ids

  // Helper for text normalization
  const normalizeText = (t: string) =>
    t.toLowerCase().replace(/[^a-z0-9]/g, " ").replace(/\s+/g, " ").trim();

  // Populate stem map for duplicate detection
  for (const q of questions) {
    const norm = normalizeText(q.title || "");
    if (!stemMap.has(norm)) {
      stemMap.set(norm, []);
    }
    stemMap.get(norm)!.push(q.id);
  }

  for (const q of questions) {
    const issues: string[] = [];
    const details: string[] = [];
    const title = q.title || "";
    const options = q.options || [];

    // 1. Structural validation
    if (!title || title.trim().length < 15) {
      issues.push("unrecoverable_fragment");
      details.push("Stem is empty or under 15 characters");
    }
    if (!options || options.length < 2) {
      issues.push("structurally_invalid_record");
      details.push(`Has ${options.length} options (minimum 2 required)`);
    }

    // 2. Answer key check
    const correctOptions = options.filter((o) => o.isCorrect);
    if (correctOptions.length === 0) {
      issues.push("incorrect_or_uncertain_answer_key");
      details.push("Zero options marked as isCorrect: true");
    } else if (correctOptions.length > 1 && q.type !== "mcq_multiple") {
      issues.push("incorrect_or_uncertain_answer_key");
      details.push(`Multiple options (${correctOptions.length}) marked isCorrect in single-choice question`);
    }

    // 3. OCR / PDF extraction artifacts
    if (/<<<PAGE_\d+>>>/i.test(title) || /\[\d+\]/.test(title) || /\bpage\s+\d+\b/i.test(title)) {
      issues.push("ocr_or_pdf_extraction_artifact");
      details.push("Contains raw pagination markers (<<<PAGE_...>>> or [N])");
    }

    // 4. Incomplete / context-dependent stem (orphan pronouns)
    if (/^(who|which|what|where|when|how)\s+(is|was|were|did)\s+(he|she|it|they|this|that)\b/i.test(title.trim())) {
      issues.push("incomplete_or_context_dependent_stem");
      details.push("Begins with orphan pronoun lacking antecedent ('Who is he', etc.)");
    } else if (/\b(solve for x|find x|evaluate the expression)\b/i.test(title) && !/[=+\-*/^]/.test(title)) {
      issues.push("incomplete_or_context_dependent_stem");
      details.push("Mathematical instruction without equation premise");
    }

    // 5. Duplicate check
    const norm = normalizeText(title);
    const dups = stemMap.get(norm) || [];
    if (dups.length > 1) {
      issues.push("duplicate_or_near_duplicate_question");
      details.push(`Exact duplicate stem with questions: ${dups.filter((id) => id !== q.id).join(", ")}`);
    }

    // 6. Explanation completeness
    const hasMasterExplanation = q.explanation && q.explanation.trim().length >= 10;
    const missingOptionExplanations = options.some((o) => !o.explanation || o.explanation.trim().length < 5);
    if (!hasMasterExplanation || missingOptionExplanations) {
      issues.push("missing_or_unreliable_explanation");
      details.push("Lacks comprehensive master explanation or individual option rationales");
    }

    // 7. Source evidence
    if (!q.source || q.source.trim().length === 0) {
      issues.push("incomplete_source_evidence");
      details.push("No traceable source or citation metadata provided");
    }

    // 8. Distractor validity & categorical homogeneity
    const validation = QuestionIntelligenceValidator.validate(q as any);
    const distractorIssues = validation.issues.filter(
      (i) => i.code.includes("DISTRACTOR") || i.code.includes("CATEGORICAL") || i.code.includes("OPTIONS")
    );
    if (distractorIssues.length > 0) {
      issues.push("valid_stem_invalid_distractors");
      details.push(...distractorIssues.map((i) => `${i.code}: ${i.message}`));
    }

    // 9. Ambiguity / Multiple defensible answers
    const ambiguityIssues = validation.issues.filter(
      (i) => i.code.includes("DUPLICATE_OPTION") || i.code.includes("NUMERICAL_EQUIVALENCE")
    );
    if (ambiguityIssues.length > 0) {
      issues.push("ambiguous_or_multiple_correct_answers");
      details.push(...ambiguityIssues.map((i) => `${i.code}: ${i.message}`));
    }

    // Tally issues
    issues.forEach((iss) => {
      if (issueCounts[iss] !== undefined) {
        issueCounts[iss]++;
      }
    });

    // Severity assessment
    let severity: QuestionAuditClassification["severity"] = "LOW";
    if (issues.includes("unrecoverable_fragment") || issues.includes("structurally_invalid_record")) {
      severity = "CRITICAL";
    } else if (
      issues.includes("incorrect_or_uncertain_answer_key") ||
      issues.includes("incomplete_or_context_dependent_stem") ||
      issues.includes("ocr_or_pdf_extraction_artifact")
    ) {
      severity = "HIGH";
    } else if (issues.includes("valid_stem_invalid_distractors") || issues.includes("ambiguous_or_multiple_correct_answers")) {
      severity = "MEDIUM";
    } else if (issues.length === 0) {
      severity = "CLEAN";
    }

    classifications.push({
      id: q.id,
      title,
      subject: q.subject || "General",
      category: q.category,
      issues,
      severity,
      details,
      originalQuestion: q,
    });
  }

  // Summary Report Output
  console.log("================================================================================");
  console.log("FULL DATASET AUDIT SUMMARY (478 QUESTIONS)");
  console.log("================================================================================\n");

  console.log("ISSUE COUNTS ACROSS ALL 478 QUESTIONS:");
  for (const [key, count] of Object.entries(issueCounts)) {
    console.log(`- ${key.padEnd(42)}: ${count} (${((count / questions.length) * 100).toFixed(1)}%)`);
  }

  const severityCounts = {
    CRITICAL: classifications.filter((c) => c.severity === "CRITICAL").length,
    HIGH: classifications.filter((c) => c.severity === "HIGH").length,
    MEDIUM: classifications.filter((c) => c.severity === "MEDIUM").length,
    LOW: classifications.filter((c) => c.severity === "LOW").length,
    CLEAN: classifications.filter((c) => c.severity === "CLEAN").length,
  };

  console.log("\nSEVERITY BREAKDOWN:");
  for (const [sev, count] of Object.entries(severityCounts)) {
    console.log(`- ${sev.padEnd(10)}: ${count} (${((count / questions.length) * 100).toFixed(1)}%)`);
  }

  return {
    totalQuestions: questions.length,
    issueCounts,
    severityCounts,
    classifications,
  };
}

if (process.argv[1] && process.argv[1].includes("audit-full-dataset")) {
  runFullDatasetAudit();
}
