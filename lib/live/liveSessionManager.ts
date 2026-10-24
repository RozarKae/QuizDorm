import {
  LiveSessionState,
  PublicSessionState,
  PublicSessionQuestion,
  CreateSessionOptions,
  SubmittedAnswer,
} from "./types";
import { LiveParticipant, AnnouncementItem } from "@/lib/types/competition";
import { QuestionItem } from "@/lib/types/question";
import { ALL_DEFAULT_QUESTIONS } from "@/lib/data/question-bank";

// Fallback high quality seed questions
const DEFAULT_SEED_QUESTIONS: QuestionItem[] = [
  {
    id: "q-live-1",
    title: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
    type: "mcq_single",
    subject: "Mathematics",
    category: "Calculus",
    topic: "Derivatives",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 30,
    options: [
      { id: "opt-1", text: "3x^2 + 8x - 5", isCorrect: true },
      { id: "opt-2", text: "3x^2 + 4x - 5", isCorrect: false },
      { id: "opt-3", text: "x^2 + 8x - 5", isCorrect: false },
      { id: "opt-4", text: "x^3 + 8x - 5", isCorrect: false },
    ],
    explanation: "Using the power rule d/dx(x^n) = n*x^(n-1): 3x^2 + 8x - 5.",
    tags: ["calculus"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "q-live-2",
    title: "Which of the following organic compounds contain a benzene ring?",
    type: "mcq_single",
    subject: "Science",
    category: "Chemistry",
    topic: "Organic Chemistry",
    difficulty: "Hard",
    marks: 4,
    timeLimitSeconds: 30,
    options: [
      { id: "opt-21", text: "Toluene", isCorrect: true },
      { id: "opt-22", text: "Methane", isCorrect: false },
      { id: "opt-23", text: "Propane", isCorrect: false },
      { id: "opt-24", text: "Ethanol", isCorrect: false },
    ],
    explanation: "Toluene (methylbenzene) contains an aromatic benzene ring.",
    tags: ["chemistry"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "q-live-3",
    title: "Which organ system produces and releases hormones directly into the bloodstream?",
    type: "mcq_single",
    subject: "Biology",
    category: "Human Physiology",
    topic: "Endocrine System",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 30,
    options: [
      { id: "opt-31", text: "Endocrine system", isCorrect: true },
      { id: "opt-32", text: "Nervous system", isCorrect: false },
      { id: "opt-33", text: "Exocrine system", isCorrect: false },
      { id: "opt-34", text: "Immune system", isCorrect: false },
    ],
    explanation: "The endocrine system consists of ductless glands secreting hormones directly into the circulation.",
    tags: ["biology"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "q-live-4",
    title: "Who served as Chairman of the Drafting Committee of the Constituent Assembly of India?",
    type: "mcq_single",
    subject: "History & Polity",
    category: "Constitutional History",
    topic: "Indian Constitution",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 30,
    options: [
      { id: "opt-41", text: "Dr. B. R. Ambedkar", isCorrect: true },
      { id: "opt-42", text: "Jawaharlal Nehru", isCorrect: false },
      { id: "opt-43", text: "Dr. Rajendra Prasad", isCorrect: false },
      { id: "opt-44", text: "Sardar Vallabhbhai Patel", isCorrect: false },
    ],
    explanation: "Dr. B. R. Ambedkar was unanimously appointed Chairman of the Drafting Committee on August 29, 1947.",
    tags: ["polity"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "q-live-5",
    title: "Which primary factor is responsible for the occurrence of seasons on Earth?",
    type: "mcq_single",
    subject: "Astronomy",
    category: "Earth Science",
    topic: "Planetary Motion",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 30,
    options: [
      { id: "opt-51", text: "23.5-degree tilt of Earth's axis with orbital revolution", isCorrect: true },
      { id: "opt-52", text: "Changing distance between Earth and Sun", isCorrect: false },
      { id: "opt-53", text: "Periodic fluctuations in solar radiation", isCorrect: false },
      { id: "opt-54", text: "Gravitational pull of the Moon on the atmosphere", isCorrect: false },
    ],
    explanation: "The axial tilt of 23.5 degrees causes differing angles of solar insolation throughout the year as Earth orbits the Sun.",
    tags: ["earth-science"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

// In-memory global store to survive Next.js Turbopack fast refreshes
declare global {
  // eslint-disable-next-line no-var
  var __QUIZDORM_LIVE_SESSIONS__: Map<string, LiveSessionState> | undefined;
  // eslint-disable-next-line no-var
  var __QUIZDORM_LIVE_LISTENERS__: Map<string, Set<(event: any) => void>> | undefined;
}

const sessionsStore: Map<string, LiveSessionState> =
  globalThis.__QUIZDORM_LIVE_SESSIONS__ ||
  (globalThis.__QUIZDORM_LIVE_SESSIONS__ = new Map<string, LiveSessionState>());

const listenersStore: Map<string, Set<(event: any) => void>> =
  globalThis.__QUIZDORM_LIVE_LISTENERS__ ||
  (globalThis.__QUIZDORM_LIVE_LISTENERS__ = new Map<string, Set<(event: any) => void>>());

/**
 * Normalizes room code to uppercase, trimmed, standardized "QD-XXXX" format
 */
export function normalizeRoomCode(rawCode: string): string {
  if (!rawCode) return "";
  let clean = rawCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
  if (clean.startsWith("QD")) {
    clean = clean.slice(2);
  }
  if (!clean) return "";
  return `QD-${clean}`;
}

/**
 * Generates an unambiguous, collision-resistant room PIN (e.g. QD-8492 or QD-A7X9)
 */
export function generateCollisionResistantCode(): string {
  const chars = "23456789ABCDEFGHJKLMNPQRSTUVWXYZ"; // excludes 0, 1, O, I to prevent human confusion
  for (let attempt = 0; attempt < 100; attempt++) {
    let part = "";
    for (let i = 0; i < 4; i++) {
      part += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const candidate = `QD-${part}`;
    if (!sessionsStore.has(candidate)) {
      return candidate;
    }
  }
  return `QD-${Date.now().toString(36).slice(-4).toUpperCase()}`;
}

/**
 * Helper to emit real-time event to all connected SSE clients
 */
function emitSessionEvent(code: string, eventType: string, payload?: any) {
  const normCode = normalizeRoomCode(code);
  const listeners = listenersStore.get(normCode) || listenersStore.get(code);
  if (listeners && listeners.size > 0) {
    const eventMessage = {
      type: eventType,
      code: normCode,
      timestamp: Date.now(),
      data: payload,
    };
    for (const listener of listeners) {
      try {
        listener(eventMessage);
      } catch (err) {
        console.error("Error dispatching event to listener:", err);
      }
    }
  }
}

/**
 * Subscribe a client (SSE) to session events
 */
export function subscribeToSession(code: string, callback: (event: any) => void): () => void {
  const normCode = normalizeRoomCode(code);
  if (!listenersStore.has(normCode)) {
    listenersStore.set(normCode, new Set());
  }
  const set = listenersStore.get(normCode)!;
  set.add(callback);

  return () => {
    set.delete(callback);
    if (set.size === 0) {
      listenersStore.delete(normCode);
    }
  };
}

/**
 * Recalculate deterministic ranks
 */
function recalculateLeaderboardRanks(session: LiveSessionState) {
  const participantsList = Object.values(session.participants);

  // Deterministic tie-breaking:
  // 1. Higher total score
  // 2. Lower total response time
  // 3. Alphabetical by name
  participantsList.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    const aTime = (a as any).totalResponseTimeMs || 0;
    const bTime = (b as any).totalResponseTimeMs || 0;
    if (aTime !== bTime) return aTime - bTime;
    return a.name.localeCompare(b.name);
  });

  participantsList.forEach((p, index) => {
    const newRank = index + 1;
    const currentRank = p.rank || newRank;
    p.previousRank = currentRank;
    p.rankChange = currentRank - newRank;
    p.rank = newRank;
  });
}

/**
 * Strips secrets and hides question answer keys before question completion!
 */
export function toPublicSessionState(
  session: LiveSessionState,
  requestingParticipantId?: string
): PublicSessionState {
  const now = Date.now();
  let timeRemainingSec = 0;

  if (session.stage === "question") {
    if (session.isPaused) {
      timeRemainingSec = session.pausedTimeRemainingSec;
    } else {
      timeRemainingSec = Math.max(0, Math.ceil((session.currentQuestionDeadline - now) / 1000));
    }
  }

  const rawQuestion = session.questions[session.currentQuestionIndex];
  let publicQuestion: PublicSessionQuestion | null = null;

  if (rawQuestion) {
    // SECURITY CRITICAL: Do NOT disclose isCorrect or explanation during active question!
    const isAnswerKeyRevealed = session.stage === "leaderboard" || session.stage === "winner_podium";

    publicQuestion = {
      id: rawQuestion.id,
      title: rawQuestion.title,
      type: rawQuestion.type,
      subject: rawQuestion.subject,
      category: rawQuestion.category,
      topic: rawQuestion.topic,
      marks: rawQuestion.marks || 4,
      timeLimitSeconds: rawQuestion.timeLimitSeconds || session.settings.timePerQuestionSeconds || 30,
      explanation: isAnswerKeyRevealed ? rawQuestion.explanation : undefined,
      options: (rawQuestion.options || []).map((opt) => ({
        id: opt.id,
        text: opt.text,
        isCorrect: isAnswerKeyRevealed ? opt.isCorrect : undefined,
      })),
    };
  }

  // Count submissions and option distribution for the current question
  let submissionsCountForCurrentQ = 0;
  const submissionDistribution: Record<string, number> = {};
  const submittedParticipantIds: string[] = [];
  const recentActivityFeed: {
    participantName: string;
    timeTakenSec: number;
    optionId: string;
    timestamp: number;
  }[] = [];

  const qPrefix = `${session.currentQuestionIndex}_`;
  for (const [key, answer] of Object.entries(session.answers)) {
    if (key.startsWith(qPrefix)) {
      submissionsCountForCurrentQ++;
      submittedParticipantIds.push(answer.participantId);
      submissionDistribution[answer.optionId] = (submissionDistribution[answer.optionId] || 0) + 1;
      recentActivityFeed.push({
        participantName: answer.participantName,
        timeTakenSec: Math.max(1, Math.round(((answer.submittedAt - session.currentQuestionStartedAt) / 1000) * 10) / 10),
        optionId: answer.optionId,
        timestamp: answer.submittedAt,
      });
    }
  }

  recentActivityFeed.sort((a, b) => b.timestamp - a.timestamp);

  // Deterministically sort participants for public view
  const sortedParticipants = Object.values(session.participants).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.name.localeCompare(b.name);
  });

  // Calculate real-time connected systems count (SSE listeners + enrolled participants)
  const normCode = normalizeRoomCode(session.code);
  const activeListenersCount = listenersStore.get(normCode)?.size || 0;
  const connectedSystemsCount = Math.max(activeListenersCount, sortedParticipants.length, 1);

  return {
    id: session.id,
    code: session.code,
    hostName: session.hostName,
    title: session.title,
    description: session.description,
    quizId: session.quizId,
    quizTitle: session.quizTitle,
    competitionId: session.competitionId,
    status: session.status,
    stage: session.stage,
    settings: session.settings,
    currentQuestionIndex: session.currentQuestionIndex,
    totalQuestions: session.questions.length,
    currentQuestion: publicQuestion,
    currentQuestionDeadline: session.currentQuestionDeadline,
    timeRemainingSec,
    isPaused: session.isPaused,
    participantsCount: sortedParticipants.length,
    participants: sortedParticipants,
    announcements: session.announcements,
    serverTime: now,
    submissionsCountForCurrentQ,
    connectedSystemsCount,
    submissionDistribution,
    submittedParticipantIds,
    recentActivityFeed: recentActivityFeed.slice(0, 8),
  };
}

/**
 * Seed initial featured demo competitions (QD-8492, QD-3104, QD-1250) if not already present
 */
function ensureSeedSession() {
  const seeds = [
    {
      id: "comp-seed-1",
      code: "QD-8492",
      competitionId: "comp-1",
      title: "Tamil Nadu & Kerala Inter-District Science Olympiad 2026",
      description: "Compete against premier school contenders across Chennai, Kochi, Madurai & Trivandrum.",
      quizId: "q-101",
      quizTitle: "Advanced Science & Physics Olympiad",
      hostName: "TN & Kerala Science Olympiad Council",
    },
    {
      id: "comp-seed-2",
      code: "QD-3104",
      competitionId: "comp-2",
      title: "Kerala State Algorithmic & Coding Decathlon",
      description: "High-speed competitive programming quiz tournament across South Zone schools and institutes.",
      quizId: "q-102",
      quizTitle: "Algorithms & Data Structures",
      hostName: "Kerala State IT & Algorithmic League (Kochi)",
    },
    {
      id: "comp-seed-3",
      code: "QD-1250",
      competitionId: "comp-3",
      title: "Madurai & South Tamil Nadu Inter-School Heritage Bowl",
      description: "State history, literature, and general awareness championship tournament.",
      quizId: "q-103",
      quizTitle: "20th Century World & Regional History",
      hostName: "Madurai Heritage & Higher Secondary Academic Council",
    },
  ];

  for (const s of seeds) {
    if (!sessionsStore.has(s.code)) {
      const seedSession: LiveSessionState = {
        id: s.id,
        code: s.code,
        hostId: "usr-seed-host",
        hostName: s.hostName,
        hostSecret: "secret-seed-host-8492",
        competitionId: s.competitionId,
        title: s.title,
        description: s.description,
        quizId: s.quizId,
        quizTitle: s.quizTitle,
        status: "WAITING",
        stage: "lobby",
        settings: {
          durationMinutes: 45,
          maxParticipants: 1000,
          negativeMarking: true,
          timeBonus: true,
          timePerQuestionSeconds: 30,
        },
        questions: DEFAULT_SEED_QUESTIONS,
        currentQuestionIndex: 0,
        currentQuestionStartedAt: 0,
        currentQuestionDeadline: 0,
        isPaused: false,
        pausedTimeRemainingSec: 30,
        participants: {},
        answers: {},
        announcements: [
          {
            id: `ann-${s.code}-1`,
            text: `Welcome competitors to ${s.title}! Arena lobby is open. Host will launch shortly.`,
            timestamp: "Ready",
            author: s.hostName,
          },
        ],
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      sessionsStore.set(s.code, seedSession);
    }
  }
}

// Pre-warm seed session
ensureSeedSession();

export class LiveSessionManager {
  /**
   * Create a new live competition session
   */
  public static createSession(options: CreateSessionOptions): {
    session: LiveSessionState;
    hostSecret: string;
  } {
    const code = options.code ? normalizeRoomCode(options.code) : generateCollisionResistantCode();
    const hostSecret = `sec_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    // Resolve questions: from options or default pool
    let questions = options.questions;
    if (!questions || questions.length === 0) {
      if (options.quizId) {
        const pool = ALL_DEFAULT_QUESTIONS.filter(
          (q) => q.topic?.toLowerCase().includes("calculus") || q.subject === "Science" || q.subject === "Mathematics"
        );
        questions = pool.length >= 3 ? pool.slice(0, 5) : DEFAULT_SEED_QUESTIONS;
      } else {
        questions = DEFAULT_SEED_QUESTIONS;
      }
    }

    const newSession: LiveSessionState = {
      id: `session_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      code,
      hostId: options.hostId || `host_${Date.now()}`,
      hostName: options.hostName || "Competition Host",
      hostSecret,
      competitionId: options.competitionId,
      title: options.title || "Live QuizDorm Arena Championship",
      description: options.description || "Real-time multiplayer competition with live leaderboard",
      quizId: options.quizId || "quiz_live_default",
      quizTitle: options.title || "Championship Knowledge Quiz",
      status: "WAITING",
      stage: "lobby",
      settings: {
        durationMinutes: options.settings?.durationMinutes || 30,
        maxParticipants: options.settings?.maxParticipants || 500,
        negativeMarking: options.settings?.negativeMarking ?? true,
        timeBonus: options.settings?.timeBonus ?? true,
        timePerQuestionSeconds: options.settings?.timePerQuestionSeconds || 30,
      },
      questions,
      currentQuestionIndex: 0,
      currentQuestionStartedAt: 0,
      currentQuestionDeadline: 0,
      isPaused: false,
      pausedTimeRemainingSec: 30,
      participants: {},
      answers: {},
      announcements: [
        {
          id: `ann_${Date.now()}`,
          text: `Welcome! Live Arena session ${code} created. Waiting for participants.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          author: options.hostName || "Host",
        },
      ],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    sessionsStore.set(code, newSession);
    return { session: newSession, hostSecret };
  }

  /**
   * Retrieve a session by code or ID
   */
  public static getSession(codeOrId: string): LiveSessionState | null {
    ensureSeedSession();
    const norm = normalizeRoomCode(codeOrId);
    let session = sessionsStore.get(norm);
    if (!session) {
      for (const s of sessionsStore.values()) {
        if (s.id === codeOrId || s.competitionId === codeOrId || s.code === codeOrId.toUpperCase()) {
          session = s;
          break;
        }
      }
    }
    return session || null;
  }

  /**
   * Participant joins the session
   */
  public static joinSession(
    rawCode: string,
    participant: {
      id?: string;
      userId?: string;
      name: string;
      avatarUrl?: string;
    }
  ): {
    success: boolean;
    participantId: string;
    participantToken: string;
    session: PublicSessionState;
    error?: string;
  } {
    const code = normalizeRoomCode(rawCode);
    const session = this.getSession(code);

    if (!session) {
      return {
        success: false,
        participantId: "",
        participantToken: "",
        session: null as any,
        error: "INVALID_CODE: No active competition arena found with this room PIN.",
      };
    }

    if (session.status === "ENDED") {
      return {
        success: false,
        participantId: "",
        participantToken: "",
        session: toPublicSessionState(session),
        error: "SESSION_ENDED: This live competition has already concluded.",
      };
    }

    const participantsList = Object.values(session.participants);
    if (participantsList.length >= session.settings.maxParticipants) {
      return {
        success: false,
        participantId: "",
        participantToken: "",
        session: toPublicSessionState(session),
        error: "ROOM_FULL: The room has reached maximum capacity.",
      };
    }

    // Check for existing enrollment (by participant ID or user ID)
    let existingParticipant: LiveParticipant | undefined;
    if (participant.id && session.participants[participant.id]) {
      existingParticipant = session.participants[participant.id];
    } else if (participant.userId) {
      existingParticipant = participantsList.find((p) => p.userId === participant.userId);
    }

    let participantId: string;
    if (existingParticipant) {
      // Reconnect existing participant
      participantId = existingParticipant.id;
      existingParticipant.isOnline = true;
      (existingParticipant as any).lastSeen = Date.now();
    } else {
      // Enroll new participant
      participantId = participant.id || `pt_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`;
      const cleanName = participant.name.trim().slice(0, 30) || "Contender";

      const newP: LiveParticipant = {
        id: participantId,
        userId: participant.userId,
        name: cleanName,
        avatarUrl: participant.avatarUrl,
        score: 0,
        streak: 0,
        rank: participantsList.length + 1,
        previousRank: participantsList.length + 1,
        rankChange: 0,
        answersCount: 0,
        correctCount: 0,
        isOnline: true,
      };

      session.participants[participantId] = newP;
      recalculateLeaderboardRanks(session);
    }

    session.updatedAt = Date.now();
    const participantToken = `tok_${participantId}_${session.id}`;

    // Broadcast arrival to host and other participants
    emitSessionEvent(session.code, "participant_joined", {
      participantId,
      name: session.participants[participantId].name,
      participantsCount: Object.keys(session.participants).length,
      session: toPublicSessionState(session),
    });

    return {
      success: true,
      participantId,
      participantToken,
      session: toPublicSessionState(session, participantId),
    };
  }

  /**
   * Submit an answer to the current question with authoritative server validation
   */
  public static submitAnswer(
    rawCode: string,
    participantId: string,
    questionIndex: number,
    optionId: string
  ): {
    success: boolean;
    isCorrect?: boolean;
    scoreAwarded?: number;
    error?: string;
  } {
    const code = normalizeRoomCode(rawCode);
    const session = this.getSession(code);

    if (!session) {
      return { success: false, error: "SESSION_NOT_FOUND" };
    }

    if (session.status !== "ACTIVE" || session.stage !== "question") {
      return { success: false, error: "STAGE_NOT_ACTIVE: Question is not currently active for answering." };
    }

    if (session.currentQuestionIndex !== questionIndex) {
      return { success: false, error: "STALE_QUESTION: Question index mismatch." };
    }

    const participant = session.participants[participantId];
    if (!participant) {
      return { success: false, error: "UNAUTHORIZED_PARTICIPANT: You are not enrolled in this session." };
    }

    const now = Date.now();
    // Authoritative deadline validation (1500ms network tolerance grace)
    if (now > session.currentQuestionDeadline + 1500) {
      return { success: false, error: "TIME_EXPIRED: Answer submitted after authoritative deadline." };
    }

    const answerKey = `${questionIndex}_${participantId}`;
    if (session.answers[answerKey]) {
      // Idempotency: Return existing accepted submission
      const existing = session.answers[answerKey];
      return {
        success: true,
        isCorrect: existing.isCorrect,
        scoreAwarded: existing.scoreAwarded,
      };
    }

    const currentQuestion = session.questions[questionIndex];
    if (!currentQuestion) {
      return { success: false, error: "QUESTION_NOT_FOUND" };
    }

    // Authoritative answer check on server!
    const correctOpt = currentQuestion.options.find((o) => o.isCorrect);
    const isCorrect = Boolean(correctOpt && correctOpt.id === optionId);

    // Scoring calculation
    const baseMarks = currentQuestion.marks || 4;
    const baseScore = baseMarks * 25; // standard 100 points
    let scoreAwarded = 0;
    let speedBonus = 0;

    const timeLimitSec = currentQuestion.timeLimitSeconds || session.settings.timePerQuestionSeconds || 30;
    const timeRemainingSec = Math.max(0, Math.round((session.currentQuestionDeadline - now) / 1000));
    const responseTimeMs = Math.max(0, now - session.currentQuestionStartedAt);

    if (isCorrect) {
      scoreAwarded = baseScore;
      if (session.settings.timeBonus) {
        speedBonus = Math.round((timeRemainingSec / timeLimitSec) * 50);
        scoreAwarded += speedBonus;
      }
      participant.streak = (participant.streak || 0) + 1;
      if (participant.streak >= 3) {
        scoreAwarded += Math.min(participant.streak * 10, 50); // Streak bonus
      }
      participant.score += scoreAwarded;
      participant.correctCount = (participant.correctCount || 0) + 1;
    } else {
      participant.streak = 0;
      if (session.settings.negativeMarking) {
        const penalty = Math.round(baseScore * 0.25); // -25 penalty
        participant.score = Math.max(0, participant.score - penalty);
        scoreAwarded = -penalty;
      }
    }

    participant.answersCount = (participant.answersCount || 0) + 1;
    (participant as any).totalResponseTimeMs = ((participant as any).totalResponseTimeMs || 0) + responseTimeMs;

    const submission: SubmittedAnswer = {
      participantId,
      participantName: participant.name,
      questionIndex,
      optionId,
      submittedAt: now,
      isCorrect,
      scoreAwarded,
      speedBonus,
      timeRemainingSec,
    };

    session.answers[answerKey] = submission;
    session.updatedAt = now;

    recalculateLeaderboardRanks(session);

    // Broadcast submission progress to host
    emitSessionEvent(session.code, "answer_submitted", {
      questionIndex,
      participantId,
      submissionsCount: Object.keys(session.answers).filter((k) => k.startsWith(`${questionIndex}_`)).length,
      session: toPublicSessionState(session),
    });

    return {
      success: true,
      isCorrect,
      scoreAwarded,
    };
  }

  /**
   * Execute an authoritative host action
   */
  public static executeHostAction(
    rawCode: string,
    hostSecret: string,
    action:
      | "start"
      | "next"
      | "next_question"
      | "reveal_leaderboard"
      | "pause"
      | "resume"
      | "skip"
      | "extend_timer"
      | "end"
      | "post_announcement"
      | "kick_participant",
    payload?: any
  ): {
    success: boolean;
    session?: PublicSessionState;
    error?: string;
  } {
    const code = normalizeRoomCode(rawCode);
    const session = this.getSession(code);

    if (!session) {
      return { success: false, error: "SESSION_NOT_FOUND" };
    }

    // Strict host authorization validation - token must strictly match the session's assigned host secret
    const isAuthorized = Boolean(
      hostSecret &&
      typeof hostSecret === "string" &&
      session.hostSecret === hostSecret
    );

    if (!isAuthorized) {
      return { success: false, error: "UNAUTHORIZED_HOST: Invalid host control authorization." };
    }

    const now = Date.now();

    switch (action) {
      case "start": {
        if (session.status === "ACTIVE" && session.stage === "question") {
          // Idempotent
          return { success: true, session: toPublicSessionState(session) };
        }
        session.status = "ACTIVE";
        session.stage = "question";
        session.currentQuestionIndex = 0;
        session.currentQuestionStartedAt = now;
        const q0 = session.questions[0];
        const duration = q0?.timeLimitSeconds || session.settings.timePerQuestionSeconds || 30;
        session.currentQuestionDeadline = now + duration * 1000;
        session.isPaused = false;
        break;
      }

      case "next_question": {
        // Direct jump to next question or final podium
        if (session.currentQuestionIndex < session.questions.length - 1) {
          session.currentQuestionIndex += 1;
          session.status = "ACTIVE";
          session.stage = "question";
          session.currentQuestionStartedAt = now;
          const nextQ = session.questions[session.currentQuestionIndex];
          const duration = nextQ?.timeLimitSeconds || session.settings.timePerQuestionSeconds || 30;
          session.currentQuestionDeadline = now + duration * 1000;
          session.isPaused = false;
        } else {
          session.stage = "winner_podium";
          session.status = "ENDED";
        }
        recalculateLeaderboardRanks(session);
        break;
      }

      case "reveal_leaderboard": {
        session.stage = "leaderboard";
        recalculateLeaderboardRanks(session);
        break;
      }

      case "next": {
        if (session.stage === "question") {
          // Move from active question to leaderboard stage
          session.stage = "leaderboard";
          recalculateLeaderboardRanks(session);
        } else if (session.stage === "leaderboard") {
          // Advance to next question or final podium
          if (session.currentQuestionIndex < session.questions.length - 1) {
            session.currentQuestionIndex += 1;
            session.stage = "question";
            session.currentQuestionStartedAt = now;
            const nextQ = session.questions[session.currentQuestionIndex];
            const duration = nextQ?.timeLimitSeconds || session.settings.timePerQuestionSeconds || 30;
            session.currentQuestionDeadline = now + duration * 1000;
            session.isPaused = false;
          } else {
            session.stage = "winner_podium";
            session.status = "ENDED";
          }
        } else if (session.stage === "lobby") {
          session.status = "ACTIVE";
          session.stage = "question";
          session.currentQuestionIndex = 0;
          session.currentQuestionStartedAt = now;
          const q0 = session.questions[0];
          const duration = q0?.timeLimitSeconds || session.settings.timePerQuestionSeconds || 30;
          session.currentQuestionDeadline = now + duration * 1000;
          session.isPaused = false;
        }
        break;
      }

      case "pause": {
        if (!session.isPaused && session.stage === "question") {
          session.isPaused = true;
          session.pausedTimeRemainingSec = Math.max(0, Math.ceil((session.currentQuestionDeadline - now) / 1000));
        }
        break;
      }

      case "resume": {
        if (session.isPaused && session.stage === "question") {
          session.isPaused = false;
          session.currentQuestionDeadline = now + session.pausedTimeRemainingSec * 1000;
        }
        break;
      }

      case "skip": {
        if (session.stage === "question") {
          session.stage = "leaderboard";
          recalculateLeaderboardRanks(session);
        }
        break;
      }

      case "extend_timer": {
        if (session.stage === "question") {
          const extensionSec = payload?.seconds || 15;
          session.currentQuestionDeadline += extensionSec * 1000;
        }
        break;
      }

      case "end": {
        session.stage = "winner_podium";
        session.status = "ENDED";
        recalculateLeaderboardRanks(session);
        break;
      }

      case "post_announcement": {
        if (payload?.text) {
          const ann: AnnouncementItem = {
            id: `ann_${now}`,
            text: payload.text,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            author: session.hostName || "Host",
          };
          session.announcements = [ann, ...session.announcements];
        }
        break;
      }

      case "kick_participant": {
        if (payload?.participantId && session.participants[payload.participantId]) {
          delete session.participants[payload.participantId];
          recalculateLeaderboardRanks(session);
        }
        break;
      }

      default:
        return { success: false, error: "INVALID_ACTION" };
    }

    session.updatedAt = now;
    const publicState = toPublicSessionState(session);

    // Broadcast state transition to all clients!
    emitSessionEvent(session.code, `action_${action}`, {
      action,
      session: publicState,
    });

    return { success: true, session: publicState };
  }
}
