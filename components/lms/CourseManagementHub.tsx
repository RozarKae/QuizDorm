"use client";

import React, { useState } from "react";
import { LMSCourse, CourseLevel } from "@/lib/types/lms";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, Plus, Search, Filter, Star, Users, Clock, 
  Layers, Copy, Archive, CheckCircle2, Sparkles, Folder
} from "lucide-react";
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
    level: "Beginner",
    instructorName: "Marcus Sterling",
    instructorTitle: "Managing Director",
    enrolledStudents: 2100,
    rating: 4.7,
    totalChapters: 5,
    totalLessons: 20,
    durationHours: 18,
    prerequisites: [],
    thumbnailUrl: "#",
    status: "Published",
    createdAt: "Feb 01, 2026",
  },
];

export function CourseManagementHub() {
  const [courses, setCourses] = useState<LMSCourse[]>(mockCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New Course Form State
  const [newTitle, setNewTitle] = useState("");
  const [newSubtitle, setNewSubtitle] = useState("");
  const [newCategory, setNewCategory] = useState("Computer Science");
  const [newSubject, setNewSubject] = useState("Software Engineering");
  const [newLevel, setNewLevel] = useState<CourseLevel>("Beginner");
  const [newInstructor, setNewInstructor] = useState("You (Instructor)");

  const handleDuplicateCourse = (course: LMSCourse) => {
    const dup: LMSCourse = {
      ...course,
      id: `course-${Date.now()}`,
      code: `${course.code}-COPY`,
      title: `${course.title} (Copy)`,
      enrolledStudents: 0,
      createdAt: "Just now",
    };
    setCourses([dup, ...courses]);
    toast.success(`Duplicated course: "${dup.title}"`);
  };

  const handleCreateCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const newCourse: LMSCourse = {
      id: `course-${Date.now()}`,
      code: `CRS-${Math.floor(1000 + Math.random() * 9000)}`,
      title: newTitle,
      subtitle: newSubtitle || "Comprehensive online course curriculum",
      category: newCategory,
      subject: newSubject,
      level: newLevel,
      instructorName: newInstructor,
      instructorTitle: "Senior Educator",
      enrolledStudents: 0,
      rating: 5.0,
      totalChapters: 4,
      totalLessons: 16,
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
    const matchesSearch = c.title.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Enterprise LMS Course Builder
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Course Management Studio</h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl">
              Design, build, duplicate, and organize multi-level curriculum programs, structured subject hierarchies, and prerequisite paths.
            </p>
          </div>

          <Button
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/30"
          >
            <Plus className="w-4 h-4 mr-1.5" /> Create New Course
          </Button>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by course title or code..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {["All", "Computer Science", "STEM", "Business & Leadership"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                selectedCategory === cat
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between p-6 space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                  {course.code}
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 text-[10px] font-bold">
                  {course.level}
                </span>
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug">{course.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{course.subtitle}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl text-center text-xs">
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Enrolled</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{course.enrolledStudents}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Lessons</p>
                <p className="font-extrabold text-slate-800 dark:text-slate-200 mt-0.5">{course.totalLessons}</p>
              </div>
              <div>
                <p className="text-slate-400 text-[10px] uppercase font-semibold">Rating</p>
                <p className="font-extrabold text-amber-500 flex items-center justify-center gap-0.5 mt-0.5">
                  <Star className="w-3.5 h-3.5 fill-amber-500" /> {course.rating}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>By {course.instructorName}</span>
              <span className="font-semibold">{course.durationHours} Hours Content</span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-2">
              <Button
                onClick={() => handleDuplicateCourse(course)}
                variant="ghost"
                size="sm"
                className="text-xs rounded-xl text-slate-500"
              >
                <Copy className="w-3.5 h-3.5 mr-1" /> Duplicate
              </Button>
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl">
                <BookOpen className="w-3.5 h-3.5 mr-1" /> Open Syllabus
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Course */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-600" /> Create LMS Course
              </h3>
              <button onClick={() => setIsCreateModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleCreateCourse} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Course Title *</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Advanced Quantum Algorithms & Qiskit"
                  className="rounded-xl"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Subtitle / Overview</label>
                <Input
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  placeholder="e.g. Hands-on quantum circuit design"
                  className="rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="STEM">STEM</option>
                    <option value="Business & Leadership">Business & Leadership</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Difficulty Level</label>
                  <select
                    value={newLevel}
                    onChange={(e) => setNewLevel(e.target.value as CourseLevel)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                    <option value="Masterclass">Masterclass</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsCreateModalOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 text-white rounded-xl text-xs font-semibold">
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
