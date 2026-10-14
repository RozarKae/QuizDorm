"use client";

import React, { useState } from "react";
import { AnnouncementNotice } from "@/lib/types/academic";
import { NotificationCenter } from "@/components/academic/NotificationCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Megaphone, Plus, Send, Bell } from "lucide-react";
import { toast } from "sonner";

const mockNotices: AnnouncementNotice[] = [
  { id: "an-1", title: "Monthly Calculus Exam Schedule Update", content: "The upcoming calculus assessment has been shifted to Friday at 10:00 AM.", authorName: "Dr. Robert Vance", authorRole: "Teacher", targetClass: "Grade 12-A Calculus", postedDate: "Jul 23, 2026", isImportant: true },
  { id: "an-2", title: "Chemistry Lab Safety Manual Attachment", content: "Please review the updated lab safety manual before attending Thursday's session.", authorName: "Dr. Robert Vance", authorRole: "Teacher", targetClass: "Grade 11-B Physics", postedDate: "Jul 21, 2026", isImportant: false },
];

export default function AnnouncementsPage() {
  const [notices, setNotices] = useState<AnnouncementNotice[]>(mockNotices);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [targetClass, setTargetClass] = useState("Grade 12-A Calculus");

  const handlePostNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      toast.error("Title and content are required");
      return;
    }
    const newN: AnnouncementNotice = {
      id: `an-${Date.now()}`,
      title,
      content,
      authorName: "Dr. Robert Vance",
      authorRole: "Teacher",
      targetClass,
      postedDate: "Today",
      isImportant: true,
    };
    setNotices([newN, ...notices]);
    setTitle("");
    setContent("");
    toast.success("Announcement published to classroom!");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Megaphone className="w-6 h-6 text-indigo-600 mr-2" /> Announcements & Notifications Board
        </h1>
        <p className="text-sm text-gray-500">Publish classroom notices and view automated system notifications</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Post & Notice List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Post Form */}
          <form onSubmit={handlePostNotice} className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center">
              <Plus className="w-4 h-4 text-indigo-600 mr-2" /> Publish Class Announcement
            </h3>

            <div>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Notice Title..." className="text-xs" />
            </div>

            <div>
              <Select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                options={[
                  { value: "Grade 12-A Calculus", label: "Grade 12-A Calculus" },
                  { value: "Grade 11-B Physics", label: "Grade 11-B Physics" },
                ]}
                className="text-xs"
              />
            </div>

            <div>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write notice message..."
                className="w-full text-xs p-3 border rounded-xl"
              />
            </div>

            <Button type="submit" className="bg-indigo-600 text-white font-bold text-xs rounded-xl w-full">
              <Send className="w-3.5 h-3.5 mr-1" /> Post Announcement
            </Button>
          </form>

          {/* Notices */}
          <div className="space-y-3">
            {notices.map((notice) => (
              <div key={notice.id} className="bg-white dark:bg-gray-950 p-5 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-indigo-600">{notice.targetClass}</span>
                  <span className="text-gray-400">{notice.postedDate}</span>
                </div>
                <h4 className="text-sm font-bold text-gray-900 dark:text-white">{notice.title}</h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed">{notice.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right 5 cols: Notifications */}
        <div className="lg:col-span-5">
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
}
