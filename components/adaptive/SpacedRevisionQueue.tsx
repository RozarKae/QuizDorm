"use client";

import { Button } from "@/components/ui/button";
import { SpacedRepetitionEngine } from "@/lib/adaptive/spacedRepetition";
import { SpacedRevisionItem } from "@/lib/types/adaptive";
import { Check,RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface SpacedRevisionQueueProps {
  items: SpacedRevisionItem[];
  onRefresh?: () => void;
}

export function SpacedRevisionQueue({ items, onRefresh }: SpacedRevisionQueueProps) {
  const handleReview = (itemId: string, rating: number) => {
    SpacedRepetitionEngine.reviewItem(itemId, rating);
    toast.success(`SM-2 Spaced Repetition interval updated!`);
    if (onRefresh) onRefresh();
  };

  const dueItems = items.filter((i) => i.status === "due");

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <RotateCcw className="w-5 h-5 text-indigo-600 mr-2" /> Today&apos;s Spaced Repetition Queue (SM-2 Algorithm)
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Forgetting curve revision queue automatically scheduled for optimal memory retention.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          {dueItems.length} Due Today
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs ${
              item.status === "due"
                ? "bg-amber-50/40 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900"
                : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
            }`}
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-gray-900 dark:text-white">{item.questionTitle}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                  {item.subject}
                </span>
              </div>
              <p className="text-gray-500 font-mono text-[11px]">
                Topic: {item.topic} • Ease Factor: {item.easeFactor} • Reps: {item.repetitionsCount}
              </p>
            </div>

            {item.status === "due" ? (
              <div className="flex items-center space-x-2 shrink-0">
                <Button
                  size="sm"
                  onClick={() => handleReview(item.id, 5)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl h-8"
                >
                  <Check className="w-3.5 h-3.5 mr-1" /> Easy Recall (+6d)
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReview(item.id, 2)}
                  className="text-xs rounded-xl h-8 text-rose-600 border-rose-300"
                >
                  Hard (+1d)
                </Button>
              </div>
            ) : (
              <span className="text-rose-600 font-bold font-mono text-[11px] shrink-0">
                Scheduled for {new Date(item.dueTimestamp).toLocaleDateString()}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
