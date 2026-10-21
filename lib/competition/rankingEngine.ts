import { LeaderboardEntry, RankingScope } from "@/lib/types/competition";

export const DEFAULT_LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, participantId: "p-1", participantName: "Karthik Rajendran", schoolName: "Govt Model HSS Saidapet, Chennai", region: "Tamil Nadu (Chennai)", eloRating: 2450, totalPoints: 18450, winCount: 42, medal: "diamond" },
  { rank: 2, participantId: "p-2", participantName: "Fathima Nasreen", schoolName: "Al-Ameen Universal Public School, Kochi", region: "Kerala (Ernakulam)", eloRating: 2380, totalPoints: 17200, winCount: 38, medal: "gold" },
  { rank: 3, participantId: "p-3", participantName: "Kevin Fernandez", schoolName: "The Choice School, Tripunithura", region: "Kerala (Central)", eloRating: 2310, totalPoints: 16500, winCount: 35, medal: "gold" },
  { rank: 4, participantId: "p-4", participantName: "Anandhi K. Bapu", schoolName: "Sourashtra Higher Secondary School, Madurai", region: "Tamil Nadu (Madurai)", eloRating: 2240, totalPoints: 15400, winCount: 31, medal: "silver" },
  { rank: 5, participantId: "p-5", participantName: "Gautham Chand Jain", schoolName: "Mahaveer International Academy, Chennai", region: "Tamil Nadu (Chennai)", eloRating: 2180, totalPoints: 14800, winCount: 29, medal: "bronze" },
];

export class RankingEngine {
  public static getLeaderboard(scope: RankingScope = "international"): LeaderboardEntry[] {
    return DEFAULT_LEADERBOARD;
  }
}
