"use client";

import { PerformanceChart } from "@/components/quiz-engine/PerformanceChart";
import { Button } from "@/components/ui/button";
import { QuizAttempt } from "@/lib/types/attempt";
import { AlertTriangle,ArrowLeft,ArrowRight,Award,CheckCircle2,Clock,HelpCircle,XCircle } from "lucide-react";
import Link from "next/link";
import React,{ useEffect,useState } from "react";

export default function QuizResultPage({
  params,
}: {
  params: Promise<{ id: string; attemptId: string }> | { id: string; attemptId: string };
}) {
  const unwrappedParams =
    typeof (params as PromiseLike<unknown>)?.then === "function"
      ? React.use(params as Promise<{ id: string; attemptId: string }>)
      : (params as { id: string; attemptId: string });
  const { id, attemptId } = unwrappedParams;

  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [quizTitle, setQuizTitle] = useState("Assessment");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadResult() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/quizzes/attempts/${attemptId}`);
        if (!res.ok) {
          const errJson = await res.json().catch(() => null);
          throw new Error(errJson?.error || "Assessment attempt record could not be found.");
        }
        const data = await res.json();
        if (isMounted) {
          setAttempt(data.data.attempt);
          setQuizTitle(data.data.quizTitle || "Assessment");
        }
      } catch (err: unknown) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Failed to load result.");
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadResult();
    return () => {
      isMounted = false;
    };
  }, [attemptId]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4 font-mono">
        <div className="inline-block w-6 h-6 border-2 border-[#FF4D6D] border-t-transparent rounded-full animate-spin" />
        <p className="text-xs text-[#A0AEA5]">Retrieving verified attempt result from database...</p>
      </div>
    );
  }

  if (error || !attempt) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-6 text-center space-y-4 bg-[#140C0E] border border-[rgba(240, 160, 180,0.18)] rounded-[8px]">
        <AlertTriangle className="w-8 h-8 text-[#FF4D6D] mx-auto" />
        <h2 className="text-lg font-bold font-display text-[#F2F7F3]">Result Unavailable</h2>
        <p className="text-xs font-mono text-[#A0AEA5] leading-relaxed">
          {error || "The requested attempt does not exist or you do not have permission to view it."}
        </p>
        <div className="pt-2">
          <Link href="/dashboard/quizzes">
            <Button variant="outline" className="font-mono text-xs border-[rgba(240, 160, 180,0.2)] text-[#F2F7F3]">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Return to Quizzes
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = attempt.submittedAt
    ? new Date(attempt.submittedAt).toLocaleString()
    : "Recently Submitted";
  const timeMinutes = Math.max(1, Math.round(attempt.timeTakenSeconds / 60));

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Result Header */}
      <div className="text-center space-y-2 border-b border-[rgba(240, 160, 180,0.14)] pb-6">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-[3px] bg-[rgba(255, 77, 109,0.12)] border border-[rgba(255, 77, 109,0.3)] text-[#FF4D6D] text-[10px] font-mono font-bold uppercase tracking-widest shadow-[0_0_12px_rgba(255, 77, 109,0.15)]">
          <Award className="w-3.5 h-3.5 fill-current" />
          <span>OFFICIAL ASSESSMENT RESULT</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
          {quizTitle}
        </h1>
        <p className="text-[11px] font-mono text-[#A0AEA5]">
          ATTEMPT ID: <span className="text-[#FF758F]">{attempt.id}</span> • SUBMITTED: {formattedDate}
        </p>
      </div>

      {/* Main Result Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Left 5 cols: Circular Progress */}
        <div className="md:col-span-5">
          <PerformanceChart
            percentage={attempt.percentage}
            isPassed={attempt.isPassed}
            score={attempt.score}
            totalMarks={attempt.totalMarks}
          />
        </div>

        {/* Right 7 cols: Detailed Breakdown Cards */}
        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-4 bg-[#140C0E] rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs">
              <CheckCircle2 className="w-5 h-5 text-[#FF4D6D] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#FF4D6D]">{attempt.correctCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5]">CORRECT</p>
            </div>

            <div className="p-4 bg-[#140C0E] rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs">
              <XCircle className="w-5 h-5 text-[#F87171] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#F87171]">{attempt.incorrectCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5]">INCORRECT</p>
            </div>

            <div className="p-4 bg-[#140C0E] rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs">
              <HelpCircle className="w-5 h-5 text-[#69786F] mx-auto mb-1" />
              <p className="text-2xl font-extrabold font-mono text-[#F2F7F3]">{attempt.unansweredCount}</p>
              <p className="text-[10px] font-mono uppercase tracking-wider text-[#A0AEA5]">SKIPPED</p>
            </div>
          </div>

          <div className="bg-[#140C0E] p-6 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] space-y-3 shadow-xs">
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(240, 160, 180,0.12)]">
              <span className="text-[#A0AEA5] font-mono text-[11px] uppercase tracking-wider">Time Duration:</span>
              <span className="font-mono font-bold text-[#F2F7F3] flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#FF4D6D]" /> {timeMinutes} MINS
              </span>
            </div>
            <div className="flex items-center justify-between text-xs pb-2 border-b border-[rgba(240, 160, 180,0.12)]">
              <span className="text-[#A0AEA5] font-mono text-[11px] uppercase tracking-wider">Passing Standard:</span>
              <span className="font-mono font-bold text-[#FF758F]">{attempt.passMarks}% REQUIRED</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#A0AEA5] font-mono text-[11px] uppercase tracking-wider">Evaluation Status:</span>
              <span className={`font-mono font-bold ${attempt.isPassed ? "text-[#FF4D6D]" : "text-[#F87171]"}`}>
                {attempt.isPassed ? "PASSED ASSESSMENT" : "NEEDS REVISION"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-[rgba(240, 160, 180,0.14)]">
        <Link href={`/dashboard/quizzes/${id}/review/${attempt.id}`}>
          <Button className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono text-xs font-bold tracking-wider rounded-[4px] px-6 py-2.5 w-full sm:w-auto shadow-[0_0_15px_rgba(255, 77, 109,0.18)] cursor-pointer">
            REVIEW QUESTION RESPONSES <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </Link>
        <Link href="/dashboard/quizzes">
          <Button variant="outline" className="font-mono text-xs tracking-wider rounded-[4px] border-[rgba(240, 160, 180,0.18)] px-5 py-2.5 w-full sm:w-auto text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#FF4D6D]/30 cursor-pointer">
            RETURN TO CATALOG
          </Button>
        </Link>
      </div>
    </div>
  );
}
