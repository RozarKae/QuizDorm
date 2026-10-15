import * as fs from "fs";
import * as path from "path";

const filePath = path.join(process.cwd(), "lib/data/imported-questions.json");
const questions = JSON.parse(fs.readFileSync(filePath, "utf-8"));

console.log("Examining first 25 questions in imported-questions.json:\n");

questions.slice(0, 25).forEach((q: any, idx: number) => {
  const correctOpt = q.options?.find((o: any) => o.isCorrect);
  console.log(`[${idx + 1}] ID: ${q.id} | Subject: ${q.subject || "N/A"}`);
  console.log(`    Stem: "${q.title}"`);
  console.log(`    Answer: "${correctOpt?.text}"`);
  console.log(`    Options: [${q.options?.map((o: any) => `"${o.text}"`).join(", ")}]\n`);
});
