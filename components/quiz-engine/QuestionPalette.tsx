import React from "react";
import { QuestionItem } from "@/lib/types/question";
import { Bookmark, CheckCircle2 } from "lucide-react";

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
    <div className="bg-white dark:bg-gray-950 p-5 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center justify-between">
        <span>Question Palette</span>
        <span className="text-[10px] text-gray-400 font-normal">{questions.length} Items</span>
      </h4>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 pb-2 border-b border-gray-100 dark:border-gray-900">
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-md bg-emerald-500 inline-block" />
          <span>Answered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-md bg-gray-200 dark:bg-gray-800 inline-block" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-md bg-amber-500 inline-block" />
          <span>Marked Review</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-3 h-3 rounded-md border-2 border-indigo-600 inline-block" />
          <span>Current Item</span>
        </div>
      </div>

      {/* Grid Palette */}
      <div className="grid grid-cols-5 gap-2 max-h-56 overflow-y-auto pr-1">
        {questions.map((q, idx) => {
          const isAnswered = answers[q.id] !== undefined && answers[q.id] !== null && answers[q.id] !== "";
          const isMarked = markedForReview.includes(q.id);
          const isCurrent = currentIndex === idx;

          return (
            <button
              key={q.id}
              onClick={() => onSelectQuestion(idx)}
              className={`relative h-10 w-full rounded-xl text-xs font-bold transition-all flex items-center justify-center ${
                isCurrent
                  ? "ring-2 ring-indigo-600 ring-offset-2 font-extrabold shadow-sm"
                  : ""
              } ${
                isMarked
                  ? "bg-amber-500 text-white shadow-sm"
                  : isAnswered
                  ? "bg-emerald-500 text-white shadow-sm"
                  : "bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200"
              }`}
            >
              <span>{idx + 1}</span>
              {isMarked && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-300 ring-1 ring-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
