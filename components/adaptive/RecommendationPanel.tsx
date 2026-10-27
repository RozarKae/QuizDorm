"use client";

import { Button } from "@/components/ui/button";
import { AIRecommendationItem } from "@/lib/types/adaptive";
import { ArrowRight,HelpCircle,Sparkles } from "lucide-react";
import Link from "next/link";

interface RecommendationPanelProps {
  recommendations: AIRecommendationItem[];
}

export function RecommendationPanel({ recommendations }: RecommendationPanelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Sparkles className="w-5 h-5 text-indigo-600 mr-2" /> Explainable AI Learning Recommendations
          </h3>
          <p className="text-xs text-gray-500">
            Personalized learning actions powered by AI Router with transparent performance evidence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendations.map((rec) => (
          <div
            key={rec.id}
            className="p-5 rounded-3xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col justify-between space-y-4 text-xs"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 uppercase tracking-wider">
                  {rec.type.replace(/_/g, " ")}
                </span>
                <span className="text-[10px] font-mono text-gray-400 font-semibold">
                  AI Confidence: {rec.confidencePercent}%
                </span>
              </div>

              <h4 className="font-bold text-sm text-gray-900 dark:text-white">{rec.title}</h4>
              <p className="text-gray-500 dark:text-gray-400">{rec.description}</p>
            </div>

            {/* Explainable AI Callout */}
            <div className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900 space-y-1 text-[11px]">
              <span className="font-bold text-indigo-900 dark:text-indigo-300 flex items-center">
                <HelpCircle className="w-3.5 h-3.5 mr-1 text-indigo-600" /> Why This Was Recommended:
              </span>
              <p className="text-indigo-800 dark:text-indigo-200">{rec.reason}</p>
              <div className="text-[10px] font-mono text-indigo-500 font-semibold pt-1">
                Data: {rec.supportingData}
              </div>
            </div>

            <Link href={rec.actionUrl}>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl shadow-sm">
                <span>Start Practice Session</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
