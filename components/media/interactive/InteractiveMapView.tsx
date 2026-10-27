"use client";

import { InteractiveMapRegion } from "@/lib/types/media";
import { Globe,MapPin } from "lucide-react";
import { useState } from "react";

interface InteractiveMapViewProps {
  regions: InteractiveMapRegion[];
  onSelectRegion?: (regionId: string) => void;
}

export function InteractiveMapView({ regions, onSelectRegion }: InteractiveMapViewProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    if (onSelectRegion) onSelectRegion(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span className="font-bold text-gray-900 dark:text-white flex items-center">
          <Globe className="w-4 h-4 text-indigo-600 mr-1.5" /> Interactive Map Region Assessment
        </span>
        <span>Click on the target region or continent</span>
      </div>

      <div className="p-6 bg-slate-950 rounded-2xl border border-gray-800 text-center space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {regions.map((region) => {
            const isSel = selectedId === region.id;
            return (
              <button
                key={region.id}
                type="button"
                onClick={() => handleSelect(region.id)}
                className={`p-4 rounded-xl border text-center transition-all flex flex-col items-center justify-center space-y-2 ${
                  isSel
                    ? "border-indigo-500 bg-indigo-600/30 text-indigo-300 font-bold ring-2 ring-indigo-500"
                    : "border-gray-800 bg-gray-900 text-gray-300 hover:border-gray-700"
                }`}
              >
                <MapPin className={`w-5 h-5 ${isSel ? "text-indigo-400" : "text-gray-500"}`} />
                <span className="text-xs font-semibold">{region.regionName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
