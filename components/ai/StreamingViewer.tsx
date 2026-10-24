"use client";

import React from "react";
import { Terminal, Zap, Loader2, CheckCircle2 } from "lucide-react";
import { AIResponseMetadata } from "@/lib/types/ai";

interface StreamingViewerProps {
  streamedText: string;
  isStreaming: boolean;
  metadata?: AIResponseMetadata;
}

export function StreamingViewer({ streamedText, isStreaming, metadata }: StreamingViewerProps) {
  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-lg space-y-0 text-xs">
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-slate-800 text-slate-300">
        <div className="flex items-center space-x-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="font-mono font-bold">AI Token Streaming Console</span>
        </div>

        <div className="flex items-center space-x-2">
          {isStreaming ? (
            <span className="text-[10px] font-bold text-amber-400 flex items-center">
              <Loader2 className="w-3 h-3 mr-1 animate-spin" /> Live Streaming...
            </span>
          ) : streamedText ? (
            <span className="text-[10px] font-bold text-rose-400 flex items-center">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Complete
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-4 min-h-[160px] max-h-[300px] overflow-y-auto font-mono text-slate-100 whitespace-pre-wrap leading-relaxed">
        {streamedText ? (
          <span>
            {streamedText}
            {isStreaming && <span className="inline-block w-2 h-4 bg-indigo-500 animate-pulse ml-0.5" />}
          </span>
        ) : (
          <span className="text-slate-600 italic">Ready to stream AI tokens. Execute a prompt in the AI Playground above.</span>
        )}
      </div>

      {metadata && (
        <div className="px-4 py-2 bg-slate-900/80 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
          <span>Tokens: {metadata.totalTokens} (Prompt: {metadata.promptTokens}, Gen: {metadata.completionTokens})</span>
          <span>Latency: {metadata.latencyMs}ms • Cost: ${metadata.costUSD.toFixed(5)}</span>
        </div>
      )}
    </div>
  );
}
