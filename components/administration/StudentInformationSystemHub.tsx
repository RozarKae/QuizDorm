"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SISStudentProfile } from "@/lib/types/administration";
import {
Heart,
QrCode,
Search,
ShieldCheck,
UserPlus,
Users
} from "lucide-react";
import React,{ useState } from "react";
import { toast } from "sonner";

const mockStudents: SISStudentProfile[] = [
  {
    id: "sis-101",
    studentIdNumber: "STU-2026-9041",
    fullName: "Alexander Wright",
    dob: "2008-04-12",
    gender: "Male",
    email: "alexander.w@example.com",
    phone: "+1 (555) 019-2834",
    currentGradeBatch: "Grade 12",
    section: "Sec A (STEM)",
    rollNumber: "2026-PHY-01",
    admissionDate: "Aug 15, 2024",
    parentName: "Robert Wright",
    parentPhone: "+1 (555) 019-8800",
    parentEmail: "robert.w@example.com",
    bloodGroup: "O+",
    medicalNotes: "No known allergies",
    status: "Active",
    photoUrl: "#",
  },
  {
    id: "sis-102",
    studentIdNumber: "STU-2026-9042",
    fullName: "Beatriz Morales",
    dob: "2008-09-24",
    gender: "Female",
    email: "beatriz.m@example.com",
    phone: "+1 (555) 012-9912",
    currentGradeBatch: "Grade 12",
    section: "Sec A (STEM)",
    rollNumber: "2026-PHY-02",
    admissionDate: "Aug 15, 2024",
    parentName: "Carlos Morales",
    parentPhone: "+1 (555) 012-7711",
    parentEmail: "carlos.m@example.com",
    bloodGroup: "A+",
    medicalNotes: "Asthma inhaler required",
    status: "Active",
    photoUrl: "#",
  },
];

export function StudentInformationSystemHub() {
  const [students, setStudents] = useState<SISStudentProfile[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<SISStudentProfile | null>(null);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // New Student Form State
  const [newName, setNewName] = useState("");
  const [newGrade, setNewGrade] = useState("Grade 12");
  const [newSection, setNewSection] = useState("Sec A");
  const [newParent, setNewParent] = useState("");

  const handleRegisterStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    const newStudent: SISStudentProfile = {
      id: `sis-${Date.now()}`,
      studentIdNumber: `STU-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      fullName: newName,
      dob: "2008-01-01",
      gender: "Other",
      email: `${newName.toLowerCase().replace(/\s+/g, ".")}@example.com`,
      phone: "+1 (555) 000-0000",
      currentGradeBatch: newGrade,
      section: newSection,
      rollNumber: `2026-CLS-${Math.floor(10 + Math.random() * 90)}`,
      admissionDate: "Just now",
      parentName: newParent || "Guardian",
      parentPhone: "+1 (555) 000-1111",
      parentEmail: "guardian@example.com",
      bloodGroup: "O+",
      status: "Active",
      photoUrl: "#",
    };
    setStudents([newStudent, ...students]);
    setIsRegisterModalOpen(false);
    setNewName("");
    toast.success(`Student "${newStudent.fullName}" registered! Student ID: ${newStudent.studentIdNumber}`);
  };

  const filteredStudents = students.filter(
    (s) => s.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || s.studentIdNumber.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-indigo-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold mb-3 border border-indigo-500/30">
            <Users className="w-3.5 h-3.5" /> Central Student Information System (SIS)
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">Student Information System</h1>
          <p className="text-slate-300 text-xs sm:text-sm mt-1.5 max-w-xl">
            Manage comprehensive student master profiles, digital ID credentials, medical/health records, parent contacts, and academic lifecycle status.
          </p>
        </div>

        <Button
          onClick={() => setIsRegisterModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-500/30"
        >
          <UserPlus className="w-4 h-4 mr-1.5" /> Register New Student
        </Button>
      </div>

      {/* Search & Stats Bar */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search student name or Student ID..."
            className="pl-10 h-10 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>

        <span className="text-xs font-semibold text-slate-500">
          Total SIS Roster: <span className="font-bold text-slate-900 dark:text-white">{students.length} Students</span>
        </span>
      </div>

      {/* SIS Students Table */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-4 overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 font-semibold">
              <th className="p-3">Student ID</th>
              <th className="p-3">Full Name</th>
              <th className="p-3">Grade / Section</th>
              <th className="p-3">Parent / Guardian</th>
              <th className="p-3">Blood Group</th>
              <th className="p-3">Status</th>
              <th className="p-3 text-right">SIS Profile</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filteredStudents.map((st) => (
              <tr key={st.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                <td className="p-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{st.studentIdNumber}</td>
                <td className="p-3 font-bold text-slate-900 dark:text-white">{st.fullName}</td>
                <td className="p-3 text-slate-600 dark:text-slate-300">{st.currentGradeBatch} • {st.section}</td>
                <td className="p-3 text-slate-500">{st.parentName}</td>
                <td className="p-3 font-mono font-semibold text-rose-600">{st.bloodGroup}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-600 font-bold text-[10px]">
                    {st.status}
                  </span>
                </td>
                <td className="p-3 text-right">
                  <Button
                    onClick={() => setSelectedStudent(st)}
                    size="sm"
                    variant="outline"
                    className="text-xs rounded-xl border-slate-200 dark:border-slate-700"
                  >
                    View Digital Record
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal: Full SIS Student Profile */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 text-base">
                <ShieldCheck className="w-5 h-5 text-indigo-600" /> Digital Student Master Profile
              </h3>
              <button onClick={() => setSelectedStudent(null)} className="text-slate-400">✕</button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-4 bg-indigo-500/10 rounded-2xl border border-indigo-500/20">
                <div>
                  <h4 className="font-extrabold text-base text-slate-900 dark:text-white">{selectedStudent.fullName}</h4>
                  <p className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{selectedStudent.studentIdNumber}</p>
                </div>
                <div className="w-10 h-10 bg-white p-1 rounded-lg flex items-center justify-center">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Grade & Section</span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedStudent.currentGradeBatch} • {selectedStudent.section}</p>
                </div>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Admission Date</span>
                  <p className="font-bold text-slate-900 dark:text-white">{selectedStudent.admissionDate}</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-1">
                <span className="text-[10px] text-slate-400 uppercase font-semibold">Parent Contact Info</span>
                <p className="font-bold text-slate-900 dark:text-white">{selectedStudent.parentName}</p>
                <p className="text-slate-500">{selectedStudent.parentPhone} • {selectedStudent.parentEmail}</p>
              </div>

              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1">
                <span className="text-[10px] text-rose-600 uppercase font-bold flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> Medical Record
                </span>
                <p className="text-slate-700 dark:text-slate-300 font-medium">Blood Group: {selectedStudent.bloodGroup} • {selectedStudent.medicalNotes}</p>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <Button onClick={() => setSelectedStudent(null)} className="bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                Close Record
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Register Student */}
      {isRegisterModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" /> SIS Student Registration
              </h3>
              <button onClick={() => setIsRegisterModalOpen(false)} className="text-slate-400">✕</button>
            </div>
            <form onSubmit={handleRegisterStudent} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Student Full Name *</label>
                <Input
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Sophia Rodriguez"
                  className="rounded-xl"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Grade / Batch</label>
                  <Input
                    value={newGrade}
                    onChange={(e) => setNewGrade(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Section</label>
                  <Input
                    value={newSection}
                    onChange={(e) => setNewSection(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Parent / Guardian Name</label>
                <Input
                  value={newParent}
                  onChange={(e) => setNewParent(e.target.value)}
                  placeholder="e.g. Maria Rodriguez"
                  className="rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="ghost" onClick={() => setIsRegisterModalOpen(false)} className="rounded-xl text-xs">
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 text-white rounded-xl text-xs font-semibold">
                  Save Student Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
