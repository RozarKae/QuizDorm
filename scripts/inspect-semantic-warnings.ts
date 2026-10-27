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
  "react/no-unescaped-entities",
  "react-hooks/exhaustive-deps",
  "react-hooks/purity",
  "react-hooks/immutability",
  "@next/next/no-img-element",
  "react/jsx-no-comment-textnodes",
  "@next/next/no-page-custom-font",
  "@typescript-eslint/no-empty-object-type",
  "@typescript-eslint/no-require-imports",
  "unknown",
];

for (const rule of targetRules) {
  console.log(`\n================== RULE: ${rule} ==================`);
  let count = 0;
  for (const res of results) {
    for (const msg of res.messages) {
      if (msg.ruleId === rule || (!msg.ruleId && rule === "unknown")) {
        const rel = res.filePath.replace(process.cwd() + "\\", "").replace(/\\/g, "/");
        console.log(`${rel}:${msg.line}:${msg.column} -> ${msg.message}`);
        count++;
      }
    }
  }
  console.log(`Total for ${rule}: ${count}`);
}
