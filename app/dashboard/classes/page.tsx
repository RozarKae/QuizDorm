"use client";

import { QuizAssignModal } from "@/components/teacher/QuizAssignModal";
import { TeacherClassCard } from "@/components/teacher/TeacherClassCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassItem } from "@/lib/types/academic";
import { Plus,School,Search } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const mockClasses: ClassItem[] = [
  { id: "cls-1", name: "Grade 12-A Calculus", description: "Advanced calculus and differential equations section", department: "Mathematics", academicYear: "2025-2026", teacherId: "t1", teacherName: "Dr. Robert Vance", coTeachers: [], studentCount: 34, quizCount: 12, code: "CLS-8819", createdAt: "Jan 2026" },
  { id: "cls-2", name: "Grade 11-B AP Physics", description: "Mechanics, optics, and thermodynamics", department: "Science", academicYear: "2025-2026", teacherId: "t1", teacherName: "Dr. Robert Vance", coTeachers: [], studentCount: 28, quizCount: 8, code: "CLS-4102", createdAt: "Feb 2026" },
];

export default function ClassesPage() {
  const [classes] = useState<ClassItem[]>(mockClasses);
  const [searchTerm, setSearchTerm] = useState("");
  const [quizAssignOpen, setQuizAssignOpen] = useState(false);

  const filtered = classes.filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <School className="w-6 h-6 text-indigo-600 mr-2" /> Class Management Hub
          </h1>
          <p className="text-sm text-gray-500">Create, configure, and assign quizzes to student classrooms</p>
        </div>

        <Link href="/dashboard/classes/new">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
            <Plus className="w-4 h-4 mr-1.5" /> Create New Class
          </Button>
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search class by name..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((cls) => (
          <TeacherClassCard key={cls.id} classItem={cls} onAssignQuiz={() => setQuizAssignOpen(true)} />
        ))}
      </div>

      <QuizAssignModal open={quizAssignOpen} onOpenChange={setQuizAssignOpen} />
    </div>
  );
}
