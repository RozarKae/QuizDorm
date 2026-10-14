import React from "react";
import { BarChart3 } from "lucide-react";

interface BarChartWidgetProps {
  title: string;
  data: { label: string; value: number; color?: string }[];
}

export function BarChartWidget({ title, data }: BarChartWidgetProps) {
  const maxVal = Math.max(...data.map((d) => d.value), 100);

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center justify-between">
        <span>{title}</span>
        <BarChart3 className="w-4 h-4 text-indigo-600" />
      </h3>

      <div className="space-y-3 pt-2">
        {data.map((item, idx) => {
          const widthPct = Math.round((item.value / maxVal) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                <span className="text-indigo-600 font-mono">{item.value}%</span>
              </div>
              <div className="h-2.5 w-full bg-gray-100 dark:bg-gray-900 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${widthPct}%`,
                    backgroundColor: item.color || "#4F46E5",
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
