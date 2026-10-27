"use client";

import { Button } from "@/components/ui/button";
import { Dialog,DialogContent,DialogDescription,DialogFooter,DialogHeader,DialogTitle } from "@/components/ui/dialog";
import { MediaAsset } from "@/lib/types/media";
import { Crop,Scissors,Volume2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

interface MediaCropTrimModalProps {
  asset: MediaAsset;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSaveUpdates: (assetId: string, updates: Partial<MediaAsset>) => void;
}

export function MediaCropTrimModal({
  asset,
  open,
  onOpenChange,
  onSaveUpdates,
}: MediaCropTrimModalProps) {
  const [aspectRatio, setAspectRatio] = useState<"16:9" | "4:3" | "1:1">("16:9");
  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(asset.durationSeconds || 60);

  const handleSave = () => {
    if (asset.type === "image" || asset.type === "diagram") {
      onSaveUpdates(asset.id, {
        caption: `${asset.caption || asset.name} (Cropped ${aspectRatio})`,
      });
      toast.success(`Image cropped to ${aspectRatio} ratio!`);
    } else {
      onSaveUpdates(asset.id, {
        durationSeconds: Math.max(1, endTime - startTime),
        transcript: `${asset.transcript || ""} [Trimmed: ${startTime}s - ${endTime}s]`,
      });
      toast.success(`Media trimmed from ${startTime}s to ${endTime}s!`);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl p-6">
        <DialogHeader>
          <DialogTitle className="text-base font-bold flex items-center text-gray-900 dark:text-white">
            {asset.type === "image" ? <Crop className="w-5 h-5 text-indigo-600 mr-2" /> : <Scissors className="w-5 h-5 text-indigo-600 mr-2" />}
            {asset.type === "image" ? "Crop Image Asset" : "Trim Audio / Video Stream"}
          </DialogTitle>
          <DialogDescription className="text-xs">
            Adjust visual boundaries or timestamp start/end markers for assessment optimization.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Media Preview Box */}
          <div className="h-40 rounded-2xl bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden border border-gray-200 dark:border-gray-800">
            {asset.type === "image" || asset.type === "diagram" ? (
              <Image src={asset.url} alt={asset.name} width={400} height={160} unoptimized className="max-h-full object-contain" />
            ) : (
              <div className="flex flex-col items-center space-y-2 text-indigo-600 dark:text-indigo-400">
                <Volume2 className="w-8 h-8" />
                <span className="text-xs font-bold">{asset.name}</span>
              </div>
            )}
          </div>

          {/* Controls */}
          {asset.type === "image" || asset.type === "diagram" ? (
            <div>
              <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-2">
                Select Crop Aspect Ratio
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(["16:9", "4:3", "1:1"] as const).map((ratio) => (
                  <button
                    key={ratio}
                    type="button"
                    onClick={() => setAspectRatio(ratio)}
                    className={`p-2 rounded-xl text-xs font-bold border transition-all ${
                      aspectRatio === ratio
                        ? "border-indigo-600 bg-indigo-600 text-white"
                        : "border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    {ratio}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">Start Time (sec)</label>
                  <input
                    type="number"
                    min={0}
                    value={startTime}
                    onChange={(e) => setStartTime(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 block mb-1">End Time (sec)</label>
                  <input
                    type="number"
                    min={startTime + 1}
                    value={endTime}
                    onChange={(e) => setEndTime(Number(e.target.value))}
                    className="w-full text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <DialogFooter className="pt-2">
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)} className="rounded-xl text-xs">
            Cancel
          </Button>
          <Button onClick={handleSave} size="sm" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">
            Save Modifications
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
