import React from "react";
import Image from "next/image";

export function OfficialEmblem({ className = "w-7 h-7" }: { className?: string }) {
  return (
    <div className={`relative ${className} shrink-0 transition-transform duration-300 group-hover:scale-105`}>
      {/* Light Theme 3D Metallic Ruby Emblem */}
      <Image
        src="/official-logo-light.png"
        alt="QuizDorm Official 3D Emblem"
        width={64}
        height={64}
        className="w-full h-full object-contain block dark:hidden drop-shadow-[0_4px_10px_rgba(190,18,60,0.22)]"
        priority
      />
      {/* Dark Theme 3D Glowing Obsidian Crimson Emblem */}
      <Image
        src="/official-logo-dark.png"
        alt="QuizDorm Official 3D Emblem"
        width={64}
        height={64}
        className="w-full h-full object-contain hidden dark:block drop-shadow-[0_0_14px_rgba(255,77,109,0.50)]"
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
          <span className="font-display font-bold text-base tracking-tight text-[#0F172A] dark:text-[#F2F7F3] uppercase transition-colors">
            QUIZ<span className="text-[#BE123C] dark:text-[#FF4D6D] transition-colors">DORM</span>
          </span>
          <span className="inline-block w-1 h-1 bg-[#BE123C] dark:bg-[#FF4D6D] ml-1 rounded-full animate-pulse transition-colors" />
        </div>
      )}
    </div>
  );
}
