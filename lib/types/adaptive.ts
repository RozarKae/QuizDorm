export type MasteryLevel = "Beginner" | "Intermediate" | "Advanced" | "Master";

export interface TopicMastery {
  topic: string;
  subject: string;
  masteryPercent: number; // 0-100%
  level: MasteryLevel;
  totalAttempted: number;
  correctCount: number;
  avgResponseSeconds: number;
}

export interface StudentKnowledgeProfile {
  studentId: string;
  studentName: string;
  overallMasteryPercent: number; // 0-100%
  overallAccuracyPercent: number;
  overallAvgSpeedSeconds: number;
  studyStreakDays: number;
  totalQuizzesCompleted: number;
  totalQuestionsAnswered: number;
  subjectMastery: Record<string, number>; // e.g. { Mathematics: 85, Biology: 62 }
  topicMasteryList: TopicMastery[];
  bloomsLevelProgress: Record<string, number>; // e.g. { Remember: 95, Apply: 70, Analyze: 55 }
  weakTopics: string[];
  strongTopics: string[];
  lastUpdated: string;
}

export interface AdaptiveQuizConfig {
  mode: "practice" | "exam" | "revision" | "challenge";
  targetDifficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  subject: string;
  topics: string[];
  questionCount: number;
  timeLimitMinutes: number;
  includeMultimedia: boolean;
}

export interface LearningPathGoal {
  id: string;
  title: string;
  subject: string;
  targetMasteryPercent: number;
  currentProgressPercent: number;
  targetDate: string;
  status: "in_progress" | "completed" | "overdue";
}

export interface SpacedRevisionItem {
  id: string;
  questionId: string;
  questionTitle: string;
  subject: string;
  topic: string;
  dueTimestamp: string;
  intervalDays: number;
  easeFactor: number; // SM-2 ease factor (default 2.5)
  repetitionsCount: number;
  status: "due" | "upcoming" | "completed";
  lastReviewedAt?: string;
}

export interface AIRecommendationItem {
  id: string;
  type: "next_topic" | "revision" | "practice_quiz" | "challenge";
  title: string;
  description: string;
  reason: string; // Explainable AI reasoning
  supportingData: string; // e.g. "Accuracy in Calculus dropped to 48%"
  confidencePercent: number;
  actionUrl: string;
  priority: "high" | "medium" | "low";
}

export interface AICoachMessage {
  id: string;
  title: string;
  adviceText: string;
  category: "motivation" | "study_tip" | "time_management" | "revision_alert";
  suggestedAction?: string;
  timestamp: string;
}

export interface PerformancePrediction {
  predictedScorePercent: number;
  examReadinessPercent: number;
  competitionReadinessPercent: number;
  riskStatus: "low" | "medium" | "high";
  improvementPotentialPercent: number;
  explanation: string;
}

export interface TeacherClassInsight {
  classId: string;
  className: string;
  averageMasteryPercent: number;
  strugglingTopics: string[];
  studentsNeedingHelp: { id: string; name: string; mastery: number; weakArea: string }[];
  fastLearners: { id: string; name: string; mastery: number }[];
  recommendedInterventions: string[];
}
