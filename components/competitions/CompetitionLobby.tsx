"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnnouncementItem,CompetitionItem,LiveParticipant } from "@/lib/types/competition";
import { Clock,Megaphone,Play,Send,ShieldCheck,Sparkles,UserCheck,Users } from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";
import { SessionQrCard } from "./SessionQrCard";

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
      <div className="bg-[#140C0E] text-[#F2F7F3] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Subtle emerald ambient glow in lobby */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle at 20% 20%, rgba(255, 77, 109, 0.08), transparent 60%)",
          }}
        />

        <div className="space-y-3 max-w-xl relative z-10">
          <div className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] text-[10px] font-mono font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5 fill-current" />
            <span>LIVE ARENA // WAITING LOBBY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3]">
            {competition.title}
          </h1>
          <p className="text-[#A0AEA5] text-xs sm:text-sm">
            Host: <span className="font-semibold text-[#F2F7F3]">{competition.hostName || "Arena Federation"}</span> • Quiz:{" "}
            <span className="text-[#FF758F] font-mono">{competition.quizTitle || "Championship Knowledge Challenge"}</span>
          </p>

          {!isHost && (
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-[4px] bg-[#1D1013] text-xs font-mono text-[#F2F7F3] border border-[rgba(240, 160, 180,0.18)]">
                <UserCheck className="w-3.5 h-3.5 text-[#FF4D6D]" />
                <span>Enrolled as: <strong className="text-[#FF4D6D]">{currentParticipantName || "Participant"}</strong></span>
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
        <div className="bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <Badge className="bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] font-mono text-xs font-bold px-3 py-1">
              <Users className="w-3.5 h-3.5 mr-1.5" /> {participants.length} Contenders Ready
            </Badge>
            <span className="text-xs font-mono text-[#A0AEA5]">
              ● Room Unlocked for QR & PIN Join
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={handleStart}
              disabled={isStarting}
              className="font-mono text-xs font-bold tracking-wider rounded-[4px] px-6 py-2.5 shadow-[0_0_16px_rgba(255, 77, 109,0.25)] animate-pulse"
            >
              <Play className="w-4 h-4 mr-2 fill-current" />
              {isStarting ? "Starting Live Competition..." : "Start Live Competition Now"}
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] animate-ping" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#A0AEA5]">
              Waiting for host to start the competition...
            </span>
          </div>
          <Badge className="bg-[#1D1013] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.14)] font-mono text-xs">
            <Users className="w-3 h-3 mr-1 text-[#FF4D6D]" /> {participants.length} Active in Room
          </Badge>
        </div>
      )}

      {/* Grid Layout: Live Participants vs Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 8 cols: Participants Roster */}
        <div className="lg:col-span-8 bg-[#140C0E] p-5 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
              <Users className="w-4 h-4 text-[#FF4D6D] mr-2" />
              <span>Connected Participants ({participants.length})</span>
            </h3>
            <span className="text-[10px] font-mono text-[#FF758F] font-bold flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> SYNCHRONIZED MESH
            </span>
          </div>

          {participants.length === 0 ? (
            <div className="text-center py-10 text-[#69786F] font-mono text-xs">
              <Clock className="w-6 h-6 mx-auto mb-2 text-[#69786F] opacity-60" />
              Waiting for first contender to join via QR code or PIN {roomCode}...
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-80 overflow-y-auto pr-1">
              {participants.map((p) => (
                <div
                  key={p.id}
                  className="p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] flex items-center justify-between text-xs group hover:border-[#FF4D6D]/50 transition-all"
                >
                  <div className="flex items-center space-x-2 truncate">
                    <div className="w-6 h-6 rounded-[3px] bg-[#2A141A] text-[#FF4D6D] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-[rgba(255, 77, 109,0.2)]">
                      {p.name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold text-[#F2F7F3] truncate text-[11px]">{p.name}</span>
                  </div>
                  {isHost && onKickParticipant && (
                    <button
                      type="button"
                      onClick={() => onKickParticipant(p.id)}
                      className="text-[#F87171] opacity-0 group-hover:opacity-100 transition-opacity font-bold ml-1 hover:scale-125"
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
        <div className="lg:col-span-4 bg-[#140C0E] p-5 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center">
              <Megaphone className="w-4 h-4 text-[#FF758F] mr-2" /> Live Broadcasts
            </h3>
          </div>

          {isHost && (
            <form onSubmit={handleSendAnnouncement} className="flex space-x-2">
              <Input
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Broadcast a note to all..."
                className="text-xs h-8 font-mono rounded-[4px] border-[rgba(240, 160, 180,0.18)] bg-[#2A141A]"
              />
              <Button
                type="submit"
                size="sm"
                className="shrink-0 rounded-[4px] h-8 px-3"
              >
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          )}

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="p-3 rounded-[4px] bg-[#1D1013] border border-[rgba(240, 160, 180,0.12)] space-y-1 text-xs font-mono"
              >
                <div className="flex justify-between font-bold text-[#F2F7F3] text-[11px]">
                  <span>{a.author || a.authorName || "Host"}</span>
                  <span className="text-[10px] text-[#69786F]">{a.timestamp}</span>
                </div>
                <p className="text-[#A0AEA5] leading-relaxed font-sans">{a.text || a.content}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
