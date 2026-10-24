"use client";

import React, { useState } from "react";
import { LMSConnectorManager } from "@/lib/academic-integration/lmsManager";
import { LMSConnection } from "@/lib/types/academic-integration";
import { BookOpen, RefreshCw, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function LMSConnectorCard() {
  const [connectors, setConnectors] = useState<LMSConnection[]>(LMSConnectorManager.getConnections());
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const handleSync = async (id: string, name: string) => {
    setSyncingId(id);
    await new Promise((r) => setTimeout(r, 600));
    const updated = LMSConnectorManager.syncConnector(id);
    setConnectors(updated);
    setSyncingId(null);
    toast.success(`Synchronized LMS Connector "${name}"!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <BookOpen className="w-5 h-5 text-indigo-600 mr-2" /> Enterprise LMS Connectors
          </h3>
          <p className="text-xs text-gray-500">
            Real-time synchronization for Canvas, Moodle, Google Classroom, and Blackboard.
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {connectors.map((c) => (
          <div key={c.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm flex items-center">
                <BookOpen className="w-4 h-4 text-indigo-500 mr-1.5" /> {c.providerName}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold uppercase">
                {c.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>Endpoint: {c.endpointUrl}</span>
              <span>{c.syncedStudentsCount.toLocaleString()} Students • {c.syncedQuizzesCount} Quizzes</span>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-gray-200/40 text-[10px] text-gray-400 font-mono">
              <span>Last Sync: {new Date(c.lastSyncAt).toLocaleTimeString()}</span>
              <Button
                onClick={() => handleSync(c.id, c.providerName)}
                disabled={syncingId === c.id}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-7 rounded-xl"
              >
                <RefreshCw className={`w-3.5 h-3.5 mr-1 ${syncingId === c.id ? "animate-spin" : ""}`} />
                {syncingId === c.id ? "Syncing..." : "Sync Now"}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
