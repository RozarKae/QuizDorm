"use client";

import React, { useState } from "react";
import Link from "next/link";
import { QuestionItem } from "@/lib/types/question";
import { QuestionRenderer } from "@/components/quiz-engine/QuestionRenderer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CheckCircle2, XCircle, HelpCircle, ChevronLeft, ChevronRight, BookOpen } from "lucide-react";

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

export default function AnswerReviewPage({ params }: { params: { id: string; attemptId: string } }) {
  const [currentIdx, setCurrentIdx] = useState(0);

  const currentQ = mockReviewQuestions[currentIdx];

  return (
    <div className="max-w-4xl mx-auto space-y-6 py-4">
      <div>
        <Link href={`/dashboard/quizzes/${params.id}/result/${params.attemptId}`} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-3">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quiz Result
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Question-by-Question Answer Review</h1>
            <p className="text-xs text-gray-500">Attempt ID: {params.attemptId}</p>
          </div>
          <div className="flex items-center space-x-1 overflow-x-auto max-w-[200px] p-1">
            {mockReviewQuestions.map((q, i) => (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(i)}
                className={`w-7 h-7 rounded-lg text-xs font-bold transition-all ${
                  currentIdx === i
                    ? "ring-2 ring-indigo-600 font-extrabold"
                    : q.isCorrect
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
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
        className={`p-4 rounded-2xl border flex items-center justify-between text-xs font-semibold ${
          currentQ.isCorrect
            ? "bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300"
            : "bg-red-50 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300"
        }`}
      >
        <div className="flex items-center space-x-2">
          {currentQ.isCorrect ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
          <span>{currentQ.isCorrect ? "Correct Answer! Marks Awarded: +" + currentQ.marks : "Incorrect Answer. Marks Awarded: 0"}</span>
        </div>
        <span className="font-mono uppercase font-bold">Question {currentIdx + 1} of {mockReviewQuestions.length}</span>
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
          className="text-xs"
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Previous Question
        </Button>

        <Button
          disabled={currentIdx === mockReviewQuestions.length - 1}
          onClick={() => setCurrentIdx(currentIdx + 1)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
        >
          Next Question <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
