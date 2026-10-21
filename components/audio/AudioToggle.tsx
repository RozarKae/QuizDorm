"use client";

import React from "react";
import { Volume2, VolumeX } from "lucide-react";
import { useSound } from "./useSound";
import { Button } from "@/components/ui/button";

interface AudioToggleProps {
  className?: string;
  variant?: "ghost" | "outline";
  showLabel?: boolean;
}

export function AudioToggle({
  className = "",
  variant = "ghost",
  showLabel = false,
}: AudioToggleProps) {
  const { isSoundEnabled, toggleSound } = useSound();

  return (
    <Button
      variant={variant}
      size={showLabel ? "sm" : "icon-xs"}
      onClick={toggleSound}
      className={`font-mono text-xs text-[#A0AEA5] hover:text-[#65F59A] hover:bg-[#111B17] rounded-[4px] transition-colors ${className}`}
      title={isSoundEnabled ? "Mute sound effects" : "Enable sound effects"}
      aria-label={isSoundEnabled ? "Mute sound effects" : "Enable sound effects"}
    >
      {isSoundEnabled ? (
        <Volume2 className="h-3.5 w-3.5 text-[#65F59A]" />
      ) : (
        <VolumeX className="h-3.5 w-3.5 text-[#69786F]" />
      )}
      {showLabel && (
        <span className="ml-1.5 uppercase tracking-wider text-[10px]">
          {isSoundEnabled ? "Sound: On" : "Sound: Off"}
        </span>
      )}
    </Button>
  );
}
