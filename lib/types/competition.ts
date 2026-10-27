export type RankingScope = "classroom" | "school" | "district" | "state" | "national" | "international" | "organization";

export type TournamentFormat = "single_elimination" | "double_elimination" | "swiss" | "round_robin" | "league";

export type OlympiadTier = "school_olympiad" | "district_olympiad" | "state_olympiad" | "national_olympiad" | "international_olympiad";

export type CompetitionStatus = "scheduled" | "lobby" | "live" | "ended" | "upcoming" | "completed" | "Scheduled" | "Lobby" | "Live" | "Ended" | "Upcoming" | "Completed";

export interface AnnouncementItem {
  id: string;
  title?: string;
  content?: string;
  text?: string;
  author?: string;
  authorName?: string;
  timestamp?: string;
  createdAt?: string;
  isImportant?: boolean;
}

export interface LiveParticipant {
  id: string;
  userId?: string;
  name: string;
  avatarUrl?: string;
  score: number;
  streak?: number;
  rank?: number;
  previousRank?: number;
  rankChange?: number;
  answersCount?: number;
  correctCount?: number;
  isHost?: boolean;
  isOnline?: boolean;
  lastSeen?: number;
  totalResponseTimeMs?: number;
}

export interface CompetitionItem {
  id: string;
  title: string;
  description?: string;
  quizId: string;
  quizTitle: string;
  code: string;
  hostId: string;
  hostName?: string;
  mode?: "classic" | "team" | "survival";
  status?: CompetitionStatus;
  scheduledAt?: string;
  startedAt?: string;
  endedAt?: string;
  startDate?: string;
  startTime?: string;
  durationMinutes?: number;
  participantsCount?: number;
  currentParticipantsCount?: number;
  maxParticipants?: number;
  isPublic?: boolean;
  negativeMarking?: boolean;
  timeBonus?: boolean;
  participants?: LiveParticipant[];
  announcements?: AnnouncementItem[];
  createdAt?: string;
  updatedAt?: string;
}

export interface LeaderboardEntry {
  rank: number;
  participantId: string;
  participantName: string;
  avatarUrl?: string;
  schoolName: string;
  region: string;
  eloRating: number;
  totalPoints: number;
  winCount: number;
  medal: "gold" | "silver" | "bronze" | "diamond" | "none";
}

export interface TournamentBracketNode {
  id: string;
  roundName: string;
  matchId: string;
  player1Name: string;
  player2Name: string;
  score1: number;
  score2: number;
  winnerName?: string;
  status: "pending" | "live" | "completed";
}

export interface AntiCheatFlag {
  id: string;
  competitionId: string;
  studentName: string;
  flagType: "tab_switch" | "focus_loss" | "time_anomaly" | "device_duplicate";
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  resolved: boolean;
  notes?: string;
}

export interface GlobalCompetition {
  id: string;
  title: string;
  format: TournamentFormat;
  tier: OlympiadTier;
  scope: RankingScope;
  startDate: string;
  endDate: string;
  participantsCount: number;
  prizePool: string;
  status: "upcoming" | "live" | "completed";
}
