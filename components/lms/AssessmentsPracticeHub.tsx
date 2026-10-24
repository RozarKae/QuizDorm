"use client";

import React, { useState } from "react";
import { PracticeExercise } from "@/lib/types/lms";
import { Button } from "@/components/ui/button";
import { 
  FileCode, Sparkles, CheckCircle2, Play, RefreshCw, Award, Code, HelpCircle
} from "lucide-react";
import { toast } from "sonner";

const mockExercises: PracticeExercise[] = [
  {
    id: "ex-1",
    lessonId: "les-1",
    title: "Coding Lab: Implement Sigmoid Activation in Python",
    type: "Coding",
    question: "Write a function `sigmoid(z)` using `numpy` that returns the element-wise sigmoid vector 1 / (1 + exp(-z)).",
    starterCode: "import numpy as np\n\ndef sigmoid(z):\n    # Write code here\n    pass",
    solutionCode: "import numpy as np\n\ndef sigmoid(z):\n    return 1.0 / (1.0 + np.exp(-z))",
    points: 50,
  },
  {
    id: "ex-2",
    lessonId: "les-2",
    title: "Lesson Quiz: Gradient Descent Backpropagation",
    type: "Quiz",
    question: "What is the partial derivative of binary cross-entropy loss L with respect to output activation a?",
    options: ["(a - y) / (a(1 - a))", "a * y", "1 / (1 + e^-z)"],
    correctAnswer: "(a - y) / (a(1 - a))",
    points: 30,
  },
];

export function AssessmentsPracticeHub() {
  const [exercises, setExercises] = useState<PracticeExercise[]>(mockExercises);
  const [activeExIndex, setActiveExIndex] = useState(0);
  const [userCode, setUserCode] = useState(mockExercises[0].starterCode || "");
  const [isExecuting, setIsExecuting] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);

  const activeEx = exercises[activeExIndex];

  const handleRunCode = () => {
    setIsExecuting(true);
    setTimeout(() => {
      setIsExecuting(false);
      setTestOutput("✅ Test Suite Passed! (3/3 test cases passed in 14ms).\nResult: sigmoid([0, 2]) -> [0.5, 0.880797]");
      toast.success("Coding exercise submitted and verified successfully!");
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Interactive Practice & Coding Sandbox
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileCode className="w-6 h-6 text-indigo-600" /> Assessments & Practice Drills
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Validate lesson understanding through live coding exercises, instant quiz feedback, and AI-generated practice challenges.
          </p>
        </div>
      </div>

      {/* Main Sandbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Question & Description */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] font-bold uppercase">
                {activeEx.type} Exercise
              </span>
              <span className="font-mono text-xs font-bold text-purple-600 dark:text-purple-400">{activeEx.points} XP</span>
            </div>

            <h3 className="font-bold text-slate-900 dark:text-white text-base">{activeEx.title}</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 font-mono">
              {activeEx.question}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-4">
            {exercises.map((ex, idx) => (
              <button
                key={ex.id}
                onClick={() => {
                  setActiveExIndex(idx);
                  setUserCode(ex.starterCode || "");
                  setTestOutput(null);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold ${
                  activeExIndex === idx ? "bg-indigo-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-500"
                }`}
              >
                Task {idx + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Code Editor Sandbox */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4 text-white flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-mono text-xs font-bold text-slate-400 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-indigo-400" /> Python 3.11 Sandbox
              </span>
              <Button
                onClick={handleRunCode}
                disabled={isExecuting}
                size="sm"
                className="bg-rose-600 hover:bg-rose-700 text-white text-xs rounded-xl font-bold"
              >
                {isExecuting ? <RefreshCw className="w-3.5 h-3.5 animate-spin mr-1" /> : <Play className="w-3.5 h-3.5 mr-1" />}
                Run Code
              </Button>
            </div>

            <textarea
              value={userCode}
              onChange={(e) => setUserCode(e.target.value)}
              rows={8}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 font-mono text-xs text-indigo-300 outline-none"
            />

            {testOutput && (
              <div className="p-3 bg-slate-900 border border-rose-500/40 rounded-xl text-xs font-mono text-rose-400 whitespace-pre-wrap">
                {testOutput}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
