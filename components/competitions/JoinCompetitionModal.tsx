import React, { useState } from "react";
import { Trophy, QrCode, Key, CheckCircle2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface JoinCompetitionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onJoinSuccess?: (code: string) => void;
}

export function JoinCompetitionModal({ open, onOpenChange, onJoinSuccess }: JoinCompetitionModalProps) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code || code.trim().length < 4) {
      toast.error("Please enter a valid 6-digit PIN code");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Joined room ${code.toUpperCase()}!`);
      onOpenChange(false);
      if (onJoinSuccess) onJoinSuccess(code);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <Trophy className="w-5 h-5 text-amber-500 mr-2" /> Join Live Competition
          </DialogTitle>
          <DialogDescription>
            Enter the 6-digit competition PIN code provided by your event host to enter the live arena.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleJoin} className="space-y-4 py-2">
          <div className="relative">
            <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <Input
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="e.g. QD-8492"
              className="pl-10 h-12 text-base font-mono font-bold tracking-widest text-center uppercase"
              maxLength={8}
            />
          </div>

          <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-center space-y-2">
            <QrCode className="w-8 h-8 text-indigo-600 mx-auto" />
            <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">Or scan host QR Code from your phone</p>
            <p className="text-[10px] text-gray-400">Direct camera scanner active</p>
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              {loading ? "Joining Arena..." : "Join Game Arena"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
