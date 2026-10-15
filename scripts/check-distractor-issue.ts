import fs from 'fs';
import { QuestionIntelligenceValidator } from "../lib/quality/questionIntelligenceValidator";

const data = JSON.parse(fs.readFileSync('./lib/data/imported-questions.json', 'utf8'));
for (const q of data) {
  const v = QuestionIntelligenceValidator.validate(q);
  const issues = v.issues.filter((i: any) => 
    i.code.includes('DISTRACTOR') || i.code.includes('CATEGORICAL') || i.code.includes('OPTIONS')
  );
  if (issues.length > 0) {
    console.log(q.id, q.title);
    console.log(JSON.stringify(issues, null, 2));
    console.log("Options:", q.options);
  }
}
