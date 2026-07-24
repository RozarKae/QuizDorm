"use client";

import React from "react";
import { AITutorChatWindow } from "@/components/tutor/AITutorChatWindow";
import { AIDoubtSolverCard } from "@/components/tutor/AIDoubtSolverCard";
import { AIFlashcardDeckCard } from "@/components/tutor/AIFlashcardDeckCard";

import { Bot, Sparkles, HelpCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AITutorPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-purple-300">
                <Bot className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-purple-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.6 1-on-1 AI Tutor & Copilot
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Personalized AI Tutor & Conversational Learning Copilot
            </h1>
            <p className="text-xs sm:text-sm text-purple-100/80 max-w-2xl">
              Ask questions, get step-by-step solutions with real-world analogies, practice with AI-generated flippable flashcard decks, and resolve academic doubts instantly.
            </p>
          </div>

          <Link href="/dashboard/tutor/planner">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-purple-600/30">
              <Sparkles className="w-4 h-4 mr-1.5" /> Open AI Study Coach & Learning Path
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Grid: AI Tutor Chat & Doubt Solver + Flashcards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <AITutorChatWindow />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <AIDoubtSolverCard />
          <AIFlashcardDeckCard />
        </div>
      </div>
    </div>
  );
}
