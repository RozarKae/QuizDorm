"use client";

import React from "react";
import { EnterpriseAuditLogger } from "@/lib/enterprise/auditLogger";
import { ComplianceEngine } from "@/lib/enterprise/complianceEngine";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function AuditLogTable() {
  const logs = EnterpriseAuditLogger.getLogs();

  const handleExportCompliance = () => {
    const res = ComplianceEngine.exportComplianceBundle("tnt-101");
    toast.success(`Exported FERPA/GDPR Compliance Bundle (${res.filename})!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <FileText className="w-5 h-5 text-indigo-600 mr-2" /> Enterprise Audit Logs & Compliance Bundle
          </h3>
          <p className="text-xs text-gray-500">
            Immutable audit log trail of administrative actions, AI requests, role updates, and certificate issuances.
          </p>
        </div>

        <Button onClick={handleExportCompliance} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl">
          <Download className="w-4 h-4 mr-1" /> Export Compliance Bundle
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-900/50">
              <th className="p-3">Timestamp</th>
              <th className="p-3">Actor</th>
              <th className="p-3">Action</th>
              <th className="p-3">Resource Target</th>
              <th className="p-3">IP Address</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-mono">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors">
                <td className="p-3 text-gray-400">
                  {new Date(log.timestamp).toLocaleTimeString()}
                </td>
                <td className="p-3 font-bold text-gray-900 dark:text-white font-sans">
                  {log.actorName} <span className="text-[10px] text-gray-400">({log.actorRole})</span>
                </td>
                <td className="p-3 font-bold text-indigo-600 dark:text-indigo-400">{log.action}</td>
                <td className="p-3 font-sans text-gray-600 dark:text-gray-300">{log.resource}</td>
                <td className="p-3 text-gray-400">{log.ipAddress}</td>
                <td className="p-3 font-sans">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 uppercase">
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
