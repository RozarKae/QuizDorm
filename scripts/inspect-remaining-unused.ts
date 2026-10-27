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

const unusedVarList: string[] = [];

for (const res of results) {
  for (const msg of res.messages) {
    if (msg.ruleId === "@typescript-eslint/no-unused-vars") {
      const rel = res.filePath.replace(process.cwd() + "\\", "").replace(/\\/g, "/");
      unusedVarList.push(`${rel}:${msg.line}:${msg.column} -> ${msg.message}`);
    }
  }
}

console.log(`Total remaining unused vars: ${unusedVarList.length}`);
fs.writeFileSync("scripts/remaining-unused-vars.txt", unusedVarList.join("\n"), "utf-8");
console.log("Written to scripts/remaining-unused-vars.txt");
console.log("\nFirst 25 unused vars:\n" + unusedVarList.slice(0, 25).join("\n"));
