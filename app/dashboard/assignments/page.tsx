"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AssignmentItem } from "@/lib/types/academic";
import { AssignmentCard } from "@/components/student/AssignmentCard";
import { QuizAssignModal } from "@/components/teacher/QuizAssignModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BookOpen, Plus, Search, CheckCircle2, Clock } from "lucide-react";

const mockAssignments: AssignmentItem[] = [
  {
    id: "asg-1",
    title: "Calculus Derivatives & Integrals Quiz #3",
    quizId: "q-101",
    type: "quiz",
    classId: "cls-1",
    className: "Grade 12-A Calculus",
    teacherId: "t1",
    teacherName: "Dr. Robert Vance",
    dueDate: "2026-07-28",
    dueTime: "11:59 PM",
    totalMarks: 100,
    submittedCount: 24,
    totalStudents: 34,
    status: "Active",
    createdAt: "Jul 2026",
  },
  {
    id: "asg-2",
    title: "Organic Compounds & Molecular Diagram Homework",
    type: "homework",
    classId: "cls-2",
    className: "Grade 11-B Physics",
    teacherId: "t1",
    teacherName: "Dr. Robert Vance",
    dueDate: "2026-07-30",
    dueTime: "05:00 PM",
    totalMarks: 50,
    submittedCount: 18,
    totalStudents: 28,
    status: "Active",
    createdAt: "Jul 2026",
  },
];

export default function AssignmentsPage() {
  const [assignments] = useState<AssignmentItem[]>(mockAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  const filtered = assignments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
            <BookOpen className="w-6 h-6 text-indigo-600 mr-2" /> Quiz & Homework Assignments
          </h1>
          <p className="text-sm text-gray-500">Track assigned assessments, deadlines, and submission progress</p>
        </div>

        <Button onClick={() => setModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
          <Plus className="w-4 h-4 mr-1.5" /> Assign Quiz to Class
        </Button>
      </div>

      <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assignments..."
            className="pl-9 h-10 bg-gray-50 dark:bg-gray-900 text-xs"
          />
        </div>

        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-10 text-xs font-medium w-full sm:w-44"
          options={[
            { value: "All", label: "All Types" },
            { value: "quiz", label: "Quizzes Only" },
            { value: "homework", label: "Homework Only" },
          ]}
        />
      </div>

      <div className="space-y-4">
        {filtered.map((asg) => (
          <AssignmentCard key={asg.id} assignment={asg} />
        ))}
      </div>

      <QuizAssignModal open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  );
}
