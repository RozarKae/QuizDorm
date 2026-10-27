"use client";

import { DuplicateViewer } from "@/components/quality/DuplicateViewer";
import { QualityReportCard } from "@/components/quality/QualityReportCard";
import { ReviewQueueTable } from "@/components/quality/ReviewQueueTable";
import { QualityReviewManager } from "@/lib/quality/qualityManager";
import { QualityAnalysisReport } from "@/lib/types/quality";
import { DifficultyLevel, QuestionItem } from "@/lib/types/question";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
AlertTriangle,
BarChart3,
CheckCircle2,
GitCompare,
RefreshCw,
ShieldCheck,
Wand2
} from "lucide-react";
import { toast } from "sonner";

// Sample Question Bank items for demonstration
const SAMPLE_QUESTIONS: QuestionItem[] = [
  {
    id: "q-101",
    title: "Calculate the derivative of f(x) = 3x^2 + 4x - 5 with respect to x.",
    type: "mcq_single",
    subject: "Mathematics",
    category: "Algebra",
    topic: "Calculus",
    difficulty: "Medium",
    marks: 4,
    timeLimitSeconds: 60,
    options: [
      { id: "opt-1", text: "6x + 4", isCorrect: true },
      { id: "opt-2", text: "3x + 4", isCorrect: false },
      { id: "opt-3", text: "6x - 5", isCorrect: false },
      { id: "opt-4", text: "x^2 + 4", isCorrect: false },
    ],
    explanation: "Apply power rule term by term: d/dx(3x^2) = 6x, d/dx(4x) = 4, d/dx(-5) = 0.",
    tags: ["calculus", "derivatives"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "q-102",
    title: "which organ in the human body is responsible for pumping blood throughout mankind",
    type: "mcq_single",
    subject: "Biology",
    category: "Anatomy",
    topic: "Circulatory System",
    difficulty: "Easy",
    marks: 2,
    timeLimitSeconds: 45,
    options: [
      { id: "opt-1", text: "Heart", isCorrect: true },
      { id: "opt-2", text: "Lungs", isCorrect: false },
      { id: "opt-3", text: "Kidney", isCorrect: false },
    ],
    explanation: "",
    tags: ["anatomy", "biology"],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function QualityDashboardPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "inspector" | "bulk" | "duplicates" | "analytics">("queue");
  const [reports, setReports] = useState<QualityAnalysisReport[]>(() => {
    let existing = QualityReviewManager.getReports();
    if (existing.length === 0) {
      SAMPLE_QUESTIONS.forEach((q) => QualityReviewManager.analyzeQuestion(q, SAMPLE_QUESTIONS));
      existing = QualityReviewManager.getReports();
    }
    return existing;
  });
  const [selectedReport, setSelectedReport] = useState<QualityAnalysisReport | null>(null);

  // Single Question Inspector state
  const [inspectQuestionTitle, setInspectQuestionTitle] = useState(SAMPLE_QUESTIONS[0].title);
  const [inspectSubject, setInspectSubject] = useState(SAMPLE_QUESTIONS[0].subject);
  const [inspectDifficulty, setInspectDifficulty] = useState(SAMPLE_QUESTIONS[0].difficulty);
  const [inspectExplanation, setInspectExplanation] = useState(SAMPLE_QUESTIONS[0].explanation || "");
  const [currentInspectionReport, setCurrentInspectionReport] = useState<QualityAnalysisReport | null>(() =>
    QualityReviewManager.analyzeQuestion(SAMPLE_QUESTIONS[0], SAMPLE_QUESTIONS)
  );

  // Bulk review state
  const [bulkAnalyzing, setBulkAnalyzing] = useState(false);
  const [bulkProgress, setBulkProgress] = useState(0);

  const loadReports = () => {
    // Generate initial reports for sample questions if empty
    let existing = QualityReviewManager.getReports();
    if (existing.length === 0) {
      SAMPLE_QUESTIONS.forEach((q) => QualityReviewManager.analyzeQuestion(q, SAMPLE_QUESTIONS));
      existing = QualityReviewManager.getReports();
    }
    setReports(existing);
  };

  const runInspection = (questionData: Partial<QuestionItem>) => {
    const report = QualityReviewManager.analyzeQuestion(questionData, SAMPLE_QUESTIONS);
    setCurrentInspectionReport(report);
  };

  const handleRunBulkAnalysis = async () => {
    setBulkAnalyzing(true);
    setBulkProgress(0);

    for (let i = 0; i <= 100; i += 20) {
      await new Promise((r) => setTimeout(r, 200));
      setBulkProgress(i);
    }

    SAMPLE_QUESTIONS.forEach((q) => QualityReviewManager.analyzeQuestion(q, SAMPLE_QUESTIONS));
    loadReports();
    setBulkAnalyzing(false);
    toast.success("Bulk Quality & Validation analysis complete across Question Bank!");
  };

  const pendingReviewReports = reports.filter((r) => r.status === "needs_review");
  const overallAvgQuality = reports.length > 0
    ? Math.round(reports.reduce((acc, r) => acc + r.qualityBreakdown.overallScore, 0) / reports.length)
    : 92;

  const duplicateCount = reports.reduce((acc, r) => acc + r.duplicateAlerts.length, 0);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-rose-300">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-rose-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.3 Quality Engine
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              AI Question Quality & Intelligent Validation Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-rose-100/80 max-w-2xl">
              Automated 360-degree educational quality evaluation, Bloom&apos;s Taxonomy classification, difficulty prediction, distractor analysis, and Educator Review Queue.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleRunBulkAnalysis}
              disabled={bulkAnalyzing}
              className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-rose-600/30"
            >
              <RefreshCw className={`w-4 h-4 mr-1.5 ${bulkAnalyzing ? "animate-spin" : ""}`} /> Bulk Quality Audit
            </Button>
          </div>
        </div>
      </div>

      {/* Overview Metrics Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <ShieldCheck className="w-3.5 h-3.5 text-rose-500 mr-1" /> Overall Bank Quality
          </span>
          <div className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 font-mono">
            {overallAvgQuality}/100
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500 mr-1" /> Pending Educator Reviews
          </span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 font-mono">
            {pendingReviewReports.length} Items
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <GitCompare className="w-3.5 h-3.5 text-indigo-500 mr-1" /> Duplicate Alerts
          </span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400 font-mono">
            {duplicateCount} Detected
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-1">
          <span className="text-[11px] font-semibold text-gray-500 flex items-center">
            <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 mr-1" /> Validated Questions
          </span>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-white font-mono">
            {reports.length} Audited
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <div className="flex items-center space-x-2 border-b border-gray-200 dark:border-gray-800 pb-1 overflow-x-auto">
        {[
          { id: "queue", label: `Educator Review Queue (${pendingReviewReports.length})`, icon: <AlertTriangle className="w-4 h-4" /> },
          { id: "inspector", label: "Interactive Quality Inspector", icon: <ShieldCheck className="w-4 h-4" /> },
          { id: "bulk", label: "Bulk Quality Audit Tool", icon: <RefreshCw className="w-4 h-4" /> },
          { id: "duplicates", label: "Duplicate Detection Center", icon: <GitCompare className="w-4 h-4" /> },
          { id: "analytics", label: "Content Health Analytics", icon: <BarChart3 className="w-4 h-4" /> },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as "queue" | "inspector" | "bulk" | "duplicates" | "analytics")}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
                isActive
                  ? "bg-rose-600 text-white shadow-md shadow-rose-600/20"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Educator Review Queue */}
      {activeTab === "queue" && (
        <div className="space-y-4">
          <ReviewQueueTable
            reports={reports}
            onSelectReport={(r) => setSelectedReport(r)}
            onRefresh={loadReports}
          />

          {selectedReport && (
            <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
              <QualityReportCard report={selectedReport} />
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Interactive Single-Question Quality Inspector */}
      {activeTab === "inspector" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Input Form */}
          <div className="lg:col-span-5 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              <Wand2 className="w-5 h-5 text-indigo-600 mr-2" /> Live Question Audit Sandbox
            </h3>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Question Statement</label>
              <textarea
                value={inspectQuestionTitle}
                onChange={(e) => {
                  setInspectQuestionTitle(e.target.value);
                  runInspection({
                    title: e.target.value,
                    subject: inspectSubject,
                    difficulty: inspectDifficulty as DifficultyLevel,
                    explanation: inspectExplanation,
                  });
                }}
                rows={4}
                className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Subject</label>
                <select
                  value={inspectSubject}
                  onChange={(e) => setInspectSubject(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <option value="Mathematics">Mathematics</option>
                  <option value="Biology">Biology</option>
                  <option value="Physics">Physics</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Educator Difficulty</label>
                <select
                  value={inspectDifficulty}
                  onChange={(e) => setInspectDifficulty(e.target.value as DifficultyLevel)}
                  className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Solution Explanation</label>
              <textarea
                value={inspectExplanation}
                onChange={(e) => setInspectExplanation(e.target.value)}
                rows={2}
                placeholder="Add step-by-step solution..."
                className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950"
              />
            </div>
          </div>

          {/* Audit Results Card */}
          <div className="lg:col-span-7">
            {currentInspectionReport && <QualityReportCard report={currentInspectionReport} />}
          </div>
        </div>
      )}

      {/* Tab 3: Bulk Review */}
      {activeTab === "bulk" && (
        <Card className="p-8 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl text-center space-y-4">
          <RefreshCw className={`w-12 h-12 text-rose-500 mx-auto ${bulkAnalyzing ? "animate-spin" : ""}`} />
          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Batch Question Quality Audit</h3>
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            Analyze entire Question Banks, imported OCR items, or quiz sets in parallel for readability, distractors, difficulty prediction & duplicates.
          </p>

          {bulkAnalyzing && (
            <div className="max-w-md mx-auto space-y-2">
              <div className="w-full h-3 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${bulkProgress}%` }} />
              </div>
              <span className="text-xs font-mono font-bold text-rose-600">{bulkProgress}% Complete</span>
            </div>
          )}

          <Button onClick={handleRunBulkAnalysis} disabled={bulkAnalyzing} className="bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl">
            Run Batch Analysis Now
          </Button>
        </Card>
      )}

      {/* Tab 4: Duplicate Detection Center */}
      {activeTab === "duplicates" && (
        <div className="space-y-4">
          {reports.flatMap((r) => r.duplicateAlerts).length === 0 ? (
            <Card className="p-8 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl text-center space-y-2">
              <CheckCircle2 className="w-10 h-10 text-rose-500 mx-auto" />
              <h4 className="font-bold text-gray-900 dark:text-white">No Duplicates Found!</h4>
              <p className="text-xs text-gray-500">All questions in the Question Bank are unique and distinct.</p>
            </Card>
          ) : (
            reports.map((r) => (
              r.duplicateAlerts.length > 0 && (
                <DuplicateViewer key={r.id} alerts={r.duplicateAlerts} currentQuestionTitle={r.questionTitle} />
              )
            ))
          )}
        </div>
      )}

      {/* Tab 5: Analytics */}
      {activeTab === "analytics" && (
        <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl space-y-4">
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <BarChart3 className="w-5 h-5 text-indigo-600 mr-2" /> Question Bank Content Health Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900">
              <span className="text-gray-500 font-medium">Average Quality Score</span>
              <div className="text-2xl font-bold text-rose-600 font-mono">{overallAvgQuality}/100</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900">
              <span className="text-gray-500 font-medium">Bloom&apos;s Taxonomy Spread</span>
              <div className="text-xs font-bold text-indigo-600 mt-1">Remember (40%) • Apply (35%) • Analyze (25%)</div>
            </div>
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900">
              <span className="text-gray-500 font-medium">Difficulty Alignment</span>
              <div className="text-2xl font-bold text-gray-900 dark:text-white font-mono">92% Match</div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
