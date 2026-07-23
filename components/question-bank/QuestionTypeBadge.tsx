import React from "react";
import { QuestionType } from "@/lib/types/question";
import { Badge } from "@/components/ui/badge";

interface QuestionTypeBadgeProps {
  type: QuestionType;
}

export function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  const typeMap: Record<QuestionType, { label: string; className: string }> = {
    mcq_single: { label: "MCQ Single", className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300" },
    mcq_multiple: { label: "MCQ Multi", className: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300" },
    true_false: { label: "True / False", className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300" },
    fill_in_the_blank: { label: "Fill in Blank", className: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" },
    match_following: { label: "Matching", className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" },
    sequence_ordering: { label: "Sequence", className: "bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300" },
    image_based: { label: "Image Based", className: "bg-pink-100 text-pink-700 dark:bg-pink-950 dark:text-pink-300" },
  };

  const config = typeMap[type] || { label: type, className: "bg-gray-100 text-gray-700" };

  return <Badge className={`text-[11px] font-semibold ${config.className}`}>{config.label}</Badge>;
}
