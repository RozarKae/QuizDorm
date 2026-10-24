"use client";

import React, { useState, useRef, useEffect } from "react";
import { useCurrency } from "@/lib/hooks/useCurrency";
import { CurrencyCode } from "@/lib/types/billing";
import { ChevronDown, Check, Globe } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSound } from "@/components/audio/useSound";

interface CurrencySelectorProps {
  className?: string;
  variant?: "compact" | "detailed";
}

export function CurrencySelector({
  className = "",
  variant = "compact",
}: CurrencySelectorProps) {
  const {
    currency,
    setCurrency,
    config,
    supportedCurrencies,
    isManualOverride,
    detectedCountry,
    resetToAutoDetect,
  } = useCurrency();

  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playTap } = useSound();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [open]);

  const handleSelect = (code: CurrencyCode) => {
    playTap();
    setCurrency(code);
    setOpen(false);
  };

  return (
    <div className={`relative inline-block ${className}`} ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center space-x-2 px-2.5 py-1.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.18)] hover:border-[#65F59A]/40 text-xs font-mono text-[#F2F7F3] transition-colors cursor-pointer"
        title="Select billing currency"
        aria-label="Select billing currency"
      >
        <span className="text-sm select-none">{config.flag}</span>
        <span className="font-bold tracking-wider">{config.code}</span>
        <span className="text-[10px] text-[#A0AEA5]">({config.symbol.trim()})</span>
        <ChevronDown className="h-3 w-3 text-[#69786F] ml-0.5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.96 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-1.5 w-60 rounded-[6px] border border-[rgba(160,190,170,0.22)] bg-[#0C1210] shadow-[0_16px_36px_rgba(0,0,0,0.8)] py-1.5 z-50 overflow-hidden font-mono text-xs"
          >
            <div className="px-3 py-1.5 border-b border-[rgba(160,190,170,0.12)] bg-[#111B17]/60 flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#69786F] tracking-wider">
                Billing Currency
              </span>
              <span className="text-[9px] text-[#38D9B0] bg-[rgba(56,217,176,0.12)] px-1.5 py-0.2 rounded border border-[rgba(56,217,176,0.25)]">
                Base: INR (₹)
              </span>
            </div>

            <div className="max-h-64 overflow-y-auto py-1 divide-y divide-[rgba(160,190,170,0.06)]">
              {supportedCurrencies.map((c) => {
                const isSelected = currency === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    onClick={() => handleSelect(c.code)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-left transition-colors cursor-pointer ${
                      isSelected
                        ? "bg-[rgba(101,245,154,0.1)] text-[#65F59A] font-bold"
                        : "text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#111B17]"
                    }`}
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="text-base select-none">{c.flag}</span>
                      <div>
                        <div className="flex items-center space-x-1.5">
                          <span className="text-xs font-bold text-[#F2F7F3]">{c.code}</span>
                          <span className="text-[10px] text-[#69786F]">({c.symbol.trim()})</span>
                        </div>
                        <p className="text-[10px] text-[#A0AEA5] leading-none mt-0.5">{c.name}</p>
                      </div>
                    </div>

                    {isSelected && <Check className="h-3.5 w-3.5 text-[#65F59A] shrink-0" />}
                  </button>
                );
              })}
            </div>

            {isManualOverride && (
              <div className="p-2 border-t border-[rgba(160,190,170,0.12)] bg-[#111B17]/40">
                <button
                  type="button"
                  onClick={() => {
                    resetToAutoDetect();
                    setOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-1 text-[10px] text-[#A0AEA5] hover:text-[#65F59A] transition-colors py-1 cursor-pointer"
                >
                  <Globe className="h-3 w-3" />
                  <span>Reset to Auto-Detect ({detectedCountry})</span>
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
