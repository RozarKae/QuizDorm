import { ReputationLeaderboard } from "@/lib/types/community";

export const DEFAULT_REPUTATION_LEADERBOARD: ReputationLeaderboard[] = [
  { rank: 1, name: "Dr. Eleanor Vance", reputationPoints: 14850, badgeTitle: "Master Contributor" },
  { rank: 2, name: "Aarav Sharma", reputationPoints: 12400, badgeTitle: "Knowledge Champion" },
  { rank: 3, name: "Elena Rostova", reputationPoints: 11200, badgeTitle: "Quiz Master" },
  { rank: 4, name: "Alex Rivera", reputationPoints: 9800, badgeTitle: "AI Explorer" },
];

export class CommunityReputationEngine {
  public static getLeaderboard(): ReputationLeaderboard[] {
    return DEFAULT_REPUTATION_LEADERBOARD;
  }
}
