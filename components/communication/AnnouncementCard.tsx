"use client";

import { Announcement } from "@/lib/types/communication";
import { Megaphone,Pin } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const priorityStyles: Record<string, string> = {
    normal: "bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200",
    important: "bg-amber-50/50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900 text-amber-900 dark:text-amber-200",
    urgent: "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900 text-rose-900 dark:text-rose-200",
  };

  const style = priorityStyles[announcement.priority] || priorityStyles.normal;

  return (
    <div className={`p-4 rounded-3xl border space-y-2 text-xs relative ${style}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Megaphone className="w-4 h-4 text-indigo-600" />
          <span className="font-extrabold text-sm">{announcement.title}</span>
        </div>

        <div className="flex items-center space-x-2">
          {announcement.pinned && (
            <span className="flex items-center text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-slate-950">
              <Pin className="w-3 h-3 mr-0.5" /> Pinned Notice
            </span>
          )}
          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
            {announcement.priority}
          </span>
        </div>
      </div>

      <p className="text-gray-700 dark:text-gray-300 leading-relaxed font-sans">{announcement.content}</p>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200/40 text-[10px] text-gray-500 font-mono">
        <span>Posted by: {announcement.authorName} ({announcement.authorRole})</span>
        <span>Target: {announcement.targetAudience.toUpperCase()}</span>
      </div>
    </div>
  );
}
