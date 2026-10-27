import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { AlertTriangle,CheckCircle2 } from "lucide-react";

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
          <DialogTitle className="flex items-center text-[#F2F7F3] font-display text-base">
            <CheckCircle2 className="w-5 h-5 text-[#FF4D6D] mr-2" /> Confirm Assessment Submission
          </DialogTitle>
          <DialogDescription className="text-xs text-[#A0AEA5]">
            Confirm your responses before concluding this timed assessment session.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-3">
          {/* Answer Breakdown */}
          <div className="grid grid-cols-3 gap-2.5 text-center font-mono">
            <div className="p-3 bg-[rgba(255, 77, 109,0.1)] border border-[rgba(255, 77, 109,0.25)] rounded-[4px]">
              <p className="text-xl font-extrabold text-[#FF4D6D]">{answeredCount} / {totalQuestions}</p>
              <p className="text-[10px] text-[#A0AEA5] font-semibold uppercase tracking-wider">Answered</p>
            </div>
            <div className="p-3 bg-[#2A141A] border border-[rgba(240, 160, 180,0.14)] rounded-[4px]">
              <p className="text-xl font-extrabold text-[#A0AEA5]">{unansweredCount}</p>
              <p className="text-[10px] text-[#69786F] font-semibold uppercase tracking-wider">Unanswered</p>
            </div>
            <div className="p-3 bg-[rgba(248,113,113,0.1)] border border-[rgba(248,113,113,0.25)] rounded-[4px]">
              <p className="text-xl font-extrabold text-[#F87171]">{markedCount}</p>
              <p className="text-[10px] text-[#F87171] font-semibold uppercase tracking-wider">Review</p>
            </div>
          </div>

          {/* Unanswered Warning */}
          {unansweredCount > 0 && (
            <div className="p-3 rounded-[4px] bg-[rgba(251,191,36,0.1)] border border-[rgba(251,191,36,0.25)] text-[#FBBF24] text-xs font-mono flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4 shrink-0 text-[#FBBF24]" />
              <span>Notice: {unansweredCount} questions remain unrecorded.</span>
            </div>
          )}

          <div className="flex items-center justify-between text-xs font-mono text-[#A0AEA5] pt-1">
            <span>Remaining Time:</span>
            <span className="font-bold text-[#FF4D6D]">{timeRemaining}</span>
          </div>
        </div>

        <DialogFooter className="mt-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Resume Session
          </Button>
          <Button size="sm" onClick={onConfirmSubmit} className="font-mono font-semibold">
            Final Submit Now
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
