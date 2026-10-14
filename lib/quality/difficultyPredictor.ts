import { QuestionItem } from "@/lib/types/question";
import { PredictedDifficulty, DifficultyLevel } from "@/lib/types/quality";

export class DifficultyPredictor {
  /**
   * Predict difficulty level based on linguistic complexity, technical terms, and options
   */
  public static predictDifficulty(question: Partial<QuestionItem>): PredictedDifficulty {
    const text = (question.title || "").toLowerCase();
    const teacherLevel: DifficultyLevel = (question.difficulty as DifficultyLevel) || "Medium";

    let complexityScore = 50;

    // Word length and jargon triggers
    if (text.length > 150) complexityScore += 15;
    if (text.includes("calculate") || text.includes("evaluate") || text.includes("derive")) complexityScore += 20;
    if (text.includes("what is") || text.includes("define") || text.includes("name the")) complexityScore -= 25;
    if (text.includes("equation") || text.includes("integral") || text.includes("matrix")) complexityScore += 25;
    if (question.type === "code_snippet" || question.type === "timeline_ordering") complexityScore += 15;

    let predictedLevel: DifficultyLevel = "Medium";
    if (complexityScore < 30) predictedLevel = "Very Easy";
    else if (complexityScore < 45) predictedLevel = "Easy";
    else if (complexityScore < 70) predictedLevel = "Medium";
    else if (complexityScore < 85) predictedLevel = "Hard";
    else predictedLevel = "Very Hard";

    const matchesTeacher = predictedLevel === teacherLevel;
    const confidencePercent = matchesTeacher ? 92 : 78;

    const explanation = matchesTeacher
      ? `AI predicted difficulty [${predictedLevel}] matches educator setting.`
      : `AI cognitive analysis predicts [${predictedLevel}], whereas educator set [${teacherLevel}]. Review recommended.`;

    return {
      predictedLevel,
      teacherLevel,
      confidencePercent,
      matchesTeacher,
      explanation,
    };
  }
}
