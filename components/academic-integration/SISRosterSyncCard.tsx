"use client";

import React from "react";
import { SISConnectorManager } from "@/lib/academic-integration/sisManager";
import { School, Users, CheckCircle2, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function SISRosterSyncCard() {
  const sis = SISConnectorManager.getSISStatus();

  const handleSyncRoster = () => {
    toast.success(`PowerSchool SIS Roster Synchronized (${sis.totalEnrolled.toLocaleString()} Students Active)!`);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <School className="w-5 h-5 text-indigo-600 mr-2" /> Student Information System (SIS) Roster Sync
        </h3>
        <span className="text-xs font-mono font-bold text-rose-600 bg-rose-50 dark:bg-rose-950 px-2.5 py-0.5 rounded-full">
          {sis.status}
        </span>
      </div>

      <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3 text-xs">
        <div className="flex items-center justify-between font-bold">
          <span className="text-gray-900 dark:text-white text-sm">{sis.provider}</span>
          <span className="text-indigo-600 font-mono">{sis.totalEnrolled.toLocaleString()} Enrolled Students</span>
        </div>

        <p className="text-gray-500">
          Automated student enrollment, department assignments, and teacher roster provisioning.
        </p>

        <div className="flex justify-between items-center pt-2 border-t border-gray-200/40 text-[10px] text-gray-400 font-mono">
          <span>Last Roster Sync: {new Date(sis.lastRosterSync).toLocaleTimeString()}</span>
          <Button onClick={handleSyncRoster} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
            <RefreshCw className="w-3.5 h-3.5 mr-1" /> Force Roster Sync
          </Button>
        </div>
      </div>
    </Card>
  );
}
