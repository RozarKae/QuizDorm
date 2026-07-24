import { LeaderboardEntry, RankingScope } from "@/lib/types/competition";

export const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, participantId: "p-1", participantName: "Alex Rivera", schoolName: "St. Jude International", region: "United States (East)", eloRating: 2450, totalPoints: 18450, winCount: 42, medal: "diamond" },
  { rank: 2, participantId: "p-2", participantName: "Elena Rostova", schoolName: "Moscow Science Academy", region: "Europe (Central)", eloRating: 2380, totalPoints: 17200, winCount: 38, medal: "gold" },
  { rank: 3, participantId: "p-3", participantName: "Aarav Sharma", schoolName: "Delhi Public School", region: "Asia (South)", eloRating: 2310, totalPoints: 16500, winCount: 35, medal: "gold" },
  { rank: 4, participantId: "p-4", participantName: "Marcus Sterling", schoolName: "Oxford Prep Academy", region: "Europe (UK)", eloRating: 2240, totalPoints: 15400, winCount: 31, medal: "silver" },
  { rank: 5, participantId: "p-5", participantName: "Sofia Rivera", schoolName: "St. Jude Middle School", region: "United States (East)", eloRating: 2180, totalPoints: 14800, winCount: 29, medal: "bronze" },
];

export class RankingEngine {
  public static getLeaderboard(scope: RankingScope = "international"): LeaderboardEntry[] {
    return DEFAULT_LEADERBOARD;
  }
}
