import { CampusServerNode } from "@/lib/types/offline";

export const DEFAULT_CAMPUS_NODES: CampusServerNode[] = [
  {
    id: "node-101",
    serverName: "St. Jude Campus Local Server Node #1",
    ipAddress: "192.168.1.200",
    localUsersCount: 450,
    cachedQuizzesCount: 120,
    syncStatus: "synced",
    lastSyncAt: "2026-07-24T10:30:00Z",
  },
  {
    id: "node-102",
    serverName: "St. Jude Rural Annex LAN Server",
    ipAddress: "10.0.8.50",
    localUsersCount: 180,
    cachedQuizzesCount: 45,
    syncStatus: "pending_delta",
    lastSyncAt: "2026-07-24T08:15:00Z",
  },
];

export class CampusServerManager {
  public static getNodes(): CampusServerNode[] {
    return DEFAULT_CAMPUS_NODES;
  }
}
