"use client";

import { TimelineEventItem } from "@/lib/types/media";
import { ArrowDown,ArrowUp,Clock } from "lucide-react";
import { useState } from "react";

interface TimelineViewerProps {
  events: TimelineEventItem[];
  onOrderChange?: (orderedIds: string[]) => void;
}

export function TimelineViewer({ events: initialEvents, onOrderChange }: TimelineViewerProps) {
  const [items, setItems] = useState<TimelineEventItem[]>(initialEvents);

  const moveItem = (index: number, direction: "up" | "down") => {
    const next = [...items];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= next.length) return;

    const temp = next[index];
    next[index] = next[targetIdx];
    next[targetIdx] = temp;

    setItems(next);
    if (onOrderChange) onOrderChange(next.map((i) => i.id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span className="font-bold text-gray-900 dark:text-white flex items-center">
          <Clock className="w-4 h-4 text-indigo-600 mr-1.5" /> Chronological Timeline Ordering
        </span>
        <span>Arrange events in order from earliest to latest</span>
      </div>

      <div className="space-y-2">
        {items.map((event, idx) => (
          <div
            key={event.id}
            className="p-3.5 rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex items-center justify-between shadow-sm"
          >
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-xl bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 font-extrabold text-xs flex items-center justify-center">
                {idx + 1}
              </div>
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">{event.title}</h4>
                {event.dateOrEra && <span className="text-[10px] text-gray-400 font-mono">{event.dateOrEra}</span>}
              </div>
            </div>

            <div className="flex items-center space-x-1">
              <button
                type="button"
                disabled={idx === 0}
                onClick={() => moveItem(idx, "up")}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-30"
              >
                <ArrowUp className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
              </button>
              <button
                type="button"
                disabled={idx === items.length - 1}
                onClick={() => moveItem(idx, "down")}
                className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 disabled:opacity-30"
              >
                <ArrowDown className="w-3.5 h-3.5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
