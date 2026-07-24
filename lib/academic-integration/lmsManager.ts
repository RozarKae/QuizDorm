import { LMSConnection } from "@/lib/types/academic-integration";

const STORAGE_KEY_LMS = "quizdorm_lms_connectors";

export const DEFAULT_LMS_CONNECTIONS: LMSConnection[] = [
  {
    id: "lms-101",
    providerName: "Canvas LMS (Primary Instructure)",
    connectorType: "canvas",
    endpointUrl: "https://stjude.instructure.com/api/v1",
    syncFrequencyMins: 15,
    lastSyncAt: "2026-07-24T10:30:00Z",
    status: "connected",
    syncedStudentsCount: 1850,
    syncedQuizzesCount: 42,
  },
  {
    id: "lms-102",
    providerName: "Google Classroom",
    connectorType: "google_classroom",
    endpointUrl: "https://classroom.googleapis.com/v1",
    syncFrequencyMins: 30,
    lastSyncAt: "2026-07-24T09:15:00Z",
    status: "connected",
    syncedStudentsCount: 1200,
    syncedQuizzesCount: 28,
  },
  {
    id: "lms-103",
    providerName: "Moodle Education Server",
    connectorType: "moodle",
    endpointUrl: "https://moodle.stjude.edu/webservice/rest",
    syncFrequencyMins: 60,
    lastSyncAt: "2026-07-24T08:00:00Z",
    status: "connected",
    syncedStudentsCount: 650,
    syncedQuizzesCount: 15,
  },
];

export class LMSConnectorManager {
  public static getConnections(): LMSConnection[] {
    if (typeof window === "undefined") return DEFAULT_LMS_CONNECTIONS;
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LMS);
      return saved ? JSON.parse(saved) : DEFAULT_LMS_CONNECTIONS;
    } catch {
      return DEFAULT_LMS_CONNECTIONS;
    }
  }

  public static syncConnector(id: string): LMSConnection[] {
    const list = this.getConnections();
    const updated = list.map((c) => (c.id === id ? { ...c, lastSyncAt: new Date().toISOString(), status: "connected" as const } : c));
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY_LMS, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to update LMS connection", e);
      }
    }
    return updated;
  }
}
