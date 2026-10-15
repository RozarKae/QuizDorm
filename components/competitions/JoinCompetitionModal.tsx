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
        router.push(`/student/live/join?code=${encodeURIComponent(cleanCode)}`);
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
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center text-foreground font-display font-extrabold">
            <Trophy className="w-5 h-5 text-[#2855F5] mr-2" /> Join Live Competition Arena
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Enter the 6-character competition PIN code provided by your event host to enter the live arena.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleJoin} className="space-y-4 py-2">
          <div className="space-y-2">
            <div className="relative">
              <Key className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
              <Input
                value={code}
                onChange={(e) => {
                  setCode(e.target.value.toUpperCase());
                  setErrorMessage(null);
                }}
                placeholder="e.g. QD-8492"
                className="pl-10 h-12 text-base font-mono font-bold tracking-widest text-center uppercase bg-background border-border rounded-[3px]"
                maxLength={10}
              />
            </div>

            {errorMessage && (
              <div className="p-2.5 rounded-[3px] bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-red-800 dark:text-red-200 text-xs flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5 text-red-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}
          </div>

          <div
            onClick={handleScanClick}
            className="p-4 rounded-[4px] bg-background border border-border text-center space-y-1.5 cursor-pointer hover:border-[#2855F5] transition-colors"
          >
            <QrCode className="w-7 h-7 text-[#2855F5] mx-auto" />
            <p className="text-xs font-semibold text-foreground">Or scan host QR Code from your phone</p>
            <p className="text-[10px] text-muted-foreground font-mono">
              Open https://quizclassroom.versal.app/join from any mobile device
            </p>
          </div>

          <DialogFooter className="mt-4 flex gap-2 sm:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="text-xs font-mono rounded-[3px]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading || !code}
              className="bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs font-bold rounded-[3px]"
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
