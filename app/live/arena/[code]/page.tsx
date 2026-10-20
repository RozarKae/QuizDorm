"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useLiveArena } from "@/lib/hooks/useLiveArena";
import { CompetitionLobby } from "@/components/competitions/CompetitionLobby";
import { LiveQuestionSession } from "@/components/competitions/LiveQuestionSession";
import { AnimatedLeaderboard } from "@/components/competitions/AnimatedLeaderboard";
import { WinnerPodiumScreen } from "@/components/competitions/WinnerPodiumScreen";
import { ArrowLeft, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

function StandaloneArenaContent() {
  const params = useParams();
  const searchParams = useSearchParams();

  const codeParam = (params?.code as string) || searchParams.get("code") || "QD-8492";

  const {
    session,
    stage,
    currentQIndex,
    currentQuestion,
    totalQuestions,
    questionTimeRemaining,
    participants,
    announcements,
    userAnswerSubmitted,
    selectedOptionId,
    isLoading,
    connectionError,
    currentParticipant,
    submitAnswer,
  } = useLiveArena({
    code: codeParam,
    isHost: false,
    autoJoin: true,
  });

  if (isLoading && !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3 font-mono text-xs bg-[#070B0A] text-[#F2F7F3]">
        <RefreshCw className="w-6 h-6 animate-spin text-[#65F59A]" />
        <p className="text-[#A0AEA5]">Connecting to Live Arena ({codeParam})...</p>
      </div>
    );
  }

  if (connectionError && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-[#070B0A]">
        <div className="max-w-md w-full p-6 rounded-[6px] border border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.08)] text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-[#F87171] mx-auto" />
          <h2 className="text-base font-bold text-[#F2F7F3]">Arena Connection Failed</h2>
          <p className="text-xs text-[#A0AEA5]">{connectionError}</p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/student/live/join">
              <Button size="sm" className="font-mono text-xs">
                Enter Different PIN
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const competitionItem = {
    id: session?.id || "comp-live",
    title: session?.title || "Live Arena Championship",
    description: session?.description,
    quizId: session?.quizId || "quiz-1",
    quizTitle: session?.quizTitle || "Knowledge Challenge",
    code: session?.code || codeParam,
    hostId: "host-live",
    hostName: session?.hostName || "Arena Federation",
    status: (session?.status === "WAITING" ? "Lobby" : session?.status === "ACTIVE" ? "Live" : "Ended") as any,
    currentParticipantsCount: participants.length,
    participants,
    announcements,
  };

  return (
    <div className="min-h-screen bg-[#070B0A] text-[#F2F7F3] py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6 relative aurora-grid">
      {/* Ambient Arena Spotlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-[radial-gradient(ellipse_at_center,rgba(101,245,154,0.1)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.14)] pb-4 relative z-10">
        <Link
          href="/student/live/join"
          className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#65F59A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> EXIT ARENA
        </Link>
        <span className="font-mono text-xs font-bold text-[#65F59A] bg-[rgba(101,245,154,0.12)] border border-[rgba(101,245,154,0.3)] px-3 py-1 rounded-[4px] shadow-[0_0_15px_rgba(101,245,154,0.25)] flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
          ARENA PIN: {session?.code || codeParam}
        </span>
      </div>

      {/* STAGE 1: LOBBY */}
      {stage === "lobby" && (
        <CompetitionLobby
          competition={competitionItem}
          participants={participants}
          announcements={announcements}
          isHost={false}
          currentParticipantName={currentParticipant?.name}
        />
      )}

      {/* STAGE 2: QUESTION */}
      {stage === "question" && currentQuestion && (
        <LiveQuestionSession
          question={currentQuestion}
          questionNumber={currentQIndex + 1}
          totalQuestions={totalQuestions || 5}
          timeRemaining={questionTimeRemaining}
          userAnswerSubmitted={userAnswerSubmitted}
          selectedOptionId={selectedOptionId}
          isHost={false}
          onOptionSubmit={submitAnswer}
        />
      )}

      {/* STAGE 3: LEADERBOARD */}
      {stage === "leaderboard" && (
        <AnimatedLeaderboard
          participants={participants}
          isHost={false}
          questionExplanation={currentQuestion?.explanation}
          correctOptionText={currentQuestion?.options?.find((o) => o.isCorrect)?.text}
        />
      )}

      {/* STAGE 4: WINNER PODIUM */}
      {stage === "winner_podium" && (
        <WinnerPodiumScreen
          participants={participants}
          competitionTitle={competitionItem.title}
        />
      )}
    </div>
  );
}

export default function StandaloneArenaPage() {
  return (
    <Suspense fallback={<div className="font-mono text-xs text-muted-foreground p-8">Loading Live Arena...</div>}>
      <StandaloneArenaContent />
    </Suspense>
  );
}
