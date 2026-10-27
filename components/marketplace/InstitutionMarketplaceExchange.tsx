"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
Building2,
Calculator
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function InstitutionMarketplaceExchange() {
  const [seats, setSeats] = useState(250);

  const handleCalculateBulk = () => {
    toast.success(`Calculated Institutional Bulk Tier: ${seats} Seats at $22/seat = $${seats * 22}!`);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-6 h-6 text-indigo-600" /> Institutional Licensing & Bulk Exchange
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            School, university, and department resource sharing with multi-seat volume licensing discounts.
          </p>
        </div>
      </div>

      {/* Bulk Calculator Card */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-white shadow-xl space-y-4">
        <h3 className="font-bold text-xs uppercase tracking-wider text-amber-400 flex items-center gap-2">
          <Calculator className="w-4 h-4" /> Institutional Site License Calculator
        </h3>

        <div className="flex flex-col sm:flex-row items-center gap-3 text-xs">
          <Input
            type="number"
            value={seats}
            onChange={(e) => setSeats(Number(e.target.value))}
            placeholder="Number of Student Seats..."
            className="bg-slate-900 border-slate-700 text-white rounded-xl"
          />
          <Button onClick={handleCalculateBulk} className="bg-indigo-600 text-white font-bold text-xs rounded-xl shrink-0">
            Calculate Volume Discount
          </Button>
        </div>
      </div>
    </div>
  );
}
