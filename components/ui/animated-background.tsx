"use client";

import React from "react";

/**
 * Multi-Spectral Neon Ambient Texture
 * Creates a rich, cinematic atmosphere incorporating:
 * - Neon Yellow (#FFE600)
 * - Neon Blue   (#00F0FF)
 * - Neon Green  (#39FF14)
 * - Neon Red    (#FF0055)
 * - Neon Orange (#FF7700)
 * Carefully balanced with dark charcoal surfaces for high contrast and executive legibility.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#070B0A]" aria-hidden="true">
      {/* 1. Neon Green Center-Top Aurora Wave */}
      <div 
        className="absolute top-[-10%] left-[20%] w-[60vw] h-[45vh] rounded-full opacity-40 animate-aurora-float"
        style={{
          background: "radial-gradient(ellipse at center, rgba(57, 255, 20, 0.10) 0%, rgba(101, 245, 154, 0.04) 50%, transparent 75%)",
          filter: "blur(60px)",
        }}
      />

      {/* 2. Neon Blue Top-Left Celestial Nebula */}
      <div 
        className="absolute top-[-5%] left-[-10%] w-[50vw] h-[55vh] rounded-full opacity-35 animate-aurora-pulse"
        style={{
          background: "radial-gradient(circle at center, rgba(0, 240, 255, 0.11) 0%, rgba(0, 112, 243, 0.04) 55%, transparent 75%)",
          filter: "blur(70px)",
          animationDelay: "1s",
        }}
      />

      {/* 3. Neon Yellow Top-Right Solar Luminescence */}
      <div 
        className="absolute top-[5%] right-[-5%] w-[45vw] h-[50vh] rounded-full opacity-30 animate-aurora-float"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 230, 0, 0.09) 0%, rgba(255, 190, 0, 0.03) 50%, transparent 75%)",
          filter: "blur(65px)",
          animationDelay: "2.5s",
        }}
      />

      {/* 4. Neon Orange Mid-Right Warm Aura */}
      <div 
        className="absolute top-[45%] right-[5%] w-[40vw] h-[45vh] rounded-full opacity-25 animate-aurora-pulse"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 119, 0, 0.09) 0%, rgba(255, 80, 0, 0.03) 55%, transparent 80%)",
          filter: "blur(80px)",
          animationDelay: "3.5s",
        }}
      />

      {/* 5. Neon Red Bottom-Left Electric Energy */}
      <div 
        className="absolute bottom-[-10%] left-[-5%] w-[55vw] h-[50vh] rounded-full opacity-30 animate-aurora-float"
        style={{
          background: "radial-gradient(circle at center, rgba(255, 0, 85, 0.10) 0%, rgba(200, 0, 60, 0.03) 50%, transparent 75%)",
          filter: "blur(75px)",
          animationDelay: "1.8s",
        }}
      />

      {/* Rotating Multi-Color Conic Spectrum Substrate */}
      <div 
        className="absolute top-[25%] left-[25%] w-[50vw] h-[50vh] rounded-full opacity-15 animate-aurora-spin"
        style={{
          background: `conic-gradient(
            from 180deg,
            rgba(255, 230, 0, 0.12) 0deg,   /* Yellow */
            rgba(255, 119, 0, 0.10) 72deg,  /* Orange */
            rgba(255, 0, 85, 0.12) 144deg,  /* Red */
            rgba(0, 240, 255, 0.12) 216deg, /* Blue */
            rgba(57, 255, 20, 0.12) 288deg, /* Green */
            rgba(255, 230, 0, 0.12) 360deg
          )`,
          filter: "blur(90px)",
        }}
      />

      {/* Fine Geometric Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(160, 210, 180, 0.4) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(160, 210, 180, 0.4) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette Edge Falloff */}
      <div 
        className="absolute inset-0" 
        style={{
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(7, 11, 10, 0.65) 100%)",
        }}
      />
    </div>
  );
}
