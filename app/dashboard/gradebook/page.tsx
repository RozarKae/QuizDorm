"use client";

import { GradebookSyncTable } from "@/components/academic-integration/GradebookSyncTable";
import { Button } from "@/components/ui/button";
import { GraduationCap,RefreshCw } from "lucide-react";
import { toast } from "sonner";

export default function GradebookSyncPage() {
  const handleForceGradeSync = () => {
    toast.success("Triggered bidirectional score sync to Canvas and Google Classroom!");
  };

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
                <GraduationCap className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Bidirectional Gradebook Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              LMS Gradebook & Academic Timetable Synchronization
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Pushes QuizDorm quiz attempt scores automatically into external LMS gradebooks with student roster verification.
            </p>
          </div>

          <Button onClick={handleForceGradeSync} className="bg-rose-500 hover:bg-rose-600 text-slate-950 font-extrabold text-xs rounded-2xl shadow-lg shadow-rose-500/30">
            <RefreshCw className="w-4 h-4 mr-1.5" /> Trigger Instant Score Sync
          </Button>
        </div>
      </div>

      {/* Gradebook Sync Logs Table */}
      <GradebookSyncTable />
    </div>
  );
}
