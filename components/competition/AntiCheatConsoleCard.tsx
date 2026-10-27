"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AntiCheatService } from "@/lib/competition/antiCheatService";
import { AntiCheatFlag } from "@/lib/types/competition";
import { AlertTriangle,ShieldAlert } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function AntiCheatConsoleCard() {
  const [flags, setFlags] = useState<AntiCheatFlag[]>(AntiCheatService.getFlags());

  const handleResolveFlag = (id: string, action: "resolve" | "disqualify") => {
    const updated = flags.map((f) => (f.id === id ? { ...f, resolved: true } : f));
    setFlags(updated);
    toast.success(`Anti-Cheat Flag ${action.toUpperCase()}D for student!`);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <ShieldAlert className="w-5 h-5 text-rose-600 mr-2" /> Anti-Cheat & Fair Play Anomaly Console
        </h3>
        <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
          Active Monitoring Enabled
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {flags.map((f) => (
          <div key={f.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm flex items-center">
                <AlertTriangle className="w-4 h-4 text-amber-500 mr-1.5" /> Flagged: {f.studentName}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  f.resolved ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                {f.resolved ? "RESOLVED" : f.flagType}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300 font-mono text-[11px]">{f.notes}</p>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-1">
              <span>Timestamp: {new Date(f.timestamp).toLocaleTimeString()}</span>
              <span>Severity: {f.severity.toUpperCase()}</span>
            </div>

            {!f.resolved && (
              <div className="pt-2 flex justify-end space-x-2">
                <Button onClick={() => handleResolveFlag(f.id, "resolve")} size="sm" variant="outline" className="text-xs rounded-xl">
                  Dismiss Flag
                </Button>
                <Button onClick={() => handleResolveFlag(f.id, "disqualify")} size="sm" className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl">
                  Disqualify Participant
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
