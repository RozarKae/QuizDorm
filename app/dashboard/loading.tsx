import React from "react";

export default function DashboardLoading() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto animate-pulse text-[#A0AEA5]">
      {/* Header skeleton */}
      <div className="border border-[rgba(240, 160, 180,0.14)] bg-[#140C0E] p-6 rounded-[8px] space-y-4">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
          <div className="h-2.5 w-36 bg-[#2A141A] rounded-[2px]" />
        </div>
        <div className="h-8 w-72 bg-[#2A141A] rounded-[4px]" />
        <div className="h-3.5 w-96 max-w-full bg-[#1D1013] rounded-[2px]" />

        {/* Metric tiles skeleton */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t border-[rgba(240, 160, 180,0.1)]">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="h-20 bg-[#1D1013] rounded-[4px] border border-[rgba(240, 160, 180,0.08)] p-3 space-y-2 flex flex-col justify-between"
            >
              <div className="h-2 w-16 bg-[#2A141A] rounded-[2px]" />
              <div className="h-6 w-20 bg-[#2A141A] rounded-[2px]" />
            </div>
          ))}
        </div>
      </div>

      {/* Action matrix skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-32 bg-[#140C0E] rounded-[8px] border border-[rgba(240, 160, 180,0.1)] p-5 space-y-3"
          >
            <div className="h-8 w-8 rounded-[4px] bg-[#2A141A]" />
            <div className="h-4 w-40 bg-[#2A141A] rounded-[2px]" />
            <div className="h-3 w-full bg-[#1D1013] rounded-[2px]" />
          </div>
        ))}
      </div>
    </div>
  );
}
