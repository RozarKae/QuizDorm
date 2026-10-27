"use client";

import { Badge } from "@/components/ui/badge";
import { PublicSessionQuestion } from "@/lib/live/types";
import { QuestionItem } from "@/lib/types/question";
import { CheckCircle2,Clock,Zap } from "lucide-react";

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
  connectedSystemsCount?: number;
  submissionDistribution?: Record<string, number>;
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
  connectedSystemsCount = 1,
  submissionDistribution = {},
  onOptionSubmit,
}: LiveQuestionSessionProps) {
  const isUrgent = timeRemaining <= 5 && timeRemaining > 0;

  return (
    <div className="space-y-6">
      {/* Session Header Bar */}
      <div className="flex items-center justify-between bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs">
        <div className="flex items-center space-x-3">
          <span className="w-8 h-8 rounded-[4px] bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] font-mono font-bold text-xs flex items-center justify-center shadow-xs">
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
            <Badge className="bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.14)] font-mono text-xs hidden sm:inline-flex">
              Responses: {submissionsCount} / {Math.max(totalParticipants, connectedSystemsCount, 1)} ({connectedSystemsCount} Systems)
            </Badge>
          )}

          <div
            className={`flex items-center space-x-2 px-4 py-1.5 rounded-[4px] font-mono font-extrabold text-sm shadow-xs transition-colors ${
              isUrgent
                ? "bg-[rgba(248,113,113,0.15)] text-[#F87171] border border-[#F87171] animate-pulse"
                : "bg-[#1D1013] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] shadow-[0_0_12px_rgba(255, 77, 109,0.15)]"
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{timeRemaining}s</span>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold font-display text-[#F2F7F3] leading-relaxed">
          {question.title}
        </h2>

        {isHost && (
          <div className="p-3 bg-[#1D1013] border border-[rgba(255, 77, 109,0.25)] rounded-[4px] text-xs font-mono text-[#A0AEA5] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
              <span>
                HOST MONITOR // Live response tracker: <strong className="text-[#FF4D6D]">{submissionsCount}</strong> of{" "}
                <strong className="text-[#F2F7F3]">{Math.max(totalParticipants, connectedSystemsCount, 1)}</strong> systems responded
              </span>
            </div>
            <span className="text-[10px] text-[#FF4D6D] font-bold">
              {Math.max(totalParticipants, connectedSystemsCount, 1) > 0
                ? `${Math.round((submissionsCount / Math.max(totalParticipants, connectedSystemsCount, 1)) * 100)}% Locked`
                : "0%"}
            </span>
          </div>
        )}

        {/* Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {(question.options || []).map((opt, idx) => {
            const isSelected = selectedOptionId === opt.id;
            const optVotes = submissionDistribution[opt.id] || 0;
            const optPercent = submissionsCount > 0 ? Math.round((optVotes / submissionsCount) * 100) : 0;

            return (
              <button
                key={opt.id}
                type="button"
                disabled={userAnswerSubmitted || isHost || timeRemaining <= 0}
                onClick={() => onOptionSubmit(opt.id)}
                className={`p-4 rounded-[4px] border font-bold text-sm transition-all text-left flex flex-col justify-between relative overflow-hidden ${
                  isSelected
                    ? "border-[#FF4D6D] bg-[#2A141A] text-[#F2F7F3] ring-1 ring-[#FF4D6D] shadow-[0_0_16px_rgba(255, 77, 109,0.18)]"
                    : userAnswerSubmitted || isHost || timeRemaining <= 0
                    ? isHost
                      ? "border-[rgba(240, 160, 180,0.16)] bg-[#1D1013] text-[#F2F7F3]"
                      : "opacity-50 bg-[#1D1013]/40 border-[rgba(240, 160, 180,0.1)] cursor-not-allowed text-[#69786F]"
                    : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 hover:border-[#FF4D6D]/40 hover:bg-[#1D1013] text-[#F2F7F3] cursor-pointer"
                }`}
              >
                {/* Host Live Response Fill Bar */}
                {isHost && submissionsCount > 0 && (
                  <div
                    className="absolute inset-y-0 left-0 bg-[rgba(255, 77, 109,0.15)] border-r border-[#FF4D6D]/40 transition-all duration-300 pointer-events-none"
                    style={{ width: `${optPercent}%` }}
                  />
                )}

                <div className="flex items-center justify-between w-full relative z-10">
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 h-6 rounded-[2px] font-mono font-bold text-xs flex items-center justify-center shrink-0 border ${
                        isSelected
                          ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D]"
                          : "bg-[#2A141A] text-[#A0AEA5] border-[rgba(240, 160, 180,0.2)]"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="leading-snug">{opt.text}</span>
                  </div>
                  {isHost ? (
                    <span className="font-mono text-xs font-bold text-[#FF4D6D] shrink-0 ml-2">
                      {optVotes} ({optPercent}%)
                    </span>
                  ) : (
                    <Zap
                      className={`w-4 h-4 text-[#FF4D6D] transition-opacity shrink-0 ${
                        isSelected ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {userAnswerSubmitted && !isHost && (
          <div className="p-3.5 rounded-[4px] bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.3)] text-[#FF4D6D] text-xs font-mono font-bold flex items-center justify-center space-x-2">
            <CheckCircle2 className="w-4 h-4 text-[#FF4D6D]" />
            <span>Answer locked on server! Waiting for countdown or host advance...</span>
          </div>
        )}
      </div>
    </div>
  );
}
