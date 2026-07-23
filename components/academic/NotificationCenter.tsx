import React from "react";
import { Bell, Megaphone, CheckCircle2, Clock, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface NotificationCenterProps {
  notifications?: { id: string; title: string; message: string; time: string; read: boolean }[];
}

export function NotificationCenter({
  notifications = [
    { id: "n1", title: "New Assignment Posted", message: "Calculus Homework #4 assigned by Dr. Vance.", time: "10 mins ago", read: false },
    { id: "n2", title: "Competition Results Published", message: "National Science Championship rankings are live!", time: "2 hours ago", read: false },
    { id: "n3", title: "Quiz Graded", message: "Your Chemistry quiz result: 92% (A).", time: "Yesterday", read: true },
  ],
}: NotificationCenterProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center justify-between">
        <span className="flex items-center"><Bell className="w-4 h-4 text-indigo-600 mr-2" /> Notification Center</span>
        <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px]">
          {notifications.filter((n) => !n.read).length} New
        </Badge>
      </h3>

      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3.5 rounded-2xl border text-xs space-y-1 transition-all ${
              !n.read
                ? "border-indigo-200 bg-indigo-50/40 dark:bg-indigo-950/40 font-semibold"
                : "border-gray-100 dark:border-gray-900 bg-gray-50/30 dark:bg-gray-900/30 text-gray-600"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-gray-900 dark:text-white flex items-center">
                <Info className="w-3.5 h-3.5 text-indigo-600 mr-1.5 shrink-0" />
                {n.title}
              </span>
              <span className="text-[10px] text-gray-400 font-normal">{n.time}</span>
            </div>
            <p className="text-[11px] text-gray-500 leading-relaxed">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
