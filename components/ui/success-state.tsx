import React from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface SuccessStateProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function SuccessState({
  title,
  description,
  actionLabel,
  onAction,
  className,
}: SuccessStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 min-h-[220px]",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center mb-4 shadow-sm">
        <CheckCircle2 className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 max-w-md">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5 bg-rose-600 hover:bg-rose-700 text-white">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
