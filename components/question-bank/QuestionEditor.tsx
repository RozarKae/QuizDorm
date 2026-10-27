"use client";

import { RichTextEquationEditor } from "@/components/media/editors/RichTextEquationEditor";
import { DragDropBuilder } from "@/components/media/interactive/DragDropBuilder";
import { HotspotEditor } from "@/components/media/interactive/HotspotEditor";
import { QuestionPreviewModal } from "@/components/media/QuestionPreviewModal";
import { Button } from "@/components/ui/button";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { resolveTopicsForQuestion } from "@/lib/data/taxonomy";
import { CodeQuestionData,DragDropCategory,DragDropItem,HotspotRegion,TimelineEventItem } from "@/lib/types/media";
import { MatchPair,QuestionItem,QuestionOption,QuestionType,SequenceItem } from "@/lib/types/question";
import {
Eye,
HelpCircle,
Plus,
Save,
Trash2
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuestionEditorProps {
  initialQuestion?: Partial<QuestionItem>;
  onSave?: (question: QuestionItem) => void;
}

export function QuestionEditor({ initialQuestion, onSave }: QuestionEditorProps) {
  const [title, setTitle] = useState(initialQuestion?.title || "");
  const [description] = useState(initialQuestion?.description || "");
  const [type, setType] = useState<QuestionType>(initialQuestion?.type || "mcq_single");
  const [subject, setSubject] = useState(initialQuestion?.subject || "Mathematics");
  const [category, setCategory] = useState(initialQuestion?.category || "Algebra");
  const [topic] = useState(initialQuestion?.topic || "Calculus");
  const [subtopic] = useState(initialQuestion?.subtopic || "");
  const [difficulty, setDifficulty] = useState(initialQuestion?.difficulty || "Medium");
  const [marks, setMarks] = useState(initialQuestion?.marks || 4);
  const [timeLimit, setTimeLimit] = useState(initialQuestion?.timeLimitSeconds || 60);
  const [questionImage, setQuestionImage] = useState(initialQuestion?.image || "");
  const [audioUrl, setAudioUrl] = useState(initialQuestion?.audioUrl || "");
  const [videoUrl, setVideoUrl] = useState(initialQuestion?.videoUrl || "");
  const [transcript, setTranscript] = useState(initialQuestion?.transcript || "");
  const [explanation, setExplanation] = useState(initialQuestion?.explanation || "");
  const [hints] = useState<string[]>(initialQuestion?.hints || ["Recall power rule for derivatives"]);
  const [tags] = useState<string[]>(initialQuestion?.tags || ["calculus", "derivatives", "grade12"]);

  // Question Type specific states
  const [options, setOptions] = useState<QuestionOption[]>(
    initialQuestion?.options || [
      { id: "opt-1", text: "3x^2 + 8x - 5", isCorrect: true },
      { id: "opt-2", text: "3x^2 + 4x - 5", isCorrect: false },
      { id: "opt-3", text: "x^2 + 8x - 5", isCorrect: false },
      { id: "opt-4", text: "3x^2 + 8x + 7", isCorrect: false },
    ]
  );

  const [trueFalseCorrect, setTrueFalseCorrect] = useState<boolean>(true);
  const [fillBlanks, setFillBlanks] = useState<string[]>(initialQuestion?.fillBlanks || ["differentiation"]);
  const [newBlank, setNewBlank] = useState("");

  const [matchPairs, setMatchPairs] = useState<MatchPair[]>(
    initialQuestion?.matchingPairs || [
      { id: "p1", leftItem: "d/dx (x^2)", rightItem: "2x" },
      { id: "p2", leftItem: "d/dx (sin x)", rightItem: "cos x" },
      { id: "p3", leftItem: "d/dx (e^x)", rightItem: "e^x" },
    ]
  );

  const [sequenceItems] = useState<SequenceItem[]>(
    initialQuestion?.sequenceItems || [
      { id: "s1", text: "Identify the function f(x)", order: 1 },
      { id: "s2", text: "Apply power rule term by term", order: 2 },
      { id: "s3", text: "Combine like terms and simplify", order: 3 },
    ]
  );

  // Phase 2.2 Interactive Question Type States
  const [hotspotRegions, setHotspotRegions] = useState<HotspotRegion[]>(
    initialQuestion?.hotspotRegions || [
      { id: "h1", label: "Cerebrum", shape: "rectangle", x: 20, y: 15, width: 30, height: 25, isCorrect: true },
      { id: "h2", label: "Cerebellum", shape: "rectangle", x: 55, y: 60, width: 25, height: 25, isCorrect: false },
    ]
  );

  const [dragDropCategories, setDragDropCategories] = useState<DragDropCategory[]>(
    initialQuestion?.dragDropCategories || [
      { id: "c1", name: "Metals" },
      { id: "c2", name: "Non-Metals" },
    ]
  );

  const [dragDropItems, setDragDropItems] = useState<DragDropItem[]>(
    initialQuestion?.dragDropItems || [
      { id: "d1", text: "Copper (Cu)", targetCategoryId: "c1" },
      { id: "d2", text: "Oxygen (O2)", targetCategoryId: "c2" },
      { id: "d3", text: "Gold (Au)", targetCategoryId: "c1" },
    ]
  );

  const [timelineEvents, setTimelineEvents] = useState<TimelineEventItem[]>(
    initialQuestion?.timelineEvents || [
      { id: "t1", title: "Declaration of Independence", dateOrEra: "1776", correctOrder: 1 },
      { id: "t2", title: "US Constitution Ratified", dateOrEra: "1788", correctOrder: 2 },
      { id: "t3", title: "Gettysburg Address", dateOrEra: "1863", correctOrder: 3 },
    ]
  );

  const [codeData, setCodeData] = useState<CodeQuestionData>(
    initialQuestion?.codeData || {
      language: "python",
      initialCode: "def calculate_sum(numbers):\n    total = 0\n    for n in numbers:\n        total += n\n    return total",
      expectedOutput: "calculate_sum([1, 2, 3, 4, 5]) ➔ 15",
    }
  );

  // Live Preview Modal
  const [previewModalOpen, setPreviewModalOpen] = useState(false);

  // Options handlers
  const handleAddOption = () => {
    const newId = `opt-${Date.now()}`;
    setOptions([...options, { id: newId, text: `Option ${options.length + 1}`, isCorrect: false }]);
  };

  const handleRemoveOption = (id: string) => {
    if (options.length <= 2) {
      toast.error("At least 2 options are required.");
      return;
    }
    setOptions(options.filter((o) => o.id !== id));
  };

  const handleSetCorrectOption = (id: string) => {
    if (type === "mcq_single" || type === "image_based") {
      setOptions(options.map((o) => ({ ...o, isCorrect: o.id === id })));
    } else if (type === "mcq_multiple") {
      setOptions(options.map((o) => (o.id === id ? { ...o, isCorrect: !o.isCorrect } : o)));
    }
  };

  // Save handler
  const handleSave = () => {
    if (!title) {
      toast.error("Please enter a question statement");
      return;
    }

    const questionData: QuestionItem = {
      id: initialQuestion?.id || `q-${Date.now()}`,
      title,
      description,
      type,
      subject,
      category,
      topic,
      topics: resolveTopicsForQuestion({ topic, subject, tags }),
      subtopic,
      difficulty,
      marks: Number(marks),
      timeLimitSeconds: Number(timeLimit),
      image: questionImage,
      audioUrl,
      videoUrl,
      transcript,
      explanation,
      hints,
      tags,
      options:
        type === "true_false"
          ? [
              { id: "tf-1", text: "True", isCorrect: trueFalseCorrect },
              { id: "tf-2", text: "False", isCorrect: !trueFalseCorrect },
            ]
          : options,
      matchingPairs: matchPairs,
      sequenceItems,
      fillBlanks,
      hotspotRegions,
      dragDropCategories,
      dragDropItems,
      timelineEvents,
      codeData,
      createdAt: initialQuestion?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (onSave) onSave(questionData);
    toast.success("Question saved successfully into Question Bank!");
  };

  const currentConstructedQuestion: QuestionItem = {
    id: initialQuestion?.id || `q-preview`,
    title: title || "Untitled Question Statement",
    type,
    subject,
    category,
    topic,
    difficulty,
    marks: Number(marks),
    timeLimitSeconds: Number(timeLimit),
    image: questionImage,
    audioUrl,
    videoUrl,
    transcript,
    explanation,
    tags,
    options,
    matchingPairs: matchPairs,
    sequenceItems,
    fillBlanks,
    hotspotRegions,
    dragDropCategories,
    dragDropItems,
    timelineEvents,
    codeData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return (
    <div className="space-y-6">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" /> Multimedia Question Creator
          </h1>
          <p className="text-sm text-gray-500">
            Build text, image, audio, video, hotspot, drag-and-drop & mathematical assessment questions.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setPreviewModalOpen(true)}
            className="text-xs rounded-xl border-gray-200 dark:border-gray-800"
          >
            <Eye className="w-4 h-4 mr-1.5 text-indigo-500" /> Multi-Device Preview
          </Button>

          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl text-xs shadow-sm">
            <Save className="w-4 h-4 mr-1.5" /> Save Question
          </Button>
        </div>
      </div>

      {/* Editor Form Column */}
      <div className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        {/* Question Format Selector */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
            Question Format & Interactive Type
          </label>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value as QuestionType)}
            options={[
              { value: "mcq_single", label: "Multiple Choice (Single Correct)" },
              { value: "mcq_multiple", label: "Multiple Choice (Multiple Correct)" },
              { value: "true_false", label: "True / False" },
              { value: "fill_in_the_blank", label: "Fill in the Blank" },
              { value: "match_following", label: "Match the Following" },
              { value: "sequence_ordering", label: "Sequence Ordering" },
              { value: "image_based", label: "Image Based Choice" },
              { value: "hotspot", label: "Interactive Hotspot (Click Image Target)" },
              { value: "drag_drop_categorize", label: "Drag & Drop Categorization" },
              { value: "diagram_labeling", label: "Diagram Label Pinning" },
              { value: "timeline_ordering", label: "Timeline Event Ordering" },
              { value: "audio_listening", label: "Audio Listening / Dictation" },
              { value: "video_timestamp", label: "Interactive Video Timestamp Quiz" },
              { value: "code_snippet", label: "Code Snippet & Output Question" },
              { value: "interactive_map", label: "Interactive Map Region Question" },
            ]}
            className="font-medium"
          />
        </div>

        {/* Taxonomy Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Subject</label>
            <Select value={subject} onChange={(e) => setSubject(e.target.value)} options={[{ value: "Mathematics", label: "Mathematics" }, { value: "Science", label: "Science" }, { value: "Biology", label: "Biology" }, { value: "Physics", label: "Physics" }, { value: "Computer Science", label: "Computer Science" }]} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Category</label>
            <Select value={category} onChange={(e) => setCategory(e.target.value)} options={[{ value: "Algebra", label: "Algebra" }, { value: "Anatomy", label: "Anatomy" }, { value: "Kinematics", label: "Kinematics" }, { value: "Algorithms", label: "Algorithms" }]} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Difficulty</label>
            <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as QuestionItem["difficulty"])} options={[{ value: "Easy", label: "Easy" }, { value: "Medium", label: "Medium" }, { value: "Hard", label: "Hard" }]} />
          </div>
        </div>

        {/* Marks & Time limit */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Marks</label>
            <Input type="number" value={marks} onChange={(e) => setMarks(Number(e.target.value))} min={1} max={100} />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Time Limit (Sec)</label>
            <Input type="number" value={timeLimit} onChange={(e) => setTimeLimit(Number(e.target.value))} min={10} max={600} />
          </div>
        </div>

        {/* Rich Text & Equation Statement Editor */}
        <RichTextEquationEditor
          value={title}
          onChange={setTitle}
          label="Question Statement & Equation Editor"
        />

        {/* Main Question Image */}
        <ImageDropzone label="Main Question Image / Diagram (Optional)" value={questionImage} onChange={setQuestionImage} />

        {/* Audio / Video attachment settings if listening or video type */}
        {(type === "audio_listening" || type === "video_timestamp") && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
            {type === "audio_listening" && (
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Audio Stream URL</label>
                <Input value={audioUrl} onChange={(e) => setAudioUrl(e.target.value)} placeholder="/audio/placeholders/french-listening.mp3" className="text-xs" />
              </div>
            )}
            {type === "video_timestamp" && (
              <div className="sm:col-span-2">
                <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Video Stream URL</label>
                <Input value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} placeholder="/video/placeholders/pendulum.mp4" className="text-xs" />
              </div>
            )}
            <div className="sm:col-span-2">
              <label className="text-xs font-bold text-gray-700 dark:text-gray-300 block mb-1">Transcript (Optional)</label>
              <textarea value={transcript} onChange={(e) => setTranscript(e.target.value)} rows={2} placeholder="Add spoken transcript for accessibility..." className="w-full text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white" />
            </div>
          </div>
        )}

        {/* SPECIALIZED INTERACTIVE BUILDERS */}
        {type === "hotspot" && (
          <HotspotEditor imageUrl={questionImage} regions={hotspotRegions} onChange={setHotspotRegions} />
        )}

        {type === "drag_drop_categorize" && (
          <DragDropBuilder categories={dragDropCategories} items={dragDropItems} onChange={(c, i) => { setDragDropCategories(c); setDragDropItems(i); }} />
        )}

        {type === "timeline_ordering" && (
          <div className="space-y-3 p-4 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Timeline Events Builder</label>
            {timelineEvents.map((t, idx) => (
              <div key={t.id} className="flex items-center space-x-2">
                <span className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">{idx + 1}</span>
                <Input value={t.title} onChange={(e) => setTimelineEvents(timelineEvents.map((ev) => (ev.id === t.id ? { ...ev, title: e.target.value } : ev)))} className="text-xs flex-1" />
                <Input value={t.dateOrEra || ""} onChange={(e) => setTimelineEvents(timelineEvents.map((ev) => (ev.id === t.id ? { ...ev, dateOrEra: e.target.value } : ev)))} placeholder="Date/Era" className="text-xs w-24" />
              </div>
            ))}
          </div>
        )}

        {type === "code_snippet" && (
          <div className="space-y-3 p-4 bg-gray-50/50 dark:bg-gray-900/40 rounded-2xl border border-gray-200 dark:border-gray-800">
            <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Code Question Setup</label>
            <div>
              <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">Programming Language</label>
              <select value={codeData.language} onChange={(e) => setCodeData({ ...codeData, language: e.target.value })} className="w-full text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 font-mono">
                <option value="python">Python</option>
                <option value="javascript">JavaScript / TypeScript</option>
                <option value="java">Java</option>
                <option value="cpp">C++</option>
              </select>
            </div>
            <div>
              <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">Code Snippet</label>
              <textarea value={codeData.initialCode} onChange={(e) => setCodeData({ ...codeData, initialCode: e.target.value })} rows={5} className="w-full text-xs p-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-slate-950 text-slate-100 font-mono" />
            </div>
          </div>
        )}

        {/* Standard Choice Options for MCQ / True False */}
        {(type === "mcq_single" || type === "mcq_multiple" || type === "image_based") && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Options</label>
              <Button type="button" variant="outline" size="sm" onClick={handleAddOption} className="text-xs h-8">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Option
              </Button>
            </div>
            {options.map((opt, idx) => (
              <div key={opt.id} className="flex items-center space-x-3 p-3 rounded-2xl border border-gray-200 dark:border-gray-800">
                <input type={type === "mcq_multiple" ? "checkbox" : "radio"} name="correctChoice" checked={opt.isCorrect || false} onChange={() => handleSetCorrectOption(opt.id)} className="w-4 h-4 text-rose-600 focus:ring-rose-500 cursor-pointer" />
                <span className="text-xs font-bold text-gray-400 w-5">#{idx + 1}</span>
                <Input value={opt.text} onChange={(e) => setOptions(options.map((o) => (o.id === opt.id ? { ...o, text: e.target.value } : o)))} placeholder={`Option ${idx + 1}`} className="flex-1 h-9 text-sm" />
                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveOption(opt.id)} className="h-8 w-8 text-red-500"><Trash2 className="w-4 h-4" /></Button>
              </div>
            ))}
          </div>
        )}

        {/* True / False Choice Selector */}
        {type === "true_false" && (
          <div className="space-y-3 pt-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 block">
              Designate Correct Answer Key
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setTrueFalseCorrect(true)}
                className={`p-3.5 rounded-2xl border text-xs font-mono font-bold transition-all ${
                  trueFalseCorrect
                    ? "border-rose-500 bg-rose-500/10 text-rose-400 ring-1 ring-rose-500"
                    : "border-gray-200 dark:border-gray-800 text-gray-400 hover:border-gray-400"
                }`}
              >
                TRUE {trueFalseCorrect && "✓"}
              </button>
              <button
                type="button"
                onClick={() => setTrueFalseCorrect(false)}
                className={`p-3.5 rounded-2xl border text-xs font-mono font-bold transition-all ${
                  !trueFalseCorrect
                    ? "border-rose-500 bg-rose-500/10 text-rose-400 ring-1 ring-rose-500"
                    : "border-gray-200 dark:border-gray-800 text-gray-400 hover:border-gray-400"
                }`}
              >
                FALSE {!trueFalseCorrect && "✓"}
              </button>
            </div>
          </div>
        )}

        {/* Fill in the Blank Editor */}
        {type === "fill_in_the_blank" && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Accepted Blank Answers (Keywords)
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  if (newBlank.trim()) {
                    setFillBlanks([...fillBlanks, newBlank.trim()]);
                    setNewBlank("");
                  }
                }}
                className="text-xs h-8"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Accepted Word
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                value={newBlank}
                onChange={(e) => setNewBlank(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newBlank.trim()) {
                    e.preventDefault();
                    setFillBlanks([...fillBlanks, newBlank.trim()]);
                    setNewBlank("");
                  }
                }}
                placeholder="Enter accepted answer and press Add..."
                className="text-xs h-9"
              />
            </div>
            <div className="space-y-2">
              {fillBlanks.map((blank, bIdx) => (
                <div key={bIdx} className="flex items-center justify-between p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50 text-xs font-mono">
                  <span>{blank}</span>
                  <button
                    type="button"
                    onClick={() => setFillBlanks(fillBlanks.filter((_, i) => i !== bIdx))}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Match the Following Editor */}
        {type === "match_following" && (
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                Matching Pairs (Left Item ➔ Right Counterpart)
              </label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPair: MatchPair = {
                    id: `p-${Date.now()}`,
                    leftItem: `Item ${matchPairs.length + 1}`,
                    rightItem: `Match ${matchPairs.length + 1}`,
                  };
                  setMatchPairs([...matchPairs, newPair]);
                }}
                className="text-xs h-8"
              >
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Match Pair
              </Button>
            </div>
            <div className="space-y-2">
              {matchPairs.map((pair, pIdx) => (
                <div key={pair.id || pIdx} className="flex items-center space-x-2 p-2.5 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <span className="w-5 text-[10px] font-bold text-gray-400 font-mono">#{pIdx + 1}</span>
                  <Input
                    value={pair.leftItem}
                    onChange={(e) =>
                      setMatchPairs(
                        matchPairs.map((p, i) => (i === pIdx ? { ...p, leftItem: e.target.value } : p))
                      )
                    }
                    placeholder="Left premise..."
                    className="flex-1 text-xs h-9"
                  />
                  <span className="text-indigo-600 font-bold text-xs">➔</span>
                  <Input
                    value={pair.rightItem}
                    onChange={(e) =>
                      setMatchPairs(
                        matchPairs.map((p, i) => (i === pIdx ? { ...p, rightItem: e.target.value } : p))
                      )
                    }
                    placeholder="Right counterpart..."
                    className="flex-1 text-xs h-9"
                  />
                  <button
                    type="button"
                    onClick={() => setMatchPairs(matchPairs.filter((_, i) => i !== pIdx))}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Explanation */}
        <div className="pt-4 border-t border-gray-100 dark:border-gray-900 space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Solution Explanation / Hints</label>
          <textarea rows={2} value={explanation} onChange={(e) => setExplanation(e.target.value)} placeholder="Detailed solution steps displayed after submission..." className="w-full rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-3 text-xs text-gray-900 dark:text-gray-100" />
        </div>
      </div>

      {/* Multi Device Live Preview Modal */}
      <QuestionPreviewModal
        question={currentConstructedQuestion}
        open={previewModalOpen}
        onOpenChange={setPreviewModalOpen}
      />
    </div>
  );
}
