"use client";

import React, { useState, useEffect } from "react";
import { OCRJob, OCRJobSettings, ExtractedQuestion } from "@/lib/types/ocr";
import { QuestionItem } from "@/lib/types/question";
import { importQuestions } from "@/lib/data/question-bank";
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
import { AIDocumentQuizModal } from "@/components/ai/AIDocumentQuizModal";

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
  const [aiQuizModalOpen, setAiQuizModalOpen] = useState(false);
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

    // Convert ExtractedQuestion[] to QuestionItem[] for persistent Question Bank
    const questionItems: QuestionItem[] = questions.map((eq, idx) => ({
      id: eq.id || `pdf-saved-${Date.now()}-${idx + 1}`,
      title: eq.title,
      description: eq.description,
      type: eq.type,
      subject: eq.subject || selectedJob.subject || "General Academic",
      category: eq.category || eq.subject || selectedJob.subject || "General Academic",
      topic: eq.topic || "Core Principles",
      subtopic: eq.subtopic,
      difficulty: eq.difficulty || "Medium",
      marks: eq.marks || 4,
      timeLimitSeconds: eq.timeLimitSeconds || 60,
      options: eq.options.map((opt, oIdx) => ({
        id: opt.id || `opt-${oIdx + 1}`,
        text: opt.text,
        isCorrect: opt.isCorrect,
      })),
      matchingPairs: eq.matchingPairs?.map((mp) => ({
        id: mp.id,
        leftItem: mp.leftItem,
        rightItem: mp.rightItem,
      })),
      sequenceItems: eq.sequenceItems?.map((si) => ({
        id: si.id,
        text: si.text,
        order: si.order,
      })),
      fillBlanks: eq.fillBlanks,
      explanation: eq.explanation,
      hints: eq.hints,
      tags: ["pdf-imported", (eq.subject || "academic").toLowerCase()],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }));

    const result = importQuestions(questionItems);

    OCRJobManager.updateJobStatus(selectedJob.id, "completed");
    setSelectedJob({ ...selectedJob, status: "completed", currentStep: "Completed" });
    setJobs(OCRJobManager.getJobs());

    if (result.skipped > 0) {
      toast.success(
        `Successfully saved ${result.imported} approved questions to Question Bank! (${result.skipped} duplicates skipped)`
      );
    } else {
      toast.success(
        `Successfully saved all ${result.imported} questions from ${selectedJob.fileName} to Question Bank!`
      );
    }
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
    <div className="p-4 sm:p-6 space-y-6 max-w-7xl mx-auto">
      {/* Workspace Header */}
      <div className="bg-[#0C1210] text-[#F2F7F3] rounded-[6px] p-6 sm:p-8 border border-[rgba(160,190,170,0.14)] shadow-sm relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at 15% 15%, rgba(101, 245, 154, 0.08), transparent 60%)",
          }}
        />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-1.5 rounded-[4px] bg-[#17251E] border border-[rgba(101,245,154,0.25)] text-[#65F59A]">
                <ScanText className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#65F59A] bg-[rgba(101,245,154,0.12)] px-2.5 py-0.5 rounded-[3px] border border-[rgba(101,245,154,0.28)]">
                AI DOCUMENT INTELLIGENCE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
              Document Intelligence & Question Studio
            </h1>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-2xl leading-relaxed">
              Convert printed textbooks, scanned exam sheets, notes, and academic PDFs into verified, editable questions in the central repository.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Button
              onClick={() => setAiQuizModalOpen(true)}
              size="sm"
              className="bg-[#65F59A] hover:bg-[#38D9B0] text-[#070B0A] font-bold font-mono text-xs rounded-[4px] shadow-[0_0_15px_rgba(101,245,154,0.3)] transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 mr-1.5 stroke-[2.5]" /> AI Quiz Maker
            </Button>

            <Button
              onClick={() => setBulkDialogOpen(true)}
              variant="outline"
              className="text-xs font-mono rounded-[4px]"
            >
              <Layers className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> Bulk Document Digitizer
            </Button>

            <Button
              onClick={() => setActiveTab("upload")}
              size="sm"
              className="font-mono text-xs rounded-[4px]"
            >
              <Plus className="w-3.5 h-3.5 mr-1.5" /> New Upload
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-[rgba(160,190,170,0.12)] text-xs font-mono">
          <div className="space-y-1">
            <span className="text-[#69786F] uppercase tracking-wider text-[10px]">Total Digitized</span>
            <div className="text-xl font-bold text-[#F2F7F3]">{totalQuestionsDigitized} Items</div>
          </div>
          <div className="space-y-1">
            <span className="text-[#69786F] uppercase tracking-wider text-[10px]">Review Queue</span>
            <div className="text-xl font-bold text-[#65F59A]">{reviewReadyJobs.length} Jobs Ready</div>
          </div>
          <div className="space-y-1">
            <span className="text-[#69786F] uppercase tracking-wider text-[10px]">Processing Active</span>
            <div className="text-xl font-bold text-[#38D9B0]">{processingJobs.length} Jobs Active</div>
          </div>
          <div className="space-y-1">
            <span className="text-[#69786F] uppercase tracking-wider text-[10px]">Avg Accuracy</span>
            <div className="text-xl font-bold text-[#65F59A]">{avgConfidence}% Confidence</div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center space-x-1.5 border-b border-[rgba(160,190,170,0.14)] pb-1 overflow-x-auto">
        {[
          { id: "upload", label: "Upload Center", icon: <Upload className="w-3.5 h-3.5" /> },
          {
            id: "queue",
            label: "Processing Queue",
            icon: <Zap className="w-3.5 h-3.5" />,
            badge: reviewReadyJobs.length > 0 ? `${reviewReadyJobs.length} Ready` : undefined,
          },
          { id: "review", label: "Educator Review", icon: <CheckCircle2 className="w-3.5 h-3.5" /> },
          { id: "history", label: "Import History", icon: <Clock className="w-3.5 h-3.5" /> },
          { id: "settings", label: "Intelligence Settings", icon: <Settings className="w-3.5 h-3.5" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-2 rounded-[4px] text-xs font-mono font-medium flex items-center space-x-2 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.3)] shadow-xs font-semibold"
                  : "text-[#A0AEA5] hover:bg-[#111B17] hover:text-[#F2F7F3]"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge && (
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded-[2px] ${isActive ? "bg-[rgba(101,245,154,0.25)] text-[#65F59A]" : "bg-[#111B17] text-[#65F59A] border border-[rgba(101,245,154,0.2)]"}`}>
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

      {/* AI Document Quiz Maker Modal */}
      <AIDocumentQuizModal
        open={aiQuizModalOpen}
        onOpenChange={setAiQuizModalOpen}
      />
    </div>
  );
}
