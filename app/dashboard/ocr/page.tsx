"use client";

import React, { useState, useEffect } from "react";
import { OCRJob, OCRJobSettings, ExtractedQuestion } from "@/lib/types/ocr";
import { OCRJobManager } from "@/lib/ocr/job-manager";
import { OCREngineService } from "@/lib/ocr/engine";
import { OCRUploadCard } from "@/components/ocr/OCRUploadCard";
import { ImportQueue } from "@/components/ocr/ImportQueue";
import { ImportReviewTable } from "@/components/ocr/ImportReviewTable";
import { ImportProgress } from "@/components/ocr/ImportProgress";
import { OCRSettings } from "@/components/ocr/OCRSettings";
import { OCRHistory } from "@/components/ocr/OCRHistory";
import { OCRPreview } from "@/components/ocr/OCRPreview";
import { BulkImportDialog } from "@/components/ocr/BulkImportDialog";
import { QuestionDetectionPanel } from "@/components/ocr/QuestionDetectionPanel";

import {
  ScanText,
  Upload,
  Clock,
  Layers,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
  Settings,
  Sparkles,
  RefreshCw,
  Plus,
  Eye,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function DocumentIntelligenceWorkspace() {
  const [activeTab, setActiveTab] = useState<
    "upload" | "queue" | "review" | "history" | "settings"
  >("upload");

  const [jobs, setJobs] = useState<OCRJob[]>([]);
  const [selectedJob, setSelectedJob] = useState<OCRJob | null>(null);
  const [previewJob, setPreviewJob] = useState<OCRJob | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [settings, setSettings] = useState<OCRJobSettings>({
    language: "auto",
    mode: "printed",
    provider: "mock",
    autoNumbering: true,
    autoTopicDetection: true,
    autoDifficultyDetection: true,
    virusScanPassed: true,
  });

  // Load jobs from localStorage / persistent manager
  useEffect(() => {
    const loadedJobs = OCRJobManager.getJobs();
    setJobs(loadedJobs);

    // Default select review ready job if available
    const reviewReady = loadedJobs.find((j) => j.status === "review_ready");
    if (reviewReady) {
      setSelectedJob(reviewReady);
    } else if (loadedJobs.length > 0) {
      setSelectedJob(loadedJobs[0]);
    }
  }, []);

  const handleUploadStart = async (
    file: File | { name: string; type: string; content?: string },
    subject: string
  ) => {
    setLoading(true);
    try {
      const newJob = await OCRJobManager.createJob(file, settings, subject);
      const updatedJobs = OCRJobManager.getJobs();
      setJobs(updatedJobs);
      setSelectedJob(newJob);
      setActiveTab("queue");

      // Run pipeline asynchronously with live progress updates
      OCRJobManager.runJobPipeline(newJob.id, file, (updated) => {
        setJobs(OCRJobManager.getJobs());
        if (selectedJob?.id === updated.id) {
          setSelectedJob(updated);
        }
      })
        .then((completedJob) => {
          toast.success(`OCR Digitization completed for ${completedJob.fileName}! Ready for Educator Review.`);
          setSelectedJob(completedJob);
          setActiveTab("review");
        })
        .catch((err) => {
          toast.error(`OCR processing failed: ${err.message}`);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (err: any) {
      toast.error(err.message || "Failed to start OCR job");
      setLoading(false);
    }
  };

  const handleStartBulkImport = (files: File[], subject: string) => {
    files.forEach((file) => {
      handleUploadStart(file, subject);
    });
  };

  const handleRetryJob = (jobId: string) => {
    setLoading(true);
    OCRJobManager.runJobPipeline(jobId, undefined, (updated) => {
      setJobs(OCRJobManager.getJobs());
      if (selectedJob?.id === updated.id) {
        setSelectedJob(updated);
      }
    })
      .then((completed) => {
        toast.success(`Job ${completed.fileName} retried successfully!`);
        setSelectedJob(completed);
        setActiveTab("review");
      })
      .catch((err) => {
        toast.error(`Retry failed: ${err.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDeleteJob = (jobId: string) => {
    OCRJobManager.deleteJob(jobId);
    const updated = OCRJobManager.getJobs();
    setJobs(updated);
    if (selectedJob?.id === jobId) {
      setSelectedJob(updated[0] || null);
    }
    toast.success("Job deleted successfully.");
  };

  const handleUpdateQuestions = (questions: ExtractedQuestion[]) => {
    if (!selectedJob) return;
    OCRJobManager.updateJobQuestions(selectedJob.id, questions);
    setSelectedJob({ ...selectedJob, extractedQuestions: questions });
    setJobs(OCRJobManager.getJobs());
  };

  const handleSaveToQuestionBank = (questions: ExtractedQuestion[]) => {
    if (!selectedJob) return;

    OCRJobManager.updateJobStatus(selectedJob.id, "completed");
    setSelectedJob({ ...selectedJob, status: "completed", currentStep: "Completed" });
    setJobs(OCRJobManager.getJobs());

    toast.success(
      `Successfully imported ${questions.length} digitised questions from ${selectedJob.fileName} into Question Bank!`
    );
  };

  const handleSplitQuestion = (q: ExtractedQuestion) => {
    if (!selectedJob) return;
    const [q1, q2] = OCREngineService.splitQuestion(q);
    const updated = selectedJob.extractedQuestions.flatMap((item) => (item.id === q.id ? [q1, q2] : [item]));
    handleUpdateQuestions(updated);
    toast.success("Question split into 2 separate items!");
  };

  const handleMergeQuestions = (q1: ExtractedQuestion, q2: ExtractedQuestion) => {
    if (!selectedJob) return;
    const merged = OCREngineService.mergeQuestions(q1, q2);
    const updated = selectedJob.extractedQuestions
      .filter((item) => item.id !== q2.id)
      .map((item) => (item.id === q1.id ? merged : item));
    handleUpdateQuestions(updated);
    toast.success("Questions merged successfully!");
  };

  const reviewReadyJobs = jobs.filter((j) => j.status === "review_ready");
  const processingJobs = jobs.filter((j) => j.status === "processing" || j.status === "queued");

  // Summary Metrics
  const totalQuestionsDigitized = jobs.reduce((acc, j) => acc + (j.extractedQuestions?.length || 0), 0);
  const avgConfidence = Math.round(
    jobs.reduce((acc, j) => acc + (j.extractedQuestions[0]?.confidence.overall || 90), 0) / (jobs.length || 1)
  );

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Workspace Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
                <ScanText className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.1 Workspace
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Document Intelligence & OCR Workspace
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Convert printed books, scanned exams, handwritten notes, PDFs, and Word documents into fully editable, AI-enhanced questions inside the Question Bank.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={() => setBulkDialogOpen(true)}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 rounded-2xl backdrop-blur-md"
            >
              <Layers className="w-4 h-4 mr-1.5" /> Bulk Document Digitizer
            </Button>

            <Button
              onClick={() => setActiveTab("upload")}
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30"
            >
              <Plus className="w-4 h-4 mr-1.5" /> New OCR Upload
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/10 text-xs">
          <div className="space-y-1">
            <span className="text-indigo-200/70 font-medium">Total Questions Digitized</span>
            <div className="text-xl font-bold text-white">{totalQuestionsDigitized} Items</div>
          </div>
          <div className="space-y-1">
            <span className="text-indigo-200/70 font-medium">AI Review Queue</span>
            <div className="text-xl font-bold text-emerald-400">{reviewReadyJobs.length} Jobs Ready</div>
          </div>
          <div className="space-y-1">
            <span className="text-indigo-200/70 font-medium">Active Processing Queue</span>
            <div className="text-xl font-bold text-amber-300">{processingJobs.length} Jobs Active</div>
          </div>
          <div className="space-y-1">
            <span className="text-indigo-200/70 font-medium">Average OCR Confidence</span>
            <div className="text-xl font-bold text-indigo-300">{avgConfidence}% Accuracy</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-1 overflow-x-auto">
        {[
          { id: "upload", label: "Upload Center", icon: <Upload className="w-4 h-4" /> },
          {
            id: "queue",
            label: "Processing & Review Queue",
            icon: <Zap className="w-4 h-4" />,
            badge: reviewReadyJobs.length > 0 ? `${reviewReadyJobs.length} Ready` : undefined,
          },
          { id: "review", label: "AI Educator Review", icon: <CheckCircle2 className="w-4 h-4" /> },
          { id: "history", label: "Import Audit History", icon: <Clock className="w-4 h-4" /> },
          { id: "settings", label: "OCR & Intelligence Settings", icon: <Settings className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isActive ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"}`}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Upload Center */}
      {activeTab === "upload" && (
        <div className="space-y-6">
          <OCRUploadCard settings={settings} onUploadStart={handleUploadStart} loading={loading} />

          {selectedJob && selectedJob.status === "processing" && (
            <ImportProgress currentStep={selectedJob.currentStep} progress={selectedJob.progress} />
          )}

          {/* Quick Recent Jobs summary */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
              <Clock className="w-4 h-4 text-indigo-600 mr-1.5" /> Recent Digitization Jobs
            </h3>
            <ImportQueue
              jobs={jobs.slice(0, 3)}
              onSelectJob={(j) => {
                setSelectedJob(j);
                setActiveTab("review");
              }}
              onRetryJob={handleRetryJob}
              onDeleteJob={handleDeleteJob}
            />
          </div>
        </div>
      )}

      {/* Tab 2: Processing & Review Queue */}
      {activeTab === "queue" && (
        <div className="space-y-6">
          {selectedJob && (
            <ImportProgress currentStep={selectedJob.currentStep} progress={selectedJob.progress} />
          )}

          <div className="space-y-3">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center">
              <Layers className="w-4 h-4 text-indigo-600 mr-1.5" /> Active Job Queue ({jobs.length})
            </h3>
            <ImportQueue
              jobs={jobs}
              onSelectJob={(j) => {
                setSelectedJob(j);
                setActiveTab("review");
              }}
              onRetryJob={handleRetryJob}
              onDeleteJob={handleDeleteJob}
            />
          </div>
        </div>
      )}

      {/* Tab 3: Educator Review Workspace */}
      {activeTab === "review" && selectedJob && (
        <div className="space-y-6">
          <ImportReviewTable
            questions={selectedJob.extractedQuestions}
            onUpdateQuestions={handleUpdateQuestions}
            onSaveToQuestionBank={handleSaveToQuestionBank}
            onOpenPreview={() => {
              setPreviewJob(selectedJob);
              setPreviewOpen(true);
            }}
          />
        </div>
      )}

      {/* Tab 4: Searchable Import Audit History */}
      {activeTab === "history" && (
        <OCRHistory
          jobs={jobs}
          onSelectJob={(j) => {
            setSelectedJob(j);
            setActiveTab("review");
          }}
          onDeleteJob={handleDeleteJob}
        />
      )}

      {/* Tab 5: OCR Settings */}
      {activeTab === "settings" && <OCRSettings settings={settings} onChange={setSettings} />}

      {/* OCR Visual Region Preview Modal */}
      {previewJob && (
        <OCRPreview job={previewJob} open={previewOpen} onOpenChange={setPreviewOpen} />
      )}

      {/* Bulk Document Import Modal */}
      <BulkImportDialog
        open={bulkDialogOpen}
        onOpenChange={setBulkDialogOpen}
        onStartBulkImport={handleStartBulkImport}
      />
    </div>
  );
}
