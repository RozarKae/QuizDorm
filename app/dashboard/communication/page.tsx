"use client";

import React, { useState } from "react";
import { AnnouncementService } from "@/lib/communication/announcementService";
import { Announcement } from "@/lib/types/communication";

import { NotificationCenterWidget } from "@/components/communication/NotificationCenterWidget";
import { AnnouncementCard } from "@/components/communication/AnnouncementCard";
import { MessageComposerModal } from "@/components/communication/MessageComposerModal";
import { AutomationRulesCard } from "@/components/communication/AutomationRulesCard";

import { Megaphone, Send, Zap, Bell, Plus, ShieldCheck, Mail, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CommunicationHubPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(AnnouncementService.getAnnouncements());
  const [composerOpen, setComposerOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
                <Megaphone className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.7 Communication Hub
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Unified Communication & Academic Notification Hub
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Deliver multi-channel notifications (In-App, Email, SMS, WhatsApp, Web Push), manage organization announcements, and orchestrate event-driven academic triggers.
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <NotificationCenterWidget />

            <Button
              onClick={() => setComposerOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30"
            >
              <Send className="w-4 h-4 mr-1.5" /> Compose Multi-Channel Message
            </Button>
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Organization Announcements */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
              <Megaphone className="w-5 h-5 text-indigo-600 mr-2" /> Organization Notices & Announcements
            </h3>
          </div>

          <div className="space-y-3">
            {announcements.map((anc) => (
              <AnnouncementCard key={anc.id} announcement={anc} />
            ))}
          </div>
        </div>

        {/* Right Column: Academic Notification Rules */}
        <div className="lg:col-span-5 space-y-4">
          <AutomationRulesCard />
        </div>
      </div>

      <MessageComposerModal open={composerOpen} onOpenChange={setComposerOpen} />
    </div>
  );
}
