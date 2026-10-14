export interface AnalyticsMetric {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  timeframe: string;
  iconName?: string;
}

export interface QuizItemAnalysis {
  questionId: string;
  questionTitle: string;
  topic: string;
  correctRate: number; // e.g. 74%
  incorrectRate: number;
  skipRate: number;
  avgTimeSec: number;
  difficultyRating: "Easy" | "Medium" | "Hard";
  isWeakQuestion: boolean;
}

export interface PerformanceInsight {
  id: string;
  type: "warning" | "success" | "info";
  title: string;
  description: string;
  recommendation: string;
}

export interface ReportItem {
  id: string;
  title: string;
  type: "Student" | "Class" | "Department" | "Organization" | "Quiz";
  generatedDate: string;
  format: "PDF" | "Excel" | "CSV";
  fileSize: string;
  downloadUrl?: string;
}
