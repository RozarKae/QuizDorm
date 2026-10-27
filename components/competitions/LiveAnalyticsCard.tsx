import { Activity,Clock,Target,Users } from "lucide-react";

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
    <div className="bg-[#140C0E] p-6 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-4">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center justify-between">
        <span className="flex items-center">
          <Activity className="w-4 h-4 text-[#FF4D6D] mr-2" /> Live Arena Stats
        </span>
        <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
      </h3>

      <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
        <div className="p-3 bg-[#1D1013] rounded-[4px] border border-[rgba(240, 160, 180,0.14)]">
          <Users className="w-4 h-4 text-[#FF758F] mx-auto mb-1" />
          <p className="text-lg font-extrabold text-[#F2F7F3] tabular-nums">{participantCount}</p>
          <p className="text-[10px] text-[#A0AEA5] font-semibold uppercase tracking-wider">Active</p>
        </div>

        <div className="p-3 bg-[#1D1013] rounded-[4px] border border-[rgba(240, 160, 180,0.14)]">
          <Target className="w-4 h-4 text-[#FF4D6D] mx-auto mb-1" />
          <p className="text-lg font-extrabold text-[#FF4D6D] tabular-nums">{accuracyPercentage}%</p>
          <p className="text-[10px] text-[#A0AEA5] font-semibold uppercase tracking-wider">Accuracy</p>
        </div>

        <div className="p-3 bg-[#1D1013] rounded-[4px] border border-[rgba(240, 160, 180,0.14)]">
          <Clock className="w-4 h-4 text-[#FBBF24] mx-auto mb-1" />
          <p className="text-lg font-extrabold text-[#FBBF24] tabular-nums">{averageResponseTimeSec}s</p>
          <p className="text-[10px] text-[#A0AEA5] font-semibold uppercase tracking-wider">Speed</p>
        </div>
      </div>
    </div>
  );
}
