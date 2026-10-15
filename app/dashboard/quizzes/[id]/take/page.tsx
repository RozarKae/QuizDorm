"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Clock, HelpCircle, Award, ShieldCheck, Play, AlertCircle, Layers, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getQuizById, ALL_DEFAULT_QUIZZES } from "@/lib/data/quizzes";

export default function QuizStartLobbyPage({ params }: { params: Promise<{ id: string }> | { id: string } }) {
  const router = useRouter();

  const unwrappedParams = typeof (params as any)?.then === "function" ? React.use(params as Promise<{ id: string }>) : (params as { id: string });
  const quizId = unwrappedParams.id;

  const quiz = useMemo(() => {
    return getQuizById(quizId) || ALL_DEFAULT_QUIZZES[0];
  }, [quizId]);

  const questionsCount = quiz.questions?.length || 0;
  const totalMarks = quiz.totalMarks || questionsCount;
  const passMarksPercent = quiz.passMarks ? Math.round((quiz.passMarks / (totalMarks || 1)) * 100) : 60;

  const handleStart = () => {
    router.push(`/dashboard/quizzes/${quiz.id}/take/live`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <Link href="/dashboard/quizzes" className="inline-flex items-center text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground mb-4">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Quizzes
        </Link>
        <div className="flex flex-wrap items-center gap-2 mb-2 font-mono">
          {quiz.topic && (
            <span className="bg-acid text-ink font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] border border-acid">
              {quiz.topic}
            </span>
          )}
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-muted border border-border text-foreground font-medium">
            {quiz.subject || quiz.category}
          </span>
          {(quiz.gradeLevel || quiz.grade) && (
            <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-muted border border-border text-foreground font-medium">
              {quiz.gradeLevel || quiz.grade}
            </span>
          )}
          {quiz.difficulty === "Hard" ? (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold bg-coral/10 text-coral border border-coral/30">
              Hard
            </span>
          ) : quiz.difficulty === "Medium" ? (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold bg-muted text-foreground border border-border">
              Medium
            </span>
          ) : (
            <span className="font-mono text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded-[2px] font-bold bg-acid/20 text-foreground border border-acid/50">
              Easy
            </span>
          )}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-foreground tracking-tight">
          {quiz.title}
        </h1>
        <p className="text-xs font-mono text-muted-foreground mt-2">
          {quiz.description || "Official assessment testing knowledge retention, accuracy, and quick critical thinking."}
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-card rounded-[3px] border border-border text-center shadow-xs">
          <HelpCircle className="w-4 h-4 text-cobalt mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-foreground tabular-nums">{questionsCount}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Questions</p>
        </div>
        <div className="p-4 bg-card rounded-[3px] border border-border text-center shadow-xs">
          <Clock className="w-4 h-4 text-cobalt mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-foreground tabular-nums">{quiz.durationMinutes}m</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Duration</p>
        </div>
        <div className="p-4 bg-card rounded-[3px] border border-border text-center shadow-xs">
          <Award className="w-4 h-4 text-cobalt mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-foreground tabular-nums">{totalMarks}</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Marks</p>
        </div>
        <div className="p-4 bg-card rounded-[3px] border border-border text-center shadow-xs">
          <ShieldCheck className="w-4 h-4 text-cobalt mx-auto mb-1" />
          <p className="text-xl font-extrabold font-display text-foreground tabular-nums">{passMarksPercent}%</p>
          <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">Passing Score</p>
        </div>
      </div>

      {/* Rules & Instructions */}
      <div className="bg-card p-6 rounded-[3px] border border-border shadow-xs space-y-4">
        <h3 className="text-sm font-bold font-display text-foreground flex items-center">
          <AlertCircle className="w-4 h-4 text-coral mr-2" /> Assessment Protocols & Instructions
        </h3>
        <ul className="space-y-2 text-xs font-mono text-muted-foreground leading-relaxed list-disc list-inside">
          <li>Questions are freshly randomized for each attempt to test true recall.</li>
          <li>Answer options are randomized while preserving the original correct answer mapping.</li>
          <li>The countdown timer starts as soon as you click <strong>Start Assessment Now</strong>.</li>
          <li>Your progress is safely stored in browser session storage.</li>
          <li>You can mark questions for review and jump across items using the question palette.</li>
          <li>The assessment will automatically submit when the countdown timer reaches zero.</li>
        </ul>
      </div>

      {/* Action CTA */}
      <div className="flex justify-end space-x-3 pt-2">
        <Link href="/dashboard/quizzes">
          <Button variant="outline" className="px-5 rounded-[3px] font-mono text-xs border-border h-9">
            Cancel
          </Button>
        </Link>
        <Button onClick={handleStart} className="bg-cobalt hover:bg-cobalt/90 text-white font-mono text-xs font-semibold rounded-[3px] px-6 h-9 shadow-xs">
          <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Start Assessment Now
        </Button>
      </div>
    </div>
  );
}
