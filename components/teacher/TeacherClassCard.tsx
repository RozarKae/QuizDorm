import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClassItem } from "@/lib/types/academic";
import { ArrowRight,BookOpen,GraduationCap } from "lucide-react";

interface TeacherClassCardProps {
  classItem: ClassItem;
  onAssignQuiz?: (classId: string) => void;
}

export function TeacherClassCard({ classItem, onAssignQuiz }: TeacherClassCardProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px] font-bold">
            {classItem.department}
          </Badge>
          <span className="text-xs text-gray-400 font-mono font-bold">PIN: {classItem.code}</span>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">{classItem.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{classItem.description || "Academic classroom group"}</p>

        <div className="grid grid-cols-2 gap-3 p-3 bg-gray-50/50 dark:bg-gray-900/50 rounded-2xl border border-gray-100 dark:border-gray-850 text-xs mb-4">
          <div className="flex items-center space-x-2">
            <GraduationCap className="w-4 h-4 text-rose-600" />
            <div>
              <p className="font-extrabold text-gray-900 dark:text-white">{classItem.studentCount}</p>
              <p className="text-[10px] text-gray-400">Students</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-indigo-600" />
            <div>
              <p className="font-extrabold text-gray-900 dark:text-white">{classItem.quizCount}</p>
              <p className="text-[10px] text-gray-400">Active Quizzes</p>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-900 flex items-center justify-between">
        <span className="text-[11px] text-gray-400">Year: {classItem.academicYear}</span>
        {onAssignQuiz && (
          <Button
            onClick={() => onAssignQuiz(classItem.id)}
            size="sm"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl"
          >
            Assign Quiz <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
}
