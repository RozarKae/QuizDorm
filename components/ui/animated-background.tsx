"use client";

import React from "react";

/**
 * Editorial Intelligence Background Texture
 * Replaces neon aurora blobs with a subtle, high-precision architectural grid texture.
 */
export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-background">
      {/* Editorial Fine Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.045]"
        style={{
          backgroundImage: `
            linear-gradient(to right, currentColor 1px, transparent 1px),
            linear-gradient(to bottom, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />
      {/* Subtle Hairline Border Grid Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-background/50" />
    </div>
  );
}
