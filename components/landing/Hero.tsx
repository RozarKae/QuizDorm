"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <div className="py-16 px-4 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">QuizDorm Education Platform</h1>
      <p className="text-slate-600 text-sm">
        A unified platform for interactive quizzes, examinations, learning management, and academic administration.
      </p>
      <div className="flex gap-4 pt-2">
        <Link href="/auth/register">
          <Button className="bg-slate-900 text-white hover:bg-slate-800 text-xs rounded px-4 py-2">
            Get Started
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button variant="outline" className="border-slate-300 text-slate-700 text-xs rounded px-4 py-2">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  );
}
