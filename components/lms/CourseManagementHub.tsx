"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseLevel,LMSCourse } from "@/lib/types/lms";
import {
BookOpen,
Copy,
Plus,
Search,
Sparkles,
Star
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockCourses: LMSCourse[] = [
  {
    id: "course-101",
    code: "CS-401",
    title: "Full-Stack AI Application Development & Neural Networks",
    subtitle: "Master Next.js 16, PyTorch, Vector DBs, and LLM Copilot Integration",
    category: "Computer Science",
    subject: "Artificial Intelligence",
    level: "Advanced",
    instructorName: "Dr. Eleanor Vance",
    instructorTitle: "Principal AI Scientist",
    enrolledStudents: 1420,
    rating: 4.9,
    totalChapters: 8,
    totalLessons: 42,
    durationHours: 36,
    prerequisites: ["Python Basics", "JavaScript ES6"],
    thumbnailUrl: "#",
    status: "Published",
    createdAt: "Jan 10, 2026",
  },
  {
    id: "course-102",
    code: "PHY-302",
    title: "Quantum Physics & Quantum Computing Fundamentals",
    subtitle: "From Wave-Particle Duality to Qiskit Circuit Simulations",
    category: "STEM",
    subject: "Physics",
    level: "Intermediate",
    instructorName: "Prof. Alan Turing",
    instructorTitle: "Chair of Quantum Information",
    enrolledStudents: 980,
    rating: 4.8,
    totalChapters: 6,
    totalLessons: 28,
    durationHours: 24,
    prerequisites: ["Linear Algebra"],
    thumbnailUrl: "#",
    status: "Published",
    createdAt: "Jan 15, 2026",
  },
  {
    id: "course-103",
    code: "MGMT-110",
    title: "Corporate Leadership & Strategic Enterprise Management",
    subtitle: "Executive Communication, Financial Models, and Decision Analysis",
    category: "Business & Leadership",
    subject: "Management",
    level: "Masterclass",
    instructorName: "Sarah Jenkins, MBA",
    instructorTitle: "Executive Strategist",
    enrolledStudents: 640,
    rating: 4.9,
    totalChapters: 5,
    totalLessons: 22,
    durationHours: 18,
    prerequisites: [],
    thumbnailUrl: "#",
    status: "Published",
    createdAt: "Jan 20, 2026",
  },
];

function duplicateLMSCourse(course: LMSCourse): LMSCourse {
  return {
    ...course,
    id: `course-${Date.now()}`,
    code: `${course.code}-COPY`,
    title: `${course.title} (Draft Copy)`,
    status: "Draft",
    enrolledStudents: 0,
    createdAt: "Just now",
  };
}

export function CourseManagementHub() {
  const [courses, setCourses] = useState<LMSCourse[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newCategory, setNewCategory] = useState("Computer Science");
  const [newLevel, setNewLevel] = useState<CourseLevel>("Intermediate");

  const handleDuplicateCourse = (course: LMSCourse) => {
    const dup = duplicateLMSCourse(course);
    setCourses([dup, ...courses]);
    toast.success(`Duplicated course "${course.title}" as new draft.`);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newCourse: LMSCourse = {
      id: `course-${Date.now()}`,
      code: `NEW-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      subtitle: newSubtitle || "Comprehensive curriculum module",
      category: newCategory,
      subject: newCategory,
      level: newLevel,
      instructorName: "Faculty Instructor",
      instructorTitle: "Academic Contributor",
      enrolledStudents: 0,
      rating: 5.0,
      totalChapters: 1,
      totalLessons: 4,
      durationHours: 12,
      prerequisites: [],
      thumbnailUrl: "#",
      status: "Published",
      createdAt: "Just now",
    };
    setCourses([newCourse, ...courses]);
    setIsCreateModalOpen(false);
    setNewTitle("");
    setNewSubtitle("");
    toast.success(`LMS Course "${newCourse.title}" created successfully!`);
  };

  const filteredCourses = courses.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-[8px] bg-[#140C0E] border border-[rgba(240, 160, 180,0.14)] p-6 sm:p-8">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(circle,rgba(255, 77, 109,0.06)_0%,transparent_70%)] pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[3px] bg-[rgba(255, 77, 109,0.1)] text-[#FF4D6D] text-[10px] font-mono font-bold uppercase tracking-wider border border-[rgba(255, 77, 109,0.2)]">
              <Sparkles className="w-3.5 h-3.5" />
              Enterprise LMS Course Builder
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-tight text-[#F2F7F3]">
              Course Management Studio
            </h2>
            <p className="text-xs sm:text-sm text-[#A0AEA5] max-w-xl leading-relaxed">
              Design, build, duplicate, and organize multi-level curriculum programs, structured subject hierarchies, and prerequisite paths.
            </p>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="h-10 px-5 rounded-[4px] bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider shadow-[0_0_16px_rgba(255, 77, 109,0.2)] shrink-0"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            Create New Course
          </Button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-[#140C0E] p-4 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#69786F]" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by course title or code..."
            className="pl-10 h-10 text-xs rounded-[4px] bg-[#1D1013] border-[rgba(240, 160, 180,0.14)] text-[#F2F7F3] placeholder:text-[#69786F] font-mono"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
          {["All", "Computer Science", "STEM", "Business & Leadership"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-[3px] text-xs font-mono uppercase tracking-wider transition-all ${
                selectedCategory === cat
                  ? "bg-[#FF4D6D] text-[#0B0708] font-bold"
                  : "bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3] border border-[rgba(240, 160, 180,0.12)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-[#140C0E] rounded-[6px] border border-[rgba(240, 160, 180,0.14)] hover:border-[rgba(240, 160, 180,0.28)] transition-all flex flex-col justify-between p-5 space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-[#FF4D6D] px-2 py-0.5 rounded-[2px] bg-[rgba(255, 77, 109,0.08)] border border-[rgba(255, 77, 109,0.2)]">
                  {course.code}
                </span>
                <span className="px-2 py-0.5 rounded-[2px] bg-[rgba(255, 117, 143,0.1)] text-[#FF758F] text-[10px] font-mono font-bold uppercase border border-[rgba(255, 117, 143,0.2)]">
                  {course.level}
                </span>
              </div>

              <h3 className="font-display font-bold text-[#F2F7F3] text-base leading-snug">{course.title}</h3>
              <p className="text-xs text-[#A0AEA5] line-clamp-2 leading-relaxed">{course.subtitle}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-[#1D1013] rounded-[4px] border border-[rgba(240, 160, 180,0.1)] text-center text-xs font-mono">
              <div>
                <p className="text-[#69786F] text-[10px] uppercase font-semibold">Enrolled</p>
                <p className="font-extrabold text-[#F2F7F3] mt-0.5">{course.enrolledStudents}</p>
              </div>
              <div>
                <p className="text-[#69786F] text-[10px] uppercase font-semibold">Lessons</p>
                <p className="font-extrabold text-[#F2F7F3] mt-0.5">{course.totalLessons}</p>
              </div>
              <div>
                <p className="text-[#69786F] text-[10px] uppercase font-semibold">Rating</p>
                <p className="font-extrabold text-[#FBBF24] flex items-center justify-center gap-0.5 mt-0.5">
                  <Star className="w-3 h-3 fill-[#FBBF24]" /> {course.rating}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#69786F] pt-2 border-t border-[rgba(240, 160, 180,0.1)] font-mono text-[11px]">
              <span>By {course.instructorName}</span>
              <span className="text-[#A0AEA5]">{course.durationHours} Hours</span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <Button
                onClick={() => handleDuplicateCourse(course)}
                variant="ghost"
                size="sm"
                className="h-8 text-xs rounded-[4px] text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#1D1013] font-mono"
              >
                <Copy className="w-3.5 h-3.5 mr-1" /> Duplicate
              </Button>
              <Button
                size="sm"
                className="h-8 bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider rounded-[4px]"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1" /> Open Syllabus
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Course */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#140C0E] rounded-[8px] p-6 max-w-md w-full shadow-2xl border border-[rgba(240, 160, 180,0.2)] space-y-4">
            <div className="flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-3">
              <h3 className="font-display font-bold uppercase tracking-tight text-[#F2F7F3] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#FF4D6D]" /> Create LMS Course
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#69786F] hover:text-[#F2F7F3] font-mono"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A0AEA5] mb-1">
                  Course Title *
                </label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Quantum Algorithms & Qiskit"
                  className="rounded-[4px] bg-[#1D1013] border-[rgba(240, 160, 180,0.14)] text-[#F2F7F3] text-xs font-mono"
                  required
                />
              </div>

              <div>
                <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A0AEA5] mb-1">
                  Subtitle / Overview
                </label>
                <Input
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Hands-on quantum circuit design"
                  className="rounded-[4px] bg-[#1D1013] border-[rgba(240, 160, 180,0.14)] text-[#F2F7F3] text-xs font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A0AEA5] mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] text-[#F2F7F3] rounded-[4px] px-3 py-2 text-xs font-mono"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="STEM">STEM</option>
                    <option value="Business & Leadership">Business & Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="block font-mono text-[11px] uppercase tracking-wider text-[#A0AEA5] mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as CourseLevel)}
                    className="w-full bg-[#1D1013] border border-[rgba(240, 160, 180,0.14)] text-[#F2F7F3] rounded-[4px] px-3 py-2 text-xs font-mono"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Masterclass">Masterclass</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[rgba(240, 160, 180,0.1)]">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-[4px] text-xs font-mono text-[#A0AEA5] hover:text-[#F2F7F3]"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-[#FF4D6D] text-[#0B0708] hover:bg-[#FF4D6D]/90 font-mono text-xs uppercase font-bold tracking-wider rounded-[4px]"
                >
                  Publish Course
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}