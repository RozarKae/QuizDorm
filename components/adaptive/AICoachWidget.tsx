"use client";

import React from "react";
import { AICoachMessage } from "@/lib/types/adaptive";
import { Bot, Sparkles, MessageSquare, ArrowRight, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface AICoachWidgetProps {
  messages: AICoachMessage[];
}

export function AICoachWidget({ messages }: AICoachWidgetProps) {
  return (
    <Card className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950 text-white rounded-3xl shadow-xl space-y-4 relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-2xl bg-indigo-500/20 text-indigo-300 border border-indigo-400/20 backdrop-blur-md">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-extrabold flex items-center">
              QuizDorm AI Study Coach <Sparkles className="w-4 h-4 text-amber-400 ml-1.5" />
            </h3>
            <p className="text-xs text-indigo-200/80">Daily personalized learning advice, focus tips & time management</p>
          </div>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {messages.map((m) => (
          <div key={m.id} className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <span className="font-bold text-indigo-300 text-xs flex items-center">
                <Lightbulb className="w-3.5 h-3.5 text-amber-400 mr-1.5" /> {m.title}
              </span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white/10 text-indigo-200">
                {m.category}
              </span>
            </div>

            <p className="text-slate-200 leading-relaxed">{m.adviceText}</p>

            {m.suggestedAction && (
              <div className="pt-2">
                <Button size="sm" className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl h-8">
                  <span>{m.suggestedAction}</span>
                  <ArrowRight className="w-3 h-3 ml-1" />
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
