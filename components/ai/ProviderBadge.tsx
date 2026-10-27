"use client";

import { AIProviderType } from "@/lib/types/ai";
import { Bot,Cpu,HardDrive,Sparkles,Zap } from "lucide-react";
import React from "react";

interface ProviderBadgeProps {
  providerId: AIProviderType;
  size?: "sm" | "md";
}

export function ProviderBadge({ providerId, size = "md" }: ProviderBadgeProps) {
  const providerConfigs: Record<AIProviderType, { label: string; className: string; icon: React.ReactNode }> = {
    gemini: {
      label: "Google Gemini",
      className: "bg-[#2A141A] text-[#FF4D6D] border-[#FF4D6D]/30",
      icon: <Sparkles className="w-3 h-3 mr-1 text-[#FF4D6D]" />,
    },
    openai: {
      label: "OpenAI GPT-4o",
      className: "bg-[#1D1013] text-[#FF758F] border-[#FF758F]/30",
      icon: <Bot className="w-3 h-3 mr-1 text-[#FF758F]" />,
    },
    anthropic: {
      label: "Anthropic Claude",
      className: "bg-[#2A141A] text-[#F2F7F3] border-[rgba(240, 160, 180,0.2)]",
      icon: <Cpu className="w-3 h-3 mr-1 text-[#FF4D6D]" />,
    },
    azure: {
      label: "Azure OpenAI",
      className: "bg-[#1D1013] text-[#A0AEA5] border-[rgba(240, 160, 180,0.18)]",
      icon: <Zap className="w-3 h-3 mr-1 text-[#FF758F]" />,
    },
    ollama: {
      label: "Ollama Local",
      className: "bg-[#2A141A] text-[#F2F7F3] border-[rgba(240, 160, 180,0.2)]",
      icon: <HardDrive className="w-3 h-3 mr-1 text-[#FF4D6D]" />,
    },
    lm_studio: {
      label: "LM Studio",
      className: "bg-[#2A141A] text-[#F2F7F3] border-[rgba(240, 160, 180,0.2)]",
      icon: <HardDrive className="w-3 h-3 mr-1 text-[#FF4D6D]" />,
    },
    local_llm: {
      label: "Local LLM",
      className: "bg-[#1D1013] text-[#A0AEA5] border-[rgba(240, 160, 180,0.15)]",
      icon: <HardDrive className="w-3 h-3 mr-1 text-[#A0AEA5]" />,
    },
    mock: {
      label: "QuizDorm Edge Engine",
      className: "bg-[#1D1013] text-[#FF4D6D] border-[#FF4D6D]/20",
      icon: <Sparkles className="w-3 h-3 mr-1 text-[#FF4D6D]" />,
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
