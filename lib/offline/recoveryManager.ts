import { RecoveryTask } from "@/lib/types/offline";

export const DEFAULT_RECOVERY_TASKS: RecoveryTask[] = [
  {
    id: "rec-101",
    taskType: "quiz_upload",
    taskTitle: "Grade 12 Physics LAN Attempt Delta Upload",
    payloadSizeMB: 2.4,
    progressPercent: 100,
    retriesCount: 1,
    status: "completed",
  },
  {
    id: "rec-102",
    taskType: "bundle_download",
    taskTitle: "Biology Media Assets Download (Interrupted at 42%)",
    payloadSizeMB: 18.5,
    progressPercent: 42,
    retriesCount: 2,
    status: "interrupted",
    errorMessage: "Connection timeout at 10.0.8.50. Will auto-resume on reconnect.",
  },
];

export class ResilientRecoveryManager {
  public static getTasks(): RecoveryTask[] {
    return DEFAULT_RECOVERY_TASKS;
  }
}
