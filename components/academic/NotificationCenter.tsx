import React from "react";
import { Bell, Info } from "lucide-react";
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
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="bg-[#140C0E] p-6 rounded-[6px] border border-[rgba(240, 160, 180,0.14)] shadow-xs space-y-4">
      <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F2F7F3] flex items-center justify-between border-b border-[rgba(240, 160, 180,0.12)] pb-2.5">
        <span className="flex items-center">
          <Bell className="w-4 h-4 text-[#FF4D6D] mr-2" /> Notification Center
        </span>
        <Badge className="bg-[rgba(255, 77, 109,0.15)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.3)] text-[10px] font-mono font-bold">
          {unreadCount} New
        </Badge>
      </h3>

      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-3 rounded-[4px] border text-xs font-mono space-y-1 transition-all ${
              !n.read
                ? "border-[rgba(255, 77, 109,0.3)] bg-[#2A141A] text-[#F2F7F3]"
                : "border-[rgba(240, 160, 180,0.1)] bg-[#1D1013]/60 text-[#A0AEA5]"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#F2F7F3] flex items-center text-xs">
                <Info className="w-3.5 h-3.5 text-[#FF758F] mr-1.5 shrink-0" />
                {n.title}
              </span>
              <span className="text-[10px] text-[#69786F] font-normal">{n.time}</span>
            </div>
            <p className="text-[11px] text-[#A0AEA5] leading-relaxed">{n.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
