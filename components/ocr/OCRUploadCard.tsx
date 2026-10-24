"use client";

import React, { useState, useRef } from "react";
import {
  Upload,
  FileText,
  Camera,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Layers,
  BookOpen,
  Sliders,
  Check,
  Zap,
  HelpCircle,
  Hash,
  Activity,
  X,
  FileCode,
} from "lucide-react";
import { OCRJobSettings } from "@/lib/types/ocr";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { OCREngineService } from "@/lib/ocr/engine";

export interface UploadStartOptions {
  subject: string;
  topic?: string;
  questionCount: number;
  difficulty: string;
  questionTypes: string[];
}

interface OCRUploadCardProps {
  settings: OCRJobSettings;
  onUploadStart: (
    file: File | { name: string; type: string; content?: string },
    options: UploadStartOptions | string
  ) => void;
  loading?: boolean;
}

const QUESTION_FORMATS = [
  { id: "mcq_single", label: "Single Choice MCQ", desc: "1 correct option" },
  { id: "mcq_multiple", label: "Multi-Select MCQ", desc: "Multiple correct" },
  { id: "true_false", label: "True / False", desc: "Binary premise" },
  { id: "fill_in_the_blank", label: "Fill in Blanks", desc: "Term retrieval" },
  { id: "match_following", label: "Match Following", desc: "Concept pairs" },
  { id: "assertion_reasoning", label: "Assertion & Reason", desc: "Competitive exam logic" },
  { id: "sequence_ordering", label: "Sequence Ordering", desc: "Chronological steps" },
  { id: "error_spotting", label: "Error Spotting", desc: "Fact & syntax detection" },
  { id: "drag_drop_categorize", label: "Categorize", desc: "Multi-bucket sorting" },
];

const PRESET_COUNTS = [
  { count: 5, label: "5", subtitle: "Quick Test" },
  { count: 10, label: "10", subtitle: "Standard Pack", badge: "Default" },
  { count: 15, label: "15", subtitle: "Deep Review" },
  { count: 20, label: "20", subtitle: "Exam Blueprint" },
  { count: 25, label: "25", subtitle: "Board Spec" },
  { count: 30, label: "30", subtitle: "Olympiad" },
  { count: 50, label: "50", subtitle: "Mega Bank", badge: "Max" },
];

export function OCRUploadCard({ settings, onUploadStart, loading = false }: OCRUploadCardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [stagedFile, setStagedFile] = useState<File | { name: string; type: string; content?: string; size?: number } | null>(null);

  // Pre-Flight Cockpit Configuration State
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isCustomCount, setIsCustomCount] = useState<boolean>(false);
  const [customCountInput, setCustomCountInput] = useState<string>("10");
  const [difficulty, setDifficulty] = useState<string>("Medium");
  const [selectedSubject, setSelectedSubject] = useState<string>("auto");
  const [topicScope, setTopicScope] = useState<string>("");
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([
    "mcq_single",
    "mcq_multiple",
    "true_false",
    "fill_in_the_blank",
    "match_following",
  ]);

  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const effectiveCount = isCustomCount
    ? Math.min(50, Math.max(1, parseInt(customCountInput || "10", 10)))
    : questionCount;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      stageFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      stageFile(e.target.files[0]);
    }
  };

  const stageFile = (file: File) => {
    const val = OCREngineService.validateFile(file);
    if (!val.valid) {
      toast.error(val.error);
      return;
    }
    setStagedFile(file);
    toast.success(`Staged "${file.name}" in pre-flight cockpit. Configure parameters below!`);
  };

  const handleSimulatedCameraPhoto = () => {
    setCameraActive(true);
    setTimeout(() => {
      setCameraActive(false);
      const photoFile = {
        name: `Camera_Photo_${new Date().toISOString().slice(0, 10)}.jpg`,
        type: "jpg",
        content: "Camera capture data",
        size: 1536 * 1024,
      };
      setStagedFile(photoFile);
      toast.success("Camera photo captured and staged in cockpit!");
    }, 1000);
  };

  const handleToggleQuestionType = (typeId: string) => {
    if (selectedQuestionTypes.includes(typeId)) {
      if (selectedQuestionTypes.length === 1) {
        toast.error("At least one question format must remain active.");
        return;
      }
      setSelectedQuestionTypes((prev) => prev.filter((t) => t !== typeId));
    } else {
      setSelectedQuestionTypes((prev) => [...prev, typeId]);
    }
  };

  const handleSelectAllTypes = () => {
    setSelectedQuestionTypes(QUESTION_FORMATS.map((f) => f.id));
  };

  const handleSelectMcqOnly = () => {
    setSelectedQuestionTypes(["mcq_single", "mcq_multiple"]);
  };

  const handleSelectBalanced = () => {
    setSelectedQuestionTypes(["mcq_single", "true_false", "fill_in_the_blank", "match_following"]);
  };

  const handleLaunchExtraction = () => {
    if (!stagedFile) {
      toast.error("Please stage a document first.");
      return;
    }

    onUploadStart(stagedFile, {
      subject: selectedSubject,
      topic: topicScope.trim() || undefined,
      questionCount: effectiveCount,
      difficulty,
      questionTypes: selectedQuestionTypes,
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return "Standard Document";
    if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
    return `${(bytes / 1024).toFixed(0)} KB`;
  };

  return (
    <div className="bg-[#0C1210] border border-[rgba(160,190,170,0.18)] rounded-[8px] p-6 sm:p-7 shadow-lg transition-all space-y-6">
      {/* 1. Header with Luminous Badges */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[rgba(160,190,170,0.12)]">
        <div>
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.1)] border border-[rgba(101,245,154,0.25)] text-[#65F59A] font-mono text-[10px] font-bold uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
              Document Intelligence Studio
            </span>
            <span className="font-mono text-[11px] text-[#38D9B0] border border-[rgba(56,217,176,0.2)] px-2 py-0.5 rounded-[3px] bg-[#111B17]">
              Phase 2.1 Multimodal Ingestion
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-[#F2F7F3] mt-1.5">
            Document Ingestion &amp; Assessment Synthesis Cockpit
          </h2>
          <p className="text-xs font-mono text-[#A0AEA5] mt-1">
            Convert textbooks, scanned tests, notes, and academic PDFs into validated question bank items with granular quantity and taxonomy control.
          </p>
        </div>

        {/* Global Subject Picker */}
        <div className="flex items-center space-x-2 bg-[#111B17] border border-[rgba(160,190,170,0.14)] p-2 rounded-[5px] shrink-0">
          <label className="text-xs font-mono font-bold text-[#A0AEA5] flex items-center shrink-0">
            <BookOpen className="w-3.5 h-3.5 mr-1.5 text-[#65F59A]" /> Target Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs font-mono py-1 px-2.5 rounded-[3px] border border-[rgba(160,190,170,0.2)] bg-[#0C1210] text-[#F2F7F3] focus:border-[#65F59A] focus:outline-none"
          >
            <option value="auto">✨ Auto-Detect from Content</option>
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer Science">Computer Science</option>
            <option value="History">History</option>
            <option value="Civics & Governance">Civics &amp; Governance</option>
            <option value="General Science">General Science</option>
          </select>
        </div>
      </div>

      {/* 2. STATE A: UNSTAGED DROPZONE */}
      {!stagedFile && (
        <div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-[6px] p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 group ${
            dragActive
              ? "border-[#65F59A] bg-[#111B17]/90 scale-[1.01] shadow-[0_0_25px_rgba(101,245,154,0.15)]"
              : "border-[rgba(160,190,170,0.2)] bg-[#0C1210] hover:border-[#65F59A]/60 hover:bg-[#111B17]/60"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.txt,.md,.jpg,.jpeg,.png,.webp,.pptx,.xlsx,.epub"
            onChange={handleChange}
            className="hidden"
          />

          <div className="p-4 rounded-[6px] bg-[#111B17] border border-[rgba(160,190,170,0.15)] text-[#65F59A] group-hover:scale-105 group-hover:border-[#65F59A]/40 transition-all shadow-sm">
            <Upload className="w-9 h-9 animate-bounce" />
          </div>

          <div>
            <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-[#F2F7F3]">
              {loading ? "Processing Document Ingestion..." : "Drop Academic Document Here or Click to Browse"}
            </h3>
            <p className="text-xs font-mono text-[#A0AEA5] mt-1 max-w-md mx-auto">
              Supports PDF, Word (DOCX), Plain Text, Markdown, Scanned Problem Sheets &amp; Photos (up to 50MB)
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
              className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 px-4 shadow-[0_0_15px_rgba(101,245,154,0.2)]"
            >
              <FileText className="w-4 h-4 mr-1.5" /> Select Document
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleSimulatedCameraPhoto}
              disabled={loading || cameraActive}
              className="border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#65F59A]/40 font-mono text-xs rounded-[4px] h-9 px-4"
            >
              <Camera className="w-4 h-4 mr-1.5 text-[#38D9B0]" />
              {cameraActive ? "Capturing Document..." : "Take Camera Photo"}
            </Button>
          </div>
        </div>
      )}

      {/* 3. STATE B: STAGED IN-CARD PRE-FLIGHT COCKPIT */}
      {stagedFile && (
        <div className="space-y-6 animate-in fade-in-50 zoom-in-95 duration-200">
          {/* Staged Document Snapshot Header */}
          <div className="p-4 rounded-[6px] bg-[#111B17] border border-[rgba(101,245,154,0.3)] shadow-[0_0_20px_rgba(101,245,154,0.08)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center space-x-3.5">
              <div className="w-10 h-10 rounded-[5px] bg-[#0C1210] border border-[rgba(101,245,154,0.35)] flex items-center justify-center text-[#65F59A] shrink-0">
                <FileCode className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <h4 className="font-mono text-sm font-bold text-[#F2F7F3] truncate max-w-xs sm:max-w-md">
                    {stagedFile.name}
                  </h4>
                  <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-[#65F59A]/15 text-[#65F59A] border border-[#65F59A]/30">
                    Staged &bull; Ready
                  </span>
                </div>
                <p className="text-[11px] font-mono text-[#A0AEA5] mt-0.5">
                  Size: {formatFileSize(stagedFile.size)} &bull; Document Verified
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setStagedFile(null)}
              className="border-[rgba(160,190,170,0.2)] bg-[#0C1210] text-[#A0AEA5] hover:text-[#F87171] hover:border-[#F87171]/40 font-mono text-xs rounded-[4px] self-start sm:self-auto shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Change Document
            </Button>
          </div>

          {/* Configuration Matrix */}
          <div className="p-5 rounded-[6px] bg-[#111B17] border border-[rgba(160,190,170,0.16)] space-y-6">
            {/* Control Section 1: Question Count (The Core User Request!) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-[#65F59A]" />
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3]">
                    How Many Questions Should Be Generated?
                  </label>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-[3px] bg-[rgba(101,245,154,0.15)] text-[#65F59A] border border-[rgba(101,245,154,0.3)]">
                    TARGET: {effectiveCount} QUESTIONS
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCustomCount(!isCustomCount)}
                    className="text-[11px] font-mono text-[#38D9B0] hover:underline"
                  >
                    {isCustomCount ? "Use Standard Presets" : "+ Custom Number (1-50)"}
                  </button>
                </div>
              </div>

              {isCustomCount ? (
                <div className="flex items-center gap-3 p-3 bg-[#0C1210] rounded-[5px] border border-[#65F59A]/40">
                  <div className="w-48">
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={customCountInput}
                      onChange={(e) => setCustomCountInput(e.target.value)}
                      placeholder="Enter 1 - 50..."
                      className="w-full bg-[#111B17] border border-[rgba(160,190,170,0.2)] rounded-[4px] px-3 py-1.5 text-xs font-mono font-bold text-[#65F59A] focus:border-[#65F59A] focus:outline-none"
                    />
                  </div>
                  <span className="text-xs font-mono text-[#A0AEA5]">
                    Enter any quantity between 1 and 50 questions for this document batch.
                  </span>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {PRESET_COUNTS.map((preset) => {
                    const isSelected = questionCount === preset.count;
                    return (
                      <button
                        key={preset.count}
                        type="button"
                        onClick={() => setQuestionCount(preset.count)}
                        className={`p-3 rounded-[5px] border text-left font-mono transition-all relative ${
                          isSelected
                            ? "bg-[rgba(101,245,154,0.18)] border-[#65F59A] text-[#65F59A] shadow-[0_0_15px_rgba(101,245,154,0.15)]"
                            : "bg-[#0C1210] border-[rgba(160,190,170,0.14)] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[rgba(160,190,170,0.25)]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-base font-bold">{preset.label}</span>
                          {preset.badge && (
                            <span
                              className={`text-[9px] font-bold px-1.5 py-0.2 rounded-[2px] ${
                                isSelected ? "bg-[#65F59A] text-[#070B0A]" : "bg-[#17251E] text-[#69786F]"
                              }`}
                            >
                              {preset.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] opacity-75 mt-0.5 truncate">{preset.subtitle}</p>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Control Section 2: Format & Question Types Variety */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Sliders className="w-4 h-4 text-[#38D9B0]" />
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3]">
                    Question Format &amp; Variety Matrix ({selectedQuestionTypes.length} Selected)
                  </label>
                </div>
                <div className="flex items-center space-x-2 text-[10px] font-mono text-[#A0AEA5]">
                  <button
                    type="button"
                    onClick={handleSelectAllTypes}
                    className="hover:text-[#65F59A] underline"
                  >
                    All 9 Types
                  </button>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={handleSelectBalanced}
                    className="hover:text-[#65F59A] underline"
                  >
                    Balanced Mix
                  </button>
                  <span>&bull;</span>
                  <button
                    type="button"
                    onClick={handleSelectMcqOnly}
                    className="hover:text-[#65F59A] underline"
                  >
                    MCQ Only
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2">
                {QUESTION_FORMATS.map((fmt) => {
                  const isChecked = selectedQuestionTypes.includes(fmt.id);
                  return (
                    <div
                      key={fmt.id}
                      onClick={() => handleToggleQuestionType(fmt.id)}
                      className={`p-2.5 rounded-[4px] border text-left cursor-pointer transition-all flex items-start space-x-2.5 ${
                        isChecked
                          ? "bg-[rgba(56,217,176,0.12)] border-[#38D9B0] text-[#F2F7F3]"
                          : "bg-[#0C1210] border-[rgba(160,190,170,0.1)] text-[#69786F] hover:border-[rgba(160,190,170,0.22)] hover:text-[#A0AEA5]"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-[2px] border mt-0.5 flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-[#38D9B0] border-[#38D9B0] text-[#070B0A]"
                            : "border-[rgba(160,190,170,0.2)] bg-[#111B17]"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-mono font-bold truncate">{fmt.label}</div>
                        <div className="text-[10px] font-mono text-[#69786F] truncate">{fmt.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Control Section 3 & 4: Difficulty & Chapter Focus */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 border-t border-[rgba(160,190,170,0.1)]">
              {/* Difficulty */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-2">
                  Target Cognitive Difficulty
                </label>
                <div className="grid grid-cols-4 gap-1.5 font-mono text-xs">
                  {[
                    { id: "Easy", label: "Easy", desc: "Recall" },
                    { id: "Medium", label: "Medium", desc: "Concept" },
                    { id: "Hard", label: "Hard", desc: "Analysis" },
                    { id: "Adaptive", label: "Adaptive", desc: "Balanced Curve" },
                  ].map((lvl) => {
                    const isSel = difficulty === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setDifficulty(lvl.id)}
                        className={`py-2 px-1 rounded-[4px] border text-center transition-all ${
                          isSel
                            ? lvl.id === "Hard"
                              ? "bg-[rgba(248,113,113,0.18)] border-[#F87171] text-[#F87171]"
                              : lvl.id === "Easy"
                              ? "bg-[rgba(101,245,154,0.18)] border-[#65F59A] text-[#65F59A]"
                              : "bg-[rgba(56,217,176,0.18)] border-[#38D9B0] text-[#38D9B0]"
                            : "bg-[#0C1210] border-[rgba(160,190,170,0.14)] text-[#A0AEA5] hover:text-[#F2F7F3]"
                        }`}
                      >
                        <div className="font-bold">{lvl.label}</div>
                        <div className="text-[9px] opacity-75">{lvl.desc}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Optional Chapter/Topic Scope */}
              <div>
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-2">
                  Chapter Focus or Analytical Premise (Optional)
                </label>
                <input
                  type="text"
                  value={topicScope}
                  onChange={(e) => setTopicScope(e.target.value)}
                  placeholder="e.g. Focus on Chapter 3: Cell Division and Checkpoints..."
                  className="w-full bg-[#0C1210] border border-[rgba(160,190,170,0.2)] rounded-[4px] px-3 py-2 text-xs font-mono text-[#F2F7F3] placeholder:text-[#69786F] focus:border-[#65F59A] focus:outline-none"
                />
                <p className="text-[10px] font-mono text-[#69786F] mt-1">
                  Leave empty to auto-extract across the entire uploaded document.
                </p>
              </div>
            </div>
          </div>

          {/* Launch Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="text-xs font-mono text-[#A0AEA5]">
              Ready to extract <span className="text-[#65F59A] font-bold">{effectiveCount} questions</span> across{" "}
              <span className="text-[#38D9B0] font-bold">{selectedQuestionTypes.length} formats</span> at{" "}
              <span className="text-[#F2F7F3] font-bold">{difficulty}</span> difficulty.
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => setStagedFile(null)}
                className="w-full sm:w-auto border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] font-mono text-xs rounded-[4px] h-10 px-4"
              >
                Cancel
              </Button>

              <Button
                type="button"
                disabled={loading}
                onClick={handleLaunchExtraction}
                className="w-full sm:w-auto bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs uppercase tracking-wider rounded-[4px] h-10 px-6 shadow-[0_0_20px_rgba(101,245,154,0.28)]"
              >
                {loading ? (
                  <>
                    <Activity className="w-4 h-4 mr-2 animate-spin" />
                    <span>Processing Document Ingestion...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 mr-2 fill-current" />
                    <span>Launch AI Extraction ({effectiveCount} Questions)</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 4. Supported Formats Strip */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[rgba(160,190,170,0.12)] pt-3.5 font-mono">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-[#69786F] mr-1 text-[11px]">Supported Formats:</span>
          {["PDF", "DOCX", "TXT", "Markdown", "JPG / PNG", "WEBP", "Scanned Worksheets", "Photos"].map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded-[3px] bg-[#111B17] border border-[rgba(160,190,170,0.14)] text-[#A0AEA5] font-medium text-[10px]"
            >
              {fmt}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-[11px] text-[#69786F]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
          <span>Multimodal Pipeline Active (High-Accuracy Curriculum Engine)</span>
        </div>
      </div>
    </div>
  );
}
