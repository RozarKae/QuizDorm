"use client";

import React, { useState } from "react";
import { QuestionItem, QuestionType, QuestionOption, MatchPair, SequenceItem } from "@/lib/types/question";
import { QuestionTypeBadge } from "./QuestionTypeBadge";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Trash2,
  CheckCircle2,
  Eye,
  Save,
  HelpCircle,
  Tag as TagIcon,
  ArrowUpDown,
  ListOrdered,
  Layers,
  Sparkles,
  Smartphone,
  Monitor,
} from "lucide-react";
import { toast } from "sonner";

interface QuestionEditorProps {
  initialQuestion?: Partial<QuestionItem>;
  onSave?: (question: QuestionItem) => void;
}

export function QuestionEditor({ initialQuestion, onSave }: QuestionEditorProps) {
  const [title, setTitle] = useState(initialQuestion?.title || "");
  const [description, setDescription] = useState(initialQuestion?.description || "");
  const [type, setType] = useState<QuestionType>(initialQuestion?.type || "mcq_single");
  const [subject, setSubject] = useState(initialQuestion?.subject || "Mathematics");
  const [category, setCategory] = useState(initialQuestion?.category || "Algebra");
  const [topic, setTopic] = useState(initialQuestion?.topic || "Calculus");
  const [subtopic, setSubtopic] = useState(initialQuestion?.subtopic || "");
  const [difficulty, setDifficulty] = useState(initialQuestion?.difficulty || "Medium");
  const [marks, setMarks] = useState(initialQuestion?.marks || 4);
  const [timeLimit, setTimeLimit] = useState(initialQuestion?.timeLimitSeconds || 60);
  const [questionImage, setQuestionImage] = useState(initialQuestion?.image || "");
  const [explanation, setExplanation] = useState(initialQuestion?.explanation || "");
  const [hints, setHints] = useState<string[]>(initialQuestion?.hints || ["Recall power rule for derivatives"]);
  const [newHint, setNewHint] = useState("");
  const [tags, setTags] = useState<string[]>(initialQuestion?.tags || ["calculus", "derivatives", "grade12"]);
  const [newTag, setNewTag] = useState("");

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

  const [sequenceItems, setSequenceItems] = useState<SequenceItem[]>(
    initialQuestion?.sequenceItems || [
      { id: "s1", text: "Identify the function f(x)", order: 1 },
      { id: "s2", text: "Apply power rule term by term", order: 2 },
      { id: "s3", text: "Combine like terms and simplify", order: 3 },
    ]
  );

  // Live Student Preview Controls
  const [previewDevice, setPreviewDevice] = useState<"desktop" | "mobile">("desktop");
  const [showAnswerKey, setShowAnswerKey] = useState(true);

  // Handlers for Tag management
  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag));
  };

  // Handlers for Hint management
  const handleAddHint = () => {
    if (newHint && !hints.includes(newHint.trim())) {
      setHints([...hints, newHint.trim()]);
      setNewHint("");
    }
  };

  const handleRemoveHint = (idx: number) => {
    setHints(hints.filter((_, i) => i !== idx));
  };

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

  // Matching pair handlers
  const handleAddPair = () => {
    const newId = `p-${Date.now()}`;
    setMatchPairs([...matchPairs, { id: newId, leftItem: "Left Term", rightItem: "Right Term" }]);
  };

  const handleRemovePair = (id: string) => {
    setMatchPairs(matchPairs.filter((p) => p.id !== id));
  };

  // Sequence ordering handlers
  const handleAddSequenceItem = () => {
    const newId = `s-${Date.now()}`;
    setSequenceItems([...sequenceItems, { id: newId, text: `Step ${sequenceItems.length + 1}`, order: sequenceItems.length + 1 }]);
  };

  const handleMoveSequence = (index: number, direction: "up" | "down") => {
    const newSeq = [...sequenceItems];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newSeq.length) return;
    const temp = newSeq[index];
    newSeq[index] = newSeq[targetIdx];
    newSeq[targetIdx] = temp;
    setSequenceItems(newSeq);
  };

  // Save handler
  const handleSave = () => {
    if (!title) {
      toast.error("Please enter a question title");
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
      subtopic,
      difficulty,
      marks: Number(marks),
      timeLimitSeconds: Number(timeLimit),
      image: questionImage,
      explanation,
      hints,
      tags,
      options,
      matchingPairs: matchPairs,
      sequenceItems: sequenceItems,
      fillBlanks: fillBlanks,
      createdAt: initialQuestion?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (onSave) onSave(questionData);
    toast.success("Question saved successfully!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <HelpCircle className="w-6 h-6 text-indigo-600 mr-2" /> Question Creator
          </h1>
          <p className="text-sm text-gray-500">Configure questions with live student exam preview</p>
        </div>
        <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl text-sm">
          <Save className="w-4 h-4 mr-2" /> Save Question
        </Button>
      </div>

      {/* Main Grid: Form vs Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Editor Form Column */}
        <div className="lg:col-span-7 bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          {/* Question Type Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1.5">
              Select Question Format
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
              ]}
              className="font-medium"
            />
          </div>

          {/* Taxonomy Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Subject</label>
              <Select value={subject} onChange={(e) => setSubject(e.target.value)} options={[{ value: "Mathematics", label: "Mathematics" }, { value: "Science", label: "Science" }, { value: "Computer Science", label: "Computer Science" }]} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Category</label>
              <Select value={category} onChange={(e) => setCategory(e.target.value)} options={[{ value: "Algebra", label: "Algebra" }, { value: "Physics", label: "Physics" }, { value: "Algorithms", label: "Algorithms" }]} />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Difficulty</label>
              <Select value={difficulty} onChange={(e) => setDifficulty(e.target.value as any)} options={[{ value: "Easy", label: "Easy" }, { value: "Medium", label: "Medium" }, { value: "Hard", label: "Hard" }]} />
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

          {/* Title & Description */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Question Statement</label>
            <textarea
              rows={3}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. What is the derivative of f(x) = x^3 + 4x^2 - 5x + 7?"
              className="w-full rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 text-sm font-medium focus-visible:ring-2 focus-visible:ring-indigo-600 text-gray-900 dark:text-gray-100"
            />
          </div>

          {/* Question Attachment Dropzone */}
          <ImageDropzone label="Main Question Image (Optional)" value={questionImage} onChange={setQuestionImage} />

          {/* DYNAMIC OPTION BUILDERS BASED ON QUESTION TYPE */}

          {/* 1 & 2 & 7: MCQ Single / MCQ Multiple / Image Based */}
          {(type === "mcq_single" || type === "mcq_multiple" || type === "image_based") && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">
                  {type === "mcq_multiple" ? "Options (Check all correct answers)" : "Options (Mark radio for correct answer)"}
                </label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddOption} className="text-xs h-8">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Option
                </Button>
              </div>

              {options.map((opt, idx) => (
                <div
                  key={opt.id}
                  className={`flex flex-col space-y-2 p-3 rounded-2xl border transition-all ${
                    opt.isCorrect ? "border-emerald-500 bg-emerald-50/30 dark:bg-emerald-950/20" : "border-gray-200 dark:border-gray-800"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type={type === "mcq_multiple" ? "checkbox" : "radio"}
                      name="correctChoice"
                      checked={opt.isCorrect || false}
                      onChange={() => handleSetCorrectOption(opt.id)}
                      className="w-4 h-4 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-gray-400 w-5">#{idx + 1}</span>
                    <Input
                      value={opt.text}
                      onChange={(e) =>
                        setOptions(options.map((o) => (o.id === opt.id ? { ...o, text: e.target.value } : o)))
                      }
                      placeholder={`Option ${idx + 1} text`}
                      className="flex-1 h-9 text-sm"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveOption(opt.id)} className="h-8 w-8 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  {type === "image_based" && (
                    <ImageDropzone label={`Option ${idx + 1} Image`} value={opt.image} onChange={(url) => setOptions(options.map((o) => (o.id === opt.id ? { ...o, image: url } : o)))} />
                  )}
                </div>
              ))}
            </div>
          )}

          {/* 3: True / False */}
          {type === "true_false" && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Correct Answer</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setTrueFalseCorrect(true)}
                  className={`p-4 rounded-2xl border font-bold text-sm transition-all ${
                    trueFalseCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "border-gray-200 dark:border-gray-800 text-gray-600"
                  }`}
                >
                  TRUE
                </button>
                <button
                  type="button"
                  onClick={() => setTrueFalseCorrect(false)}
                  className={`p-4 rounded-2xl border font-bold text-sm transition-all ${
                    !trueFalseCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "border-gray-200 dark:border-gray-800 text-gray-600"
                  }`}
                >
                  FALSE
                </button>
              </div>
            </div>
          )}

          {/* 4: Fill in the Blank */}
          {type === "fill_in_the_blank" && (
            <div className="space-y-3 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Accepted Correct Keywords / Answers</label>
              <div className="flex space-x-2">
                <Input value={newBlank} onChange={(e) => setNewBlank(e.target.value)} placeholder="e.g. differentiation" className="text-xs" />
                <Button
                  type="button"
                  onClick={() => {
                    if (newBlank) {
                      setFillBlanks([...fillBlanks, newBlank.trim()]);
                      setNewBlank("");
                    }
                  }}
                  size="sm"
                  className="bg-indigo-600 text-white shrink-0"
                >
                  Add Blank Keyword
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {fillBlanks.map((b, i) => (
                  <Badge key={i} className="bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 px-3 py-1 text-xs">
                    {b}
                    <button type="button" onClick={() => setFillBlanks(fillBlanks.filter((_, idx) => idx !== i))} className="ml-1 text-red-500 font-bold">×</button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* 5: Match the Following */}
          {type === "match_following" && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Matching Pairs (Left Item ➔ Right Item)</label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddPair} className="text-xs h-8">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Pair
                </Button>
              </div>
              {matchPairs.map((pair, idx) => (
                <div key={pair.id} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-2xl border border-gray-200 dark:border-gray-800 items-center">
                  <Input
                    value={pair.leftItem}
                    onChange={(e) => setMatchPairs(matchPairs.map((p) => (p.id === pair.id ? { ...p, leftItem: e.target.value } : p)))}
                    placeholder={`Left Item ${idx + 1}`}
                    className="text-xs"
                  />
                  <div className="flex items-center space-x-2">
                    <Input
                      value={pair.rightItem}
                      onChange={(e) => setMatchPairs(matchPairs.map((p) => (p.id === pair.id ? { ...p, rightItem: e.target.value } : p)))}
                      placeholder={`Right Item ${idx + 1}`}
                      className="text-xs flex-1"
                    />
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleRemovePair(pair.id)} className="h-8 w-8 text-red-500">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 6: Sequence Ordering */}
          {type === "sequence_ordering" && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400">Sequence Order (In correct sequence from top to bottom)</label>
                <Button type="button" variant="outline" size="sm" onClick={handleAddSequenceItem} className="text-xs h-8">
                  <Plus className="w-3.5 h-3.5 mr-1" /> Add Step
                </Button>
              </div>
              {sequenceItems.map((seq, idx) => (
                <div key={seq.id} className="flex items-center space-x-3 p-3 rounded-2xl border border-gray-200 dark:border-gray-800">
                  <span className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <Input
                    value={seq.text}
                    onChange={(e) => setSequenceItems(sequenceItems.map((s) => (s.id === seq.id ? { ...s, text: e.target.value } : s)))}
                    className="flex-1 text-xs"
                  />
                  <div className="flex items-center space-x-1">
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveSequence(idx, "up")} disabled={idx === 0} className="h-7 w-7 text-gray-400">▲</Button>
                    <Button type="button" variant="ghost" size="icon" onClick={() => handleMoveSequence(idx, "down")} disabled={idx === sequenceItems.length - 1} className="h-7 w-7 text-gray-400">▼</Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Hints & Tags */}
          <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-900">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Tags</label>
              <div className="flex space-x-2 mb-2">
                <Input value={newTag} onChange={(e) => setNewTag(e.target.value)} placeholder="Add a tag (e.g. calculus)" className="text-xs" />
                <Button type="button" onClick={handleAddTag} size="sm" className="bg-indigo-600 text-white">Add</Button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {tags.map((t, i) => (
                  <Badge key={i} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs">
                    #{t}
                    <button type="button" onClick={() => handleRemoveTag(t)} className="ml-1 text-red-500 font-bold">×</button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Explanation / Solution Notes</label>
              <textarea
                rows={2}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Detailed solution steps displayed after submission..."
                className="w-full rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-3 text-xs text-gray-900 dark:text-gray-100"
              />
            </div>
          </div>
        </div>

        {/* Live Student Exam Preview Column */}
        <div className="lg:col-span-5 space-y-4 sticky top-24">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center">
              <Eye className="w-4 h-4 mr-1.5" /> Live Student Exam Preview
            </span>
            <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-900 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setPreviewDevice("desktop")}
                className={`p-1.5 rounded-lg transition-all ${previewDevice === "desktop" ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-400"}`}
                title="Desktop View"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setPreviewDevice("mobile")}
                className={`p-1.5 rounded-lg transition-all ${previewDevice === "mobile" ? "bg-white dark:bg-gray-800 shadow-sm text-indigo-600" : "text-gray-400"}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div
            className={`bg-white dark:bg-gray-950 p-6 rounded-3xl border-2 border-indigo-100 dark:border-indigo-900/50 shadow-xl space-y-6 mx-auto transition-all ${
              previewDevice === "mobile" ? "max-w-xs" : "w-full"
            }`}
          >
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-900 text-xs">
              <span className="font-semibold text-gray-500">Question 1 of 10</span>
              <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                {difficulty}
              </Badge>
            </div>

            <div>
              <h4 className="text-base font-bold text-gray-900 dark:text-white leading-relaxed">
                {title || "Question statement preview..."}
              </h4>
              {questionImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={questionImage} alt="Question Diagram" className="mt-3 rounded-2xl max-h-40 object-cover mx-auto" />
              )}
            </div>

            {/* MCQ Preview */}
            {(type === "mcq_single" || type === "mcq_multiple" || type === "image_based") && (
              <div className="space-y-2.5">
                {options.map((opt, idx) => (
                  <div
                    key={opt.id}
                    className={`p-3.5 rounded-2xl border text-xs font-medium flex items-center justify-between transition-all ${
                      opt.isCorrect && showAnswerKey
                        ? "border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold"
                        : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt.text || `Option ${idx + 1}`}</span>
                    </div>
                    {opt.isCorrect && showAnswerKey && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                  </div>
                ))}
              </div>
            )}

            {/* True False Preview */}
            {type === "true_false" && (
              <div className="grid grid-cols-2 gap-3">
                <div className={`p-3 rounded-2xl border text-center text-xs font-bold ${trueFalseCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200"}`}>TRUE</div>
                <div className={`p-3 rounded-2xl border text-center text-xs font-bold ${!trueFalseCorrect ? "border-emerald-500 bg-emerald-50 text-emerald-700" : "border-gray-200"}`}>FALSE</div>
              </div>
            )}

            {/* Matching Preview */}
            {type === "match_following" && (
              <div className="space-y-2 text-xs">
                {matchPairs.map((p) => (
                  <div key={p.id} className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 flex justify-between">
                    <span className="font-semibold">{p.leftItem}</span>
                    <span className="text-indigo-600 font-bold">➔ {p.rightItem}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Sequence Preview */}
            {type === "sequence_ordering" && (
              <div className="space-y-2 text-xs">
                {sequenceItems.map((s, i) => (
                  <div key={s.id} className="p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center space-x-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">{i + 1}</span>
                    <span>{s.text}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 text-right">
              <span className="text-[10px] text-gray-400">Interactive Student Exam Simulator</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
