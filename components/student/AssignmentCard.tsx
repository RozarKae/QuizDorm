import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssignmentItem } from "@/lib/types/academic";
import { ArrowRight,Clock,Play } from "lucide-react";
import Link from "next/link";

interface AssignmentCardProps {
  assignment: AssignmentItem;
  onStart?: () => void;
}

export function AssignmentCard({ assignment }: AssignmentCardProps) {
  const isHomework = assignment.type === "homework";

  return (
    <div className="bg-[#140C0E] p-5 sm:p-6 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] hover:border-[#FF4D6D]/40 shadow-xs hover:shadow-[0_8px_20px_rgba(0,0,0,0.5),0_0_12px_rgba(255, 77, 109,0.06)] transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge
            variant="outline"
            className={`text-[9px] font-mono uppercase tracking-widest rounded-[3px] px-2 py-0.5 ${
              isHomework
                ? "bg-[rgba(251,191,36,0.12)] text-[#FBBF24] border-[rgba(251,191,36,0.3)]"
                : "bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border-[rgba(255, 77, 109,0.3)]"
            }`}
          >
            {isHomework ? "Homework" : "Quiz Assignment"}
          </Badge>
          <span className="text-[11px] font-mono text-[#A0AEA5]">{assignment.className}</span>
        </div>

        <h3 className="text-base font-bold font-display text-[#F2F7F3]">{assignment.title}</h3>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-[#A0AEA5]">
          <span className="flex items-center text-[#F87171] font-semibold">
            <Clock className="w-3.5 h-3.5 mr-1" /> Due: {assignment.dueDate} at {assignment.dueTime}
          </span>
          <span className="text-[#69786F]">•</span>
          <span>Instructor: {assignment.teacherName}</span>
        </div>
      </div>

      <div className="shrink-0 w-full sm:w-auto text-right">
        {assignment.quizId ? (
          <Link href={`/dashboard/quizzes/${assignment.quizId}/take`}>
            <Button
              size="sm"
              className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono font-bold text-xs rounded-[4px] px-5 h-9 w-full sm:w-auto shadow-[0_0_12px_rgba(255, 77, 109,0.18)]"
            >
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Start Quiz Now
            </Button>
          </Link>
        ) : (
          <Button
            size="sm"
            variant="outline"
            className="text-xs font-mono border-[rgba(240, 160, 180,0.18)] rounded-[4px] text-[#A0AEA5] hover:text-[#F2F7F3] hover:border-[#FF4D6D]/30 h-9 w-full sm:w-auto"
          >
            Submit Homework <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
