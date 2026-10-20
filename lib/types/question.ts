import {
  HotspotRegion,
  DragDropCategory,
  DragDropItem,
  DiagramLabelPin,
  TimelineEventItem,
  VideoTimestampMarker,
  CodeQuestionData,
  InteractiveMapRegion,
} from "./media";

export type QuestionType =
  | "mcq_single"
  | "mcq_multiple"
  | "true_false"
  | "fill_in_the_blank"
  | "match_following"
  | "sequence_ordering"
  | "drag_drop_categorize"
  | "error_spotting"
  | "assertion_reasoning"
  | "image_based"
  // Phase 2.2 Interactive & Multimedia Question Types
  | "hotspot"
  | "diagram_labeling"
  | "timeline_ordering"
  | "audio_listening"
  | "video_timestamp"
  | "code_snippet"
  | "interactive_map";

export type DifficultyLevel = "Easy" | "Medium" | "Hard";

export interface QuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
  image?: string;
  audioUrl?: string;
  videoUrl?: string;
  explanation?: string;
}

export interface MatchPair {
  id: string;
  leftItem: string;
  rightItem: string;
  leftImageUrl?: string;
  rightImageUrl?: string;
  leftAudioUrl?: string;
}

export interface SequenceItem {
  id: string;
  text: string;
  order: number;
  imageUrl?: string;
}

export interface QuestionItem {
  id: string;
  title: string; // Supports Markdown, LaTeX equations, Rich Text HTML
  description?: string;
  type: QuestionType;
  subject: string;
  category: string;
  topic: string;
  subtopic?: string;
  difficulty: DifficultyLevel;
  gradeLevel?: string;
  grade?: string;
  marks: number;
  negativeMarks?: number;
  timeLimitSeconds: number;
  explanation?: string;
  hints?: string[];
  tags: string[];

  // Media attachments
  image?: string; // Main image URL
  audioUrl?: string; // Audio question file URL
  videoUrl?: string; // Embedded video URL
  transcript?: string; // Audio/Video transcript

  // Interactive Question Type Schemas
  options: QuestionOption[];
  matchingPairs?: MatchPair[];
  sequenceItems?: SequenceItem[];
  fillBlanks?: string[];

  // Hotspot
  hotspotRegions?: HotspotRegion[];

  // Drag and Drop Categorization
  dragDropCategories?: DragDropCategory[];
  dragDropItems?: DragDropItem[];

  // Diagram Labeling
  diagramLabels?: DiagramLabelPin[];

  // Timeline
  timelineEvents?: TimelineEventItem[];

  // Video Timestamp Quizzes
  videoTimestampMarkers?: VideoTimestampMarker[];

  // Code Questions
  codeData?: CodeQuestionData;

  // Interactive Map
  mapRegions?: InteractiveMapRegion[];

  createdAt: string;
  updatedAt: string;
}

export interface CategoryTaxonomy {
  id: string;
  subject: string;
  category: string;
  topics: string[];
}
