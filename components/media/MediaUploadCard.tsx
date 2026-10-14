"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, Music, Video, Sparkles, FileText, CheckCircle2 } from "lucide-react";
import { MediaAsset, MediaType } from "@/lib/types/media";
import { mediaStorage } from "@/lib/media/storage-provider";
import { AIAssetGeneratorService } from "@/lib/media/ai-asset-generator";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MediaUploadCardProps {
  onUploadSuccess: (asset: MediaAsset) => void;
}

export function MediaUploadCard({ onUploadSuccess }: MediaUploadCardProps) {
  const [dragActive, setDragActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    else if (e.type === "dragleave") setDragActive(false);
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

  const processFile = async (file: File) => {
    setLoading(true);
    try {
      const asset = await mediaStorage.uploadAsset(file);
      // Auto-generate AI alt text
      const aiAlt = await AIAssetGeneratorService.generateAltText(asset.name, asset.type);
      const updated = await mediaStorage.updateAssetMetadata(asset.id, { altText: aiAlt });

      toast.success(`Successfully uploaded ${asset.name}! AI Alt Text generated.`);
      onUploadSuccess(updated);
    } catch (err: any) {
      toast.error(err.message || "Failed to upload asset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-sm">
      <div
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center space-y-3 ${
          dragActive
            ? "border-indigo-600 bg-indigo-50/60 dark:bg-indigo-950/40"
            : "border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/30 hover:border-indigo-400"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,audio/*,video/*,.pdf,.svg"
          onChange={handleChange}
          className="hidden"
        />

        <div className="flex space-x-2 p-3 rounded-2xl bg-indigo-600/10 text-indigo-600 dark:text-indigo-400">
          <ImageIcon className="w-6 h-6" />
          <Music className="w-6 h-6" />
          <Video className="w-6 h-6" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-white">
            {loading ? "Uploading & Generating AI Alt Text..." : "Drop media files here, or click to upload"}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            Supports High-res Images (PNG, JPG, WEBP, SVG), Audio (MP3, WAV, AAC), and Videos (MP4, WEBM)
          </p>
        </div>

        <div className="flex items-center space-x-2 pt-1" onClick={(e) => e.stopPropagation()}>
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs rounded-xl shadow-sm"
          >
            <Upload className="w-4 h-4 mr-1.5" /> Upload Media Asset
          </Button>
        </div>
      </div>
    </div>
  );
}
