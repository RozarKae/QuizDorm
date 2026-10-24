"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Minimal & Subtle Multi-Spectral Neon Cursor Glow
 * Provides an understated, whisper-soft ambient glow trailing the cursor:
 * - Neon Yellow (#FFE600)
 * - Neon Orange (#FF7700)
 * - Neon Red    (#FF0055)
 * - Neon Blue   (#00F0FF)
 * - Neon Green  (#FF4D6D)
 * Tuned with feather-soft diffusion (blur: 40px) and minimal opacity (2% - 4%)
 * so text and UI remain crystal clear without visual clutter.
 */
export default function MouseGlow() {
  const [mounted, setMounted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const glowRef = useRef<HTMLDivElement>(null);
  const targetPos = useRef({ x: -1000, y: -1000 });
  const currentPos = useRef({ x: -1000, y: -1000 });
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    // Only engage on devices with fine pointer (mouse/trackpad), skip touch screens
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    setMounted(true);

    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Smooth lerp loop (60-120fps) for fluid, minimal cursor follower
    const renderLoop = () => {
      const lerpFactor = 0.12;
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * lerpFactor;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * lerpFactor;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${currentPos.current.x}px, ${currentPos.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(renderLoop);
    };

    rafId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isVisible]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-10 transition-opacity duration-700 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Centered Tracker Container (Minimal 260px profile) */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 -ml-[130px] -mt-[130px] w-[260px] h-[260px] will-change-transform"
      >
        {/* Subtle, Minimal Multi-Spectral Radial Halo */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isClicking ? "scale-110 opacity-60" : "scale-100 opacity-40"
          }`}
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 230, 0, 0.04) 0%,
              rgba(255, 119, 0, 0.03) 22%,
              rgba(255, 0, 85, 0.025) 42%,
              rgba(0, 240, 255, 0.03) 62%,
              rgba(255, 77, 109, 0.02) 82%,
              transparent 100%
            )`,
            filter: "blur(36px)",
          }}
        />

        {/* Feather-Soft Core Shimmer */}
        <div
          className="absolute inset-[85px] rounded-full opacity-30"
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.06) 0%,
              rgba(0, 240, 255, 0.035) 45%,
              rgba(255, 77, 109, 0.02) 75%,
              transparent 100%
            )`,
            filter: "blur(16px)",
          }}
        />
      </div>
    </div>
  );
}
