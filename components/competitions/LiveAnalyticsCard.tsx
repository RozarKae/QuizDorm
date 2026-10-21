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
    <div className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-4">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center justify-between">
        <span className="flex items-center">
          <Activity className="w-4 h-4 text-[#65F59A] mr-2" /> Live Telemetry Stream
        </span>
        <span className="w-2 h-2 rounded-full bg-[#65F59A] animate-pulse" />
      </h3>

      <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
        <div className="p-3 bg-[#111B17] rounded-[4px] border border-[rgba(160,190,170,0.14)]">
          <Users className="w-4 h-4 text-[#38D9B0] mx-auto mb-1" />
          <p className="text-lg font-extrabold text-[#F2F7F3] tabular-nums">{participantCount}</p>
          <p className="text-[10px] text-[#A0AEA5] font-semibold uppercase tracking-wider">Active</p>
        </div>

        <div className="p-3 bg-[#111B17] rounded-[4px] border border-[rgba(160,190,170,0.14)]">
          <Target className="w-4 h-4 text-[#65F59A] mx-auto mb-1" />
          <p className="text-lg font-extrabold text-[#65F59A] tabular-nums">{accuracyPercentage}%</p>
          <p className="text-[10px] text-[#A0AEA5] font-semibold uppercase tracking-wider">Accuracy</p>
        </div>

        <div className="p-3 bg-[#111B17] rounded-[4px] border border-[rgba(160,190,170,0.14)]">
          <Clock className="w-4 h-4 text-[#FBBF24] mx-auto mb-1" />
          <p className="text-lg font-extrabold text-[#FBBF24] tabular-nums">{averageResponseTimeSec}s</p>
          <p className="text-[10px] text-[#A0AEA5] font-semibold uppercase tracking-wider">Speed</p>
        </div>
      </div>
    </div>
  );
}
