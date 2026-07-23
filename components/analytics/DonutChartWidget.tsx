import React from "react";

interface DonutChartWidgetProps {
  title: string;
  slices: { label: string; value: number; color: string }[];
}

export function DonutChartWidget({ title, slices }: DonutChartWidgetProps) {
  const total = slices.reduce((sum, s) => sum + s.value, 0) || 1;

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4 text-center">
      <h3 className="text-sm font-bold text-gray-900 dark:text-white text-left">{title}</h3>

      <div className="relative w-36 h-36 mx-auto flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-90">
          {slices.map((slice, idx) => {
            const pct = slice.value / total;
            const strokeDasharray = `${pct * 282} 282`;
            return (
              <circle
                key={idx}
                cx="72"
                cy="72"
                r="45"
                fill="transparent"
                stroke={slice.color}
                strokeWidth="12"
                strokeDasharray={strokeDasharray}
                className="transition-all duration-700"
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-gray-900 dark:text-white font-mono">{total}</span>
          <span className="text-[10px] text-gray-400 font-semibold">Total Ratio</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-left pt-2 border-t border-gray-100 dark:border-gray-900">
        {slices.map((slice, idx) => (
          <div key={idx} className="flex items-center space-x-2 text-xs">
            <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: slice.color }} />
            <span className="text-gray-600 dark:text-gray-400 font-medium truncate">{slice.label}</span>
            <span className="font-bold text-gray-900 dark:text-white ml-auto">{slice.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
