"use client";

import React, { useMemo } from "react";
import { QuestionItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "@/components/question-bank/QuestionTypeBadge";
import { Input } from "@/components/ui/input";
import { CheckCircle2, XCircle, HelpCircle, ArrowUp, ArrowDown, AlertTriangle, Layers, GripVertical } from "lucide-react";
import { useSound } from "@/components/audio/useSound";

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
  const { playTap, playHover } = useSound();
  const availableRightItems = useMemo(() => {
    const pairs = question.matchingPairs || [];
    const items = Array.from(new Set(pairs.map((p) => p.rightItem)));
    return items.sort();
  }, [question.matchingPairs]);

  return (
    <div className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-sm space-y-6">
      {/* Header Info */}
      <div className="flex items-center justify-between pb-3 border-b border-[rgba(240, 160, 180,0.12)]">
        <div className="flex items-center space-x-2">
          <QuestionTypeBadge type={question.type} />
          <span className="font-mono text-[11px] text-[#A0AEA5]">{question.category || question.subject}</span>
        </div>
        <span className="font-mono text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-[2px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] text-[#FF4D6D]">
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
            className="rounded-[4px] max-h-56 object-contain border border-[rgba(240, 160, 180,0.16)] mx-auto bg-[#0B0708] p-2"
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
                onMouseEnter={playHover}
                onClick={() => {
                  if (showExplanation) return;
                  playTap();
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
                      ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] font-semibold ring-1 ring-[#FF4D6D]/50"
                      : isSelected
                        ? "border-[#F87171] bg-[rgba(248,113,113,0.1)] text-[#F87171] ring-1 ring-[#F87171]/50"
                        : "border-[rgba(240, 160, 180,0.1)] bg-[#0B0708]/40 text-[#69786F] opacity-60"
                    : isSelected
                      ? "border-[#FF4D6D] bg-[#2A141A] text-[#F2F7F3] font-semibold ring-1 ring-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.12)] cursor-pointer"
                      : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 text-[#A0AEA5] hover:border-[#FF4D6D]/40 hover:text-[#F2F7F3] hover:bg-[#1D1013] cursor-pointer"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <span
                    className={`w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                      showExplanation && isCorrectOption
                        ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D]"
                        : isSelected
                          ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D]"
                          : "bg-[#2A141A] text-[#A0AEA5] border-[rgba(240, 160, 180,0.2)]"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt.text}</span>
                </div>
                {showExplanation ? (
                  isCorrectOption ? (
                    <span className="text-[10px] font-bold text-[#FF4D6D] font-mono uppercase">Correct Key</span>
                  ) : isSelected ? (
                    <span className="text-[10px] font-bold text-[#F87171] font-mono uppercase">Your Choice</span>
                  ) : null
                ) : (
                  isSelected && <CheckCircle2 className="w-4 h-4 text-[#FF4D6D] shrink-0" />
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
                onMouseEnter={playHover}
                onClick={() => {
                  playTap();
                  onAnswerChange(val);
                }}
                className={`p-4 rounded-[4px] border font-mono text-xs font-bold transition-all uppercase ${
                  showExplanation
                    ? isCorrectChoice
                      ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] ring-1 ring-[#FF4D6D]"
                      : isSelected
                        ? "border-[#F87171] bg-[rgba(248,113,113,0.12)] text-[#F87171] ring-1 ring-[#F87171]"
                        : "border-[rgba(240, 160, 180,0.1)] bg-[#0B0708] text-[#69786F] opacity-60"
                    : isSelected
                      ? "border-[#FF4D6D] bg-[#2A141A] text-[#FF4D6D] ring-1 ring-[#FF4D6D] shadow-[0_0_12px_rgba(255, 77, 109,0.12)] cursor-pointer"
                      : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 text-[#A0AEA5] hover:border-[#FF4D6D]/40 hover:text-[#F2F7F3] hover:bg-[#1D1013] cursor-pointer"
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
            className="text-sm font-semibold font-mono h-11 rounded-[4px] bg-[#2A141A] border-[rgba(240, 160, 180,0.18)]"
          />

          {showExplanation && (
            <div className="p-3 rounded-[4px] border border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] font-mono text-xs space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[#A0AEA5]">Accepted Answer(s):</span>
                <span className="font-bold text-[#FF4D6D]">
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
                        ? "border-[#FF4D6D]/50 bg-[rgba(255, 77, 109,0.06)] text-[#F2F7F3]"
                        : "border-[#F87171]/50 bg-[rgba(248,113,113,0.06)] text-[#F2F7F3]"
                      : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 text-[#F2F7F3]"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 bg-[#2A141A] border border-[rgba(240, 160, 180,0.18)] text-[#FF4D6D]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-[#F2F7F3]">{p.leftItem}</span>
                  </div>

                  {showExplanation ? (
                    <div className="flex items-center space-x-3 text-xs">
                      <div className="flex flex-col sm:items-end">
                        <span className="text-[11px] text-[#A0AEA5]">
                          Your Answer:{" "}
                          <span className={isMatchCorrect ? "text-[#FF4D6D] font-bold" : "text-[#F87171] font-bold"}>
                            {studentChoice || "Not Answered"}
                          </span>
                        </span>
                        {!isMatchCorrect && (
                          <span className="text-[11px] text-[#FF4D6D] font-bold">
                            Correct: {p.rightItem}
                          </span>
                        )}
                      </div>
                      {isMatchCorrect ? (
                        <CheckCircle2 className="w-4 h-4 text-[#FF4D6D] shrink-0" />
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
                        className="w-full text-xs font-mono p-2 rounded-[3px] border border-[rgba(240, 160, 180,0.18)] bg-[#2A141A] text-[#F2F7F3] focus:outline-hidden focus:ring-1 focus:ring-[#FF4D6D]"
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

      {/* 6: Error Spotting */}
      {question.type === "error_spotting" && (
        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-[4px] bg-[#1D1013] border border-[rgba(245,158,11,0.25)] flex items-start gap-2.5">
            <AlertTriangle className="w-4 h-4 text-[#F59E0B] shrink-0 mt-0.5" />
            <div className="text-xs font-mono text-[#A0AEA5]">
              <span className="font-bold text-[#F2F7F3]">Error Spotting:</span> Identify the specific segment or choice that contains a factual, logical, or grammatical error.
            </div>
          </div>

          <div className="space-y-2 pt-1">
            {question.options.map((opt, idx) => {
              const isSelected = userAnswer === opt.id;
              const isCorrectOption = Boolean(opt.isCorrect);

              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (showExplanation) return;
                    onAnswerChange(opt.id);
                  }}
                  className={`p-3.5 rounded-[4px] border text-xs font-mono transition-all flex items-center justify-between ${
                    showExplanation
                      ? isCorrectOption
                        ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] font-semibold ring-1 ring-[#FF4D6D]/50"
                        : isSelected
                          ? "border-[#F87171] bg-[rgba(248,113,113,0.1)] text-[#F87171] ring-1 ring-[#F87171]/50"
                          : "border-[rgba(240, 160, 180,0.1)] bg-[#0B0708]/40 text-[#69786F] opacity-60"
                      : isSelected
                        ? "border-[#F59E0B] bg-[#1F1A0E] text-[#F2F7F3] font-semibold ring-1 ring-[#F59E0B] shadow-[0_0_12px_rgba(245,158,11,0.12)] cursor-pointer"
                        : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 text-[#A0AEA5] hover:border-[#F59E0B]/40 hover:text-[#F2F7F3] hover:bg-[#1D1013] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 h-6 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                        showExplanation && isCorrectOption
                          ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D]"
                          : isSelected
                            ? "bg-[#F59E0B] text-[#0B0708] border-[#F59E0B]"
                            : "bg-[#2A141A] text-[#A0AEA5] border-[rgba(240, 160, 180,0.2)]"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-semibold">{opt.text}</span>
                  </div>
                  {showExplanation ? (
                    isCorrectOption ? (
                      <span className="text-[10px] font-bold text-[#FF4D6D] font-mono uppercase">Erroneous Part (Key)</span>
                    ) : isSelected ? (
                      <span className="text-[10px] font-bold text-[#F87171] font-mono uppercase">Your Choice</span>
                    ) : null
                  ) : (
                    isSelected && <CheckCircle2 className="w-4 h-4 text-[#F59E0B] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 7: Assertion & Reasoning */}
      {question.type === "assertion_reasoning" && (
        <div className="space-y-3 pt-2">
          <div className="p-3.5 rounded-[4px] bg-[#1D1013] border border-[rgba(168,85,247,0.25)] text-xs font-mono text-[#A0AEA5] space-y-1">
            <span className="font-bold text-[#C084FC]">Assertion & Reason Evaluation:</span> Examine both premises carefully to determine individual veracity and whether Reason correctly explains Assertion.
          </div>

          <div className="space-y-2 pt-1">
            {question.options.map((opt, idx) => {
              const isSelected = userAnswer === opt.id;
              const isCorrectOption = Boolean(opt.isCorrect);

              return (
                <div
                  key={opt.id}
                  onClick={() => {
                    if (showExplanation) return;
                    onAnswerChange(opt.id);
                  }}
                  className={`p-3.5 rounded-[4px] border text-xs font-mono transition-all flex items-center justify-between ${
                    showExplanation
                      ? isCorrectOption
                        ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] font-semibold ring-1 ring-[#FF4D6D]/50"
                        : isSelected
                          ? "border-[#F87171] bg-[rgba(248,113,113,0.1)] text-[#F87171] ring-1 ring-[#F87171]/50"
                          : "border-[rgba(240, 160, 180,0.1)] bg-[#0B0708]/40 text-[#69786F] opacity-60"
                      : isSelected
                        ? "border-[#A855F7] bg-[#1E142B] text-[#F2F7F3] font-semibold ring-1 ring-[#A855F7] shadow-[0_0_12px_rgba(168,85,247,0.12)] cursor-pointer"
                        : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 text-[#A0AEA5] hover:border-[#A855F7]/40 hover:text-[#F2F7F3] hover:bg-[#1D1013] cursor-pointer"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span
                      className={`w-6 h-6 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border ${
                        showExplanation && isCorrectOption
                          ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D]"
                          : isSelected
                            ? "bg-[#A855F7] text-[#0B0708] border-[#A855F7]"
                            : "bg-[#2A141A] text-[#A0AEA5] border-[rgba(240, 160, 180,0.2)]"
                      }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {showExplanation ? (
                    isCorrectOption ? (
                      <span className="text-[10px] font-bold text-[#FF4D6D] font-mono uppercase">Correct Key</span>
                    ) : isSelected ? (
                      <span className="text-[10px] font-bold text-[#F87171] font-mono uppercase">Your Choice</span>
                    ) : null
                  ) : (
                    isSelected && <CheckCircle2 className="w-4 h-4 text-[#A855F7] shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 8: Sequence Ordering */}
      {question.type === "sequence_ordering" && (
        <div className="space-y-3 pt-2">
          <p className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5]">
            {showExplanation ? "Chronological Sequence Evaluation:" : "Arrange the steps in correct sequential order using the arrows:"}
          </p>

          {(() => {
            const defaultOrder = (question.sequenceItems || []).map((s) => s.id);
            const currentOrder: string[] = Array.isArray(userAnswer) && userAnswer.length > 0 ? userAnswer : defaultOrder;
            const itemsMap = new Map((question.sequenceItems || []).map((s) => [s.id, s]));

            const handleMove = (index: number, direction: "up" | "down") => {
              if (showExplanation) return;
              const newOrder = [...currentOrder];
              const targetIndex = direction === "up" ? index - 1 : index + 1;
              if (targetIndex < 0 || targetIndex >= newOrder.length) return;
              const temp = newOrder[index];
              newOrder[index] = newOrder[targetIndex];
              newOrder[targetIndex] = temp;
              onAnswerChange(newOrder);
            };

            return (
              <div className="space-y-2">
                {currentOrder.map((itemId, idx) => {
                  const item = itemsMap.get(itemId);
                  if (!item) return null;
                  const isCorrectPos = item.order === idx + 1;

                  return (
                    <div
                      key={itemId}
                      className={`p-3 rounded-[4px] border flex items-center justify-between text-xs font-mono ${
                        showExplanation
                          ? isCorrectPos
                            ? "border-[#FF4D6D]/50 bg-[rgba(255, 77, 109,0.06)] text-[#F2F7F3]"
                            : "border-[#F87171]/50 bg-[rgba(248,113,113,0.06)] text-[#F2F7F3]"
                          : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 text-[#F2F7F3]"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 bg-[#2A141A] border border-[rgba(240, 160, 180,0.18)] text-[#FF4D6D]">
                          {idx + 1}
                        </span>
                        <span className="font-semibold">{item.text}</span>
                      </div>

                      {showExplanation ? (
                        <span className={`text-[11px] font-bold ${isCorrectPos ? "text-[#FF4D6D]" : "text-[#F87171]"}`}>
                          {isCorrectPos ? "Correct Position" : `Expected #${item.order}`}
                        </span>
                      ) : (
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            disabled={idx === 0}
                            onClick={() => handleMove(idx, "up")}
                            className="p-1 rounded bg-[#2A141A] hover:bg-[#34151C] disabled:opacity-30 text-[#A0AEA5] hover:text-[#FF4D6D] transition-colors"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            disabled={idx === currentOrder.length - 1}
                            onClick={() => handleMove(idx, "down")}
                            className="p-1 rounded bg-[#2A141A] hover:bg-[#34151C] disabled:opacity-30 text-[#A0AEA5] hover:text-[#FF4D6D] transition-colors"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          })()}
        </div>
      )}

      {/* 9: Drag & Drop Categorization */}
      {question.type === "drag_drop_categorize" && (
        <div className="space-y-3 pt-2">
          <p className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5]">
            {showExplanation ? "Categorization Review:" : "Categorize each item into its corresponding target group:"}
          </p>

          <div className="space-y-2">
            {(question.dragDropItems || []).map((item, idx) => {
              const currentCategoryMap =
                typeof userAnswer === "object" && userAnswer !== null && !Array.isArray(userAnswer)
                  ? (userAnswer as Record<string, string>)
                  : {};
              const studentCategory = currentCategoryMap[item.id];
              const targetId = item.targetCategoryId || item.categoryId;
              const isMatchCorrect = studentCategory === targetId;
              const targetCategory = (question.dragDropCategories || []).find((c) => c.id === targetId);

              return (
                <div
                  key={item.id || `dd-${idx}`}
                  className={`p-3.5 rounded-[4px] border flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono ${
                    showExplanation
                      ? isMatchCorrect
                        ? "border-[#FF4D6D]/50 bg-[rgba(255, 77, 109,0.06)] text-[#F2F7F3]"
                        : "border-[#F87171]/50 bg-[rgba(248,113,113,0.06)] text-[#F2F7F3]"
                      : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013]/60 text-[#F2F7F3]"
                  }`}
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="w-5 h-5 rounded-[2px] text-[10px] font-mono font-bold flex items-center justify-center shrink-0 bg-[#2A141A] border border-[rgba(240, 160, 180,0.18)] text-[#FF4D6D]">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-[#F2F7F3]">{item.text}</span>
                  </div>

                  {showExplanation ? (
                    <div className="text-xs">
                      <span className={isMatchCorrect ? "text-[#FF4D6D] font-bold" : "text-[#F87171] font-bold"}>
                        {isMatchCorrect ? "Correct Category" : `Expected: ${targetCategory?.title || targetCategory?.name || item.categoryId}`}
                      </span>
                    </div>
                  ) : (
                    <div className="w-full sm:w-64">
                      <select
                        value={studentCategory || ""}
                        onChange={(e) => {
                          const updated = { ...currentCategoryMap, [item.id]: e.target.value };
                          onAnswerChange(updated);
                        }}
                        className="w-full text-xs font-mono p-2 rounded-[3px] border border-[rgba(240, 160, 180,0.18)] bg-[#2A141A] text-[#F2F7F3] focus:outline-hidden focus:ring-1 focus:ring-[#FF4D6D]"
                      >
                        <option value="">-- Choose Category --</option>
                        {(question.dragDropCategories || []).map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.title || cat.name}
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
        <div className="p-4 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] space-y-1 text-xs font-mono">
          <p className="font-bold text-[#F2F7F3] flex items-center">
            <HelpCircle className="w-4 h-4 mr-1.5 text-[#FF758F]" /> Explanation & Solution Note:
          </p>
          <p className="text-[#A0AEA5] leading-relaxed">{question.explanation}</p>
        </div>
      )}
    </div>
  );
}
