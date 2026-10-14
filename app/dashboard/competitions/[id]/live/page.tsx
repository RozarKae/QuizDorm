"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CompetitionItem } from "@/lib/types/competition";
import { QuestionItem } from "@/lib/types/question";
import { useLiveCompetition } from "@/lib/hooks/useLiveCompetition";
import { CompetitionLobby } from "@/components/competitions/CompetitionLobby";
import { HostControlPanel } from "@/components/competitions/HostControlPanel";
import { LiveQuestionSession } from "@/components/competitions/LiveQuestionSession";
import { AnimatedLeaderboard } from "@/components/competitions/AnimatedLeaderboard";
import { WinnerPodiumScreen } from "@/components/competitions/WinnerPodiumScreen";
import { LiveAnalyticsCard } from "@/components/competitions/LiveAnalyticsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, User } from "lucide-react";
import { toast } from "sonner";

const mockCompItem: CompetitionItem = {
  id: "comp-1",
  title: "National Science & Olympiad Championship 2026",
  description: "Compete against students nationwide in real-time.",
  quizId: "q-101",
  quizTitle: "Advanced Science & Physics Olympiad",
  code: "QD-8492",
  hostId: "usr-1",
  hostName: "Oakridge Quiz Federation",
  status: "Live",
  startDate: "Jul 23, 2026",
  startTime: "07:30 PM",
  durationMinutes: 45,
  maxParticipants: 1000,
  currentParticipantsCount: 840,
  isPublic: true,
  negativeMarking: true,
  timeBonus: true,
  participants: [],
  announcements: [],
  createdAt: "Jul 2026",
  updatedAt: "Jul 2026",
};

const mockCompQuestions: QuestionItem[] = [
  {
    id: "q-1",
    title: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
    type: "mcq_single",
    subject: "Mathematics",
    category: "Algebra",
    topic: "Calculus",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 30,
    options: [
      { id: "opt-1", text: "3x^2 + 8x - 5", isCorrect: true },
      { id: "opt-2", text: "3x^2 + 4x - 5", isCorrect: false },
      { id: "opt-3", text: "x^2 + 8x - 5", isCorrect: false },
    ],
    tags: ["calculus"],
    createdAt: "Jul 2026",
    updatedAt: "Jul 2026",
  },
  {
    id: "q-2",
    title: "Which of the following organic compounds contain a benzene ring?",
    type: "mcq_multiple",
    subject: "Science",
    category: "Chemistry",
    topic: "Organic Chemistry",
    difficulty: "Hard",
    marks: 5,
    timeLimitSeconds: 30,
    options: [
      { id: "o1", text: "Toluene", isCorrect: true },
      { id: "o2", text: "Phenol", isCorrect: true },
      { id: "o3", text: "Methane", isCorrect: false },
    ],
    tags: ["chemistry"],
    createdAt: "Jul 2026",
    updatedAt: "Jul 2026",
  },
];

export default function LiveCompetitionEnginePage({ params }: { params: { id: string } }) {
  const [userRole, setUserRole] = useState<"host" | "participant">("host");

  const {
    stage,
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
  } = useLiveCompetition(mockCompItem, mockCompQuestions);

  return (
    <div className="space-y-6">
      {/* Top Header & Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link href="/dashboard/competitions" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Exit Room
        </Link>

        {/* Role view toggle for testing */}
        <div className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
          <button
            onClick={() => setUserRole("host")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center ${
              userRole === "host" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-gray-400"
            }`}
          >
            <Monitor className="w-3.5 h-3.5 mr-1" /> Host View Mode
          </button>
          <button
            onClick={() => setUserRole("participant")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center ${
              userRole === "participant" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-gray-400"
            }`}
          >
            <User className="w-3.5 h-3.5 mr-1" /> Participant View Mode
          </button>
        </div>
      </div>

      {/* Host Control Bar when game is running */}
      {userRole === "host" && stage !== "lobby" && stage !== "winner_podium" && (
        <HostControlPanel
          isPaused={isPaused}
          timeRemaining={questionTimeRemaining}
          onPause={pauseCompetition}
          onResume={resumeCompetition}
          onSkipQuestion={skipQuestion}
          onExtendTime={extendTimer}
          onEndCompetition={endCompetition}
        />
      )}

      {/* STAGE 1: LOBBY */}
      {stage === "lobby" && (
        <CompetitionLobby
          competition={mockCompItem}
          participants={participants}
          announcements={announcements}
          isHost={userRole === "host"}
          onStartCompetition={startCompetition}
          onPostAnnouncement={postAnnouncement}
          onKickParticipant={kickParticipant}
        />
      )}

      {/* STAGE 2: LIVE QUESTION SESSION */}
      {stage === "question" && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <LiveQuestionSession
              question={currentQuestion}
              questionNumber={currentQIndex + 1}
              totalQuestions={mockCompQuestions.length}
              timeRemaining={questionTimeRemaining}
              userAnswerSubmitted={userAnswerSubmitted}
              onOptionSubmit={submitAnswer}
            />
          </div>
          <div className="lg:col-span-4">
            <LiveAnalyticsCard participantCount={participants.length} />
          </div>
        </div>
      )}

      {/* STAGE 3: ANIMATED LEADERBOARD */}
      {stage === "leaderboard" && (
        <AnimatedLeaderboard
          participants={participants}
          onNextQuestion={nextQuestionOrPodium}
          isHost={userRole === "host"}
        />
      )}

      {/* STAGE 4: WINNER PODIUM */}
      {stage === "winner_podium" && (
        <WinnerPodiumScreen
          participants={participants}
          competitionTitle={mockCompItem.title}
        />
      )}
    </div>
  );
}
