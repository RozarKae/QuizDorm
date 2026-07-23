import React from "react";
import { AlertTriangle, CheckCircle2, Clock, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface SubmissionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  totalQuestions: number;
  answeredCount: number;
  unansweredCount: number;
  markedCount: number;
  timeRemaining: string;
  onConfirmSubmit: () => void;
}

export function SubmissionModal({
  open,
  onOpenChange,
  totalQuestions,
  answeredCount,
  unansweredCount,
  markedCount,
  timeRemaining,
  onConfirmSubmit,
}: SubmissionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <CheckCircle2 className="w-5 h-5 text-indigo-600 mr-2" /> Confirm Quiz Submission
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to finish and submit your quiz answers?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Answer Breakdown */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl">
              <p className="text-xl font-extrabold text-emerald-600">{answeredCount}</p>
              <p className="text-[10px] text-emerald-800 dark:text-emerald-300 font-medium">Answered</p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl">
              <p className="text-xl font-extrabold text-slate-600 dark:text-slate-300">{unansweredCount}</p>
              <p className="text-[10px] text-slate-500 font-medium">Unanswered</p>
            </div>
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/50 rounded-2xl">
              <p className="text-xl font-extrabold text-amber-600">{markedCount}</p>
              <p className="text-[10px] text-amber-800 dark:text-amber-300 font-medium">Marked Review</p>
            </div>
          </div>

          {/* Unanswered Warning */}
          {unansweredCount > 0 && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-200 text-xs flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>You have {unansweredCount} unanswered questions remaining.</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
            <span>Time Remaining:</span>
            <span className="font-mono font-bold text-indigo-600">{timeRemaining}</span>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Continue Quiz
          </Button>
          <Button onClick={onConfirmSubmit} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold">
            Final Submit Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
