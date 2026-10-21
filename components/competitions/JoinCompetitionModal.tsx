"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Trophy, QrCode, Key, ArrowRight, RefreshCw, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { normalizeRoomCode } from "@/lib/live/liveSessionManager";
import { toast } from "sonner";

interface JoinCompetitionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoinSuccess?: (code: string) => void;
}

export function JoinCompetitionModal({ open, onOpenChange, onJoinSuccess }: JoinCompetitionModalProps) {
  const router = useRouter();
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = normalizeRoomCode(code);
    if (!cleanCode || cleanCode.length < 4) {
      toast.error("Please enter a valid competition room PIN (e.g. QD-8492)");
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch(`/api/live/session/${encodeURIComponent(cleanCode)}`);
      const data = await res.json();

      if (data.success && data.session) {
        toast.success(`Found live arena: ${data.session.title || cleanCode}!`);
        onOpenChange(false);
        if (onJoinSuccess) onJoinSuccess(cleanCode);
        router.push(`/live/arena/${encodeURIComponent(cleanCode)}`);
      } else {
        setErrorMessage(data.error || "No active arena found with this PIN code.");
        toast.error("Room PIN not found");
      }
    } catch {
      setErrorMessage("Network error validating room PIN.");
      toast.error("Failed to connect to arena");
    } finally {
      setLoading(false);
    }
  };

  const handleScanClick = () => {
    onOpenChange(false);
    router.push("/student/live/join");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#0C1210] border border-[rgba(160,190,170,0.14)] text-[#F2F7F3]">
        <DialogHeader>
          <DialogTitle className="flex items-center text-[#F2F7F3] font-display font-extrabold text-base">
            <Trophy className="w-5 h-5 text-[#65F59A] mr-2" /> Join Live Competition Arena
          </DialogTitle>
          <DialogDescription className="text-xs text-[#A0AEA5]">
            Enter the 6-character competition PIN code provided by your event host to enter the live arena.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleJoin} className="space-y-4 py-2">
          <div className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-3.5 h-4 w-4 text-[#69786F]" />
              <Input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setErrorMessage(null);
                }}
                placeholder="e.g. QD-8492"
                className="pl-10 h-12 text-base font-mono font-extrabold tracking-widest text-center uppercase bg-[#111B17] border-[rgba(160,190,170,0.2)] text-[#F2F7F3] rounded-[4px] focus:border-[#65F59A]"
                maxLength={10}
              />
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-[4px] bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.3)] text-[#F87171] text-xs font-mono flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-[#F87171] shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <div
            onClick={handleScanClick}
            className="p-4 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.16)] text-center space-y-1.5 cursor-pointer hover:border-[#65F59A]/40 transition-colors"
          >
            <QrCode className="w-6 h-6 text-[#38D9B0] mx-auto" />
            <p className="text-xs font-semibold text-[#F2F7F3]">Or scan host QR Code from your phone</p>
            <p className="text-[10px] text-[#A0AEA5] font-mono">
              Open https://quizclassroom.vercel.app/join from any mobile device
            </p>
          </div>

          <DialogFooter className="mt-4 flex gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-xs font-mono rounded-[4px] border-[rgba(160,190,170,0.18)] text-[#A0AEA5] hover:text-[#F2F7F3]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !code}
              className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-[4px] shadow-[0_0_12px_rgba(101,245,154,0.18)]"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  <span>Validating PIN...</span>
                </>
              ) : (
                <>
                  <span>Enter Game Arena</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
