"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QuestionItem } from "@/lib/types/question";
import { QuestionRenderer } from "@/components/quiz-engine/QuestionRenderer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CheckCircle2, XCircle, ChevronLeft, ChevronRight } from "lucide-react";

const mockReviewQuestions: (QuestionItem & { userAnswer: any; isCorrect: boolean })[] = [
  {
    id: "q-1",
    title: "What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?",
    type: "mcq_single",
    subject: "Mathematics",
    category: "Algebra",
    topic: "Calculus",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 60,
    options: [
      { id: "opt-1", text: "3x^2 + 8x - 5", isCorrect: true },
      { id: "opt-2", text: "3x^2 + 4x - 5", isCorrect: false },
      { id: "opt-3", text: "x^2 + 8x - 5", isCorrect: false },
    ],
    userAnswer: "opt-1",
    isCorrect: true,
    explanation: "Differentiating term by term: d/dx(x^3) = 3x^2, d/dx(4x^2) = 8x, d/dx(-5x) = -5, and d/dx(7) = 0.",
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
    timeLimitSeconds: 90,
    options: [
      { id: "o1", text: "Toluene", isCorrect: true },
      { id: "o2", text: "Phenol", isCorrect: true },
      { id: "o3", text: "Methane", isCorrect: false },
    ],
    userAnswer: ["o1", "o2"],
    isCorrect: true,
    explanation: "Both toluene (methylbenzene) and phenol (hydroxybenzene) contain aromatic benzene rings.",
    tags: ["chemistry"],
    createdAt: "Jul 2026",
    updatedAt: "Jul 2026",
  },
  {
    id: "q-3",
    title: "Light travels faster in water than in vacuum.",
    type: "true_false",
    subject: "Science",
    category: "Physics",
    topic: "Optics",
    difficulty: "Easy",
    marks: 2,
    timeLimitSeconds: 30,
    options: [],
    userAnswer: "true",
    isCorrect: false,
    explanation: "False. Light reaches its maximum speed (c = 3x10^8 m/s) in vacuum and slows down in optical media.",
    tags: ["physics"],
    createdAt: "Jul 2026",
    updatedAt: "Jul 2026",
  },
];

export default function AnswerReviewPage({
  params,
}: {
  params: Promise<{ id: string; attemptId: string }> | { id: string; attemptId: string };
}) {
  const unwrappedParams =
    typeof (params as any)?.then === "function"
      ? React.use(params as Promise<{ id: string; attemptId: string }>)
      : (params as { id: string; attemptId: string });
  const { id, attemptId } = unwrappedParams;

  const [currentIdx, setCurrentIdx] = useState(0);

  const currentQ = mockReviewQuestions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div>
        <Link
          href={`/dashboard/quizzes/${id}/result/${attemptId}`}
          className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-[#A0AEA5] hover:text-[#65F59A] mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quiz Result
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold font-display text-[#F2F7F3]">Question-by-Question Answer Review</h1>
            <p className="text-xs font-mono text-[#A0AEA5]">Attempt ID: <span className="text-[#38D9B0]">{attemptId}</span></p>
          </div>
          <div className="flex items-center space-x-1.5 overflow-x-auto max-w-[240px] p-1 bg-[#0C1210] rounded-[4px] border border-[rgba(160,190,170,0.14)]">
            {mockReviewQuestions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={`w-7 h-7 rounded-[3px] text-xs font-mono font-bold transition-all flex items-center justify-center border ${
                  currentIdx === i
                    ? "ring-1 ring-[#F2F7F3] border-[#F2F7F3] font-extrabold"
                    : "border-transparent"
                } ${
                  q.isCorrect
                    ? "bg-[rgba(101,245,154,0.15)] text-[#65F59A] border-[rgba(101,245,154,0.3)]"
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
            ? "bg-[rgba(101,245,154,0.08)] text-[#65F59A] border-[rgba(101,245,154,0.25)]"
            : "bg-[rgba(248,113,113,0.08)] text-[#F87171] border-[rgba(248,113,113,0.25)]"
        }`}
      >
        <div className="flex items-center space-x-2">
          {currentQ.isCorrect ? (
            <CheckCircle2 className="w-5 h-5 text-[#65F59A]" />
          ) : (
            <XCircle className="w-5 h-5 text-[#F87171]" />
          )}
          <span>
            {currentQ.isCorrect
              ? `Correct Answer! Marks Awarded: +${currentQ.marks}`
              : "Incorrect Answer. Marks Awarded: 0"}
          </span>
        </div>
        <span className="font-mono uppercase font-bold text-[#A0AEA5]">
          Question {currentIdx + 1} of {mockReviewQuestions.length}
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
          className="text-xs font-mono border-[rgba(160,190,170,0.18)] rounded-[4px] h-9 text-[#A0AEA5] hover:text-[#F2F7F3] disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous Question
        </Button>

        <Button
          disabled={currentIdx === mockReviewQuestions.length - 1}
          onClick={() => setCurrentIdx(currentIdx + 1)}
          className="bg-[#17251E] hover:bg-[#20342a] text-[#F2F7F3] border border-[rgba(160,190,170,0.2)] text-xs font-mono font-semibold rounded-[4px] h-9 disabled:opacity-30"
        >
          Next Question <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
