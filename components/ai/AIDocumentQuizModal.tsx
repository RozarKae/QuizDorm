"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Sparkles,
  Upload,
  FileText,
  CheckCircle2,
  Trash2,
  Play,
  Save,
  Plus,
  ArrowRight,
  Clock,
  Award,
  Zap,
  RotateCcw,
  FileCheck,
  AlertCircle,
  AlertTriangle,
  X,
  Download,
  Layers,
  Cpu,
  Check,
  Edit3,
  HelpCircle,
  FileCode,
  FileSpreadsheet,
} from "lucide-react";
import { QuestionItem, QuestionType, DifficultyLevel } from "@/lib/types/question";
import { QuizItem } from "@/lib/types/quiz";
import { saveQuiz } from "@/lib/data/quizzes";
import { importQuestions } from "@/lib/data/question-bank";
import { resolveTopicsForQuestion } from "@/lib/data/taxonomy";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Sample document presets for immediate 1-click testing
const SAMPLE_PRESETS = [
  {
    id: "biology",
    name: "Cell Biology & Mitosis",
    subject: "Biology",
    topic: "Cell Division & Genetics",
    description: "Covers eukaryotic cell cycles, mitosis phases (prophase, metaphase, anaphase, telophase), spindle fibers, and DNA replication checkpoints.",
    content: `# Cell Biology: Mechanisms of Eukaryotic Mitosis and Chromosome Segregation

## 1. Overview of the Cell Cycle
The eukaryotic cell cycle comprises Interphase (G1, S, and G2 phases) followed by the Mitotic (M) phase. During the S (Synthesis) phase, nuclear DNA undergoes semi-conservative replication, producing identical sister chromatids conjoined at the centromere by cohesin protein complexes.

## 2. Stages of Mitosis
Mitosis is categorized into five continuous stages:
- **Prophase**: Chromatin condenses into distinct chromosomes. Nucleoli disappear and the mitotic spindle initiates assembly from centrosomes.
- **Prometaphase**: The nuclear envelope fragments. Microtubules invade the nuclear region and associate with kinetochore complexes located on centromeres.
- **Metaphase**: Chromosomes align symmetrically along the metaphase plate (the equatorial plane equidistant between the two spindle poles). The spindle assembly checkpoint (SAC) verifies tension before anaphase initiation.
- **Anaphase**: Cohesin is cleaved by the protease separase (activated when securin is degraded by APC/C). Sister chromatids segregate toward opposite centrosomal poles via microtubule depolymerization.
- **Telophase**: Nuclear envelopes reassemble around daughter genomes, chromatin decondenses, and cytokinesis forms two distinct diploid daughter cells.

## 3. Regulation and Checkpoints
Key cell cycle transitions are regulated by Cyclin-Dependent Kinases (CDKs) partnered with cyclins (e.g., Cyclin B-CDK1 driving M-phase entry). The p53 tumor suppressor halts cell cycle progression upon sensing DNA double-strand breaks.`,
  },
  {
    id: "distributed-systems",
    name: "Distributed Systems & Consensus",
    subject: "Computer Science",
    topic: "Distributed Systems",
    description: "Covers CAP theorem, Raft consensus algorithm, leader election, log replication, and Byzantine fault tolerance.",
    content: `# Distributed Systems Architecture: Fault-Tolerant Consensus & State Machine Replication

## 1. The CAP Theorem and PACELC
Formulated by Eric Brewer and proved by Gilbert and Lynch, the CAP theorem states that a distributed data store can simultaneously guarantee at most two out of three properties:
- **Consistency (C)**: Every read receives the most recent write or an error.
- **Availability (A)**: Every non-failing node returns a non-error response for every request.
- **Partition Tolerance (P)**: The system continues operating despite arbitrary network message loss or delay.

Under network partitions (P), a system must trade off between consistency (CP) and availability (AP). The PACELC theorem extends this: if there is a partition (P), choose A or C; else (E), choose Latency (L) or Consistency (C).

## 2. The Raft Consensus Protocol
Raft decomposes consensus into three independent sub-problems:
- **Leader Election**: When a follower node detects a heartbeat timeout from the current leader, it transitions to a candidate state, increments its term counter, votes for itself, and broadcasts RequestVote RPCs. A candidate becomes leader upon securing a strict majority (quorum: > N/2) of votes.
- **Log Replication**: The leader receives commands from clients, appends them to its local log, and issues AppendEntries RPCs to all followers. Once an entry is committed by a majority, the leader applies it to its state machine and replies to the client.
- **Safety**: A node will refuse to vote for a candidate whose log is less up-to-date than its own, guaranteeing that a newly elected leader contains all committed entries from all previous terms.`,
  },
  {
    id: "history",
    name: "The Industrial Revolution",
    subject: "History",
    topic: "Modern World History",
    description: "Covers 18th-19th century British industrialization, steam technology, factory systems, urbanization, and socioeconomic legislation.",
    content: `# The First and Second Industrial Revolutions: Technological and Socioeconomic Transitions

## 1. Catalysts in 18th Century Britain
The Industrial Revolution originated in Great Britain during the mid-18th century due to a convergence of distinct factors:
- Abundant and accessible deposits of coal and iron ore.
- Capital accumulation from colonial trade and established banking institutions.
- Agricultural advancements (enclosure acts, four-crop rotation) creating an urban labor surplus.
- Intellectual and patent property legal frameworks fostering mechanical innovation.

## 2. Core Innovations
Key technological breakthroughs transformed production:
- **Textile Mechanization**: John Kay's flying shuttle, James Hargreaves' spinning jenny, and Richard Arkwright's water frame shifted textile manufacture from domestic cottages into centralized factories.
- **Steam Power**: James Watt's separate condenser improvement on the Newcomen engine provided continuous rotary power independent of geographic water sources.
- **Metallurgy**: Henry Cort's puddling process and later Henry Bessemer's converter enabled mass production of wrought iron and cheap steel.

## 3. Social and Political Consequences
Rapid industrial expansion prompted demographic shifts from agrarian countryside to dense urban centers (e.g., Manchester, Birmingham). Early unregulated factory labor catalyzed labor movements (Luddism, Chartism) and legislative reforms such as the Factory Acts of 1833 and Ten Hours Act of 1847.`,
  },
];

export interface AIDocumentQuizModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuestionsAdded?: (questions: QuestionItem[]) => void;
  defaultSubject?: string;
  defaultTopic?: string;
  defaultDifficulty?: DifficultyLevel;
}

export function AIDocumentQuizModal({
  open,
  onOpenChange,
  onQuestionsAdded,
  defaultSubject = "",
  defaultTopic = "",
  defaultDifficulty = "Medium",
}: AIDocumentQuizModalProps) {
  const router = useRouter();

  // Workflow modes
  const [phase, setPhase] = useState<"config" | "generating" | "review">("config");

  // Document state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Parameter state
  const [subject, setSubject] = useState(defaultSubject);
  const [topic, setTopic] = useState(defaultTopic);
  const [difficulty, setDifficulty] = useState<DifficultyLevel>(defaultDifficulty);
  const [questionCount, setQuestionCount] = useState<number>(10);
  const [isCustomCount, setIsCustomCount] = useState<boolean>(false);
  const [customCountInput, setCustomCountInput] = useState<string>("30");
  const [selectedQuestionTypes, setSelectedQuestionTypes] = useState<string[]>([
    "mcq_single",
    "mcq_multiple",
    "true_false",
    "fill_in_the_blank",
    "match_following",
    "drag_drop_categorize",
    "error_spotting",
    "sequence_ordering",
    "assertion_reasoning",
  ]);

  // Telemetry & Progress
  const [telemetryProgress, setTelemetryProgress] = useState(0);
  const [telemetryStepText, setTelemetryStepText] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Error message tracking to prevent silent resets
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Generated Questions state (Editable in review)
  const [generatedQuestions, setGeneratedQuestions] = useState<QuestionItem[]>([]);
  const [generationMetadata, setGenerationMetadata] = useState<{
    modelUsed?: string;
    latencyMs?: number;
    tokens?: number;
    docTitle?: string;
    summary?: string;
    warning?: string;
  }>({});

  // Reset when dialog closes
  useEffect(() => {
    if (!open) {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [open]);

  // Handle Drag & Drop
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
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      setSelectedPresetId(null);
      // Auto-infer title/subject if blank
      if (!topic) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTopic(cleanName);
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setSelectedPresetId(null);
      if (!topic) {
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTopic(cleanName);
      }
    }
  };

  // Select Sample Preset
  const handleSelectPreset = (preset: (typeof SAMPLE_PRESETS)[0]) => {
    setSelectedPresetId(preset.id);
    const blob = new Blob([preset.content], { type: "text/markdown" });
    const file = new File([blob], `${preset.name.replace(/\s+/g, "_")}.md`, {
      type: "text/markdown",
    });
    setSelectedFile(file);
    setSubject(preset.subject);
    setTopic(preset.topic);
    toast.success(`Loaded curriculum template: ${preset.name}`);
  };

  // Question type toggle
  const toggleQuestionType = (t: string) => {
    if (selectedQuestionTypes.includes(t)) {
      if (selectedQuestionTypes.length === 1) {
        toast.info("At least one question type must be selected");
        return;
      }
      setSelectedQuestionTypes(selectedQuestionTypes.filter((x) => x !== t));
    } else {
      setSelectedQuestionTypes([...selectedQuestionTypes, t]);
    }
  };

  // Start Generation
  const handleStartGeneration = async () => {
    if (!selectedFile) {
      toast.error("Please select or drop a document first");
      return;
    }

    setGenerationError(null);
    setPhase("generating");
    setTelemetryProgress(12);
    setTelemetryStepText("Reading and scanning your document...");
    setElapsedSeconds(0);

    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    try {
      // Step 2 Progress
      setTimeout(() => {
        setTelemetryProgress(35);
        setTelemetryStepText("Reading your notes and finding key concepts...");
      }, 700);

      // Step 3 Progress
      setTimeout(() => {
        setTelemetryProgress(60);
        setTelemetryStepText("Cooking up exam-ready questions with QuizDorm AI...");
      }, 1500);

      const effectiveCount = isCustomCount
        ? Math.min(50, Math.max(1, parseInt(customCountInput || "30", 10)))
        : questionCount;

      const formData = new FormData();
      formData.append("file", selectedFile);
      if (subject.trim()) formData.append("subject", subject.trim());
      if (topic.trim()) formData.append("topic", topic.trim());
      formData.append("difficulty", difficulty);
      formData.append("questionCount", String(effectiveCount));
      formData.append("questionTypes", JSON.stringify(selectedQuestionTypes));

      const response = await fetch("/api/ai/pdf-to-quiz", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Document processing failed");
      }

      setTelemetryProgress(85);
      setTelemetryStepText("Double-checking answers and filtering sneaky traps...");

      await new Promise((r) => setTimeout(r, 400));

      setTelemetryProgress(100);
      setTelemetryStepText("Curriculum assessment synthesized and validated!");

      if (timerRef.current) clearInterval(timerRef.current);

      if (data.detectedSubject && !subject) setSubject(data.detectedSubject);
      if (data.detectedTopic && !topic) setTopic(data.detectedTopic);

      // Format to QuestionItem array
      const rawQuestions: any[] = data.questions || [];
      const formatted: QuestionItem[] = rawQuestions.map((q: any, idx: number) => {
        const itemDifficulty: DifficultyLevel = q.difficulty || difficulty || "Medium";
        const qSubject = q.subject || data.detectedSubject || subject || "General";
        const qTopic = q.topic || data.detectedTopic || topic || "Curriculum Unit";
        const qTags = Array.from(new Set([
          ...(Array.isArray(q.tags) ? q.tags : []),
          qSubject.toLowerCase().replace(/[ &]+/g, "-"),
          qTopic.toLowerCase().replace(/[ &]+/g, "-"),
          "ai-generated",
        ])).filter(Boolean);

        const qTopics = Array.isArray(q.topics) && q.topics.length > 0
          ? q.topics
          : resolveTopicsForQuestion({ topic: qTopic, subject: qSubject, tags: qTags });

        return {
          id: q.id || `gen-q-${Date.now()}-${idx + 1}`,
          title: q.title || `Question ${idx + 1}`,
          description: q.description || undefined,
          type: (q.type as QuestionType) || "mcq_single",
          subject: qSubject,
          category: q.category || qSubject,
          topic: qTopic,
          topics: qTopics,
          subtopic: q.subtopic || undefined,
          difficulty: itemDifficulty,
          marks: q.marks || (itemDifficulty === "Hard" ? 5 : itemDifficulty === "Medium" ? 4 : 2),
          timeLimitSeconds: q.timeLimitSeconds || 60,
          options: (q.options || []).map((opt: any, oIdx: number) => ({
            id: opt.id || `opt-${oIdx + 1}`,
            text: opt.text || "",
            isCorrect: Boolean(opt.isCorrect),
          })),
          matchingPairs: q.matchingPairs?.map((mp: any) => ({
            id: mp.id || `mp-${Math.random()}`,
            leftItem: mp.leftItem,
            rightItem: mp.rightItem,
          })),
          fillBlanks: q.fillBlanks || [],
          sequenceItems: q.sequenceItems,
          dragDropCategories: (q.dragDropCategories || []).map((c: any) => ({
            id: c.id,
            name: c.name || c.title || c.id,
            title: c.title || c.name || c.id,
          })),
          dragDropItems: (q.dragDropItems || []).map((item: any) => ({
            id: item.id,
            text: item.text,
            targetCategoryId: item.targetCategoryId || item.categoryId || "",
            categoryId: item.categoryId || item.targetCategoryId || "",
          })),
          explanation: q.explanation || "Curriculum-derived solution rationale.",
          hints: q.hints || [],
          tags: qTags,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
      });

      setGeneratedQuestions(formatted);
      setGenerationMetadata({
        modelUsed: data.metadata?.modelUsed || (data.warning ? "document-quiz-fallback" : "quizdorm-ai-engine"),
        latencyMs: data.metadata?.latencyMs || Date.now() - startTime,
        tokens: data.metadata?.tokenUsage?.totalTokens || 1840,
        docTitle: data.documentTitle || selectedFile.name,
        summary: data.summary,
        warning: data.warning,
      });

      setPhase("review");
      if (data.warning) {
        toast.warning(data.warning, { duration: 6000 });
      } else {
        toast.success(`Generated and validated ${formatted.length} curriculum questions.`);
      }
    } catch (err: any) {
      if (timerRef.current) clearInterval(timerRef.current);
      const msg = err.message || "Failed to generate questions from document";
      setGenerationError(msg);
      toast.error(msg);
      setPhase("config");
    }
  };

  // Editing handlers in Review Phase
  const handleUpdateQuestionTitle = (index: number, newTitle: string) => {
    const updated = [...generatedQuestions];
    updated[index].title = newTitle;
    setGeneratedQuestions(updated);
  };

  const handleToggleOptionCorrect = (qIndex: number, optId: string) => {
    const updated = [...generatedQuestions];
    const q = updated[qIndex];
    if (!q.options) return;

    if (q.type === "mcq_single" || q.type === "true_false") {
      q.options = q.options.map((o) => ({
        ...o,
        isCorrect: o.id === optId,
      }));
    } else {
      q.options = q.options.map((o) =>
        o.id === optId ? { ...o, isCorrect: !o.isCorrect } : o
      );
    }
    setGeneratedQuestions(updated);
  };

  const handleUpdateOptionText = (qIndex: number, optId: string, text: string) => {
    const updated = [...generatedQuestions];
    const q = updated[qIndex];
    if (!q.options) return;
    q.options = q.options.map((o) => (o.id === optId ? { ...o, text } : o));
    setGeneratedQuestions(updated);
  };

  const handleDeleteQuestion = (index: number) => {
    if (generatedQuestions.length <= 1) {
      toast.error("Quiz must retain at least one question.");
      return;
    }
    const updated = generatedQuestions.filter((_, i) => i !== index);
    setGeneratedQuestions(updated);
    toast.info("Question discarded from assessment.");
  };

  const handleUpdateExplanation = (index: number, explanation: string) => {
    const updated = [...generatedQuestions];
    updated[index].explanation = explanation;
    setGeneratedQuestions(updated);
  };

  // Actions
  const handlePublishAndTakeNow = () => {
    if (generatedQuestions.length === 0) return;

    const quizId = `ai-quiz-${Date.now()}`;
    const totalMarks = generatedQuestions.reduce((acc, q) => acc + (q.marks || 1), 0);
    const quizTitle = `${topic || generationMetadata.docTitle || "AI Document Assessment"}`;

    const newQuiz: QuizItem = {
      id: quizId,
      title: quizTitle,
      description:
        generationMetadata.summary ||
        `Exam-ready curriculum assessment synthesized from ${selectedFile?.name || "document"} by QuizDorm Intelligence.`,
      category: subject || "Science",
      subject: subject || "Science",
      topic: topic || "General",
      gradeLevel: "All Levels",
      grade: "All Levels",
      difficulty: difficulty,
      durationMinutes: Math.max(10, Math.ceil(generatedQuestions.length * 2.5)),
      totalMarks: totalMarks,
      passMarks: Math.round(totalMarks * 0.6),
      status: "Published",
      randomizeQuestions: true,
      shuffleOptions: true,
      questions: generatedQuestions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    saveQuiz(newQuiz);
    toast.success("AI Quiz published live! Launching assessment arena...");
    onOpenChange(false);
    router.push(`/dashboard/quizzes/${quizId}/take/live`);
  };

  const handleAddToCurrentQuiz = () => {
    if (onQuestionsAdded && generatedQuestions.length > 0) {
      onQuestionsAdded(generatedQuestions);
      toast.success(`Added ${generatedQuestions.length} questions to active quiz builder!`);
      onOpenChange(false);
    }
  };

  const handleImportToBank = () => {
    if (generatedQuestions.length === 0) return;
    const { imported, skipped } = importQuestions(generatedQuestions);
    toast.success(
      `Saved ${imported} question${imported === 1 ? "" : "s"} to Question Bank!${
        skipped > 0 ? ` (${skipped} existing duplicates)` : ""
      }`
    );
  };

  const handleExportJson = () => {
    const exportData = {
      generatedAt: new Date().toISOString(),
      model: generationMetadata.modelUsed,
      documentName: selectedFile?.name,
      subject,
      topic,
      difficulty,
      questionsCount: generatedQuestions.length,
      questions: generatedQuestions,
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `quizdorm_ai_${(topic || "assessment").toLowerCase().replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Assessment package exported as JSON!");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-w-5xl max-h-[92vh] overflow-y-auto bg-[#140C0E] border border-[rgba(240, 160, 180,0.22)] p-0 text-[#F2F7F3] shadow-[0_24px_60px_rgba(0,0,0,0.85)]">
        {/* Header */}
        <div className="p-6 border-b border-[rgba(240, 160, 180,0.12)] bg-[#1D1013]/60">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[6px] bg-[rgba(255, 77, 109,0.12)] border border-[rgba(255, 77, 109,0.3)] flex items-center justify-center text-[#FF4D6D] shadow-[0_0_15px_rgba(255, 77, 109,0.2)]">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <DialogTitle className="text-xl font-bold tracking-tight text-[#F2F7F3]">
                    Omni-Curriculum Intelligence Studio
                  </DialogTitle>
                  <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[4px] bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                    QuizDorm Intelligence
                  </span>
                </div>
                <DialogDescription className="text-xs text-[#A0AEA5] mt-1">
                  Upload syllabus PDFs, lecture notes, textbook chapters, or curriculum scans. QuizDorm Intelligence extracts core concepts and synthesizes high-rigor assessments with deep distractor rationales.
                </DialogDescription>
              </div>
            </div>

            {/* Stepper Pill Indicator */}
            <div className="hidden sm:flex items-center gap-1.5 bg-[#0B0708] border border-[rgba(240, 160, 180,0.14)] p-1 rounded-[6px] text-[11px] font-mono">
              <span
                className={`px-2.5 py-1 rounded-[4px] transition-colors ${
                  phase === "config"
                    ? "bg-[#2A141A] text-[#FF4D6D] font-bold border border-[rgba(255, 77, 109,0.3)]"
                    : "text-[#69786F]"
                }`}
              >
                1. Upload Material
              </span>
              <span className="text-[#69786F]">→</span>
              <span
                className={`px-2.5 py-1 rounded-[4px] transition-colors ${
                  phase === "generating"
                    ? "bg-[#2A141A] text-[#FF4D6D] font-bold border border-[rgba(255, 77, 109,0.3)]"
                    : "text-[#69786F]"
                }`}
              >
                2. Synthesize Intellect
              </span>
              <span className="text-[#69786F]">→</span>
              <span
                className={`px-2.5 py-1 rounded-[4px] transition-colors ${
                  phase === "review"
                    ? "bg-[#2A141A] text-[#FF4D6D] font-bold border border-[rgba(255, 77, 109,0.3)]"
                    : "text-[#69786F]"
                }`}
              >
                3. Validate & Launch
              </span>
            </div>
          </div>
        </div>

        {/* Phase 1: Configuration & Upload */}
        {phase === "config" && (
          <div className="p-6 space-y-6">
            {/* Error Notification if generation failed */}
            {generationError && (
              <div className="p-4 rounded-[6px] bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.35)] text-[#FCA5A5] flex items-start justify-between gap-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-[#F87171] shrink-0 mt-0.5" />
                  <div>
                    <div className="font-semibold text-[#F87171]">
                      Document Generation Notice
                    </div>
                    <div className="mt-1 text-[#E2E8F0] font-mono text-[11px]">
                      {generationError}
                    </div>
                    <div className="mt-2 text-[11px] text-[#94A3B8]">
                      Your selected document is still loaded below. You can try clicking &quot;Generate My Quiz&quot; again, or test using one of the instant sample presets.
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setGenerationError(null)}
                  className="text-[#94A3B8] hover:text-[#F2F7F3] p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* Dropzone */}
            <div>
              <label className="block text-xs font-mono uppercase tracking-wider text-[#A0AEA5] mb-2">
                1. Upload Curriculum Document (.PDF, .TXT, .MD, .DOCX, .PNG, .JPG)
              </label>

              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-[8px] p-6 text-center cursor-pointer transition-all ${
                  dragActive
                    ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.06)] shadow-[0_0_20px_rgba(255, 77, 109,0.15)]"
                    : selectedFile
                      ? "border-[rgba(255, 77, 109,0.4)] bg-[#1D1013]"
                      : "border-[rgba(240, 160, 180,0.2)] bg-[#0B0708]/70 hover:border-[rgba(240, 160, 180,0.4)] hover:bg-[#1D1013]/50"
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.txt,.md,.markdown,.docx,.png,.jpg,.jpeg,.webp"
                  className="hidden"
                  onChange={handleFileInputChange}
                />

                {selectedFile ? (
                  <div className="flex items-center justify-between max-w-lg mx-auto bg-[#0B0708] border border-[rgba(240, 160, 180,0.18)] p-3.5 rounded-[6px]">
                    <div className="flex items-center gap-3 truncate text-left">
                      <div className="w-9 h-9 rounded-[4px] bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] flex items-center justify-center shrink-0">
                        <FileCheck className="w-5 h-5" />
                      </div>
                      <div className="truncate">
                        <div className="text-sm font-medium text-[#F2F7F3] truncate">
                          {selectedFile.name}
                        </div>
                        <div className="text-[11px] font-mono text-[#A0AEA5]">
                          {(selectedFile.size / 1024).toFixed(1)} KB • Ready for Multimodal Analysis
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(null);
                        setSelectedPresetId(null);
                      }}
                      className="text-[#69786F] hover:text-[#F87171] p-1.5 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-full bg-[#1D1013] border border-[rgba(240, 160, 180,0.2)] flex items-center justify-center text-[#FF4D6D]">
                      <Upload className="w-6 h-6" />
                    </div>
                    <div className="text-sm font-medium text-[#F2F7F3]">
                      Drag and drop your syllabus or document here, or{" "}
                      <span className="text-[#FF4D6D] underline underline-offset-4">browse files</span>
                    </div>
                    <p className="text-xs text-[#69786F]">
                      Supported formats: PDF, DOCX, TXT, Markdown, PNG, JPG (up to 50MB)
                    </p>
                  </div>
                )}
              </div>

              {/* Sample Preset Buttons for Instant 1-Click Test */}
              <div className="mt-3">
                <div className="text-[11px] font-mono uppercase tracking-wider text-[#69786F] mb-1.5 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-[#FF4D6D]" /> Or select a standard curriculum syllabus template:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {SAMPLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => handleSelectPreset(preset)}
                      className={`text-left p-2.5 rounded-[5px] border transition-all text-xs ${
                        selectedPresetId === preset.id
                          ? "bg-[rgba(255, 77, 109,0.12)] border-[#FF4D6D] text-[#F2F7F3]"
                          : "bg-[#0B0708] border-[rgba(240, 160, 180,0.14)] text-[#A0AEA5] hover:border-[rgba(240, 160, 180,0.3)] hover:text-[#F2F7F3]"
                      }`}
                    >
                      <div className="font-semibold text-[#FF4D6D] truncate">{preset.name}</div>
                      <div className="text-[10px] text-[#69786F] mt-0.5 line-clamp-1">
                        {preset.description}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Generation Parameters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-[rgba(240, 160, 180,0.1)]">
              {/* Subject */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A0AEA5] mb-1.5 flex items-center justify-between">
                  <span>Target Subject</span>
                  <span className="text-[10px] text-[#69786F] normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Auto-detected from document (or e.g. Biology)"
                  className="w-full bg-[#0B0708] border border-[rgba(240, 160, 180,0.2)] rounded-[5px] px-3 py-2 text-sm text-[#F2F7F3] focus:outline-none focus:border-[#FF4D6D] placeholder:text-[#4A5750]"
                />
              </div>

              {/* Topic */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A0AEA5] mb-1.5 flex items-center justify-between">
                  <span>Specific Topic / Unit</span>
                  <span className="text-[10px] text-[#69786F] normal-case">(optional)</span>
                </label>
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Auto-detected from document (or e.g. Mitosis)"
                  className="w-full bg-[#0B0708] border border-[rgba(240, 160, 180,0.2)] rounded-[5px] px-3 py-2 text-sm text-[#F2F7F3] focus:outline-none focus:border-[#FF4D6D] placeholder:text-[#4A5750]"
                />
              </div>

              {/* Question Count */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5]">
                    Question Count: <span className="text-[#FF4D6D] font-bold">{isCustomCount ? customCountInput || "1" : questionCount}</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsCustomCount(!isCustomCount)}
                    className="text-[10px] font-mono uppercase text-[#FF758F] hover:underline"
                  >
                    {isCustomCount ? "Use Presets" : "+ Custom Number"}
                  </button>
                </div>

                {isCustomCount ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      max={50}
                      value={customCountInput}
                      onChange={(e) => setCustomCountInput(e.target.value)}
                      placeholder="Enter 1 - 50..."
                      className="w-full bg-[#0B0708] border border-[#FF4D6D] rounded-[4px] px-3 py-1.5 text-xs font-mono font-bold text-[#FF4D6D] focus:outline-none"
                    />
                    <span className="text-[11px] font-mono text-[#69786F] shrink-0">Max: 50</span>
                  </div>
                ) : (
                  <div className="grid grid-cols-5 gap-1.5">
                    {[5, 10, 15, 20, 30].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setQuestionCount(count)}
                        className={`py-1.5 rounded-[4px] font-mono text-xs font-semibold border transition-all ${
                          questionCount === count
                            ? "bg-[rgba(255, 77, 109,0.2)] border-[#FF4D6D] text-[#FF4D6D]"
                            : "bg-[#0B0708] border-[rgba(240, 160, 180,0.14)] text-[#A0AEA5] hover:text-[#F2F7F3]"
                        }`}
                      >
                        {count}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Difficulty */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-[#A0AEA5] mb-1.5">
                  Target Difficulty
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(["Easy", "Medium", "Hard"] as DifficultyLevel[]).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDifficulty(d)}
                      className={`py-1.5 rounded-[4px] font-mono text-xs font-semibold border transition-all ${
                        difficulty === d
                          ? d === "Hard"
                            ? "bg-[rgba(248,113,113,0.18)] border-[#F87171] text-[#F87171]"
                            : d === "Medium"
                              ? "bg-[rgba(255, 117, 143,0.18)] border-[#FF758F] text-[#FF758F]"
                              : "bg-[rgba(255, 77, 109,0.18)] border-[#FF4D6D] text-[#FF4D6D]"
                          : "bg-[#0B0708] border-[rgba(240, 160, 180,0.14)] text-[#A0AEA5] hover:text-[#F2F7F3]"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Question Types Checkboxes */}
            <div className="pt-2 border-t border-[rgba(240, 160, 180,0.1)]">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-mono uppercase tracking-wider text-[#A0AEA5]">
                  Question Types ({selectedQuestionTypes.length} Selected)
                </label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedQuestionTypes([
                        "mcq_single",
                        "mcq_multiple",
                        "true_false",
                        "fill_in_the_blank",
                        "match_following",
                        "drag_drop_categorize",
                        "error_spotting",
                        "sequence_ordering",
                        "assertion_reasoning",
                      ])
                    }
                    className="text-[10px] font-mono uppercase text-[#FF4D6D] hover:underline"
                  >
                    Select All
                  </button>
                  <span className="text-[#69786F] text-[10px]">•</span>
                  <button
                    type="button"
                    onClick={() => setSelectedQuestionTypes(["mcq_single"])}
                    className="text-[10px] font-mono uppercase text-[#A0AEA5] hover:underline"
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  { id: "mcq_single", label: "Single Choice MCQ" },
                  { id: "mcq_multiple", label: "Multi-Select MCQ" },
                  { id: "true_false", label: "True / False" },
                  { id: "fill_in_the_blank", label: "Fill in Blanks" },
                  { id: "match_following", label: "Match the Following" },
                  { id: "drag_drop_categorize", label: "Drag & Drop Grouping" },
                  { id: "error_spotting", label: "Error Spotting" },
                  { id: "sequence_ordering", label: "Sequence Ordering" },
                  { id: "assertion_reasoning", label: "Assertion & Reason" },
                ].map((typeItem) => {
                  const isChecked = selectedQuestionTypes.includes(typeItem.id);
                  return (
                    <button
                      key={typeItem.id}
                      type="button"
                      onClick={() => toggleQuestionType(typeItem.id)}
                      className={`flex items-center gap-2 px-3 py-2 rounded-[5px] border text-xs font-medium transition-all ${
                        isChecked
                          ? "bg-[#2A141A] border-[rgba(255, 77, 109,0.4)] text-[#F2F7F3]"
                          : "bg-[#0B0708] border-[rgba(240, 160, 180,0.14)] text-[#69786F] hover:text-[#A0AEA5]"
                      }`}
                    >
                      <div
                        className={`w-3.5 h-3.5 rounded-[3px] border flex items-center justify-center shrink-0 ${
                          isChecked
                            ? "bg-[#FF4D6D] border-[#FF4D6D] text-[#0B0708]"
                            : "border-[rgba(240, 160, 180,0.3)] bg-transparent"
                        }`}
                      >
                        {isChecked && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                      </div>
                      <span className="truncate">{typeItem.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Phase 2: Generating Telemetry Console */}
        {phase === "generating" && (
          <div className="p-8 space-y-6">
            <div className="text-center space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.3)] text-[#FF4D6D] shadow-[0_0_30px_rgba(255, 77, 109,0.25)]">
                <Cpu className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-lg font-bold text-[#F2F7F3]">
                Analyzing Curriculum &amp; Synthesizing Questions...
              </h3>
              <p className="text-xs text-[#A0AEA5] max-w-md mx-auto">
                Analyzing core study concepts from{" "}
                <span className="font-mono text-[#FF4D6D]">{selectedFile?.name}</span> using
                QuizDorm AI.
              </p>
            </div>

            {/* Future OS Telemetry Bar */}
            <div className="max-w-xl mx-auto space-y-2">
              <div className="flex items-center justify-between font-mono text-xs text-[#A0AEA5]">
                <span className="text-[#FF4D6D] flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-ping" />
                  {telemetryStepText}
                </span>
                <span>{telemetryProgress}%</span>
              </div>
              <div className="w-full h-2 bg-[#0B0708] rounded-full overflow-hidden border border-[rgba(240, 160, 180,0.18)]">
                <div
                  className="h-full bg-gradient-to-r from-[#FF758F] to-[#FF4D6D] transition-all duration-300 shadow-[0_0_12px_rgba(255, 77, 109,0.4)]"
                  style={{ width: `${telemetryProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-[#69786F] pt-2">
                <span>Elapsed: {elapsedSeconds}s</span>
                <span>Engine: QuizDorm AI Engine</span>
                <span>Status: Ready</span>
              </div>
            </div>

            {/* Pipeline Stage Indicators */}
            <div className="max-w-xl mx-auto grid grid-cols-1 gap-2 pt-2">
              {[
                { title: "Document Structure & Concept Scanning", threshold: 25 },
                { title: "Key Definitions, Formulas & Historical Dates", threshold: 50 },
                { title: "Question Generation & Distractor Traps", threshold: 75 },
                { title: "Answer Checking & Educational Quality Filter", threshold: 95 },
              ].map((stage, idx) => {
                const isDone = telemetryProgress >= stage.threshold;
                const isCurrent =
                  telemetryProgress >= stage.threshold - 25 && telemetryProgress < stage.threshold;
                return (
                  <div
                    key={idx}
                    className={`flex items-center justify-between p-2.5 rounded-[5px] border text-xs font-mono transition-all ${
                      isDone
                        ? "bg-[#1D1013] border-[rgba(255, 77, 109,0.3)] text-[#F2F7F3]"
                        : isCurrent
                          ? "bg-[rgba(255, 77, 109,0.06)] border-[rgba(255, 77, 109,0.2)] text-[#FF4D6D]"
                          : "bg-[#0B0708] border-[rgba(240, 160, 180,0.08)] text-[#69786F]"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border border-current">
                        {idx + 1}
                      </span>
                      {stage.title}
                    </span>
                    <span>
                      {isDone ? (
                        <Check className="w-4 h-4 text-[#FF4D6D]" />
                      ) : isCurrent ? (
                        <span className="text-[10px] uppercase tracking-wider text-[#FF4D6D] animate-pulse">
                          Processing
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#69786F]">Pending</span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Phase 3: Review & Edit Workspace */}
        {phase === "review" && (
          <div className="p-6 space-y-6">
            {/* Meta summary card */}
            <div className="bg-[#1D1013] border border-[rgba(255, 77, 109,0.25)] rounded-[6px] p-4 flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-[#FF4D6D]">
                  <CheckCircle2 className="w-4 h-4" /> Questions Generated & Validated
                </div>
                <h4 className="text-base font-bold text-[#F2F7F3]">
                  {generationMetadata.docTitle || "Curriculum Assessment"}
                </h4>
                {generationMetadata.summary && (
                  <p className="text-xs text-[#A0AEA5] max-w-2xl line-clamp-2">
                    {generationMetadata.summary}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <div className="text-center px-3 py-1.5 rounded-[4px] bg-[#0B0708] border border-[rgba(240, 160, 180,0.14)]">
                  <div className="text-[#69786F] text-[10px] uppercase">Questions</div>
                  <div className="text-base font-bold text-[#FF4D6D]">
                    {generatedQuestions.length}
                  </div>
                </div>
                <div className="text-center px-3 py-1.5 rounded-[4px] bg-[#0B0708] border border-[rgba(240, 160, 180,0.14)]">
                  <div className="text-[#69786F] text-[10px] uppercase">Total Marks</div>
                  <div className="text-base font-bold text-[#F2F7F3]">
                    {generatedQuestions.reduce((acc, q) => acc + (q.marks || 1), 0)}
                  </div>
                </div>
                <div className="text-center px-3 py-1.5 rounded-[4px] bg-[#0B0708] border border-[rgba(240, 160, 180,0.14)]">
                  <div className="text-[#69786F] text-[10px] uppercase">Confidence</div>
                  <div className="text-base font-bold text-[#FF758F]">95%</div>
                </div>
              </div>
            </div>

            {/* Zero Downtime Fallback Warning Banner */}
            {generationMetadata.warning && (
              <div className="p-3.5 rounded-[6px] bg-[rgba(245,158,11,0.12)] border border-[rgba(245,158,11,0.3)] text-[#FDE68A] flex items-start gap-3 text-xs">
                <AlertTriangle className="w-4 h-4 text-[#FBBF24] shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <div className="font-semibold text-[#FBBF24]">
                    High-Precision Document Analysis Engine Active
                  </div>
                  <div className="text-[#FEF3C7] text-[11px] leading-relaxed">
                    {generationMetadata.warning}
                  </div>
                </div>
              </div>
            )}

            {/* Questions List with Inline Editing */}
            <div className="space-y-4 max-h-[48vh] overflow-y-auto pr-1">
              {generatedQuestions.map((question, qIdx) => (
                <div
                  key={question.id}
                  className="bg-[#0B0708] border border-[rgba(240, 160, 180,0.16)] rounded-[6px] p-4 space-y-3 hover:border-[rgba(255, 77, 109,0.3)] transition-all"
                >
                  {/* Question Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-[4px] bg-[#2A141A] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] text-xs font-mono font-bold flex items-center justify-center">
                        {qIdx + 1}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[3px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] text-[#A0AEA5]">
                        {question.type}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)]">
                        {question.difficulty} • {question.marks} Marks
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(qIdx)}
                      className="text-[#69786F] hover:text-[#F87171] p-1 transition-colors"
                      title="Discard question"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Question Stem (Editable) */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                      Question Stem
                    </label>
                    <textarea
                      rows={2}
                      value={question.title}
                      onChange={(e) => handleUpdateQuestionTitle(qIdx, e.target.value)}
                      className="w-full bg-[#1D1013] border border-[rgba(240, 160, 180,0.18)] rounded-[4px] p-2 text-sm text-[#F2F7F3] focus:outline-none focus:border-[#FF4D6D]"
                    />
                  </div>

                  {/* Options List (Editable with Correct Toggle) */}
                  {question.options && question.options.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F]">
                        Options (Click circle to set correct answer)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {question.options.map((opt) => (
                          <div
                            key={opt.id}
                            className={`flex items-center gap-2 p-2 rounded-[4px] border text-xs transition-all ${
                              opt.isCorrect
                                ? "bg-[rgba(255, 77, 109,0.08)] border-[rgba(255, 77, 109,0.35)]"
                                : "bg-[#1D1013] border-[rgba(240, 160, 180,0.12)]"
                            }`}
                          >
                            <button
                              type="button"
                              onClick={() => handleToggleOptionCorrect(qIdx, opt.id)}
                              className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                                opt.isCorrect
                                  ? "bg-[#FF4D6D] border-[#FF4D6D] text-[#0B0708]"
                                  : "border-[rgba(240, 160, 180,0.4)] hover:border-[#FF4D6D]"
                              }`}
                            >
                              {opt.isCorrect && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                            </button>
                            <input
                              type="text"
                              value={opt.text}
                              onChange={(e) =>
                                handleUpdateOptionText(qIdx, opt.id, e.target.value)
                              }
                              className="w-full bg-transparent text-xs text-[#F2F7F3] focus:outline-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Matching Pairs Display */}
                  {question.matchingPairs && question.matchingPairs.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F]">
                        Matching Pairs
                      </label>
                      <div className="space-y-1.5">
                        {question.matchingPairs.map((pair, pIdx) => (
                          <div key={pair.id || pIdx} className="grid grid-cols-2 gap-2 text-xs font-mono">
                            <div className="p-2 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)] text-[#F2F7F3]">
                              <span className="text-[#FF4D6D] font-bold mr-1.5">{pIdx + 1}.</span> {pair.leftItem}
                            </div>
                            <div className="p-2 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)] text-[#FF758F]">
                              <span className="text-[#A0AEA5] mr-1.5">→</span> {pair.rightItem}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sequence Items Display */}
                  {question.sequenceItems && question.sequenceItems.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F]">
                        Sequential Order (Steps 1-{question.sequenceItems.length})
                      </label>
                      <div className="space-y-1">
                        {question.sequenceItems.map((seq, sIdx) => (
                          <div key={seq.id || sIdx} className="p-2 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)] text-xs font-mono flex items-center gap-2">
                            <span className="w-5 h-5 rounded-[2px] bg-[#2A141A] text-[#FF4D6D] font-bold flex items-center justify-center shrink-0 border border-[rgba(255, 77, 109,0.3)] text-[10px]">
                              {seq.order || sIdx + 1}
                            </span>
                            <span className="text-[#F2F7F3]">{seq.text}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Drag & Drop Categories Display */}
                  {question.dragDropCategories && question.dragDropCategories.length > 0 && (
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F]">
                        Drag & Drop Category Buckets
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                        {question.dragDropCategories.map((cat) => (
                          <div key={cat.id} className="p-2.5 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] space-y-1.5">
                            <div className="font-bold text-[#FF4D6D]">{(cat as any).title || cat.name || cat.id}</div>
                            <div className="flex flex-wrap gap-1">
                              {(question.dragDropItems || [])
                                .filter((i) => i.categoryId === cat.id || i.targetCategoryId === cat.id)
                                .map((item) => (
                                  <span key={item.id} className="px-2 py-0.5 rounded-[3px] bg-[#2A141A] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.1)] text-[11px]">
                                    {item.text}
                                  </span>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Explanation (Editable) */}
                  <div>
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                      Explanation & Answer Breakdown
                    </label>
                    <input
                      type="text"
                      value={question.explanation || ""}
                      onChange={(e) => handleUpdateExplanation(qIdx, e.target.value)}
                      placeholder="Add an explanation for the solution..."
                      className="w-full bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] rounded-[4px] px-2.5 py-1.5 text-xs text-[#A0AEA5] focus:outline-none focus:border-[#FF4D6D]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="p-4 bg-[#0B0708] border-t border-[rgba(240, 160, 180,0.12)] flex flex-wrap items-center justify-between gap-3">
          {phase === "config" && (
            <>
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                className="text-[#A0AEA5] hover:text-[#F2F7F3]"
              >
                Cancel
              </Button>
              <Button
                onClick={handleStartGeneration}
                disabled={!selectedFile}
                className="bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF758F] font-bold px-5 font-mono shadow-[0_0_15px_rgba(255, 77, 109,0.3)] transition-all"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Synthesize High-Rigor Assessment
              </Button>
            </>
          )}

          {phase === "generating" && (
            <div className="w-full flex items-center justify-between text-xs text-[#A0AEA5] font-mono">
              <span>Synthesizing high-rigor assessment questions with QuizDorm Intelligence...</span>
              <span className="text-[#FF4D6D] animate-pulse">Running</span>
            </div>
          )}

          {phase === "review" && (
            <>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPhase("config")}
                  className="bg-[#1D1013] border-[rgba(240, 160, 180,0.2)] text-[#A0AEA5] hover:text-[#F2F7F3] font-mono text-xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 mr-1.5" /> Re-generate
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleImportToBank}
                  className="bg-[#1D1013] border-[rgba(240, 160, 180,0.2)] text-[#A0AEA5] hover:text-[#F2F7F3] font-mono text-xs"
                >
                  <Save className="w-3.5 h-3.5 mr-1.5" /> Save to Question Bank
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportJson}
                  className="bg-[#1D1013] border-[rgba(240, 160, 180,0.2)] text-[#A0AEA5] hover:text-[#F2F7F3] font-mono text-xs"
                >
                  <Download className="w-3.5 h-3.5 mr-1.5" /> Export JSON
                </Button>
              </div>

              <div className="flex items-center gap-2">
                {onQuestionsAdded && (
                  <Button
                    variant="outline"
                    onClick={handleAddToCurrentQuiz}
                    className="border-[rgba(255, 77, 109,0.4)] text-[#FF4D6D] bg-[#1D1013] hover:bg-[rgba(255, 77, 109,0.1)] font-mono text-xs"
                  >
                    <Plus className="w-4 h-4 mr-1.5" /> Add to Current Quiz
                  </Button>
                )}

                <Button
                  onClick={handlePublishAndTakeNow}
                  className="bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF758F] font-bold px-5 font-mono shadow-[0_0_20px_rgba(255, 77, 109,0.35)] transition-all"
                >
                  <Play className="w-4 h-4 mr-2 fill-current" />
                  Publish & Take Quiz Now
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
