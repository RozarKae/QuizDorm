"use client";

import { Button } from "@/components/ui/button";
import { GlobalInstitution } from "@/lib/types/global-network";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface GlobalInstitutionCardProps {
  institution: GlobalInstitution;
}

export function GlobalInstitutionCard({ institution }: GlobalInstitutionCardProps) {
  const [partnered, setPartnered] = useState(false);

  const handlePartnerRequest = () => {
    setPartnered(true);
    toast.success(`Academic Partnership Request sent to ${institution.name}!`);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-indigo-100 text-indigo-800 dark:bg-indigo-950 dark:text-indigo-300">
            {institution.country}
          </span>
          {institution.verifiedBadge && (
            <span className="text-[10px] font-mono text-rose-600 font-bold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-rose-500" /> Accredited
            </span>
          )}
        </div>

        <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{institution.name}</h3>
        <span className="text-xs text-gray-500 font-mono block">{institution.region} • {institution.type.toUpperCase()}</span>
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span>{institution.programsCount} Programs</span>
          <span className="font-bold text-indigo-600">{institution.studentCount.toLocaleString()} Students</span>
        </div>

        <Button
          onClick={handlePartnerRequest}
          disabled={partnered}
          className={`w-full font-bold text-xs rounded-xl h-8 ${partnered ? "bg-rose-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
        >
          {partnered ? "Partnership Requested" : "Request Academic Partnership"}
        </Button>
      </div>
    </div>
  );
}
