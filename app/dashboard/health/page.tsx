"use client";

import React, { useState } from "react";
import { Activity, ShieldCheck, Database, HardDrive, Cpu, Server, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function SystemHealthPage() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const toggleMaintenance = () => {
    setMaintenanceMode(!maintenanceMode);
    toast.success(`Maintenance mode ${!maintenanceMode ? "ENABLED" : "DISABLED"}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <Activity className="w-6 h-6 text-indigo-600 mr-2" /> System Health & Production Control
          </h1>
          <p className="text-sm text-gray-500">Monitor platform latency, database connections, security status, and maintenance mode</p>
        </div>

        <Button
          onClick={toggleMaintenance}
          variant={maintenanceMode ? "destructive" : "outline"}
          className="font-bold text-xs rounded-xl"
        >
          <Lock className="w-4 h-4 mr-1.5" />
          {maintenanceMode ? "Maintenance Mode: ACTIVE" : "Toggle Maintenance Mode"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Database Connection</span>
            <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-[10px]">Operational</Badge>
          </div>
          <p className="text-2xl font-mono font-extrabold text-gray-900 dark:text-white">12 ms</p>
          <p className="text-[10px] text-gray-400">PostgreSQL Connection Pool Status: Healthy</p>
        </div>

        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">API Response Speed</span>
            <Badge className="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-[10px]">Optimal</Badge>
          </div>
          <p className="text-2xl font-mono font-extrabold text-gray-900 dark:text-white">45 ms</p>
          <p className="text-[10px] text-gray-400">Turbopack SSR / Edge Latency</p>
        </div>

        <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-400">Platform Version</span>
            <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px]">v1.0.0 Stable</Badge>
          </div>
          <p className="text-2xl font-mono font-extrabold text-gray-900 dark:text-white">QuizDorm v1.0</p>
          <p className="text-[10px] text-gray-400">Build #1094 - Production Ready</p>
        </div>
      </div>
    </div>
  );
}
