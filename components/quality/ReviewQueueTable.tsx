"use client";

import { QualityReviewManager } from "@/lib/quality/qualityManager";
import { QualityAnalysisReport } from "@/lib/types/quality";
import React from "react";
import { BloomsIndicator } from "./BloomsIndicator";
import { QualityScoreBadge } from "./QualityScoreBadge";

import { Button } from "@/components/ui/button";
import { Check,ShieldCheck,X } from "lucide-react";
import { toast } from "sonner";

interface ReviewQueueTableProps {
  reports: QualityAnalysisReport[];
  onSelectReport?: (report: QualityAnalysisReport) => void;
  onRefresh?: () => void;
}

export function ReviewQueueTable({ reports, onSelectReport, onRefresh }: ReviewQueueTableProps) {
  const handleApprove = (r: QualityAnalysisReport, e: React.MouseEvent) => {
    e.stopPropagation();
    QualityReviewManager.updateReportStatus(r.id, "approved");
    toast.success(`Question [${r.questionTitle.slice(0, 30)}...] approved and added to Question Bank!`);
    if (onRefresh) onRefresh();
  };

  const handleReject = (r: QualityAnalysisReport, e: React.MouseEvent) => {
    e.stopPropagation();
    QualityReviewManager.updateReportStatus(r.id, "rejected");
    toast.error(`Question rejected`);
    if (onRefresh) onRefresh();
  };

  if (reports.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-950 p-8 text-center rounded-3xl border border-gray-200 dark:border-gray-800 space-y-2">
        <ShieldCheck className="w-10 h-10 text-rose-500 mx-auto" />
        <h4 className="font-bold text-gray-900 dark:text-white text-base">Review Queue is Clear!</h4>
        <p className="text-xs text-gray-500 max-w-sm mx-auto">
          All assessment items in the Question Bank meet QuizDorm educational quality standards.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-800 text-gray-500 font-semibold bg-gray-50/50 dark:bg-gray-900/50">
              <th className="p-4">Question Title</th>
              <th className="p-4">Quality Score</th>
              <th className="p-4">Bloom&apos;s Level</th>
              <th className="p-4">Difficulty</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Educator Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800 font-medium">
            {reports.map((r) => (
              <tr
                key={r.id}
                onClick={() => onSelectReport && onSelectReport(r)}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/60 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <div className="font-bold text-gray-900 dark:text-white line-clamp-1 max-w-md">
                    {r.questionTitle}
                  </div>
                  <span className="text-[10px] text-gray-400 font-mono">ID: {r.questionId}</span>
                </td>

                <td className="p-4">
                  <QualityScoreBadge score={r.qualityBreakdown.overallScore} size="sm" />
                </td>

                <td className="p-4">
                  <BloomsIndicator level={r.bloomsLevel} />
                </td>

                <td className="p-4 font-mono font-semibold">
                  <span className={r.difficulty.matchesTeacher ? "text-gray-700 dark:text-gray-300" : "text-amber-600"}>
                    {r.difficulty.predictedLevel}
                  </span>
                </td>

                <td className="p-4 font-sans">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      r.status === "approved"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                        : r.status === "rejected"
                        ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                        : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300"
                    }`}
                  >
                    {r.status.replace(/_/g, " ")}
                  </span>
                </td>

                <td className="p-4 text-right space-x-1.5">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => handleApprove(r, e)}
                    className="h-8 text-[11px] rounded-xl border-rose-300 text-rose-700 hover:bg-rose-50"
                  >
                    <Check className="w-3.5 h-3.5 mr-1" /> Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => handleReject(r, e)}
                    className="h-8 text-[11px] rounded-xl text-rose-600 hover:bg-rose-50"
                  >
                    <X className="w-3.5 h-3.5 mr-1" /> Reject
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
