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
      <div className="w-full h-px bg-border" />
      {label ? (
        <span className="absolute bg-background px-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground border border-border rounded-[2px]">
          {label}
        </span>
      ) : (
        <div className="absolute flex items-center space-x-1.5 bg-background px-2 text-border">
          <span className="font-mono text-[10px] text-muted-foreground">+</span>
        </div>
      )}
    </div>
  );
}
