"use client";

import { useAuth } from "@/components/auth/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizeRoomCode } from "@/lib/live/liveSessionManager";
import { PublicSessionState } from "@/lib/live/types";
import { AlertCircle,ArrowRight,Key,QrCode,RefreshCw,ShieldCheck,Trophy,User } from "lucide-react";
import { useRouter,useSearchParams } from "next/navigation";
import React,{ useEffect,useState } from "react";
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
  const [sessionMeta, setSessionMeta] = useState<PublicSessionState | null>(null);
  const [validating, setValidating] = useState<boolean>(false);
  const [joining, setJoining] = useState<boolean>(false);
  const [errorStatus, setErrorStatus] = useState<string | null>(null);

  // Keep name empty by default so each participant fills their own name
  // If code in URL changes, normalize and set
  useEffect(() => {
    if (codeFromUrl) {
      queueMicrotask(() => setCode(normalizeRoomCode(codeFromUrl)));
    }
  }, [codeFromUrl]);

  // Validate room code against live server
  useEffect(() => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode.length < 4) {
      queueMicrotask(() => {
        setSessionMeta(null);
        setErrorStatus(null);
      });
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
      } catch {
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
        // Navigate directly to public live arena
        router.push(`/live/arena/${cleanCode}`);
      } else {
        toast.error(data.error || "Failed to join session");
        setErrorStatus(data.error);
      }
    } catch {
      toast.error("Failed to connect to arena session");
    } finally {
      setJoining(false);
    }
  };

  return (
    <div className="max-w-md mx-auto w-full space-y-6">
      {/* Editorial Header */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center space-x-2 border border-[rgba(255, 77, 109,0.3)] bg-[rgba(255, 77, 109,0.12)] px-3 py-1 rounded-[3px] shadow-xs">
          <span className="h-2 w-2 rounded-full bg-[#FF4D6D] animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#FF4D6D] font-bold">
            LIVE ARENA // REAL-TIME ACCESS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center justify-center">
          <Trophy className="w-6 h-6 text-[#FF4D6D] mr-2" /> Enter Live Arena
        </h1>
        <p className="text-xs font-mono text-[#A0AEA5]">
          Enter your room PIN or join via scannable QR link to participate in live tournaments.
        </p>
      </div>

      <form
        onSubmit={handleJoin}
        className="bg-[#140C0E] p-6 sm:p-8 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xl space-y-5"
      >
        {/* Room PIN Code Input */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5]">
            Competition Room PIN
          </label>
          <div className="relative">
            <Key className="absolute left-3.5 top-3.5 h-4 w-4 text-[#69786F]" />
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. QD-8492"
              className="pl-10 h-12 text-lg font-mono font-extrabold tracking-widest text-center uppercase bg-[#1D1013] border-[rgba(240, 160, 180,0.2)] text-[#F2F7F3] rounded-[4px] focus:border-[#FF4D6D]"
              maxLength={10}
              required
            />
            {validating && (
              <RefreshCw className="absolute right-3.5 top-3.5 h-4 w-4 text-[#FF4D6D] animate-spin" />
            )}
          </div>
        </div>

        {/* Live Session Preview Banner if PIN is recognized */}
        {sessionMeta && (
          <div className="p-4 rounded-[4px] bg-[#2A141A] text-[#F2F7F3] border border-[rgba(255, 77, 109,0.3)] space-y-2">
            <div className="flex items-center justify-between">
              <Badge className="bg-[rgba(255, 77, 109,0.18)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.4)] font-mono text-[10px] uppercase font-bold">
                {sessionMeta.status === "WAITING" ? "Waiting Lobby" : sessionMeta.status}
              </Badge>
              <span className="text-[10px] font-mono text-[#A0AEA5]">
                {sessionMeta.participantsCount} participants ready
              </span>
            </div>
            <h3 className="text-sm font-bold font-display text-[#F2F7F3]">{sessionMeta.title}</h3>
            <p className="text-[11px] text-[#A0AEA5]">
              Host: <span className="font-semibold text-[#F2F7F3]">{sessionMeta.hostName}</span>
            </p>
          </div>
        )}

        {/* Error / Status Alert */}
        {errorStatus && (
          <div className="p-3 rounded-[4px] bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.3)] text-[#F87171] text-xs font-mono flex items-center space-x-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-[#F87171]" />
            <span>{errorStatus}</span>
          </div>
        )}

        {/* Participant Name Input */}
        <div className="space-y-1.5">
          <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-[#A0AEA5]">
            Your Display Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-3.5 h-4 w-4 text-[#69786F]" />
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name or callsign..."
              className="pl-10 h-11 text-sm font-semibold bg-[#1D1013] border-[rgba(240, 160, 180,0.2)] text-[#F2F7F3] rounded-[4px] focus:border-[#FF4D6D]"
              maxLength={30}
              required
            />
          </div>
          <p className="text-[10px] font-mono text-[#69786F]">
            This name will identify you on the live competition leaderboard
          </p>
        </div>

        {/* Submit Join Button */}
        <Button
          type="submit"
          disabled={joining || !code || (Boolean(sessionMeta) && sessionMeta?.status === "ENDED")}
          className="w-full h-12 bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono font-bold text-xs tracking-wider rounded-[4px] shadow-[0_0_15px_rgba(255, 77, 109,0.18)] flex items-center justify-center space-x-2 transition-all hover:shadow-[0_0_24px_rgba(255, 77, 109,0.3)]"
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
        <div className="pt-3 border-t border-[rgba(240, 160, 180,0.12)] flex items-center justify-between text-[11px] text-[#A0AEA5] font-mono">
          <span className="flex items-center">
            <QrCode className="w-3.5 h-3.5 mr-1 text-[#FF758F]" /> Direct QR Scannable
          </span>
          <span className="flex items-center text-[#FF4D6D] font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Encrypted Session
          </span>
        </div>
      </form>
    </div>
  );
}
