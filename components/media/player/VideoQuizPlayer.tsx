"use client";

import { VideoTimestampMarker } from "@/lib/types/media";
import { Clock,HelpCircle,Pause,Play,Video } from "lucide-react";
import { useState } from "react";

interface VideoQuizPlayerProps {
  videoUrl?: string;
  markers?: VideoTimestampMarker[];
  title?: string;
}

export function VideoQuizPlayer({
  videoUrl,
  markers = [
    { id: "m1", timestampSeconds: 30, label: "Question 1: Pendulum Period Formula" },
    { id: "m2", timestampSeconds: 75, label: "Question 2: Energy Conservation" },
  ],
  title = "Educational Assessment Video",
}: VideoQuizPlayerProps) {
  void videoUrl;
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState<VideoTimestampMarker | null>(null);

  const handleSeek = (secs: number) => {
    setCurrentTime(secs);
    const markerHit = markers.find((m) => Math.abs(m.timestampSeconds - secs) <= 3);
    if (markerHit) {
      setActiveQuestion(markerHit);
      setIsPlaying(false);
    } else {
      setActiveQuestion(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
            <Video className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">{title}</h4>
            <span className="text-[10px] text-gray-400">Interactive Timestamp Video Quiz</span>
          </div>
        </div>

        <span className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
          {Math.floor(currentTime / 60)}:{String(currentTime % 60).padStart(2, "0")} / 02:00
        </span>
      </div>

      {/* Video Screen Container */}
      <div className="relative h-64 bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-gray-800">
        <Video className="w-12 h-12 text-slate-700 animate-pulse" />

        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-indigo-600/90 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
        </button>

        {/* Timestamp Question Overlay Alert */}
        {activeQuestion && (
          <div className="absolute inset-x-4 bottom-4 p-4 rounded-xl bg-indigo-900/90 backdrop-blur-md border border-indigo-500 text-white space-y-2 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between text-xs font-bold">
              <span className="flex items-center">
                <HelpCircle className="w-4 h-4 text-amber-400 mr-1.5" /> Interactive Question Triggered!
              </span>
              <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{activeQuestion.timestampSeconds}s Marker</span>
            </div>
            <p className="text-xs font-semibold">{activeQuestion.label}</p>
          </div>
        )}
      </div>

      {/* Timestamps Scrub Bar */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-semibold text-gray-600 dark:text-gray-400">Timestamp Markers</label>
        <div className="flex items-center space-x-2">
          {markers.map((m) => (
            <button
              key={m.id}
              onClick={() => handleSeek(m.timestampSeconds)}
              className="px-2.5 py-1 rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-xs font-bold border border-indigo-200 dark:border-indigo-800 hover:scale-105 transition-all flex items-center space-x-1"
            >
              <Clock className="w-3 h-3 text-indigo-500" />
              <span>{m.timestampSeconds}s: {m.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
