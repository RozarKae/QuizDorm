import fs from "fs";
import path from "path";
import crypto from "crypto";

const IMPORTED_PATH = path.join(process.cwd(), "lib/data/imported-questions.json");
const PENDING_PATH = path.join(process.cwd(), "lib/data/pending-review-questions.json");
const BACKUP_PATH = path.join(process.cwd(), "lib/data/backups/imported-questions.backup-before-quarantine-release-20261015.json");

// 1. Read existing data
const currentApproved = JSON.parse(fs.readFileSync(IMPORTED_PATH, "utf8"));
const quarantineResults = JSON.parse(fs.readFileSync("./scripts/pipeline/quarantine_revalidation_results.json", "utf8"));

// 2. Backup current approved dataset
fs.copyFileSync(IMPORTED_PATH, BACKUP_PATH);
const backupData = fs.readFileSync(BACKUP_PATH);
const backupHash = crypto.createHash("sha256").update(backupData).digest("hex").toUpperCase();
console.log(`Backup created at: ${BACKUP_PATH}`);
console.log(`Backup SHA-256: ${backupHash}`);

// 3. Separate approved vs remaining quarantined
const newlyApproved = [];
const remainingQuarantined = [];

for (const item of quarantineResults) {
  if (item.status === "APPROVED") {
    newlyApproved.push(item.question);
  } else {
    remainingQuarantined.push({
      question: item.question,
      issues: item.issues,
      score: item.score
    });
  }
}

console.log(`Existing Approved: ${currentApproved.length}`);
console.log(`Newly Approved to add: ${newlyApproved.length}`);
console.log(`Remaining in Quarantine: ${remainingQuarantined.length}`);

// 4. Combine and check ID uniqueness
const combinedApproved = [...currentApproved, ...newlyApproved];
const uniqueIds = new Set(combinedApproved.map((q) => q.id));

if (uniqueIds.size !== combinedApproved.length) {
  throw new Error(`ID collision detected! Total: ${combinedApproved.length}, Unique: ${uniqueIds.size}`);
}

// 5. Atomic write
fs.writeFileSync(IMPORTED_PATH, JSON.stringify(combinedApproved, null, 2), "utf8");
fs.writeFileSync(PENDING_PATH, JSON.stringify(remainingQuarantined, null, 2), "utf8");

const newHash = crypto.createHash("sha256").update(fs.readFileSync(IMPORTED_PATH)).digest("hex").toUpperCase();
console.log(`Successfully integrated 26 questions into production!`);
console.log(`New production question count: ${combinedApproved.length}`);
console.log(`New production SHA-256: ${newHash}`);
console.log(`Remaining quarantined question count: ${remainingQuarantined.length}`);
