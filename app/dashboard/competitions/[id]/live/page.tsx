"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useLiveArena } from "@/lib/hooks/useLiveArena";
import { CompetitionLobby } from "@/components/competitions/CompetitionLobby";
import { HostControlPanel } from "@/components/competitions/HostControlPanel";
import { LiveQuestionSession } from "@/components/competitions/LiveQuestionSession";
import { AnimatedLeaderboard } from "@/components/competitions/AnimatedLeaderboard";
import { WinnerPodiumScreen } from "@/components/competitions/WinnerPodiumScreen";
import { LiveAnalyticsCard } from "@/components/competitions/LiveAnalyticsCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Monitor, User, AlertCircle, RefreshCw } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

function LiveArenaContent() {
  const routeParams = useParams();
  const searchParams = useSearchParams();
  const { profile } = useAuth();

  const id = (routeParams?.id as string) || "comp-1";
  const codeParam = searchParams.get("code") || (id.startsWith("QD-") ? id : "QD-8492");
  const roleParam = searchParams.get("role");
  const initialHostSecret = searchParams.get("hostSecret") || undefined;

  const [userRole, setUserRole] = useState<"host" | "participant">(
    roleParam === "participant" ? "participant" : "host"
  );

  const {
    session,
    stage,
    status,
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
    recentActivityFeed,
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
    isHost: userRole === "host",
    hostSecret: initialHostSecret,
    participantName: profile?.name || "Contender",
    autoJoin: userRole === "participant",
  });

  // If user role changes to participant, ensure enrollment
  useEffect(() => {
    if (userRole === "participant" && session && !currentParticipant) {
      joinSession(profile?.name || "Contender", profile?.avatar);
    }
  }, [userRole, session, currentParticipant, profile, joinSession]);

  if (isLoading && !session) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-3 font-mono text-xs">
        <RefreshCw className="w-6 h-6 animate-spin text-[#FF4D6D]" />
        <p className="text-[#A0AEA5]">Connecting to Live Arena Engine ({codeParam})...</p>
      </div>
    );
  }

  if (connectionError && !session) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 rounded-[6px] border border-[rgba(248,113,113,0.3)] bg-[rgba(248,113,113,0.08)] text-center space-y-4">
        <AlertCircle className="w-10 h-10 text-[#F87171] mx-auto" />
        <h2 className="text-base font-bold text-[#F2F7F3]">Unable to Connect to Arena</h2>
        <p className="text-xs text-[#A0AEA5]">{connectionError}</p>
        <div className="pt-2 flex justify-center gap-3">
          <Link href="/dashboard/competitions">
            <Button variant="outline" size="sm" className="text-xs font-mono border-[rgba(240, 160, 180,0.18)] text-[#A0AEA5] hover:text-[#F2F7F3]">
              Return to Competitions
            </Button>
          </Link>
          <Link href="/live/join">
            <Button size="sm" className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] text-xs font-mono font-bold shadow-[0_0_12px_rgba(255, 77, 109,0.18)]">
              Enter Different PIN
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const competitionItem = {
    id: session?.id || id,
    title: session?.title || "National Science & Olympiad Championship 2026",
    description: session?.description || "Compete against students nationwide in real-time.",
    quizId: "q-101",
    quizTitle: session?.quizTitle || "Advanced Science & Physics Olympiad",
    code: session?.code || codeParam,
    hostId: "usr-1",
    hostName: session?.hostName || "TN & Kerala Science Olympiad Council",
    status: (session?.status === "WAITING" ? "Lobby" : session?.status === "ACTIVE" ? "Live" : "Ended") as any,
    startDate: "Today",
    startTime: "Live Now",
    durationMinutes: session?.settings?.durationMinutes || 45,
    maxParticipants: session?.settings?.maxParticipants || 1000,
    currentParticipantsCount: participants.length,
    isPublic: true,
    negativeMarking: session?.settings?.negativeMarking ?? true,
    timeBonus: session?.settings?.timeBonus ?? true,
    participants,
    announcements,
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Header & Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(240, 160, 180,0.14)] pb-4">
        <Link
          href="/dashboard/competitions"
          className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#FF4D6D] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> EXIT ARENA
        </Link>

        {/* Role view toggle for testing & multi-context verification */}
        <div className="flex items-center space-x-1.5 bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-1 rounded-[4px]">
          <button
            type="button"
            onClick={() => setUserRole("host")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center ${
              userRole === "host"
                ? "bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] shadow-[0_0_8px_rgba(255, 77, 109,0.1)]"
                : "text-[#A0AEA5] hover:text-[#F2F7F3]"
            }`}
          >
            <Monitor className="w-3.5 h-3.5 mr-1.5" /> Host Control Desk
          </button>
          <button
            type="button"
            onClick={() => setUserRole("participant")}
            className={`px-3 py-1.5 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center ${
              userRole === "participant"
                ? "bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] shadow-[0_0_8px_rgba(255, 77, 109,0.1)]"
                : "text-[#A0AEA5] hover:text-[#F2F7F3]"
            }`}
          >
            <User className="w-3.5 h-3.5 mr-1.5" /> Participant View
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
          onNextQuestion={nextQuestionOrPodium}
          onNextQuestionDirect={nextQuestionDirect}
          onRevealLeaderboard={revealLeaderboard}
          connectedSystemsCount={connectedSystemsCount}
          submissionsCount={submissionsCount}
          totalParticipants={participants.length}
        />
      )}

      {/* STAGE 1: LOBBY */}
      {stage === "lobby" && (
        <CompetitionLobby
          competition={competitionItem}
          participants={participants}
          announcements={announcements}
          isHost={userRole === "host"}
          currentParticipantName={currentParticipant?.name || profile?.name}
          onStartCompetition={startCompetition}
          onPostAnnouncement={postAnnouncement}
          onKickParticipant={kickParticipant}
        />
      )}

      {/* STAGE 2: LIVE QUESTION SESSION */}
      {stage === "question" && currentQuestion && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <LiveQuestionSession
              question={currentQuestion}
              questionNumber={currentQIndex + 1}
              totalQuestions={totalQuestions || 5}
              timeRemaining={questionTimeRemaining}
              userAnswerSubmitted={userAnswerSubmitted}
              selectedOptionId={selectedOptionId}
              isHost={userRole === "host"}
              submissionsCount={submissionsCount}
              totalParticipants={participants.length}
              connectedSystemsCount={connectedSystemsCount}
              submissionDistribution={submissionDistribution}
              onOptionSubmit={submitAnswer}
            />
          </div>
          <div className="lg:col-span-4 space-y-4">
            <LiveAnalyticsCard
              participantCount={connectedSystemsCount}
              accuracyPercentage={submissionsCount > 0 ? 85 : 0}
              averageResponseTimeSec={
                currentQuestion?.timeLimitSeconds
                  ? Math.max(1, currentQuestion.timeLimitSeconds - questionTimeRemaining)
                  : 12
              }
            />
          </div>
        </div>
      )}

      {/* STAGE 3: ANIMATED LEADERBOARD */}
      {stage === "leaderboard" && (
        <AnimatedLeaderboard
          participants={participants}
          onNextQuestion={nextQuestionOrPodium}
          isHost={userRole === "host"}
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

export default function LiveCompetitionEnginePage() {
  return (
    <Suspense fallback={<div className="font-mono text-xs text-muted-foreground p-8">Loading Arena...</div>}>
      <LiveArenaContent />
    </Suspense>
  );
}
