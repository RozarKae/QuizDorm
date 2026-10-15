import React from "react";
import Link from "next/link";
import { QuestionItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "./QuestionTypeBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Tag, HelpCircle, CheckCircle2 } from "lucide-react";

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
        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold bg-coral/10 text-coral border border-coral/30">
          Hard
        </span>
      );
    }
    if (diff === "Medium") {
      return (
        <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold bg-muted text-foreground border border-border">
          Medium
        </span>
      );
    }
    return (
      <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold bg-acid/20 text-foreground border border-acid/50">
        Easy
      </span>
    );
  };

  return (
    <div
      className={`bg-card p-5 rounded-[3px] border transition-colors shadow-xs flex flex-col justify-between ${
        isSelected ? "border-cobalt ring-1 ring-cobalt bg-cobalt/5" : "border-border hover:border-cobalt/40"
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
                className="w-3.5 h-3.5 text-cobalt border-border rounded-[2px] cursor-pointer mt-0.5 focus:ring-cobalt"
              />
            )}
            <QuestionTypeBadge type={question.type} />
          </div>

          {getDifficultyBadge(question.difficulty)}
        </div>

        <h3 className="font-display text-sm font-semibold text-foreground line-clamp-2 mb-2 leading-snug">
          {question.title}
        </h3>

        <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px] text-muted-foreground mb-3">
          <span className="font-semibold text-cobalt">{question.topic || question.subject}</span>
          <span>/</span>
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
                className={`p-2 rounded-[2px] border flex items-center justify-between ${
                  opt.isCorrect
                    ? "border-cobalt/40 bg-cobalt/5 text-foreground font-semibold"
                    : "border-border bg-background/50 text-muted-foreground"
                }`}
              >
                <span className="truncate">{opt.text}</span>
                {opt.isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-cobalt shrink-0 ml-1" />}
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
              className="h-7 w-7 rounded-[2px] text-coral hover:bg-coral/10"
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
