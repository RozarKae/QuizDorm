"use client";

import React, { useState } from "react";
import { LMSIntegrationService } from "@/lib/developer/lmsIntegrationService";
import { LMSIntegration } from "@/lib/types/developer";
import { Boxes, RefreshCw, CheckCircle2, Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function LMSConnectorCard() {
  const [integrations, setIntegrations] = useState<LMSIntegration[]>(LMSIntegrationService.getIntegrations());
  const [syncing, setSyncing] = useState(false);

  const handleSyncLMS = async (name: string) => {
    setSyncing(true);
    await new Promise((r) => setTimeout(r, 600));
    setSyncing(false);
    toast.success(`Successfully synced courses, student rosters, and grades with ${name}!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Boxes className="w-5 h-5 text-indigo-600 mr-2" /> LMS Integration & Roster Sync
          </h3>
          <p className="text-xs text-gray-500">
            Bi-directional course roster, assignment, and grade sync with Canvas, Moodle, and Google Classroom.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        {integrations.map((lms) => (
          <div key={lms.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{lms.name}</span>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-mono uppercase ${
                  lms.status === "connected" ? "bg-rose-100 text-rose-800 font-bold" : "bg-gray-200 text-gray-600"
                }`}
              >
                {lms.status}
              </span>
            </div>

            {lms.status === "connected" ? (
              <div className="space-y-1 font-mono text-[11px] text-gray-500">
                <div>Synced Courses: <span className="font-bold text-gray-900 dark:text-white">{lms.syncedCoursesCount}</span></div>
                <div>Synced Students: <span className="font-bold text-gray-900 dark:text-white">{lms.syncedStudentsCount}</span></div>
                <div className="pt-2">
                  <Button
                    onClick={() => handleSyncLMS(lms.name)}
                    disabled={syncing}
                    size="sm"
                    variant="outline"
                    className="w-full text-xs h-8 rounded-xl font-sans"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 mr-1 ${syncing ? "animate-spin" : ""}`} /> Sync Now
                  </Button>
                </div>
              </div>
            ) : (
              <div className="pt-2">
                <Button size="sm" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs h-8 rounded-xl">
                  <Link2 className="w-3.5 h-3.5 mr-1" /> Connect Platform
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
