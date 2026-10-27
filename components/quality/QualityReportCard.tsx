"use client";

import { QualityAnalysisReport,QuestionImprovementSuggestion } from "@/lib/types/quality";
import { AISuggestionPanel } from "./AISuggestionPanel";
import { BloomsIndicator } from "./BloomsIndicator";
import { DifficultyMeter } from "./DifficultyMeter";
import { DuplicateViewer } from "./DuplicateViewer";
import { QualityScoreBadge } from "./QualityScoreBadge";

import { Card } from "@/components/ui/card";

interface QualityReportCardProps {
  report: QualityAnalysisReport;
  onApplySuggestion?: (sug: QuestionImprovementSuggestion) => void;
}

export function QualityReportCard({ report, onApplySuggestion }: QualityReportCardProps) {
  const { qualityBreakdown, bloomsLevel, difficulty, duplicateAlerts, suggestions } = report;

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-100 dark:border-gray-800 pb-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            Automated Question Audit Report
          </span>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mt-0.5">
            {report.questionTitle}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <QualityScoreBadge score={qualityBreakdown.overallScore} size="lg" />
          <BloomsIndicator level={bloomsLevel} />
        </div>
      </div>

      {/* 6 Quality Radar Sub-Scores */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 text-center">
        {[
          { label: "Grammar", score: qualityBreakdown.grammarScore },
          { label: "Clarity", score: qualityBreakdown.clarityScore },
          { label: "Distractors", score: qualityBreakdown.distractorScore },
          { label: "Accuracy", score: qualityBreakdown.accuracyScore },
          { label: "Readability", score: qualityBreakdown.readabilityScore },
          { label: "Fairness", score: qualityBreakdown.fairnessScore },
        ].map((item, idx) => (
          <div key={idx} className="p-3 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-1">
            <span className="text-[10px] font-semibold text-gray-400 block">{item.label}</span>
            <span className={`text-base font-extrabold font-mono ${item.score >= 80 ? "text-rose-600" : item.score >= 60 ? "text-amber-600" : "text-rose-600"}`}>
              {item.score}/100
            </span>
          </div>
        ))}
      </div>

      {/* Difficulty Meter & Duplicate Viewer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DifficultyMeter difficulty={difficulty} />
        <DuplicateViewer alerts={duplicateAlerts} currentQuestionTitle={report.questionTitle} />
      </div>

      {/* Suggestions Panel */}
      <AISuggestionPanel suggestions={suggestions} onApplySuggestion={onApplySuggestion} />
    </Card>
  );
}
