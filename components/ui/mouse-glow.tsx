"use client";

import React, { useEffect, useRef, useState } from "react";

/**
 * Multi-Spectral Neon Mouse Glow
 * Features interactive cursor following with a 5-color neon spectrum:
 * - Neon Yellow (#FFE600)
 * - Neon Orange (#FF7700)
 * - Neon Red    (#FF0055)
 * - Neon Blue   (#00F0FF)
 * - Neon Green  (#39FF14)
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

    // Smooth lerp loop (60-120fps) for fluid cursor follower
    const renderLoop = () => {
      const lerpFactor = 0.14;
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
      className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden="true"
    >
      {/* Centered Tracker Container */}
      <div
        ref={glowRef}
        className="absolute top-0 left-0 -ml-[250px] -mt-[250px] w-[500px] h-[500px] will-change-transform"
      >
        {/* Layer 1: Ambient Broad Neon Spectrum Dispersion */}
        <div
          className={`absolute inset-0 rounded-full transition-all duration-300 ${
            isClicking ? "scale-125 opacity-90" : "scale-100 opacity-70"
          }`}
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 230, 0, 0.12) 0%,
              rgba(255, 119, 0, 0.10) 20%,
              rgba(255, 0, 85, 0.08) 38%,
              rgba(0, 240, 255, 0.08) 58%,
              rgba(57, 255, 20, 0.06) 75%,
              transparent 100%
            )`,
            filter: "blur(28px)",
          }}
        />

        {/* Layer 2: Rotating Multi-Color Chromatic Neon Vortex */}
        <div
          className="absolute inset-[80px] rounded-full animate-aurora-spin"
          style={{
            background: `conic-gradient(
              from 0deg,
              rgba(255, 230, 0, 0.22) 0deg,    /* Neon Yellow */
              rgba(255, 119, 0, 0.20) 72deg,   /* Neon Orange */
              rgba(255, 0, 85, 0.22) 144deg,   /* Neon Red */
              rgba(0, 240, 255, 0.22) 216deg,  /* Neon Blue */
              rgba(57, 255, 20, 0.22) 288deg,  /* Neon Green */
              rgba(255, 230, 0, 0.22) 360deg
            )`,
            filter: "blur(32px)",
          }}
        />

        {/* Layer 3: Concentrated Precision Core Aura */}
        <div
          className={`absolute inset-[180px] rounded-full transition-transform duration-200 ${
            isClicking ? "scale-150 animate-ping" : "scale-100"
          }`}
          style={{
            background: `radial-gradient(
              circle at center,
              rgba(255, 255, 255, 0.4) 0%,
              rgba(255, 230, 0, 0.35) 25%,
              rgba(0, 240, 255, 0.25) 55%,
              rgba(57, 255, 20, 0.2) 80%,
              transparent 100%
            )`,
            filter: "blur(12px)",
          }}
        />
      </div>
    </div>
  );
}
