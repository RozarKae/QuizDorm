"use client";

import React, { useState } from "react";
import { AIProviderType, AIResponsePayload, AIStreamChunk } from "@/lib/types/ai";
import { ModelSelector } from "./ModelSelector";
import { StreamingViewer } from "./StreamingViewer";
import { AIRouter } from "@/lib/ai/router/aiRouter";
import { Play, Sparkles, Sliders, Code2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AIPlayground() {
  const [provider, setProvider] = useState<AIProviderType>("gemini");
  const [modelId, setModelId] = useState("gemini-1.5-flash");
  const [systemPrompt, setSystemPrompt] = useState("You are QuizDorm AI, an expert educational assessment assistant.");
  const [userPrompt, setUserPrompt] = useState("Explain Newton's Second Law of Motion ($F = ma$) in simple terms for a 9th grade physics quiz.");
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(1024);
  const [enableStreaming, setEnableStreaming] = useState(true);

  const [loading, setLoading] = useState(false);
  const [streamedContent, setStreamedContent] = useState("");
  const [response, setResponse] = useState<AIResponsePayload | null>(null);
  const [activeTab, setActiveTab] = useState<"text" | "json">("text");

  const handleRunPlayground = async () => {
    if (!userPrompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    setLoading(true);
    setStreamedContent("");
    setResponse(null);

    const payload = {
      featureId: "test_prompt" as const,
      providerOverride: provider,
      modelOverride: modelId,
      systemPrompt,
      userPrompt,
      temperature,
      maxTokens,
    };

    try {
      if (enableStreaming) {
        const result = await AIRouter.routeStream(payload, (chunk: AIStreamChunk) => {
          setStreamedContent(chunk.accumulatedContent);
        });
        setResponse(result);
        toast.success("AI Streaming completed!");
      } else {
        const result = await AIRouter.routeCompletion(payload);
        setResponse(result);
        setStreamedContent(result.content);
        toast.success("AI Completion response received!");
      }
    } catch (err: any) {
      toast.error(err.message || "Playground request failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Sparkles className="w-5 h-5 text-indigo-600 mr-2" /> QuizDorm AI Playground Sandbox
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Internal prompt sandbox for testing LLM completions, parameter tuning, token streams & raw JSON validation.
          </p>
        </div>

        <Button
          onClick={handleRunPlayground}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/30"
        >
          <Play className="w-4 h-4 mr-1.5" /> {loading ? "Executing AI Router..." : "Run Prompt Sandbox"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Parameters & Prompts */}
        <div className="lg:col-span-6 space-y-4">
          <ModelSelector
            selectedProvider={provider}
            selectedModelId={modelId}
            onProviderChange={setProvider}
            onModelChange={setModelId}
          />

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">System Prompt</label>
            <textarea
              value={systemPrompt}
              onChange={(e) => setSystemPrompt(e.target.value)}
              rows={2}
              className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-medium"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">User Prompt</label>
            <textarea
              value={userPrompt}
              onChange={(e) => setUserPrompt(e.target.value)}
              rows={4}
              className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white font-medium focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Controls Sliders */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1 text-gray-700 dark:text-gray-300">
                <span>Temperature:</span>
                <span>{temperature}</span>
              </div>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full text-indigo-600 accent-indigo-600"
              />
            </div>

            <div>
              <label className="flex items-center space-x-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  checked={enableStreaming}
                  onChange={(e) => setEnableStreaming(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                />
                <span>Enable Token Streaming</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Stream Console & Raw JSON output */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-gray-900 dark:text-white">Normalized Output Inspector</span>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => setActiveTab("text")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  activeTab === "text" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Stream Output
              </button>
              <button
                onClick={() => setActiveTab("json")}
                className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                  activeTab === "json" ? "bg-indigo-600 text-white" : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                Raw JSON Payload
              </button>
            </div>
          </div>

          {activeTab === "text" ? (
            <StreamingViewer
              streamedText={streamedContent}
              isStreaming={loading}
              metadata={response?.metadata}
            />
          ) : (
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 text-slate-200 font-mono text-xs max-h-[300px] overflow-y-auto">
              {response ? (
                <pre>{JSON.stringify(response, null, 2)}</pre>
              ) : (
                <span className="text-slate-600 italic">No JSON metadata generated yet.</span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
