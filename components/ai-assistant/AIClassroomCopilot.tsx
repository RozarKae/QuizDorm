"use client";

import React, { useState } from "react";
import { LiveClassroomSuggestion } from "@/lib/types/ai-assistant";
import { Button } from "@/components/ui/button";
import { 
  Eye, Sparkles, MessageSquare, Clock, Lightbulb, Zap, RefreshCw
} from "lucide-react";
import { toast } from "sonner";

const mockSuggestions: LiveClassroomSuggestion[] = [
  { id: "sug-1", timestamp: "10:14 AM", suggestionType: "Pacing Alert", text: "Student engagement dropped 15% during matrix algebra derivation. Consider launching a 1-minute quick check poll.", recommendedAction: "Launch Quick Poll" },
  { id: "sug-2", timestamp: "10:20 AM", suggestionType: "Discussion Prompt", text: "Ask: 'How does Copenhagen interpretation differ from Many-Worlds in thermal decoherence environments?'", recommendedAction: "Post Prompt" },
];

export function AIClassroomCopilot() {
  const [suggestions, setSuggestions] = useState<LiveClassroomSuggestion[]>(mockSuggestions);

  const handleTriggerSuggestion = (action: string) => {
    toast.success(`Triggered AI action: ${action}`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-2 border border-rose-500/30">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Live In-Class AI Teaching Assistant Active
          </div>
          <h2 className="text-2xl font-bold">AI Classroom Copilot Studio</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xl">
            Monitors real-time classroom participation, suggests timely icebreakers or discussion prompts, and alerts instructor when pacing needs adjustment.
          </p>
        </div>

        <Button onClick={() => toast.info("Generated new icebreaker discussion prompt!")} variant="outline" className="text-xs rounded-xl border-slate-700 text-white">
          <Sparkles className="w-4 h-4 mr-1.5 text-amber-400" /> Generate Icebreaker
        </Button>
      </div>

      {/* Live AI Classroom Suggestions List */}
      <div className="space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-slate-500">Real-time Copilot Suggestions ({suggestions.length})</h3>

        <div className="space-y-3">
          {suggestions.map((sug) => (
            <div key={sug.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold">
                    {sug.suggestionType}
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">{sug.timestamp}</span>
                </div>
                <p className="font-semibold text-slate-900 dark:text-white text-xs">{sug.text}</p>
              </div>

              <Button
                onClick={() => handleTriggerSuggestion(sug.recommendedAction)}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-xl font-semibold shrink-0"
              >
                {sug.recommendedAction}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
