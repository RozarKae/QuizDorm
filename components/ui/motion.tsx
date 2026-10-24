"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

/**
 * Project Aurora // Motion Primitives
 * Designed for hardware-accelerated, zero-layout-shift cinematic transitions.
 * Fully respects user reduced-motion preferences.
 */

export interface FadeInProps extends Omit<HTMLMotionProps<"div">, "children"> {
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  children: React.ReactNode;
}

export function FadeIn({
  direction = "up",
  delay = 0,
  duration = 0.5,
  distance = 20,
  children,
  className = "",
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const offsets = {
    up: { y: distance, x: 0 },
    down: { y: -distance, x: 0 },
    left: { x: distance, y: 0 },
    right: { x: -distance, y: 0 },
    none: { x: 0, y: 0 },
  };

  const initialOffset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...initialOffset }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // ease-out-expo
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  staggerDelay?: number;
  delayChildren?: number;
  children: React.ReactNode;
}

export function StaggerContainer({
  staggerDelay = 0.08,
  delayChildren = 0.1,
  children,
  className = "",
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
}

export function StaggerItem({
  children,
  className = "",
  ...props
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.5,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/**
 * Orbital Rings // Abstract geometric sphere representation
 * Lightweight, hardware-accelerated SVG with subtle rotating dashed coordinate arcs.
 */
export function OrbitalRings({ className = "" }: { className?: string }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`relative flex items-center justify-center pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      {/* Multi-spectral neon ambient glow (Yellow, Orange, Red, Blue, Green) */}
      <div 
        className="absolute w-[460px] h-[460px] rounded-full blur-[50px] opacity-75"
        style={{
          background: `conic-gradient(
            from 0deg,
            rgba(255, 230, 0, 0.16) 0deg,   /* Neon Yellow */
            rgba(255, 119, 0, 0.14) 72deg,  /* Neon Orange */
            rgba(255, 0, 85, 0.16) 144deg,  /* Neon Red */
            rgba(0, 240, 255, 0.16) 216deg, /* Neon Blue */
            rgba(255, 77, 109, 0.16) 288deg, /* Neon Green */
            rgba(255, 230, 0, 0.16) 360deg
          )`
        }}
      />

      {/* Outer ring with Neon Yellow & Neon Red satellites */}
      <div
        className={`absolute w-[360px] h-[360px] rounded-full border border-[rgba(255,230,0,0.25)] ${
          shouldReduceMotion ? "" : "animate-aurora-spin"
        }`}
        style={{ borderStyle: "dashed", borderWidth: "1px" }}
      >
        <span className="absolute -top-1.5 left-1/2 w-2.5 h-2.5 rounded-full bg-[#FFE600] shadow-[0_0_12px_#FFE600]" />
        <span className="absolute -bottom-1.5 left-1/4 w-2 h-2 rounded-full bg-[#FF0055] shadow-[0_0_10px_#FF0055]" />
      </div>

      {/* Middle ring with Neon Blue & Neon Orange satellites */}
      <div
        className={`absolute w-[260px] h-[260px] rounded-full border border-[rgba(0,240,255,0.3)] ${
          shouldReduceMotion ? "" : "animate-aurora-spin-reverse"
        }`}
      >
        <span className="absolute -top-1 right-1/4 w-2 h-2 rounded-full bg-[#00F0FF] shadow-[0_0_10px_#00F0FF]" />
        <span className="absolute -bottom-1 left-1/3 w-2 h-2 rounded-full bg-[#FF7700] shadow-[0_0_10px_#FF7700]" />
      </div>

      {/* Inner luminous node with Neon Green radiant core */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-white via-rose-50/50 to-slate-100 dark:from-[#2A141A] dark:via-[#140C0E] dark:to-[#0B0708] border border-rose-400/50 dark:border-[rgba(255, 77, 109,0.4)] shadow-md dark:shadow-[0_0_35px_rgba(255, 77, 109,0.35)] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-[#FF4D6D]/15 border border-[#FF4D6D]/50 flex items-center justify-center">
          <div className="w-3.5 h-3.5 rounded-full bg-[#FF4D6D] shadow-[0_0_18px_#FF4D6D] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
