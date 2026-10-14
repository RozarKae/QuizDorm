export type SyncStatus = "idle" | "syncing" | "offline" | "conflict" | "error";

export type SyncMode = "incremental" | "full" | "background" | "manual";

export type ConflictStrategy = "last_write_wins" | "merge" | "teacher_override" | "manual";

export type DeviceType = "android_phone" | "iphone" | "ipad" | "android_tablet" | "pwa_mobile";

export interface MobileDevice {
  id: string;
  deviceName: string;
  deviceType: DeviceType;
  osVersion: string;
  appVersion: string;
  registeredAt: string;
  lastActiveAt: string;
  trusted: boolean;
  biometricEnabled: boolean;
  ipAddress: string;
}

export interface OfflineQuizBundle {
  id: string;
  title: string;
  subject: string;
  questionsCount: number;
  downloadedAt?: string;
  fileSizeMB: number;
  status: "ready" | "downloading" | "not_downloaded" | "update_available";
}

export interface SyncConflictItem {
  id: string;
  entityType: "quiz_attempt" | "question_edit" | "certificate";
  entityId: string;
  entityTitle: string;
  localTimestamp: string;
  serverTimestamp: string;
  localValue: string;
  serverValue: string;
  resolved: boolean;
}

export interface MobileAppConfig {
  offlineStorageMB: number;
  usedStorageMB: number;
  downloadQuality: "low" | "medium" | "high";
  syncFrequencyMins: number;
  dataSaverMode: boolean;
  darkTheme: boolean;
  biometricUnlock: boolean;
}
