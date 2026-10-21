"use client";

import React from "react";
import { QuestionItem } from "@/lib/types/question";
import { PublicSessionQuestion } from "@/lib/live/types";
import { Clock, Zap, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LiveQuestionSessionProps {
  question: QuestionItem | PublicSessionQuestion;
  questionNumber: number;
  totalQuestions: number;
  timeRemaining: number;
  userAnswerSubmitted: boolean;
  selectedOptionId?: string | null;
  isHost?: boolean;
  submissionsCount?: number;
  totalParticipants?: number;
  onOptionSubmit: (optionId: string) => void;
}

export function LiveQuestionSession({
  question,
  questionNumber,
  totalQuestions,
  timeRemaining,
  userAnswerSubmitted,
  selectedOptionId,
  isHost = false,
  submissionsCount = 0,
  totalParticipants = 0,
  onOptionSubmit,
}: LiveQuestionSessionProps) {
  const isUrgent = timeRemaining <= 5 && timeRemaining > 0;

  return (
    <div className="space-y-6">
      {/* Session Header Bar */}
      <div className="flex items-center justify-between bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 rounded-[4px] bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.3)] font-mono font-bold text-xs flex items-center justify-center shadow-xs">
            {questionNumber}
          </span>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#69786F] block">
              QUESTION {questionNumber} OF {totalQuestions}
            </span>
            <span className="text-xs font-semibold text-[#F2F7F3]">
              {question.subject || question.category || "Live Competition"}
            </span>
          </div>
        </div>

        {/* Live Timer Meter */}
        <div className="flex items-center space-x-3">
          {isHost && (
            <Badge className="bg-[#111B17] text-[#A0AEA5] border border-[rgba(160,190,170,0.14)] font-mono text-xs hidden sm:inline-flex">
              Submissions: {submissionsCount} / {totalParticipants}
            </Badge>
          )}

          <div
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-[4px] font-mono font-extrabold text-sm shadow-xs transition-colors ${
              isUrgent
                ? "bg-[rgba(248,113,113,0.15)] text-[#F87171] border border-[#F87171] animate-pulse"
                : "bg-[#111B17] text-[#65F59A] border border-[rgba(101,245,154,0.3)] shadow-[0_0_12px_rgba(101,245,154,0.15)]"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}s</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-[#0C1210] p-6 sm:p-8 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-[#F2F7F3] leading-relaxed">
          {question.title}
        </h2>

        {isHost && (
          <div className="p-3 bg-[#111B17] border border-[rgba(160,190,170,0.14)] rounded-[4px] text-xs font-mono text-[#A0AEA5] flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-[#65F59A] animate-pulse" />
            <span>
              HOST MONITOR // Live response tracker: <strong className="text-[#65F59A]">{submissionsCount}</strong> of{" "}
              <strong className="text-[#F2F7F3]">{totalParticipants}</strong> contenders have locked answers.
            </span>
          </div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {(question.options || []).map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={userAnswerSubmitted || isHost || timeRemaining <= 0}
                onClick={() => onOptionSubmit(opt.id)}
                className={`p-4 rounded-[4px] border font-bold text-sm transition-all text-left flex items-center justify-between ${
                  isSelected
                    ? "border-[#65F59A] bg-[#17251E] text-[#F2F7F3] ring-1 ring-[#65F59A] shadow-[0_0_16px_rgba(101,245,154,0.18)]"
                    : userAnswerSubmitted || isHost || timeRemaining <= 0
                    ? "opacity-50 bg-[#111B17]/40 border-[rgba(160,190,170,0.1)] cursor-not-allowed text-[#69786F]"
                    : "border-[rgba(160,190,170,0.14)] bg-[#111B17]/60 hover:border-[#65F59A]/40 hover:bg-[#111B17] text-[#F2F7F3] cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-6 h-6 rounded-[2px] font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? "bg-[#65F59A] text-[#070B0A] border-[#65F59A]"
                        : "bg-[#17251E] text-[#A0AEA5] border-[rgba(160,190,170,0.2)]"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </div>
                <Zap
                  className={`w-4 h-4 text-[#65F59A] transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {userAnswerSubmitted && !isHost && (
          <div className="p-3.5 rounded-[4px] bg-[rgba(101,245,154,0.1)] border border-[rgba(101,245,154,0.3)] text-[#65F59A] text-xs font-mono font-bold flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#65F59A]" />
            <span>Answer locked on server! Waiting for countdown or host advance...</span>
          </div>
        )}
      </div>
    </div>
  );
}
