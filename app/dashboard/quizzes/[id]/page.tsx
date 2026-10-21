"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  HelpCircle,
  Award,
  Users,
  Play,
  Edit,
  Share2,
  Layers,
  Sparkles,
  GraduationCap,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getQuizById, ALL_DEFAULT_QUIZZES } from "@/lib/data/quizzes";
import { toast } from "sonner";

export default function QuizDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const unwrappedParams =
    typeof (params as any)?.then === "function"
      ? React.use(params as Promise<{ id: string }>)
      : (params as { id: string });
  const quizId = unwrappedParams.id;

  const quiz = useMemo(() => {
    return getQuizById(quizId) || ALL_DEFAULT_QUIZZES[0];
  }, [quizId]);

  const questionsCount = quiz.questions?.length || 0;
  const totalMarks = quiz.totalMarks || questionsCount;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Quiz link copied to clipboard!");
    } else {
      toast.success("Quiz link ready to share!");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Navigation & Header */}
      <div className="border border-border bg-card p-6 sm:p-8 rounded-[3px] space-y-5">
        <Link
          href="/dashboard/quizzes"
          className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> RETURN TO CATALOG
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {quiz.topic && (
                <Badge variant="outline" className="border-[#65F59A]/40 bg-[#65F59A]/10 text-[#65F59A] font-mono text-[9px] uppercase tracking-widest rounded-[2px]">
                  <Layers className="w-3 h-3 mr-1" />
                  {quiz.topic}
                </Badge>
              )}
              <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-muted text-muted-foreground border border-border">
                {quiz.subject || quiz.category}
              </span>
              {(quiz.gradeLevel || quiz.grade) && (
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-[2px] bg-muted text-muted-foreground border border-border flex items-center">
                  <GraduationCap className="w-3 h-3 mr-1" />
                  {quiz.gradeLevel || quiz.grade}
                </span>
              )}
              <Badge
                variant="outline"
                className={`text-[9px] font-mono uppercase tracking-widest rounded-[2px] ${
                  quiz.difficulty === "Hard"
                    ? "border-[#E85D3F]/40 bg-[#E85D3F]/10 text-[#E85D3F]"
                    : quiz.difficulty === "Medium"
                    ? "border-[#DFFF43]/40 bg-[#DFFF43]/10 text-foreground"
                    : "border-[#65F59A]/40 bg-[#65F59A]/10 text-[#65F59A]"
                }`}
              >
                {quiz.difficulty}
              </Badge>
              <span className="text-[10px] font-mono text-[#65F59A] font-bold">● PUBLISHED</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground">
              {quiz.title}
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
              {quiz.description || "Comprehensive topical assessment challenge designed to test your core mastery."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 pt-2 sm:pt-0">
            <Button variant="outline" size="sm" onClick={handleShare} className="text-xs font-mono tracking-wider rounded-[3px] border-border">
              <Share2 className="w-3.5 h-3.5 mr-1.5" /> SHARE
            </Button>
            <Link href={`/dashboard/quizzes/${quiz.id}/take`}>
              <Button size="sm" className="bg-[#65F59A] hover:bg-[#52E086] text-[#070B0A] font-mono text-xs font-bold tracking-wider rounded-[3px] shadow-[0_0_15px_rgba(101,245,154,0.3)]">
                <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> START QUIZ
              </Button>
            </Link>
          </div>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">TOTAL QUESTIONS</span>
              <HelpCircle className="w-3.5 h-3.5 text-[#65F59A]" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-foreground">{questionsCount}</p>
            <p className="text-[10px] font-mono text-muted-foreground">Standardized items</p>
          </div>

          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">TIME LIMIT</span>
              <Clock className="w-3.5 h-3.5 text-[#65F59A]" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-foreground">{quiz.durationMinutes}m</p>
            <p className="text-[10px] font-mono text-muted-foreground">Countdown timer</p>
          </div>

          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">TOTAL POINTS</span>
              <Award className="w-3.5 h-3.5 text-[#DFFF43]" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-foreground">{totalMarks}p</p>
            <p className="text-[10px] font-mono text-muted-foreground">Deterministic scale</p>
          </div>

          <div className="border border-border bg-background/60 p-4 rounded-[2px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">SHUFFLE RUNTIME</span>
              <Sparkles className="w-3.5 h-3.5 text-[#65F59A]" />
            </div>
            <p className="text-2xl font-mono font-extrabold text-foreground">
              {quiz.randomizeQuestions ? "Active" : "Standard"}
            </p>
            <p className="text-[10px] font-mono text-muted-foreground">Fresh per attempt</p>
          </div>
        </div>
      </div>

      {/* Questions Preview List */}
      <div className="bg-card p-6 rounded-[3px] border border-border space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-foreground flex items-center">
            <HelpCircle className="w-3.5 h-3.5 mr-1.5 text-[#65F59A]" />
            Included Questions ({questionsCount})
          </h2>
          <span className="text-[10px] font-mono text-muted-foreground">
            SHUFFLED FRESH PER ATTEMPT
          </span>
        </div>

        <div className="space-y-2.5 divide-y divide-border">
          {quiz.questions?.slice(0, 10).map((q, idx) => (
            <div key={q.id || idx} className="pt-2.5 first:pt-0 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2 text-[10px] font-mono text-muted-foreground">
                  <span className="font-bold text-[#65F59A]">ITEM 0{idx + 1}</span>
                  <span>•</span>
                  <span>{q.topic || q.subject}</span>
                  <span>•</span>
                  <span>{q.marks || 1} PT</span>
                </div>
                <p className="text-xs font-semibold text-foreground line-clamp-2">
                  {q.title}
                </p>
              </div>
              <Badge variant="outline" className="text-[9px] font-mono uppercase tracking-widest rounded-[2px] shrink-0 border-border">
                {q.difficulty}
              </Badge>
            </div>
          ))}

          {questionsCount > 10 && (
            <div className="pt-3 text-center text-xs font-mono text-muted-foreground">
              + {questionsCount - 10} additional verified questions in bank
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

