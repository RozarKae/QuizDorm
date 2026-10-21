import { TournamentBracketNode } from "@/lib/types/competition";

export const DEFAULT_BRACKET_NODES: TournamentBracketNode[] = [
  { id: "b-1", roundName: "Semifinals Match #1", matchId: "m-101", player1Name: "Karthik Rajendran", player2Name: "Fathima Nasreen", score1: 980, score2: 940, winnerName: "Karthik Rajendran", status: "completed" },
  { id: "b-2", roundName: "Semifinals Match #2", matchId: "m-102", player1Name: "Kevin Fernandez", player2Name: "Anandhi K. Bapu", score1: 910, score2: 950, winnerName: "Anandhi K. Bapu", status: "completed" },
  { id: "b-3", roundName: "Grand Championship Final", matchId: "m-201", player1Name: "Karthik Rajendran", player2Name: "Anandhi K. Bapu", score1: 0, score2: 0, status: "live" },
];

export class TournamentEngine {
  public static getBrackets(): TournamentBracketNode[] {
    return DEFAULT_BRACKET_NODES;
  }
}
