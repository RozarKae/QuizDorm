import { MediaAsset, MediaCollection, StorageQuotaUsage, MediaType } from "@/lib/types/media";

export interface IMediaStorageProvider {
  id: string;
  name: string;
  uploadAsset(file: File | { name: string; type: MediaType; url?: string; sizeBytes?: number }): Promise<MediaAsset>;
  deleteAsset(assetId: string): Promise<void>;
  updateAssetMetadata(assetId: string, updates: Partial<MediaAsset>): Promise<MediaAsset>;
  getAssets(filter?: { type?: MediaType; collectionId?: string; search?: string }): Promise<MediaAsset[]>;
  getQuotaUsage(): Promise<StorageQuotaUsage>;
}

const STORAGE_KEY_ASSETS = "quizdorm_media_assets";
const STORAGE_KEY_COLLECTIONS = "quizdorm_media_collections";

export const INITIAL_MOCK_ASSETS: MediaAsset[] = [
  {
    id: "asset-1",
    name: "human_brain_anatomy_diagram.png",
    url: "/images/placeholders/brain-diagram.png",
    type: "image",
    mimeType: "image/png",
    sizeBytes: 1548576,
    uploadedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    dimensions: { width: 1200, height: 800 },
    altText: "Detailed cross-section diagram of human brain cerebrum, cerebellum and brainstem",
    caption: "Human Brain Anatomical Structure for Biology Quiz",
    tags: ["biology", "anatomy", "diagram"],
    isFavorite: true,
    isAiGenerated: false,
    usageCount: 4,
  },
  {
    id: "asset-2",
    name: "french_pronunciation_listening_test.mp3",
    url: "/audio/placeholders/french-listening.mp3",
    type: "audio",
    mimeType: "audio/mpeg",
    sizeBytes: 3145728,
    uploadedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    durationSeconds: 45,
    transcript: "Bonjour et bienvenue à l'examen de compréhension orale. Écoutez attentivement le passage suivant.",
    altText: "French audio listening assessment passage 1",
    tags: ["french", "listening", "language"],
    isFavorite: false,
    isAiGenerated: false,
    usageCount: 2,
  },
  {
    id: "asset-3",
    name: "physics_pendulum_oscillation.mp4",
    url: "/video/placeholders/pendulum.mp4",
    type: "video",
    mimeType: "video/mp4",
    sizeBytes: 12582912,
    uploadedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    updatedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    durationSeconds: 120,
    altText: "Video demonstration of simple harmonic pendulum motion with angle theta",
    tags: ["physics", "kinematics", "experiment"],
    isFavorite: true,
    isAiGenerated: false,
    usageCount: 5,
  },
  {
    id: "asset-4",
    name: "circuit_resistor_schematic_ai.png",
    url: "/images/placeholders/circuit-diagram.png",
    type: "diagram",
    mimeType: "image/png",
    sizeBytes: 850000,
    uploadedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    dimensions: { width: 1024, height: 768 },
    altText: "AI generated electrical circuit diagram with series resistors and 12V power supply",
    tags: ["physics", "circuits", "ai-generated"],
    isFavorite: false,
    isAiGenerated: true,
    usageCount: 1,
  },
];

export class LocalMediaStorageProvider implements IMediaStorageProvider {
  id = "local_storage";
  name = "QuizDorm Local Storage & Media Cache";

  async getAssets(filter?: { type?: MediaType; collectionId?: string; search?: string }): Promise<MediaAsset[]> {
    if (typeof window === "undefined") return INITIAL_MOCK_ASSETS;
    try {
      const raw = localStorage.getItem(STORAGE_KEY_ASSETS);
      let list: MediaAsset[] = raw ? JSON.parse(raw) : INITIAL_MOCK_ASSETS;

      if (!raw) {
        localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(INITIAL_MOCK_ASSETS));
      }

      if (filter?.type) list = list.filter((a) => a.type === filter.type);
      if (filter?.collectionId) list = list.filter((a) => a.collectionId === filter.collectionId);
      if (filter?.search) {
        const q = filter.search.toLowerCase();
        list = list.filter(
          (a) =>
            a.name.toLowerCase().includes(q) ||
            a.tags.some((t) => t.toLowerCase().includes(q)) ||
            (a.altText && a.altText.toLowerCase().includes(q))
        );
      }

      return list;
    } catch {
      return INITIAL_MOCK_ASSETS;
    }
  }

  async uploadAsset(
    file: File | { name: string; type: MediaType; url?: string; sizeBytes?: number }
  ): Promise<MediaAsset> {
    const assets = await this.getAssets();

    let assetType: MediaType = "image";
    let mimeType = "image/png";

    if ("type" in file && typeof file.type === "string" && ["image", "audio", "video", "diagram", "document"].includes(file.type)) {
      assetType = file.type as MediaType;
    } else if ("type" in file && typeof file.type === "string") {
      if (file.type.startsWith("audio/")) assetType = "audio";
      else if (file.type.startsWith("video/")) assetType = "video";
      mimeType = file.type;
    }

    const newAsset: MediaAsset = {
      id: `asset-${Date.now()}`,
      name: file.name,
      url: "url" in file && file.url ? file.url : URL.createObjectURL(file as File),
      type: assetType,
      mimeType: mimeType,
      sizeBytes: "size" in file && file.size ? file.size : 2048576,
      uploadedAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      altText: `Uploaded ${assetType} ${file.name}`,
      tags: [assetType, "user-uploaded"],
      isFavorite: false,
      isAiGenerated: false,
      usageCount: 0,
    };

    const nextList = [newAsset, ...assets];
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(nextList));
    }

    return newAsset;
  }

  async deleteAsset(assetId: string): Promise<void> {
    const assets = await this.getAssets();
    const updated = assets.filter((a) => a.id !== assetId);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(updated));
    }
  }

  async updateAssetMetadata(assetId: string, updates: Partial<MediaAsset>): Promise<MediaAsset> {
    const assets = await this.getAssets();
    const idx = assets.findIndex((a) => a.id === assetId);
    if (idx === -1) throw new Error("Asset not found");

    const updated = { ...assets[idx], ...updates, updatedAt: new Date().toISOString() };
    assets[idx] = updated;

    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(assets));
    }

    return updated;
  }

  async getQuotaUsage(): Promise<StorageQuotaUsage> {
    const assets = await this.getAssets();
    const usedBytes = assets.reduce((acc, a) => acc + a.sizeBytes, 0);

    return {
      usedBytes,
      maxBytes: 10 * 1024 * 1024 * 1024, // 10 GB
      imageCount: assets.filter((a) => a.type === "image").length,
      audioCount: assets.filter((a) => a.type === "audio").length,
      videoCount: assets.filter((a) => a.type === "video").length,
      diagramCount: assets.filter((a) => a.type === "diagram").length,
    };
  }
}

export const mediaStorage = new LocalMediaStorageProvider();
