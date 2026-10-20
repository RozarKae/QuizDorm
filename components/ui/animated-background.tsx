"use client";

import React from "react";

/**
 * Immersive Future OS Ambient Texture
 * Creates a cinematic, deep charcoal atmosphere with fine geometric grid
 * and restrained emerald ambient lighting.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#070B0A]">
      {/* Restrained Top-Center Ambient Emerald Lighting */}
      <div 
        className="absolute inset-0 opacity-60"
        style={{
          background: "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(101, 245, 154, 0.06), transparent 75%)",
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
          background: "radial-gradient(circle at 50% 50%, transparent 40%, rgba(7, 11, 10, 0.7) 100%)",
        }}
      />
    </div>
  );
}
