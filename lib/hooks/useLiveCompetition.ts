"use client";

import { useState, useEffect, useCallback } from "react";
import { CompetitionItem, LiveParticipant, AnnouncementItem } from "@/lib/types/competition";
import { QuestionItem } from "@/lib/types/question";

const initialParticipants: LiveParticipant[] = [
  { id: "p1", userId: "u1", name: "Alex Rivera", score: 1420, rank: 1, rankChange: 2, streak: 5, isOnline: true },
  { id: "p2", userId: "u2", name: "Sophia Chen", score: 1350, rank: 2, rankChange: -1, streak: 3, isOnline: true },
  { id: "p3", userId: "u3", name: "Marcus Vance", score: 1280, rank: 3, rankChange: 1, streak: 2, isOnline: true },
  { id: "p4", userId: "u4", name: "Elena Rostova", score: 1190, rank: 4, rankChange: 0, streak: 4, isOnline: true },
  { id: "p5", userId: "u5", name: "Liam O'Connor", score: 1110, rank: 5, rankChange: -2, streak: 1, isOnline: true },
];

export function useLiveCompetition(competition: CompetitionItem, questions: QuestionItem[]) {
  const [stage, setStage] = useState<"lobby" | "question" | "leaderboard" | "winner_podium">("lobby");
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [questionTimeRemaining, setQuestionTimeRemaining] = useState(30);
  const [isPaused, setIsPaused] = useState(false);
  const [participants, setParticipants] = useState<LiveParticipant[]>(initialParticipants);
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>([
    { id: "a1", text: "Welcome everyone! Competition will start shortly.", timestamp: "7:30 PM", author: "Host Admin" },
  ]);
  const [userAnswerSubmitted, setUserAnswerSubmitted] = useState(false);

  const currentQuestion = questions[currentQIndex];

  // Question countdown tick
  useEffect(() => {
    if (stage !== "question" || isPaused) return;

    const interval = setInterval(() => {
      setQuestionTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setStage("leaderboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [stage, isPaused]);

  // Host Actions
  const startCompetition = () => {
    setStage("question");
    setCurrentQIndex(0);
    setQuestionTimeRemaining(currentQuestion?.timeLimitSeconds || 30);
    setUserAnswerSubmitted(false);
  };

  const nextQuestionOrPodium = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
      setStage("question");
      setQuestionTimeRemaining(questions[currentQIndex + 1]?.timeLimitSeconds || 30);
      setUserAnswerSubmitted(false);
    } else {
      setStage("winner_podium");
    }
  };

  const pauseCompetition = () => setIsPaused(true);
  const resumeCompetition = () => setIsPaused(false);

  const skipQuestion = () => {
    setStage("leaderboard");
  };

  const extendTimer = (seconds: number) => {
    setQuestionTimeRemaining((prev) => prev + seconds);
  };

  const endCompetition = () => {
    setStage("winner_podium");
  };

  const postAnnouncement = (text: string) => {
    const newA: AnnouncementItem = {
      id: `ann-${Date.now()}`,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      author: "Host",
    };
    setAnnouncements((prev) => [newA, ...prev]);
  };

  const kickParticipant = (id: string) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  };

  const submitAnswer = (optionId: string) => {
    setUserAnswerSubmitted(true);
    // Calculate speed bonus
    const speedBonus = Math.round(questionTimeRemaining * 10);
    setParticipants((prev) =>
      prev.map((p) => (p.id === "p1" ? { ...p, score: p.score + 100 + speedBonus, streak: (p.streak || 0) + 1 } : p))
    );
  };

  return {
    stage,
    setStage,
    currentQIndex,
    currentQuestion,
    questionTimeRemaining,
    isPaused,
    participants,
    announcements,
    userAnswerSubmitted,
    startCompetition,
    nextQuestionOrPodium,
    pauseCompetition,
    resumeCompetition,
    skipQuestion,
    extendTimer,
    endCompetition,
    postAnnouncement,
    kickParticipant,
    submitAnswer,
  };
}
