export type MediaType = "image" | "audio" | "video" | "diagram" | "document";

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: MediaType;
  mimeType: string;
  sizeBytes: number;
  uploadedAt: string;
  updatedAt: string;
  dimensions?: { width: number; height: number };
  durationSeconds?: number;
  altText?: string;
  caption?: string;
  transcript?: string;
  tags: string[];
  collectionId?: string;
  isFavorite?: boolean;
  isAiGenerated?: boolean;
  usageCount: number;
}

export interface MediaCollection {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  assetCount: number;
  createdAt: string;
}

export interface HotspotRegion {
  id: string;
  label: string;
  shape: "rectangle" | "circle" | "polygon";
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  width: number; // percentage 0-100
  height: number; // percentage 0-100
  isCorrect?: boolean;
  feedback?: string;
}

export interface DragDropCategory {
  id: string;
  name: string;
  dropzoneImageUrl?: string;
}

export interface DragDropItem {
  id: string;
  text: string;
  imageUrl?: string;
  targetCategoryId: string;
}

export interface DiagramLabelPin {
  id: string;
  labelText: string;
  x: number; // percentage
  y: number; // percentage
}

export interface TimelineEventItem {
  id: string;
  title: string;
  dateOrEra?: string;
  description?: string;
  imageUrl?: string;
  correctOrder: number;
}

export interface VideoTimestampMarker {
  id: string;
  timestampSeconds: number;
  label: string;
  questionId?: string;
}

export interface CodeQuestionData {
  language: string;
  initialCode: string;
  expectedOutput?: string;
  bugLineNumbers?: number[];
}

export interface InteractiveMapRegion {
  id: string;
  regionName: string;
  coordinates: string; // SVG path or geo string
  isTargetRegion?: boolean;
}

export interface StorageQuotaUsage {
  usedBytes: number;
  maxBytes: number;
  imageCount: number;
  audioCount: number;
  videoCount: number;
  diagramCount: number;
}
