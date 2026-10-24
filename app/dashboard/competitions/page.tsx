"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CompetitionItem } from "@/lib/types/competition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { JoinCompetitionModal } from "@/components/competitions/JoinCompetitionModal";
import { useAuth } from "@/components/auth/AuthProvider";
import { GovernanceSettingsManager } from "@/lib/admin/governanceSettingsManager";
import {
  Trophy,
  Users,
  Clock,
  Key,
  Plus,
  Play,
  Trash2,
  Search,
  Swords,
  Radio,
  ShieldAlert,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";

const STORAGE_KEY_HOSTED_COMPETITIONS = "quizdorm_hosted_competitions_v1";

export default function CompetitionsPage() {
  const { role } = useAuth();
  const canHost = GovernanceSettingsManager.canHostArena(role).allowed;

  const [competitions, setCompetitions] = useState<CompetitionItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState<"All" | "Live" | "Upcoming" | "Completed">("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [joinModalOpen, setJoinModalOpen] = useState(false);
  const [inlinePin, setInlinePin] = useState("");

  // Load ONLY real actively hosted competitions (Remove hardcoded test arenas)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem(STORAGE_KEY_HOSTED_COMPETITIONS);
        if (saved) {
          const parsed = JSON.parse(saved);
          setCompetitions(Array.isArray(parsed) ? parsed : []);
        } else {
          setCompetitions([]);
        }
      } catch {
        setCompetitions([]);
      }
    }
    setIsLoaded(true);
  }, []);

  const filtered = competitions.filter((comp) => {
    const matchesSearch =
      comp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comp.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === "All" || comp.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleDelete = (id: string) => {
    const next = competitions.filter((c) => c.id !== id);
    setCompetitions(next);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_HOSTED_COMPETITIONS, JSON.stringify(next));
    }
    toast.success("Competition removed from active directory");
  };

  const handleInlinePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = inlinePin.trim().toUpperCase();
    if (!clean) {
      toast.error("Please enter a valid room PIN");
      return;
    }
    const targetCode = clean.startsWith("QD-") ? clean : `QD-${clean.replace(/[^A-Z0-9]/gi, "")}`;
    window.location.href = `/live/arena/${targetCode}`;
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#F2F7F3]">
      {/* Editorial Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.14)] pb-5">
        <div className="space-y-1">
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5]">
            <span className="w-1.5 h-1.5 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
            <span>SYNCHRONIZED COGNITIVE DECATHLON // BATTLE ARENA</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
            <Trophy className="w-6 h-6 text-[#65F59A] mr-2" /> Synchronized Battle Arenas
          </h1>
          <p className="text-xs font-mono text-[#A0AEA5]">
            {canHost
              ? "Launch and govern live multiplayer cognitive decathlons or join active arenas via room PIN."
              : "Compete in live cognitive decathlons with microsecond podiums. Join active arenas with your Room PIN."}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setJoinModalOpen(true)}
            className="text-xs font-mono tracking-wider rounded-[4px] border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#65F59A]/30 h-9"
          >
            <Key className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> ROOM PIN CODE
          </Button>

          {/* Ground Rule: Students & Subscribers CANNOT host arena */}
          {canHost && (
            <Link href="/dashboard/competitions/new">
              <Button size="sm" className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold tracking-wider rounded-[4px] h-9 shadow-[0_0_15px_rgba(101,245,154,0.18)]">
                <Plus className="w-3.5 h-3.5 mr-1.5" /> HOST TOURNAMENT
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* When NO arenas are actively hosted -> Clean Zero State (No Test Arenas) */}
      {isLoaded && competitions.length === 0 ? (
        <div className="rounded-[8px] bg-[#0C1210] border border-[rgba(160,190,170,0.18)] p-8 sm:p-12 text-center space-y-6 max-w-2xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-40 bg-[radial-gradient(ellipse_at_center,rgba(101,245,154,0.06)_0%,transparent_70%)] blur-[50px] pointer-events-none" />

          <div className="w-16 h-16 rounded-full bg-[#111B17] border border-[rgba(160,190,170,0.2)] mx-auto flex items-center justify-center text-[#65F59A] shadow-[0_0_20px_rgba(101,245,154,0.1)]">
            <Radio className="w-8 h-8 animate-pulse text-[#38D9B0]" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-[#111B17] border border-[rgba(160,190,170,0.2)] text-[#A0AEA5] font-mono text-[10px] font-bold uppercase tracking-wider">
              <span>Telemetry Standby</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display uppercase tracking-tight text-[#F2F7F3]">
              No Live Arenas Currently Active
            </h2>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-md mx-auto leading-relaxed">
              Arenas only appear here when actively launched by an authorized Handler or Institution.
              If your teacher or organizer gave you a room PIN, enter it below to join the battle directly.
            </p>
          </div>

          {/* Quick PIN Entry Form */}
          <form onSubmit={handleInlinePinSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-2 max-w-md mx-auto">
            <div className="relative w-full">
              <Key className="absolute left-3 top-3 h-4 w-4 text-[#69786F]" />
              <input
                type="text"
                value={inlinePin}
                onChange={(e) => setInlinePin(e.target.value)}
                placeholder="Enter Room PIN (e.g. QD-8492)"
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-[4px] border border-[rgba(160,190,170,0.2)] bg-[#111B17] text-[#F2F7F3] placeholder-[#69786F] font-mono uppercase tracking-widest focus:outline-none focus:border-[#65F59A]"
              />
            </div>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-[#65F59A] text-[#070B0A] hover:bg-[#52E086] font-mono text-xs font-bold uppercase tracking-wider h-10 px-5 shadow-[0_0_15px_rgba(101,245,154,0.2)] shrink-0"
            >
              <Swords className="w-3.5 h-3.5 mr-1.5" />
              Join Arena
            </Button>
          </form>

          {canHost && (
            <div className="pt-4 border-t border-[rgba(160,190,170,0.12)]">
              <Link href="/dashboard/competitions/new">
                <Button variant="outline" size="sm" className="border-[rgba(101,245,154,0.3)] bg-[#17251E] text-[#65F59A] hover:bg-[#65F59A] hover:text-[#070B0A] font-mono text-xs font-bold uppercase h-8 transition-all">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Launch New Live Arena
                </Button>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Active Tournament Live List */}
          <div className="bg-[#0C1210] p-3.5 rounded-[6px] border border-[rgba(160,190,170,0.14)] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center space-x-1 bg-[#111B17] border border-[rgba(160,190,170,0.16)] p-1 rounded-[4px] w-full sm:w-auto overflow-x-auto">
              {(["All", "Live", "Upcoming", "Completed"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1 rounded-[3px] text-xs font-mono uppercase tracking-wider transition-all ${
                    activeTab === tab
                      ? "bg-[#17251E] text-[#65F59A] border border-[rgba(101,245,154,0.3)] font-bold shadow-xs"
                      : "text-[#A0AEA5] hover:text-[#F2F7F3]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#69786F]" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search tournament or PIN..."
                className="pl-9 h-9 bg-[#111B17] text-xs font-mono rounded-[4px] border-[rgba(160,190,170,0.2)] text-[#F2F7F3] focus:border-[#65F59A]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filtered.map((comp) => (
              <motion.div
                key={comp.id}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
                className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] hover:border-[#65F59A]/40 transition-colors flex flex-col justify-between group shadow-sm hover:shadow-[0_12px_24px_rgba(0,0,0,0.6),0_0_15px_rgba(101,245,154,0.08)]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <Badge
                      variant="outline"
                      className={`text-[9px] font-mono uppercase tracking-widest rounded-[3px] px-2 py-0.5 ${
                        comp.status === "Live"
                          ? "border-[rgba(248,113,113,0.4)] bg-[rgba(248,113,113,0.12)] text-[#F87171] animate-pulse"
                          : "border-[rgba(101,245,154,0.3)] bg-[rgba(101,245,154,0.12)] text-[#65F59A]"
                      }`}
                    >
                      ● {comp.status}
                    </Badge>
                    <span className="text-[10px] text-[#A0AEA5] font-mono font-bold">PIN: {comp.code}</span>
                  </div>

                  <h3 className="text-base font-bold font-display text-[#F2F7F3] group-hover:text-[#65F59A] transition-colors line-clamp-2 mb-2">
                    {comp.title}
                  </h3>
                  <p className="text-xs text-[#A0AEA5] line-clamp-2 mb-4 leading-relaxed font-sans">{comp.description}</p>

                  <div className="space-y-2 text-xs font-mono text-[#A0AEA5] mb-6 border-t border-[rgba(160,190,170,0.12)] pt-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-[#69786F]">
                        <Users className="w-3.5 h-3.5 mr-1.5 text-[#38D9B0]" /> HOST
                      </span>
                      <span className="font-bold text-[#F2F7F3] truncate max-w-[150px]">
                        {comp.hostName || "Authorized Host"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center text-[#69786F]">
                        <Clock className="w-3.5 h-3.5 mr-1.5 text-[#65F59A]" /> DURATION
                      </span>
                      <span className="font-bold text-[#F2F7F3]">{comp.durationMinutes} MINS</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[rgba(160,190,170,0.12)] flex items-center justify-between">
                  <Link href={`/live/arena/${comp.code}`}>
                    <Button size="sm" className="bg-[#17251E] hover:bg-[#65F59A] text-[#65F59A] hover:text-[#070B0A] border border-[rgba(101,245,154,0.3)] font-mono text-xs tracking-wider rounded-[4px] font-bold transition-all">
                      <Swords className="w-3.5 h-3.5 mr-1.5" /> JOIN BATTLE
                    </Button>
                  </Link>

                  {canHost && (
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(comp.id)} className="h-8 w-8 text-[#A0AEA5] hover:text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] rounded-[3px]">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Join Modal */}
      <JoinCompetitionModal
        open={joinModalOpen}
        onOpenChange={setJoinModalOpen}
        onJoinSuccess={(code) => (window.location.href = `/live/arena/${code}`)}
      />
    </div>
  );
}
