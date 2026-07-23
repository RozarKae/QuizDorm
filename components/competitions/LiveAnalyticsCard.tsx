import React from "react";
import { Activity, Clock, Target, Users } from "lucide-react";

interface LiveAnalyticsCardProps {
  participantCount: number;
  accuracyPercentage?: number;
  averageResponseTimeSec?: number;
}

export function LiveAnalyticsCard({
  participantCount,
  accuracyPercentage = 78,
  averageResponseTimeSec = 12.4,
}: LiveAnalyticsCardProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center">
        <Activity className="w-4 h-4 text-indigo-600 mr-2" /> Live Analytics Stream
      </h3>

      <div className="grid grid-cols-3 gap-3 text-center">
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/50">
          <Users className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-indigo-900 dark:text-indigo-100">{participantCount}</p>
          <p className="text-[10px] text-gray-400 font-medium">Active Room</p>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
          <Target className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-emerald-900 dark:text-emerald-100">{accuracyPercentage}%</p>
          <p className="text-[10px] text-gray-400 font-medium">Accuracy</p>
        </div>

        <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-2xl border border-amber-100 dark:border-amber-900/50">
          <Clock className="w-5 h-5 text-amber-600 mx-auto mb-1" />
          <p className="text-lg font-extrabold text-amber-900 dark:text-amber-100">{averageResponseTimeSec}s</p>
          <p className="text-[10px] text-gray-400 font-medium">Avg Speed</p>
        </div>
      </div>
    </div>
  );
}
