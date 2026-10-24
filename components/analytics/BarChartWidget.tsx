import React from "react";
import { BarChart3 } from "lucide-react";

interface BarChartWidgetProps {
  title: string;
  data: { label: string; value: number; color?: string }[];
}

export function BarChartWidget({ title, data }: BarChartWidgetProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 100);

  return (
    <div className="bg-[#140C0E] p-6 rounded-2xl border border-[rgba(240, 160, 180,0.14)] space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3]">
          {title}
        </h3>
        <BarChart3 className="w-3.5 h-3.5 text-[#FF4D6D]" />
      </div>

      <div className="space-y-3.5 pt-1">
        {data.map((item, idx) => {
          const widthPct = Math.round((item.value / maxVal) * 100);
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-[#F2F7F3] font-medium text-xs">{item.label}</span>
                <span className="text-[#FF4D6D] font-mono font-bold text-xs">{item.value}%</span>
              </div>
              <div className="h-2 w-full bg-[#1D1013] rounded-full overflow-hidden border border-[rgba(240, 160, 180,0.1)]">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: item.color && item.color.startsWith("#") ? item.color : "#FF4D6D",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

