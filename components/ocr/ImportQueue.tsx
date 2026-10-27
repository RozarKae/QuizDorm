"use client";

import { Button } from "@/components/ui/button";
import { OCRJob } from "@/lib/types/ocr";
import { AlertCircle,ArrowRight,Eye,FileText,Loader2,RefreshCw,Trash2 } from "lucide-react";
import { ConfidenceBadge } from "./ConfidenceBadge";

interface ImportQueueProps {
  jobs: OCRJob[];
  onSelectJob: (job: OCRJob) => void;
  onRetryJob: (jobId: string) => void;
  onDeleteJob: (jobId: string) => void;
}

export function ImportQueue({ jobs, onSelectJob, onRetryJob, onDeleteJob }: ImportQueueProps) {
  if (jobs.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 text-center text-gray-500">
        <FileText className="w-10 h-10 mx-auto text-gray-300 dark:text-gray-700 mb-2" />
        <p className="text-sm font-semibold">No active OCR jobs in queue</p>
        <p className="text-xs text-gray-400 mt-1">Upload a PDF or image above to initiate digitization.</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {jobs.map((job) => {
        const isProcessing = job.status === "processing" || job.status === "queued";
        const isReviewReady = job.status === "review_ready";
        const isFailed = job.status === "failed";
        const isCompleted = job.status === "completed";

        return (
          <div
            key={job.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
              isReviewReady
                ? "bg-indigo-50/40 dark:bg-indigo-950/30 border-indigo-200 dark:border-indigo-800"
                : isFailed
                ? "bg-rose-50/40 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800"
                : "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800"
            }`}
          >
            {/* File Info */}
            <div className="flex items-start space-x-3 min-w-0">
              <div className="p-2.5 rounded-xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400 flex-shrink-0 mt-0.5">
                {isProcessing ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : isFailed ? (
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                ) : (
                  <FileText className="w-5 h-5" />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{job.fileName}</h4>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 uppercase">
                    {job.fileType}
                  </span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                    {job.subject || "General"}
                  </span>
                </div>

                <div className="flex items-center space-x-3 text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                  <span>Step: {job.currentStep}</span>
                  <span>•</span>
                  <span>{(job.fileSize / (1024 * 1024)).toFixed(2)} MB</span>
                  <span>•</span>
                  <span>{new Date(job.uploadedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
                </div>

                {/* Progress bar if processing */}
                {isProcessing && (
                  <div className="mt-2 w-full bg-gray-200 dark:bg-gray-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-indigo-600 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${job.progress}%` }}
                    />
                  </div>
                )}

                {/* Low Confidence or Error Alert */}
                {isReviewReady && job.lowConfidenceCount && job.lowConfidenceCount > 0 ? (
                  <div className="mt-1.5 text-[11px] text-amber-600 dark:text-amber-400 flex items-center font-medium">
                    <AlertCircle className="w-3.5 h-3.5 mr-1 flex-shrink-0" />
                    {job.lowConfidenceCount} question(s) flagged for low-confidence review.
                  </div>
                ) : null}

                {isFailed && job.error && (
                  <div className="mt-1 text-[11px] text-rose-600 dark:text-rose-400 font-medium">
                    Error: {job.error}
                  </div>
                )}
              </div>
            </div>

            {/* Actions & Badge */}
            <div className="flex items-center space-x-3 self-end md:self-center">
              {job.extractedQuestions.length > 0 && (
                <ConfidenceBadge
                  confidence={
                    job.extractedQuestions[0]?.confidence || {
                      overall: 90,
                      ocrAccuracy: 92,
                      questionDetection: 90,
                      answerDetection: 88,
                      tableRecognition: 94,
                      handwritingRecognition: 90,
                    }
                  }
                  size="sm"
                />
              )}

              {isReviewReady && (
                <Button
                  onClick={() => onSelectJob(job)}
                  size="sm"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm"
                >
                  Review Questions ({job.extractedQuestions.length}) <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              )}

              {isCompleted && (
                <Button
                  onClick={() => onSelectJob(job)}
                  variant="outline"
                  size="sm"
                  className="text-xs rounded-xl border-gray-200 dark:border-gray-800"
                >
                  <Eye className="w-3.5 h-3.5 mr-1" /> View Extracted
                </Button>
              )}

              {isFailed && (
                <Button
                  onClick={() => onRetryJob(job.id)}
                  size="sm"
                  variant="outline"
                  className="text-xs rounded-xl border-rose-200 text-rose-600 hover:bg-rose-50"
                >
                  <RefreshCw className="w-3.5 h-3.5 mr-1" /> Retry
                </Button>
              )}

              <button
                onClick={() => onDeleteJob(job.id)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-rose-600 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
                title="Delete Job"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
