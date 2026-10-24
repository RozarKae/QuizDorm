"use client";

import React, { useState } from "react";
import { AuditLogEntry } from "@/lib/types/examination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ShieldCheck, FileText, Download, Lock, Search, Filter, 
  CheckCircle2, AlertTriangle, Clock, Key
} from "lucide-react";
import { toast } from "sonner";

const mockAuditLogs: AuditLogEntry[] = [
  { id: "log-101", timestamp: "Feb 24, 2026 at 10:14:02 AM", actorName: "System Engine", actorRole: "Automated Proctor", action: "Flagged Tab Switch violation for Roll 2026-ENG-8812", ipAddress: "192.168.1.104", module: "Proctoring", securitySeverity: "warning", hashSignature: "a8f902...b1e" },
  { id: "log-102", timestamp: "Feb 24, 2026 at 09:30:00 AM", actorName: "Dr. Eleanor Vance", actorRole: "Lead Chief Examiner", action: "Signed off cryptographic approval for Question Paper Set A", ipAddress: "10.0.4.12", module: "Paper Vault", securitySeverity: "info", hashSignature: "e3b0c4...855" },
  { id: "log-103", timestamp: "Feb 24, 2026 at 08:00:00 AM", actorName: "Marcus Sterling", actorRole: "Chief Controller", action: "Released decryption key for NAT-RECRUIT-2026 session 1", ipAddress: "10.0.0.1", module: "Key Management", securitySeverity: "critical", hashSignature: "7c9e01...2f4" },
];

export function ComplianceAuditLogger() {
  const [logs, setLogs] = useState<AuditLogEntry[]>(mockAuditLogs);
  const [searchTerm, setSearchTerm] = useState("");

  const handleExportCompliance = () => {
    toast.success("Exporting Legal Compliance & Security Audit Log Package (Encrypted PDF)...");
  };

  const filteredLogs = logs.filter(
    (l) => l.action.toLowerCase().includes(searchTerm.toLowerCase()) || l.actorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" /> Compliance & Tamper-Proof Audit Logger
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Immutable examination audit logs backed by cryptographic hash signatures for regulatory compliance and legal accountability.
          </p>
        </div>

        <Button
          onClick={handleExportCompliance}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg"
        >
          <Download className="w-4 h-4 mr-1.5" /> Export Compliance Package
        </Button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search action or actor name..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          Logs Sealed: <span className="font-bold text-rose-600">{logs.length} Entries</span>
        </span>
      </div>

      {/* Audit Log Timeline Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="p-3">Timestamp</th>
              <th className="p-3">Actor & Role</th>
              <th className="p-3">Module</th>
              <th className="p-3">Action Description</th>
              <th className="p-3">IP Address</th>
              <th className="p-3 text-right">SHA-256 Hash</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-mono text-slate-500 text-[11px]">{log.timestamp}</td>
                <td className="p-3">
                  <span className="font-bold text-slate-900 dark:text-white block">{log.actorName}</span>
                  <span className="text-[10px] text-slate-400">{log.actorRole}</span>
                </td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[10px]">
                    {log.module}
                  </span>
                </td>
                <td className="p-3 text-slate-700 dark:text-slate-200 font-medium">{log.action}</td>
                <td className="p-3 font-mono text-slate-500 text-[11px]">{log.ipAddress}</td>
                <td className="p-3 text-right font-mono text-[10px] text-rose-600 font-bold">{log.hashSignature}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
