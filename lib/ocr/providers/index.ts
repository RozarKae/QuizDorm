import { IOCREngineProvider } from "../provider";
import { MockOCRProvider } from "./mockProvider";
import { OCRProviderType } from "@/lib/types/ocr";

export const availableOCRProviders: { id: OCRProviderType; name: string; description: string; badge?: string }[] = [
  {
    id: "mock",
    name: "QuizDorm Smart OCR Engine",
    description: "Built-in multi-modal engine supporting Printed, Handwritten, Tables & Math (LaTeX).",
    badge: "Active",
  },
  {
    id: "google_vision",
    name: "Google Cloud Vision OCR",
    description: "Enterprise text, document structural recognition & language translation.",
    badge: "Adapter Ready",
  },
  {
    id: "azure_ocr",
    name: "Azure AI Document Intelligence",
    description: "Advanced layout analysis, form processing, and structured table extraction.",
    badge: "Adapter Ready",
  },
  {
    id: "aws_textract",
    name: "AWS Textract",
    description: "ML-driven handwriting, form, table, and document analysis.",
    badge: "Adapter Ready",
  },
  {
    id: "tesseract",
    name: "Tesseract OCR (Open Source)",
    description: "Local client-side WebAssembly / server-side offline text extractor.",
    badge: "Adapter Ready",
  },
  {
    id: "paddle_ocr",
    name: "PaddleOCR",
    description: "Ultra-lightweight multi-lingual OCR model optimized for Asian & Western scripts.",
    badge: "Adapter Ready",
  },
];

const providerInstances: Record<string, IOCREngineProvider> = {
  mock: new MockOCRProvider(),
};

export function getOCRProvider(providerId: OCRProviderType): IOCREngineProvider {
  return providerInstances[providerId] || providerInstances.mock;
}
