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
      <div className="min-h-screen flex flex-col items-center justify-center space-y-3 font-mono text-xs bg-background text-foreground">
        <RefreshCw className="w-6 h-6 animate-spin text-[#2855F5]" />
        <p className="text-muted-foreground">Connecting to Live Arena ({codeParam})...</p>
      </div>
    );
  }

  if (connectionError && !session) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-background">
        <div className="max-w-md w-full p-6 rounded-[4px] border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/30 text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
          <h2 className="text-base font-bold text-red-900 dark:text-red-200">Arena Connection Failed</h2>
          <p className="text-xs text-red-700 dark:text-red-300">{connectionError}</p>
          <div className="pt-2 flex justify-center gap-3">
            <Link href="/student/live/join">
              <Button size="sm" className="bg-[#2855F5] text-white text-xs font-mono">
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
    <div className="min-h-screen bg-background text-foreground py-6 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <Link
          href="/student/live/join"
          className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> EXIT ARENA
        </Link>
        <span className="font-mono text-xs font-bold text-[#2855F5]">
          PIN: {session?.code || codeParam}
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
