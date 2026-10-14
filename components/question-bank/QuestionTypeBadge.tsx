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
    // Phase 2.2 Interactive Types
    hotspot: { label: "Hotspot Target", className: "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300" },
    drag_drop_categorize: { label: "Drag & Drop", className: "bg-teal-100 text-teal-700 dark:bg-teal-950 dark:text-teal-300" },
    diagram_labeling: { label: "Diagram Labeling", className: "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300" },
    timeline_ordering: { label: "Timeline", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-950 dark:text-yellow-300" },
    audio_listening: { label: "Audio Listening", className: "bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300" },
    video_timestamp: { label: "Video Quiz", className: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300" },
    code_snippet: { label: "Code Question", className: "bg-slate-800 text-slate-100 dark:bg-slate-900 dark:text-slate-200" },
    interactive_map: { label: "Map Region", className: "bg-emerald-800 text-emerald-100 dark:bg-emerald-950 dark:text-emerald-200" },
  };

  const config = typeMap[type] || { label: String(type), className: "bg-gray-100 text-gray-700" };

  return <Badge className={`text-[11px] font-semibold ${config.className}`}>{config.label}</Badge>;
}
