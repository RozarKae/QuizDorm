import React from "react";
import { QuestionType } from "@/lib/types/question";
import { Badge } from "@/components/ui/badge";

interface QuestionTypeBadgeProps {
  type: QuestionType;
}

export function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  const typeMap: Record<QuestionType, { label: string; className: string }> = {
    mcq_single: { label: "MCQ Single", className: "bg-cobalt/10 text-cobalt border border-cobalt/30" },
    mcq_multiple: { label: "MCQ Multi", className: "bg-cobalt/10 text-cobalt border border-cobalt/30" },
    true_false: { label: "True / False", className: "bg-muted text-foreground border border-border" },
    fill_in_the_blank: { label: "Fill Blank", className: "bg-muted text-foreground border border-border" },
    match_following: { label: "Matching", className: "bg-muted text-foreground border border-border" },
    sequence_ordering: { label: "Sequence", className: "bg-muted text-foreground border border-border" },
    image_based: { label: "Image Based", className: "bg-muted text-foreground border border-border" },
    // Phase 2.2 Interactive Types
    hotspot: { label: "Hotspot", className: "bg-muted text-foreground border border-border" },
    drag_drop_categorize: { label: "Drag & Drop", className: "bg-muted text-foreground border border-border" },
    diagram_labeling: { label: "Diagram", className: "bg-muted text-foreground border border-border" },
    timeline_ordering: { label: "Timeline", className: "bg-muted text-foreground border border-border" },
    audio_listening: { label: "Audio", className: "bg-muted text-foreground border border-border" },
    video_timestamp: { label: "Video Quiz", className: "bg-muted text-foreground border border-border" },
    code_snippet: { label: "Code", className: "bg-foreground text-background font-mono" },
    interactive_map: { label: "Map Region", className: "bg-muted text-foreground border border-border" },
  };

  const config = typeMap[type] || { label: String(type), className: "bg-muted text-muted-foreground border border-border" };

  return (
    <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold ${config.className}`}>
      {config.label}
    </span>
  );
}
