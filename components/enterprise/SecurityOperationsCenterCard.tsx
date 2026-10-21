"use client";

import React from "react";
import { EnterpriseAuditLogger } from "@/lib/enterprise/auditLogger";
import { ShieldAlert, AlertTriangle, CheckCircle2, Lock } from "lucide-react";

export function SecurityOperationsCenterCard() {
  const alerts = EnterpriseAuditLogger.getSecurityAlerts();

  return (
    <div className="p-5 bg-[#0C1210] border border-[rgba(160,190,170,0.14)] rounded-[6px] shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-[rgba(160,190,170,0.12)] pb-3">
        <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
          <ShieldAlert className="w-4 h-4 text-[#F87171] mr-2" />
          Security Operations Center (SOC Risk Meter)
        </h3>
        <span className="text-[10px] font-mono font-bold text-[#65F59A] bg-[rgba(101,245,154,0.1)] px-2.5 py-0.5 rounded-[2px] border border-[rgba(101,245,154,0.2)] uppercase">
          Zero Critical Threats
        </span>
      </div>

      <div className="space-y-3 text-xs">
        {alerts.map((a) => (
          <div
            key={a.id}
            className="p-3.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)] space-y-2"
          >
            <div className="flex items-center justify-between font-bold">
              <span className="text-[#F2F7F3] text-sm flex items-center font-sans">
                <AlertTriangle className="w-3.5 h-3.5 text-[#FBBF24] mr-1.5" /> {a.title}
              </span>
              <span
                className={`px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold uppercase ${
                  a.severity === "high" || a.severity === "critical"
                    ? "bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.25)]"
                    : "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border border-[rgba(251,191,36,0.25)]"
                }`}
              >
                {a.severity}
              </span>
            </div>

            <p className="text-xs text-[#A0AEA5] leading-relaxed">{a.description}</p>

            <div className="flex justify-between items-center text-[10px] text-[#69786F] font-mono pt-1 border-t border-[rgba(160,190,170,0.08)]">
              <span>Detected: {new Date(a.timestamp).toLocaleTimeString()}</span>
              <span className="text-[#65F59A]">STATUS: {a.resolved ? "RESOLVED" : "INVESTIGATING"}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}