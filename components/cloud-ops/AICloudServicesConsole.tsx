"use client";

import { Button } from "@/components/ui/button";
import { AIModelInstance } from "@/lib/types/cloud-ops";
import {
Cpu,
Sparkles,
Zap
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockAIModels: AIModelInstance[] = [
  { modelId: "mod-1", modelName: "QuizDorm-AI-Tutor-Large", gpuAllocatedType: "NVIDIA H100 SXM5", gpuClusterNodes: 8, inferenceLatencyMs: 18, ragVectorCount: 8400000, status: "Serving" },
  { modelId: "mod-2", modelName: "Llama-3-Edu-70B (Fine-Tuned)", gpuAllocatedType: "NVIDIA A100 80GB", gpuClusterNodes: 4, inferenceLatencyMs: 32, ragVectorCount: 4200000, status: "Serving" },
];

export function AICloudServicesConsole() {
  const [models] = useState<AIModelInstance[]>(mockAIModels);

  const handleWarmupModel = (name: string) => {
    toast.success(`Triggered GPU cluster warm-up and cache sync for "${name}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <Cpu className="w-3.5 h-3.5 text-amber-400" /> Dedicated NVIDIA GPU Inference Clusters
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Cloud Services & Model Hosting</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Centralized AI infrastructure hosting multi-model LLM inference, NVIDIA H100 SXM5 GPU node clusters, sub-20ms RAG retrieval, and AI agent platform orchestration.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening AI Model Deployment Wizard...")} className="bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" /> Deploy AI Model
        </Button>
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {models.map((m) => (
          <div key={m.modelId} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400 px-2 py-0.5 rounded bg-purple-50 dark:bg-purple-950">
                    {m.gpuAllocatedType}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{m.modelName}</h3>
                  <p className="text-xs text-slate-500">Hardware: {m.gpuClusterNodes} GPU Cluster Nodes</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                  {m.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1.5 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Inference Latency:</span>
                  <span className="font-bold text-rose-500">{m.inferenceLatencyMs} ms</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">RAG Vectors Index:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{(m.ragVectorCount / 1000000).toFixed(1)}M Vectors</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-400">GPU Temp: 48°C</span>
              <Button onClick={() => handleWarmupModel(m.modelName)} size="sm" className="bg-purple-600 text-white text-xs rounded-xl font-bold">
                <Zap className="w-3.5 h-3.5 mr-1 text-amber-400" /> Warm-Up Cluster
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
