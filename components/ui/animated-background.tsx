"use client";

import React, { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Tiny floating particle system
    const particleCount = 45;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.5,
      speedX: (Math.random() - 0.5) * 0.2,
      speedY: (Math.random() - 0.5) * 0.2 - 0.05,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[#09090B]">
      {/* Dark Mesh Gradient Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-[#09090B] to-[#09090B]" />

      {/* Large Blurred Blue Glow Blob */}
      <div className="absolute -top-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-blue-600/15 blur-[140px] animate-aurora-1" />

      {/* Large Blurred Emerald Glow Blob */}
      <div className="absolute top-[40%] -right-[10%] w-[650px] h-[650px] rounded-full bg-emerald-500/10 blur-[160px] animate-aurora-2" />

      {/* Additional Secondary Glow */}
      <div className="absolute -bottom-[20%] left-[25%] w-[700px] h-[700px] rounded-full bg-indigo-600/10 blur-[150px] animate-aurora-1" />

      {/* Subtle Grid Texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* Tiny Floating Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />

      {/* Soft Vignette Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#09090B_100%)] opacity-70" />
    </div>
  );
}
