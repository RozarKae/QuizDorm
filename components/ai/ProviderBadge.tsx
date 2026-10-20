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
      className: "bg-[#17251E] text-[#65F59A] border-[#65F59A]/30",
      icon: <Sparkles className="w-3 h-3 mr-1 text-[#65F59A]" />,
    },
    openai: {
      label: "OpenAI GPT-4o",
      className: "bg-[#111B17] text-[#38D9B0] border-[#38D9B0]/30",
      icon: <Bot className="w-3 h-3 mr-1 text-[#38D9B0]" />,
    },
    anthropic: {
      label: "Anthropic Claude",
      className: "bg-[#17251E] text-[#F2F7F3] border-[rgba(160,190,170,0.2)]",
      icon: <Cpu className="w-3 h-3 mr-1 text-[#65F59A]" />,
    },
    azure: {
      label: "Azure OpenAI",
      className: "bg-[#111B17] text-[#A0AEA5] border-[rgba(160,190,170,0.18)]",
      icon: <Zap className="w-3 h-3 mr-1 text-[#38D9B0]" />,
    },
    ollama: {
      label: "Ollama Local",
      className: "bg-[#17251E] text-[#F2F7F3] border-[rgba(160,190,170,0.2)]",
      icon: <HardDrive className="w-3 h-3 mr-1 text-[#65F59A]" />,
    },
    lm_studio: {
      label: "LM Studio",
      className: "bg-[#17251E] text-[#F2F7F3] border-[rgba(160,190,170,0.2)]",
      icon: <HardDrive className="w-3 h-3 mr-1 text-[#65F59A]" />,
    },
    local_llm: {
      label: "Local LLM",
      className: "bg-[#111B17] text-[#A0AEA5] border-[rgba(160,190,170,0.15)]",
      icon: <HardDrive className="w-3 h-3 mr-1 text-[#A0AEA5]" />,
    },
    mock: {
      label: "Simulated Engine",
      className: "bg-[#111B17] text-[#A0AEA5] border-[rgba(160,190,170,0.15)]",
      icon: <Sparkles className="w-3 h-3 mr-1 text-[#A0AEA5]" />,
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
