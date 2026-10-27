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

for (const res of results) {
  for (const msg of res.messages) {
    if (msg.ruleId === "react-hooks/set-state-in-effect") {
      const rel = res.filePath.replace(process.cwd() + "\\", "").replace(/\\/g, "/");
      console.log(`${rel}:${msg.line} -> ${msg.message.split("\n")[0]}`);
    }
  }
}
