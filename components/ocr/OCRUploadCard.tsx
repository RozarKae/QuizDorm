"use client";

import React, { useState, useRef } from "react";
import { Upload, FileText, Camera, Sparkles, AlertCircle, FileCheck, Layers, BookOpen } from "lucide-react";
import { OCRJobSettings } from "@/lib/types/ocr";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { OCREngineService } from "@/lib/ocr/engine";

interface OCRUploadCardProps {
  settings: OCRJobSettings;
  onUploadStart: (file: File | { name: string; type: string; content?: string }, subject: string) => void;
  loading?: boolean;
}

export function OCRUploadCard({ settings, onUploadStart, loading = false }: OCRUploadCardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("Physics");
  const [cameraActive, setCameraActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    const val = OCREngineService.validateFile(file);
    if (!val.valid) {
      toast.error(val.error);
      return;
    }
    onUploadStart(file, selectedSubject);
  };

  const handleSimulatedCameraPhoto = () => {
    setCameraActive(true);
    setTimeout(() => {
      setCameraActive(false);
      const photoFile = {
        name: `Camera_Photo_${new Date().toISOString().slice(0, 10)}.jpg`,
        type: "jpg",
        content: "Camera capture data",
      };
      toast.success("Camera photo captured successfully!");
      onUploadStart(photoFile, selectedSubject);
    }, 1200);
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 shadow-sm transition-all">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Document Intelligence Upload Center</h2>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
              Phase 2.1 OCR
            </span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Convert printed books, scanned exams, handwritten notes & math papers into editable Question Bank items.
          </p>
        </div>

        {/* Subject Picker */}
        <div className="flex items-center space-x-2">
          <label className="text-xs font-semibold text-gray-700 dark:text-gray-300 flex items-center">
            <BookOpen className="w-3.5 h-3.5 mr-1 text-indigo-500" /> Target Subject:
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="text-xs p-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 font-medium text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Physics">Physics</option>
            <option value="Mathematics">Mathematics</option>
            <option value="Biology">Biology</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Computer Science">Computer Science</option>
            <option value="General Science">General Science</option>
          </select>
        </div>
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-4 ${
          dragActive
            ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40 scale-[1.01]"
            : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 hover:border-indigo-400 dark:hover:border-indigo-600 hover:bg-indigo-50/20"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf,.docx,.txt,.md,.jpg,.jpeg,.png,.webp,.pptx,.xlsx,.epub"
          onChange={handleChange}
          className="hidden"
        />

        <div className="p-4 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
          <Upload className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            {loading ? "Processing OCR Engine..." : "Drop your files here, or click to browse"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports PDF, Word (DOCX), Text, Markdown, Scanned Images & Photos (up to 50MB)
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2" onClick={(e) => e.stopPropagation()}>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm"
          >
            <FileText className="w-4 h-4 mr-1.5" /> Select File
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={handleSimulatedCameraPhoto}
            disabled={loading || cameraActive}
            className="border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-200 text-xs rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900"
          >
            <Camera className="w-4 h-4 mr-1.5 text-indigo-500" />
            {cameraActive ? "Capturing..." : "Take Camera Photo"}
          </Button>
        </div>
      </div>

      {/* Supported Formats Chips */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs border-t border-gray-100 dark:border-gray-900 pt-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="font-semibold text-gray-600 dark:text-gray-400 mr-1">Formats:</span>
          {["PDF", "DOCX", "TXT", "Markdown", "JPG / PNG", "WEBP", "Scanned Docs", "Camera Photos"].map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 font-medium text-[11px]"
            >
              {fmt}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5">
          <span className="text-[11px] text-gray-400">Architecture Ready:</span>
          {["PowerPoint", "Excel", "EPUB"].map((fmt) => (
            <span
              key={fmt}
              className="px-2 py-0.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 font-semibold text-[10px] border border-emerald-200 dark:border-emerald-800"
            >
              {fmt}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
