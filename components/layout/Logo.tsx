import React from "react";

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Future OS Monogram Icon */}
      <div className="relative flex items-center justify-center w-7 h-7 bg-[#111B17] rounded-[4px] border border-[rgba(160,190,170,0.22)] shadow-xs">
        <span className="font-display font-extrabold text-xs text-[#F2F7F3] tracking-tight">
          QD
        </span>
        <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 bg-[#65F59A] rounded-[1px] shadow-[0_0_6px_#65F59A]" />
      </div>

      {/* Future OS Wordmark */}
      <div className="flex items-baseline">
        <span className="font-display font-bold text-base tracking-tight text-[#F2F7F3] uppercase">
          QUIZ<span className="text-[#65F59A]">DORM</span>
        </span>
        <span className="inline-block w-1 h-1 bg-[#65F59A] ml-1 rounded-full animate-pulse" />
      </div>
    </div>
  );
}
