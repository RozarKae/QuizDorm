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
    <div className="bg-card p-6 sm:p-8 rounded-[3px] border border-border shadow-xs space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center space-x-2">
          <QuestionTypeBadge type={question.type} />
          <span className="font-mono text-[11px] text-muted-foreground">{question.category || question.subject}</span>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[2px] bg-muted border border-border text-foreground">
          {question.marks} {question.marks === 1 ? "Mark" : "Marks"}
        </span>
      </div>

      {/* Statement & Image */}
      <div className="space-y-4">
        <h3 className="font-display text-lg sm:text-xl font-bold text-foreground leading-snug">
          {question.title}
        </h3>

        {question.image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={question.image} alt="Question Diagram" className="rounded-[2px] max-h-56 object-contain border border-border mx-auto bg-background p-2" />
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
                className={`p-3.5 rounded-[2px] border text-xs font-mono transition-colors flex items-center justify-between ${
                  showExplanation
                    ? isCorrectOption
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold ring-1 ring-emerald-500/50"
                      : isSelected
                        ? "border-coral bg-coral/10 text-coral ring-1 ring-coral/50"
                        : "border-border bg-background/40 text-muted-foreground opacity-60"
                    : isSelected
                      ? "border-cobalt bg-cobalt/5 text-foreground font-semibold ring-1 ring-cobalt shadow-xs cursor-pointer"
                      : "border-border bg-background/60 text-muted-foreground hover:border-cobalt/40 hover:text-foreground cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span className={`w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                    showExplanation && isCorrectOption
                      ? "bg-emerald-500 text-white border-emerald-500"
                      : isSelected
                        ? "bg-cobalt text-white border-cobalt"
                        : "bg-muted text-foreground border-border"
                  }`}>
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {showExplanation ? (
                  isCorrectOption ? (
                    <span className="text-[10px] font-bold text-emerald-400 font-mono uppercase">Correct Key</span>
                  ) : isSelected ? (
                    <span className="text-[10px] font-bold text-coral font-mono uppercase">Your Choice</span>
                  ) : null
                ) : (
                  isSelected && <CheckCircle2 className="w-4 h-4 text-cobalt shrink-0" />
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
                className={`p-4 rounded-[2px] border font-mono text-xs font-bold transition-colors uppercase ${
                  showExplanation
                    ? isCorrectChoice
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500"
                      : isSelected
                        ? "border-coral bg-coral/10 text-coral ring-1 ring-coral"
                        : "border-border bg-background text-muted-foreground opacity-60"
                    : isSelected
                      ? "border-cobalt bg-cobalt/10 text-cobalt ring-1 ring-cobalt cursor-pointer"
                      : "border-border bg-background text-muted-foreground hover:border-cobalt/40 hover:text-foreground cursor-pointer"
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
          <label className="block text-xs font-mono uppercase tracking-wider text-muted-foreground">Type your answer below:</label>
          <Input
            value={userAnswer || ""}
            disabled={showExplanation}
            onChange={(e) => onAnswerChange(e.target.value)}
            placeholder="Enter answer keyword..."
            className="text-sm font-semibold font-mono h-11 rounded-[2px] bg-background border-border"
          />

          {showExplanation && (
            <div className="p-3 rounded-[2px] border border-border bg-muted/40 font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Accepted Answer(s):</span>
                <span className="font-bold text-emerald-400">
                  {[
                    ...(question.fillBlanks || []),
                    ...question.options.filter((o) => o.isCorrect).map((o) => o.text),
                  ].join(", ") || "N/A"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Your Input:</span>
                <span className="font-semibold text-foreground">
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
            <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
              {showExplanation ? "Matching Pair Review:" : "Match each item on the left with its corresponding term:"}
            </p>
          </div>

          <div className="space-y-2">
            {(question.matchingPairs || []).map((p, idx) => {
              const studentChoice = typeof userAnswer === "object" && userAnswer !== null && !Array.isArray(userAnswer)
                ? (userAnswer as Record<string, string>)[p.id] ?? (userAnswer as Record<string, string>)[p.leftItem]
                : undefined;
              const isMatchCorrect = studentChoice && studentChoice.trim().toLowerCase() === p.rightItem.trim().toLowerCase();

              return (
                <div
                  key={p.id || `pair-${idx}`}
                  className={`p-3.5 rounded-[2px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono transition-colors ${
                    showExplanation
                      ? isMatchCorrect
                        ? "border-emerald-500/50 bg-emerald-500/5 text-foreground"
                        : "border-coral/50 bg-coral/5 text-foreground"
                      : "border-border bg-background/60 text-foreground"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 bg-muted border border-border text-foreground">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-foreground">{p.leftItem}</span>
                  </div>

                  {showExplanation ? (
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="flex flex-col sm:items-end">
                        <span className="text-[11px] text-muted-foreground">
                          Your Answer:{" "}
                          <span className={isMatchCorrect ? "text-emerald-400 font-bold" : "text-coral font-bold"}>
                            {studentChoice || "Not Answered"}
                          </span>
                        </span>
                        {!isMatchCorrect && (
                          <span className="text-[11px] text-emerald-400 font-bold">
                            Correct: {p.rightItem}
                          </span>
                        )}
                      </div>
                      {isMatchCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-coral shrink-0" />
                      )}
                    </div>
                  ) : (
                    <div className="w-full sm:w-64">
                      <select
                        value={studentChoice || ""}
                        onChange={(e) => {
                          const currentAnswers = typeof userAnswer === "object" && userAnswer !== null && !Array.isArray(userAnswer)
                            ? { ...userAnswer }
                            : {};
                          currentAnswers[p.id] = e.target.value;
                          onAnswerChange(currentAnswers);
                        }}
                        className="w-full text-xs font-mono p-2 rounded-[2px] border border-border bg-background text-foreground focus:outline-hidden focus:ring-1 focus:ring-cobalt"
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
        <div className="p-4 rounded-[2px] bg-muted/30 border border-border space-y-1 text-xs font-mono">
          <p className="font-bold text-foreground flex items-center">
            <HelpCircle className="w-4 h-4 mr-1.5 text-cobalt" /> Explanation & Solution Note:
          </p>
          <p className="text-muted-foreground leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
