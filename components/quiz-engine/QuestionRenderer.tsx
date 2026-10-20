"use client";

import React, { useMemo } from "react";
import { QuestionItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";

interface QuestionRendererProps {
  question: QuestionItem;
  userAnswer: any;
  onAnswerChange: (value: any) => void;
  showExplanation?: boolean;
}

export function QuestionRenderer({
  question,
  userAnswer,
  onAnswerChange,
  showExplanation = false,
}: QuestionRendererProps) {
  const availableRightItems = useMemo(() => {
    const pairs = question.matchingPairs || [];
    const items = Array.from(new Set(pairs.map((p) => p.rightItem)));
    return items.sort();
  }, [question.matchingPairs]);

  return (
    <div className="bg-[#0C1210] p-6 sm:p-8 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-sm space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(160,190,170,0.12)]">
        <div className="flex items-center space-x-2">
          <QuestionTypeBadge type={question.type} />
          <span className="font-mono text-[11px] text-[#A0AEA5]">{question.category || question.subject}</span>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[2px] bg-[#111B17] border border-[rgba(160,190,170,0.14)] text-[#65F59A]">
          {question.marks} {question.marks === 1 ? "Mark" : "Marks"}
        </span>
      </div>

      {/* Statement & Image */}
      <div className="space-y-4">
        <h3 className="font-display text-lg sm:text-xl font-bold text-[#F2F7F3] leading-snug">
          {question.title}
        </h3>

        {question.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={question.image}
            alt="Question Diagram"
            className="rounded-[4px] max-h-56 object-contain border border-[rgba(160,190,170,0.16)] mx-auto bg-[#070B0A] p-2"
          />
        )}
      </div>

      {/* ANSWER INPUTS BASED ON QUESTION FORMAT */}

      {/* 1, 2, 7: MCQ Single / MCQ Multiple / Image Based */}
      {(question.type === "mcq_single" || question.type === "mcq_multiple" || question.type === "image_based") && (
        <div className="space-y-2.5 pt-2">
          {question.options.map((opt, idx) => {
            const isSelected =
              question.type === "mcq_multiple"
                ? Array.isArray(userAnswer) && userAnswer.includes(opt.id)
                : userAnswer === opt.id;

            const isCorrectOption = Boolean(opt.isCorrect);

            return (
              <div
                key={opt.id}
                onClick={() => {
                  if (showExplanation) return;
                  if (question.type === "mcq_multiple") {
                    const currentArr = Array.isArray(userAnswer) ? userAnswer : [];
                    const nextArr = currentArr.includes(opt.id)
                      ? currentArr.filter((id: string) => id !== opt.id)
                      : [...currentArr, opt.id];
                    onAnswerChange(nextArr);
                  } else {
                    onAnswerChange(opt.id);
                  }
                }}
                className={`p-3.5 rounded-[4px] border text-xs font-mono transition-all flex items-center justify-between ${
                  showExplanation
                    ? isCorrectOption
                      ? "border-[#65F59A] bg-[rgba(101,245,154,0.1)] text-[#65F59A] font-semibold ring-1 ring-[#65F59A]/50"
                      : isSelected
                        ? "border-[#F87171] bg-[rgba(248,113,113,0.1)] text-[#F87171] ring-1 ring-[#F87171]/50"
                        : "border-[rgba(160,190,170,0.1)] bg-[#070B0A]/40 text-[#69786F] opacity-60"
                    : isSelected
                      ? "border-[#65F59A] bg-[#17251E] text-[#F2F7F3] font-semibold ring-1 ring-[#65F59A] shadow-[0_0_12px_rgba(101,245,154,0.12)] cursor-pointer"
                      : "border-[rgba(160,190,170,0.14)] bg-[#111B17]/60 text-[#A0AEA5] hover:border-[#65F59A]/40 hover:text-[#F2F7F3] hover:bg-[#111B17] cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                      showExplanation && isCorrectOption
                        ? "bg-[#65F59A] text-[#070B0A] border-[#65F59A]"
                        : isSelected
                          ? "bg-[#65F59A] text-[#070B0A] border-[#65F59A]"
                          : "bg-[#17251E] text-[#A0AEA5] border-[rgba(160,190,170,0.2)]"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {showExplanation ? (
                  isCorrectOption ? (
                    <span className="text-[10px] font-bold text-[#65F59A] font-mono uppercase">Correct Key</span>
                  ) : isSelected ? (
                    <span className="text-[10px] font-bold text-[#F87171] font-mono uppercase">Your Choice</span>
                  ) : null
                ) : (
                  isSelected && <CheckCircle2 className="w-4 h-4 text-[#65F59A] shrink-0" />
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* 3: True / False */}
      {question.type === "true_false" && (
        <div className="grid grid-cols-2 gap-3 pt-2">
          {["true", "false"].map((val) => {
            const isSelected = String(userAnswer).toLowerCase() === val;
            const correctOpt = question.options.find((o) => o.isCorrect);
            const expectedStr = correctOpt ? correctOpt.text.toLowerCase() : "true";
            const isCorrectChoice = expectedStr === val;

            return (
              <button
                key={val}
                type="button"
                disabled={showExplanation}
                onClick={() => onAnswerChange(val)}
                className={`p-4 rounded-[4px] border font-mono text-xs font-bold transition-all uppercase ${
                  showExplanation
                    ? isCorrectChoice
                      ? "border-[#65F59A] bg-[rgba(101,245,154,0.12)] text-[#65F59A] ring-1 ring-[#65F59A]"
                      : isSelected
                        ? "border-[#F87171] bg-[rgba(248,113,113,0.12)] text-[#F87171] ring-1 ring-[#F87171]"
                        : "border-[rgba(160,190,170,0.1)] bg-[#070B0A] text-[#69786F] opacity-60"
                    : isSelected
                      ? "border-[#65F59A] bg-[#17251E] text-[#65F59A] ring-1 ring-[#65F59A] shadow-[0_0_12px_rgba(101,245,154,0.12)] cursor-pointer"
                      : "border-[rgba(160,190,170,0.14)] bg-[#111B17]/60 text-[#A0AEA5] hover:border-[#65F59A]/40 hover:text-[#F2F7F3] hover:bg-[#111B17] cursor-pointer"
                }`}
              >
                {val}
                {showExplanation && isCorrectChoice && " (CORRECT)"}
              </button>
            );
          })}
        </div>
      )}

      {/* 4: Fill in the Blank */}
      {question.type === "fill_in_the_blank" && (
        <div className="space-y-3 pt-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-[#A0AEA5]">Type your answer below:</label>
          <Input
            value={userAnswer || ""}
            disabled={showExplanation}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Enter answer keyword..."
            className="text-sm font-semibold font-mono h-11 rounded-[4px] bg-[#17251E] border-[rgba(160,190,170,0.18)]"
          />

          {showExplanation && (
            <div className="p-3 rounded-[4px] border border-[rgba(160,190,170,0.14)] bg-[#111B17] font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#A0AEA5]">Accepted Answer(s):</span>
                <span className="font-bold text-[#65F59A]">
                  {[
                    ...(question.fillBlanks || []),
                    ...question.options.filter((o) => o.isCorrect).map((o) => o.text),
                  ].join(", ") || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#A0AEA5]">Your Input:</span>
                <span className="font-semibold text-[#F2F7F3]">
                  {userAnswer ? String(userAnswer) : "None (Unanswered)"}
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 5: Match the Following */}
      {question.type === "match_following" && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5]">
              {showExplanation ? "Matching Pair Review:" : "Match each item on the left with its corresponding term:"}
            </p>
          </div>

          <div className="space-y-2">
            {(question.matchingPairs || []).map((p, idx) => {
              const studentChoice =
                typeof userAnswer === "object" && userAnswer !== null && !Array.isArray(userAnswer)
                  ? (userAnswer as Record<string, string>)[p.id] ?? (userAnswer as Record<string, string>)[p.leftItem]
                  : undefined;
              const isMatchCorrect = studentChoice && studentChoice.trim().toLowerCase() === p.rightItem.trim().toLowerCase();

              return (
                <div
                  key={p.id || `pair-${idx}`}
                  className={`p-3.5 rounded-[4px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono transition-colors ${
                    showExplanation
                      ? isMatchCorrect
                        ? "border-[#65F59A]/50 bg-[rgba(101,245,154,0.06)] text-[#F2F7F3]"
                        : "border-[#F87171]/50 bg-[rgba(248,113,113,0.06)] text-[#F2F7F3]"
                      : "border-[rgba(160,190,170,0.14)] bg-[#111B17]/60 text-[#F2F7F3]"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 bg-[#17251E] border border-[rgba(160,190,170,0.18)] text-[#65F59A]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-[#F2F7F3]">{p.leftItem}</span>
                  </div>

                  {showExplanation ? (
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="flex flex-col sm:items-end">
                        <span className="text-[11px] text-[#A0AEA5]">
                          Your Answer:{" "}
                          <span className={isMatchCorrect ? "text-[#65F59A] font-bold" : "text-[#F87171] font-bold"}>
                            {studentChoice || "Not Answered"}
                          </span>
                        </span>
                        {!isMatchCorrect && (
                          <span className="text-[11px] text-[#65F59A] font-bold">
                            Correct: {p.rightItem}
                          </span>
                        )}
                      </div>
                      {isMatchCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#65F59A] shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-[#F87171] shrink-0" />
                      )}
                    </div>
                  ) : (
                    <div className="w-full sm:w-64">
                      <select
                        value={studentChoice || ""}
                        onChange={(e) => {
                          const currentAnswers =
                            typeof userAnswer === "object" && userAnswer !== null && !Array.isArray(userAnswer)
                              ? { ...userAnswer }
                              : {};
                          currentAnswers[p.id] = e.target.value;
                          onAnswerChange(currentAnswers);
                        }}
                        className="w-full text-xs font-mono p-2 rounded-[3px] border border-[rgba(160,190,170,0.18)] bg-[#17251E] text-[#F2F7F3] focus:outline-hidden focus:ring-1 focus:ring-[#65F59A]"
                      >
                        <option value="">-- Select Match --</option>
                        {availableRightItems.map((rightTerm, rIdx) => (
                          <option key={rIdx} value={rightTerm}>
                            {rightTerm}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Explanation Box */}
      {showExplanation && question.explanation && (
        <div className="p-4 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.14)] space-y-1 text-xs font-mono">
          <p className="font-bold text-[#F2F7F3] flex items-center">
            <HelpCircle className="w-4 h-4 mr-1.5 text-[#38D9B0]" /> Explanation & Solution Note:
          </p>
          <p className="text-[#A0AEA5] leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
