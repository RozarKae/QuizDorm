import { QuestionItem, QuestionOption } from "@/lib/types/question";
import { AnnouncementItem, LiveParticipant } from "@/lib/types/competition";

export type SessionStatus = "WAITING" | "ACTIVE" | "PAUSED" | "ENDED";
export type SessionStage = "lobby" | "question" | "leaderboard" | "winner_podium";

export interface LiveSessionSettings {
  durationMinutes: number;
  maxParticipants: number;
  negativeMarking: boolean;
  timeBonus: boolean;
  timePerQuestionSeconds: number;
  autoAdvanceOnTimeout?: boolean;
}

export interface SubmittedAnswer {
  participantId: string;
  participantName: string;
  questionIndex: number;
  optionId: string;
  submittedAt: number; // Server timestamp (ms)
  isCorrect: boolean;
  scoreAwarded: number;
  speedBonus: number;
  timeRemainingSec: number;
}

export interface LiveSessionState {
  id: string;
  code: string; // e.g. "QD-8492"
  hostId: string;
  hostName: string;
  hostSecret: string; // Secret used to authenticate host actions
  competitionId?: string;
  title: string;
  description?: string;
  quizId: string;
  quizTitle: string;
  status: SessionStatus;
  stage: SessionStage;
  settings: LiveSessionSettings;
  questions: QuestionItem[]; // Authoritative questions with answer keys on server
  currentQuestionIndex: number;
  currentQuestionStartedAt: number; // Server ms
  currentQuestionDeadline: number; // Server ms
  isPaused: boolean;
  pausedTimeRemainingSec: number;
  participants: Record<string, LiveParticipant>;
  answers: Record<string, SubmittedAnswer>; // Key: `${questionIndex}_${participantId}`
  announcements: AnnouncementItem[];
  createdAt: number;
  updatedAt: number;
}

export interface PublicSessionQuestion {
  id: string;
  title: string;
  type: string;
  subject?: string;
  category?: string;
  topic?: string;
  marks: number;
  timeLimitSeconds: number;
  explanation?: string; // Only populated when question is resolved
  options: {
    id: string;
    text: string;
    isCorrect?: boolean; // Only populated when stage is leaderboard/winner_podium!
  }[];
}

export interface PublicSessionState {
  id: string;
  code: string;
  hostName: string;
  title: string;
  description?: string;
  quizId?: string;
  quizTitle: string;
  competitionId?: string;
  status: SessionStatus;
  stage: SessionStage;
  settings: LiveSessionSettings;
  currentQuestionIndex: number;
  totalQuestions: number;
  currentQuestion: PublicSessionQuestion | null;
  currentQuestionDeadline: number; // Server ms
  timeRemainingSec: number;
  isPaused: boolean;
  participantsCount: number;
  participants: LiveParticipant[];
  announcements: AnnouncementItem[];
  serverTime: number; // To calculate clock skew
  submissionsCountForCurrentQ: number;
  connectedSystemsCount: number;
  submissionDistribution: Record<string, number>;
  submittedParticipantIds: string[];
  recentActivityFeed?: {
    participantName: string;
    timeTakenSec: number;
    optionId: string;
    timestamp: number;
  }[];
}

export interface CreateSessionOptions {
  quizId?: string;
  competitionId?: string;
  title?: string;
  description?: string;
  hostId?: string;
  hostName?: string;
  code?: string;
  settings?: Partial<LiveSessionSettings>;
  questions?: QuestionItem[];
}
