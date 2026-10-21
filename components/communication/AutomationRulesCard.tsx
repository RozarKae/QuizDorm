"use client";

import React from "react";
import { WorkflowAutomationEngine } from "@/lib/communication/automationEngine";
import { Zap, Play, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export function AutomationRulesCard() {
  const rules = WorkflowAutomationEngine.getRules();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Zap className="w-5 h-5 text-amber-500 mr-2" /> Event-Driven Academic Notification Rules
        </h3>
        <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full">
          {rules.length} Rules Active
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {rules.map((rule) => (
          <div key={rule.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{rule.name}</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold uppercase">
                {rule.eventTrigger}
              </span>
            </div>

            <p className="text-gray-500 italic font-mono text-[11px]">"{rule.messageTemplate}"</p>

            <div className="flex items-center justify-between text-[10px] text-gray-400 font-mono pt-1">
              <span>Channels: {rule.channels.join(", ").toUpperCase()}</span>
              <span>Executed: {rule.executionsCount} times</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
