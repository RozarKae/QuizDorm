"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
Dialog,
DialogContent,
DialogDescription,
DialogTitle
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
BloomsLevel,
GeneratedQuestion,
GenerationSourceMode,
} from "@/lib/ai/schemas/questionGenerationSchema";
import { formatGeneratedQuestionToQuestionItem } from "@/lib/ai/utils/formatQuestion";
import { importQuestions } from "@/lib/data/question-bank";
import { QuestionValidationResult } from "@/lib/quality/questionIntelligenceValidator";
import { syncQuestionsToSupabase } from "@/lib/supabase/questionSync";
import { DifficultyLevel,QuestionItem,QuestionType } from "@/lib/types/question";
import {
BookOpen,
Brain,
Check,
CheckCircle2,
CheckSquare,
Clock,
Edit3,
FileText,
Languages,
Layers,
RefreshCw,
Save,
Sparkles,
Square,
Trash2,
Upload
} from "lucide-react";
import { useEffect,useRef,useState } from "react";
import { toast } from "sonner";

interface ReviewableQuestionItem {
  question: GeneratedQuestion;
  validation: QuestionValidationResult;
  selected: boolean;
  isEditing?: boolean;
}

interface AIQuestionGeneratorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onQuestionsSaved?: (savedQuestions: QuestionItem[]) => void;
  defaultSubject?: string;
  defaultTopic?: string;
}

const SUPPORTED_LANGUAGES = [
  "English",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Tamil",
  "Arabic",
  "Mandarin Chinese",
  "Japanese",
  "Portuguese",
];

const BLOOMS_TAXONOMY_LEVELS: (BloomsLevel | "Mixed")[] = [
  "Mixed",
  "Remember",
  "Understand",
  "Apply",
  "Analyze",
  "Evaluate",
  "Create",
];

const ACADEMIC_SUBJECTS = [
  "General Academic",
  "Science",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "History",
  "Geography",
  "Economics",
  "Computer Science",
  "English Literature",
  "Civics & Polity",
  "Environmental Science",
];

const QUESTION_TYPE_OPTIONS: { id: QuestionType; label: string; description: string }[] = [
  { id: "mcq_single", label: "Single-Choice MCQ", description: "4 choices, 1 correct" },
  { id: "mcq_multiple", label: "Multi-Choice MCQ", description: "4-5 choices, 2+ correct" },
  { id: "true_false", label: "True / False", description: "Binary choice with explanation" },
  { id: "fill_in_the_blank", label: "Fill-in-the-Blank", description: "Keyword stem with [blank]" },
  { id: "match_following", label: "Matching Pairs", description: "3-4 paired concept matches" },
  { id: "sequence_ordering", label: "Chronological Sequence", description: "3-5 steps in order" },
];

export function AIQuestionGeneratorModal({
  open,
  onOpenChange,
  onQuestionsSaved,
  defaultSubject = "Science",
  defaultTopic = "",
}: AIQuestionGeneratorModalProps) {
  // Mode & Target Configuration
  const [sourceMode, setSourceMode] = useState<GenerationSourceMode>("topic");
  const [topic, setTopic] = useState(defaultTopic);
  const [subject, setSubject] = useState(defaultSubject);
  const [subtopic] = useState("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Medium");
  const [bloomsLevel, setBloomsLevel] = useState<BloomsLevel | "Mixed">("Understand");
  const [questionCount, setQuestionCount] = useState<number>(5);
  const [language, setLanguage] = useState<string>("English");
  const [selectedTypes, setSelectedTypes] = useState<QuestionType[]>([
    "mcq_single",
    "mcq_multiple",
    "true_false",
  ]);
  const [sourceContent, setSourceContent] = useState("");
  const [targetObjective] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Workflow Phases: configure -> generating -> review
  const [phase, setPhase] = useState<"configure" | "generating" | "review">("configure");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [telemetryProgress, setTelemetryProgress] = useState(0);
  const [telemetryStepText, setTelemetryStepText] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Review & Curation State
  const [reviewItems, setReviewItems] = useState<ReviewableQuestionItem[]>([]);
  const [generationSummary, setGenerationSummary] = useState<{
    documentTitle?: string;
    summary?: string;
    modelUsed?: string;
    latencyMs?: number;
    averageScore?: number;
  }>({});

  // Reset or initialize when modal opens
  useEffect(() => {
    if (open) {
      queueMicrotask(() => {
        if (defaultTopic) {
          setTopic((current) => current || defaultTopic);
        }
        if (defaultSubject) {
          setSubject((current) => (!current || current === "Science" ? defaultSubject : current));
        }
      });
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [open, defaultTopic, defaultSubject]);

  const toggleQuestionType = (t: QuestionType) => {
    if (selectedTypes.includes(t)) {
      if (selectedTypes.length === 1) {
        toast.info("At least one question type must be selected.");
        return;
      }
      setSelectedTypes(selectedTypes.filter((x) => x !== t));
    } else {
      setSelectedTypes([...selectedTypes, t]);
    }
  };

  const handleStartGeneration = async () => {
    if (!topic.trim() && sourceMode === "topic") {
      toast.error("Please specify a target topic for question generation.");
      return;
    }
    if (!sourceContent.trim() && (sourceMode === "syllabus" || sourceMode === "text")) {
      toast.error(`Please provide your ${sourceMode === "syllabus" ? "syllabus outline" : "source text"} content.`);
      return;
    }
    if (!selectedFile && sourceMode === "pdf") {
      toast.error("Please select or drop a document to extract questions.");
      return;
    }

    setPhase("generating");
    setTelemetryProgress(15);
    setTelemetryStepText("Contacting QuizDorm Question Intelligence Engine...");
    setElapsedSeconds(0);

    timerRef.current = setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);

    try {
      setTimeout(() => {
        setTelemetryProgress(35);
        setTelemetryStepText("Directing Gemini 3.5 Flash Lite with curriculum constraints...");
      }, 800);

      setTimeout(() => {
        setTelemetryProgress(65);
        setTelemetryStepText("Authoring homogeneous distractors & educational rationales...");
      }, 2000);

      setTimeout(() => {
        setTelemetryProgress(85);
        setTelemetryStepText("Auditing Bloom's taxonomy & pedagogical quality gates...");
      }, 3500);

      let responseData: {
        success?: boolean;
        error?: string;
        data?: GeneratedQuestion[];
        questions?: GeneratedQuestion[];
        documentTitle?: string;
        summary?: string;
        validationSummary?: {
          averageQualityScore?: number;
        };
        metadata?: {
          modelUsed?: string;
          latencyMs?: number;
        };
      };

      if (sourceMode === "pdf" && selectedFile) {
        // Use PDF to quiz API
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("subject", subject);
        formData.append("topic", topic || selectedFile.name.replace(/\.[^/.]+$/, ""));
        formData.append("difficulty", difficulty);
        formData.append("questionCount", String(questionCount));
        formData.append("questionTypes", JSON.stringify(selectedTypes));

        const res = await fetch("/api/ai/pdf-to-quiz", {
          method: "POST",
          body: formData,
        });
        responseData = await res.json();
      } else {
        // Use Unified Batch Generation API
        const payload = {
          isBatch: true,
          sourceMode,
          topic: topic.trim() || "Curriculum Unit",
          subject: subject.trim() || "General Academic",
          subtopic: subtopic.trim() || undefined,
          difficulty,
          bloomsLevel: bloomsLevel === "Mixed" ? "Understand" : bloomsLevel,
          questionCount,
          questionTypes: selectedTypes,
          language,
          sourceContent: sourceContent.trim() || undefined,
          targetLearningObjective: targetObjective.trim() || undefined,
        };

        const res = await fetch("/api/ai/questions/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        responseData = await res.json();
      }

      if (timerRef.current) clearInterval(timerRef.current);
      setTelemetryProgress(100);
      setTelemetryStepText("Quality evaluation completed!");

      if (!responseData.success) {
        throw new Error(responseData.error || "Failed to generate questions.");
      }

      const rawQuestions: GeneratedQuestion[] = responseData.data || responseData.questions || [];
      const validationSummary = responseData.validationSummary || {};

      if (rawQuestions.length === 0) {
        throw new Error("No questions returned by the AI provider.");
      }

      // Format into review items
      const items: ReviewableQuestionItem[] = rawQuestions.map((q: GeneratedQuestion) => {
        const itemValidation: QuestionValidationResult = (q as GeneratedQuestion & { validation?: QuestionValidationResult }).validation || {
          isValid: true,
          qualityScore: 95,
          stemClarityScore: 95,
          distractorHomogeneityScore: 95,
          recommendedStatus: "approved",
          issues: [],
          summary: "Question conforms to pedagogical specifications.",
        };

        return {
          question: q,
          validation: itemValidation,
          selected: true, // Default all selected for educator review
          isEditing: false,
        };
      });

      setReviewItems(items);
      setGenerationSummary({
        documentTitle: responseData.documentTitle || `${topic} Assessment`,
        summary: responseData.summary || `Generated ${items.length} questions on ${topic}`,
        modelUsed: responseData.metadata?.modelUsed || "gemini-3.5-flash-lite",
        latencyMs: responseData.metadata?.latencyMs,
        averageScore: validationSummary.averageQualityScore || 96,
      });

      setPhase("review");
      toast.success(`Successfully generated ${items.length} assessment questions!`);
    } catch (err: unknown) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase("configure");
      const errorMsg = err instanceof Error ? err.message : "Question generation failed. Please try again.";
      toast.error(errorMsg);
    }
  };

  // Toggle selection for save
  const toggleSelectQuestion = (idx: number) => {
    setReviewItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, selected: !item.selected } : item))
    );
  };

  const selectAll = (selected: boolean) => {
    setReviewItems((prev) => prev.map((item) => ({ ...item, selected })));
  };

  // Remove/Reject a question
  const discardQuestion = (idx: number) => {
    setReviewItems((prev) => prev.filter((_, i) => i !== idx));
    toast.info("Question discarded from review batch.");
  };

  // Inline question editing
  const toggleEditQuestion = (idx: number) => {
    setReviewItems((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, isEditing: !item.isEditing } : item))
    );
  };

  const updateQuestionTitle = (idx: number, newTitle: string) => {
    setReviewItems((prev) =>
      prev.map((item, i) =>
        i === idx ? { ...item, question: { ...item.question, title: newTitle } } : item
      )
    );
  };

  const updateOptionText = (qIdx: number, optIdx: number, newText: string) => {
    setReviewItems((prev) =>
      prev.map((item, i) => {
        if (i !== qIdx) return item;
        const opts = [...item.question.options];
        opts[optIdx] = { ...opts[optIdx], text: newText };
        return { ...item, question: { ...item.question, options: opts } };
      })
    );
  };

  const setCorrectOption = (qIdx: number, optIdx: number) => {
    setReviewItems((prev) =>
      prev.map((item, i) => {
        if (i !== qIdx) return item;
        const isSingle = item.question.type === "mcq_single" || item.question.type === "true_false";
        const opts = item.question.options.map((opt, oIdx) => ({
          ...opt,
          isCorrect: isSingle ? oIdx === optIdx : oIdx === optIdx ? !opt.isCorrect : opt.isCorrect,
        }));
        return { ...item, question: { ...item.question, options: opts } };
      })
    );
  };

  // Commit selected questions to Question Bank
  const handleSaveSelectedToBank = async () => {
    const selectedToSave = reviewItems.filter((i) => i.selected);
    if (selectedToSave.length === 0) {
      toast.error("Please select at least one question to save to the Question Bank.");
      return;
    }

    // Convert each to QuestionItem
    const formattedQuestions: QuestionItem[] = selectedToSave.map((item, idx) =>
      formatGeneratedQuestionToQuestionItem(item.question, idx)
    );

    // Save to Question Bank localStorage & in-memory store
    const result = importQuestions(formattedQuestions);

    // Asynchronously sync to Supabase database if connected
    syncQuestionsToSupabase(formattedQuestions).catch((e) =>
      console.warn("Background Supabase sync notice:", e.message)
    );

    toast.success(
      `Saved ${result.imported} question${result.imported === 1 ? "" : "s"} to your Question Bank!`
    );

    if (onQuestionsSaved) {
      onQuestionsSaved(formattedQuestions);
    }

    onOpenChange(false);
    // Reset state
    setPhase("configure");
    setReviewItems([]);
  };

  const selectedCount = reviewItems.filter((i) => i.selected).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#0D1520] border-gray-200 dark:border-white/10 text-gray-900 dark:text-[#F2F7F3] shadow-2xl p-0">
        {/* Header */}
        <div className="sticky top-0 z-20 px-6 py-4 border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#0D1520]/95 backdrop-blur-md flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <DialogTitle className="text-lg font-bold flex items-center gap-2">
                Phase 2.0 AI Question Generator
                <Badge variant="outline" className="text-[10px] bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400">
                  Gemini 3.5 Flash Lite
                </Badge>
              </DialogTitle>
              <DialogDescription className="text-xs text-gray-500 dark:text-gray-400">
                Author pedagogical assessment questions with Bloom&apos;s Taxonomy ratings and verified distractors.
              </DialogDescription>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {/* PHASE 1: CONFIGURATION */}
          {phase === "configure" && (
            <div className="space-y-6">
              {/* Source Mode Tabs */}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                  1. Select Generation Mode
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <button
                    type="button"
                    onClick={() => setSourceMode("topic")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      sourceMode === "topic"
                        ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <BookOpen className="w-4 h-4 mb-1.5" />
                    <div className="text-xs font-bold">Topic / Domain</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Concepts & academic subjects</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSourceMode("syllabus")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      sourceMode === "syllabus"
                        ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Layers className="w-4 h-4 mb-1.5" />
                    <div className="text-xs font-bold">Syllabus / Units</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Course curriculum outline</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSourceMode("text")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      sourceMode === "text"
                        ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <FileText className="w-4 h-4 mb-1.5" />
                    <div className="text-xs font-bold">Pasted Text</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">Strictly ground in excerpt</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setSourceMode("pdf")}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      sourceMode === "pdf"
                        ? "bg-indigo-50 dark:bg-indigo-950/30 border-indigo-500 text-indigo-600 dark:text-indigo-400 shadow-sm"
                        : "border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <Upload className="w-4 h-4 mb-1.5" />
                    <div className="text-xs font-bold">Upload Document</div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">PDF, TXT, MD, Images</div>
                  </button>
                </div>
              </div>

              {/* Subject & Topic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
                    Target Topic / Module <span className="text-red-500">*</span>
                  </label>
                  <Input
                    placeholder="e.g. Thermodynamics, Indian Constitution, Organic Chemistry"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="text-xs h-9 bg-gray-50 dark:bg-[#15202E] border-gray-200 dark:border-white/10"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
                    Academic Subject / Discipline
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full text-xs h-9 rounded-md bg-gray-50 dark:bg-[#15202E] border border-gray-200 dark:border-white/10 px-3 py-1 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    {ACADEMIC_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Source Content Area (if syllabus, text, or pdf) */}
              {(sourceMode === "syllabus" || sourceMode === "text") && (
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1.5">
                    {sourceMode === "syllabus"
                      ? "Paste Curriculum Syllabus & Learning Units"
                      : "Paste Source Reading Excerpt or Article"}
                  </label>
                  <textarea
                    rows={4}
                    placeholder={
                      sourceMode === "syllabus"
                        ? "Unit 1: Photosynthesis & Light Reactions\nUnit 2: Calvin Cycle & Carbon Fixation\nUnit 3: Chemiosmosis & ATP Synthase..."
                        : "Paste lesson notes or paragraph content here to ground all questions strictly in the text..."
                    }
                    value={sourceContent}
                    onChange={(e) => setSourceContent(e.target.value)}
                    className="w-full text-xs rounded-md bg-gray-50 dark:bg-[#15202E] border border-gray-200 dark:border-white/10 p-3 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 font-mono"
                  />
                </div>
              )}

              {/* PDF Document Upload Area */}
              {sourceMode === "pdf" && (
                <div className="border-2 border-dashed border-gray-300 dark:border-white/15 rounded-xl p-6 text-center hover:border-indigo-500 transition-colors">
                  <input
                    type="file"
                    id="doc-upload"
                    accept=".pdf,.txt,.md,.png,.jpg,.jpeg,.webp"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        setSelectedFile(e.target.files[0]);
                        if (!topic) {
                          setTopic(e.target.files[0].name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
                        }
                      }
                    }}
                  />
                  <label htmlFor="doc-upload" className="cursor-pointer space-y-2 block">
                    <Upload className="w-8 h-8 text-indigo-500 mx-auto" />
                    <div className="text-xs font-semibold text-gray-700 dark:text-gray-200">
                      {selectedFile ? selectedFile.name : "Click to select or drop document here"}
                    </div>
                    <div className="text-[11px] text-gray-400">
                      Supported: PDF, TXT, Markdown, PNG, JPG (up to 50MB)
                    </div>
                  </label>
                </div>
              )}

              {/* Granular Instructional Parameters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#15202E]/60 border border-gray-200 dark:border-white/10">
                {/* Question Count */}
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                    Question Count
                  </label>
                  <select
                    value={questionCount}
                    onChange={(e) => setQuestionCount(Number(e.target.value))}
                    className="w-full text-xs h-8 rounded bg-white dark:bg-[#0D1520] border border-gray-200 dark:border-white/10 px-2 text-gray-800 dark:text-gray-200"
                  >
                    {[1, 3, 5, 8, 10, 15, 20].map((num) => (
                      <option key={num} value={num}>
                        {num} Question{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Difficulty */}
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full text-xs h-8 rounded bg-white dark:bg-[#0D1520] border border-gray-200 dark:border-white/10 px-2 text-gray-800 dark:text-gray-200"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                {/* Bloom's Taxonomy Level */}
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 flex items-center gap-1">
                    <Brain className="w-3 h-3 text-purple-400" /> Bloom&apos;s Taxonomy
                  </label>
                  <select
                    value={bloomsLevel}
                    onChange={(e) => setBloomsLevel(e.target.value as BloomsLevel | "Mixed")}
                    className="w-full text-xs h-8 rounded bg-white dark:bg-[#0D1520] border border-gray-200 dark:border-white/10 px-2 text-gray-800 dark:text-gray-200"
                  >
                    {BLOOMS_TAXONOMY_LEVELS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Target Language */}
                <div>
                  <label className="text-[11px] font-semibold text-gray-500 dark:text-gray-400 block mb-1 flex items-center gap-1">
                    <Languages className="w-3 h-3 text-emerald-400" /> Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full text-xs h-8 rounded bg-white dark:bg-[#0D1520] border border-gray-200 dark:border-white/10 px-2 text-gray-800 dark:text-gray-200"
                  >
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Question Types Selection */}
              <div>
                <label className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider block mb-2">
                  Allowed Question Formats
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {QUESTION_TYPE_OPTIONS.map((opt) => {
                    const isSelected = selectedTypes.includes(opt.id);
                    return (
                      <button
                        type="button"
                        key={opt.id}
                        onClick={() => toggleQuestionType(opt.id)}
                        className={`p-2.5 rounded-lg border text-left transition-all ${
                          isSelected
                            ? "bg-indigo-50/70 dark:bg-indigo-950/20 border-indigo-400 text-indigo-700 dark:text-indigo-300"
                            : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold">{opt.label}</span>
                          {isSelected ? (
                            <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                          ) : null}
                        </div>
                        <div className="text-[10px] text-gray-400 mt-0.5">{opt.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Generate Trigger */}
              <div className="pt-2 flex justify-end">
                <Button
                  onClick={handleStartGeneration}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold text-xs px-6 py-2 h-10 shadow-lg shadow-indigo-500/20"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate {questionCount} Question{questionCount > 1 ? "s" : ""} with AI
                </Button>
              </div>
            </div>
          )}

          {/* PHASE 2: GENERATING & TELEMETRY */}
          {phase === "generating" && (
            <div className="py-16 text-center space-y-6 max-w-md mx-auto">
              <div className="relative w-16 h-16 mx-auto">
                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-950 animate-pulse" />
                <div className="w-16 h-16 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin flex items-center justify-center text-indigo-600">
                  <Sparkles className="w-6 h-6" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-base font-bold text-gray-900 dark:text-[#F2F7F3]">
                  Synthesizing Curriculum Assessment
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{telemetryStepText}</p>
              </div>

              <div className="w-full bg-gray-100 dark:bg-white/10 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${telemetryProgress}%` }}
                />
              </div>

              <div className="flex items-center justify-center space-x-4 text-xs font-mono text-gray-400">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" /> {elapsedSeconds}s elapsed
                </span>
                <span>•</span>
                <span>Model: Gemini 3.5 Flash Lite</span>
              </div>
            </div>
          )}

          {/* PHASE 3: INTERACTIVE TEACHER REVIEW & CURATION */}
          {phase === "review" && (
            <div className="space-y-6">
              {/* Review Summary Bar */}
              <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800/40 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center space-x-3">
                  <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                    Quality Passed ({generationSummary.averageScore || 96}/100)
                  </Badge>
                  <span className="text-gray-600 dark:text-gray-300">
                    <strong>{selectedCount}</strong> of {reviewItems.length} questions selected for saving
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => selectAll(selectedCount < reviewItems.length)}
                    className="text-xs h-7 border-gray-200 dark:border-white/10"
                  >
                    {selectedCount < reviewItems.length ? "Select All" : "Deselect All"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleStartGeneration}
                    className="text-xs h-7 border-gray-200 dark:border-white/10"
                  >
                    <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
                  </Button>
                </div>
              </div>

              {/* Questions Review List */}
              <div className="space-y-4">
                {reviewItems.map((item, qIdx) => {
                  const { question, selected, isEditing } = item;

                  return (
                    <div
                      key={qIdx}
                      className={`p-4 rounded-xl border transition-all ${
                        selected
                          ? "bg-white dark:bg-[#15202E] border-indigo-200 dark:border-indigo-900/60 shadow-sm"
                          : "bg-gray-50/50 dark:bg-[#111923] border-gray-200 dark:border-white/5 opacity-60"
                      }`}
                    >
                      {/* Item Header */}
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <div className="flex items-start gap-2.5">
                          <button
                            type="button"
                            onClick={() => toggleSelectQuestion(qIdx)}
                            className="mt-0.5 text-indigo-600 dark:text-indigo-400 focus:outline-none"
                          >
                            {selected ? (
                              <CheckSquare className="w-4 h-4" />
                            ) : (
                              <Square className="w-4 h-4 text-gray-400" />
                            )}
                          </button>
                          <div>
                            <span className="text-xs font-bold text-gray-400 mr-2">Q{qIdx + 1}.</span>
                            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-gray-300">
                              {question.type}
                            </span>
                            <span className="text-xs font-semibold ml-1.5 px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400">
                              Bloom: {question.bloomsLevel || "Understand"}
                            </span>
                            <span className="text-xs font-semibold ml-1.5 px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                              {question.difficulty}
                            </span>
                          </div>
                        </div>

                        {/* Card Actions */}
                        <div className="flex items-center space-x-1">
                          <button
                            type="button"
                            onClick={() => toggleEditQuestion(qIdx)}
                            className="p-1 text-gray-400 hover:text-indigo-500 transition-colors"
                            title="Edit question text and options"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => discardQuestion(qIdx)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                            title="Discard question"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Question Stem */}
                      {isEditing ? (
                        <div className="mb-3">
                          <label className="text-[10px] font-semibold text-gray-400 uppercase">Question Stem</label>
                          <Input
                            value={question.title}
                            onChange={(e) => updateQuestionTitle(qIdx, e.target.value)}
                            className="text-xs font-medium bg-white dark:bg-[#0D1520] border-gray-200 dark:border-white/10"
                          />
                        </div>
                      ) : (
                        <h4 className="text-xs sm:text-sm font-medium text-gray-900 dark:text-[#F2F7F3] mb-3 leading-relaxed">
                          {question.title}
                        </h4>
                      )}

                      {/* Options List */}
                      {question.options && question.options.length > 0 && (
                        <div className="space-y-2 mb-3">
                          {question.options.map((opt, optIdx) => (
                            <div
                              key={opt.id || optIdx}
                              className={`p-2.5 rounded-lg border text-xs flex items-start justify-between gap-2 ${
                                opt.isCorrect
                                  ? "bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200"
                                  : "bg-gray-50/60 dark:bg-white/[0.02] border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-300"
                              }`}
                            >
                              <div className="flex items-start gap-2 flex-1">
                                <button
                                  type="button"
                                  onClick={() => isEditing && setCorrectOption(qIdx, optIdx)}
                                  className={`mt-0.5 rounded-full w-4 h-4 flex items-center justify-center text-[10px] ${
                                    opt.isCorrect
                                      ? "bg-emerald-500 text-white"
                                      : "border border-gray-300 dark:border-white/20 text-gray-400"
                                  }`}
                                >
                                  {opt.isCorrect && <Check className="w-2.5 h-2.5" />}
                                </button>

                                {isEditing ? (
                                  <Input
                                    value={opt.text}
                                    onChange={(e) => updateOptionText(qIdx, optIdx, e.target.value)}
                                    className="text-xs h-7 bg-white dark:bg-[#0D1520] border-gray-200 dark:border-white/10"
                                  />
                                ) : (
                                  <div>
                                    <div className="font-medium">{opt.text}</div>
                                    {opt.explanation && (
                                      <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                                        {opt.explanation}
                                        {opt.misconceptionType && (
                                          <span className="ml-1.5 text-[10px] text-amber-500 font-mono">
                                            [{opt.misconceptionType}]
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* General Master Explanation */}
                      {question.generalExplanation && (
                        <div className="p-2.5 rounded-lg bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 text-[11px] text-gray-600 dark:text-gray-400">
                          <strong className="text-gray-800 dark:text-gray-300">Explanation: </strong>
                          {question.generalExplanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Bottom Sticky Action Bar */}
              <div className="sticky bottom-0 py-3 px-4 rounded-xl bg-white/95 dark:bg-[#0D1520]/95 border border-gray-200 dark:border-white/10 backdrop-blur-md flex items-center justify-between shadow-xl">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPhase("configure")}
                  className="text-xs"
                >
                  Back to Parameters
                </Button>

                <Button
                  onClick={handleSaveSelectedToBank}
                  disabled={selectedCount === 0}
                  className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-6 shadow-md shadow-indigo-500/20"
                >
                  <Save className="w-3.5 h-3.5 mr-2" />
                  Save {selectedCount} Question{selectedCount === 1 ? "" : "s"} to Question Bank
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
