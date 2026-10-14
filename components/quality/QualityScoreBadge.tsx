"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Award, AlertTriangle, CheckCircle2 } from "lucide-react";

interface QualityScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
}

export function QualityScoreBadge({ score, size = "md" }: QualityScoreBadgeProps) {
  let colorStyle = "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-300";
  let icon = <CheckCircle2 className="w-3.5 h-3.5 mr-1" />;

  if (score < 60) {
    colorStyle = "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-300";
    icon = <AlertTriangle className="w-3.5 h-3.5 mr-1" />;
  } else if (score < 80) {
    colorStyle = "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-300";
    icon = <Award className="w-3.5 h-3.5 mr-1" />;
  }

  const sizeClasses =
    size === "sm"
      ? "px-2 py-0.5 text-[10px]"
      : size === "lg"
      ? "px-3 py-1 text-sm font-extrabold"
      : "px-2.5 py-1 text-xs font-bold";

  return (
    <span className={`inline-flex items-center rounded-full border ${colorStyle} ${sizeClasses}`}>
      {icon}
      <span>Quality Score: {score}/100</span>
    </span>
  );
}
