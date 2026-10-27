"use client";

import { Button } from "@/components/ui/button";
import { FileText,Mic,Pause,Play,Volume2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AudioPlayerCardProps {
  audioUrl?: string;
  transcript?: string;
  title?: string;
  allowDictation?: boolean;
}

export function AudioPlayerCard({
  audioUrl,
  transcript,
  title = "Audio Assessment Passage",
  allowDictation = false,
}: AudioPlayerCardProps) {
  void audioUrl;
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [recording, setRecording] = useState(false);
  const [recordedText, setRecordedText] = useState("");

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleCycleSpeed = () => {
    const nextRate = playbackRate === 1 ? 1.25 : playbackRate === 1.25 ? 1.5 : 1;
    setPlaybackRate(nextRate);
    toast.info(`Playback speed set to ${nextRate}x`);
  };

  const handleSimulateRecording = () => {
    setRecording(true);
    setTimeout(() => {
      setRecording(false);
      setRecordedText("Bonjour, je m'appelle Alex et j'apprends le français.");
      toast.success("Voice recording analyzed for pronunciation accuracy (92%)!");
    }, 2000);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-2 rounded-xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
            <Volume2 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white">{title}</h4>
            <span className="text-[10px] text-gray-400">High Fidelity Audio Stream ({playbackRate}x)</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {transcript && (
            <button
              onClick={() => setShowTranscript(!showTranscript)}
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 flex items-center hover:underline"
            >
              <FileText className="w-3.5 h-3.5 mr-1" /> {showTranscript ? "Hide Transcript" : "Transcript"}
            </button>
          )}
          <button
            onClick={handleCycleSpeed}
            className="px-2 py-0.5 rounded-lg border border-gray-200 dark:border-gray-800 text-[11px] font-bold text-gray-700 dark:text-gray-300"
          >
            {playbackRate}x
          </button>
        </div>
      </div>

      {/* Simulated Waveform & Play Control */}
      <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
        <button
          onClick={handleTogglePlay}
          className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-md hover:scale-105 transition-all"
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
        </button>

        {/* Waveform Visualization Bars */}
        <div className="flex-1 flex items-center space-x-1 h-8">
          {[40, 65, 30, 90, 45, 80, 20, 60, 95, 35, 70, 50, 85, 40, 60, 30, 75].map((h, i) => (
            <div
              key={i}
              style={{ height: `${h}%` }}
              className={`flex-1 rounded-full transition-all ${
                isPlaying ? "bg-indigo-600 animate-pulse" : "bg-gray-300 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Transcript Drawer */}
      {showTranscript && transcript && (
        <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/40 rounded-xl border border-indigo-100 dark:border-indigo-900 text-xs text-indigo-900 dark:text-indigo-200 italic">
          &ldquo;{transcript}&rdquo;
        </div>
      )}

      {/* Optional Pronunciation Assessment / Dictation Recorder */}
      {allowDictation && (
        <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
          <label className="text-xs font-bold text-gray-700 dark:text-gray-300 flex items-center">
            <Mic className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Voice Pronunciation & Dictation Recorder
          </label>
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              onClick={handleSimulateRecording}
              disabled={recording}
              className="bg-indigo-600 text-white text-xs rounded-xl"
            >
              {recording ? "Listening..." : "Record Answer"}
            </Button>
            {recordedText && (
              <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 truncate">
                &ldquo;{recordedText}&rdquo;
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
