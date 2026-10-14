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
        "flex flex-col items-center justify-center p-8 text-center rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 min-h-[240px]",
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 shadow-sm">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 max-w-sm">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium">
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
