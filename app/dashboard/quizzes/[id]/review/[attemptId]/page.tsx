"use client";

import { QuestionRenderer } from "@/components/quiz-engine/QuestionRenderer";
import { Button } from "@/components/ui/button";
import { QuestionItem } from "@/lib/types/question";
import { AlertTriangle,ArrowLeft,CheckCircle2,ChevronLeft,ChevronRight,XCircle } from "lucide-react";
import Link from "next/link";
import React,{ useEffect,useState } from "react";

type ReviewQuestionItem = QuestionItem & {
  userAnswer: unknown;
  isCorrect: boolean;
  scoreAwarded?: number;
};

export default function AnswerReviewPage({
  params,
}: {
  params: Promise<{ id: string; attemptId: string }> | { id: string; attemptId: string };
}) {
  const unwrappedParams =
    typeof (params as PromiseLike<unknown>)?.then === "function"
      ? React.use(params as Promise<{ id: string; attemptId: string }>)
      : (params as { id: string; attemptId: string });
  const { id, attemptId } = unwrappedParams;

  const [questions, setQuestions] = useState<ReviewQuestionItem[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadReview() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/quizzes/attempts/${attemptId}/review`);
        if (!res.ok) {
          const errJson = await res.json().catch(() => null);
          throw new Error(errJson?.error || "Assessment attempt review data could not be found.");
        }
        const data = await res.json();
        if (isMounted) {
          setQuestions(data.data.questions || []);
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load attempt review.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadReview();
    return () => {
      isMounted = false;
    };
  }, [attemptId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4 font-mono">
        <div className="inline-block w-6 h-6 border-2 border-[#FF4D6D] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#A0AEA5]">Loading question breakdown from database...</p>
      </div>
    );
  }

  if (error || questions.length === 0) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 text-center space-y-4 bg-[#140C0E] border border-[rgba(240, 160, 180,0.18)] rounded-[8px]">
        <AlertTriangle className="w-8 h-8 text-[#FF4D6D] mx-auto" />
        <h2 className="text-lg font-bold font-display text-[#F2F7F3]">Review Data Unavailable</h2>
        <p className="text-xs font-mono text-[#A0AEA5] leading-relaxed">
          {error || "No reviewable question records found for this attempt."}
        </p>
        <div className="pt-2">
          <Link href={`/dashboard/quizzes/${id}/result/${attemptId}`}>
            <Button variant="outline" className="font-mono text-xs border-[rgba(240, 160, 180,0.2)] text-[#F2F7F3]">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Result
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div>
        <Link
          href={`/dashboard/quizzes/${id}/result/${attemptId}`}
          className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[#A0AEA5] hover:text-[#FF4D6D] mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quiz Result
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold font-display text-[#F2F7F3]">Question-by-Question Answer Review</h1>
            <p className="text-xs font-mono text-[#A0AEA5]">Attempt ID: <span className="text-[#FF758F]">{attemptId}</span></p>
          </div>
          <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[240px] p-1 bg-[#140C0E] rounded-[4px] border border-[rgba(240, 160, 180,0.14)]">
            {questions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={`w-7 h-7 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center justify-center border cursor-pointer ${
                  currentIdx === i
                    ? "ring-1 ring-[#F2F7F3] border-[#F2F7F3] font-extrabold"
                    : "border-transparent"
                } ${
                  q.isCorrect
                    ? "bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border-[rgba(255, 77, 109,0.3)]"
                    : "bg-[rgba(248,113,113,0.15)] text-[#F87171] border-[rgba(248,113,113,0.3)]"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Review Status Banner */}
      <div
        className={`p-4 rounded-[6px] border flex items-center justify-between text-xs font-mono font-semibold ${
          currentQ.isCorrect
            ? "bg-[rgba(255, 77, 109,0.08)] text-[#FF4D6D] border-[rgba(255, 77, 109,0.25)]"
            : "bg-[rgba(248,113,113,0.08)] text-[#F87171] border-[rgba(248,113,113,0.25)]"
        }`}
      >
        <div className="flex items-center space-x-2">
          {currentQ.isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-[#FF4D6D]" />
          ) : (
            <XCircle className="w-5 h-5 text-[#F87171]" />
          )}
          <span>
            {currentQ.isCorrect
              ? `Correct Answer! Marks Awarded: +${currentQ.marks}`
              : `Incorrect Answer. Marks Awarded: ${currentQ.scoreAwarded ?? 0}`}
          </span>
        </div>
        <span className="font-mono uppercase font-bold text-[#A0AEA5]">
          Question {currentIdx + 1} of {questions.length}
        </span>
      </div>

      {/* Question Renderer */}
      <QuestionRenderer
        question={currentQ}
        userAnswer={currentQ.userAnswer}
        onAnswerChange={() => {}} // read-only
        showExplanation={true}
      />

      {/* Bottom Nav */}
      <div className="flex items-center justify-between pt-2">
        <Button
          variant="outline"
          disabled={currentIdx === 0}
          onClick={() => setCurrentIdx(currentIdx - 1)}
          className="text-xs font-mono border-[rgba(240, 160, 180,0.18)] rounded-[4px] h-9 text-[#A0AEA5] hover:text-[#F2F7F3] disabled:opacity-30 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous Question
        </Button>

        <Button
          disabled={currentIdx === questions.length - 1}
          onClick={() => setCurrentIdx(currentIdx + 1)}
          className="bg-[#2A141A] hover:bg-[#34151C] text-[#F2F7F3] border border-[rgba(240, 160, 180,0.2)] text-xs font-mono font-semibold rounded-[4px] h-9 disabled:opacity-30 cursor-pointer"
        >
          Next Question <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
