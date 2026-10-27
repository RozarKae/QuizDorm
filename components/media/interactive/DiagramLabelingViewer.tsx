"use client";

import { DiagramLabelPin } from "@/lib/types/media";
import { Tag } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface DiagramLabelingViewerProps {
  imageUrl: string;
  pins: DiagramLabelPin[];
  onComplete?: (answers: Record<string, string>) => void;
}

export function DiagramLabelingViewer({
  imageUrl,
  pins,
  onComplete,
}: DiagramLabelingViewerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const handleLabelChange = (pinId: string, val: string) => {
    const updated = { ...answers, [pinId]: val };
    setAnswers(updated);
    if (onComplete) onComplete(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
        <span className="font-bold text-gray-900 dark:text-white flex items-center">
          <Tag className="w-4 h-4 text-indigo-600 mr-1.5" /> Diagram Labeling Assessment
        </span>
        <span>Fill in missing label pins on the diagram image</span>
      </div>

      <div className="relative w-full h-80 bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 select-none">
        <Image src={imageUrl || "/images/placeholders/brain-diagram.png"} alt="Diagram Assessment" fill unoptimized className="object-contain" />

        {pins.map((pin, idx) => (
          <div
            key={pin.id}
            style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center space-x-1 z-10"
          >
            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shadow-lg ring-2 ring-white">
              {idx + 1}
            </div>
            <input
              type="text"
              placeholder={`Label ${idx + 1}`}
              value={answers[pin.id] || ""}
              onChange={(e) => handleLabelChange(pin.id, e.target.value)}
              className="text-xs p-1.5 rounded-lg border border-indigo-300 dark:border-indigo-700 bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white font-bold shadow-md w-28 focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
