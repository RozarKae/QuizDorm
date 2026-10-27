"use client";

import { soundEngine } from "@/lib/audio/soundEngine";
import { useCallback,useEffect,useState } from "react";

export function useSound() {
  const [enabled, setEnabled] = useState<boolean>(() => soundEngine.isSoundEnabled());
  const [volume, setVolumeState] = useState<number>(() => soundEngine.getVolume());

  useEffect(() => {
    const handleStateChange = (e: Event) => {
      const custom = e as CustomEvent<{ enabled: boolean; volume: number }>;
      if (custom.detail) {
        setEnabled(custom.detail.enabled);
        setVolumeState(custom.detail.volume);
      }
    };

    window.addEventListener("quizdorm-sound-state-change", handleStateChange);
    return () => {
      window.removeEventListener("quizdorm-sound-state-change", handleStateChange);
    };
  }, []);

  const toggleSound = useCallback(() => {
    const next = !soundEngine.isSoundEnabled();
    soundEngine.setSoundEnabled(next);
    setEnabled(next);
    if (next) {
      soundEngine.play("toggle_on");
    } else {
      soundEngine.play("toggle_off");
    }
  }, []);

  const setVolume = useCallback((val: number) => {
    soundEngine.setVolume(val);
    setVolumeState(val);
  }, []);

  const playTap = useCallback(() => soundEngine.play("tap"), []);
  const playHover = useCallback(() => soundEngine.play("hover"), []);
  const playCorrect = useCallback(() => soundEngine.play("correct"), []);
  const playError = useCallback(() => soundEngine.play("error"), []);
  const playTick = useCallback(() => soundEngine.play("tick"), []);
  const playRankSwap = useCallback(() => soundEngine.play("rank_swap"), []);
  const playFanfare = useCallback(() => soundEngine.play("fanfare"), []);

  return {
    isSoundEnabled: enabled,
    volume,
    toggleSound,
    setVolume,
    playTap,
    playHover,
    playCorrect,
    playError,
    playTick,
    playRankSwap,
    playFanfare,
  };
}
