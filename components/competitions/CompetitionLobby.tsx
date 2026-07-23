import React, { useState } from "react";
import { CompetitionItem, LiveParticipant, AnnouncementItem } from "@/lib/types/competition";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Users, Play, Pause, QrCode, Megaphone, Send, ShieldAlert, Sparkles } from "lucide-react";
import { toast } from "sonner";

interface CompetitionLobbyProps {
  competition: CompetitionItem;
  participants: LiveParticipant[];
  announcements: AnnouncementItem[];
  isHost?: boolean;
  onStartCompetition?: () => void;
  onPostAnnouncement?: (text: string) => void;
  onKickParticipant?: (id: string) => void;
}

export function CompetitionLobby({
  competition,
  participants,
  announcements,
  isHost = true,
  onStartCompetition,
  onPostAnnouncement,
  onKickParticipant,
}: CompetitionLobbyProps) {
  const [announcementText, setAnnouncementText] = useState("");

  const handleSendAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announcementText) return;
    if (onPostAnnouncement) onPostAnnouncement(announcementText);
    setAnnouncementText("");
    toast.success("Broadcast announcement sent!");
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Room PIN Code */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-800 p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Waiting Lobby</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">{competition.title}</h1>
          <p className="text-indigo-100 text-xs sm:text-sm">
            Host: <span className="font-semibold text-white">{competition.hostName}</span> • Quiz: {competition.quizTitle}
          </p>
        </div>

        {/* PIN Code Box */}
        <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 text-center shrink-0 w-full sm:w-64">
          <p className="text-[10px] uppercase font-bold text-indigo-200 tracking-wider">GAME PIN CODE</p>
          <p className="text-3xl font-mono font-extrabold tracking-widest text-amber-300 my-1">
            {competition.code || "QD-8492"}
          </p>
          <div className="flex items-center justify-center space-x-1 text-[10px] text-indigo-100">
            <QrCode className="w-3.5 h-3.5" />
            <span>Scan QR or enter PIN at quizdorm.com/join</span>
          </div>
        </div>
      </div>

      {/* Host Controls & Actions Bar */}
      {isHost && (
        <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-semibold text-xs">
              <Users className="w-3.5 h-3.5 mr-1" /> {participants.length} Participants Ready
            </Badge>
          </div>

          <div className="flex items-center space-x-3">
            <Button
              onClick={onStartCompetition}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl px-6 py-2.5 shadow-md animate-pulse"
            >
              <Play className="w-4 h-4 mr-2 fill-current" /> Start Live Competition Now
            </Button>
          </div>
        </div>
      )}

      {/* Grid Layout: Live Participants vs Announcements */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 cols: Participants Roster */}
        <div className="lg:col-span-8 bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center justify-between">
            <span>Joined Participants ({participants.length})</span>
            <span className="text-xs text-emerald-600 font-semibold">● Room Unlocked</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 max-h-80 overflow-y-auto pr-1">
            {participants.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-2xl border border-gray-100 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between text-xs group hover:border-indigo-200 transition-all"
              >
                <div className="flex items-center space-x-2 truncate">
                  <div className="w-7 h-7 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                    {p.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-900 dark:text-white truncate">{p.name}</span>
                </div>
                {isHost && onKickParticipant && (
                  <button
                    type="button"
                    onClick={() => onKickParticipant(p.id)}
                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity font-bold ml-1"
                    title="Remove from room"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right 4 cols: Live Announcements */}
        <div className="lg:col-span-4 bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center">
            <Megaphone className="w-4 h-4 text-indigo-600 mr-2" /> Live Announcements
          </h3>

          {isHost && (
            <form onSubmit={handleSendAnnouncement} className="flex space-x-2">
              <Input
                value={announcementText}
                onChange={(e) => setAnnouncementText(e.target.value)}
                placeholder="Broadcast a note..."
                className="text-xs h-9"
              />
              <Button type="submit" size="sm" className="bg-indigo-600 text-white shrink-0">
                <Send className="w-3.5 h-3.5" />
              </Button>
            </form>
          )}

          <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
            {announcements.map((a) => (
              <div key={a.id} className="p-3 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 space-y-1 text-xs">
                <div className="flex justify-between font-bold text-indigo-900 dark:text-indigo-200">
                  <span>{a.author}</span>
                  <span className="text-[10px] text-gray-400">{a.timestamp}</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
