"use client";

import React, { useState } from "react";
import { AssignmentItem } from "@/lib/types/academic";
import { AssignmentCard } from "@/components/student/AssignmentCard";
import { QuizAssignModal } from "@/components/teacher/QuizAssignModal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { BookOpen, Plus, Search } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { LockedFeatureNotice } from "@/components/dashboard/LockedFeatureNotice";

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
  const { role } = useAuth();
  const [assignments] = useState<AssignmentItem[]>(mockAssignments);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);

  if (role === "subscriber") {
    return (
      <LockedFeatureNotice
        title="Classroom Assignments Locked"
        description="Assigned coursework, teacher homework, and test submissions require active enrollment in a campus dorm. As a Subscriber, you can take unlimited practice quizzes."
        backHref="/student"
        unlockRequirement="Enrolled Member License"
      />
    );
  }

  const filtered = assignments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "All" || a.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#F2F7F3]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(240, 160, 180,0.14)] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5] mb-1">
            <span className="w-1.5 h-1.5 bg-[#FF4D6D] rounded-full animate-pulse shadow-[0_0_8px_#FF4D6D]" />
            <span>STUDY SQUAD // ASSIGNMENT TRACKER</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
            <BookOpen className="w-6 h-6 text-[#FF4D6D] mr-2" /> Quiz & Homework Assignments
          </h1>
          <p className="text-xs font-mono text-[#A0AEA5]">
            Track assigned assessments, deadlines, and submission progress.
          </p>
        </div>

        <Button
          onClick={() => setModalOpen(true)}
          className="bg-[#FF4D6D] hover:bg-[#FF4D6D]/90 text-[#0B0708] font-mono font-bold text-xs rounded-[4px] px-5 h-9 shadow-[0_0_12px_rgba(255, 77, 109,0.18)]"
        >
          <Plus className="w-4 h-4 mr-1.5" /> Assign Quiz to Class
        </Button>
      </div>

      <div className="bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-[#69786F]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search assignments..."
            className="pl-9 h-9 bg-[#1D1013] text-xs font-mono border-[rgba(240, 160, 180,0.18)] text-[#F2F7F3] rounded-[4px] focus:border-[#FF4D6D]"
          />
        </div>

        <Select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="h-9 text-xs font-mono bg-[#1D1013] border-[rgba(240, 160, 180,0.18)] text-[#F2F7F3] rounded-[4px] w-full sm:w-44"
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
