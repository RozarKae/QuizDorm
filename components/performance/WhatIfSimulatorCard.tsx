"use client";

import React, { useState } from "react";
import { WhatIfSimulatorEngine } from "@/lib/performance/whatIfSimulator";
import { Sliders, Sparkles, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

export function WhatIfSimulatorCard() {
  const [extraHours, setExtraHours] = useState(3);
  const [attendance, setAttendance] = useState(90);

  const scenario = WhatIfSimulatorEngine.simulate(extraHours, attendance);

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Sliders className="w-5 h-5 text-indigo-600 mr-2" /> Interactive "What-If" Academic Outcome Simulator
        </h3>
        <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950 px-2.5 py-0.5 rounded-full">
          AI Scenario Model
        </span>
      </div>

      <div className="space-y-4 text-xs">
        <div>
          <div className="flex justify-between font-bold mb-1">
            <span>Extra Study Hours / Week:</span>
            <span className="text-indigo-600 font-mono">{extraHours} Hours</span>
          </div>
          <input
            type="range"
            min="0"
            max="10"
            value={extraHours}
            onChange={(e) => setExtraHours(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div>
          <div className="flex justify-between font-bold mb-1">
            <span>Target Class Attendance:</span>
            <span className="text-indigo-600 font-mono">{attendance}%</span>
          </div>
          <input
            type="range"
            min="70"
            max="100"
            value={attendance}
            onChange={(e) => setAttendance(parseInt(e.target.value))}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-900 dark:to-indigo-950 border border-indigo-200 dark:border-indigo-800 space-y-2 text-center">
          <span className="text-[10px] font-mono font-bold uppercase text-indigo-600 dark:text-indigo-400 block">
            Projected Exam Grade Improvement
          </span>

          <div className="text-2xl font-extrabold text-rose-600 font-mono">
            +{scenario.projectedScoreIncreasePercent}% Gain ({scenario.newPredictedGrade})
          </div>
        </div>
      </div>
    </Card>
  );
}
