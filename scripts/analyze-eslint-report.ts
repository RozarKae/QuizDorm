import fs from "fs";
import path from "path";

interface ESLintMessage {
  ruleId: string | null;
  severity: number;
  message: string;
  line: number;
  column: number;
  nodeType?: string;
  messageId?: string;
  endLine?: number;
  endColumn?: number;
}

interface ESLintFileResult {
  filePath: string;
  messages: ESLintMessage[];
  errorCount: number;
  warningCount: number;
  fatalErrorCount: number;
}

const raw = fs.readFileSync("eslint-report.json", "utf-8");
const results: ESLintFileResult[] = JSON.parse(raw);

let totalErrors = 0;
let totalWarnings = 0;
const ruleCounts: Record<string, { count: number; severity: number }> = {};
const fileCounts: Record<string, { total: number; rules: Record<string, number> }> = {};
const categoryCounts: Record<string, number> = {
  "app (pages/routes)": 0,
  "components": 0,
  "lib": 0,
  "__tests__": 0,
  "config/other": 0,
};

for (const res of results) {
  totalErrors += res.errorCount;
  totalWarnings += res.warningCount;

  const relPath = path.relative(process.cwd(), res.filePath).replace(/\\/g, "/");

  let cat = "config/other";
  if (relPath.startsWith("app/")) cat = "app (pages/routes)";
  else if (relPath.startsWith("components/")) cat = "components";
  else if (relPath.startsWith("lib/")) cat = "lib";
  else if (relPath.startsWith("__tests__/")) cat = "__tests__";

  if (res.messages.length > 0) {
    fileCounts[relPath] = { total: res.messages.length, rules: {} };
    categoryCounts[cat] = (categoryCounts[cat] || 0) + res.messages.length;

    for (const msg of res.messages) {
      const rule = msg.ruleId || "unknown";
      ruleCounts[rule] = ruleCounts[rule] || { count: 0, severity: msg.severity };
      ruleCounts[rule].count++;
      fileCounts[relPath].rules[rule] = (fileCounts[relPath].rules[rule] || 0) + 1;
    }
  }
}

console.log("=================================================");
console.log(`TOTAL FILES ANALYZED: ${results.length}`);
console.log(`TOTAL ERRORS: ${totalErrors}`);
console.log(`TOTAL WARNINGS: ${totalWarnings}`);
console.log("=================================================");

console.log("\n--- WARNING COUNTS BY CATEGORY/FOLDER ---");
for (const [cat, count] of Object.entries(categoryCounts)) {
  console.log(`${cat.padEnd(25)}: ${count}`);
}

console.log("\n--- WARNING COUNTS BY RULE ---");
const sortedRules = Object.entries(ruleCounts).sort((a, b) => b[1].count - a[1].count);
for (const [rule, data] of sortedRules) {
  console.log(`${rule.padEnd(45)}: ${data.count} (sev: ${data.severity})`);
}

console.log("\n--- TOP 25 FILES WITH HIGHEST WARNING COUNTS ---");
const sortedFiles = Object.entries(fileCounts).sort((a, b) => b[1].total - a[1].total);
for (let i = 0; i < Math.min(25, sortedFiles.length); i++) {
  const [file, data] = sortedFiles[i];
  const topRules = Object.entries(data.rules)
    .sort((a, b) => b[1] - a[1])
    .map(([r, c]) => `${r}:${c}`)
    .join(", ");
  console.log(`${(i + 1).toString().padStart(2)}. [${data.total.toString().padStart(3)}] ${file}`);
  console.log(`     Top rules: ${topRules}`);
}
