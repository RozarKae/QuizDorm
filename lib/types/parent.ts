export type ParentRelationship = "father" | "mother" | "guardian" | "sponsor" | "relative";

export interface ChildProfile {
  id: string;
  name: string;
  grade: string;
  schoolName: string;
  avatarUrl?: string;
  overallPerformancePercent: number;
  attendancePercent: number;
  currentStreak: number;
  weakSubject: string;
  strongSubject: string;
}

export interface ParentGuardian {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: ParentRelationship;
  linkedChildren: ChildProfile[];
  verificationStatus: "verified" | "pending";
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  date: string;
  status: "present" | "absent" | "late" | "excused";
  checkInTime?: string;
  notes?: string;
}

export interface ParentAIInsight {
  id: string;
  studentId: string;
  date: string;
  summaryTitle: string;
  strengths: string[];
  weakAreas: string[];
  studyHabitAnalysis: string;
  recommendedHomeActions: string[];
  confidenceScore: number;
}

export interface ParentApprovalRequest {
  id: string;
  studentId: string;
  title: string;
  type: "competition_consent" | "field_trip" | "digital_permission";
  description: string;
  dueDate: string;
  status: "pending" | "approved" | "declined";
  requestedBy: string;
}

export interface FamilyAnalytics {
  studentId: string;
  weeklyLearningHours: number;
  monthlyGrowthPercent: number;
  subjectScores: Record<string, number>;
  predictedExamScorePercent: number;
}
