import React from "react";
import Link from "next/link";
import { AssignmentItem } from "@/lib/types/academic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, CheckCircle2, Play, FileText, ArrowRight } from "lucide-react";

interface AssignmentCardProps {
  assignment: AssignmentItem;
  onStart?: () => void;
}

export function AssignmentCard({ assignment, onStart }: AssignmentCardProps) {
  const isHomework = assignment.type === "homework";

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Badge className={isHomework ? "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300" : "bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300"}>
            {isHomework ? "Homework" : "Quiz Assignment"}
          </Badge>
          <span className="text-xs text-gray-400 font-semibold">{assignment.className}</span>
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white">{assignment.title}</h3>

        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span className="flex items-center text-red-500 font-semibold">
            <Clock className="w-3.5 h-3.5 mr-1" /> Due: {assignment.dueDate} at {assignment.dueTime}
          </span>
          <span>•</span>
          <span>Instructor: {assignment.teacherName}</span>
        </div>
      </div>

      <div className="shrink-0 w-full sm:w-auto text-right">
        {assignment.quizId ? (
          <Link href={`/dashboard/quizzes/${assignment.quizId}/take`}>
            <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl w-full sm:w-auto">
              <Play className="w-3.5 h-3.5 mr-1.5 fill-current" /> Start Quiz Now
            </Button>
          </Link>
        ) : (
          <Button size="sm" variant="outline" className="text-xs font-semibold rounded-xl w-full sm:w-auto">
            Submit Homework <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
