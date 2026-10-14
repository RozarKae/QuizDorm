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
  return (
    <div
      className={`bg-white dark:bg-gray-950 p-6 rounded-2xl border transition-all duration-200 shadow-sm hover:shadow-md flex flex-col justify-between ${
        isSelected ? "border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/20 dark:bg-indigo-950/20" : "border-gray-100 dark:border-gray-850"
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
                className="w-4 h-4 text-indigo-600 rounded cursor-pointer mt-0.5"
              />
            )}
            <QuestionTypeBadge type={question.type} />
          </div>

          <Badge
            className={
              question.difficulty === "Hard"
                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 text-[10px]"
                : question.difficulty === "Medium"
                ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px]"
                : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 text-[10px]"
            }
          >
            {question.difficulty}
          </Badge>
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-2 leading-snug">
          {question.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500 mb-4">
          <span className="font-semibold text-indigo-600 dark:text-indigo-400">{question.topic || question.subject}</span>
          <span>•</span>
          <span>{question.subject}</span>
          {(question.gradeLevel || question.grade) && (
            <>
              <span>•</span>
              <span className="text-slate-500 dark:text-slate-400">{question.gradeLevel || question.grade}</span>
            </>
          )}
          <span>•</span>
          <span className="font-mono">{question.marks} {question.marks === 1 ? "Mark" : "Marks"}</span>
        </div>

        {/* Options summary */}
        {question.options && question.options.length > 0 && (
          <div className="space-y-1.5 mb-4">
            {question.options.slice(0, 3).map((opt) => (
              <div
                key={opt.id}
                className={`text-xs p-2 rounded-xl border flex items-center justify-between ${
                  opt.isCorrect
                    ? "border-emerald-200 bg-emerald-50/50 dark:bg-emerald-950/30 text-emerald-900 dark:text-emerald-100 font-semibold"
                    : "border-gray-100 dark:border-gray-900 text-gray-600 dark:text-gray-400"
                }`}
              >
                <span className="truncate">{opt.text}</span>
                {opt.isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 ml-1" />}
              </div>
            ))}
            {question.options.length > 3 && (
              <span className="text-[11px] text-gray-400 italic">+{question.options.length - 3} more options</span>
            )}
          </div>
        )}

        {/* Tags */}
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 mb-4">
            {question.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-850 text-gray-600 dark:text-gray-300"
              >
                <Tag className="w-2.5 h-2.5 mr-1 text-gray-400" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
        <span className="text-[11px] text-gray-400">Topic: {question.topic}</span>

        <div className="flex items-center space-x-1">
          <Link href={`/dashboard/questions/${question.id}/edit`}>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-indigo-600 hover:bg-indigo-50" title="Edit Question">
              <Edit className="w-4 h-4" />
            </Button>
          </Link>
          {onDelete && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(question.id)}
              className="h-8 w-8 text-red-600 hover:bg-red-50"
              title="Delete Question"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
