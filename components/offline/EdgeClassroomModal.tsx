"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EdgeClassroomService } from "@/lib/offline/edgeClassroom";
import { EdgeClassroomSession } from "@/lib/types/offline";
import { Play,Users,Wifi } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface EdgeClassroomModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EdgeClassroomModal({ open, onOpenChange }: EdgeClassroomModalProps) {
  const [subject, setSubject] = useState("Grade 12 Physics (LAN Mode)");
  const [activeSession, setActiveSession] = useState<EdgeClassroomSession | null>(null);

  if (!open) return null;

  const handleStartLAN = () => {
    const session = EdgeClassroomService.createSession(subject, "Dr. Eleanor Vance");
    setActiveSession(session);
    toast.success(`Edge LAN Classroom Session Started! PIN: ${session.sessionPin}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Wifi className="w-5 h-5 text-indigo-600 mr-2" /> Host Zero-Internet LAN Competition
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400">✕</button>
        </div>

        {activeSession ? (
          <div className="space-y-4 text-center">
            <div className="p-4 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 space-y-2">
              <span className="text-xs text-indigo-600 font-bold uppercase block">Students Join PIN</span>
              <div className="text-4xl font-extrabold font-mono text-indigo-600 tracking-widest">
                {activeSession.sessionPin}
              </div>
              <p className="text-xs text-gray-500">Connect to Local Wi-Fi / Hotspot: <strong className="text-gray-900 dark:text-white font-mono">QuizDorm_Edge_LAN</strong></p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2 text-left">
              <span className="font-bold text-xs text-gray-900 dark:text-white flex items-center">
                <Users className="w-4 h-4 text-indigo-500 mr-1.5" /> 1 Student Connected
              </span>
              <p className="text-xs text-gray-500">• Karthik Rajendran (Connected to LAN)</p>
            </div>

            <Button onClick={() => onOpenChange(false)} className="w-full bg-indigo-600 text-white font-bold text-xs rounded-xl py-5">
              Done / Keep Session Running
            </Button>
          </div>
        ) : (
          <div className="space-y-4 text-xs">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Classroom Subject / Quiz Title</label>
              <Input value={subject} onChange={(e) => setSubject(e.target.value)} className="text-xs" />
            </div>

            <p className="text-gray-500 text-[11px]">
              Edge Classroom Mode allows live student competitions over local Wi-Fi or mobile hotspots without an active internet connection. Results sync to the cloud automatically when online.
            </p>

            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
              <Button onClick={handleStartLAN} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
                <Play className="w-3.5 h-3.5 mr-1" /> Launch LAN Session
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
