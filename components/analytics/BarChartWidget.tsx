import React from "react";
import { BarChart3 } from "lucide-react";

interface BarChartWidgetProps {
  title: string;
  data: { label: string; value: number; color?: string }[];
}

export function BarChartWidget({ title, data }: BarChartWidgetProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 100);

  return (
    <div className="bg-card p-6 rounded-[3px] border border-border space-y-4">
      <div className="flex items-center justify-between border-b border-border pb-3">
        <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground">
          {title}
        </h3>
        <BarChart3 className="w-3.5 h-3.5 text-[#2855F5]" />
      </div>

      <div className="space-y-3 pt-1">
        {data.map((item, idx) => {
          const widthPct = Math.round((item.value / maxVal) * 100);
          return (
            <div key={idx} className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-foreground font-medium text-xs">{item.label}</span>
                <span className="text-[#2855F5] font-mono font-bold text-xs">{item.value}%</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-[2px] overflow-hidden border border-border/50">
                <div
                  className="h-full rounded-[1px] transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: item.color || "#2855F5",
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

