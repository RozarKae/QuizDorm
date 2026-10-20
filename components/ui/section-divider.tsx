"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "gradient" | "glow" | "curved" | "editorial";
  className?: string;
  label?: string;
}

export default function SectionDivider({
  variant = "editorial",
  className,
  label,
}: SectionDividerProps) {
  return (
    <div className={cn("relative py-12 flex items-center justify-center max-w-7xl mx-auto px-4", className)}>
      <div className="w-full h-px bg-[rgba(160,190,170,0.12)]" />
      {label ? (
        <span className="absolute bg-[#070B0A] px-3 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[#A0AEA5] border border-[rgba(160,190,170,0.15)] rounded-full">
          {label}
        </span>
      ) : (
        <div className="absolute flex items-center space-x-1.5 bg-[#070B0A] px-2 text-[#69786F]">
          <span className="font-mono text-[10px] text-[#69786F]">+</span>
        </div>
      )}
    </div>
  );
}
