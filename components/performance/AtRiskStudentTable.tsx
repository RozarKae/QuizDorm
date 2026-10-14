"use client";

import React, { useState } from "react";
import { EarlyRiskDetectionEngine } from "@/lib/performance/riskDetectionEngine";
import { AIInterventionEngine } from "@/lib/performance/interventionEngine";
import { AtRiskStudent } from "@/lib/types/performance";
import { ShieldAlert, AlertTriangle, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

export function AtRiskStudentTable() {
  const [students, setStudents] = useState<AtRiskStudent[]>(EarlyRiskDetectionEngine.getAtRiskStudents());

  const handleIntervention = (id: string, name: string) => {
    AIInterventionEngine.triggerIntervention(id, "Remedial AI Practice + Parent Notice");
    const updated = students.map((s) => (s.id === id ? { ...s, status: "in_progress" as const } : s));
    setStudents(updated);
    toast.success(`Triggered AI Intervention for ${name}!`);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <ShieldAlert className="w-5 h-5 text-rose-600 mr-2" /> Early Risk Detection & Remedial Intervention Center
        </h3>
        <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
          AI Risk Radar Active
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {students.map((st) => (
          <div key={st.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-500 mr-1.5" /> {st.studentName} ({st.subject})
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  st.riskLevel === "high" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                {st.riskLevel} Risk
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-gray-500 font-mono">
              <span>Risk Factors: {st.riskFactors.join(" • ")}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 flex justify-between items-center text-[11px]">
              <span className="font-bold text-indigo-600 dark:text-indigo-400">Action: {st.recommendedIntervention}</span>
              <Button onClick={() => handleIntervention(st.id, st.studentName)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl h-7">
                <Send className="w-3.5 h-3.5 mr-1" /> Approve AI Action
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
