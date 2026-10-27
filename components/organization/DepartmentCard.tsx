import { Button } from "@/components/ui/button";
import { DepartmentItem } from "@/lib/types/organization";
import { Building2,Edit,Trash2 } from "lucide-react";

interface DepartmentCardProps {
  department: DepartmentItem;
  onEdit?: (dept: DepartmentItem) => void;
  onDelete?: (id: string) => void;
}

export function DepartmentCard({ department, onEdit, onDelete }: DepartmentCardProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex items-center space-x-1">
            {onEdit && (
              <Button variant="ghost" size="icon" onClick={() => onEdit(department)} className="h-8 w-8 text-indigo-600">
                <Edit className="w-4 h-4" />
              </Button>
            )}
            {onDelete && (
              <Button variant="ghost" size="icon" onClick={() => onDelete(department.id)} className="h-8 w-8 text-red-600">
                <Trash2 className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">{department.name}</h3>
        <p className="text-xs text-gray-400 mb-4">{department.description || "Academic department wing"}</p>

        <div className="space-y-2 text-xs text-gray-500 mb-4">
          <div className="flex items-center justify-between">
            <span>Department Head:</span>
            <span className="font-semibold text-gray-800 dark:text-gray-200">{department.headName || "Unassigned"}</span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-gray-900 grid grid-cols-2 gap-2 text-center text-xs">
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <p className="font-extrabold text-indigo-600">{department.memberCount}</p>
          <p className="text-[10px] text-gray-400">Members</p>
        </div>
        <div className="p-2 bg-gray-50 dark:bg-gray-900 rounded-xl">
          <p className="font-extrabold text-indigo-600">{department.quizCount}</p>
          <p className="text-[10px] text-gray-400">Quizzes</p>
        </div>
      </div>
    </div>
  );
}
