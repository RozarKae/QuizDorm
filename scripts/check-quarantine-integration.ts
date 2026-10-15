import fs from "fs";
import { DuplicateDetectionEngine } from "../lib/quality/duplicateEngine";

const currentApproved = JSON.parse(fs.readFileSync("./lib/data/imported-questions.json", "utf8"));
const quarantineResults = JSON.parse(fs.readFileSync("./scripts/pipeline/quarantine_revalidation_results.json", "utf8"));

const newlyApproved = quarantineResults
  .filter((r: any) => r.status === "APPROVED")
  .map((r: any) => r.question);

console.log(`Current approved count: ${currentApproved.length}`);
console.log(`Newly approved candidate count: ${newlyApproved.length}`);

// 1. Check ID collisions
const currentIds = new Set(currentApproved.map((q: any) => q.id));
const collisions = newlyApproved.filter((q: any) => currentIds.has(q.id));
console.log(`ID collisions: ${collisions.length}`);

// 2. Check semantic & stem duplicates
let duplicatesFound = 0;
for (const q of newlyApproved) {
  const alerts = DuplicateDetectionEngine.detectDuplicates(q, currentApproved);
  const severe = alerts.filter((a) => a.similarityPercent >= 80);
  if (severe.length > 0) {
    duplicatesFound++;
    console.log(`Duplicate found for ${q.id}:`, severe);
  }
}
console.log(`Near/Exact Duplicates detected in newly approved pool: ${duplicatesFound}`);
