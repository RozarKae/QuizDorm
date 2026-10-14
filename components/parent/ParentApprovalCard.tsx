"use client";

import React, { useState } from "react";
import { ParentApprovalRequest } from "@/lib/types/parent";
import { ParentApprovalService } from "@/lib/parent/approvalService";
import { ShieldCheck, Check, X, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";

interface ParentApprovalCardProps {
  studentId: string;
}

export function ParentApprovalCard({ studentId }: ParentApprovalCardProps) {
  const [approvals, setApprovals] = useState<ParentApprovalRequest[]>(ParentApprovalService.getApprovals(studentId));

  const handleUpdate = (id: string, status: "approved" | "declined") => {
    const updated = ParentApprovalService.updateApprovalStatus(id, status);
    setApprovals(updated.filter((a) => a.studentId === studentId));
    toast.success(`Digital consent form marked as ${status.toUpperCase()}!`);
  };

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          <ShieldCheck className="w-5 h-5 text-indigo-600 mr-2" /> Digital Consent & Parental Approvals
        </h3>
      </div>

      <div className="space-y-3 text-xs">
        {approvals.map((appr) => (
          <div key={appr.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{appr.title}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  appr.status === "approved"
                    ? "bg-emerald-100 text-emerald-800"
                    : appr.status === "declined"
                    ? "bg-rose-100 text-rose-800"
                    : "bg-amber-100 text-amber-800"
                }`}
              >
                {appr.status}
              </span>
            </div>

            <p className="text-gray-600 dark:text-gray-300">{appr.description}</p>

            <div className="flex items-center justify-between pt-2 border-t border-gray-200/40 text-[10px] text-gray-400 font-mono">
              <span>Requested by: {appr.requestedBy}</span>
              <span>Due: {appr.dueDate}</span>
            </div>

            {appr.status === "pending" && (
              <div className="flex justify-end space-x-2 pt-2">
                <Button onClick={() => handleUpdate(appr.id, "declined")} size="sm" variant="outline" className="text-xs rounded-xl">
                  Decline
                </Button>
                <Button onClick={() => handleUpdate(appr.id, "approved")} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl">
                  <Check className="w-3.5 h-3.5 mr-1" /> Approve Consent
                </Button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}
