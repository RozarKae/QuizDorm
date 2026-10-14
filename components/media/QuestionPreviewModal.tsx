"use client";

import React, { useState } from "react";
import { QuestionItem } from "@/lib/types/question";
import { Eye, Monitor, Smartphone, Tablet, UserCheck, Shield, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { HotspotViewer } from "./interactive/HotspotEditor";
import { DragDropViewer } from "./interactive/DragDropBuilder";
import { DiagramLabelingViewer } from "./interactive/DiagramLabelingViewer";
import { TimelineViewer } from "./interactive/TimelineViewer";
import { AudioPlayerCard } from "./player/AudioPlayerCard";
import { VideoQuizPlayer } from "./player/VideoQuizPlayer";
import { CodeSnippetViewer } from "./player/CodeSnippetViewer";
import { InteractiveMapView } from "./interactive/InteractiveMapView";

interface QuestionPreviewModalProps {
  question: QuestionItem;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QuestionPreviewModal({
  question,
  open,
  onOpenChange,
}: QuestionPreviewModalProps) {
  const [viewport, setViewport] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [roleMode, setRoleMode] = useState<"student" | "teacher">("student");

  const viewportWidth =
    viewport === "mobile" ? "max-w-sm" : viewport === "tablet" ? "max-w-lg" : "max-w-3xl";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={`${viewportWidth} rounded-3xl p-6 transition-all duration-300`}>
        <DialogHeader className="border-b border-gray-100 dark:border-gray-800 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <DialogTitle className="text-base font-bold flex items-center text-gray-900 dark:text-white">
              <Eye className="w-5 h-5 text-indigo-600 mr-2" /> Question Live Multi-Device Preview
            </DialogTitle>

            {/* Controls */}
            <div className="flex items-center space-x-2">
              {/* Viewport Toggles */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setViewport("desktop")}
                  className={`p-1.5 rounded-lg text-xs ${viewport === "desktop" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-gray-400"}`}
                  title="Desktop View"
                >
                  <Monitor className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("tablet")}
                  className={`p-1.5 rounded-lg text-xs ${viewport === "tablet" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-gray-400"}`}
                  title="Tablet View"
                >
                  <Tablet className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewport("mobile")}
                  className={`p-1.5 rounded-lg text-xs ${viewport === "mobile" ? "bg-white dark:bg-gray-800 text-indigo-600 shadow-sm" : "text-gray-400"}`}
                  title="Mobile View"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Role Toggle */}
              <div className="flex items-center bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setRoleMode("student")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${roleMode === "student" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500"}`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRoleMode("teacher")}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${roleMode === "teacher" ? "bg-indigo-600 text-white shadow-sm" : "text-gray-500"}`}
                >
                  Teacher (Keys)
                </button>
              </div>
            </div>
          </div>
          <DialogDescription className="text-xs">
            Preview interactive assessment layout, rich media, and responsive styling.
          </DialogDescription>
        </DialogHeader>

        {/* Question Card Display */}
        <div className="p-4 sm:p-6 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm space-y-4 my-2">
          {/* Header Metadata */}
          <div className="flex items-center justify-between text-xs font-bold border-b border-gray-100 dark:border-gray-800 pb-2">
            <span className="text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              {question.subject} • {question.topic}
            </span>
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {question.difficulty}
              </span>
              <span className="font-mono text-indigo-600">{question.marks} Points</span>
            </div>
          </div>

          {/* Statement */}
          <h3 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white leading-relaxed">
            {question.title}
          </h3>

          {/* Interactive / Multimedia Component Renderers */}
          {question.type === "hotspot" && (
            <HotspotViewer
              imageUrl={question.image || "/images/placeholders/brain-diagram.png"}
              regions={question.hotspotRegions || []}
              onSelectHotspot={() => {}}
              isSubmitted={roleMode === "teacher"}
            />
          )}

          {question.type === "drag_drop_categorize" && (
            <DragDropViewer
              categories={question.dragDropCategories || []}
              items={question.dragDropItems || []}
            />
          )}

          {question.type === "diagram_labeling" && (
            <DiagramLabelingViewer
              imageUrl={question.image || "/images/placeholders/brain-diagram.png"}
              pins={question.diagramLabels || []}
            />
          )}

          {question.type === "timeline_ordering" && (
            <TimelineViewer events={question.timelineEvents || []} />
          )}

          {question.type === "audio_listening" && (
            <AudioPlayerCard
              audioUrl={question.audioUrl}
              transcript={question.transcript}
              allowDictation
            />
          )}

          {question.type === "video_timestamp" && (
            <VideoQuizPlayer
              videoUrl={question.videoUrl}
              markers={question.videoTimestampMarkers}
            />
          )}

          {question.type === "code_snippet" && question.codeData && (
            <CodeSnippetViewer codeData={question.codeData} />
          )}

          {question.type === "interactive_map" && (
            <InteractiveMapView
              regions={
                question.mapRegions || [
                  { id: "r1", regionName: "North America", coordinates: "" },
                  { id: "r2", regionName: "Europe", coordinates: "" },
                  { id: "r3", regionName: "Asia", coordinates: "" },
                ]
              }
            />
          )}

          {/* Standard Choice Options */}
          {(question.type === "mcq_single" || question.type === "mcq_multiple" || question.type === "true_false") && (
            <div className="space-y-2 pt-2">
              {question.options.map((opt, idx) => (
                <div
                  key={opt.id}
                  className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between ${
                    roleMode === "teacher" && opt.isCorrect
                      ? "bg-emerald-50 dark:bg-emerald-950/50 border-emerald-400 text-emerald-900 dark:text-emerald-100"
                      : "bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-md bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 flex items-center justify-center font-bold text-[10px]">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt.text}</span>
                  </div>

                  {roleMode === "teacher" && opt.isCorrect && (
                    <span className="text-emerald-600 dark:text-emerald-400 font-bold flex items-center">
                      <CheckCircle2 className="w-4 h-4 mr-1" /> Correct Answer
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Teacher View Answer Key & Solution Explanation */}
          {roleMode === "teacher" && question.explanation && (
            <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 space-y-1">
              <span className="font-bold flex items-center">
                <UserCheck className="w-4 h-4 text-indigo-600 mr-1.5" /> Teacher Solution Key & Pedagogical Explanation
              </span>
              <p>{question.explanation}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
