"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Trophy, Calendar, Clock, Users, Shield, Save, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { generateCollisionResistantCode, normalizeRoomCode } from "@/lib/live/liveSessionManager";
import { getStoredQuizzes } from "@/lib/data/quizzes";
import { toast } from "sonner";

export default function CreateCompetitionPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [quizId, setQuizId] = useState("q-101");
  const [availableQuizzes, setAvailableQuizzes] = useState<{ value: string; label: string }[]>([
    { value: "q-101", label: "Advanced Algebra & Calculus Challenge" },
    { value: "q-102", label: "Organic Chemistry Fundamentals" },
  ]);
  const [code, setCode] = useState("QD-8492");
  const [startDate, setStartDate] = useState("2026-07-25");
  const [startTime, setStartTime] = useState("18:00");
  const [durationMinutes, setDurationMinutes] = useState(45);
  const [timePerQuestion, setTimePerQuestion] = useState(30);
  const [maxParticipants, setMaxParticipants] = useState(500);
  const [negativeMarking, setNegativeMarking] = useState(true);
  const [timeBonus, setTimeBonus] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Generate fresh collision-resistant code
    setCode(generateCollisionResistantCode());

    // Load available quizzes
    try {
      const stored = getStoredQuizzes();
      if (stored && stored.length > 0) {
        setAvailableQuizzes(
          stored.map((q) => ({
            value: q.id,
            label: `${q.title} (${q.questions.length} Qs)`,
          }))
        );
      }
    } catch {
      // Fallback
    }
  }, []);

  const handleRegeneratePin = () => {
    const newPin = generateCollisionResistantCode();
    setCode(newPin);
    toast.info(`Generated new Room PIN: ${newPin}`);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!title.trim()) {
      toast.error("Please enter a competition title");
      return;
    }

    setIsSubmitting(true);
    const cleanCode = normalizeRoomCode(code);

    try {
      const res = await fetch("/api/live/session/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          quizId,
          code: cleanCode,
          hostName: "TN & Kerala Science Olympiad Council",
          settings: {
            durationMinutes,
            maxParticipants,
            negativeMarking,
            timeBonus,
            timePerQuestionSeconds: timePerQuestion,
          },
        }),
      });

      const data = await res.json();
      if (data.success && data.session) {
        const secret = data.hostSecret;
        if (typeof window !== "undefined") {
          localStorage.setItem(`quizdorm_host_sec_${cleanCode}`, secret);
        }
        toast.success(`Live Competition "${title}" hosted successfully! PIN: ${cleanCode}`);
        router.push(
          `/dashboard/competitions/${data.sessionId || data.session.id}/live?code=${cleanCode}&hostSecret=${secret}&role=host`
        );
      } else {
        toast.error(data.error || "Failed to create live session");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      toast.error("Network error creating live tournament");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 py-2">
      <div>
        <Link
          href="/dashboard/competitions"
          className="inline-flex items-center text-xs font-mono text-muted-foreground hover:text-foreground mb-2"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> BACK TO COMPETITIONS
        </Link>
        <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-muted-foreground">
          <span className="w-1.5 h-1.5 bg-[#2855F5] rounded-full animate-pulse" />
          <span>ARENA PROVISIONING // LIVE DESK</span>
        </div>
        <h1 className="text-2xl font-bold font-display text-foreground flex items-center">
          <Trophy className="w-6 h-6 text-[#2855F5] mr-2" /> Host New Live Competition
        </h1>
        <p className="text-xs text-muted-foreground">
          Configure real-time tournament rules, room PIN code, and synchronized question set
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="bg-card p-6 sm:p-8 rounded-[4px] border border-border shadow-sm space-y-6"
      >
        <div>
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Competition Name
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. National Physics & Science Bowl 2026"
            className="text-sm font-semibold rounded-[3px] border-border bg-background"
            required
          />
        </div>

        <div>
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
            Description & Overview
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Provide tournament instructions, prizes, and scope..."
            className="w-full rounded-[3px] border border-border bg-background p-3 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-[#2855F5]"
          />
        </div>

        <ImageDropzone label="Event Banner Image (Optional)" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Associated Quiz
            </label>
            <Select
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              options={availableQuizzes}
              className="text-xs font-mono font-medium rounded-[3px]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Arena Room PIN Code
            </label>
            <div className="flex space-x-2">
              <Input
                value={code}
                readOnly
                className="text-xs font-mono font-bold uppercase bg-muted border-border rounded-[3px]"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRegeneratePin}
                className="shrink-0 text-xs font-mono rounded-[3px]"
              >
                <RefreshCw className="w-3 h-3 mr-1" /> Regenerate
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Start Date
            </label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="text-xs font-mono rounded-[3px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Start Time
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="text-xs font-mono rounded-[3px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Sec / Question
            </label>
            <Input
              type="number"
              value={timePerQuestion}
              onChange={(e) => setTimePerQuestion(Number(e.target.value))}
              min={10}
              max={180}
              className="text-xs font-mono rounded-[3px]"
            />
          </div>
          <div>
            <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground mb-1">
              Max Entrants
            </label>
            <Input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(Number(e.target.value))}
              min={2}
              max={5000}
              className="text-xs font-mono rounded-[3px]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-3">
          <p className="text-xs font-mono uppercase font-bold text-foreground">Scoring & Tournament Rules</p>
          <label className="flex items-center justify-between text-xs text-muted-foreground cursor-pointer p-2 rounded-[3px] hover:bg-muted/50">
            <span>Enable Speed-Based Time Bonus Points (fast submissions earn up to +50 bonus)</span>
            <input
              type="checkbox"
              checked={timeBonus}
              onChange={(e) => setTimeBonus(e.target.checked)}
              className="w-4 h-4 text-[#2855F5] rounded"
            />
          </label>
          <label className="flex items-center justify-between text-xs text-muted-foreground cursor-pointer p-2 rounded-[3px] hover:bg-muted/50">
            <span>Enable Negative Marking (-25% deduction for incorrect answers)</span>
            <input
              type="checkbox"
              checked={negativeMarking}
              onChange={(e) => setNegativeMarking(e.target.checked)}
              className="w-4 h-4 text-[#2855F5] rounded"
            />
          </label>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <Link href="/dashboard/competitions">
            <Button variant="outline" className="text-xs font-mono rounded-[3px]">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs font-bold rounded-[3px] px-6"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                <span>Launching Arena...</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5 mr-1.5" />
                <span>Create & Open Control Room</span>
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
