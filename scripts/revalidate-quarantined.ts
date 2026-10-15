import fs from "fs";
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";

const pending = JSON.parse(fs.readFileSync("./lib/data/pending-review-questions.json", "utf8"));

console.log(`Revalidating ${pending.length} quarantined questions...\n`);

const revalidated = [];
let passCount = 0;
let failCount = 0;

for (let i = 0; i < pending.length; i++) {
  const item = pending[i];
  const q = item.question;
  const result = QuestionIntelligenceValidator.validate(q);
  
  if (result.isValid && result.recommendedStatus === "approved") {
    passCount++;
    revalidated.push({
      id: q.id,
      title: q.title,
      status: "APPROVED",
      score: result.qualityScore,
      issues: result.issues,
      question: q
    });
    console.log(`[PASS] ${q.id} (Score: ${result.qualityScore}): ${q.title}`);
  } else {
    failCount++;
    revalidated.push({
      id: q.id,
      title: q.title,
      status: "QUARANTINED",
      score: result.qualityScore,
      issues: result.issues,
      question: q
    });
    console.log(`[FAIL/QUARANTINE] ${q.id} (Score: ${result.qualityScore}): ${q.title}`);
    console.log(`   Issues:`, result.issues);
  }
}

console.log(`\nRevalidation Summary:`);
console.log(`- Total Checked: ${pending.length}`);
console.log(`- Now Approved: ${passCount}`);
console.log(`- Still Quarantined (Defective/Unresolved): ${failCount}`);

fs.writeFileSync("./scripts/pipeline/quarantine_revalidation_results.json", JSON.stringify(revalidated, null, 2));
