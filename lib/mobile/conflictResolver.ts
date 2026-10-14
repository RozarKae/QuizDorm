import { SyncConflictItem, ConflictStrategy } from "@/lib/types/mobile";

export const DEFAULT_CONFLICTS: SyncConflictItem[] = [
  {
    id: "cnf-101",
    entityType: "quiz_attempt",
    entityId: "att-8849",
    entityTitle: "Grade 12 Calculus Attempt (Offline vs Cloud)",
    localTimestamp: "2026-07-24T10:15:00Z",
    serverTimestamp: "2026-07-24T10:12:00Z",
    localValue: "Score: 94% (Completed offline at 10:15)",
    serverValue: "Score: 88% (Partial attempt saved on web at 10:12)",
    resolved: false,
  },
];

export class ConflictResolver {
  public static getConflicts(): SyncConflictItem[] {
    return DEFAULT_CONFLICTS;
  }

  public static resolveConflict(id: string, strategy: ConflictStrategy): SyncConflictItem[] {
    const list = this.getConflicts();
    return list.map((c) => (c.id === id ? { ...c, resolved: true } : c));
  }
}
