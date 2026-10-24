"use client";

import React from "react";

/**
 * Multi-Spectral Neon Ambient Texture (Minimal & Subtle)
 * Creates a quiet, cinematic background atmosphere:
 * - Neon Yellow (#FFE600)
 * - Neon Blue   (#00F0FF)
 * - Neon Green  (#FF4D6D)
 * - Neon Red    (#FF0055)
 * - Neon Orange (#FF7700)
 * Tuned with minimal opacity and high blur for maximum text contrast and elegance.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background transition-colors duration-300 dark:opacity-100 opacity-60" aria-hidden="true">
      {/* 1. Neon Crimson Center-Top Aurora Wave */}
      <div 
        className="absolute top-[-10%] left-[20%] w-[60vw] h-[45vh] rounded-full opacity-25 animate-aurora-float"
        style={{
          background: "radial-gradient(ellipse at center, rgba(255, 77, 109, 0.06) 0%, rgba(255, 117, 143, 0.02) 50%, transparent 75%)",
          filter: "blur(70px)",
        }}
      />

      {/* 2. Neon Blue Top-Left Celestial Nebula */}
      <div 
        className="absolute top-[-5%] left-[-10%] w-[50vw] h-[55vh] rounded-full opacity-20 animate-aurora-pulse"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 240, 255, 0.06) 0%, rgba(0, 112, 243, 0.02) 55%, transparent 75%)",
          filter: "blur(80px)",
          animationDelay: "1s",
        }}
      />

      {/* 3. Neon Yellow Top-Right Solar Luminescence */}
      <div 
        className="absolute top-[5%] right-[-5%] w-[45vw] h-[50vh] rounded-full opacity-20 animate-aurora-float"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 230, 0, 0.05) 0%, rgba(255, 190, 0, 0.02) 50%, transparent 75%)",
          filter: "blur(75px)",
          animationDelay: "2.5s",
        }}
      />

      {/* 4. Neon Orange Mid-Right Warm Aura */}
      <div 
        className="absolute top-[45%] right-[5%] w-[40vw] h-[45vh] rounded-full opacity-18 animate-aurora-pulse"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 119, 0, 0.05) 0%, rgba(255, 80, 0, 0.02) 55%, transparent 80%)",
          filter: "blur(85px)",
          animationDelay: "3.5s",
        }}
      />

      {/* 5. Neon Red Bottom-Left Electric Energy */}
      <div 
        className="absolute bottom-[-10%] left-[-5%] w-[55vw] h-[50vh] rounded-full opacity-20 animate-aurora-float"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 0, 85, 0.05) 0%, rgba(200, 0, 60, 0.02) 50%, transparent 75%)",
          filter: "blur(80px)",
          animationDelay: "1.8s",
        }}
      />

      {/* Subdued Conic Spectrum Substrate */}
      <div 
        className="absolute top-[25%] left-[25%] w-[50vw] h-[50vh] rounded-full opacity-[0.06] animate-aurora-spin"
        style={{
          background: `conic-gradient(
            from 180deg,
            rgba(255, 230, 0, 0.08) 0deg,   /* Yellow */
            rgba(255, 119, 0, 0.06) 72deg,  /* Orange */
            rgba(255, 0, 85, 0.08) 144deg,  /* Red */
            rgba(0, 240, 255, 0.08) 216deg, /* Blue */
            rgba(255, 77, 109, 0.08) 288deg, /* Crimson */
            rgba(255, 230, 0, 0.08) 360deg
          )`,
          filter: "blur(100px)",
        }}
      />

      {/* Fine Geometric Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(240, 160, 180, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(240, 160, 180, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette Edge Falloff */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(11, 7, 8, 0.75) 100%)",
        }}
      />
    </div>
  );
}
