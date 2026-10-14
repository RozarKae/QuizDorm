"use client";

import React from "react";
import { EnterpriseWorkflowEngine } from "@/lib/enterprise/workflowEngine";
import { GitMerge, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

export function EnterpriseWorkflowCard() {
  const workflows = EnterpriseWorkflowEngine.getWorkflows();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <GitMerge className="w-5 h-5 text-indigo-600 mr-2" /> Enterprise Visual Approval Workflows
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
                  wf.status === "approved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
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
                      ? "bg-emerald-50/60 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300"
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
