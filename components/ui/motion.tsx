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
      {/* Outer ambient glow */}
      <div className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(101,245,154,0.12)_0%,transparent_70%)] blur-[40px]" />

      {/* Outer ring */}
      <div
        className={`absolute w-[360px] h-[360px] rounded-full border border-[rgba(101,245,154,0.14)] ${
          shouldReduceMotion ? "" : "animate-aurora-spin"
        }`}
        style={{ borderStyle: "dashed", borderWidth: "1px" }}
      >
        <span className="absolute -top-1 left-1/2 w-2 h-2 rounded-full bg-[#65F59A] shadow-[0_0_10px_#65F59A]" />
      </div>

      {/* Middle ring */}
      <div
        className={`absolute w-[260px] h-[260px] rounded-full border border-[rgba(56,217,176,0.18)] ${
          shouldReduceMotion ? "" : "animate-aurora-spin-reverse"
        }`}
      >
        <span className="absolute -bottom-1 right-1/4 w-1.5 h-1.5 rounded-full bg-[#38D9B0] shadow-[0_0_8px_#38D9B0]" />
      </div>

      {/* Inner luminous node */}
      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-[#17251E] to-[#070B0A] border border-[rgba(101,245,154,0.35)] shadow-[0_0_35px_rgba(101,245,154,0.25)] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-[#65F59A]/15 border border-[#65F59A]/40 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-[#65F59A] shadow-[0_0_15px_#65F59A] animate-pulse" />
        </div>
      </div>
    </div>
  );
}
