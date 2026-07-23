"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Clock, HelpCircle, Award, Users, Play, Edit, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function QuizDetailsPage({ params }: { params: { id: string } }) {
  const handleShare = () => {
    toast.success("Quiz link copied to clipboard!");
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/quizzes" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Quizzes
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                Mathematics
              </span>
              <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300">
                Hard
              </Badge>
              <span className="text-xs text-emerald-600 font-semibold">● Published</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              Advanced Algebra & Calculus Challenge
            </h1>
            <p className="text-sm text-gray-500 mt-1">Quiz ID: {params.id || "q-101"}</p>
          </div>

          <div className="flex items-center space-x-3">
            <Button variant="outline" onClick={handleShare} className="border-gray-300 dark:border-gray-800">
              <Share2 className="w-4 h-4 mr-2" /> Share
            </Button>
            <Link href="/dashboard/quizzes/builder">
              <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl">
                <Edit className="w-4 h-4 mr-2" /> Edit Questions
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <HelpCircle className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">25</p>
          <p className="text-xs text-gray-500">Total Questions</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <Clock className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">45 mins</p>
          <p className="text-xs text-gray-500">Time Limit</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <Users className="w-6 h-6 text-blue-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">412</p>
          <p className="text-xs text-gray-500">Total Attempts</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 text-center shadow-sm">
          <Award className="w-6 h-6 text-amber-600 mx-auto mb-2" />
          <p className="text-2xl font-bold text-gray-900 dark:text-white">84%</p>
          <p className="text-xs text-gray-500">Average Score</p>
        </div>
      </div>
    </div>
  );
}
