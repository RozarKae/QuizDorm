"use client";

import React from "react";
import { AIProviderType } from "@/lib/types/ai";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Cpu, Bot, Zap, HardDrive } from "lucide-react";

interface ProviderBadgeProps {
  providerId: AIProviderType;
  size?: "sm" | "md";
}

export function ProviderBadge({ providerId, size = "md" }: ProviderBadgeProps) {
  const providerConfigs: Record<AIProviderType, { label: string; className: string; icon: React.ReactNode }> = {
    gemini: {
      label: "Google Gemini",
      className: "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800",
      icon: <Sparkles className="w-3 h-3 mr-1" />,
    },
    openai: {
      label: "OpenAI GPT-4o",
      className: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800",
      icon: <Bot className="w-3 h-3 mr-1" />,
    },
    anthropic: {
      label: "Anthropic Claude",
      className: "bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 border-purple-200 dark:border-purple-800",
      icon: <Cpu className="w-3 h-3 mr-1" />,
    },
    azure: {
      label: "Azure OpenAI",
      className: "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800",
      icon: <Zap className="w-3 h-3 mr-1" />,
    },
    ollama: {
      label: "Ollama Local",
      className: "bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800",
      icon: <HardDrive className="w-3 h-3 mr-1" />,
    },
    lm_studio: {
      label: "LM Studio",
      className: "bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800",
      icon: <HardDrive className="w-3 h-3 mr-1" />,
    },
    local_llm: {
      label: "Local LLM",
      className: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700",
      icon: <HardDrive className="w-3 h-3 mr-1" />,
    },
    mock: {
      label: "Simulated Engine",
      className: "bg-slate-100 text-slate-700 dark:bg-slate-900 dark:text-slate-300 border-slate-200 dark:border-slate-800",
      icon: <Sparkles className="w-3 h-3 mr-1" />,
    },
  };

  const config = providerConfigs[providerId] || providerConfigs.mock;

  return (
    <span className={`inline-flex items-center font-bold rounded-full border ${config.className} ${size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs"}`}>
      {config.icon}
      <span>{config.label}</span>
    </span>
  );
}
