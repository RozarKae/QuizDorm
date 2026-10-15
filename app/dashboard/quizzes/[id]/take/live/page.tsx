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

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  const handleConfirmSubmit = () => {
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
      <div className="fixed inset-0 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <p className="text-sm text-gray-500">Loading quiz attempt session...</p>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-background text-foreground flex flex-col justify-between overflow-hidden">
      {/* Header Bar */}
      <header className="bg-card border-b border-border px-6 py-3 flex items-center justify-between shadow-xs">
        <div>
          <h2 className="text-sm font-bold font-display text-foreground truncate max-w-xs sm:max-w-md">
            {targetQuiz.title}
          </h2>
          <p className="text-[11px] font-mono text-muted-foreground mt-0.5">
            {targetQuiz.topic ? `Topic: ${targetQuiz.topic} / ` : ""}Verified Assessment Session
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <QuizTimer timeRemainingSeconds={timeRemainingSeconds} />
          <Button
            onClick={() => setSubmitModalOpen(true)}
            className="bg-cobalt hover:bg-cobalt/90 text-white text-xs font-mono font-semibold rounded-[3px] h-8 shadow-xs"
          >
            <Send className="w-3.5 h-3.5 mr-1.5" /> Submit Assessment
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-border">
        <div
          className="h-full bg-cobalt transition-all duration-300"
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
            onSelectQuestion={setCurrentIdx}
          />
        </div>
      </main>

      {/* Navigation Footer */}
      <footer className="bg-card border-t border-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMarkForReview(currentQuestion.id)}
            className={`text-xs font-mono rounded-[3px] h-8 ${
              markedForReview.includes(currentQuestion.id)
                ? "bg-coral/10 text-coral border-coral font-bold"
                : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 mr-1" />
            {markedForReview.includes(currentQuestion.id) ? "Marked for Review" : "Mark for Review"}
          </Button>

          {answers[currentQuestion.id] !== undefined && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => clearAnswer(currentQuestion.id)}
              className="text-xs font-mono text-muted-foreground hover:text-coral h-8 rounded-[2px]"
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
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="text-xs font-mono border-border rounded-[3px] h-8"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {currentIdx < questions.length - 1 ? (
            <Button
              size="sm"
              onClick={() => setCurrentIdx(currentIdx + 1)}
              className="bg-foreground text-background hover:bg-foreground/90 text-xs font-mono font-semibold rounded-[3px] h-8"
            >
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={() => setSubmitModalOpen(true)}
              className="bg-cobalt hover:bg-cobalt/90 text-white text-xs font-mono font-semibold rounded-[3px] h-8 shadow-xs"
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
