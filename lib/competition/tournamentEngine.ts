import { TournamentBracketNode } from "@/lib/types/competition";

export const DEFAULT_BRACKET_NODES: TournamentBracketNode[] = [
  { id: "b-1", roundName: "Semifinals Match #1", matchId: "m-101", player1Name: "Alex Rivera", player2Name: "Elena Rostova", score1: 980, score2: 940, winnerName: "Alex Rivera", status: "completed" },
  { id: "b-2", roundName: "Semifinals Match #2", matchId: "m-102", player1Name: "Aarav Sharma", player2Name: "Marcus Sterling", score1: 910, score2: 950, winnerName: "Marcus Sterling", status: "completed" },
  { id: "b-3", roundName: "Grand Championship Final", matchId: "m-201", player1Name: "Alex Rivera", player2Name: "Marcus Sterling", score1: 0, score2: 0, status: "live" },
];

export class TournamentEngine {
  public static getBrackets(): TournamentBracketNode[] {
    return DEFAULT_BRACKET_NODES;
  }
}
