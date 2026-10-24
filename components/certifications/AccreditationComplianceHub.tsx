"use client";

import React, { useState } from "react";
import { AccreditationStandard } from "@/lib/types/certifications";
import { Button } from "@/components/ui/button";
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, FileText, Sparkles
} from "lucide-react";
import { toast } from "sonner";

const mockAccreditation: AccreditationStandard[] = [
  { id: "acc-1", standardName: "ISO/IEC 17024:2012 Conformity Assessment for Certification Bodies", accreditingBody: "International Accreditation Forum (IAF)", auditStatus: "Compliant", lastAuditDate: "Jan 15, 2026", complianceScore: 99.4 },
  { id: "acc-2", standardName: "ANSI/COSN 102 National Educational Credential Standard", accreditingBody: "ANSI Accreditation Board", auditStatus: "Compliant", lastAuditDate: "Feb 01, 2026", complianceScore: 98.2 },
];

export function AccreditationComplianceHub() {
  const [standards, setStandards] = useState<AccreditationStandard[]>(mockAccreditation);

  const handleRunComplianceCheck = () => {
    toast.success("Ran Automated ISO/IEC 17024 Audit Check! 100% Compliant.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-indigo-600" /> Accreditation & Regulatory Compliance Hub
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Institutional compliance governance according to ISO/IEC 17024 personnel certification standards, quality assurance checks, and audit trails.
          </p>
        </div>

        <Button onClick={handleRunComplianceCheck} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <Sparkles className="w-4 h-4 mr-1.5" /> Run Audit Verification
        </Button>
      </div>

      {/* Accreditation Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {standards.map((st) => (
          <div key={st.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">
                    {st.accreditingBody}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{st.standardName}</h3>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                  {st.auditStatus}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Compliance Audit Rating:</span>
                  <span className="font-mono font-bold text-rose-600">{st.complianceScore}% Score</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Last Audit Date:</span>
                  <span className="text-slate-500">{st.lastAuditDate}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Renewal Cycle: Annual</span>
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                Audit Dossier
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
