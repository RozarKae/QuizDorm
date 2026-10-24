"use client";

import React, { useState } from "react";
import { CampusServerManager } from "@/lib/offline/campusServer";
import { CampusServerNode } from "@/lib/types/offline";
import { Server, RefreshCw, CheckCircle2, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function CampusServerCard() {
  const [nodes, setNodes] = useState<CampusServerNode[]>(CampusServerManager.getNodes());

  const handleSyncNode = (id: string, name: string) => {
    const updated = nodes.map((n) => (n.id === id ? { ...n, syncStatus: "synced" as const, lastSyncAt: new Date().toISOString() } : n));
    setNodes(updated);
    toast.success(`Delta cloud synchronization complete for "${name}"!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Server className="w-5 h-5 text-indigo-600 mr-2" /> Campus LAN Server Nodes & Local Databases
          </h3>
          <p className="text-xs text-gray-500">
            Local school server nodes serving offline authentication, cached quizzes, and scheduled cloud delta synchronization.
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {nodes.map((n) => (
          <div key={n.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm flex items-center">
                <Server className="w-4 h-4 text-indigo-500 mr-1.5" /> {n.serverName}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  n.syncStatus === "synced" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                {n.syncStatus}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>LAN IP: {n.ipAddress} | Users: {n.localUsersCount}</span>
              <span>Last Cloud Sync: {new Date(n.lastSyncAt).toLocaleTimeString()}</span>
            </div>

            {n.syncStatus === "pending_delta" && (
              <div className="pt-2 flex justify-end">
                <Button onClick={() => handleSyncNode(n.id, n.serverName)} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Sync Delta to Cloud
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
