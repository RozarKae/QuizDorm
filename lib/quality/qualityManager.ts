import { QualityAnalysisReport,QuestionImprovementSuggestion } from "@/lib/types/quality";
import { QuestionItem } from "@/lib/types/question";
import { QuestionQualityAnalyzer } from "./analyzer";
import { BiasFairnessEngine } from "./biasEngine";
import { BloomsClassifier } from "./bloomsClassifier";
import { CurriculumAligner } from "./curriculumAligner";
import { DifficultyPredictor } from "./difficultyPredictor";
import { DistractorAnalyzer } from "./distractorAnalyzer";
import { DuplicateDetectionEngine } from "./duplicateEngine";

const STORAGE_KEY_REPORTS = "quizdorm_quality_reports";

export class QualityReviewManager {
  /**
   * Run complete 360-degree quality audit on a question
   */
  public static analyzeQuestion(
    question: Partial<QuestionItem>,
    existingBank: QuestionItem[] = []
  ): QualityAnalysisReport {
    const qId = question.id || `q-${Date.now()}`;
    const qTitle = question.title || "Untitled Question";

    const qualityBreakdown = QuestionQualityAnalyzer.analyzeQuality(question);
    const difficulty = DifficultyPredictor.predictDifficulty(question);
    const bloomsLevel = BloomsClassifier.classifyBlooms(question);
    const duplicateAlerts = DuplicateDetectionEngine.detectDuplicates(question, existingBank);
    const distractorAnalysis = DistractorAnalyzer.analyzeDistractors(question);
    const answerValidation = QuestionQualityAnalyzer.validateAnswerKey(question);
    const biasFairness = BiasFairnessEngine.auditBias(question);
    const curriculumAlignment = CurriculumAligner.alignCurriculum(question);

    // Formulate smart suggestions
    const suggestions: QuestionImprovementSuggestion[] = [];
    if (!answerValidation.missingAnswerExplanation) {
      // Good
    } else {
      suggestions.push({
        id: `sug-${Date.now()}-1`,
        type: "explanation",
        title: "Add Step-by-Step Solution Explanation",
        description: "Add a clear step-by-step breakdown explaining why the correct answer is valid.",
        originalSnippet: question.explanation || "",
        suggestedSnippet: `Recall fundamental principles of ${question.subject || "the topic"} to solve this term by term.`,
        applied: false,
      });
    }

    if (distractorAnalysis.suggestions.length > 0) {
      suggestions.push({
        id: `sug-${Date.now()}-2`,
        type: "distractor",
        title: "Balance Option Distractor Lengths",
        description: "Adjust option distractor word lengths so the correct answer does not stand out.",
        originalSnippet: "Imbalanced option choices",
        suggestedSnippet: "Rephrase distractors to match word count and grammatical parallel structure.",
        applied: false,
      });
    }

    if (qualityBreakdown.grammarScore < 90) {
      suggestions.push({
        id: `sug-${Date.now()}-3`,
        type: "wording",
        title: "Format Question Punctuation & Capitalization",
        description: "Capitalize first word and append question mark.",
        originalSnippet: qTitle,
        suggestedSnippet: qTitle.charAt(0).toUpperCase() + qTitle.slice(1) + (qTitle.endsWith("?") ? "" : "?"),
        applied: false,
      });
    }

    const needsReview =
      qualityBreakdown.overallScore < 75 ||
      !answerValidation.isValid ||
      duplicateAlerts.length > 0 ||
      biasFairness.hasBias;

    const report: QualityAnalysisReport = {
      id: `rep-${qId}`,
      questionId: qId,
      questionTitle: qTitle,
      qualityBreakdown,
      bloomsLevel,
      difficulty,
      distractorAnalysis,
      answerValidation,
      duplicateAlerts,
      biasFairness,
      curriculumAlignment,
      suggestions,
      status: needsReview ? "needs_review" : "approved",
      analyzedAt: new Date().toISOString(),
    };

    this.saveReport(report);
    return report;
  }

  /**
   * Get all cached quality reports from localStorage
   */
  public static getReports(): QualityAnalysisReport[] {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem(STORAGE_KEY_REPORTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }

  /**
   * Save report to localStorage
   */
  public static saveReport(report: QualityAnalysisReport): void {
    if (typeof window === "undefined") return;
    try {
      const current = this.getReports();
      const next = [report, ...current.filter((r) => r.questionId !== report.questionId)];
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(next.slice(0, 50)));
    } catch (e) {
      console.error("Failed to save quality report", e);
    }
  }

  /**
   * Update report status (e.g. educator approves or accepts suggestion)
   */
  public static updateReportStatus(
    reportId: string,
    status: QualityAnalysisReport["status"],
    reviewer: string = "Educator Admin"
  ): void {
    const reports = this.getReports();
    const updated = reports.map((r) =>
      r.id === reportId
        ? {
            ...r,
            status,
            reviewedBy: reviewer,
            reviewedAt: new Date().toISOString(),
          }
        : r
    );
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_REPORTS, JSON.stringify(updated));
    }
  }
}
