"use client";

import { Button } from "@/components/ui/button";
import { StudentSupportPlan } from "@/lib/types/ai-assistant";
import {
AlertTriangle,
Lightbulb,
RefreshCw,
Sparkles,UserCheck
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockSupportPlan: StudentSupportPlan = {
  studentId: "s-101",
  studentName: "Alexander Wright",
  weakTopics: ["Tensor Product Matrix Algebra", "CHSH Inequality Derivation"],
  recommendedDrills: [
    "5-minute quick drill on 2x2 Pauli matrix Kronecker products",
    "Interactive visualization of photon polarization angles at 45°",
  ],
  personalizedSchedule: [
    "Mon 4:00 PM - 20 mins PyTorch Tensor Practice",
    "Wed 5:00 PM - Quantum Entanglement Concept Review",
  ],
  aiTutorPrompt: "AI Tutor: In tensor product matrix algebra, (A ⊗ B) acts on the combined product Hilbert space...",
};

export function AIStudentSupportHub() {
  const [plan] = useState<StudentSupportPlan>(mockSupportPlan);

  const handleGeneratePlan = () => {
    toast.success("AI generated updated personalized 7-day study plan!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Personalized Remediation & AI Tutoring
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-purple-600" /> AI Student Support & Remediation
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Deliver personalized student study plans, weak topic diagnosis, AI tutoring prompts, and revision schedules.
          </p>
        </div>

        <Button onClick={handleGeneratePlan} className="bg-purple-600 text-white text-xs font-semibold rounded-xl shadow-lg">
          <RefreshCw className="w-4 h-4 mr-1.5" /> Re-Analyze Student Performance
        </Button>
      </div>

      {/* Weak Topics & Remediation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Weak Topics Diagnosis */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Identified Weak Topics ({plan.weakTopics.length})
          </h3>

          <div className="space-y-2 text-xs">
            {plan.weakTopics.map((topic, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-800 dark:text-slate-200 font-medium">
                {topic}
              </div>
            ))}
          </div>
        </div>

        {/* AI Tutor Guidance Prompt */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-indigo-600" /> AI Tutor Concept Clarification
          </h3>

          <div className="p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs text-indigo-950 dark:text-indigo-200 font-mono leading-relaxed">
            {plan.aiTutorPrompt}
          </div>
        </div>
      </div>
    </div>
  );
}
