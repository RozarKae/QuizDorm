"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassroomAnnouncement,ClassroomTemplate,VirtualClassroom } from "@/lib/types/classroom";
import {
Archive,
BookOpen,
Check,
Copy,
Filter,
Folder,
Layers,
Megaphone,
Plus,
School,
Search,
Sparkles,
Users,
Video
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockClassrooms: VirtualClassroom[] = [
  {
    id: "cls-101",
    name: "Advanced Physics & Quantum Mechanics",
    code: "PHY-9042",
    subject: "Physics",
    department: "School of Science",
    batch: "2025-2026",
    section: "Sec A",
    semester: "Semester 5",
    academicYear: "2025-2026",
    teacherId: "tch-1",
    teacherName: "Dr. Eleanor Vance",
    coTeachers: ["Prof. Alan Turing"],
    studentCount: 42,
    template: "STEM",
    bannerColor: "from-blue-600 to-indigo-800",
    isArchived: false,
    announcementsCount: 5,
    activeLiveSession: true,
    createdAt: "Jan 12, 2026",
  },
  {
    id: "cls-102",
    name: "Linear Algebra & Vector Calculus",
    code: "MATH-4410",
    subject: "Mathematics",
    department: "School of Mathematics",
    batch: "2025-2026",
    section: "Sec B",
    semester: "Semester 3",
    academicYear: "2025-2026",
    teacherId: "tch-2",
    teacherName: "Prof. Sarah Connor",
    coTeachers: [],
    studentCount: 38,
    template: "STEM",
    bannerColor: "from-rose-600 to-rose-800",
    isArchived: false,
    announcementsCount: 3,
    activeLiveSession: false,
    createdAt: "Jan 15, 2026",
  },
  {
    id: "cls-103",
    name: "Corporate Leadership & Management 101",
    code: "MGMT-1102",
    subject: "Management",
    department: "Business School",
    batch: "2026-Q1",
    section: "Cohort 4",
    semester: "Executive Term 1",
    academicYear: "2026",
    teacherId: "tch-3",
    teacherName: "Marcus Sterling",
    coTeachers: ["Diana Prince"],
    studentCount: 55,
    template: "Corporate Training",
    bannerColor: "from-amber-600 to-orange-800",
    isArchived: false,
    announcementsCount: 8,
    activeLiveSession: false,
    createdAt: "Feb 01, 2026",
  },
  {
    id: "cls-104",
    name: "SAT / GRE Advanced Math Prep",
    code: "TEST-7721",
    subject: "Test Prep",
    department: "QuizDorm Academy",
    batch: "Spring Intensive",
    section: "Fast Track",
    semester: "Q2",
    academicYear: "2026",
    teacherId: "tch-4",
    teacherName: "David Miller",
    coTeachers: [],
    studentCount: 65,
    template: "Quiz Prep",
    bannerColor: "from-purple-600 to-pink-800",
    isArchived: false,
    announcementsCount: 2,
    activeLiveSession: false,
    createdAt: "Feb 10, 2026",
  },
];

const mockAnnouncements: ClassroomAnnouncement[] = [
  {
    id: "ann-1",
    classroomId: "cls-101",
    authorName: "Dr. Eleanor Vance",
    authorRole: "Lead Professor",
    title: "Mid-Term Project Guidelines & Rubrics Uploaded",
    content: "Please review the attached rubrics for the Quantum Simulation Project due next Friday at 11:59 PM.",
    postedAt: "2 hours ago",
    isPinned: true,
  },
  {
    id: "ann-2",
    classroomId: "cls-101",
    authorName: "Prof. Alan Turing",
    authorRole: "Co-Teacher",
    title: "Live Q&A Session Scheduled for Tomorrow",
    content: "We will be holding a live problem-solving workshop at 4:00 PM EST. Bring your questions on Hilbert Spaces.",
    postedAt: "1 day ago",
    isPinned: false,
  },
];

export function ClassroomManagementHub() {
  const [classrooms, setClassrooms] = useState<VirtualClassroom[]>(mockClassrooms);
  const [announcements, setAnnouncements] = useState<ClassroomAnnouncement[]>(mockAnnouncements);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState<string>("All");
  const [selectedTemplate, setSelectedTemplate] = useState<string>("All");
  const [showArchived, setShowArchived] = useState(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // New classroom modal state
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newClassName, setNewClassName] = useState("");
  const [newSubject, setNewSubject] = useState("");
  const [newDepartment, setNewDepartment] = useState("");
  const [newBatch, setNewBatch] = useState("2025-2026");
  const [newSection, setNewSection] = useState("Sec A");
  const [newSemester, setNewSemester] = useState("Semester 1");
  const [newTemplate, setNewTemplate] = useState<ClassroomTemplate>("STEM");
  const [newColor, setNewColor] = useState("from-indigo-600 to-purple-800");

  // Announcement modal state
  const [isAnnounceModalOpen, setIsAnnounceModalOpen] = useState(false);
  const [announceTitle, setAnnounceTitle] = useState("");
  const [announceContent, setAnnounceContent] = useState("");

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    toast.success(`Classroom code ${code} copied to clipboard!`);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  const handleToggleArchive = (id: string) => {
    setClassrooms((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isArchived: !c.isArchived } : c))
    );
    toast.info("Classroom archive status updated.");
  };

  const handleCreateClassroom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClassName.trim() || !newSubject.trim()) {
      toast.error("Please enter a classroom name and subject.");
      return;
    }
    const newClass: VirtualClassroom = {
      id: `cls-${Date.now()}`,
      name: newClassName,
      code: `CLS-${Math.floor(1000 + Math.random() * 9000)}`,
      subject: newSubject,
      department: newDepartment || "General Department",
      batch: newBatch,
      section: newSection,
      semester: newSemester,
      academicYear: "2025-2026",
      teacherId: "cur-user",
      teacherName: "You (Instructor)",
      coTeachers: [],
      studentCount: 1,
      template: newTemplate,
      bannerColor: newColor,
      isArchived: false,
      announcementsCount: 0,
      activeLiveSession: false,
      createdAt: "Just now",
    };
    setClassrooms([newClass, ...classrooms]);
    setIsCreateModalOpen(false);
    setNewClassName("");
    setNewSubject("");
    toast.success(`Virtual Classroom "${newClass.name}" created successfully!`);
  };

  const handlePostAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!announceTitle.trim() || !announceContent.trim()) return;
    const newAnn: ClassroomAnnouncement = {
      id: `ann-${Date.now()}`,
      classroomId: classrooms[0]?.id || "cls-101",
      authorName: "You (Instructor)",
      authorRole: "Lead Professor",
      title: announceTitle,
      content: announceContent,
      postedAt: "Just now",
      isPinned: true,
    };
    setAnnouncements([newAnn, ...announcements]);
    setIsAnnounceModalOpen(false);
    setAnnounceTitle("");
    setAnnounceContent("");
    toast.success("Classroom announcement published to students!");
  };

  const filteredClassrooms = classrooms.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.code.toLowerCase().includes(searchTerm.toLowerCase()) || c.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "All" || c.subject === selectedSubject;
    const matchesTemplate = selectedTemplate === "All" || c.template === selectedTemplate;
    const matchesArchive = showArchived ? c.isArchived : !c.isArchived;
    return matchesSearch && matchesSubject && matchesTemplate && matchesArchive;
  });

  const subjects = ["All", ...Array.from(new Set(classrooms.map((c) => c.subject)))];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold mb-3 border border-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" /> Virtual Classroom Infrastructure
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">Classroom Management Hub</h1>
            <p className="text-slate-300 text-sm mt-1.5 max-w-xl">
              Organize batches, sections, semesters, and subjects. Manage virtual classrooms, broadcast announcements, and brand your learning environments.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setIsAnnounceModalOpen(true)}
              variant="outline"
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs rounded-xl backdrop-blur-md"
            >
              <Megaphone className="w-4 h-4 mr-2 text-amber-400" /> Broadcast Announcement
            </Button>
            <Button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/30"
            >
              <Plus className="w-4 h-4 mr-1.5" /> Create Classroom
            </Button>
          </div>
        </div>
      </div>

      {/* Filter & Controls Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by class name, subject, or code..."
            className="pl-10 h-10 bg-slate-50 dark:bg-slate-800 text-xs rounded-xl border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Filter className="w-3.5 h-3.5 text-indigo-500" />
            <span>Subject:</span>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200"
            >
              {subjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <span>Template:</span>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-xs text-slate-800 dark:text-slate-200"
            >
              <option value="All">All Templates</option>
              <option value="STEM">STEM</option>
              <option value="Humanities">Humanities</option>
              <option value="Corporate Training">Corporate Training</option>
              <option value="Quiz Prep">Quiz Prep</option>
            </select>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowArchived(!showArchived)}
            className={`text-xs rounded-xl ${showArchived ? "bg-amber-500/10 text-amber-600 dark:text-amber-400" : "text-slate-500"}`}
          >
            <Archive className="w-3.5 h-3.5 mr-1" />
            {showArchived ? "Viewing Archived" : "Show Archived"}
          </Button>
        </div>
      </div>

      {/* Announcements Banner List */}
      {announcements.length > 0 && (
        <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone className="w-4 h-4 text-amber-500" /> Pinboard Announcements
            </h3>
            <span className="text-xs text-slate-400">{announcements.length} Active Notice(s)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {announcements.slice(0, 2).map((ann) => (
              <div
                key={ann.id}
                className="bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs space-y-1 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100">{ann.title}</span>
                  <span className="text-[10px] text-slate-400">{ann.postedAt}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs line-clamp-2">{ann.content}</p>
                <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400">
                  <span>By {ann.authorName} ({ann.authorRole})</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Classroom Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredClassrooms.map((cls) => (
          <div
            key={cls.id}
            className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col justify-between group"
          >
            {/* Header Banner styling */}
            <div className={`bg-gradient-to-r ${cls.bannerColor} p-5 text-white relative`}>
              <div className="flex items-start justify-between">
                <div>
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-black/30 backdrop-blur-md text-[11px] font-semibold tracking-wide uppercase mb-1">
                    {cls.subject} • {cls.template}
                  </span>
                  <h3 className="text-lg font-bold group-hover:underline leading-snug">{cls.name}</h3>
                </div>
                {cls.activeLiveSession && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-500 text-white text-[11px] font-bold animate-pulse shadow-md">
                    <Video className="w-3.5 h-3.5" /> LIVE
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-white/80">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> {cls.section} • {cls.semester}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Folder className="w-3.5 h-3.5" /> Batch: {cls.batch}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="p-5 space-y-4 flex-1">
              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-center text-xs">
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-semibold">Students</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                    <Users className="w-3.5 h-3.5 text-indigo-500" /> {cls.studentCount}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-semibold">Notices</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 flex items-center justify-center gap-1 mt-0.5">
                    <Megaphone className="w-3.5 h-3.5 text-amber-500" /> {cls.announcementsCount}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 text-[10px] uppercase font-semibold">Joined</p>
                  <p className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{cls.createdAt}</p>
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Lead Instructor:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">{cls.teacherName}</span>
                </div>
                {cls.coTeachers.length > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 dark:text-slate-300">Co-Teachers:</span>
                    <span>{cls.coTeachers.join(", ")}</span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-1">
                  <span className="font-medium text-slate-700 dark:text-slate-300">Class Access Code:</span>
                  <button
                    onClick={() => handleCopyCode(cls.code, cls.id)}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-mono font-bold text-xs hover:bg-indigo-100 transition-colors"
                  >
                    {copiedCodeId === cls.id ? <Check className="w-3.5 h-3.5 text-rose-500" /> : <Copy className="w-3.5 h-3.5" />}
                    {cls.code}
                  </button>
                </div>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleToggleArchive(cls.id)}
                className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
              >
                <Archive className="w-3.5 h-3.5 mr-1" /> {cls.isArchived ? "Unarchive" : "Archive"}
              </Button>
              <Button
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-md"
              >
                <BookOpen className="w-3.5 h-3.5 mr-1.5" /> Enter Classroom Hub
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Create Virtual Classroom */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <School className="w-6 h-6 text-indigo-600" /> Create Virtual Classroom
              </h2>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateClassroom} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Classroom Name *</label>
                <Input
                  value={newClassName}
                  onChange={(e) => setNewClassName(e.target.value)}
                  placeholder="e.g. AP Organic Chemistry - Fall 2026"
                  className="rounded-xl bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject *</label>
                  <Input
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    placeholder="e.g. Chemistry"
                    className="rounded-xl bg-slate-50 dark:bg-slate-800"
                    required
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Department</label>
                  <Input
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="e.g. School of Science"
                    className="rounded-xl bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Batch</label>
                  <Input
                    value={newBatch}
                    onChange={(e) => setNewBatch(e.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Section</label>
                  <Input
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Semester</label>
                  <Input
                    value={newSemester}
                    onChange={(e) => setNewSemester(e.target.value)}
                    className="rounded-xl bg-slate-50 dark:bg-slate-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Pedagogical Template</label>
                  <select
                    value={newTemplate}
                    onChange={(e) => setNewTemplate(e.target.value as ClassroomTemplate)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="STEM">STEM (Math & Science Focus)</option>
                    <option value="Humanities">Humanities & Discussion</option>
                    <option value="Corporate Training">Corporate Training</option>
                    <option value="Quiz Prep">Quiz & Test Prep</option>
                    <option value="General Academic">General Academic</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Branding Gradient</label>
                  <select
                    value={newColor}
                    onChange={(e) => setNewColor(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                  >
                    <option value="from-blue-600 to-indigo-800">Royal Sapphire</option>
                    <option value="from-rose-600 to-rose-800">Emerald Forest</option>
                    <option value="from-amber-600 to-orange-800">Amber Sunset</option>
                    <option value="from-purple-600 to-pink-800">Neon Orchid</option>
                    <option value="from-slate-700 to-slate-900">Midnight Slate</option>
                  </select>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg"
                >
                  Publish Classroom
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Broadcast Announcement */}
      {isAnnounceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-amber-500" /> Broadcast Notice
              </h3>
              <button onClick={() => setIsAnnounceModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handlePostAnnouncement} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Notice Title</label>
                <Input
                  value={announceTitle}
                  onChange={(e) => setAnnounceTitle(e.target.value)}
                  placeholder="e.g. Schedule change for tomorrow"
                  className="rounded-xl bg-slate-50 dark:bg-slate-800"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Announcement Details</label>
                <textarea
                  value={announceContent}
                  onChange={(e) => setAnnounceContent(e.target.value)}
                  rows={4}
                  placeholder="Write message for all enrolled students..."
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-xs"
                  required
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsAnnounceModalOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold">
                  Post Notice
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
