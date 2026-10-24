"use client";

import React from "react";
import { EnterpriseAuditLogger } from "@/lib/enterprise/auditLogger";
import { ComplianceEngine } from "@/lib/enterprise/complianceEngine";
import { FileText, Download, CheckCircle2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AuditLogTable() {
  const logs = EnterpriseAuditLogger.getLogs();

  const handleExportCompliance = () => {
    const res = ComplianceEngine.exportComplianceBundle("tnt-101");
    toast.success(`Exported FERPA/GDPR Compliance Bundle (${res.filename})!`);
  };

  return (
    <div className="bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] rounded-[6px] p-5 shadow-sm space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[rgba(240, 160, 180,0.12)] pb-3">
        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
            <FileText className="w-4 h-4 text-[#FF4D6D] mr-2" />
            Enterprise Audit Logs & Compliance Bundle
          </h3>
          <p className="text-xs text-[#A0AEA5] mt-0.5">
            Immutable audit log trail of administrative actions, AI requests, role updates, and certificate issuances.
          </p>
        </div>

        <Button
          onClick={handleExportCompliance}
          className="h-8 px-3 rounded-[4px] bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_12px_rgba(255, 77, 109,0.2)] shrink-0"
        >
          <Download className="w-3.5 h-3.5 mr-1" />
          Export Compliance Bundle
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-[rgba(240, 160, 180,0.12)] text-[#69786F] font-mono uppercase tracking-wider text-[10px] bg-[#1D1013]">
              <th className="p-3">Timestamp</th>
              <th className="p-3">Actor</th>
              <th className="p-3">Action</th>
              <th className="p-3">Resource Target</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[rgba(240, 160, 180,0.08)] font-mono text-[11px]">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-[#1D1013]/60 transition-colors">
                <td className="p-3 text-[#69786F]">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </td>
                <td className="p-3 font-bold text-[#F2F7F3] font-sans">
                  {log.actorName} <span className="text-[10px] text-[#A0AEA5] font-mono">({log.actorRole})</span>
                </td>
                <td className="p-3 font-bold text-[#FF4D6D]">{log.action}</td>
                <td className="p-3 font-sans text-[#A0AEA5]">{log.resource}</td>
                <td className="p-3 text-[#69786F]">{log.ipAddress}</td>
                <td className="p-3 font-sans">
                  <span className="px-2 py-0.5 rounded-[2px] text-[10px] font-mono font-bold bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.2)] uppercase">
                    {log.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}