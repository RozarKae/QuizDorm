"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Sun, Moon, Laptop, ChevronDown, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSound } from "@/components/audio/useSound";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeToggleProps {
  className?: string;
  variant?: "ghost" | "outline";
  showLabel?: boolean;
}

export function ThemeToggle({
  className = "",
  variant = "ghost",
  showLabel = false,
}: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { playTap } = useSound();
  const containerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [menuOpen]);

  if (!mounted) {
    return (
      <Button
        variant={variant}
        size={showLabel ? "sm" : "icon-xs"}
        className={`font-mono text-xs text-[#A0AEA5] rounded-[4px] opacity-60 ${className}`}
        aria-label="Loading theme toggle"
        disabled
      >
        <Moon className="h-3.5 w-3.5" />
      </Button>
    );
  }

  const handleQuickToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    playTap();
    // 1-click toggles between Light and Dark
    if (resolvedTheme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  const handleSelectTheme = (newTheme: "light" | "dark" | "system") => {
    playTap();
    setTheme(newTheme);
    setMenuOpen(false);
  };

  const isDark = resolvedTheme === "dark";

  return (
    <div className="relative inline-block" ref={containerRef}>
      <div className="flex items-center">
        <Button
          variant={variant}
          size={showLabel ? "sm" : "icon-xs"}
          onClick={handleQuickToggle}
          className={`font-mono text-xs text-[#A0AEA5] hover:text-[#65F59A] hover:bg-[#111B17] rounded-[4px] transition-colors cursor-pointer ${className}`}
          title={`Theme: ${theme || "system"} (Click to switch to ${isDark ? "light" : "dark"})`}
          aria-label="Toggle light and dark theme"
        >
          {theme === "system" ? (
            <Laptop className="h-3.5 w-3.5 text-[#38D9B0]" />
          ) : isDark ? (
            <Moon className="h-3.5 w-3.5 text-[#65F59A]" />
          ) : (
            <Sun className="h-3.5 w-3.5 text-[#F59E0B]" />
          )}

          {showLabel && (
            <span className="ml-1.5 uppercase tracking-wider text-[10px]">
              {theme === "system"
                ? "Theme: Auto"
                : isDark
                ? "Theme: Dark"
                : "Theme: Light"}
            </span>
          )}
        </Button>

        {/* Small dropdown arrow trigger to open System / Light / Dark selector */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-1 text-[#69786F] hover:text-[#F2F7F3] rounded-[2px] transition-colors -ml-1 focus:outline-hidden"
          title="Choose theme (System, Light, Dark)"
          aria-label="Choose theme option"
        >
          <ChevronDown className="h-2.5 w-2.5" />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-1.5 w-36 rounded-[5px] border border-[rgba(160,190,170,0.22)] bg-[#111B17] shadow-[0_12px_30px_rgba(0,0,0,0.7)] py-1 z-50 overflow-hidden font-mono text-xs"
          >
            <div className="px-2.5 py-1 text-[9px] uppercase tracking-wider text-[#69786F] border-b border-[rgba(160,190,170,0.1)]">
              Appearance
            </div>

            <button
              type="button"
              onClick={() => handleSelectTheme("system")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left text-[11px] transition-colors cursor-pointer ${
                theme === "system"
                  ? "text-[#65F59A] bg-[rgba(101,245,154,0.08)] font-bold"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#17251E]"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Laptop className="h-3 w-3" />
                <span>System (Auto)</span>
              </div>
              {theme === "system" && <Check className="h-3 w-3 text-[#65F59A]" />}
            </button>

            <button
              type="button"
              onClick={() => handleSelectTheme("light")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left text-[11px] transition-colors cursor-pointer ${
                theme === "light"
                  ? "text-[#65F59A] bg-[rgba(101,245,154,0.08)] font-bold"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#17251E]"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Sun className="h-3 w-3 text-[#F59E0B]" />
                <span>Light</span>
              </div>
              {theme === "light" && <Check className="h-3 w-3 text-[#65F59A]" />}
            </button>

            <button
              type="button"
              onClick={() => handleSelectTheme("dark")}
              className={`w-full flex items-center justify-between px-2.5 py-1.5 text-left text-[11px] transition-colors cursor-pointer ${
                theme === "dark"
                  ? "text-[#65F59A] bg-[rgba(101,245,154,0.08)] font-bold"
                  : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#17251E]"
              }`}
            >
              <div className="flex items-center space-x-2">
                <Moon className="h-3 w-3 text-[#65F59A]" />
                <span>Dark</span>
              </div>
              {theme === "dark" && <Check className="h-3 w-3 text-[#65F59A]" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
