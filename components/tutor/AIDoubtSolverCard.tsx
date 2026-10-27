"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AIDoubtSolver } from "@/lib/tutor/doubtSolver";
import { HelpCircle,Lightbulb,Sparkles } from "lucide-react";
import { useState } from "react";

export function AIDoubtSolverCard() {
  const [doubtText, setDoubtText] = useState("What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?");
  const [solutionResult, setSolutionResult] = useState<{ solution: string; keyFormula?: string; realWorldAnalogy: string } | null>(null);

  const handleSolve = async () => {
    const res = await AIDoubtSolver.solveDoubt(doubtText, "mathematics");
    setSolutionResult(res);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <HelpCircle className="w-5 h-5 text-indigo-600 mr-2" /> Instant AI Doubt Solver & Concept Clarifier
        </h3>
      </div>

      <div className="space-y-3 text-xs">
        <Input
          value={doubtText}
          onChange={(e) => setDoubtText(e.target.value)}
          placeholder="Paste or type any math equation, biology question..."
          className="text-xs"
        />

        <Button onClick={handleSolve} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl py-5">
          <Sparkles className="w-4 h-4 mr-1.5" /> Generate Step-by-Step Solution
        </Button>

        {solutionResult && (
          <div className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 space-y-3 font-sans">
            <div>
              <span className="font-bold text-indigo-900 dark:text-indigo-300 block text-xs">Step-by-Step Derivation:</span>
              <p className="whitespace-pre-wrap font-mono text-[11px] text-gray-800 dark:text-gray-200 mt-1">{solutionResult.solution}</p>
            </div>

            <div className="pt-2 border-t border-indigo-200/50 flex items-center justify-between text-[11px] text-indigo-900 dark:text-indigo-300">
              <span className="font-bold flex items-center">
                <Lightbulb className="w-3.5 h-3.5 mr-1 text-amber-500" /> Analogy:
              </span>
              <span>{solutionResult.realWorldAnalogy}</span>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
