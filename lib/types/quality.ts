
export type BloomsTaxonomyLevel =
  | "Remember"
  | "Understand"
  | "Apply"
  | "Analyze"
  | "Evaluate"
  | "Create";

export type DifficultyLevel = "Very Easy" | "Easy" | "Medium" | "Hard" | "Very Hard";

export interface QualityScoreBreakdown {
  grammarScore: number; // 0-100
  clarityScore: number; // 0-100
  distractorScore: number; // 0-100
  accuracyScore: number; // 0-100
  readabilityScore: number; // 0-100
  fairnessScore: number; // 0-100
  overallScore: number; // 0-100
}

export interface PredictedDifficulty {
  predictedLevel: DifficultyLevel;
  teacherLevel: DifficultyLevel;
  confidencePercent: number; // 0-100%
  matchesTeacher: boolean;
  explanation: string;
}

export interface DistractorAnalysis {
  plausibilityScore: number; // 0-100
  lengthBalanced: boolean;
  patternBiasDetected: boolean;
  optionDistributionIssue: boolean;
  suggestions: string[];
}

export interface AnswerValidation {
  isValid: boolean;
  hasCorrectAnswer: boolean;
  hasMultipleAnswersWhenSingleExpected: boolean;
  contradictionDetected: boolean;
  missingAnswerExplanation: boolean;
  issues: string[];
}

export interface DuplicateAlert {
  matchedQuestionId: string;
  matchedTitle: string;
  similarityPercent: number; // 0-100%
  matchType: "exact" | "near_duplicate" | "reworded" | "similar_concept";
  recommendation: "merge" | "delete" | "keep_both";
}

export interface BiasFairnessReport {
  hasBias: boolean;
  culturalBiasDetected: boolean;
  genderBiasDetected: boolean;
  sensitiveContentDetected: boolean;
  issues: string[];
  neutralAlternatives: string[];
}

export interface CurriculumAlignment {
  subject: string;
  category: string;
  topic: string;
  suggestedSubtopic?: string;
  gradeLevel: string;
  learningOutcomes: string[];
  curriculumTags: string[];
  alignmentScore: number; // 0-100
}

export interface QuestionImprovementSuggestion {
  id: string;
  type: "wording" | "distractor" | "explanation" | "cognitive_level" | "simplification";
  title: string;
  description: string;
  originalSnippet: string;
  suggestedSnippet: string;
  applied: boolean;
}

export interface QualityAnalysisReport {
  id: string;
  questionId: string;
  questionTitle: string;
  qualityBreakdown: QualityScoreBreakdown;
  bloomsLevel: BloomsTaxonomyLevel;
  difficulty: PredictedDifficulty;
  distractorAnalysis: DistractorAnalysis;
  answerValidation: AnswerValidation;
  duplicateAlerts: DuplicateAlert[];
  biasFairness: BiasFairnessReport;
  curriculumAlignment: CurriculumAlignment;
  suggestions: QuestionImprovementSuggestion[];
  status: "approved" | "needs_review" | "rejected" | "pending";
  analyzedAt: string;
  reviewedBy?: string;
  reviewedAt?: string;
}
