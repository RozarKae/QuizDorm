"use client";

import React, { useState } from "react";
import { LMSConnectorCard } from "@/components/academic-integration/LMSConnectorCard";
import { SISRosterSyncCard } from "@/components/academic-integration/SISRosterSyncCard";
import { CurriculumMapperCard } from "@/components/academic-integration/CurriculumMapperCard";
import { AcademicImportWizardModal } from "@/components/academic-integration/AcademicImportWizardModal";

import { School, BookOpen, Upload, Download, RefreshCw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AcademicIntegrationsPage() {
  const [importModalOpen, setImportModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
                <School className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 3.3 Academic Ecosystem Integration
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Academic Integration Center & Curriculum Engine
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Connect Canvas, Moodle, Google Classroom, PowerSchool SIS, and map assessments to CBSE, IB, ICSE, and Cambridge curriculum standards.
            </p>
          </div>

          <Button onClick={() => setImportModalOpen(true)} className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-600/30">
            <Upload className="w-4 h-4 mr-1.5" /> Bulk Roster & QTI Import Wizard
          </Button>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-6">
          <LMSConnectorCard />
        </div>
        <div className="lg:col-span-6">
          <SISRosterSyncCard />
        </div>
      </div>

      {/* Curriculum Framework Mapping Card */}
      <CurriculumMapperCard />

      <AcademicImportWizardModal open={importModalOpen} onOpenChange={setImportModalOpen} />
    </div>
  );
}
