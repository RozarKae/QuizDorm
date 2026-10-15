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
    <div className="bg-card p-4 rounded-[3px] border border-border shadow-xs space-y-4">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center justify-between">
        <span>Question Palette</span>
        <span className="text-[10px] text-muted-foreground font-normal">{questions.length} Items</span>
      </h4>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-muted-foreground pb-2 border-b border-border">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-cobalt inline-block" />
          <span>Answered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-muted border border-border inline-block" />
          <span>Unanswered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-coral inline-block" />
          <span>Marked Review</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] border-2 border-foreground inline-block" />
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
              className={`relative h-8 w-full rounded-[2px] text-xs font-mono font-bold transition-colors flex items-center justify-center border ${
                isCurrent
                  ? "ring-1 ring-foreground border-foreground font-extrabold shadow-xs"
                  : "border-border"
              } ${
                isMarked
                  ? "bg-coral text-white border-coral"
                  : isAnswered
                  ? "bg-cobalt text-white border-cobalt"
                  : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
              }`}
            >
              <span>{idx + 1}</span>
              {isMarked && (
                <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-white" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
