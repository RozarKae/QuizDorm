"use client";

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
  void variant;
  return (
    <div className={cn("relative py-12 flex items-center justify-center max-w-7xl mx-auto px-4", className)}>
      <div className="w-full h-px bg-border" />
      {label ? (
        <span className="absolute bg-background px-3 py-0.5 font-mono text-[9px] uppercase tracking-widest text-slate-500 dark:text-[#A0AEA5] border border-border rounded-full shadow-xs">
          {label}
        </span>
      ) : (
        <div className="absolute flex items-center space-x-1.5 bg-background px-2 text-muted-foreground">
          <span className="font-mono text-[10px]">+</span>
        </div>
      )}
    </div>
  );
}
