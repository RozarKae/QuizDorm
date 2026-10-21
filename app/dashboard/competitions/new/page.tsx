"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Clock,
  Users,
  Shield,
  Save,
  RefreshCw,
  Sparkles,
  Upload,
  BookOpen,
  Layers,
  Search,
  CheckCircle2,
  Trash2,
  ArrowUp,
  ArrowDown,
  HelpCircle,
  FileText,
  Image as ImageIcon,
  Plus,
  Zap,
  Filter,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  generateCollisionResistantCode,
  normalizeRoomCode,
} from "@/lib/live/liveSessionManager";
import {
  ALL_DEFAULT_QUESTIONS,
  getAllSubjects,
  getAllTopics,
} from "@/lib/data/question-bank";
import { QuestionItem, DifficultyLevel } from "@/lib/types/question";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

export default function CreateCompetitionPage() {
  const router = useRouter();
  const { profile } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Tournament Meta
  const [title, setTitle] = useState("Tamil Nadu & Kerala Science & Coding Decathlon 2026");
  const [hostName, setHostName] = useState("TN & Kerala Science Olympiad Council");
  const [description, setDescription] = useState(
    "Synchronized real-time multiplayer decathlon with microsecond telemetry and live podium shift."
  );
  const [code, setCode] = useState("QD-8492");
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [maxParticipants, setMaxParticipants] = useState(500);
  const [negativeMarking, setNegativeMarking] = useState(true);
  const [timeBonus, setTimeBonus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Question Provisioning Source Mode: 'bank' | 'ai' | 'file'
  const [activeTab, setActiveTab] = useState<"bank" | "ai" | "file">("bank");

  // Selected Questions Queue for the Arena
  const [selectedQuestions, setSelectedQuestions] = useState<QuestionItem[]>(() => {
    // Default initial queue from science & math bank (5 questions)
    return ALL_DEFAULT_QUESTIONS.slice(0, 5);
  });

  // Tab 1: Segregated Question Bank State
  const allSubjects = useMemo(() => ["All Subjects", ...getAllSubjects()], []);
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedTopic, setSelectedTopic] = useState("All Topics");
  const [searchQuery, setSearchQuery] = useState("");

  // Dynamic topics based on selected subject
  const availableTopics = useMemo(() => {
    const questions =
      selectedSubject === "All Subjects"
        ? ALL_DEFAULT_QUESTIONS
        : ALL_DEFAULT_QUESTIONS.filter((q) => q.subject === selectedSubject);

    const topicSet = new Set<string>();
    questions.forEach((q) => {
      if (q.topic) topicSet.add(q.topic);
    });
    return ["All Topics", ...Array.from(topicSet).sort()];
  }, [selectedSubject]);

  // Filtered Question Bank
  const filteredBankQuestions = useMemo(() => {
    return ALL_DEFAULT_QUESTIONS.filter((q) => {
      const matchSubject =
        selectedSubject === "All Subjects" || q.subject === selectedSubject;
      const matchTopic =
        selectedTopic === "All Topics" || q.topic === selectedTopic;
      const matchQuery =
        !searchQuery.trim() ||
        q.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.topic?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchSubject && matchTopic && matchQuery;
    });
  }, [selectedSubject, selectedTopic, searchQuery]);

  // Tab 2: AI Quizmaker State
  const [aiTopic, setAiTopic] = useState("Quantum Computing & Superposition");
  const [aiSubject, setAiSubject] = useState("Computer Science");
  const [aiDifficulty, setAiDifficulty] = useState<DifficultyLevel>("Medium");
  const [aiCount, setAiCount] = useState(5);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratedList, setAiGeneratedList] = useState<QuestionItem[]>([]);

  // Tab 3: File / PDF / Image Extractor State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isExtractingFile, setIsExtractingFile] = useState(false);
  const [extractedSummary, setExtractedSummary] = useState<string | null>(null);

  // Initialize fresh code on mount
  useEffect(() => {
    setCode(generateCollisionResistantCode());
    if (profile?.name) {
      setHostName(profile.name);
    }
  }, [profile]);

  const handleRegeneratePin = () => {
    const newPin = generateCollisionResistantCode();
    setCode(newPin);
    toast.info(`Generated new Room PIN: ${newPin}`);
  };

  // Queue Operations
  const handleToggleQuestionInQueue = (q: QuestionItem) => {
    const exists = selectedQuestions.some((item) => item.id === q.id);
    if (exists) {
      setSelectedQuestions((prev) => prev.filter((item) => item.id !== q.id));
      toast.info(`Removed "${q.title.slice(0, 32)}..." from arena queue`);
    } else {
      setSelectedQuestions((prev) => [...prev, q]);
      toast.success(`Added question #${selectedQuestions.length + 1} to arena queue!`);
    }
  };

  const handleAddAllFiltered = () => {
    const newItems = filteredBankQuestions.filter(
      (fq) => !selectedQuestions.some((sq) => sq.id === fq.id)
    );
    if (newItems.length === 0) {
      toast.info("All filtered questions are already in the queue.");
      return;
    }
    setSelectedQuestions((prev) => [...prev, ...newItems]);
    toast.success(`Added ${newItems.length} questions to arena queue!`);
  };

  const handleAddRandomFromTopic = (count = 5) => {
    const candidates = filteredBankQuestions.filter(
      (fq) => !selectedQuestions.some((sq) => sq.id === fq.id)
    );
    if (candidates.length === 0) {
      toast.info("No unselected questions remaining in this topic filter.");
      return;
    }
    const shuffled = [...candidates].sort(() => 0.5 - Math.random());
    const picked = shuffled.slice(0, count);
    setSelectedQuestions((prev) => [...prev, ...picked]);
    toast.success(`Added ${picked.length} random questions from "${selectedTopic}"!`);
  };

  const handleRemoveFromQueue = (index: number) => {
    setSelectedQuestions((prev) => prev.filter((_, idx) => idx !== index));
  };

  const handleMoveQueueItem = (index: number, direction: "up" | "down") => {
    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === selectedQuestions.length - 1)
    ) {
      return;
    }
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    const copy = [...selectedQuestions];
    const temp = copy[index];
    copy[index] = copy[targetIdx];
    copy[targetIdx] = temp;
    setSelectedQuestions(copy);
  };

  // AI Quizmaker Execution
  const handleGenerateAiQuestions = async () => {
    if (!aiTopic.trim()) {
      toast.error("Please enter a topic or concept for AI generation");
      return;
    }

    setIsGeneratingAi(true);
    setAiGeneratedList([]);

    try {
      // Generate requested question batch
      const generated: QuestionItem[] = [];

      for (let i = 0; i < aiCount; i++) {
        const res = await fetch("/api/ai/questions/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: `${aiTopic} (Subtopic #${i + 1})`,
            subject: aiSubject,
            topic: aiTopic,
            difficulty: aiDifficulty,
            type: "mcq_single",
          }),
        });

        const data = await res.json();
        if (data.success && data.data) {
          generated.push({
            ...data.data,
            id: `ai-live-${Date.now()}-${i + 1}`,
            marks: aiDifficulty === "Hard" ? 5 : aiDifficulty === "Medium" ? 4 : 2,
            timeLimitSeconds: timePerQuestion,
          });
        }
      }

      if (generated.length > 0) {
        setAiGeneratedList(generated);
        toast.success(`Generated ${generated.length} high-quality questions with AI!`);
      } else {
        // Fallback: Synthesize from matching topic bank
        const fallbackPool = ALL_DEFAULT_QUESTIONS.filter(
          (q) =>
            q.subject === aiSubject ||
            q.topic?.toLowerCase().includes(aiTopic.toLowerCase().slice(0, 4))
        );
        const fallbackPicked = (fallbackPool.length >= aiCount
          ? fallbackPool
          : ALL_DEFAULT_QUESTIONS
        )
          .slice(0, aiCount)
          .map((q, idx) => ({
            ...q,
            id: `ai-fallback-${Date.now()}-${idx + 1}`,
          }));
        setAiGeneratedList(fallbackPicked);
        toast.info(`Synthesized ${fallbackPicked.length} questions for "${aiTopic}".`);
      }
    } catch (err: any) {
      toast.error("Failed to generate AI questions. Check network connection.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleAddAllAiGeneratedToQueue = () => {
    if (aiGeneratedList.length === 0) return;
    setSelectedQuestions((prev) => [...prev, ...aiGeneratedList]);
    toast.success(`Added ${aiGeneratedList.length} AI-generated questions to arena queue!`);
    setAiGeneratedList([]);
  };

  // Image / PDF Extractor Execution
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleExtractFileToQuestions = async () => {
    if (!selectedFile) {
      toast.error("Please select a PDF document or image file first");
      return;
    }

    setIsExtractingFile(true);
    setExtractedSummary(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("subject", aiSubject || "Science");
      formData.append("topic", aiTopic || "Assessment");

      const res = await fetch("/api/ai/pdf-to-quiz", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success && data.questions && data.questions.length > 0) {
        const formatted: QuestionItem[] = data.questions.map((q: any, idx: number) => ({
          id: `file-q-${Date.now()}-${idx + 1}`,
          title: q.title || `Question ${idx + 1}`,
          type: q.type || "mcq_single",
          subject: q.subject || "General Science",
          category: q.category || "Olympiad",
          topic: q.topic || "Document Extraction",
          difficulty: q.difficulty || "Medium",
          marks: q.marks || 4,
          timeLimitSeconds: timePerQuestion,
          options: q.options || [
            { id: "opt-1", text: "Option A", isCorrect: true },
            { id: "opt-2", text: "Option B", isCorrect: false },
          ],
          explanation: q.explanation || "Extracted from uploaded document.",
          tags: ["pdf-extracted", "live-arena"],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }));

        setSelectedQuestions((prev) => [...prev, ...formatted]);
        setExtractedSummary(
          `Successfully parsed "${selectedFile.name}": Extracted ${formatted.length} verified questions into Arena queue!`
        );
        toast.success(`Imported ${formatted.length} questions from ${selectedFile.name}!`);
        setSelectedFile(null);
      } else {
        toast.error(data.error || "Could not extract questions from file");
      }
    } catch (err: any) {
      toast.error("Network error while extracting file. Try another document.");
    } finally {
      setIsExtractingFile(false);
    }
  };

  // Submit & Create Live Session
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!title.trim()) {
      toast.error("Please enter a competition title");
      return;
    }

    if (selectedQuestions.length === 0) {
      toast.error("Please add at least 1 question to the live arena queue before launching.");
      return;
    }

    setIsSubmitting(true);
    const cleanCode = normalizeRoomCode(code);

    try {
      const res = await fetch("/api/live/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          hostName: hostName.trim() || "Tamil Nadu & Kerala Science Council",
          code: cleanCode,
          questions: selectedQuestions,
          settings: {
            durationMinutes,
            maxParticipants,
            negativeMarking,
            timeBonus,
            timePerQuestionSeconds: timePerQuestion,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.session) {
        const secret = data.hostSecret;
        if (typeof window !== "undefined") {
          localStorage.setItem(`quizdorm_host_sec_${cleanCode}`, secret);
        }
        toast.success(
          `Live Arena "${title}" created with ${selectedQuestions.length} questions! PIN: ${cleanCode}`
        );
        router.push(
          `/dashboard/competitions/${data.sessionId || data.session.id}/live?code=${cleanCode}&hostSecret=${secret}&role=host`
        );
      } else {
        toast.error(data.error || "Failed to create live session");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      toast.error("Network error creating live tournament");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 py-4 px-2 sm:px-4 text-[#F2F7F3]">
      {/* Top Breadcrumb & Header */}
      <div>
        <Link
          href="/dashboard/competitions"
          className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#65F59A] mb-3 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> BACK TO COMPETITIONS
        </Link>
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5]">
          <span className="w-2 h-2 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
          <span>LIVE ARENA PROVISIONING // QUESTION ORCHESTRATION</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-[#F2F7F3] flex items-center mt-1">
          <Trophy className="w-7 h-7 text-[#65F59A] mr-2.5" /> Host New Live Competition
        </h1>
        <p className="text-xs font-mono text-[#A0AEA5] mt-1">
          Configure real-time tournament rules, select topic-segregated questions, or synthesize questions via AI / PDF.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* SECTION 1: Tournament Metadata & Host Controls */}
        <div className="bg-[#0C1210] p-6 rounded-2xl border border-[rgba(160,190,170,0.16)] shadow-lg space-y-6">
          <div className="border-b border-[rgba(160,190,170,0.12)] pb-3 flex items-center justify-between">
            <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#65F59A] flex items-center gap-2">
              <Zap className="w-4 h-4 fill-current" /> 1. Arena Metadata &amp; Host Identity
            </h2>
            <span className="text-[10px] font-mono text-[#38D9B0] bg-[#111B17] px-2.5 py-0.5 rounded-full border border-[rgba(160,190,170,0.14)]">
              SSE Real-Time Sync
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1.5">
                Tournament Name
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Tamil Nadu Inter-School Physics Olympiad"
                className="text-sm font-semibold bg-[#111B17] border-[rgba(160,190,170,0.2)] text-[#F2F7F3] rounded-[4px] focus:border-[#65F59A]"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1.5">
                Host / Organizing Institution
              </label>
              <Input
                value={hostName}
                onChange={(e) => setHostName(e.target.value)}
                placeholder="e.g. Government Model HSS / Choice School Kochi"
                className="text-sm font-semibold bg-[#111B17] border-[rgba(160,190,170,0.2)] text-[#F2F7F3] rounded-[4px] focus:border-[#65F59A]"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1.5">
              Tournament Brief &amp; Student Instructions
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide instructions, topics covered, and ranking rules..."
              className="w-full rounded-[4px] border border-[rgba(160,190,170,0.2)] bg-[#111B17] p-3 text-xs font-mono text-[#F2F7F3] focus:border-[#65F59A] focus:outline-none"
            />
          </div>

          {/* Arena PIN & Timer Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1.5">
                Arena Room PIN
              </label>
              <div className="flex space-x-2">
                <Input
                  value={code}
                  readOnly
                  className="text-xs font-mono font-bold uppercase bg-[#17251E] border-[#65F59A]/30 text-[#65F59A] rounded-[4px]"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleRegeneratePin}
                  className="shrink-0 text-xs font-mono border-[rgba(160,190,170,0.2)] bg-[#111B17] hover:bg-[#17251E] text-[#F2F7F3] rounded-[4px]"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1.5">
                Sec / Question
              </label>
              <Input
                type="number"
                value={timePerQuestion}
                onChange={(e) => setTimePerQuestion(Number(e.target.value))}
                min={10}
                max={180}
                className="text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.2)] rounded-[4px]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1.5">
                Total Duration (Mins)
              </label>
              <Input
                type="number"
                value={durationMinutes}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                min={5}
                max={240}
                className="text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.2)] rounded-[4px]"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1.5">
                Max Competitors
              </label>
              <Input
                type="number"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(Number(e.target.value))}
                min={2}
                max={5000}
                className="text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.2)] rounded-[4px]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-[rgba(160,190,170,0.1)]">
            <label className="flex items-center space-x-3 text-xs font-mono text-[#A0AEA5] cursor-pointer p-2.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
              <input
                type="checkbox"
                checked={timeBonus}
                onChange={(e) => setTimeBonus(e.target.checked)}
                className="w-4 h-4 text-[#65F59A] bg-[#070B0A] rounded border-[rgba(160,190,170,0.3)] focus:ring-[#65F59A]"
              />
              <span>Speed-Based Time Bonus (Fast answers earn up to +50 bonus pts)</span>
            </label>

            <label className="flex items-center space-x-3 text-xs font-mono text-[#A0AEA5] cursor-pointer p-2.5 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.1)]">
              <input
                type="checkbox"
                checked={negativeMarking}
                onChange={(e) => setNegativeMarking(e.target.checked)}
                className="w-4 h-4 text-[#65F59A] bg-[#070B0A] rounded border-[rgba(160,190,170,0.3)] focus:ring-[#65F59A]"
              />
              <span>Negative Marking (-25% penalty for wrong submissions)</span>
            </label>
          </div>
        </div>

        {/* SECTION 2: Interactive Question Provisioning Studio (The 3 Modes) */}
        <div className="bg-[#0C1210] p-6 rounded-2xl border border-[rgba(160,190,170,0.16)] shadow-lg space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[rgba(160,190,170,0.12)] gap-3">
            <div>
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#65F59A] flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#65F59A]" /> 2. Question Content Engine (Choose Source)
              </h2>
              <p className="text-[11px] font-mono text-[#69786F]">
                Load segregated questions by topic, generate custom questions via AI, or upload image / PDF documents.
              </p>
            </div>

            {/* Mode Switcher Tabs */}
            <div className="flex items-center space-x-1 bg-[#111B17] p-1 rounded-[6px] border border-[rgba(160,190,170,0.14)] self-start sm:self-auto">
              <button
                type="button"
                onClick={() => setActiveTab("bank")}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "bank"
                    ? "bg-[#65F59A] text-[#070B0A] shadow-[0_0_10px_rgba(101,245,154,0.3)]"
                    : "text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Topic Question Bank ({ALL_DEFAULT_QUESTIONS.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("ai")}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "ai"
                    ? "bg-[#65F59A] text-[#070B0A] shadow-[0_0_10px_rgba(101,245,154,0.3)]"
                    : "text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Quizmaker</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("file")}
                className={`px-3 py-1.5 rounded-[4px] text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                  activeTab === "file"
                    ? "bg-[#65F59A] text-[#070B0A] shadow-[0_0_10px_rgba(101,245,154,0.3)]"
                    : "text-[#A0AEA5] hover:text-[#F2F7F3]"
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Add Image / PDF</span>
              </button>
            </div>
          </div>

          {/* TAB 1: SEGREGATED QUESTION BANK */}
          {activeTab === "bank" && (
            <div className="space-y-5">
              {/* Filter Controls Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#111B17] p-4 rounded-xl border border-[rgba(160,190,170,0.12)]">
                {/* Subject Selector */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                    Filter by Subject ({allSubjects.length})
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => {
                      setSelectedSubject(e.target.value);
                      setSelectedTopic("All Topics");
                    }}
                    className="w-full h-9 rounded-[4px] border border-[rgba(160,190,170,0.2)] bg-[#0C1210] px-2.5 text-xs font-mono text-[#F2F7F3] focus:border-[#65F59A] focus:outline-none"
                  >
                    {allSubjects.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Topic Selector */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                    Filter by Segregated Topic ({availableTopics.length})
                  </label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="w-full h-9 rounded-[4px] border border-[rgba(160,190,170,0.2)] bg-[#0C1210] px-2.5 text-xs font-mono text-[#F2F7F3] focus:border-[#65F59A] focus:outline-none"
                  >
                    {availableTopics.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Keyword Search */}
                <div className="sm:col-span-4">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-[#69786F] mb-1">
                    Search Question Stems
                  </label>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-[#69786F]" />
                    <Input
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="e.g. quantum, constitution, benzene..."
                      className="pl-8 h-9 text-xs font-mono bg-[#0C1210] border-[rgba(160,190,170,0.2)] rounded-[4px]"
                    />
                  </div>
                </div>
              </div>

              {/* Batch Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
                <span className="text-[#A0AEA5]">
                  Showing <strong className="text-[#65F59A]">{filteredBankQuestions.length}</strong> matching questions in{" "}
                  <strong className="text-[#F2F7F3]">{selectedTopic}</strong>
                </span>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddRandomFromTopic(5)}
                    className="h-8 text-xs font-mono border-[rgba(160,190,170,0.2)] bg-[#111B17] hover:bg-[#17251E] text-[#38D9B0]"
                  >
                    <Plus className="w-3.5 h-3.5 mr-1" /> Quick Pick 5 Questions
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddAllFiltered}
                    className="h-8 text-xs font-mono font-bold bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Add All ({filteredBankQuestions.length}) to Queue
                  </Button>
                </div>
              </div>

              {/* Scrollable Question Cards List */}
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {filteredBankQuestions.length === 0 ? (
                  <div className="p-8 text-center text-xs font-mono text-[#69786F] border border-dashed border-[rgba(160,190,170,0.15)] rounded-xl">
                    No questions found matching your filter criteria. Try selecting another topic or clear search.
                  </div>
                ) : (
                  filteredBankQuestions.slice(0, 50).map((q) => {
                    const isSelected = selectedQuestions.some((item) => item.id === q.id);

                    return (
                      <div
                        key={q.id}
                        onClick={() => handleToggleQuestionInQueue(q)}
                        className={`p-4 rounded-xl border text-xs font-mono transition-all cursor-pointer ${
                          isSelected
                            ? "bg-[#17251E] border-[#65F59A] shadow-[0_0_12px_rgba(101,245,154,0.15)]"
                            : "bg-[#111B17] border-[rgba(160,190,170,0.12)] hover:border-[rgba(160,190,170,0.3)] text-[#A0AEA5]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-1.5 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`w-4 h-4 rounded-[3px] border flex items-center justify-center ${
                                  isSelected
                                    ? "bg-[#65F59A] border-[#65F59A] text-[#070B0A]"
                                    : "border-[rgba(160,190,170,0.3)]"
                                }`}
                              >
                                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                              </span>
                              <span className="text-[10px] uppercase font-bold text-[#38D9B0] bg-[#070B0A] px-2 py-0.5 rounded-[3px] border border-[rgba(160,190,170,0.14)]">
                                {q.subject}
                              </span>
                              <span className="text-[10px] text-[#A0AEA5] bg-[#070B0A] px-2 py-0.5 rounded-[3px] border border-[rgba(160,190,170,0.08)]">
                                {q.topic}
                              </span>
                              <span
                                className={`text-[9px] uppercase px-2 py-0.5 rounded-[3px] font-bold ${
                                  q.difficulty === "Hard"
                                    ? "bg-[#F87171]/20 text-[#F87171]"
                                    : q.difficulty === "Medium"
                                    ? "bg-[#FFE600]/20 text-[#FFE600]"
                                    : "bg-[#65F59A]/20 text-[#65F59A]"
                                }`}
                              >
                                {q.difficulty}
                              </span>
                              <span className="text-[10px] text-[#69786F]">+{q.marks || 4} Marks</span>
                            </div>

                            <p className="font-sans font-semibold text-sm text-[#F2F7F3] leading-snug pt-1">
                              {q.title}
                            </p>

                            {/* Options Preview */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                              {q.options?.map((opt, i) => (
                                <div
                                  key={opt.id || i}
                                  className={`p-2 rounded-[4px] border text-[11px] truncate ${
                                    opt.isCorrect
                                      ? "border-[#65F59A]/40 bg-[#17251E] text-[#65F59A] font-bold"
                                      : "border-[rgba(160,190,170,0.08)] bg-[#0C1210] text-[#A0AEA5]"
                                  }`}
                                >
                                  <span className="mr-1.5 opacity-60 font-bold">{String.fromCharCode(65 + i)}.</span>
                                  <span>{opt.text}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Button
                            type="button"
                            size="sm"
                            variant="ghost"
                            className="shrink-0 text-xs font-mono"
                          >
                            {isSelected ? (
                              <span className="text-[#F87171] hover:underline font-bold">Remove</span>
                            ) : (
                              <span className="text-[#65F59A] hover:underline font-bold">+ Add</span>
                            )}
                          </Button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 2: AI QUIZMAKER (PROMPT TO QUESTIONS) */}
          {activeTab === "ai" && (
            <div className="space-y-5 bg-[#111B17] p-5 rounded-xl border border-[rgba(160,190,170,0.14)]">
              <div className="border-b border-[rgba(160,190,170,0.1)] pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#65F59A] flex items-center gap-2">
                  <Sparkles className="w-4 h-4 fill-current" /> AI Arena Question Generator
                </h3>
                <p className="text-[11px] font-mono text-[#A0AEA5] mt-1">
                  Synthesize verified, curriculum-grounded questions with distractor analysis on any topic instantly.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
                <div className="sm:col-span-6">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1">
                    Topic / Concept Prompt
                  </label>
                  <Input
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. Thermodynamics, Mitosis, Tamil Sangam Era..."
                    className="h-10 text-xs font-mono bg-[#0C1210] border-[rgba(160,190,170,0.2)] rounded-[4px]"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1">
                    Subject Domain
                  </label>
                  <select
                    value={aiSubject}
                    onChange={(e) => setAiSubject(e.target.value)}
                    className="w-full h-10 rounded-[4px] border border-[rgba(160,190,170,0.2)] bg-[#0C1210] px-2.5 text-xs font-mono text-[#F2F7F3] focus:border-[#65F59A] focus:outline-none"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Science & Technology">Science &amp; Technology</option>
                    <option value="Health & Biology">Health &amp; Biology</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Civics & Governance">Civics &amp; Governance</option>
                    <option value="Regional Studies">Tamil Nadu &amp; Kerala Studies</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5] mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={aiDifficulty}
                    onChange={(e) => setAiDifficulty(e.target.value as DifficultyLevel)}
                    className="w-full h-10 rounded-[4px] border border-[rgba(160,190,170,0.2)] bg-[#0C1210] px-2.5 text-xs font-mono text-[#F2F7F3] focus:border-[#65F59A] focus:outline-none"
                  >
                    <option value="Easy">Easy (Fundamentals)</option>
                    <option value="Medium">Medium (Application)</option>
                    <option value="Hard">Hard (Olympiad Challenge)</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#A0AEA5]">
                  <span>Generate:</span>
                  {[3, 5, 8, 10].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setAiCount(num)}
                      className={`w-7 h-7 rounded-[4px] border font-bold text-xs ${
                        aiCount === num
                          ? "bg-[#65F59A] text-[#070B0A] border-[#65F59A]"
                          : "border-[rgba(160,190,170,0.2)] bg-[#0C1210] text-[#A0AEA5]"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  <span>Questions</span>
                </div>

                <Button
                  type="button"
                  disabled={isGeneratingAi}
                  onClick={handleGenerateAiQuestions}
                  className="bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 px-5 shadow-[0_0_15px_rgba(101,245,154,0.2)]"
                >
                  {isGeneratingAi ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                      <span>Synthesizing Questions...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 mr-1.5 fill-current" />
                      <span>Generate with AI</span>
                    </>
                  )}
                </Button>
              </div>

              {/* AI Generated Preview Deck */}
              {aiGeneratedList.length > 0 && (
                <div className="pt-4 border-t border-[rgba(160,190,170,0.12)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#65F59A]">
                      ✓ {aiGeneratedList.length} Questions Synthesized &amp; Validated
                    </span>
                    <Button
                      type="button"
                      size="sm"
                      onClick={handleAddAllAiGeneratedToQueue}
                      className="bg-[#38D9B0] hover:bg-[#2EC49E] text-[#070B0A] font-mono text-xs font-bold rounded-[4px] h-8"
                    >
                      <Plus className="w-3.5 h-3.5 mr-1" /> Add All to Arena Queue
                    </Button>
                  </div>

                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {aiGeneratedList.map((q, idx) => (
                      <div
                        key={q.id}
                        className="p-3 bg-[#0C1210] rounded-lg border border-[rgba(160,190,170,0.14)] text-xs font-mono space-y-1.5"
                      >
                        <div className="flex items-center justify-between text-[10px] text-[#38D9B0]">
                          <span>AI Question #{idx + 1}</span>
                          <span className="text-[#A0AEA5]">{q.difficulty} • +{q.marks} pts</span>
                        </div>
                        <p className="font-sans font-semibold text-[#F2F7F3] text-xs">{q.title}</p>
                        <p className="text-[10px] text-[#A0AEA5] italic font-sans">{q.explanation}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: ADD IMAGE OR PDF (AI DOCUMENT EXTRACTOR) */}
          {activeTab === "file" && (
            <div className="space-y-5 bg-[#111B17] p-5 rounded-xl border border-[rgba(160,190,170,0.14)]">
              <div className="border-b border-[rgba(160,190,170,0.1)] pb-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#65F59A] flex items-center gap-2">
                  <Upload className="w-4 h-4 text-[#65F59A]" /> Document &amp; Image Question Extractor
                </h3>
                <p className="text-[11px] font-mono text-[#A0AEA5] mt-1">
                  Upload a PDF question paper, curriculum document, or problem diagram image (.pdf, .png, .jpg, .webp).
                </p>
              </div>

              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="p-8 border-2 border-dashed border-[rgba(160,190,170,0.25)] hover:border-[#65F59A]/60 rounded-xl bg-[#0C1210] text-center cursor-pointer transition-all space-y-3 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.webp,.txt,.md"
                  onChange={handleFileSelect}
                  className="hidden"
                />

                <div className="w-12 h-12 rounded-full bg-[#111B17] border border-[rgba(160,190,170,0.15)] group-hover:border-[#65F59A]/50 flex items-center justify-center mx-auto text-[#65F59A]">
                  {selectedFile ? (
                    <FileText className="w-6 h-6" />
                  ) : (
                    <Upload className="w-6 h-6" />
                  )}
                </div>

                <div>
                  {selectedFile ? (
                    <div>
                      <p className="font-mono text-xs font-bold text-[#65F59A]">{selectedFile.name}</p>
                      <p className="font-mono text-[10px] text-[#A0AEA5] mt-0.5">
                        {(selectedFile.size / 1024).toFixed(1)} KB • Ready for extraction
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="font-mono text-xs font-bold text-[#F2F7F3]">
                        Click to Browse or Drag Document / Image Here
                      </p>
                      <p className="font-mono text-[10px] text-[#69786F] mt-1">
                        Supports PDF files, handwritten or printed problem photos, and textbook screenshots
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              {selectedFile && (
                <div className="flex justify-end gap-3 pt-1">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFile(null)}
                    className="text-xs font-mono rounded-[4px] border-[rgba(160,190,170,0.2)] bg-[#0C1210] text-[#A0AEA5]"
                  >
                    Clear File
                  </Button>
                  <Button
                    type="button"
                    disabled={isExtractingFile}
                    onClick={handleExtractFileToQuestions}
                    className="bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 px-5 shadow-[0_0_15px_rgba(101,245,154,0.25)]"
                  >
                    {isExtractingFile ? (
                      <>
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                        <span>Parsing Document Questions...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 mr-1.5 fill-current" />
                        <span>Extract &amp; Add Questions to Arena</span>
                      </>
                    )}
                  </Button>
                </div>
              )}

              {extractedSummary && (
                <div className="p-3 bg-[#17251E] rounded-lg border border-[#65F59A]/30 text-xs font-mono text-[#65F59A] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{extractedSummary}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* SECTION 3: Live Arena Question Queue (Active Delivery Deck) */}
        <div className="bg-[#0C1210] p-6 rounded-2xl border border-[rgba(160,190,170,0.16)] shadow-lg space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[rgba(160,190,170,0.12)] gap-3">
            <div>
              <h2 className="font-mono text-xs font-bold uppercase tracking-wider text-[#65F59A] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 fill-current" /> 3. Live Arena Delivery Queue ({selectedQuestions.length} Questions)
              </h2>
              <p className="text-[11px] font-mono text-[#69786F]">
                These questions will be broadcast sequentially to all contenders during the competition.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#38D9B0] bg-[#111B17] px-3 py-1 rounded-full border border-[rgba(160,190,170,0.14)]">
                Total Marks: {selectedQuestions.reduce((acc, q) => acc + (q.marks || 4), 0)} pts
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedQuestions([])}
                className="text-xs font-mono text-[#F87171] hover:underline"
              >
                Clear Queue
              </Button>
            </div>
          </div>

          {selectedQuestions.length === 0 ? (
            <div className="p-8 text-center text-xs font-mono text-[#69786F] border border-dashed border-[rgba(160,190,170,0.15)] rounded-xl space-y-2">
              <p className="text-[#A0AEA5] font-bold">No questions loaded in queue yet.</p>
              <p>Pick questions from the Topic Bank, generate with AI Quizmaker, or upload a document.</p>
            </div>
          ) : (
            <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
              {selectedQuestions.map((q, idx) => (
                <div
                  key={`${q.id}-${idx}`}
                  className="p-3 bg-[#111B17] rounded-lg border border-[rgba(160,190,170,0.14)] flex items-center justify-between gap-3 text-xs font-mono"
                >
                  <div className="flex items-center space-x-3 truncate">
                    <span className="w-6 h-6 rounded-[3px] bg-[#17251E] text-[#65F59A] font-bold flex items-center justify-center shrink-0 border border-[rgba(101,245,154,0.2)]">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <p className="font-sans font-semibold text-[#F2F7F3] truncate text-xs">{q.title}</p>
                      <div className="flex items-center gap-2 text-[10px] text-[#A0AEA5]">
                        <span>{q.subject || "Science"}</span>
                        <span>•</span>
                        <span>{q.topic || "Core"}</span>
                        <span>•</span>
                        <span className="text-[#38D9B0]">+{q.marks || 4} Marks</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1 shrink-0">
                    <button
                      type="button"
                      disabled={idx === 0}
                      onClick={() => handleMoveQueueItem(idx, "up")}
                      className="p-1 text-[#A0AEA5] hover:text-[#65F59A] disabled:opacity-30"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={idx === selectedQuestions.length - 1}
                      onClick={() => handleMoveQueueItem(idx, "down")}
                      className="p-1 text-[#A0AEA5] hover:text-[#65F59A] disabled:opacity-30"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveFromQueue(idx)}
                      className="p-1 text-[#F87171] hover:text-[#F87171]/80 ml-1"
                      title="Remove Question"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 4: Final Submit & Launch Control */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Link href="/dashboard/competitions">
            <Button
              type="button"
              variant="outline"
              className="text-xs font-mono border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] rounded-[4px] h-10 px-6"
            >
              Cancel
            </Button>
          </Link>

          <Button
            type="submit"
            disabled={isSubmitting || selectedQuestions.length === 0}
            className="w-full sm:w-auto bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-11 px-8 shadow-[0_0_20px_rgba(101,245,154,0.3)] transition-all flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-4 h-4 mr-1.5 animate-spin" />
                <span>Launching Arena Session...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-current mr-1" />
                <span>Launch Live Arena ({selectedQuestions.length} Questions)</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
