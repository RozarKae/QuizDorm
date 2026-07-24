import { LMSIntegration } from "@/lib/types/developer";

export const DEFAULT_LMS_INTEGRATIONS: LMSIntegration[] = [
  {
    id: "lms-canvas",
    platform: "canvas",
    name: "Instructure Canvas LMS",
    status: "connected",
    lastSyncAt: "2026-07-24T08:30:00Z",
    syncedCoursesCount: 14,
    syncedStudentsCount: 420,
  },
  {
    id: "lms-moodle",
    platform: "moodle",
    name: "Moodle Open LMS",
    status: "connected",
    lastSyncAt: "2026-07-24T09:15:00Z",
    syncedCoursesCount: 8,
    syncedStudentsCount: 250,
  },
  {
    id: "lms-google",
    platform: "google_classroom",
    name: "Google Classroom",
    status: "disconnected",
    syncedCoursesCount: 0,
    syncedStudentsCount: 0,
  },
];

export class LMSIntegrationService {
  public static getIntegrations(): LMSIntegration[] {
    return DEFAULT_LMS_INTEGRATIONS;
  }
}
