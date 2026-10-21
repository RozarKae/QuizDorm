import { ReputationLeaderboard } from "@/lib/types/community";

export const DEFAULT_REPUTATION_LEADERBOARD: ReputationLeaderboard[] = [
  { rank: 1, name: "Dr. K. Saravanan", reputationPoints: 14850, badgeTitle: "Master Contributor" },
  { rank: 2, name: "RK Akbar", reputationPoints: 13900, badgeTitle: "Platform Founder & Host" },
  { rank: 3, name: "Anandhi K. Bapu", reputationPoints: 11200, badgeTitle: "Quiz Master" },
  { rank: 4, name: "Karthik Rajendran", reputationPoints: 9800, badgeTitle: "AI Explorer" },
];

export class CommunityReputationEngine {
  public static getLeaderboard(): ReputationLeaderboard[] {
    return DEFAULT_REPUTATION_LEADERBOARD;
  }
}
