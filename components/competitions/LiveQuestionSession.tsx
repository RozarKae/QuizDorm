"use client";

import React from "react";
import { QuestionItem } from "@/lib/types/question";
import { QuestionRenderer } from "@/components/quiz-engine/QuestionRenderer";
import { Button } from "@/components/ui/button";
import { Clock, Users, Zap, CheckCircle2 } from "lucide-react";

interface LiveQuestionSessionProps {
  question: QuestionItem;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  userAnswerSubmitted: boolean;
  onOptionSubmit: (optionId: string) => void;
}

export function LiveQuestionSession({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  userAnswerSubmitted,
  onOptionSubmit,
}: LiveQuestionSessionProps) {
  return (
    <div className="space-y-6">
      {/* Session Header Bar */}
      <div className="flex items-center justify-between bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center">
            {questionNumber}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Question {questionNumber} of {totalQuestions}
          </span>
        </div>

        {/* Live Timer Meter */}
        <div className="flex items-center space-x-2 px-4 py-2 rounded-full bg-amber-500 text-white font-mono font-extrabold text-sm shadow-md animate-pulse">
          <Clock className="w-4 h-4" />
          <span>{timeRemaining}s</span>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-relaxed">
          {question.title}
        </h2>

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {question.options.map((opt, idx) => (
            <button
              key={opt.id}
              disabled={userAnswerSubmitted}
              onClick={() => onOptionSubmit(opt.id)}
              className={`p-5 rounded-2xl border font-bold text-sm transition-all text-left flex items-center justify-between ${
                userAnswerSubmitted
                  ? "opacity-60 bg-gray-100 cursor-not-allowed"
                  : "border-gray-200 dark:border-gray-800 hover:border-indigo-600 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 text-gray-800 dark:text-gray-200"
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{opt.text}</span>
              </div>
              <Zap className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100" />
            </button>
          ))}
        </div>

        {userAnswerSubmitted && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-200 text-xs font-bold flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Answer locked! Waiting for timer to complete...</span>
          </div>
        )}
      </div>
    </div>
  );
}
