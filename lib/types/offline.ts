export type NetworkStatus = "cloud_online" | "edge_lan_online" | "completely_offline";

export interface EdgeLeaderboardItem {
  rank: number;
  studentName: string;
  score: number;
  timeSeconds: number;
}

export interface EdgeClassroomSession {
  id: string;
  sessionPin: string;
  teacherName: string;
  subject: string;
  activeStudentsCount: number;
  leaderboard: EdgeLeaderboardItem[];
  status: "active" | "completed" | "synced_to_cloud";
  createdAt: string;
}

export interface CampusServerNode {
  id: string;
  serverName: string;
  ipAddress: string;
  localUsersCount: number;
  cachedQuizzesCount: number;
  syncStatus: "synced" | "pending_delta" | "syncing";
  lastSyncAt: string;
}

export interface RecoveryTask {
  id: string;
  taskType: "quiz_upload" | "bundle_download" | "media_sync";
  taskTitle: string;
  payloadSizeMB: number;
  progressPercent: number;
  retriesCount: number;
  status: "queued" | "in_progress" | "interrupted" | "completed";
  errorMessage?: string;
}

export interface OfflineCacheItem {
  id: string;
  title: string;
  category: "subject" | "quiz_pack" | "competition" | "certificates";
  sizeMB: number;
  downloadedAt: string;
  autoPurge: boolean;
}
