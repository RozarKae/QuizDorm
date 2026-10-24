import React from "react";
import { FolderOpen } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ElementType;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  icon: Icon = FolderOpen,
  title,
  description,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-[6px] border border-dashed border-[rgba(240, 160, 180,0.2)] bg-[#140C0E] min-h-[240px]",
        className
      )}
    >
      <div className="w-12 h-12 rounded-[6px] bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(255, 77, 109,0.12)]">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold font-display text-[#F2F7F3]">{title}</h3>
      <p className="mt-1 text-xs text-[#A0AEA5] max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-5 bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono text-xs font-bold rounded-[4px] px-5 h-9 shadow-[0_0_12px_rgba(255, 77, 109,0.18)] transition-all hover:shadow-[0_0_20px_rgba(255, 77, 109,0.28)]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
