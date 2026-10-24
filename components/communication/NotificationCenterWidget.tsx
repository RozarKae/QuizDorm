"use client";

import React, { useState } from "react";
import { InAppNotificationService } from "@/lib/communication/notificationService";
import { InAppNotification } from "@/lib/types/communication";
import { Bell, CheckCircle2, ShieldCheck, Sparkles, Award, CreditCard, ExternalLink, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function NotificationCenterWidget() {
  const [notifications, setNotifications] = useState<InAppNotification[]>(InAppNotificationService.getNotifications());
  const [open, setOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAsRead = (id: string) => {
    const updated = InAppNotificationService.markAsRead(id);
    setNotifications(updated);
  };

  const icons: Record<string, React.ReactNode> = {
    certificate: <Award className="w-4 h-4 text-amber-500" />,
    ai_alert: <Sparkles className="w-4 h-4 text-indigo-500" />,
    payment: <CreditCard className="w-4 h-4 text-rose-500" />,
    system: <ShieldCheck className="w-4 h-4 text-blue-500" />,
  };

  return (
    <div className="relative">
      {/* Bell Trigger Button */}
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-2xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white font-mono text-[10px] font-bold flex items-center justify-center border-2 border-white dark:border-gray-900 shadow-sm animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Drawer Dropdown */}
      {open && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl shadow-2xl z-50 p-4 space-y-3">
          <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2">
            <h4 className="text-xs font-bold text-gray-900 dark:text-white flex items-center">
              <Bell className="w-4 h-4 text-indigo-600 mr-1.5" /> Notifications ({unreadCount} Unread)
            </h4>
            <button onClick={() => setOpen(false)} className="text-gray-400 hover:text-gray-600 text-xs">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto text-xs">
            {notifications.map((n) => (
              <div
                key={n.id}
                className={`p-3 rounded-2xl border transition-all ${
                  n.read
                    ? "bg-gray-50/50 dark:bg-gray-900/40 border-gray-100 dark:border-gray-800 opacity-70"
                    : "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-800 font-medium"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    {icons[n.category] || <Sparkles className="w-4 h-4 text-indigo-500" />}
                    <span className="font-bold text-gray-900 dark:text-white">{n.title}</span>
                  </div>
                  {!n.read && (
                    <button
                      onClick={() => handleMarkAsRead(n.id)}
                      className="text-[10px] font-bold text-indigo-600 hover:underline shrink-0"
                    >
                      Mark Read
                    </button>
                  )}
                </div>

                <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-1">{n.message}</p>

                {n.actionUrl && (
                  <div className="mt-2 text-right">
                    <Link href={n.actionUrl} onClick={() => setOpen(false)}>
                      <Button size="sm" variant="outline" className="h-6 text-[10px] rounded-lg">
                        <span>View</span>
                        <ExternalLink className="w-2.5 h-2.5 ml-1" />
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
