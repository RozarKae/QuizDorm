"use client";

import React, { useState } from "react";
import { EducationalService } from "@/lib/types/marketplace";
import { Button } from "@/components/ui/button";
import { 
  Users, Calendar, Clock, Star, CheckCircle2, Sparkles, MessageSquare
} from "lucide-react";
import { toast } from "sonner";

const mockServices: EducationalService[] = [
  { serviceId: "srv-1", title: "1-on-1 Quantum Computing & Math Consultation", providerName: "Dr. Eleanor Vance", hourlyRateUSD: 120, rating: 5.0, category: "Tutoring", availableSlots: ["Today 4:00 PM", "Tomorrow 10:00 AM"] },
  { serviceId: "srv-2", title: "Custom Exam Question Paper & Rubric Drafting", providerName: "Prof. Alan Turing", hourlyRateUSD: 95, rating: 4.9, category: "Question Paper Drafting", availableSlots: ["Friday 2:00 PM"] },
];

export function EducationalServiceMarketplace() {
  const [services, setServices] = useState<EducationalService[]>(mockServices);

  const handleBookService = (title: string) => {
    toast.success(`Booked consultation session for "${title}"!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-600" /> Educational & Professional Services Marketplace
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Hire verified expert tutors, curriculum consultants, question paper drafters, and AI education specialists.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((s) => (
          <div key={s.serviceId} className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950">
                    {s.category}
                  </span>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base mt-1">{s.title}</h3>
                  <p className="text-xs text-slate-500">Provider: {s.providerName}</p>
                </div>
                <span className="font-mono text-lg font-black text-rose-600 dark:text-rose-400">
                  ${s.hourlyRateUSD}/hr
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
              <span className="flex items-center gap-1 text-amber-500 font-bold">
                <Star className="w-4 h-4 fill-amber-500" /> {s.rating}
              </span>
              <Button onClick={() => handleBookService(s.title)} className="bg-indigo-600 text-white text-xs rounded-xl font-bold">
                <Calendar className="w-3.5 h-3.5 mr-1" /> Book Consultation Session
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
