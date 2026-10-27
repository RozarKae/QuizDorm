"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ClassroomResource } from "@/lib/types/classroom";
import {
Download,
File,
FileText,
Folder,
Link as LinkIcon,Music,
Search,
Upload,
Video
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockResources: ClassroomResource[] = [
  { id: "res-1", title: "Quantum Physics Chapter 4 - Complete Lecture Slides.pdf", category: "Presentation", fileSize: "14.2 MB", url: "#", downloads: 142, uploadedBy: "Dr. Eleanor Vance", uploadedAt: "Feb 10, 2026", version: "v2.1" },
  { id: "res-2", title: "Pauli Matrices & Spin Operator Derivations.pdf", category: "PDF", fileSize: "3.5 MB", url: "#", downloads: 98, uploadedBy: "Prof. Alan Turing", uploadedAt: "Feb 12, 2026", version: "v1.0" },
  { id: "res-3", title: "Recorded Live Session: Bell State Violation Workshop.mp4", category: "Video", fileSize: "450 MB", url: "#", downloads: 215, uploadedBy: "Dr. Eleanor Vance", uploadedAt: "Feb 14, 2026", version: "v1.0" },
  { id: "res-4", title: "MIT Quantum Mechanics OpenCourseWare Reference Link", category: "Link", url: "https://ocw.mit.edu", downloads: 64, uploadedBy: "Marcus Chen", uploadedAt: "Feb 18, 2026", version: "v1.0" },
];

export function ClassroomResourceLibrary() {
  const [resources, setResources] = useState<ClassroomResource[]>(mockResources);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");

  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<ClassroomResource["category"]>("PDF");

  const handleDownload = (res: ClassroomResource) => {
    setResources((prev) =>
      prev.map((r) => (r.id === res.id ? { ...r, downloads: r.downloads + 1 } : r))
    );
    toast.success(`Downloading "${res.title}"...`);
  };

  const handleUploadFile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const item: ClassroomResource = {
      id: `res-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      fileSize: "4.8 MB",
      url: "#",
      downloads: 0,
      uploadedBy: "You (Instructor)",
      uploadedAt: "Just now",
      version: "v1.0",
    };
    setResources([item, ...resources]);
    setIsUploadModalOpen(false);
    setNewTitle("");
    toast.success(`Resource file "${item.title}" uploaded to library!`);
  };

  const filteredResources = resources.filter((r) => {
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === "All" || r.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const getCategoryIcon = (cat: ClassroomResource["category"]) => {
    switch (cat) {
      case "Video": return <Video className="w-5 h-5 text-red-500" />;
      case "Presentation": return <FileText className="w-5 h-5 text-amber-500" />;
      case "PDF": return <File className="w-5 h-5 text-indigo-500" />;
      case "Link": return <LinkIcon className="w-5 h-5 text-rose-500" />;
      case "Audio": return <Music className="w-5 h-5 text-purple-500" />;
      default: return <FileText className="w-5 h-5 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Folder className="w-6 h-6 text-indigo-600" /> Centralized Learning Resource Hub
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Access, download, and organize lecture notes, recorded class videos, PDF textbooks, slides, and reference links.
          </p>
        </div>

        <Button
          onClick={() => setIsUploadModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg"
        >
          <Upload className="w-4 h-4 mr-1.5" /> Upload Resource
        </Button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search learning materials..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {["All", "Presentation", "PDF", "Video", "Link"].map((cat) => (
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

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((res) => (
          <div
            key={res.id}
            className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow flex items-start gap-4"
          >
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
              {getCategoryIcon(res.category)}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex items-start justify-between">
                <h4 className="font-bold text-slate-900 dark:text-white text-sm leading-snug">{res.title}</h4>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono text-[10px]">
                  {res.version}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>By {res.uploadedBy}</span>
                <span>•</span>
                <span>{res.uploadedAt}</span>
                {res.fileSize && (
                  <>
                    <span>•</span>
                    <span className="font-mono">{res.fileSize}</span>
                  </>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                  {res.downloads} Total Downloads
                </span>

                <Button
                  onClick={() => handleDownload(res)}
                  size="sm"
                  variant="outline"
                  className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
                >
                  <Download className="w-3.5 h-3.5 mr-1" /> Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Upload Resource */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5 text-indigo-600" /> Upload Course Material
              </h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleUploadFile} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Resource Title *</label>
                <Input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Chapter 5 Practice Problem Solutions"
                  className="rounded-xl"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as ClassroomResource["category"])}
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
                >
                  <option value="PDF">PDF Document</option>
                  <option value="Presentation">Presentation Deck</option>
                  <option value="Video">Video Recording</option>
                  <option value="Link">External Link</option>
                </select>
              </div>
              <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 p-6 rounded-2xl text-center space-y-2">
                <Upload className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-slate-600 dark:text-slate-400 font-medium">Drag & drop files or click to browse</p>
                <p className="text-[10px] text-slate-400">Supports PDF, PPTX, MP4, MP3, DOCX up to 500MB</p>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsUploadModalOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                  Publish Resource
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
