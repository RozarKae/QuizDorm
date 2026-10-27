import fs from "fs";

interface ESLintMessage {
  ruleId: string | null;
  severity: number;
  message: string;
  line: number;
  column: number;
}

interface ESLintFileResult {
  filePath: string;
  messages: ESLintMessage[];
}

const raw = fs.readFileSync("eslint-report.json", "utf-8");
const results: ESLintFileResult[] = JSON.parse(raw);

const anyList: string[] = [];

for (const res of results) {
  for (const msg of res.messages) {
    if (msg.ruleId === "@typescript-eslint/no-explicit-any") {
      const rel = res.filePath.replace(process.cwd() + "\\", "").replace(/\\/g, "/");
      anyList.push(`${rel}:${msg.line}:${msg.column} -> ${msg.message}`);
    }
  }
}

console.log(`Total remaining any: ${anyList.length}`);
fs.writeFileSync("scripts/remaining-explicit-any.txt", anyList.join("\n"), "utf-8");
console.log("Written to scripts/remaining-explicit-any.txt");
console.log("\nFirst 25 explicit any:\n" + anyList.slice(0, 25).join("\n"));
