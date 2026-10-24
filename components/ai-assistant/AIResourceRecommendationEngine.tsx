"use client";

import React, { useState } from "react";
import { ResourceRecommendation } from "@/lib/types/ai-assistant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sparkles, BookOpen, Video, FileText, ExternalLink, Search, CheckCircle2
} from "lucide-react";
import { toast } from "sonner";

const mockResources: ResourceRecommendation[] = [
  { id: "res-1", title: "MIT OCW 8.04: Quantum Physics I - Bell Inequality Lecture Notes", type: "Article", url: "https://ocw.mit.edu", relevanceScore: 98.4, curriculumTopic: "Quantum Entanglement" },
  { id: "res-2", title: "PhET Quantum Interference & Wave-Particle Duality Interactive Applet", type: "Interactive Game", url: "https://phet.colorado.edu", relevanceScore: 95.1, curriculumTopic: "Wave Mechanics" },
  { id: "res-3", title: "Principles of Quantum Mechanics — R. Shankar (Chapter 4 Solutions)", type: "Book", url: "#", relevanceScore: 91.8, curriculumTopic: "Linear Vector Spaces" },
];

export function AIResourceRecommendationEngine() {
  const [resources, setResources] = useState<ResourceRecommendation[]>(mockResources);
  const [searchTerm, setSearchTerm] = useState("");

  const handleOpenResource = (r: ResourceRecommendation) => {
    toast.success(`Opening recommended resource: "${r.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Semantic Vector Search & Curriculum Matching
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600" /> AI Resource Recommendation Engine
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Recommend curriculum-aligned textbooks, video workshops, laboratory activities, and interactive applets based on student mastery gaps.
          </p>
        </div>
      </div>

      {/* Recommended Resources List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {resources.map((res) => (
          <div key={res.id} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold uppercase">
                  {res.type}
                </span>
                <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400">
                  {res.relevanceScore}% AI Match
                </span>
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{res.title}</h4>
              <p className="text-xs text-slate-400">Topic: {res.curriculumTopic}</p>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400 font-medium">Curriculum Aligned</span>
              <Button onClick={() => handleOpenResource(res)} size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                <ExternalLink className="w-3.5 h-3.5 mr-1" /> Open Resource
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
