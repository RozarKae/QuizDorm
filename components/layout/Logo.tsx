import React from "react";
import Image from "next/image";

export function OfficialEmblem({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`relative ${className} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
      <Image
        src="/official-logo.png"
        alt="QuizDorm Official 3D Emblem"
        width={64}
        height={64}
        className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(101,245,154,0.45)]"
        priority
      />
    </div>
  );
}

export default function Logo({
  className = "",
  showWordmark = true,
  iconSize = "w-7 h-7",
}: {
  className?: string;
  showWordmark?: boolean;
  iconSize?: string;
}) {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      <OfficialEmblem className={iconSize} />

      {showWordmark && (
        <div className="flex items-baseline">
          <span className="font-display font-bold text-base tracking-tight text-[#F2F7F3] uppercase">
            QUIZ<span className="text-[#65F59A]">DORM</span>
          </span>
          <span className="inline-block w-1 h-1 bg-[#65F59A] ml-1 rounded-full animate-pulse" />
        </div>
      )}
    </div>
  );
}
