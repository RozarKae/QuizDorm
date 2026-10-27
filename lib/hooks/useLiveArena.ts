"use client";

import { PublicSessionState } from "@/lib/live/types";
import { useCallback,useEffect,useRef,useState } from "react";
import { toast } from "sonner";

interface UseLiveArenaOptions {
  code: string;
  isHost?: boolean;
  hostSecret?: string;
  participantName?: string;
  autoJoin?: boolean;
}

export function useLiveArena({
  code: rawCode,
  isHost = false,
  hostSecret: initialHostSecret,
  participantName,
  autoJoin = false,
}: UseLiveArenaOptions) {
  const code = (rawCode || "").trim().toUpperCase();

  const [session, setSession] = useState<PublicSessionState | null>(null);
  const [participantId, setParticipantId] = useState<string>(() => {
    if (typeof window !== "undefined" && code) {
      return sessionStorage.getItem(`quizdorm_pid_${code}`) || localStorage.getItem(`quizdorm_pid_${code}`) || "";
    }
    return "";
  });
  const [hostSecret] = useState<string>(() => {
    if (initialHostSecret) return initialHostSecret;
    if (typeof window !== "undefined" && isHost && code) {
      const stored = localStorage.getItem(`quizdorm_host_sec_${code}`);
      if (stored) return stored;
      const demoSecret = "secret-seed-host-8492";
      localStorage.setItem(`quizdorm_host_sec_${code}`, demoSecret);
      return demoSecret;
    }
    return "";
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [connectionError, setConnectionError] = useState<string | null>(null);
  const [userAnswerSubmitted, setUserAnswerSubmitted] = useState<boolean>(false);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);

  const prevQIndexRef = useRef<number>(-1);
  const sseRef = useRef<EventSource | null>(null);

  // Fetch initial session state
  const fetchSession = useCallback(async () => {
    if (!code) return null;
    try {
      const url = `/api/live/session/${encodeURIComponent(code)}${
        participantId ? `?participantId=${encodeURIComponent(participantId)}` : ""
      }`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.session) {
        setSession(data.session);
        setConnectionError(null);
        return data.session as PublicSessionState;
      } else {
        setConnectionError(data.error || "Failed to load competition session");
        return null;
      }
    } catch (err: unknown) {
      setConnectionError(err instanceof Error ? err.message : "Network error reaching game arena");
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [code, participantId]);

  // Join session action
  const joinSession = useCallback(
    async (name: string, avatarUrl?: string) => {
      if (!code) return { success: false, error: "Missing room code" };
      try {
        setIsLoading(true);
        const res = await fetch(`/api/live/session/${encodeURIComponent(code)}/join`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            avatarUrl,
            participantId: participantId || undefined,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setParticipantId(data.participantId);
          setSession(data.session);
          if (typeof window !== "undefined") {
            sessionStorage.setItem(`quizdorm_pid_${code}`, data.participantId);
            localStorage.setItem(`quizdorm_pid_${code}`, data.participantId);
            localStorage.setItem("quizdorm_participant_name", name);
          }
          toast.success(`Welcome to the arena, ${name}!`);
          return { success: true, participantId: data.participantId };
        } else {
          toast.error(data.error || "Unable to join room");
          return { success: false, error: data.error };
        }
      } catch (err: unknown) {
        toast.error("Failed to connect to arena");
        return { success: false, error: err instanceof Error ? err.message : String(err) };
      } finally {
        setIsLoading(false);
      }
    },
    [code, participantId]
  );

  // Auto-join if requested and participantName is present
  useEffect(() => {
    if (autoJoin && participantName && code && !participantId && !isHost) {
      queueMicrotask(() => {
        void joinSession(participantName);
      });
    }
  }, [autoJoin, participantName, code, participantId, isHost, joinSession]);

  // Connect Server-Sent Events (SSE)
  useEffect(() => {
    if (!code) return;

    queueMicrotask(() => {
      void fetchSession();
    });

    let eventSource: EventSource | null = null;
    let reconnectTimeout: NodeJS.Timeout | null = null;

    function connectSSE() {
      try {
        eventSource = new EventSource(`/api/live/session/${encodeURIComponent(code)}/stream`);
        sseRef.current = eventSource;

        eventSource.addEventListener("session_update", (e) => {
          try {
            const updated = JSON.parse(e.data);
            setSession(updated);
            setConnectionError(null);
          } catch (parseErr) {
            console.error("SSE parse error:", parseErr);
          }
        });

        eventSource.onerror = () => {
          if (eventSource) {
            eventSource.close();
            sseRef.current = null;
          }
          // Reconnect with backoff
          reconnectTimeout = setTimeout(connectSSE, 3000);
        };
      } catch (err) {
        console.error("Failed to establish SSE stream:", err);
      }
    }

    connectSSE();

    // Fallback polling every 1 second to guarantee live response freshness
    const pollInterval = setInterval(() => {
      fetchSession();
    }, 1000);

    return () => {
      if (eventSource) eventSource.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
      clearInterval(pollInterval);
    };
  }, [code, fetchSession]);

  // Question index change detection -> reset answer submission state
  const currentQIndex = session?.currentQuestionIndex;
  useEffect(() => {
    if (currentQIndex !== undefined && currentQIndex !== prevQIndexRef.current) {
      prevQIndexRef.current = currentQIndex;
      setUserAnswerSubmitted(false);
      setSelectedOptionId(null);
    }
  }, [currentQIndex]);

  // Local timer synchronized to server deadline
  const sessionStage = session?.stage;
  const isPaused = session?.isPaused;
  const deadline = session?.currentQuestionDeadline;
  const pausedTimeRemaining = session?.timeRemainingSec;

  useEffect(() => {
    if (sessionStage !== "question") return;

    if (isPaused) {
      queueMicrotask(() => setTimeRemaining(pausedTimeRemaining || 0));
      return;
    }

    if (!deadline) return;

    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, Math.ceil((deadline - now) / 1000));
      setTimeRemaining(diff);
    }, 250);

    return () => clearInterval(timer);
  }, [sessionStage, isPaused, deadline, pausedTimeRemaining]);

  // Submit Answer Action
  const submitAnswer = async (optionId: string) => {
    if (!session || session.stage !== "question" || userAnswerSubmitted) return;
    if (!participantId) {
      toast.error("Participant profile not found. Please re-enter the room.");
      return;
    }

    setSelectedOptionId(optionId);
    setUserAnswerSubmitted(true);

    try {
      const res = await fetch(`/api/live/session/${encodeURIComponent(code)}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          participantId,
          questionIndex: session.currentQuestionIndex,
          optionId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Answer locked in!");
      } else {
        toast.error(data.error || "Answer submission rejected");
      }
    } catch {
      toast.error("Network error submitting answer");
    }
  };

  // Host Action helper
  const sendHostAction = async (action: string, payload?: unknown) => {
    if (!code) return;
    const sec = hostSecret || (typeof window !== "undefined" ? localStorage.getItem(`quizdorm_host_sec_${code}`) : "");
    try {
      const res = await fetch(`/api/live/session/${encodeURIComponent(code)}/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sec}`,
        },
        body: JSON.stringify({
          action,
          hostSecret: sec,
          payload,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (data.session) setSession(data.session);
      } else {
        toast.error(data.error || `Host action "${action}" failed`);
      }
    } catch {
      toast.error(`Error executing ${action}`);
    }
  };

  const startCompetition = () => sendHostAction("start");
  const nextQuestionOrPodium = () => sendHostAction("next");
  const nextQuestionDirect = () => sendHostAction("next_question");
  const revealLeaderboard = () => sendHostAction("reveal_leaderboard");
  const pauseCompetition = () => sendHostAction("pause");
  const resumeCompetition = () => sendHostAction("resume");
  const skipQuestion = () => sendHostAction("skip");
  const extendTimer = (seconds: number = 15) => sendHostAction("extend_timer", { seconds });
  const endCompetition = () => sendHostAction("end");
  const postAnnouncement = (text: string) => sendHostAction("post_announcement", { text });
  const kickParticipant = (pId: string) => sendHostAction("kick_participant", { participantId: pId });

  // Resolve current participant
  const currentParticipant = session?.participants.find((p) => p.id === participantId) || null;

  return {
    session,
    stage: session?.stage || "lobby",
    status: session?.status || "WAITING",
    currentQIndex: session?.currentQuestionIndex ?? 0,
    currentQuestion: session?.currentQuestion,
    totalQuestions: session?.totalQuestions ?? 0,
    questionTimeRemaining: timeRemaining,
    isPaused: session?.isPaused ?? false,
    participants: session?.participants || [],
    announcements: session?.announcements || [],
    userAnswerSubmitted,
    selectedOptionId,
    participantId,
    currentParticipant,
    isLoading,
    connectionError,
    submissionsCount: session?.submissionsCountForCurrentQ ?? 0,
    connectedSystemsCount: session?.connectedSystemsCount ?? Math.max(session?.participants?.length || 0, 1),
    submissionDistribution: session?.submissionDistribution || {},
    submittedParticipantIds: session?.submittedParticipantIds || [],
    recentActivityFeed: session?.recentActivityFeed || [],

    // Actions
    joinSession,
    submitAnswer,
    startCompetition,
    nextQuestionOrPodium,
    nextQuestionDirect,
    revealLeaderboard,
    pauseCompetition,
    resumeCompetition,
    skipQuestion,
    extendTimer,
    endCompetition,
    postAnnouncement,
    kickParticipant,
    refetch: fetchSession,
  };
}
