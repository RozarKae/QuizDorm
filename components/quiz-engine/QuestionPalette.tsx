import React from "react";
import { QuestionItem } from "@/lib/types/question";

interface QuestionPaletteProps {
  questions: QuestionItem[];
  currentIndex: number;
  answers: Record<string, any>;
  markedForReview: string[];
  onSelectQuestion: (index: number) => void;
}

export function QuestionPalette({
  questions,
  currentIndex,
  answers,
  markedForReview,
  onSelectQuestion,
}: QuestionPaletteProps) {
  return (
    <div className="bg-[#0C1210] p-4 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-4">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center justify-between">
        <span>Question Palette</span>
        <span className="text-[10px] text-[#A0AEA5] font-normal">{questions.length} Items</span>
      </h4>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#A0AEA5] pb-2 border-b border-[rgba(160,190,170,0.12)]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#65F59A] inline-block" />
          <span>Answered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#111B17] border border-[rgba(160,190,170,0.2)] inline-block" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#F87171] inline-block" />
          <span>Marked Review</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] border-2 border-[#F2F7F3] inline-block" />
          <span>Current Item</span>
        </div>
      </div>

      {/* Grid Palette */}
      <div className="grid grid-cols-5 gap-1.5 max-h-56 overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "";
          const isMarked = markedForReview.includes(q.id);
          const isCurrent = currentIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-8 w-full rounded-[3px] text-xs font-mono font-bold transition-all flex items-center justify-center border ${
                isCurrent
                  ? "ring-1 ring-[#F2F7F3] border-[#F2F7F3] font-extrabold shadow-xs"
                  : "border-[rgba(160,190,170,0.14)]"
              } ${
                isMarked
                  ? "bg-[rgba(248,113,113,0.2)] text-[#F87171] border-[#F87171]"
                  : isAnswered
                  ? "bg-[#65F59A] text-[#070B0A] border-[#65F59A] shadow-[0_0_8px_rgba(101,245,154,0.15)]"
                  : "bg-[#111B17] text-[#A0AEA5] hover:bg-[#17251E] hover:text-[#F2F7F3]"
              }`}
            >
              <span>{idx + 1}</span>
              {isMarked && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-[#F87171]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
