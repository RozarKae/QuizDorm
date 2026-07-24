import { AntiCheatFlag } from "@/lib/types/competition";

export const DEFAULT_FLAGS: AntiCheatFlag[] = [
  {
    id: "flag-101",
    competitionId: "olym-102",
    studentName: "Dmitri Volkov",
    flagType: "tab_switch",
    severity: "medium",
    timestamp: "2026-07-24T10:14:00Z",
    resolved: false,
    notes: "Switched browser tab for 8.4 seconds during Question #14.",
  },
  {
    id: "flag-102",
    competitionId: "olym-102",
    studentName: "Chloe Dupont",
    flagType: "focus_loss",
    severity: "low",
    timestamp: "2026-07-24T09:45:00Z",
    resolved: true,
    notes: "Window focus lost briefly (OS notification popup).",
  },
];

export class AntiCheatService {
  public static getFlags(): AntiCheatFlag[] {
    return DEFAULT_FLAGS;
  }
}
