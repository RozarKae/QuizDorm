"use client";

import React, { useState } from "react";
import { AnnouncementNotice } from "@/lib/types/academic";
import { NotificationCenter } from "@/components/academic/NotificationCenter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Megaphone, Plus, Send } from "lucide-react";
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
    <div className="space-y-8 max-w-7xl mx-auto text-[#F2F7F3]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(160,190,170,0.14)] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest uppercase text-[#A0AEA5] mb-1">
            <span className="w-1.5 h-1.5 bg-[#65F59A] rounded-full animate-pulse shadow-[0_0_8px_#65F59A]" />
            <span>COMMUNICATION OS // BROADCAST BOARD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-[#F2F7F3] flex items-center">
            <Megaphone className="w-6 h-6 text-[#65F59A] mr-2" /> Announcements & Notices
          </h1>
          <p className="text-xs font-mono text-[#A0AEA5]">
            Publish classroom notices, schedule changes, and view automated event telemetry.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Post & Notice List */}
        <div className="lg:col-span-7 space-y-6">
          {/* Post Form */}
          <form onSubmit={handlePostNotice} className="bg-[#0C1210] p-6 rounded-[6px] border border-[rgba(160,190,170,0.14)] shadow-xs space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center border-b border-[rgba(160,190,170,0.12)] pb-2.5">
              <Plus className="w-4 h-4 text-[#65F59A] mr-1.5" /> Publish Class Announcement
            </h3>

            <div>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notice Title..."
                className="text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px] focus:border-[#65F59A]"
              />
            </div>

            <div>
              <Select
                value={targetClass}
                onChange={(e) => setTargetClass(e.target.value)}
                options={[
                  { value: "Grade 12-A Calculus", label: "Grade 12-A Calculus" },
                  { value: "Grade 11-B Physics", label: "Grade 11-B Physics" },
                ]}
                className="text-xs font-mono bg-[#111B17] border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px]"
              />
            </div>

            <div>
              <textarea
                rows={3}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write notice message..."
                className="w-full text-xs font-mono p-3 bg-[#111B17] border border-[rgba(160,190,170,0.18)] text-[#F2F7F3] rounded-[4px] focus:border-[#65F59A] outline-none"
              />
            </div>

            <Button
              type="submit"
              className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono font-bold text-xs rounded-[4px] h-9 w-full shadow-[0_0_12px_rgba(101,245,154,0.18)]"
            >
              <Send className="w-3.5 h-3.5 mr-1" /> Post Announcement
            </Button>
          </form>

          {/* Notices */}
          <div className="space-y-3">
            {notices.map((notice) => (
              <div
                key={notice.id}
                className="bg-[#0C1210] p-5 rounded-[6px] border border-[rgba(160,190,170,0.14)] hover:border-[rgba(160,190,170,0.28)] shadow-xs space-y-2 transition-colors"
              >
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="font-bold text-[#65F59A]">{notice.targetClass}</span>
                  <span className="text-[#69786F]">{notice.postedDate}</span>
                </div>
                <h4 className="text-sm font-bold font-display text-[#F2F7F3]">{notice.title}</h4>
                <p className="text-xs text-[#A0AEA5] leading-relaxed">{notice.content}</p>
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
