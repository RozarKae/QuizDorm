"use client";

import { Button } from "@/components/ui/button";
import { ResilientRecoveryManager } from "@/lib/offline/recoveryManager";
import { RecoveryTask } from "@/lib/types/offline";
import { RefreshCw,RotateCcw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function RecoveryQueueTable() {
  const [tasks, setTasks] = useState<RecoveryTask[]>(ResilientRecoveryManager.getTasks());

  const handleResume = (id: string, title: string) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, status: "completed" as const, progressPercent: 100 } : t));
    setTasks(updated);
    toast.success(`Resumed and completed task "${title}"!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <RotateCcw className="w-5 h-5 text-indigo-600 mr-2" /> Resilient Recovery Task Queue
          </h3>
          <p className="text-xs text-gray-500">
            Auto-resumes interrupted sync uploads or downloads after power loss, network drops, or browser restarts.
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {tasks.map((t) => (
          <div key={t.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{t.taskTitle}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  t.status === "completed"
                    ? "bg-rose-100 text-rose-800"
                    : t.status === "interrupted"
                    ? "bg-amber-100 text-amber-800"
                    : "bg-indigo-100 text-indigo-800"
                }`}
              >
                {t.status}
              </span>
            </div>

            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div className="bg-indigo-600 h-2 transition-all duration-300" style={{ width: `${t.progressPercent}%` }} />
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-1">
              <span>Size: {t.payloadSizeMB} MB | Retries: {t.retriesCount}</span>
              <span>Progress: {t.progressPercent}%</span>
            </div>

            {t.status === "interrupted" && (
              <div className="pt-2 flex justify-end">
                <Button onClick={() => handleResume(t.id, t.taskTitle)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Auto-Resume Task
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
