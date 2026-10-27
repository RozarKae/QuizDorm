"use client";

import { Button } from "@/components/ui/button";
import { FacultyStaffProfile } from "@/lib/types/administration";
import {
Briefcase,
UserCheck
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const mockStaff: FacultyStaffProfile[] = [
  { id: "emp-101", employeeId: "EMP-2026-101", fullName: "Dr. Eleanor Vance", designation: "Principal AI Scientist & Lead Professor", department: "School of Computer Science", email: "eleanor.v@quizdorm.edu", phone: "+1 (555) 019-1001", joinedDate: "Aug 2021", weeklyWorkloadHours: 18, maxWorkloadHours: 20, leaveBalanceDays: 14, status: "Active" },
  { id: "emp-102", employeeId: "EMP-2026-102", fullName: "Prof. Alan Turing", designation: "Chair of Quantum Information", department: "Department of Physics", email: "alan.t@quizdorm.edu", phone: "+1 (555) 019-1002", joinedDate: "Jan 2022", weeklyWorkloadHours: 16, maxWorkloadHours: 20, leaveBalanceDays: 10, status: "Active" },
];

export function FacultyStaffManagementConsole() {
  const [staffList] = useState<FacultyStaffProfile[]>(mockStaff);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-600" /> Faculty & Staff HR Management
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Faculty master directory, teaching workload distribution, department assignments, leave approvals, and performance reviews.
          </p>
        </div>

        <Button onClick={() => toast.info("Opening Staff Onboarding Wizard...")} className="bg-indigo-600 text-white font-semibold text-xs rounded-xl shadow-lg">
          <UserCheck className="w-4 h-4 mr-1.5" /> Onboard Faculty
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {staffList.map((st) => (
          <div key={st.id} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {st.employeeId}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{st.fullName}</h3>
                  <p className="text-xs text-slate-500">{st.designation}</p>
                </div>
                <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                  {st.status}
                </span>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Department:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{st.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Weekly Workload:</span>
                  <span className="font-mono font-bold text-indigo-600">{st.weeklyWorkloadHours} / {st.maxWorkloadHours} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Leave Balance:</span>
                  <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{st.leaveBalanceDays} Days</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="text-slate-400">Joined: {st.joinedDate}</span>
              <Button size="sm" variant="outline" className="text-xs rounded-xl border-slate-200 dark:border-slate-700">
                Workload Audit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
