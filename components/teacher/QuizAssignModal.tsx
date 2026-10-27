import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BookOpen } from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

interface QuizAssignModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAssignSuccess?: () => void;
}

export function QuizAssignModal({ open, onOpenChange, onAssignSuccess }: QuizAssignModalProps) {
  const [quizId, setQuizId] = useState("q-101");
  const [classId, setClassId] = useState("cls-1");
  const [dueDate, setDueDate] = useState("2026-07-28");
  const [dueTime, setDueTime] = useState("23:59");
  const [attemptLimit, setAttemptLimit] = useState("1");
  const [loading, setLoading] = useState(false);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Quiz assignment published to classroom students!");
      onOpenChange(false);
      if (onAssignSuccess) onAssignSuccess();
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center text-gray-900 dark:text-white">
            <BookOpen className="w-5 h-5 text-indigo-600 mr-2" /> Assign Quiz to Class
          </DialogTitle>
          <DialogDescription>
            Select quiz assessment, target classroom, due date deadline, and attempt rules.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleAssign} className="space-y-4 py-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Select Quiz</label>
            <Select
              value={quizId}
              onChange={(e) => setQuizId(e.target.value)}
              options={[
                { value: "q-101", label: "Advanced Algebra & Calculus Challenge" },
                { value: "q-102", label: "Organic Chemistry & Molecular Structures" },
              ]}
              className="text-xs h-10"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Target Classroom</label>
            <Select
              value={classId}
              onChange={(e) => setClassId(e.target.value)}
              options={[
                { value: "cls-1", label: "Grade 12-A Calculus" },
                { value: "cls-2", label: "Grade 11-B Physics" },
              ]}
              className="text-xs h-10"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Due Date</label>
              <Input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="text-xs h-10" />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Due Time</label>
              <Input type="time" value={dueTime} onChange={(e) => setDueTime(e.target.value)} className="text-xs h-10" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Attempt Limit</label>
            <Select
              value={attemptLimit}
              onChange={(e) => setAttemptLimit(e.target.value)}
              options={[
                { value: "1", label: "1 Attempt Only (Single Attempt)" },
                { value: "2", label: "2 Attempts Allowed" },
                { value: "unlimited", label: "Unlimited Practice Attempts" },
              ]}
              className="text-xs h-10"
            />
          </div>

          <DialogFooter className="mt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold">
              {loading ? "Publishing..." : "Publish Assignment"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
