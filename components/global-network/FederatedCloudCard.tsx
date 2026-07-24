"use client";

import React from "react";
import { FederatedCloudManager } from "@/lib/global-network/federatedCloud";
import { Server, CheckCircle2, Shield, Globe } from "lucide-react";
import { Card } from "@/components/ui/card";

export function FederatedCloudCard() {
  const regions = FederatedCloudManager.getRegionNodes();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <Server className="w-5 h-5 text-indigo-600 mr-2" /> Federated Cloud Region Deployment & Privacy Compliance
        </h3>
        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
          All Nodes Online
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {regions.map((reg) => (
          <div key={reg.regionId} className="p-3.5 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-between font-mono">
            <div className="flex items-center space-x-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <div>
                <span className="font-bold text-gray-900 dark:text-white font-sans">{reg.location} ({reg.regionId})</span>
                <span className="block text-[10px] text-gray-400 font-sans">{reg.dataResidencyCompliance}</span>
              </div>
            </div>

            <span className="text-indigo-600 font-bold">{reg.latencyMs} ms</span>
          </div>
        ))}
      </div>
    </Card>
  );
}
