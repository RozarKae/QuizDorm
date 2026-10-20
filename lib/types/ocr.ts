import { QuestionType, DifficultyLevel } from "./question";

export type OCRProviderType =
  | "mock"
  | "google_vision"
  | "azure_ocr"
  | "aws_textract"
  | "tesseract"
  | "paddle_ocr";

export type OCRRecognitionMode = "printed" | "handwritten" | "mixed" | "math_dense";

export type OCRLanguage = "auto" | "en" | "es" | "fr" | "de" | "hi" | "zh";

export type OCRJobStatus =
  | "queued"
  | "processing"
  | "review_ready"
  | "completed"
  | "failed"
  | "archived";

export interface ConfidenceScores {
  overall: number; // 0 to 100
  ocrAccuracy: number;
  questionDetection: number;
  answerDetection: number;
  tableRecognition: number;
  handwritingRecognition: number;
}

export interface ExtractedTable {
  id: string;
  caption?: string;
  headers: string[];
  rows: string[][];
}

export interface ExtractedDiagram {
  id: string;
  label: string;
  placeholderUrl: string;
  type: "chart" | "graph" | "map" | "scientific_diagram";
  boundingRegion?: { x: number; y: number; width: number; height: number };
}

export interface ExtractedMath {
  rawLatex: string;
  renderedText: string;
}

export interface DuplicateMatch {
  existingQuestionId: string;
  existingTitle: string;
  similarityScore: number; // 0 to 100
  matchType: "exact" | "similar" | "concept";
}

export interface ExtractedQuestionOption {
  id: string;
  text: string;
  isCorrect?: boolean;
}

export interface ExtractedQuestion {
  id: string;
  questionNumber?: string;
  title: string;
  description?: string;
  type: QuestionType;
  subject: string;
  category?: string;
  topic: string;
  subtopic?: string;
  difficulty: DifficultyLevel;
  marks: number;
  timeLimitSeconds?: number;
  options: ExtractedQuestionOption[];
  matchingPairs?: { id: string; leftItem: string; rightItem: string }[];
  sequenceItems?: { id: string; text: string; order: number }[];
  dragDropCategories?: { id: string; title: string }[];
  dragDropItems?: { id: string; text: string; categoryId: string }[];
  fillBlanks?: string[];
  explanation?: string;
  hints?: string[];
  tables?: ExtractedTable[];
  diagrams?: ExtractedDiagram[];
  mathExpressions?: string[];
  confidence: ConfidenceScores;
  isHandwritten?: boolean;
  status: "detected" | "edited" | "flagged";
  duplicateMatch?: DuplicateMatch;
  lowConfidenceFields?: ("title" | "options" | "answer" | "topic" | "handwriting" | "table")[];
}

export interface OCRJobSettings {
  language: OCRLanguage;
  mode: OCRRecognitionMode;
  provider: OCRProviderType;
  autoNumbering: boolean;
  autoTopicDetection: boolean;
  autoDifficultyDetection: boolean;
  virusScanPassed: boolean;
  targetSubject?: string;
  targetTopic?: string;
  targetDifficulty?: string;
  targetQuestionCount?: number;
}

export interface OCRJob {
  id: string;
  fileName: string;
  fileSize: number; // in bytes
  fileType: string; // extension or mime type
  status: OCRJobStatus;
  progress: number; // 0 to 100
  currentStep:
    | "Upload"
    | "OCR Processing"
    | "AI Structuring"
    | "Question Detection"
    | "Quality Validation"
    | "Duplicate Check"
    | "Educator Review"
    | "Completed"
    | "Failed";
  uploadedAt: string;
  updatedAt: string;
  pageCount?: number;
  extractedQuestions: ExtractedQuestion[];
  rawText?: string;
  subject?: string;
  teacherId?: string;
  organizationId?: string;
  settings: OCRJobSettings;
  error?: string;
  lowConfidenceCount?: number;
}
