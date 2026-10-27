"use client";

import { Button } from "@/components/ui/button";
import { HybridDeviceSync } from "@/lib/types/classroom";
import {
Cast,HardDrive,
Monitor,
Smartphone,
Tablet,
Tv
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockDevices: HybridDeviceSync[] = [
  { deviceId: "dev-101", deviceName: "Main Lecture Hall Smart TV 85\"", deviceType: "Smart TV", status: "Connected", physicalRoomStudents: 28, onlineStreamStudents: 14, lastSyncedAt: "1 second ago" },
  { deviceId: "dev-102", deviceName: "Interactive Touch Board B-3", deviceType: "Interactive Board", status: "Connected", physicalRoomStudents: 28, onlineStreamStudents: 14, lastSyncedAt: "3 seconds ago" },
  { deviceId: "dev-103", deviceName: "Instructor iPad Pro 12.9\"", deviceType: "Tablet", status: "Connected", physicalRoomStudents: 28, onlineStreamStudents: 14, lastSyncedAt: "Just now" },
  { deviceId: "dev-104", deviceName: "Student Mobile Sync Nodes (42 Devices)", deviceType: "Mobile", status: "Syncing", physicalRoomStudents: 28, onlineStreamStudents: 14, lastSyncedAt: "Syncing..." },
];

export function HybridLearningConsole() {
  const [devices] = useState<HybridDeviceSync[]>(mockDevices);
  const [isCasting, setIsCasting] = useState(false);
  const [offlineSyncProgress, setOfflineSyncProgress] = useState(100);

  const handleToggleCast = () => {
    setIsCasting(!isCasting);
    toast.info(isCasting ? "Cast session disconnected from Smart TV." : "Connected & Casting to Main Hall Smart TV 85\" in 4K!");
  };

  const handleSyncOfflinePackage = () => {
    setOfflineSyncProgress(0);
    toast.info("Downloading encrypted offline classroom bundle...");
    setTimeout(() => {
      setOfflineSyncProgress(100);
      toast.success("Offline learning bundle synchronized (2.4 GB)! Ready for zero-connectivity teaching.");
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-2 border border-indigo-500/30">
            <Cast className="w-3.5 h-3.5" /> Multi-Campus & Hardware Ecosystem
          </div>
          <h2 className="text-2xl font-bold">Hybrid Learning & Hardware Console</h2>
          <p className="text-xs text-slate-300 mt-1 max-w-xl">
            Synchronize physical classroom displays, Smart TVs, mobile tablets, offline content bundles, and hybrid physical+online student counts in real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            onClick={handleSyncOfflinePackage}
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs rounded-xl backdrop-blur-md"
          >
            <HardDrive className="w-4 h-4 mr-1.5 text-amber-400" /> {offlineSyncProgress < 100 ? `Syncing (${offlineSyncProgress}%)` : "Sync Offline Package"}
          </Button>

          <Button
            onClick={handleToggleCast}
            className={`text-xs font-semibold rounded-xl shadow-lg ${
              isCasting ? "bg-red-600 hover:bg-red-700 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"
            }`}
          >
            <Cast className="w-4 h-4 mr-1.5" />
            {isCasting ? "Disconnect Cast" : "Cast to Smart TV"}
          </Button>
        </div>
      </div>

      {/* Hybrid Dual-Attendance Synchronizer Widget */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 text-center space-y-2">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Physical Hall Attendees</span>
          <p className="text-4xl font-black text-slate-900 dark:text-white">28</p>
          <p className="text-[11px] text-slate-500">Verified via Classroom Camera & Gate QR</p>
        </div>

        <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-center space-y-2">
          <span className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">Online Remote Streamers</span>
          <p className="text-4xl font-black text-slate-900 dark:text-white">14</p>
          <p className="text-[11px] text-slate-500">Connected via HD Web Stream</p>
        </div>

        <div className="p-5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-center space-y-2">
          <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider">Total Hybrid Roster</span>
          <p className="text-4xl font-black text-rose-600 dark:text-rose-400">42</p>
          <p className="text-[11px] text-rose-600 dark:text-rose-400 font-bold">100% Unified Participation</p>
        </div>
      </div>

      {/* Hardware Device Matrix */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <h3 className="font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
            <Tv className="w-5 h-5 text-indigo-600" /> Connected Classroom Hardware Matrix
          </h3>
          <span className="text-xs text-slate-400">4 Devices Active</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {devices.map((dev) => (
            <div
              key={dev.deviceId}
              className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center">
                  {dev.deviceType === "Smart TV" && <Tv className="w-5 h-5 text-indigo-600" />}
                  {dev.deviceType === "Interactive Board" && <Monitor className="w-5 h-5 text-amber-500" />}
                  {dev.deviceType === "Tablet" && <Tablet className="w-5 h-5 text-purple-500" />}
                  {dev.deviceType === "Mobile" && <Smartphone className="w-5 h-5 text-rose-500" />}
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs">{dev.deviceName}</h4>
                  <p className="text-[10px] text-slate-400">Synced: {dev.lastSyncedAt}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                  {dev.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
