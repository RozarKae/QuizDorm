"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "gradient" | "glow" | "curved";
  className?: string;
}

export default function SectionDivider({
  variant = "gradient",
  className,
}: SectionDividerProps) {
  if (variant === "glow") {
    return (
      <div className={cn("relative py-12 flex items-center justify-center overflow-hidden", className)}>
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute w-48 h-[2px] bg-gradient-to-r from-transparent via-blue-400/80 to-transparent blur-xs" />
        <div className="absolute w-12 h-12 rounded-full bg-blue-500/10 blur-xl" />
      </div>
    );
  }

  if (variant === "curved") {
    return (
      <div className={cn("relative w-full overflow-hidden leading-none z-10 py-6", className)}>
        <svg
          className="relative block w-full h-12 text-[#09090B]"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"
            fill="currentColor"
            fillOpacity="0.3"
          />
          <path
            d="M0,20 C300,100 800,-20 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
            fillOpacity="0.6"
          />
        </svg>
      </div>
    );
  }

  // Default: soft gradient fade
  return (
    <div className={cn("w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-16", className)} />
  );
}
