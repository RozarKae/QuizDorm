"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, Users, Clock, ShieldCheck, Play, Award, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useSound } from "@/components/audio/useSound";

const COMPETITION_DETAILS_MAP: Record<
  string,
  {
    title: string;
    organizer: string;
    description: string;
    code: string;
    participants: number;
    maxParticipants: number;
    prize: string;
    duration: string;
    topic: string;
    status: "Live" | "Upcoming" | "Completed";
  }
> = {
  "comp-1": {
    title: "Tamil Nadu & Kerala Inter-District Science Olympiad 2026",
    organizer: "TN & Kerala Science Olympiad Council",
    description: "Compete against premier school contenders across Chennai, Kochi, Madurai & Trivandrum in real-time. High-speed deterministic scoring with synchronized multi-node leaderboards.",
    code: "QD-8492",
    participants: 840,
    maxParticipants: 1000,
    prize: "Gold Trophy + ₹50,000 Academic Scholarship",
    duration: "45 Mins",
    topic: "Advanced Science & Physics Olympiad",
    status: "Live",
  },
  "comp-2": {
    title: "Kerala State Algorithmic & Coding Decathlon",
    organizer: "Kerala State IT & Algorithmic League (Kochi)",
    description: "High-speed competitive programming quiz tournament across South Zone engineering and higher secondary schools.",
    code: "QD-3104",
    participants: 310,
    maxParticipants: 500,
    prize: "State IT Trophy + Cloud Workstation Access",
    duration: "60 Mins",
    topic: "Algorithms & Data Structures",
    status: "Upcoming",
  },
  "comp-3": {
    title: "Madurai & South Tamil Nadu Inter-School Heritage Bowl",
    organizer: "Madurai Heritage & Higher Secondary Academic Council",
    description: "State history, literature, and general awareness championship tournament covering South Indian heritage, Sangam literature, and post-independence development.",
    code: "QD-1250",
    participants: 1250,
    maxParticipants: 1500,
    prize: "Championship Laurels + Merit Honors",
    duration: "30 Mins",
    topic: "20th Century World & Regional History",
    status: "Completed",
  },
};

export default function CompetitionDetailsPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string };
}) {
  const { playTap } = useSound();

  const unwrappedParams =
    typeof (params as any)?.then === "function"
      ? React.use(params as Promise<{ id: string }>)
      : (params as { id: string });
  const compId = unwrappedParams.id || "comp-1";

  const comp = useMemo(() => {
    return (
      COMPETITION_DETAILS_MAP[compId] || {
        title: `Tournament Arena #${compId}`,
        organizer: "TN & Kerala Science Olympiad Council",
        description: "Synchronized live assessment championship tournament.",
        code: compId.startsWith("QD-") ? compId : "QD-8492",
        participants: 128,
        maxParticipants: 500,
        prize: "Digital Trophy + Distinction Honours",
        duration: "45 Mins",
        topic: "General Knowledge & Assessment",
        status: "Live",
      }
    );
  }, [compId]);

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2 text-[#F2F7F3]">
      <div>
        <Link
          href="/dashboard/competitions"
          onClick={playTap}
          className="inline-flex items-center text-xs font-mono text-[#A0AEA5] hover:text-[#65F59A] transition-colors mb-4"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> BACK TO COMPETITIONS
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.14)] pb-6">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse shadow-[0_0_8px_#65F59A]" />
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#65F59A] font-bold">
                ARENA DOSSIER // {comp.code}
              </span>
              <Badge
                variant="outline"
                className="text-[9px] font-mono uppercase px-2 py-0.2 rounded border-[rgba(101,245,154,0.3)] bg-[rgba(101,245,154,0.1)] text-[#65F59A]"
              >
                ● {comp.status}
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
              {comp.title}
            </h1>
            <p className="text-xs font-mono text-[#A0AEA5]">
              Organized by <strong className="text-[#F2F7F3]">{comp.organizer}</strong> • Topic:{" "}
              <span className="text-[#38D9B0]">{comp.topic}</span>
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <Link
              href={`/live/arena/${comp.code}`}
              onClick={playTap}
            >
              <Button className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] px-5 h-9 shadow-[0_0_12px_rgba(101,245,154,0.2)]">
                <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Join as Contender
              </Button>
            </Link>

            <Link
              href={`/dashboard/competitions/${compId}/live?code=${comp.code}&role=host`}
              onClick={playTap}
            >
              <Button
                variant="outline"
                className="text-xs font-mono border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#65F59A]/40 rounded-[4px] h-9"
              >
                Launch Host Desk
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-3">
        <h3 className="text-xs font-mono uppercase font-bold text-[#65F59A] tracking-wider flex items-center">
          <Sparkles className="w-3.5 h-3.5 mr-1.5" /> Tournament Briefing
        </h3>
        <p className="text-xs sm:text-sm text-[#A0AEA5] leading-relaxed font-sans">
          {comp.description}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#0C1210] p-5 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-1.5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#69786F] flex items-center">
            <Users className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> Enrolled Contenders
          </p>
          <p className="text-2xl font-mono font-extrabold text-[#F2F7F3]">
            {comp.participants} <span className="text-xs text-[#69786F] font-normal">/ {comp.maxParticipants} max</span>
          </p>
        </div>

        <div className="bg-[#0C1210] p-5 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-1.5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#69786F] flex items-center">
            <Award className="w-3.5 h-3.5 mr-1.5 text-[#FBBF24]" /> Championship Honors
          </p>
          <p className="text-base font-display font-bold text-[#F2F7F3] truncate">
            {comp.prize}
          </p>
        </div>

        <div className="bg-[#0C1210] p-5 rounded-[6px] border border-[rgba(160,190,170,0.14)] space-y-1.5">
          <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#69786F] flex items-center">
            <Clock className="w-3.5 h-3.5 mr-1.5 text-[#65F59A]" /> Duration Allotted
          </p>
          <p className="text-2xl font-mono font-extrabold text-[#65F59A]">
            {comp.duration}
          </p>
        </div>
      </div>
    </div>
  );
}
