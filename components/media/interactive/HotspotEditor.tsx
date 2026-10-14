"use client";

import React, { useState } from "react";
import { HotspotRegion } from "@/lib/types/media";
import { Target, Plus, Trash2, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HotspotEditorProps {
  imageUrl: string;
  regions: HotspotRegion[];
  onChange: (regions: HotspotRegion[]) => void;
}

export function HotspotEditor({ imageUrl, regions, onChange }: HotspotEditorProps) {
  const [selectedRegionId, setSelectedRegionId] = useState<string | null>(null);

  const handleAddRegion = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
    const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);

    const newRegion: HotspotRegion = {
      id: `region-${Date.now()}`,
      label: `Hotspot Target ${regions.length + 1}`,
      shape: "rectangle",
      x: Math.max(0, x - 10),
      y: Math.max(0, y - 10),
      width: 20,
      height: 20,
      isCorrect: regions.length === 0, // First hotspot is correct by default
    };

    onChange([...regions, newRegion]);
    setSelectedRegionId(newRegion.id);
  };

  const handleUpdateRegion = (id: string, updates: Partial<HotspotRegion>) => {
    onChange(regions.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  };

  const handleDeleteRegion = (id: string) => {
    onChange(regions.filter((r) => r.id !== id));
    if (selectedRegionId === id) setSelectedRegionId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span className="font-bold text-gray-900 dark:text-white flex items-center">
          <Target className="w-4 h-4 text-indigo-600 mr-1.5" /> Hotspot Editor
        </span>
        <span>Click on the image below to place a target hotspot region</span>
      </div>

      {/* Image Overlay Editor Canvas */}
      <div
        onClick={handleAddRegion}
        className="relative w-full h-80 bg-gray-900 rounded-2xl overflow-hidden cursor-crosshair border border-gray-200 dark:border-gray-800 select-none"
      >
        <img src={imageUrl || "/images/placeholders/brain-diagram.png"} alt="Hotspot Base" className="w-full h-full object-contain" />

        {/* Hotspot Region Overlay Boxes */}
        {regions.map((region, idx) => {
          const isSelected = selectedRegionId === region.id;

          return (
            <div
              key={region.id}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRegionId(region.id);
              }}
              style={{
                left: `${region.x}%`,
                top: `${region.y}%`,
                width: `${region.width}%`,
                height: `${region.height}%`,
              }}
              className={`absolute border-2 rounded-xl flex flex-col items-center justify-center transition-all ${
                region.isCorrect
                  ? "border-emerald-500 bg-emerald-500/30 text-white font-bold"
                  : "border-rose-500 bg-rose-500/30 text-white font-bold"
              } ${isSelected ? "ring-4 ring-indigo-400 scale-[1.02] z-20" : "z-10"}`}
            >
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-900/80 font-bold truncate max-w-[90%]">
                {region.label} {region.isCorrect ? "✓" : ""}
              </span>
            </div>
          );
        })}
      </div>

      {/* Region List & Controls */}
      {regions.length > 0 && (
        <div className="space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300">Configured Hotspots ({regions.length})</label>
          <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
            {regions.map((r) => (
              <div
                key={r.id}
                className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                  r.id === selectedRegionId
                    ? "border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40"
                    : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                }`}
              >
                <div className="flex items-center space-x-2 flex-1">
                  <input
                    type="text"
                    value={r.label}
                    onChange={(e) => handleUpdateRegion(r.id, { label: e.target.value })}
                    className="text-xs font-semibold p-1 rounded-lg border border-gray-200 dark:border-gray-800 bg-transparent flex-1"
                  />
                  <label className="flex items-center space-x-1 text-[11px] font-semibold text-emerald-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(r.isCorrect)}
                      onChange={(e) => handleUpdateRegion(r.id, { isCorrect: e.target.checked })}
                      className="rounded text-emerald-600 focus:ring-emerald-500 h-3.5 w-3.5"
                    />
                    <span>Correct Target</span>
                  </label>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteRegion(r.id)}
                  className="p-1 text-gray-400 hover:text-rose-600 ml-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function HotspotViewer({
  imageUrl,
  regions,
  onSelectHotspot,
  selectedRegionId,
  isSubmitted,
}: {
  imageUrl: string;
  regions: HotspotRegion[];
  onSelectHotspot: (regionId: string) => void;
  selectedRegionId?: string;
  isSubmitted?: boolean;
}) {
  return (
    <div className="space-y-3">
      <div className="relative w-full h-80 bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 select-none">
        <img src={imageUrl || "/images/placeholders/brain-diagram.png"} alt="Hotspot Assessment" className="w-full h-full object-contain" />

        {regions.map((region) => {
          const isSelected = selectedRegionId === region.id;
          const isCorrect = region.isCorrect;

          let boxColor = "border-white/60 bg-white/10 hover:bg-indigo-500/30 hover:border-indigo-400";
          if (isSelected) {
            boxColor = "border-indigo-500 bg-indigo-500/40 ring-4 ring-indigo-400/50 shadow-lg";
          }

          if (isSubmitted) {
            if (isCorrect) boxColor = "border-emerald-500 bg-emerald-500/40 text-white font-bold";
            else if (isSelected && !isCorrect) boxColor = "border-rose-500 bg-rose-500/40 text-white font-bold";
          }

          return (
            <div
              key={region.id}
              onClick={() => onSelectHotspot(region.id)}
              style={{
                left: `${region.x}%`,
                top: `${region.y}%`,
                width: `${region.width}%`,
                height: `${region.height}%`,
              }}
              className={`absolute border-2 rounded-xl cursor-pointer transition-all flex items-center justify-center ${boxColor}`}
            >
              <Target className={`w-5 h-5 ${isSelected ? "text-indigo-300 animate-pulse" : "text-white/80"}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
