"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useLiveArena } from "@/lib/hooks/useLiveArena";
import { CompetitionLobby } from "@/components/competitions/CompetitionLobby";
import { LiveQuestionSession } from "@/components/competitions/LiveQuestionSession";
import { AnimatedLeaderboard } from "@/components/competitions/AnimatedLeaderboard";
import { WinnerPodiumScreen } from "@/components/competitions/WinnerPodiumScreen";
import { HostControlPanel } from "@/components/competitions/HostControlPanel";
import { ArrowLeft, RefreshCw, AlertCircle, User, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { useSound } from "@/components/audio/useSound";
import { toast } from "sonner";

function StandaloneArenaContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { playTap } = useSound();

  const codeParam = (params?.code as string) || searchParams.get("code") || "QD-8492";

  const isHostParam = searchParams.get("role") === "host" || searchParams.get("host") === "true";
  const [isHost, setIsHost] = useState<boolean>(() => {
    if (isHostParam) return true;
    if (typeof window !== "undefined" && codeParam) {
      return Boolean(localStorage.getItem(`quizdorm_host_sec_${codeParam}`));
    }
    return false;
  });

  const [nickname, setNickname] = useState<string>(() => searchParams.get("name") || "");
  const [nameInput, setNameInput] = useState<string>(() => searchParams.get("name") || "");

  const {
    session,
    stage,
    currentQIndex,
    currentQuestion,
    totalQuestions,
    questionTimeRemaining,
    isPaused,
    participants,
    announcements,
    userAnswerSubmitted,
    selectedOptionId,
    submissionsCount,
    connectedSystemsCount,
    submissionDistribution,
    isLoading,
    connectionError,
    currentParticipant,
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
  } = useLiveArena({
    code: codeParam,
    isHost,
    participantName: nickname || undefined,
    autoJoin: Boolean(nickname),
  });

  const handleManualJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    playTap();
    const cleanName = (nameInput || "Contender").trim();
    if (!cleanName) {
      toast.error("Please enter a callsign");
      return;
    }
    setNickname(cleanName);
    if (typeof window !== "undefined") {
      localStorage.setItem("quizdorm_participant_name", cleanName);
    }
    await joinSession(cleanName);
  };

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
            <Link href="/live/join">
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
          href="/live/join"
          className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#65F59A] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> EXIT ARENA
        </Link>
        <div className="flex items-center space-x-3">
          <AudioToggle />
          <span className="font-mono text-xs font-bold text-[#65F59A] bg-[rgba(101,245,154,0.12)] border border-[rgba(101,245,154,0.3)] px-3 py-1 rounded-[4px] shadow-[0_0_15px_rgba(101,245,154,0.25)] flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
            ARENA PIN: {session?.code || codeParam}
          </span>
        </div>
      </div>

      {/* Host Control Desk Bar */}
      {isHost && stage !== "lobby" && stage !== "winner_podium" && (
        <HostControlPanel
          isPaused={isPaused}
          timeRemaining={questionTimeRemaining}
          onPause={pauseCompetition}
          onResume={resumeCompetition}
          onSkipQuestion={skipQuestion}
          onExtendTime={extendTimer}
          onEndCompetition={endCompetition}
          onNextQuestion={nextQuestionOrPodium}
          onNextQuestionDirect={nextQuestionDirect}
          onRevealLeaderboard={revealLeaderboard}
          connectedSystemsCount={connectedSystemsCount}
          submissionsCount={submissionsCount}
          totalParticipants={participants.length}
        />
      )}

      {/* Contestant Callsign Prompt if not enrolled yet and NOT the host */}
      {!currentParticipant && !isHost ? (
        <div className="max-w-md mx-auto my-12 bg-[#0C1210] p-6 sm:p-8 rounded-[6px] border border-[rgba(101,245,154,0.3)] shadow-[0_0_24px_rgba(101,245,154,0.12)] text-center space-y-5 relative z-10">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-[3px] bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.3)] text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN ARENA // CONTENDER CALLSIGN</span>
          </div>
          <h2 className="text-xl font-bold font-display text-[#F2F7F3]">
            {session?.title || "Live Quiz Championship"}
          </h2>
          <p className="text-xs text-[#A0AEA5] font-mono">
            Enter your display nickname to enroll in live synchronized leaderboard scoring.
          </p>

          <form onSubmit={handleManualJoin} className="space-y-4">
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-[#69786F]" />
              <Input
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                placeholder="Enter your full name or callsign..."
                className="pl-9 h-10 text-sm font-mono bg-[#111B17] border-[rgba(160,190,170,0.2)] text-[#F2F7F3] rounded-[4px] focus:border-[#65F59A]"
                maxLength={25}
                autoFocus
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-10 shadow-[0_0_12px_rgba(101,245,154,0.2)]"
            >
              <Zap className="w-3.5 h-3.5 mr-1.5 fill-current" /> Enter Battle Arena
            </Button>
          </form>
        </div>
      ) : (
        <>
          {/* STAGE 1: LOBBY */}
          {stage === "lobby" && (
            <CompetitionLobby
              competition={competitionItem}
              participants={participants}
              announcements={announcements}
              isHost={isHost}
              currentParticipantName={currentParticipant?.name || (isHost ? "Host" : nickname)}
              onStartCompetition={startCompetition}
              onPostAnnouncement={postAnnouncement}
              onKickParticipant={kickParticipant}
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
              isHost={isHost}
              submissionsCount={submissionsCount}
              totalParticipants={participants.length}
              connectedSystemsCount={connectedSystemsCount}
              submissionDistribution={submissionDistribution}
              onOptionSubmit={(optId) => {
                playTap();
                submitAnswer(optId);
              }}
            />
          )}

          {/* STAGE 3: LEADERBOARD */}
          {stage === "leaderboard" && (
            <AnimatedLeaderboard
              participants={participants}
              isHost={isHost}
              onNextQuestion={nextQuestionOrPodium}
              questionExplanation={currentQuestion?.explanation}
              correctOptionText={currentQuestion?.options?.find((o) => o.isCorrect)?.text}
            />
          )}

          {/* STAGE 4: WINNER PODIUM */}
          {stage === "winner_podium" && (
            <WinnerPodiumScreen
              participants={participants}
              competitionTitle={competitionItem.title}
              currentParticipant={currentParticipant}
            />
          )}
        </>
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
