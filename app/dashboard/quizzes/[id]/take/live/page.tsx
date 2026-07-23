"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizItem } from "@/lib/types/quiz";
import { useQuizAttempt } from "@/lib/hooks/useQuizAttempt";
import { QuizTimer } from "@/components/quiz-engine/QuizTimer";
import { QuestionPalette } from "@/components/quiz-engine/QuestionPalette";
import { QuestionRenderer } from "@/components/quiz-engine/QuestionRenderer";
import { SubmissionModal } from "@/components/quiz-engine/SubmissionModal";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Bookmark, RotateCcw, Send, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const mockActiveQuiz: QuizItem = {
  id: "q-101",
  title: "Advanced Algebra & Calculus Challenge",
  category: "Mathematics",
  subject: "Algebra",
  difficulty: "Hard",
  durationMinutes: 45,
  totalMarks: 100,
  passMarks: 60,
  status: "Published",
  randomizeQuestions: false,
  shuffleOptions: false,
  createdAt: "Jul 2026",
  updatedAt: "Jul 2026",
  questions: [
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
      tags: ["physics"],
      createdAt: "Jul 2026",
      updatedAt: "Jul 2026",
    },
  ],
};

export default function DistractionFreeQuizEnginePage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

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
    currentQuestion,
  } = useQuizAttempt(mockActiveQuiz, `att-${Date.now()}`);

  const questions = mockActiveQuiz.questions;
  const answeredCount = Object.keys(answers).length;
  const unansweredCount = questions.length - answeredCount;

  const handleConfirmSubmit = () => {
    const attempt = submitQuiz("manual");
    toast.success("Quiz submitted successfully!");
    router.push(`/dashboard/quizzes/${params.id}/result/${attempt.id}`);
  };

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentQuestion) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-50 dark:bg-gray-950 flex flex-col justify-between overflow-hidden">
      {/* Header Bar */}
      <header className="bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-850 px-6 py-3.5 flex items-center justify-between shadow-sm">
        <div>
          <h2 className="text-base font-bold text-gray-900 dark:text-white truncate max-w-xs sm:max-w-md">
            {mockActiveQuiz.title}
          </h2>
          <p className="text-xs text-gray-400">Distraction-Free Exam Engine</p>
        </div>

        <div className="flex items-center space-x-4">
          <QuizTimer timeRemainingSeconds={timeRemainingSeconds} />
          <Button onClick={() => setSubmitModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl">
            <Send className="w-3.5 h-3.5 mr-1.5" /> Submit Quiz
          </Button>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-gray-200 dark:bg-gray-900">
        <div
          className="h-full bg-indigo-600 transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Content Body */}
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
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
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-850 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => toggleMarkForReview(currentQuestion.id)}
            className={`text-xs ${
              markedForReview.includes(currentQuestion.id)
                ? "bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 font-bold"
                : ""
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 mr-1" />
            {markedForReview.includes(currentQuestion.id) ? "Marked for Review" : "Mark for Review"}
          </Button>

          {answers[currentQuestion.id] !== undefined && (
            <Button variant="ghost" size="sm" onClick={() => clearAnswer(currentQuestion.id)} className="text-xs text-gray-500 hover:text-red-600">
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Clear Answer
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="text-xs"
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>

          {currentIdx < questions.length - 1 ? (
            <Button size="sm" onClick={() => setCurrentIdx(currentIdx + 1)} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl">
              Next <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button size="sm" onClick={() => setSubmitModalOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl">
              Finish & Submit
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
