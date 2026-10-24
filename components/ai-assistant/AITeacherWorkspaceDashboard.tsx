"use client";

import React, { useState } from "react";
import { TeacherWorkspaceAgenda } from "@/lib/types/ai-assistant";
import { Button } from "@/components/ui/button";
import { 
  Sparkles, Calendar, CheckCircle2, Circle, Clock, Mic, 
  MicOff, AlertTriangle, Layers, ArrowUpRight
} from "lucide-react";
import { toast } from "sonner";

const mockAgenda: TeacherWorkspaceAgenda = {
  date: "Tuesday, Feb 24, 2026",
  pendingTasks: [
    { id: "t1", title: "Review AI suggested grades for Homework 4", dueTime: "02:00 PM", isDone: false, priority: "high" },
    { id: "t2", title: "Broadcast announcement for Friday's Live Quantum Workshop", dueTime: "04:00 PM", isDone: false, priority: "normal" },
    { id: "t3", title: "Finalize AI-generated 60-minute lesson plan for Chapter 5", dueTime: "05:30 PM", isDone: true, priority: "normal" },
  ],
  alerts: [
    { id: "a1", text: "3 students (Alexander, Beatriz, Charles) showed engagement drops in Tensor Products.", severity: "warning" },
    { id: "a2", text: "All 42 student Admit Cards generated for NAT-2026 session.", severity: "info" },
  ],
};

export function AITeacherWorkspaceDashboard() {
  const [agenda, setAgenda] = useState<TeacherWorkspaceAgenda>(mockAgenda);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  const handleToggleTask = (id: string) => {
    setAgenda((prev) => ({
      ...prev,
      pendingTasks: prev.pendingTasks.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)),
    }));
    toast.success("Task updated in AI Teacher Command Center!");
  };

  const handleToggleVoice = () => {
    setIsVoiceActive(!isVoiceActive);
    toast.info(isVoiceActive ? "Voice Assistant Mode paused." : "Voice Assistant Active! Speak prompt e.g. 'Draft email to parents'.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Educator Productivity Command Center
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">AI Teacher Workspace & Productivity Hub</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Manage daily teaching agendas, smart pending task reminders, real-time student alerts, and voice command copilot actions.
          </p>
        </div>

        <Button
          onClick={handleToggleVoice}
          className={`text-xs font-bold rounded-xl shadow-lg ${
            isVoiceActive ? "bg-red-600 hover:bg-red-700 text-white animate-pulse" : "bg-indigo-600 hover:bg-indigo-700 text-white"
          }`}
        >
          {isVoiceActive ? <Mic className="w-4 h-4 mr-1.5" /> : <MicOff className="w-4 h-4 mr-1.5" />}
          {isVoiceActive ? "Voice Mode: Listening..." : "Enable Voice Copilot"}
        </Button>
      </div>

      {/* Agenda & Alerts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Tasks (Cols 2) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Calendar className="w-5 h-5 text-indigo-600" /> Today's Teaching Agenda ({agenda.date})
            </h3>
          </div>

          <div className="space-y-3">
            {agenda.pendingTasks.map((t) => (
              <div
                key={t.id}
                onClick={() => handleToggleTask(t.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between text-xs font-semibold ${
                  t.isDone
                    ? "bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 line-through text-slate-400"
                    : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white hover:border-indigo-500"
                }`}
              >
                <div className="flex items-center gap-3">
                  {t.isDone ? <CheckCircle2 className="w-4 h-4 text-rose-500" /> : <Circle className="w-4 h-4 text-slate-300" />}
                  <span>{t.title}</span>
                </div>
                <span className="font-mono text-slate-400">{t.dueTime}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Alerts (Col 1) */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" /> Student & Class Alerts
          </h3>

          <div className="space-y-3">
            {agenda.alerts.map((al) => (
              <div key={al.id} className="p-3.5 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs space-y-1">
                <p className="text-slate-800 dark:text-slate-200 font-medium">{al.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
