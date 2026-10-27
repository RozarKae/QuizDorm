"use client";

import { Button } from "@/components/ui/button";
import { EnterpriseInstitution } from "@/lib/types/lms";
import {
Building2,
Plus,
Sliders
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockInstitutions: EnterpriseInstitution[] = [
  { id: "inst-1", name: "Government Model Higher Secondary Consortium (Chennai)", code: "TN-GOVT-HSS", departmentsCount: 12, facultyCount: 140, studentQuota: 25000, activeStudents: 18450, creditSystemActive: true, whiteLabelDomain: "lms.saidapetmodel.edu.in" },
  { id: "inst-2", name: "The Choice School & Collegiate Network (Kochi)", code: "CHOICE-KOCHI", departmentsCount: 6, facultyCount: 45, studentQuota: 8000, activeStudents: 6200, creditSystemActive: true, whiteLabelDomain: "learn.choice.ac.in" },
];

export function EnterpriseLMSConsole() {
  const [institutions, setInstitutions] = useState<EnterpriseInstitution[]>(mockInstitutions);

  const handleToggleCreditSystem = (id: string) => {
    setInstitutions((prev) =>
      prev.map((inst) => (inst.id === id ? { ...inst, creditSystemActive: !inst.creditSystemActive } : inst))
    );
    toast.success("Academic credit transfer system status updated.");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold mb-2 border border-rose-500/30">
            <Building2 className="w-3.5 h-3.5" /> Enterprise Multi-Tenant Administration
          </div>
          <h2 className="text-2xl font-bold">Enterprise LMS & Institutional Platform</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Manage multi-tenant school systems, university departments, academic credit rules, white-label domains, and corporate training portals.
          </p>
        </div>

        <Button onClick={() => toast.info("Provisioning wizard opened...")} className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl shadow-lg">
          <Plus className="w-4 h-4 mr-1.5" /> Provision New Institution
        </Button>
      </div>

      {/* Institution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {institutions.map((inst) => (
          <div key={inst.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {inst.code}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{inst.name}</h3>
                </div>
                <span className="text-[10px] text-rose-600 font-bold bg-rose-500/10 px-2 py-0.5 rounded">
                  {inst.activeStudents.toLocaleString()} Active Learners
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">White-Label Domain:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{inst.whiteLabelDomain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Departments / Faculty:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{inst.departmentsCount} Depts • {inst.facultyCount} Faculty</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <Button
                onClick={() => handleToggleCreditSystem(inst.id)}
                variant="ghost"
                size="sm"
                className="text-xs rounded-xl text-slate-500"
              >
                <Sliders className="w-3.5 h-3.5 mr-1" />
                {inst.creditSystemActive ? "Academic Credits: Active" : "Enable Credit System"}
              </Button>
              <Button size="sm" className="bg-indigo-600 text-white text-xs rounded-xl font-semibold">
                Admin Console
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
