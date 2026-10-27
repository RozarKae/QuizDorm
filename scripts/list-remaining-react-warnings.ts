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

const targetRules = [
  "react-hooks/set-state-in-effect",
  "react-hooks/exhaustive-deps",
  "react-hooks/immutability",
];

for (const rule of targetRules) {
  for (const res of results) {
    for (const msg of res.messages) {
      if (msg.ruleId === rule) {
        const rel = res.filePath.replace(process.cwd() + "\\", "").replace(/\\/g, "/");
        console.log(`[${rule}] ${rel}:${msg.line} -> ${msg.message.split("\n")[0]}`);
      }
    }
  }
}
