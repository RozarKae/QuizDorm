"use client";

import React, { useState } from "react";
import { AttendanceRecord, AttendanceMethod } from "@/lib/types/classroom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserCheck, QrCode, Key, MapPin, Scan, Download, CheckCircle2, 
  XCircle, Clock, AlertTriangle, RefreshCw, Sparkles, Filter, Search
} from "lucide-react";
import { toast } from "sonner";

const mockAttendanceRecords: AttendanceRecord[] = [
  { id: "att-1", studentId: "s-101", studentName: "Alexander Wright", rollNumber: "2026-PHY-01", status: "Present", method: "AI Face Recognition", timestamp: "10:00:12 AM", entryTime: "10:00 AM", confidenceScore: 98.4, locationDetails: "Campus Wi-Fi Node A" },
  { id: "att-2", studentId: "s-102", studentName: "Beatriz Morales", rollNumber: "2026-PHY-02", status: "Present", method: "QR Code", timestamp: "10:01:05 AM", entryTime: "10:01 AM", locationDetails: "Main Lecture Hall 4" },
  { id: "att-3", studentId: "s-103", studentName: "Charles Darwin Jr.", rollNumber: "2026-PHY-03", status: "Late", method: "PIN Code", timestamp: "10:14:45 AM", entryTime: "10:14 AM", locationDetails: "Web Portal Sync" },
  { id: "att-4", studentId: "s-104", studentName: "Diana Prince", rollNumber: "2026-PHY-04", status: "Present", method: "GPS Geo-Fence", timestamp: "09:58:30 AM", entryTime: "09:58 AM", locationDetails: "Building B Geo-Fence (Verified)" },
  { id: "att-5", studentId: "s-105", studentName: "Ethan Hawke", rollNumber: "2026-PHY-05", status: "Absent", method: "Manual", timestamp: "-", entryTime: "-" },
  { id: "att-6", studentId: "s-106", studentName: "Fiona Gallagher", rollNumber: "2026-PHY-06", status: "Excused", method: "Manual", timestamp: "09:30:00 AM", entryTime: "-", locationDetails: "Medical Leave Approved" },
];

export function AttendanceAutomationSystem() {
  const [records, setRecords] = useState<AttendanceRecord[]>(mockAttendanceRecords);
  const [activeMethod, setActiveMethod] = useState<AttendanceMethod>("AI Face Recognition");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("All");

  // Simulated live QR / PIN code
  const [livePin, setLivePin] = useState("8842");
  const [isScanningFace, setIsScanningFace] = useState(false);

  const handleStatusChange = (id: string, newStatus: "Present" | "Late" | "Absent" | "Excused") => {
    setRecords((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              status: newStatus,
              timestamp: newStatus !== "Absent" ? new Date().toLocaleTimeString() : "-",
              entryTime: newStatus !== "Absent" ? new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "-",
            }
          : r
      )
    );
    toast.success(`Attendance status updated to ${newStatus}`);
  };

  const handleTriggerFaceScan = () => {
    setIsScanningFace(true);
    setTimeout(() => {
      setIsScanningFace(false);
      const updated = records.map((r) =>
        r.status === "Absent"
          ? {
              ...r,
              status: "Present" as const,
              method: "AI Face Recognition" as const,
              timestamp: new Date().toLocaleTimeString(),
              confidenceScore: 97.2,
            }
          : r
      );
      setRecords(updated);
      toast.success("AI Face Recognition scan complete! 1 student verified and marked Present.");
    }, 2500);
  };

  const handleRegeneratePin = () => {
    const pin = Math.floor(1000 + Math.random() * 9000).toString();
    setLivePin(pin);
    toast.info(`New attendance PIN broadcasted: ${pin}`);
  };

  const handleExportCSV = () => {
    toast.success("Exporting attendance records to CSV spreadsheet...");
  };

  const filteredRecords = records.filter((r) => {
    const matchesSearch = r.studentName.toLowerCase().includes(searchTerm.toLowerCase()) || r.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "All" || r.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const total = records.length;
  const presentCount = records.filter((r) => r.status === "Present").length;
  const lateCount = records.filter((r) => r.status === "Late").length;
  const absentCount = records.filter((r) => r.status === "Absent").length;
  const excusedCount = records.filter((r) => r.status === "Excused").length;
  const attendancePercentage = Math.round(((presentCount + lateCount) / total) * 100);

  return (
    <div className="space-y-6">
      {/* Attendance Top Stats Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm text-center">
          <p className="text-xs text-slate-500 font-medium">Total Roster</p>
          <p className="text-2xl font-black text-slate-900 dark:text-white mt-1">{total}</p>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-2xl text-center">
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center justify-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> Present
          </p>
          <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{presentCount}</p>
        </div>

        <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl text-center">
          <p className="text-xs text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center gap-1">
            <Clock className="w-3.5 h-3.5" /> Late Entry
          </p>
          <p className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{lateCount}</p>
        </div>

        <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-2xl text-center">
          <p className="text-xs text-red-600 dark:text-red-400 font-bold flex items-center justify-center gap-1">
            <XCircle className="w-3.5 h-3.5" /> Absent
          </p>
          <p className="text-2xl font-black text-red-600 dark:text-red-400 mt-1">{absentCount}</p>
        </div>

        <div className="bg-indigo-500/10 border border-indigo-500/30 p-4 rounded-2xl text-center col-span-2 sm:col-span-1">
          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-bold">Attendance Rate</p>
          <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400 mt-1">{attendancePercentage}%</p>
        </div>
      </div>

      {/* Attendance Mode Selector Bar */}
      <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-bold text-base flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-400" /> Attendance Verification Methods
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">Select active automated capture mode for this live session.</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { mode: "AI Face Recognition", icon: Scan },
              { mode: "QR Code", icon: QrCode },
              { mode: "PIN Code", icon: Key },
              { mode: "GPS Geo-Fence", icon: MapPin },
            ].map(({ mode, icon: Icon }) => (
              <button
                key={mode}
                onClick={() => setActiveMethod(mode as AttendanceMethod)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  activeMethod === mode
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                <Icon className="w-4 h-4" /> {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Method Detail Sub-Panel */}
        <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          {activeMethod === "AI Face Recognition" && (
            <div className="flex items-center gap-4 w-full justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center">
                  <Scan className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">AI Biometric Face Scan Active</h4>
                  <p className="text-[11px] text-slate-400">Verifying live video streams against enrolled student profiles.</p>
                </div>
              </div>
              <Button
                onClick={handleTriggerFaceScan}
                disabled={isScanningFace}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-xl"
              >
                {isScanningFace ? (
                  <span className="flex items-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" /> Scanning Biometrics...
                  </span>
                ) : (
                  "Run AI Face Verification"
                )}
              </Button>
            </div>
          )}

          {activeMethod === "QR Code" && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white p-1 rounded-lg flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-slate-900" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">Dynamic Session QR Code</h4>
                  <p className="text-[11px] text-slate-400">Students scan this QR code using QuizDorm Mobile App.</p>
                </div>
              </div>
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-700 text-white">
                Project Fullscreen QR
              </Button>
            </div>
          )}

          {activeMethod === "PIN Code" && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="px-4 py-2 bg-indigo-950 border border-indigo-500/40 rounded-xl font-mono text-xl font-black tracking-widest text-indigo-300">
                  {livePin}
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">4-Digit Security Attendance PIN</h4>
                  <p className="text-[11px] text-slate-400">Broadcasted to students. Expires in 10 minutes.</p>
                </div>
              </div>
              <Button onClick={handleRegeneratePin} size="sm" variant="outline" className="text-xs rounded-xl border-slate-700 text-white">
                <RefreshCw className="w-3.5 h-3.5 mr-1" /> New PIN
              </Button>
            </div>
          )}

          {activeMethod === "GPS Geo-Fence" && (
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-xs text-white">GPS Classroom Geo-Fence Bounds</h4>
                  <p className="text-[11px] text-slate-400">Latitude: 37.7749° N • Longitude: 122.4194° W (Radius: 50 meters)</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-xs">
                Geo-Fence Enforced
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Roster & Attendance Controls Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search student or roll number..."
              className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs"
            >
              <option value="All">All Statuses</option>
              <option value="Present">Present Only</option>
              <option value="Late">Late Only</option>
              <option value="Absent">Absent Only</option>
              <option value="Excused">Excused Only</option>
            </select>

            <Button
              onClick={handleExportCSV}
              variant="outline"
              size="sm"
              className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
            >
              <Download className="w-3.5 h-3.5 mr-1" /> Export PDF / CSV
            </Button>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold">
                <th className="p-3">Roll Number</th>
                <th className="p-3">Student Name</th>
                <th className="p-3">Status</th>
                <th className="p-3">Verification Method</th>
                <th className="p-3">Timestamp / Entry</th>
                <th className="p-3">Details</th>
                <th className="p-3 text-right">Manual Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRecords.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3 font-mono font-semibold text-slate-700 dark:text-slate-300">{r.rollNumber}</td>
                  <td className="p-3 font-bold text-slate-900 dark:text-white">{r.studentName}</td>
                  <td className="p-3">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                        r.status === "Present"
                          ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                          : r.status === "Late"
                          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                          : r.status === "Absent"
                          ? "bg-red-500/10 text-red-600 dark:text-red-400"
                          : "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400"
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="p-3 text-slate-600 dark:text-slate-400">{r.method}</td>
                  <td className="p-3 font-mono text-slate-500">{r.timestamp}</td>
                  <td className="p-3 text-slate-500 text-[11px]">
                    {r.confidenceScore ? (
                      <span className="text-emerald-500 font-semibold">{r.confidenceScore}% Confidence</span>
                    ) : (
                      r.locationDetails || "-"
                    )}
                  </td>
                  <td className="p-3 text-right space-x-1">
                    <button
                      onClick={() => handleStatusChange(r.id, "Present")}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                        r.status === "Present" ? "bg-emerald-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      P
                    </button>
                    <button
                      onClick={() => handleStatusChange(r.id, "Late")}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                        r.status === "Late" ? "bg-amber-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      L
                    </button>
                    <button
                      onClick={() => handleStatusChange(r.id, "Absent")}
                      className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                        r.status === "Absent" ? "bg-red-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      A
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
