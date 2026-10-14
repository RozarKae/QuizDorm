"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Users, Clock, ShieldCheck, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function CompetitionDetailsPage({ params }: { params: { id: string } }) {
  const handleJoin = () => {
    toast.success("Successfully registered for competition!");
  };

  return (
    <div className="space-y-8">
      <div>
        <Link href="/dashboard/competitions" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-4">
          <ArrowLeft className="w-4 h-4 mr-1" /> Back to Competitions
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <Badge className="bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse">
                ● Live Competition
              </Badge>
              <span className="text-xs text-gray-500">ID: {params.id || "comp-1"}</span>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
              National Science & Olympiad Championship 2026
            </h1>
            <p className="text-sm text-gray-500 mt-1">Organized by Oakridge Quiz Federation</p>
          </div>

          <Button onClick={handleJoin} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl px-6 py-3">
            Join Competition Now
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase">Registered Participants</p>
          <p className="text-3xl font-extrabold text-gray-900 dark:text-white">840 Students</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase">Prize Pool</p>
          <p className="text-3xl font-extrabold text-amber-500">Gold Trophy + $500</p>
        </div>
        <div className="bg-white dark:bg-gray-950 p-6 rounded-2xl border border-gray-100 dark:border-gray-850 space-y-2">
          <p className="text-xs font-semibold text-gray-400 uppercase">Time Remaining</p>
          <p className="text-3xl font-mono font-extrabold text-indigo-600">00:45:00</p>
        </div>
      </div>
    </div>
  );
}
