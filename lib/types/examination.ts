export type ExamCategory = "University Semester" | "Government Recruitment" | "K-12 Board Exam" | "Professional Certification" | "Competitive Entrance";
export type ExamStatus = "Scheduled" | "In Progress" | "Completed" | "Evaluation Phase" | "Results Published" | "Archived";

export interface HighStakesExam {
  id: string;
  code: string; // e.g. NAT-EXAM-2026
  title: string;
  category: ExamCategory;
  authorityName: string;
  totalCandidates: number;
  totalSessions: number;
  durationMinutes: number;
  passingPercentage: number;
  startDate: string;
  endDate: string;
  status: ExamStatus;
  isEncrypted: boolean;
  proctoringLevel: "Strict AI + Human" | "AI Automated" | "Standard Browser Lock";
  createdAt: string;
}

export interface ExamSession {
  id: string;
  examId: string;
  sessionName: string;
  date: string;
  startTime: string;
  endTime: string;
  allocatedCandidates: number;
  completedCandidates: number;
  activeProctors: number;
  status: "Upcoming" | "Active" | "Concluded";
}

export interface CandidateAnswer {
  questionId: string;
  selectedOptionId?: string;
  descriptiveText?: string;
  status: "answered" | "marked-for-review" | "skipped" | "unvisited";
  savedAt: string;
}

export interface SecureExamSession {
  examId: string;
  candidateId: string;
  rollNumber: string;
  candidateName: string;
  examTitle: string;
  remainingSeconds: number;
  isFullscreen: boolean;
  isLockdownActive: boolean;
  answers: Record<string, CandidateAnswer>;
  currentQuestionIndex: number;
  totalQuestions: number;
  proctorWarningCount: number;
}

export type ProctorSeverity = "low" | "medium" | "high" | "critical";

export interface ProctorIncident {
  id: string;
  candidateId: string;
  candidateName: string;
  rollNumber: string;
  examId: string;
  timestamp: string;
  incidentType: "Face Missing" | "Multiple Faces" | "Mobile Device Detected" | "Tab Switch" | "Audio Noise" | "Gaze Deviation";
  severity: ProctorSeverity;
  snapshotUrl?: string;
  status: "Pending Review" | "Verified Violation" | "Dismissed";
}

export interface ExamCandidate {
  id: string;
  rollNumber: string;
  fullName: string;
  email: string;
  identityDocNumber: string; // e.g. National ID / Passport
  photoUrl: string;
  allocatedHall: string;
  seatNumber: string;
  examCenter: string;
  verificationStatus: "Verified" | "Pending" | "Flagged";
  admitCardGenerated: boolean;
  attendanceStatus: "Present" | "Absent" | "Disqualified";
}

export interface AdmitCard {
  id: string;
  candidateId: string;
  candidateName: string;
  rollNumber: string;
  examTitle: string;
  examCode: string;
  category: string;
  centerName: string;
  centerAddress: string;
  reportingTime: string;
  examDate: string;
  barcodeQr: string;
  instructions: string[];
}

export interface EncryptedQuestionPaper {
  id: string;
  examId: string;
  paperTitle: string;
  subjectCode: string;
  encryptionAlgorithm: "AES-256-GCM";
  approvalStatus: "Approved by Board" | "Pending Approval" | "Draft";
  approvalChain: { name: string; role: string; signedAt?: string }[];
  scheduledDecryptionTime: string;
  isDecrypted: boolean;
  watermarkPattern: string;
  totalMarks: number;
  questionCount: number;
  version: string;
}

export interface EvaluationRecord {
  id: string;
  candidateId: string;
  candidateName: string;
  rollNumber: string;
  examId: string;
  objectiveScore: number;
  descriptiveScore: number;
  graceMarks: number;
  totalScore: number;
  percentage: number;
  grade: string;
  rank?: number;
  status: "Pending Manual Grading" | "Evaluated" | "Moderated" | "Under Re-evaluation";
  evaluatorFeedback?: string;
}

export interface DigitalCertificate {
  id: string;
  certificateNumber: string; // e.g. CERT-2026-9901
  candidateName: string;
  rollNumber: string;
  examTitle: string;
  issuingAuthority: string;
  issueDate: string;
  gradeAchieved: string;
  percentageScore: number;
  qrVerificationUrl: string;
  digitalSignatureHash: string;
  isRevoked: boolean;
}

export interface ExamAnalyticsData {
  passPercentage: number;
  averageScore: number;
  highestScore: number;
  totalAppeared: number;
  totalPassed: number;
  difficultyIndex: { questionNumber: number; topic: string; correctRate: number }[];
  schoolRankings: { schoolName: string; avgScore: number; passRate: number }[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorName: string;
  actorRole: string;
  action: string;
  ipAddress: string;
  module: string;
  securitySeverity: "info" | "warning" | "critical";
  hashSignature: string;
}

export interface RegionalNode {
  nodeId: string;
  regionName: string;
  activeServers: number;
  concurrentCandidates: number;
  cpuLoadPercent: number;
  latencyMs: number;
  status: "Healthy" | "High Load" | "Failover Active";
}
