import { QuestionItem } from "@/lib/types/question";

interface QuestionPaletteProps {
  questions: QuestionItem[];
  currentIndex: number;
  answers: Record<string, unknown>;
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
    <div className="bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-4">
      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center justify-between">
        <span>Question Palette</span>
        <span className="text-[10px] text-[#A0AEA5] font-normal">{questions.length} Items</span>
      </h4>

      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-[#A0AEA5] pb-2 border-b border-[rgba(240, 160, 180,0.12)]">
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#FF4D6D] inline-block" />
          <span>Answered</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <span className="w-2.5 h-2.5 rounded-[2px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.2)] inline-block" />
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
                  : "border-[rgba(240, 160, 180,0.14)]"
              } ${
                isMarked
                  ? "bg-[rgba(248,113,113,0.2)] text-[#F87171] border-[#F87171]"
                  : isAnswered
                  ? "bg-[#FF4D6D] text-[#0B0708] border-[#FF4D6D] shadow-[0_0_8px_rgba(255, 77, 109,0.15)]"
                  : "bg-[#1D1013] text-[#A0AEA5] hover:bg-[#2A141A] hover:text-[#F2F7F3]"
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
