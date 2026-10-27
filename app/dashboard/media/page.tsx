"use client";

import { MediaCropTrimModal } from "@/components/media/MediaCropTrimModal";
import { MediaLibraryGrid } from "@/components/media/MediaLibraryGrid";
import { MediaUploadCard } from "@/components/media/MediaUploadCard";
import { AIAssetGeneratorService } from "@/lib/media/ai-asset-generator";
import { mediaStorage } from "@/lib/media/storage-provider";
import { MediaAsset,StorageQuotaUsage } from "@/lib/types/media";
import { useEffect,useState } from "react";

import { Button } from "@/components/ui/button";
import {
FileImage,
Filter,
HardDrive,
Image as ImageIcon,
Layers,
Music,
Search,
Sparkles,
Star,
Upload,
Video,
Wand2
} from "lucide-react";
import { toast } from "sonner";

export default function MultimediaWorkspacePage() {
  const [activeTab, setActiveTab] = useState<"library" | "upload" | "ai_assets" | "favorites" | "storage">("library");

  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [quota, setQuota] = useState<StorageQuotaUsage | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState<string>("all");

  const [cropTrimAsset, setCropTrimAsset] = useState<MediaAsset | null>(null);
  const [cropTrimOpen, setCropTrimOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);

  const loadData = async () => {
    const loadedAssets = await mediaStorage.getAssets();
    setAssets(loadedAssets);
    const usage = await mediaStorage.getQuotaUsage();
    setQuota(usage);
  };

  useEffect(() => {
    let active = true;
    mediaStorage.getAssets().then((loadedAssets) => {
      if (active) setAssets(loadedAssets);
    });
    mediaStorage.getQuotaUsage().then((usage) => {
      if (active) setQuota(usage);
    });
    return () => {
      active = false;
    };
  }, []);

  const handleUploadSuccess = (asset: MediaAsset) => {
    void asset;
    loadData();
    setActiveTab("library");
  };

  const handleDeleteAsset = async (id: string) => {
    await mediaStorage.deleteAsset(id);
    toast.success("Media asset deleted.");
    loadData();
  };

  const handleUpdateMetadata = async (id: string, updates: Partial<MediaAsset>) => {
    await mediaStorage.updateAssetMetadata(id, updates);
    loadData();
  };

  const handleGenerateAIDiagram = async () => {
    setAiGenerating(true);
    try {
      const newAssets = await AIAssetGeneratorService.suggestEducationalAssets("Biology", "Cell Architecture");
      for (const a of newAssets) {
        await mediaStorage.uploadAsset({ name: a.name, type: a.type, url: a.url });
      }
      toast.success("AI generated educational diagram assets created!");
      loadData();
    } catch {
      toast.error("Failed to generate AI asset");
    } finally {
      setAiGenerating(false);
    }
  };

  const filteredAssets = assets.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      a.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (a.altText && a.altText.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesType = selectedType === "all" || a.type === selectedType;
    const matchesFav = activeTab !== "favorites" || a.isFavorite;
    const matchesAi = activeTab !== "ai_assets" || a.isAiGenerated;

    return matchesSearch && matchesType && matchesFav && matchesAi;
  });

  const usedMB = quota ? (quota.usedBytes / (1024 * 1024)).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-900/50 p-4 sm:p-8 space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="p-2 rounded-2xl bg-white/10 backdrop-blur-md text-indigo-300">
                <FileImage className="w-6 h-6" />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-indigo-300 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                Phase 2.2 Workspace
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Multimedia Library & Asset Storage
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100/80 max-w-2xl">
              Centralized repository for images, audio passages, educational videos, scientific diagrams, and AI-generated asset components.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              onClick={handleGenerateAIDiagram}
              disabled={aiGenerating}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-2xl shadow-lg shadow-indigo-600/30"
            >
              <Wand2 className="w-4 h-4 mr-1.5" /> {aiGenerating ? "Generating..." : "Generate AI Diagrams"}
            </Button>

            <Button
              onClick={() => setActiveTab("upload")}
              className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 rounded-2xl backdrop-blur-md"
            >
              <Upload className="w-4 h-4 mr-1.5" /> Upload Media
            </Button>
          </div>
        </div>

        {/* Quota Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-8 pt-6 border-t border-white/10 text-xs">
          <div>
            <span className="text-indigo-200/70 font-medium">Total Assets</span>
            <div className="text-xl font-bold text-white">{assets.length} Files</div>
          </div>
          <div>
            <span className="text-indigo-200/70 font-medium">Images & Diagrams</span>
            <div className="text-xl font-bold text-indigo-300">{quota?.imageCount || 0 + (quota?.diagramCount || 0)}</div>
          </div>
          <div>
            <span className="text-indigo-200/70 font-medium">Audio Clips</span>
            <div className="text-xl font-bold text-indigo-300">{quota?.audioCount || 0}</div>
          </div>
          <div>
            <span className="text-indigo-200/70 font-medium">Video Stream Assets</span>
            <div className="text-xl font-bold text-indigo-300">{quota?.videoCount || 0}</div>
          </div>
          <div>
            <span className="text-indigo-200/70 font-medium">Storage Used</span>
            <div className="text-xl font-bold text-rose-400">{usedMB} MB / 10 GB</div>
          </div>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-1 overflow-x-auto">
        <div className="flex items-center space-x-2">
          {[
            { id: "library", label: "Media Library", icon: <Layers className="w-4 h-4" /> },
            { id: "upload", label: "Upload Center", icon: <Upload className="w-4 h-4" /> },
            { id: "ai_assets", label: "AI Generated Assets", icon: <Sparkles className="w-4 h-4" /> },
            { id: "favorites", label: "Favorites", icon: <Star className="w-4 h-4" /> },
            { id: "storage", label: "Storage & Quota", icon: <HardDrive className="w-4 h-4" /> },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "library" | "upload" | "ai_assets" | "favorites" | "storage")}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center space-x-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search & Filter Toolbar for Grid Views */}
      {(activeTab === "library" || activeTab === "ai_assets" || activeTab === "favorites") && (
        <div className="bg-white dark:bg-gray-950 p-4 rounded-2xl border border-gray-100 dark:border-gray-850 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search assets by name, tag, or alt-text..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 h-10 text-xs rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white"
            />
          </div>

          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="text-xs p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white font-medium"
            >
              <option value="all">All Media Types</option>
              <option value="image">Images</option>
              <option value="audio">Audio Passages</option>
              <option value="video">Videos</option>
              <option value="diagram">Scientific Diagrams</option>
            </select>
          </div>
        </div>
      )}

      {/* Tab 1, 3, 4: Grid Content */}
      {(activeTab === "library" || activeTab === "ai_assets" || activeTab === "favorites") && (
        <MediaLibraryGrid
          assets={filteredAssets}
          onDeleteAsset={handleDeleteAsset}
          onUpdateMetadata={handleUpdateMetadata}
          onOpenCropTrim={(asset) => {
            setCropTrimAsset(asset);
            setCropTrimOpen(true);
          }}
        />
      )}

      {/* Tab 2: Upload Center */}
      {activeTab === "upload" && <MediaUploadCard onUploadSuccess={handleUploadSuccess} />}

      {/* Tab 5: Storage Quota Overview */}
      {activeTab === "storage" && quota && (
        <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <HardDrive className="w-5 h-5 text-indigo-600 mr-2" /> Storage Usage & Quota Allocations
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-700 dark:text-gray-300">
              <span>Used Capacity: {usedMB} MB</span>
              <span>Max Limit: 10 GB</span>
            </div>
            <div className="w-full bg-gray-100 dark:bg-gray-900 h-3 rounded-full overflow-hidden">
              <div
                className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (quota.usedBytes / quota.maxBytes) * 100)}%` }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-xs">
            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
              <span className="font-bold text-gray-900 dark:text-white flex items-center">
                <ImageIcon className="w-4 h-4 text-indigo-500 mr-1.5" /> Images
              </span>
              <p className="text-gray-500">{quota.imageCount} files</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
              <span className="font-bold text-gray-900 dark:text-white flex items-center">
                <Music className="w-4 h-4 text-indigo-500 mr-1.5" /> Audio Passages
              </span>
              <p className="text-gray-500">{quota.audioCount} files</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
              <span className="font-bold text-gray-900 dark:text-white flex items-center">
                <Video className="w-4 h-4 text-rose-500 mr-1.5" /> Video Quizzes
              </span>
              <p className="text-gray-500">{quota.videoCount} files</p>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 dark:bg-gray-900 space-y-1">
              <span className="font-bold text-gray-900 dark:text-white flex items-center">
                <Layers className="w-4 h-4 text-rose-500 mr-1.5" /> Diagrams
              </span>
              <p className="text-gray-500">{quota.diagramCount} files</p>
            </div>
          </div>
        </div>
      )}

      {/* Crop / Trim Modal */}
      {cropTrimAsset && (
        <MediaCropTrimModal
          asset={cropTrimAsset}
          open={cropTrimOpen}
          onOpenChange={setCropTrimOpen}
          onSaveUpdates={handleUpdateMetadata}
        />
      )}
    </div>
  );
}
