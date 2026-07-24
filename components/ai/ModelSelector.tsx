"use client";

import React from "react";
import { AIModel, AIProviderType } from "@/lib/types/ai";
import { AIModelManager } from "@/lib/ai/models/modelManager";
import { ProviderBadge } from "./ProviderBadge";
import { Cpu, DollarSign, Zap, Check } from "lucide-react";

interface ModelSelectorProps {
  selectedProvider: AIProviderType;
  selectedModelId: string;
  onProviderChange: (providerId: AIProviderType) => void;
  onModelChange: (modelId: string) => void;
}

export function ModelSelector({
  selectedProvider,
  selectedModelId,
  onProviderChange,
  onModelChange,
}: ModelSelectorProps) {
  const models = AIModelManager.getModelsForProvider(selectedProvider);

  return (
    <div className="space-y-4">
      {/* Provider Tabs */}
      <div>
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-2">Select Primary AI Provider</label>
        <div className="flex flex-wrap gap-2">
          {(["gemini", "openai", "anthropic", "mock"] as AIProviderType[]).map((pId) => {
            const isSel = selectedProvider === pId;
            return (
              <button
                key={pId}
                type="button"
                onClick={() => {
                  onProviderChange(pId);
                  const firstModel = AIModelManager.getModelsForProvider(pId)[0];
                  if (firstModel) onModelChange(firstModel.id);
                }}
                className={`p-1 rounded-2xl border transition-all ${
                  isSel ? "ring-2 ring-indigo-600 border-indigo-600" : "border-gray-200 dark:border-gray-800"
                }`}
              >
                <ProviderBadge providerId={pId} />
              </button>
            );
          })}
        </div>
      </div>

      {/* Models List */}
      <div>
        <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-2">Select Active Model</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {models.map((m) => {
            const isSel = selectedModelId === m.id;
            return (
              <div
                key={m.id}
                onClick={() => onModelChange(m.id)}
                className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all ${
                  isSel
                    ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 ring-2 ring-indigo-600/20"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-900 dark:text-white">{m.name}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
                    {m.speedRating}
                  </span>
                </div>

                <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">{m.description}</p>

                <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-between text-[10px] text-gray-400 font-mono">
                  <span>Context: {(m.contextWindow / 1000).toFixed(0)}k tokens</span>
                  <span>Input: ${m.inputCostPer1KTokensUSD}/1k</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
