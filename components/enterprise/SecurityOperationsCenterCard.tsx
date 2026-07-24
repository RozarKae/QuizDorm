"use client";

import React from "react";
import { EnterpriseAuditLogger } from "@/lib/enterprise/auditLogger";
import { ShieldAlert, AlertTriangle, CheckCircle2, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";

export function SecurityOperationsCenterCard() {
  const alerts = EnterpriseAuditLogger.getSecurityAlerts();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <ShieldAlert className="w-5 h-5 text-rose-600 mr-2" /> Security Operations Center (SOC Risk Meter)
        </h3>
        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
          Zero Critical Threats
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {alerts.map((a) => (
          <div key={a.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm flex items-center">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mr-1.5" /> {a.title}
              </span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  a.severity === "high" || a.severity === "critical"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {a.severity}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300">{a.description}</p>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono pt-1">
              <span>Detected: {new Date(a.timestamp).toLocaleTimeString()}</span>
              <span>Status: {a.resolved ? "RESOLVED" : "INVESTIGATING"}</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
