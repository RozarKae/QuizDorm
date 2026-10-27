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

let importCount = 0;
let varCount = 0;
let paramCount = 0;
let otherCount = 0;

const sampleImports: string[] = [];
const sampleVars: string[] = [];

for (const res of results) {
  for (const msg of res.messages) {
    if (msg.ruleId === "@typescript-eslint/no-unused-vars") {
      // message patterns:
      // "'Foo' is defined but never used."
      // "'bar' is assigned a value but never used."
      // "'arg' is defined but never used. Allowed unused args must match /^_/u."
      if (msg.message.includes("Allowed unused args")) {
        paramCount++;
      } else if (msg.message.includes("is defined but never used")) {
        importCount++;
        if (sampleImports.length < 10) {
          sampleImports.push(`${res.filePath}:${msg.line} - ${msg.message}`);
        }
      } else if (msg.message.includes("is assigned a value but never used")) {
        varCount++;
        if (sampleVars.length < 10) {
          sampleVars.push(`${res.filePath}:${msg.line} - ${msg.message}`);
        }
      } else {
        otherCount++;
      }
    }
  }
}

console.log(`Unused imports / definitions: ${importCount}`);
console.log(`Unused assigned variables: ${varCount}`);
console.log(`Unused function parameters: ${paramCount}`);
console.log(`Other: ${otherCount}`);
console.log("\nSample unused definitions/imports:\n" + sampleImports.join("\n"));
console.log("\nSample unused assigned vars:\n" + sampleVars.join("\n"));
