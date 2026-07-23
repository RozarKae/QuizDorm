export type CompetitionStatus =
  | "Draft"
  | "Upcoming"
  | "Lobby"
  | "Live"
  | "Paused"
  | "Completed"
  | "Archived";

export interface LiveParticipant {
  id: string;
  userId: string;
  name: string;
  avatar?: string;
  score: number;
  rank: number;
  rankChange: number; // e.g. +2, -1, 0
  streak: number;
  isOnline: boolean;
  currentAnswer?: any;
  lastResponseTimeMs?: number;
}

export interface AnnouncementItem {
  id: string;
  text: string;
  timestamp: string;
  author: string;
}

export interface CompetitionItem {
  id: string;
  title: string;
  description?: string;
  bannerImage?: string;
  quizId: string;
  quizTitle: string;
  code: string; // 6-digit PIN code (e.g. QD-8492)
  hostId: string;
  hostName: string;
  status: CompetitionStatus;
  startDate: string;
  startTime: string;
  durationMinutes: number;
  maxParticipants: number;
  currentParticipantsCount: number;
  isPublic: boolean;
  negativeMarking: boolean;
  timeBonus: boolean;
  participants: LiveParticipant[];
  announcements: AnnouncementItem[];
  createdAt: string;
  updatedAt: string;
}
