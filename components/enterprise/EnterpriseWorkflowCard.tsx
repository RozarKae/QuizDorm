"use client";

import { Card } from "@/components/ui/card";
import { EnterpriseWorkflowEngine } from "@/lib/enterprise/workflowEngine";
import { GitMerge } from "lucide-react";

export function EnterpriseWorkflowCard() {
  const workflows = EnterpriseWorkflowEngine.getWorkflows();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <GitMerge className="w-5 h-5 text-indigo-600 mr-2" /> Multi-Tier Administrative Governance & Approvals
        </h3>
        <span className="text-xs font-mono font-bold text-indigo-600">Multi-Role Sign-off</span>
      </div>

      <div className="space-y-3 text-xs">
        {workflows.map((wf) => (
          <div key={wf.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-3">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{wf.title}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  wf.status === "approved" ? "bg-rose-100 text-rose-800" : "bg-amber-100 text-amber-800"
                }`}
              >
                {wf.status}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
              {wf.approvalSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`p-2 rounded-xl border ${
                    step.approved
                      ? "bg-rose-50/60 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-800 dark:text-rose-300"
                      : "bg-amber-50/60 dark:bg-amber-950/30 border-amber-300 dark:border-amber-800 text-amber-800 dark:text-amber-300"
                  }`}
                >
                  <span className="font-bold block font-sans">{step.role}</span>
                  <span>{step.approverName || "Pending"}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
