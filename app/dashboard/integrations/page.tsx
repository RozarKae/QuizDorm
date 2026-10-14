"use client";

import React from "react";
import { LMSConnectorCard } from "@/components/developer/LMSConnectorCard";
import { Boxes, Cloud, Calendar, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function IntegrationsMarketplacePage() {
  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
              <Boxes className="w-6 h-6" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
              Integration Ecosystem
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Integration Marketplace & Ecosystem
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
            Seamlessly connect QuizDorm with Canvas, Moodle, Google Classroom, Google Drive, OneDrive, and Calendar scheduling services.
          </p>
        </div>
      </div>

      {/* LMS Sync Connectors */}
      <LMSConnectorCard />

      {/* Cloud & Calendar Sync Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white">
            <Cloud className="w-5 h-5 text-indigo-600" />
            <span>Cloud Storage Storage Connectors</span>
          </div>
          <p className="text-xs text-gray-500">
            Automatically backup question bank exports, student submission PDFs, and certificates to Google Drive or OneDrive.
          </p>
          <span className="text-xs font-mono font-bold text-emerald-600 block">
            Google Drive & OneDrive Connected
          </span>
        </Card>

        <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-3">
          <div className="flex items-center space-x-2 font-bold text-gray-900 dark:text-white">
            <Calendar className="w-5 h-5 text-indigo-600" />
            <span>Calendar Event Scheduling Sync</span>
          </div>
          <p className="text-xs text-gray-500">
            Sync quiz due dates, live competitions, and review sessions to Google Calendar and Microsoft Outlook Calendar.
          </p>
          <span className="text-xs font-mono font-bold text-emerald-600 block">
            Google Calendar & Outlook Calendar Synced
          </span>
        </Card>
      </div>
    </div>
  );
}
