export type LMSConnectorType = "canvas" | "moodle" | "google_classroom" | "blackboard" | "brightspace" | "ms_teams";

export type SISConnectorType = "powerschool" | "infinite_campus" | "skyward" | "fedena" | "opensis";

export interface LMSConnection {
  id: string;
  providerName: string;
  connectorType: LMSConnectorType;
  endpointUrl: string;
  syncFrequencyMins: number;
  lastSyncAt: string;
  status: "connected" | "syncing" | "error" | "disabled";
  syncedStudentsCount: number;
  syncedQuizzesCount: number;
}

export interface GradebookSyncItem {
  id: string;
  studentName: string;
  quizTitle: string;
  quizScore: string;
  gradebookTarget: string;
  syncedAt: string;
  status: "synced" | "pending" | "failed";
}

export interface CurriculumFramework {
  id: string;
  name: "CBSE" | "ICSE" | "Cambridge" | "IB" | "State Board" | "National Standard";
  subject: string;
  mappedUnitsCount: number;
  mappedQuestionsCount: number;
  coveragePercent: number;
}

export interface AcademicImportJob {
  id: string;
  filename: string;
  recordType: "students" | "teachers" | "questions" | "courses";
  recordsCount: number;
  status: "completed" | "processing" | "failed";
  createdAt: string;
}
