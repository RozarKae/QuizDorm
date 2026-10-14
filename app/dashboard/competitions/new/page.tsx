"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, Calendar, Clock, Users, Shield, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { toast } from "sonner";

export default function CreateCompetitionPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizId, setQuizId] = useState("q-101");
  const [code, setCode] = useState(`QD-${Math.floor(1000 + Math.random() * 9000)}`);
  const [startDate, setStartDate] = useState("2026-07-25");
  const [startTime, setStartTime] = useState("18:00");
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [maxParticipants, setMaxParticipants] = useState(500);
  const [negativeMarking, setNegativeMarking] = useState(true);
  const [timeBonus, setTimeBonus] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      toast.error("Please enter a competition title");
      return;
    }
    toast.success(`Live Competition "${title}" hosted successfully! PIN: ${code}`);
    router.push("/dashboard/competitions");
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      <div>
        <Link href="/dashboard/competitions" className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Competitions
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Trophy className="w-6 h-6 text-amber-500 mr-2" /> Host New Live Competition
        </h1>
        <p className="text-sm text-gray-500">Configure real-time tournament rules, room PIN code, and quiz selection</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Competition Name</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. National Physics & Science Bowl 2026"
            className="text-sm font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Description & Overview</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide instructions and prizes..."
            className="w-full rounded-2xl border border-gray-300 dark:border-gray-800 bg-white dark:bg-gray-950 p-4 text-xs text-gray-900 dark:text-gray-100"
          />
        </div>

        <ImageDropzone label="Event Banner Image (Optional)" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Associated Quiz</label>
            <Select
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              options={[
                { value: "q-101", label: "Advanced Algebra & Calculus Challenge" },
                { value: "q-102", label: "Organic Chemistry & Molecular Structures" },
              ]}
              className="text-xs font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Game PIN Code</label>
            <div className="flex space-x-2">
              <Input value={code} readOnly className="text-xs font-mono font-bold uppercase bg-gray-50 dark:bg-gray-900" />
              <Button type="button" variant="outline" size="sm" onClick={() => setCode(`QD-${Math.floor(1000 + Math.random() * 9000)}`)} className="shrink-0 text-xs">
                Regenerate
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Start Date</label>
            <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Start Time</label>
            <Input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} className="text-xs" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Max Participants</label>
            <Input type="number" value={maxParticipants} onChange={(e) => setMaxParticipants(Number(e.target.value))} className="text-xs" />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-gray-900 space-y-3">
          <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Scoring & Tournament Rules</p>
          <label className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
            <span>Enable Speed-Based Time Bonus Points</span>
            <input type="checkbox" checked={timeBonus} onChange={(e) => setTimeBonus(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
          </label>
          <label className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400 cursor-pointer">
            <span>Enable Negative Marking (-1 for incorrect answers)</span>
            <input type="checkbox" checked={negativeMarking} onChange={(e) => setNegativeMarking(e.target.checked)} className="w-4 h-4 text-indigo-600 rounded" />
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Link href="/dashboard/competitions">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl px-6">
            <Save className="w-4 h-4 mr-1.5" /> Publish Competition
          </Button>
        </div>
      </form>
    </div>
  );
}
