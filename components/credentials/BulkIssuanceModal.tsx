"use client";

import React, { useState } from "react";
import { BulkCertificateIssuer } from "@/lib/credentials/bulkIssuer";
import { Users, Award, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface BulkIssuanceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onComplete?: () => void;
}

export function BulkIssuanceModal({ open, onOpenChange, onComplete }: BulkIssuanceModalProps) {
  const [certTitle, setCertTitle] = useState("Certificate of Course Completion - Grade 12 Math");
  const [subject, setSubject] = useState("Mathematics");
  const [orgName, setOrgName] = useState("QuizDorm Academy");
  const [issuing, setIssuing] = useState(false);

  if (!open) return null;

  const handleRunBulk = async () => {
    setIssuing(true);
    try {
      const result = await BulkCertificateIssuer.issueBulkCertificates({
        title: certTitle,
        category: "course_completion",
        subject,
        organizationName: orgName,
        templateId: "tpl-gold-1",
        recipients: [
          { id: "std-101", name: "Karthik Rajendran", scorePercent: 94, rank: 1 },
          { id: "std-102", name: "Fathima Nasreen", scorePercent: 88, rank: 2 },
          { id: "std-103", name: "Anandhi K. Bapu", scorePercent: 85, rank: 3 },
          { id: "std-104", name: "Kevin Fernandez", scorePercent: 92, rank: 4 },
        ],
      });

      toast.success(`Successfully issued ${result.length} digital certificates!`);
      if (onComplete) onComplete();
      onOpenChange(false);
    } catch {
      toast.error("Bulk certificate issuance failed.");
    } finally {
      setIssuing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Users className="w-5 h-5 text-indigo-600 mr-2" /> Bulk Certificate Batch Issuer
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Certificate Event Title</label>
            <Input value={certTitle} onChange={(e) => setCertTitle(e.target.value)} className="text-xs" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Subject</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="text-xs" />
            </div>
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Organization Name</label>
              <Input value={orgName} onChange={(e) => setOrgName(e.target.value)} className="text-xs" />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 space-y-1">
            <span className="font-bold text-gray-700 dark:text-gray-300 block">Classroom Recipient List (4 Students)</span>
            <div className="text-[11px] font-mono text-gray-500">
              • Karthik Rajendran (94%) • Fathima Nasreen (88%) • Anandhi K. Bapu (85%) • Kevin Fernandez (92%)
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
          <Button onClick={handleRunBulk} disabled={issuing} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl">
            {issuing ? <RefreshCw className="w-4 h-4 mr-1 animate-spin" /> : <Award className="w-4 h-4 mr-1" />}
            {issuing ? "Generating Batch..." : "Issue 4 Certificates"}
          </Button>
        </div>
      </div>
    </div>
  );
}
