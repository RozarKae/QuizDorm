import { Button } from "@/components/ui/button";
import { QuestionItem } from "@/lib/types/question";
import { CheckCircle2,Edit,Tag,Trash2 } from "lucide-react";
import Link from "next/link";
import { QuestionTypeBadge } from "./QuestionTypeBadge";

interface QuestionCardProps {
  question: QuestionItem;
  isSelected?: boolean;
  onSelectToggle?: (id: string) => void;
  onDelete?: (id: string) => void;
}

export function QuestionCard({ question, isSelected, onSelectToggle, onDelete }: QuestionCardProps) {
  const getDifficultyBadge = (diff: string) => {
    if (diff === "Hard") {
      return (
        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] font-bold bg-[#F87171]/10 text-[#F87171] border border-[#F87171]/30">
          Hard
        </span>
      );
    }
    if (diff === "Medium") {
      return (
        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] font-bold bg-[#1D1013] text-[#FF758F] border border-[rgba(255, 117, 143,0.3)]">
          Medium
        </span>
      );
    }
    return (
      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[3px] font-bold bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)]">
        Easy
      </span>
    );
  };

  return (
    <div
      className={`bg-[#140C0E] p-5 rounded-[6px] border transition-all shadow-sm flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-[0_12px_25px_rgba(0,0,0,0.6),0_0_15px_rgba(255, 77, 109,0.1)] ${
        isSelected
          ? "border-[#FF4D6D] ring-1 ring-[#FF4D6D] bg-[rgba(255, 77, 109,0.06)]"
          : "border-[rgba(240, 160, 180,0.14)] hover:border-[#FF4D6D]/40"
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center space-x-2">
            {onSelectToggle && (
              <input
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelectToggle(question.id)}
                className="w-3.5 h-3.5 accent-[#FF4D6D] border-[rgba(240, 160, 180,0.2)] rounded-[2px] cursor-pointer mt-0.5"
              />
            )}
            <QuestionTypeBadge type={question.type} />
          </div>

          {getDifficultyBadge(question.difficulty)}
        </div>

        <h3 className="font-display text-sm font-semibold text-[#F2F7F3] line-clamp-2 mb-2 leading-snug">
          {question.title}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-[#A0AEA5] mb-3">
          <span className="font-semibold text-[#FF4D6D]">{question.topic || question.subject}</span>
          <span className="text-[#69786F]">/</span>
          <span>{question.subject}</span>
          {(question.gradeLevel || question.grade) && (
            <>
              <span>/</span>
              <span>{question.gradeLevel || question.grade}</span>
            </>
          )}
          <span>/</span>
          <span className="text-foreground font-semibold">{question.marks} {question.marks === 1 ? "Mark" : "Marks"}</span>
        </div>

        {/* Options summary */}
        {question.options && question.options.length > 0 && (
          <div className="space-y-1.5 mb-3 font-mono text-xs">
            {question.options.slice(0, 3).map((opt) => (
              <div
                key={opt.id}
                className={`p-2 rounded-[3px] border flex items-center justify-between ${
                  opt.isCorrect
                    ? "border-[#FF4D6D]/40 bg-[rgba(255, 77, 109,0.08)] text-[#F2F7F3] font-semibold"
                    : "border-[rgba(240, 160, 180,0.12)] bg-[#1D1013] text-[#A0AEA5]"
                }`}
              >
                <span className="truncate">{opt.text}</span>
                {opt.isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-[#FF4D6D] shrink-0 ml-1" />}
              </div>
            ))}
            {question.options.length > 3 && (
              <span className="text-[10px] font-mono text-muted-foreground italic">+{question.options.length - 3} more options</span>
            )}
          </div>
        )}

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            {question.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] bg-muted text-muted-foreground border border-border"
              >
                <Tag className="w-2.5 h-2.5 mr-1 text-muted-foreground" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] font-mono text-muted-foreground">
        <span className="truncate max-w-[180px]">REF: {question.id}</span>

        <div className="flex items-center space-x-1">
          <Link href={`/dashboard/questions/${question.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-7 w-7 rounded-[2px] text-muted-foreground hover:text-foreground hover:bg-muted" title="Edit Question">
              <Edit className="w-3.5 h-3.5" />
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(question.id)}
              className="h-7 w-7 rounded-[3px] text-[#F87171] hover:bg-[#F87171]/10"
              title="Delete Question"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
