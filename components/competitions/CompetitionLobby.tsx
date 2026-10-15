"use client";

import React, { useState } from "react";
import { CompetitionItem, LiveParticipant, AnnouncementItem } from "@/lib/types/competition";
import { SessionQrCard } from "./SessionQrCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Play, Megaphone, Send, Sparkles, Clock, ShieldCheck, UserCheck } from "lucide-react";
import { toast } from "sonner";

interface CompetitionLobbyProps {
  competition: CompetitionItem;
  participants: LiveParticipant[];
  announcements: AnnouncementItem[];
  isHost?: boolean;
  currentParticipantName?: string;
  onStartCompetition?: () => void;
  onPostAnnouncement?: (text: string) => void;
  onKickParticipant?: (id: string) => void;
}

export function CompetitionLobby({
  competition,
  participants,
  announcements,
  isHost = true,
  currentParticipantName,
  onStartCompetition,
  onPostAnnouncement,
  onKickParticipant,
}: CompetitionLobbyProps) {
  const [announcementText, setAnnouncementText] = useState("");
  const [isStarting, setIsStarting] = useState(false);

  const roomCode = competition.code || "QD-8492";

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText.trim()) return;
    if (onPostAnnouncement) onPostAnnouncement(announcementText.trim());
    setAnnouncementText("");
    toast.success("Broadcast announcement sent!");
  };

  const handleStart = () => {
    setIsStarting(true);
    if (onStartCompetition) {
      onStartCompetition();
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Room PIN + QR Card */}
      <div className="bg-[#111318] text-white p-6 sm:p-8 rounded-[4px] border border-border shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle grid watermark */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-[2px] bg-[#E85D3F]/20 text-[#E85D3F] border border-[#E85D3F]/40 text-[10px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>LIVE ARENA // WAITING LOBBY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F7F5EF]">
            {competition.title}
          </h1>
          <p className="text-[#E7E5DF]/80 text-xs sm:text-sm">
            Host: <span className="font-semibold text-white">{competition.hostName || "Federation Host"}</span> • Quiz:{" "}
            <span className="text-[#DFFF43] font-mono">{competition.quizTitle || "Championship Knowledge Quiz"}</span>
          </p>

          {!isHost && (
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-[3px] bg-white/10 text-xs font-mono text-white border border-white/20">
                <UserCheck className="w-3.5 h-3.5 text-[#DFFF43]" />
                <span>Enrolled as: <strong className="text-white">{currentParticipantName || "Participant"}</strong></span>
              </div>
            </div>
          )}
        </div>

        {/* QR Code Specimen Card with Real-time Scannable Link */}
        <div className="w-full lg:w-auto relative z-10 shrink-0">
          <SessionQrCard
            code={roomCode}
            competitionTitle={competition.title}
            className="w-full sm:w-80"
          />
        </div>
      </div>

      {/* Host Controls & Actions Bar */}
      {isHost ? (
        <div className="bg-card p-4 rounded-[4px] border border-border shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-mono text-xs font-bold px-3 py-1">
              <Users className="w-3.5 h-3.5 mr-1.5" /> {participants.length} Contenders Ready
            </Badge>
            <span className="text-xs font-mono text-muted-foreground">
              ● Room Unlocked for QR & PIN Join
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleStart}
              disabled={isStarting}
              className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs font-bold tracking-wider rounded-[3px] px-6 py-2.5 shadow-sm animate-pulse"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              {isStarting ? "Starting Live Competition..." : "Start Live Competition Now"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-card p-4 rounded-[4px] border border-border shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-muted-foreground">
              Waiting for host to start the competition...
            </span>
          </div>
          <Badge className="bg-muted text-muted-foreground font-mono text-xs">
            <Users className="w-3 h-3 mr-1" /> {participants.length} Active in Room
          </Badge>
        </div>
      )}

      {/* Grid Layout: Live Participants vs Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 cols: Participants Roster */}
        <div className="lg:col-span-8 bg-card p-6 rounded-[4px] border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center">
              <Users className="w-4 h-4 text-[#2855F5] mr-2" />
              <span>Connected Participants ({participants.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> SYNCHRONIZED MESH
            </span>
          </div>

          {participants.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground font-mono text-xs">
              <Clock className="w-6 h-6 mx-auto mb-2 text-muted-foreground opacity-60" />
              Waiting for first contender to join via QR code or PIN {roomCode}...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="p-3 rounded-[3px] border border-border bg-background flex items-center justify-between text-xs group hover:border-[#2855F5] transition-all"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <div className="w-7 h-7 rounded-[2px] bg-[#2855F5] text-white font-mono font-bold text-xs flex items-center justify-center shrink-0">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-foreground truncate">{p.name}</span>
                  </div>
                  {isHost && onKickParticipant && (
                    <button
                      type="button"
                      onClick={() => onKickParticipant(p.id)}
                      className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold ml-1 hover:scale-125"
                      title="Remove contender from room"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 4 cols: Live Announcements */}
        <div className="lg:col-span-4 bg-card p-6 rounded-[4px] border border-border shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-foreground flex items-center">
              <Megaphone className="w-4 h-4 text-[#2855F5] mr-2" /> Live Broadcasts
            </h3>
          </div>

          {isHost && (
            <form onSubmit={handleSendAnnouncement} className="flex space-x-2">
              <Input
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Broadcast a note to all..."
                className="text-xs h-9 font-mono rounded-[3px] border-border bg-background"
              />
              <Button
                type="submit"
                size="sm"
                className="bg-[#2855F5] text-white shrink-0 rounded-[3px] h-9 px-3"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          )}

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="p-3 rounded-[3px] bg-muted/50 border border-border space-y-1 text-xs font-mono"
              >
                <div className="flex justify-between font-bold text-foreground text-[11px]">
                  <span>{a.author || a.authorName || "Host"}</span>
                  <span className="text-[10px] text-muted-foreground">{a.timestamp}</span>
                </div>
                <p className="text-muted-foreground leading-relaxed font-sans">{a.text || a.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
