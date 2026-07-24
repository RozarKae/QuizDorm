"use client";

import React, { useState } from "react";
import { MediaAsset, MediaType } from "@/lib/types/media";
import { Image as ImageIcon, Music, Video, Star, Trash2, Copy, Crop, Scissors, Sparkles, Edit, Tag, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface MediaLibraryGridProps {
  assets: MediaAsset[];
  onDeleteAsset: (id: string) => void;
  onUpdateMetadata: (id: string, updates: Partial<MediaAsset>) => void;
  onOpenCropTrim?: (asset: MediaAsset) => void;
}

export function MediaLibraryGrid({
  assets,
  onDeleteAsset,
  onUpdateMetadata,
  onOpenCropTrim,
}: MediaLibraryGridProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [altTextDraft, setAltTextDraft] = useState("");

  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success("Asset URL copied to clipboard!");
  };

  const handleToggleFavorite = (asset: MediaAsset) => {
    onUpdateMetadata(asset.id, { isFavorite: !asset.isFavorite });
    toast.success(asset.isFavorite ? "Removed from Favorites" : "Added to Favorites!");
  };

  const handleSaveAltText = (id: string) => {
    onUpdateMetadata(id, { altText: altTextDraft });
    setEditingId(null);
    toast.success("Accessibility Alt Text updated!");
  };

  if (assets.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-12 text-center text-gray-500">
        <ImageIcon className="w-12 h-12 mx-auto text-gray-300 dark:text-gray-700 mb-3" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white">No media assets found</h3>
        <p className="text-xs text-gray-400 mt-1">Upload images, audio clips, or videos to populate your institution media library.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {assets.map((asset) => {
        const isEditing = editingId === asset.id;

        return (
          <div
            key={asset.id}
            className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Preview Box */}
            <div className="relative h-44 bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden group">
              {asset.type === "image" || asset.type === "diagram" ? (
                <img
                  src={asset.url}
                  alt={asset.altText || asset.name}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              ) : asset.type === "audio" ? (
                <div className="flex flex-col items-center space-y-2 p-4 text-center">
                  <div className="p-4 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-300">
                    <Music className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate max-w-[200px]">
                    {asset.name}
                  </span>
                  {asset.durationSeconds && (
                    <span className="text-[10px] text-gray-400 font-mono">{asset.durationSeconds}s duration</span>
                  )}
                </div>
              ) : (
                <div className="flex flex-col items-center space-y-2 p-4 text-center">
                  <div className="p-4 rounded-full bg-rose-100 text-rose-600 dark:bg-rose-950 dark:text-rose-300">
                    <Video className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-gray-800 dark:text-gray-200 truncate max-w-[200px]">
                    {asset.name}
                  </span>
                </div>
              )}

              {/* Type Badge */}
              <div className="absolute top-2 left-2 flex items-center space-x-1.5">
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-gray-900/80 text-white backdrop-blur-sm">
                  {asset.type}
                </span>
                {asset.isAiGenerated && (
                  <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white shadow-sm flex items-center">
                    <Sparkles className="w-2.5 h-2.5 mr-0.5" /> AI Asset
                  </span>
                )}
              </div>

              {/* Favorite Button */}
              <button
                onClick={() => handleToggleFavorite(asset)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-gray-900/60 text-white hover:bg-gray-900 backdrop-blur-sm transition-colors"
              >
                <Star className={`w-3.5 h-3.5 ${asset.isFavorite ? "fill-amber-400 text-amber-400" : ""}`} />
              </button>
            </div>

            {/* Content Details */}
            <div className="p-3.5 space-y-2 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate" title={asset.name}>
                  {asset.name}
                </h4>

                {/* Alt Text Section */}
                {isEditing ? (
                  <div className="mt-2 space-y-1">
                    <input
                      type="text"
                      value={altTextDraft}
                      onChange={(e) => setAltTextDraft(e.target.value)}
                      placeholder="Enter accessible Alt Text..."
                      className="w-full text-[11px] p-1.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
                    />
                    <div className="flex justify-end space-x-1">
                      <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="h-6 text-[10px]">
                        Cancel
                      </Button>
                      <Button size="sm" onClick={() => handleSaveAltText(asset.id)} className="h-6 text-[10px] bg-indigo-600 text-white">
                        Save
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-1 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
                    <span className="truncate italic" title={asset.altText || "No Alt Text set"}>
                      {asset.altText ? `"${asset.altText}"` : "No Alt Text (Click to add)"}
                    </span>
                    <button
                      onClick={() => {
                        setEditingId(asset.id);
                        setAltTextDraft(asset.altText || "");
                      }}
                      className="p-1 text-gray-400 hover:text-indigo-600"
                      title="Edit Alt Text"
                    >
                      <Edit className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

              {/* Action Toolbar */}
              <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs">
                <span className="text-[10px] text-gray-400">
                  {(asset.sizeBytes / (1024 * 1024)).toFixed(1)} MB • {asset.usageCount} uses
                </span>

                <div className="flex items-center space-x-1">
                  {onOpenCropTrim && (
                    <button
                      onClick={() => onOpenCropTrim(asset)}
                      className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-900"
                      title={asset.type === "image" ? "Crop Image" : "Trim Audio/Video"}
                    >
                      {asset.type === "image" ? <Crop className="w-3.5 h-3.5" /> : <Scissors className="w-3.5 h-3.5" />}
                    </button>
                  )}
                  <button
                    onClick={() => handleCopyUrl(asset.url)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-indigo-600 hover:bg-gray-100 dark:hover:bg-gray-900"
                    title="Copy Media URL"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onDeleteAsset(asset.id)}
                    className="p-1.5 rounded-lg text-gray-500 hover:text-rose-600 hover:bg-gray-100 dark:hover:bg-gray-900"
                    title="Delete Asset"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
