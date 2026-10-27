"use client";

import { Button } from "@/components/ui/button";
import { LMSLesson } from "@/lib/types/lms";
import {
ArrowLeft,
ArrowRight,
CheckCircle2,Circle,
Clock,
Pause,
Play,
Video
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockLessons: LMSLesson[] = [
  { id: "les-1", courseId: "course-101", chapterTitle: "Chapter 1: Foundations of Neural Networks", lessonTitle: "1.1 Introduction to Perceptrons & Activation Functions", lessonType: "Video", durationMinutes: 18, contentBody: "In this lesson, we explore mathematical formulation of single-layer perceptrons, sigmoid vs. ReLU activation functions, and gradient descent optimization.", isCompleted: true, orderIndex: 1 },
  { id: "les-2", courseId: "course-101", chapterTitle: "Chapter 1: Foundations of Neural Networks", lessonTitle: "1.2 Backpropagation & Chain Rule Derivation", lessonType: "Video", durationMinutes: 24, contentBody: "We derive weight updating equations using partial derivatives and loss function gradients across multi-layer feedforward networks.", isCompleted: true, orderIndex: 2 },
  { id: "les-3", courseId: "course-101", chapterTitle: "Chapter 2: Transformer Architectures", lessonTitle: "2.1 Scaled Dot-Product Self-Attention Mechanism", lessonType: "Interactive", durationMinutes: 30, contentBody: "Interactive visualization of Query, Key, Value matrix multiplications and multi-head attention projection heads.", isCompleted: false, orderIndex: 3 },
];

export function LessonStudioPlayer() {
  const [lessons, setLessons] = useState<LMSLesson[]>(mockLessons);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const activeLesson = lessons[activeLessonIndex];

  const handleToggleComplete = (id: string) => {
    setLessons((prev) =>
      prev.map((l) => (l.id === id ? { ...l, isCompleted: !l.isCompleted } : l))
    );
    toast.success("Lesson completion progress saved!");
  };

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-white flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center font-bold">
            <Video className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">{activeLesson.chapterTitle}</span>
            <h2 className="font-bold text-base text-white">{activeLesson.lessonTitle}</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleToggleComplete(activeLesson.id)}
            variant={activeLesson.isCompleted ? "default" : "outline"}
            className={`text-xs rounded-xl ${activeLesson.isCompleted ? "bg-rose-600 text-white" : "border-slate-700 text-white"}`}
          >
            <CheckCircle2 className="w-4 h-4 mr-1.5" />
            {activeLesson.isCompleted ? "Completed" : "Mark Complete"}
          </Button>
        </div>
      </div>

      {/* Main Player Grid: Media Stage + Chapters Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-[500px]">
        {/* Media Stage & Content (Cols 3) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 flex flex-col justify-between shadow-sm space-y-6">
          {/* Simulated Video / Interactive Player Box */}
          <div className="w-full h-80 bg-slate-950 rounded-2xl border border-slate-800 relative flex flex-col items-center justify-center overflow-hidden shadow-2xl">
            <div className="w-20 h-20 rounded-full bg-indigo-600/90 hover:scale-110 transition-transform flex items-center justify-center cursor-pointer shadow-2xl" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />}
            </div>

            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/90 backdrop-blur-md p-3 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-white">
              <span className="font-semibold text-slate-300">{activeLesson.lessonTitle}</span>
              <span className="font-mono text-slate-400">{activeLesson.durationMinutes}:00 Mins HD</span>
            </div>
          </div>

          {/* Lesson Rich Content Summary */}
          <div className="space-y-3">
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Lesson Summary & Key Concepts</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              {activeLesson.contentBody}
            </p>
          </div>

          {/* Bottom Player Navigation */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <Button
              disabled={activeLessonIndex === 0}
              onClick={() => setActiveLessonIndex((prev) => prev - 1)}
              variant="outline"
              size="sm"
              className="text-xs rounded-xl"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Previous Lesson
            </Button>

            <Button
              disabled={activeLessonIndex === lessons.length - 1}
              onClick={() => setActiveLessonIndex((prev) => prev + 1)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl"
            >
              Next Lesson <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </div>
        </div>

        {/* Chapters & Topics Navigation Sidebar (Col 1) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 space-y-4 shadow-sm">
          <h4 className="font-bold text-slate-900 dark:text-white text-xs uppercase tracking-wider border-b border-slate-100 dark:border-slate-800 pb-2">
            Curriculum Syllabus
          </h4>

          <div className="space-y-2">
            {lessons.map((les, idx) => (
              <div
                key={les.id}
                onClick={() => setActiveLessonIndex(idx)}
                className={`p-3 rounded-xl border transition-all cursor-pointer space-y-1 ${
                  activeLessonIndex === idx
                    ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500 shadow-sm"
                    : "bg-slate-50/50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/60"
                }`}
              >
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className={`truncate w-44 ${activeLessonIndex === idx ? "text-indigo-600 dark:text-indigo-400 font-bold" : "text-slate-800 dark:text-slate-200"}`}>
                    {les.lessonTitle}
                  </span>
                  {les.isCompleted ? (
                    <CheckCircle2 className="w-4 h-4 text-rose-500 shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                  )}
                </div>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {les.durationMinutes} mins • {les.lessonType}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
