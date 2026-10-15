import { QuestionIntelligenceValidator } from "../../lib/quality/questionIntelligenceValidator";

const testQuestion = {
  title: "In which year was the Union Public Service Commission (UPSC) established in India?",
  type: "mcq_single" as const,
  subject: "National Affairs",
  category: "Indian Governance",
  topic: "Constitutional Bodies",
  difficulty: "Easy" as const,
  gradeLevel: "Grade 6-8",
  marks: 1,
  timeLimitSeconds: 60,
  explanation: "The Union Public Service Commission (UPSC) was established in 1926 following the recommendations of the Royal Commission on Superior Civil Services (Lee Commission).",
  options: [
    { id: "opt-1", text: "1926", isCorrect: true, explanation: "Correct. UPSC was established in 1926 and celebrated its centenary in 2026." },
    { id: "opt-2", text: "1935", isCorrect: false, explanation: "Incorrect. The Government of India Act 1935 established the Federal Public Service Commission." },
    { id: "opt-3", text: "1947", isCorrect: false, explanation: "Incorrect. 1947 was the year of Indian Independence." },
    { id: "opt-4", text: "1950", isCorrect: false, explanation: "Incorrect. 1950 was when the Constitution came into effect." },
  ],
};

const result = QuestionIntelligenceValidator.validate(testQuestion);
console.log("Validation Result:", {
  isValid: result.isValid,
  qualityScore: result.qualityScore,
  recommendedStatus: result.recommendedStatus,
  issues: result.issues
});
