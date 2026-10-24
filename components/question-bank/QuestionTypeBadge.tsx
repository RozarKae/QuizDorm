import React from "react";
import { QuestionType } from "@/lib/types/question";
import { Badge } from "@/components/ui/badge";

interface QuestionTypeBadgeProps {
  type: QuestionType;
}

export function QuestionTypeBadge({ type }: QuestionTypeBadgeProps) {
  const typeMap: Record<QuestionType, { label: string; className: string }> = {
    mcq_single: { label: "MCQ Single", className: "bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)]" },
    mcq_multiple: { label: "MCQ Multi", className: "bg-[rgba(255, 117, 143,0.12)] text-[#FF758F] border border-[rgba(255, 117, 143,0.3)]" },
    true_false: { label: "True / False", className: "bg-[#1D1013] text-[#F2F7F3] border border-[rgba(240, 160, 180,0.18)]" },
    fill_in_the_blank: { label: "Fill Blank", className: "bg-[#1D1013] text-[#FF758F] border border-[rgba(255, 117, 143,0.25)]" },
    match_following: { label: "Matching", className: "bg-[#1D1013] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]" },
    sequence_ordering: { label: "Sequence", className: "bg-[#1D1013] text-[#FF758F] border border-[rgba(255, 117, 143,0.25)]" },
    drag_drop_categorize: { label: "Drag & Drop", className: "bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)]" },
    error_spotting: { label: "Error Spotting", className: "bg-amber-500/10 text-amber-400 border border-amber-500/30" },
    assertion_reasoning: { label: "Assertion & Reason", className: "bg-purple-500/10 text-purple-400 border border-purple-500/30" },
    image_based: { label: "Image Based", className: "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.16)]" },
    // Interactive Types
    hotspot: { label: "Hotspot", className: "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.16)]" },
    diagram_labeling: { label: "Diagram", className: "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.16)]" },
    timeline_ordering: { label: "Timeline", className: "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.16)]" },
    audio_listening: { label: "Audio", className: "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.16)]" },
    video_timestamp: { label: "Video Quiz", className: "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.16)]" },
    code_snippet: { label: "Code", className: "bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] font-mono" },
    interactive_map: { label: "Map Region", className: "bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.16)]" },
  };

  const config = typeMap[type] || { label: String(type), className: "bg-muted text-muted-foreground border border-border" };

  return (
    <span className={`text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold ${config.className}`}>
      {config.label}
    </span>
  );
}
