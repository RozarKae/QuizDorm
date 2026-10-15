"use client";

import React from "react";
import { QuestionItem } from "@/lib/types/question";
import { PublicSessionQuestion } from "@/lib/live/types";
import { Clock, Zap, CheckCircle2, ShieldAlert } from "lucide-react";
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
      <div className="flex items-center justify-between bg-card p-4 rounded-[4px] border border-border shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 rounded-[2px] bg-[#2855F5] text-white font-mono font-bold text-xs flex items-center justify-center">
            {questionNumber}
          </span>
          <div>
            <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground block">
              QUESTION {questionNumber} OF {totalQuestions}
            </span>
            <span className="text-xs font-semibold text-foreground">
              {question.subject || question.category || "General Competition"}
            </span>
          </div>
        </div>

        {/* Live Timer Meter */}
        <div className="flex items-center space-x-3">
          {isHost && (
            <Badge className="bg-muted text-muted-foreground font-mono text-xs hidden sm:inline-flex">
              Submissions: {submissionsCount} / {totalParticipants}
            </Badge>
          )}

          <div
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-[3px] font-mono font-extrabold text-sm shadow-xs transition-colors ${
              isUrgent
                ? "bg-[#E85D3F] text-white animate-pulse"
                : "bg-[#111318] text-[#DFFF43] border border-white/20"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}s</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-card p-6 sm:p-8 rounded-[4px] border border-border shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-foreground leading-relaxed">
          {question.title}
        </h2>

        {isHost && (
          <div className="p-3 bg-muted/60 border border-border rounded-[3px] text-xs font-mono text-muted-foreground flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>
              HOST MONITOR // Real-time response tracker: <strong>{submissionsCount}</strong> of{" "}
              <strong>{totalParticipants}</strong> contenders have locked answers.
            </span>
          </div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {(question.options || []).map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={userAnswerSubmitted || isHost}
                onClick={() => onOptionSubmit(opt.id)}
                className={`p-5 rounded-[4px] border font-bold text-sm transition-all text-left flex items-center justify-between ${
                  isSelected
                    ? "border-[#2855F5] bg-[#2855F5]/10 text-[#2855F5] dark:text-blue-400 ring-2 ring-[#2855F5]"
                    : userAnswerSubmitted || isHost
                    ? "opacity-60 bg-muted/50 border-border cursor-not-allowed text-muted-foreground"
                    : "border-border bg-background hover:border-[#2855F5] hover:bg-muted/40 text-foreground cursor-pointer shadow-2xs"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-7 h-7 rounded-[2px] font-mono font-bold text-xs flex items-center justify-center shrink-0 ${
                      isSelected
                        ? "bg-[#2855F5] text-white"
                        : "bg-muted text-foreground border border-border"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="leading-snug">{opt.text}</span>
                </div>
                <Zap
                  className={`w-4 h-4 text-amber-500 transition-opacity ${
                    isSelected ? "opacity-100" : "opacity-0"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {userAnswerSubmitted && !isHost && (
          <div className="p-4 rounded-[3px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 text-xs font-mono font-bold flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Answer locked on server! Waiting for countdown or host advance...</span>
          </div>
        )}
      </div>
    </div>
  );
}
