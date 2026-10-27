"use client";

import { ChildProfile } from "@/lib/types/parent";
import { Users } from "lucide-react";

interface ChildSwitcherCardProps {
  childrenList: ChildProfile[];
  activeChildId: string;
  onSelectChild: (id: string) => void;
}

export function ChildSwitcherCard({ childrenList, activeChildId, onSelectChild }: ChildSwitcherCardProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center">
          <Users className="w-4 h-4 text-indigo-600 mr-1.5" /> Linked Student Profiles ({childrenList.length})
        </h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        {childrenList.map((c) => {
          const isSel = c.id === activeChildId;

          return (
            <div
              key={c.id}
              onClick={() => onSelectChild(c.id)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                isSel
                  ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/30 ring-2 ring-indigo-500/20 shadow-md"
                  : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:border-gray-300"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs">
                    {c.name.substring(0, 2)}
                  </div>
                  <div>
                    <span className="font-bold text-gray-900 dark:text-white block">{c.name}</span>
                    <span className="text-[10px] text-gray-500">{c.grade}</span>
                  </div>
                </div>
                {isSel && (
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase bg-indigo-600 text-white">
                    Active
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono pt-2 border-t border-gray-100 dark:border-gray-800 text-gray-500">
                <span>Score: <strong className="text-rose-600">{c.overallPerformancePercent}%</strong></span>
                <span>Streak: <strong className="text-amber-500">{c.currentStreak} Days 🔥</strong></span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
