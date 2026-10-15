"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Trophy, Key, User, QrCode, ArrowRight, ShieldCheck, AlertCircle, CheckCircle2, Sparkles, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/components/auth/AuthProvider";
import { normalizeRoomCode } from "@/lib/live/liveSessionManager";
import { toast } from "sonner";

interface JoinArenaFormProps {
  initialCode?: string;
}

export function JoinArenaForm({ initialCode = "" }: JoinArenaFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { profile, user } = useAuth();

  const codeFromUrl = searchParams.get("code") || initialCode;

  const [code, setCode] = useState<string>(codeFromUrl ? normalizeRoomCode(codeFromUrl) : "");
  const [name, setName] = useState<string>("");
  const [sessionMeta, setSessionMeta] = useState<any>(null);
  const [validating, setValidating] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Auto-fill participant name if logged in
  useEffect(() => {
    if (profile?.name && !name) {
      setName(profile.name);
    }
  }, [profile, name]);

  // If code in URL changes, normalize and set
  useEffect(() => {
    if (codeFromUrl) {
      setCode(normalizeRoomCode(codeFromUrl));
    }
  }, [codeFromUrl]);

  // Validate room code against live server
  useEffect(() => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode.length < 4) {
      setSessionMeta(null);
      setErrorStatus(null);
      return;
    }

    const timer = setTimeout(async () => {
      setValidating(true);
      setErrorStatus(null);
      try {
        const norm = normalizeRoomCode(cleanCode);
        const res = await fetch(`/api/live/session/${encodeURIComponent(norm)}`);
        const data = await res.json();
        if (data.success && data.session) {
          setSessionMeta(data.session);
          if (data.session.status === "ENDED") {
            setErrorStatus("This live competition has already concluded.");
          } else {
            setErrorStatus(null);
          }
        } else {
          setSessionMeta(null);
          setErrorStatus(data.error || "Room PIN not found. Please check with your event host.");
        }
      } catch (err) {
        setErrorStatus("Network error validating room code.");
      } finally {
        setValidating(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [code]);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = normalizeRoomCode(code);
    if (!cleanCode) {
      toast.error("Please enter a valid competition room PIN");
      return;
    }

    const participantName = (name || profile?.name || "Contender").trim();
    if (!participantName) {
      toast.error("Please enter your display name to enter the arena");
      return;
    }

    setJoining(true);
    try {
      const res = await fetch(`/api/live/session/${encodeURIComponent(cleanCode)}/join`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: participantName,
          userId: user?.id,
          avatarUrl: profile?.avatar,
        }),
      });

      const data = await res.json();
      if (data.success) {
        if (typeof window !== "undefined") {
          sessionStorage.setItem(`quizdorm_pid_${cleanCode}`, data.participantId);
          localStorage.setItem(`quizdorm_pid_${cleanCode}`, data.participantId);
          localStorage.setItem("quizdorm_participant_name", participantName);
        }
        toast.success(`Entered arena for ${data.session?.title || cleanCode}!`);
        // Navigate to the live arena room
        const destId = data.session?.competitionId || data.session?.id || "comp-1";
        router.push(`/dashboard/competitions/${destId}/live?code=${cleanCode}&role=participant`);
      } else {
        toast.error(data.error || "Failed to join session");
        setErrorStatus(data.error);
      }
    } catch (err: any) {
      toast.error("Failed to connect to arena session");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-6">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 border border-border bg-card px-3 py-1 rounded-[2px] shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[#E85D3F] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foreground font-semibold">
            LIVE ARENA // REAL-TIME ACCESS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-foreground flex items-center justify-center">
          <Trophy className="w-6 h-6 text-[#2855F5] mr-2" /> Enter Live Competition
        </h1>
        <p className="text-xs text-muted-foreground">
          Enter your room PIN or join via scannable QR link to participate in live quiz tournaments.
        </p>
      </div>

      <form
        onSubmit={handleJoin}
        className="bg-card p-6 sm:p-8 rounded-[4px] border border-border shadow-md space-y-5"
      >
        {/* Room PIN Code Input */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Competition Room PIN
          </label>
          <div className="relative">
            <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. QD-8492"
              className="pl-10 h-12 text-lg font-mono font-extrabold tracking-widest text-center uppercase bg-background border-border rounded-[3px]"
              maxLength={10}
              required
            />
            {validating && (
              <RefreshCw className="absolute right-3.5 top-3.5 h-4 w-4 text-muted-foreground animate-spin" />
            )}
          </div>
        </div>

        {/* Live Session Preview Banner if PIN is recognized */}
        {sessionMeta && (
          <div className="p-4 rounded-[3px] bg-[#111318] text-white border border-white/10 space-y-2">
            <div className="flex items-center justify-between">
              <Badge className="bg-[#E85D3F]/20 text-[#E85D3F] border border-[#E85D3F]/40 font-mono text-[10px] uppercase">
                {sessionMeta.status === "WAITING" ? "Waiting Lobby" : sessionMeta.status}
              </Badge>
              <span className="text-[10px] font-mono text-white/60">
                {sessionMeta.participantsCount} participants ready
              </span>
            </div>
            <h3 className="text-sm font-bold font-display text-white">{sessionMeta.title}</h3>
            <p className="text-[11px] text-white/70">
              Host: <span className="font-semibold text-white">{sessionMeta.hostName}</span>
            </p>
          </div>
        )}

        {/* Error / Status Alert */}
        {errorStatus && (
          <div className="p-3 rounded-[3px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 text-xs flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
            <span>{errorStatus}</span>
          </div>
        )}

        {/* Participant Name Input */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-muted-foreground">
            Your Display Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera"
              className="pl-10 h-11 text-sm font-semibold bg-background border-border rounded-[3px]"
              maxLength={30}
              required
            />
          </div>
          <p className="text-[10px] text-muted-foreground">
            {profile?.name
              ? "Auto-filled from your authenticated student account"
              : "This name will appear on the live competition leaderboard"}
          </p>
        </div>

        {/* Submit Join Button */}
        <Button
          type="submit"
          disabled={joining || !code || (Boolean(sessionMeta) && sessionMeta?.status === "ENDED")}
          className="w-full h-12 bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono font-bold text-xs tracking-wider rounded-[3px] shadow-sm flex items-center justify-center space-x-2"
        >
          {joining ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin mr-2" />
              <span>Entering Live Arena...</span>
            </>
          ) : (
            <>
              <span>Enter Competition Arena</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>

        {/* QR Scan / Help Strip */}
        <div className="pt-3 border-t border-border flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span className="flex items-center">
            <QrCode className="w-3.5 h-3.5 mr-1 text-[#2855F5]" /> Direct QR Scannable
          </span>
          <span className="flex items-center text-emerald-600 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Encrypted Session
          </span>
        </div>
      </form>
    </div>
  );
}
