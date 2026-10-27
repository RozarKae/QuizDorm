"use client";

import { DirectChatWindow } from "@/components/communication/DirectChatWindow";
import { MessageSquare } from "lucide-react";

export default function DirectMessagingPage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
              <MessageSquare className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Teacher ↔ Student Direct Chat
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Internal Direct Messaging Center
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Secure, encrypted 1-on-1 messaging between educators, students, and classroom administrators.
          </p>
        </div>
      </div>

      <DirectChatWindow />
    </div>
  );
}
