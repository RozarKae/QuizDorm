"use client";

import React, { useEffect, useState } from "react";

export default function MouseGlow() {
  const [position, setPosition] = useState({ x: -500, y: -500 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isHovered]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
      style={{ opacity: isHovered ? 1 : 0 }}
    >
      <div
        className="absolute w-[600px] h-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.06)_0%,_rgba(16,185,129,0.03)_40%,_transparent_70%)] blur-2xl transition-transform duration-75 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      />
    </div>
  );
}
