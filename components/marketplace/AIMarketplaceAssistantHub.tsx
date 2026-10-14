"use client";

import React from "react";
import { AIMarketplaceRecommendation } from "@/lib/types/marketplace";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, CheckCircle2, TrendingUp, Lightbulb, ShoppingBag
} from "lucide-react";
import { toast } from "sonner";

const mockRecs: AIMarketplaceRecommendation[] = [
  { productId: "prod-101", title: "1,000+ Verified Quantum Physics MCQs Bank", matchScorePercent: 98, recommendationReason: "Matches your active Course teaching Quantum Mechanics" },
];

export function AIMarketplaceAssistantHub() {
  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl border border-purple-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold mb-3 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> AI Personal Shopping & Pricing Assistant
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Marketplace Assistant & Recommender</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Personalized product recommendations mapped to your course syllabus, AI product comparison, dynamic pricing suggestions, and seller copilot insights.
          </p>
        </div>
      </div>

      {/* Recommended Items */}
      <div className="space-y-3">
        {mockRecs.map((rec) => (
          <div key={rec.productId} className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between text-xs gap-4">
            <div className="space-y-1">
              <span className="font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">
                {rec.matchScorePercent}% AI Match
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">{rec.title}</h4>
              <p className="text-slate-500">{rec.recommendationReason}</p>
            </div>

            <Button onClick={() => toast.success(`Added recommended item "${rec.title}" to cart!`)} size="sm" className="bg-purple-600 text-white text-xs rounded-xl font-bold shrink-0">
              <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Add to Cart
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
