import { ExtractedQuestion, OCRJobSettings, ConfidenceScores } from "@/lib/types/ocr";

export interface OCRProcessResult {
  rawText: string;
  pageCount: number;
  confidence: ConfidenceScores;
  detectedQuestions: ExtractedQuestion[];
}

export interface IOCREngineProvider {
  id: string;
  name: string;
  description: string;
  supportedFormats: string[];
  supportsHandwriting: boolean;
  supportsMath: boolean;
  supportsTables: boolean;

  processDocument(
    fileOrContent: File | { name: string; type: string; content?: string },
    settings: OCRJobSettings
  ): Promise<OCRProcessResult>;
}
