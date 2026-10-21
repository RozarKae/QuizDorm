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
        "flex flex-col items-center justify-center p-8 text-center rounded-[6px] border border-dashed border-[rgba(160,190,170,0.2)] bg-[#0C1210] min-h-[240px]",
        className
      )}
    >
      <div className="w-12 h-12 rounded-[6px] bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.3)] flex items-center justify-center mb-4 shadow-[0_0_12px_rgba(101,245,154,0.12)]">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold font-display text-[#F2F7F3]">{title}</h3>
      <p className="mt-1 text-xs text-[#A0AEA5] max-w-sm leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button
          onClick={onAction}
          className="mt-5 bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-[4px] px-5 h-9 shadow-[0_0_12px_rgba(101,245,154,0.18)] transition-all hover:shadow-[0_0_20px_rgba(101,245,154,0.28)]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
