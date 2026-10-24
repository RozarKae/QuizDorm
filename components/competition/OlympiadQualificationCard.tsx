"use client";

import React from "react";
import { OlympiadManager } from "@/lib/competition/olympiadManager";
import { GlobalCompetition } from "@/lib/types/competition";
import { Globe, Trophy, Users, Calendar, Award } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function OlympiadQualificationCard() {
  const olympiads = OlympiadManager.getOlympiads();

  return (
    <Card className="p-6 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-4">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
        <div>
          <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
            <Globe className="w-5 h-5 text-indigo-600 mr-2" /> National & International Olympiad Qualification Arena
          </h3>
          <p className="text-xs text-gray-500">
            Multi-round qualification tournaments for international scholarships and grand titles.
          </p>
        </div>
      </div>

      <div className="space-y-3 text-xs">
        {olympiads.map((ol) => (
          <div key={ol.id} className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between font-bold">
              <span className="text-gray-900 dark:text-white text-sm">{ol.title}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                  ol.status === "live" ? "bg-rose-100 text-rose-800" : "bg-indigo-100 text-indigo-800"
                }`}
              >
                {ol.status}
              </span>
            </div>

            <div className="flex justify-between items-center text-[10px] text-gray-400 font-mono">
              <span>Prize Pool: <strong className="text-indigo-600 font-sans">{ol.prizePool}</strong></span>
              <span>{ol.participantsCount.toLocaleString()} Registered</span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
