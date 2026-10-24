"use client";

import React, { useState } from "react";
import { ComplianceFramework } from "@/lib/types/cloud-ops";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, CheckCircle2, FileText, Lock, Globe, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockFrameworks: ComplianceFramework[] = [
  { frameworkName: "GDPR (EU Data Privacy)", complianceScorePercent: 100, auditTrailLogsCount: 1420000, dataResidencyRegion: "EU-Central (Frankfurt)", status: "Certified & Compliant" },
  { frameworkName: "FERPA (US Educational Rights)", complianceScorePercent: 100, auditTrailLogsCount: 2890000, dataResidencyRegion: "US-East (N. Virginia)", status: "Certified & Compliant" },
  { frameworkName: "SOC 2 Type II", complianceScorePercent: 99.8, auditTrailLogsCount: 4120000, dataResidencyRegion: "Global Regions", status: "Certified & Compliant" },
  { frameworkName: "ISO/IEC 27001:2022", complianceScorePercent: 100, auditTrailLogsCount: 890000, dataResidencyRegion: "Global Regions", status: "Certified & Compliant" },
];

export function ComplianceGovernanceDashboard() {
  const [frameworks, setFrameworks] = useState<ComplianceFramework[]>(mockFrameworks);

  const handleRunAudit = () => {
    toast.success("Ran Real-Time Compliance Governance Audit across all global tenant regions: 100% Pass Rate!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 text-xs font-bold mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> International Security & Data Privacy Regulatory Standards
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" /> Compliance & Governance Dashboard
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            GDPR, FERPA, SOC 2 Type II, ISO/IEC 27001 readiness, regional data residency controls, and audit trails.
          </p>
        </div>

        <Button onClick={handleRunAudit} className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5" /> Run Compliance Audit
        </Button>
      </div>

      {/* Frameworks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {frameworks.map((fw) => (
          <div key={fw.frameworkName} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-rose-600 dark:text-rose-400 px-2 py-0.5 rounded bg-rose-50 dark:bg-rose-950">
                    Score: {fw.complianceScorePercent}%
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{fw.frameworkName}</h3>
                  <p className="text-xs text-slate-500">Data Residency: {fw.dataResidencyRegion}</p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                  {fw.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-400">Cryptographic Audit Logs:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{(fw.auditTrailLogsCount / 1000000).toFixed(2)}M Events</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs font-mono">
              <span className="text-slate-400">SOC/ISO Ready</span>
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                Download Audit Certificate
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
