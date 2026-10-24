"use client";

import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { QuizItem } from "@/lib/types/quiz";
import { useQuizAttempt } from "@/lib/hooks/useQuizAttempt";
import { getQuizById, ALL_DEFAULT_QUIZZES } from "@/lib/data/quizzes";
import { QuizTimer } from "@/components/quiz-engine/QuizTimer";
import { QuestionPalette } from "@/components/quiz-engine/QuestionPalette";
import { QuestionRenderer } from "@/components/quiz-engine/QuestionRenderer";
import { SubmissionModal } from "@/components/quiz-engine/SubmissionModal";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Bookmark, RotateCcw, Send } from "lucide-react";
import { toast } from "sonner";
import { useSound } from "@/components/audio/useSound";
import { AudioToggle } from "@/components/audio/AudioToggle";

export default function DistractionFreeQuizEnginePage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const router = useRouter();
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  const unwrappedParams =
    typeof (params as any)?.then === "function"
      ? React.use(params as Promise<{ id: string }>)
      : (params as { id: string });
  const quizId = unwrappedParams.id;

  // Retrieve active quiz from repository or fallback
  const targetQuiz = useMemo(() => {
    return getQuizById(quizId) || ALL_DEFAULT_QUIZZES[0];
  }, [quizId]);

  // Stable attempt session ID
  const [attemptId] = useState(() => `att-${Date.now()}`);

  const {
    currentIdx,
    setCurrentIdx,
    answers,
    saveAnswer,
    clearAnswer,
    markedForReview,
    toggleMarkForReview,
    timeRemainingSeconds,
    status,
    submitQuiz,
    questions,
    currentQuestion,
  } = useQuizAttempt(targetQuiz, attemptId);

  const { playTap, playTick, playCorrect } = useSound();

  // Heartbeat urgency tick on last 5 seconds of countdown
  React.useEffect(() => {
    if (timeRemainingSeconds <= 5 && timeRemainingSeconds > 0) {
      playTick();
    }
  }, [timeRemainingSeconds, playTick]);

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  const handleConfirmSubmit = () => {
    playCorrect();
    const attempt = submitQuiz("manual");
    toast.success("Quiz submitted successfully!");
    router.push(`/dashboard/quizzes/${quizId}/result/${attempt.id}`);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentQuestion) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0B0708] text-[#F2F7F3] font-mono">
        <div className="flex items-center space-x-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] animate-pulse" />
          <p className="text-xs text-[#A0AEA5]">Initializing secure assessment session...</p>
        </div>
      </div>
    );
  }

  const isUrgent = timeRemainingSeconds <= 10 && timeRemainingSeconds > 0;

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0B0708] text-[#F2F7F3] flex flex-col justify-between overflow-hidden transition-all duration-300 ${
        isUrgent ? "animate-edge-urgency" : ""
      }`}
    >
      {/* Header Bar */}
      <header className="bg-[#140C0E] border-b border-[rgba(240, 160, 180,0.14)] px-6 py-3 flex items-center justify-between shadow-xs relative z-20">
        <div>
          <h2 className="text-sm font-bold font-display text-[#F2F7F3] truncate max-w-xs sm:max-w-md">
            {targetQuiz.title}
          </h2>
          <p className="text-[11px] font-mono text-[#A0AEA5] mt-0.5">
            {targetQuiz.topic ? `Topic: ${targetQuiz.topic} / ` : ""}Verified Assessment Session
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <QuizTimer timeRemainingSeconds={timeRemainingSeconds} />
          <AudioToggle />
          <Button
            onClick={() => {
              playTap();
              setSubmitModalOpen(true);
            }}
            className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] text-xs font-mono font-bold rounded-[3px] h-8 shadow-[0_0_12px_rgba(255, 77, 109,0.18)]"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" /> Submit Assessment
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-[#1D1013]">
        <div
          className="h-full bg-gradient-to-r from-[#FF758F] to-[#FF4D6D] transition-all duration-300 shadow-[0_0_8px_rgba(255, 77, 109,0.3)]"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Content Body */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 cols: Question Renderer */}
        <div className="lg:col-span-8">
          <QuestionRenderer
            question={currentQuestion}
            userAnswer={answers[currentQuestion.id]}
            onAnswerChange={(val) => saveAnswer(currentQuestion.id, val)}
          />
        </div>

        {/* Right 4 cols: Question Palette */}
        <div className="lg:col-span-4 space-y-4">
          <QuestionPalette
            questions={questions}
            currentIndex={currentIdx}
            answers={answers}
            markedForReview={markedForReview}
            onSelectQuestion={(idx) => {
              playTap();
              setCurrentIdx(idx);
            }}
          />
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="bg-[#140C0E] border-t border-[rgba(240, 160, 180,0.14)] px-6 py-3 flex items-center justify-between relative z-20">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              playTap();
              toggleMarkForReview(currentQuestion.id);
            }}
            className={`text-xs font-mono rounded-[3px] h-8 ${
              markedForReview.includes(currentQuestion.id)
                ? "bg-[rgba(248,113,113,0.15)] text-[#F87171] border-[#F87171] font-bold"
                : "border-[rgba(240, 160, 180,0.18)] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#FF4D6D]/30"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 mr-1" />
            {markedForReview.includes(currentQuestion.id) ? "Marked for Review" : "Mark for Review"}
          </Button>

          {answers[currentQuestion.id] !== undefined && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                playTap();
                clearAnswer(currentQuestion.id);
              }}
              className="text-xs font-mono text-[#A0AEA5] hover:text-[#F87171] h-8 rounded-[2px]"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Answer
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIdx === 0}
            onClick={() => {
              playTap();
              setCurrentIdx(currentIdx - 1);
            }}
            className="text-xs font-mono border-[rgba(240, 160, 180,0.18)] rounded-[3px] h-8 text-[#A0AEA5] hover:text-[#F2F7F3] disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {currentIdx < questions.length - 1 ? (
            <Button
              size="sm"
              onClick={() => {
                playTap();
                setCurrentIdx(currentIdx + 1);
              }}
              className="bg-[#2A141A] hover:bg-[#34151C] text-[#F2F7F3] border border-[rgba(240, 160, 180,0.2)] text-xs font-mono font-semibold rounded-[3px] h-8"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => {
                playTap();
                setSubmitModalOpen(true);
              }}
              className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] text-xs font-mono font-bold rounded-[3px] h-8 shadow-[0_0_12px_rgba(255, 77, 109,0.18)]"
            >
              Finish &amp; Submit
            </Button>
          )}
        </div>
      </footer>

      {/* Submission Modal */}
      <SubmissionModal
        open={submitModalOpen}
        onOpenChange={setSubmitModalOpen}
        totalQuestions={questions.length}
        answeredCount={answeredCount}
        unansweredCount={unansweredCount}
        markedCount={markedForReview.length}
        timeRemaining={formatTime(timeRemainingSeconds)}
        onConfirmSubmit={handleConfirmSubmit}
      />
    </div>
  );
}
