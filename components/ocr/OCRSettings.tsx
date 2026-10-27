"use client";

import { Card,CardContent,CardHeader,CardTitle } from "@/components/ui/card";
import { availableOCRProviders } from "@/lib/ocr/providers";
import { OCRJobSettings,OCRLanguage,OCRProviderType,OCRRecognitionMode } from "@/lib/types/ocr";
import { Cpu,FileCode2,Languages,Settings,Sparkles } from "lucide-react";

interface OCRSettingsProps {
  settings: OCRJobSettings;
  onChange: (newSettings: OCRJobSettings) => void;
}

export function OCRSettings({ settings, onChange }: OCRSettingsProps) {
  const handleProviderChange = (provider: OCRProviderType) => {
    onChange({ ...settings, provider });
  };

  const handleModeChange = (mode: OCRRecognitionMode) => {
    onChange({ ...settings, mode });
  };

  const handleLanguageChange = (language: OCRLanguage) => {
    onChange({ ...settings, language });
  };

  const toggleOption = (key: keyof OCRJobSettings) => {
    if (typeof settings[key] === "boolean") {
      onChange({ ...settings, [key]: !settings[key] });
    }
  };

  return (
    <Card className="border border-[rgba(240, 160, 180,0.18)] shadow-lg bg-[#140C0E] rounded-[8px] font-mono">
      <CardHeader className="border-b border-[rgba(240, 160, 180,0.12)] pb-4">
        <CardTitle className="text-sm font-bold flex items-center text-[#F2F7F3] uppercase tracking-wider">
          <Settings className="w-4 h-4 text-[#FF4D6D] mr-2" /> OCR &amp; Multimodal Intelligence Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        {/* Provider Selection */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#A0AEA5] flex items-center mb-3">
            <Cpu className="w-3.5 h-3.5 text-[#FF4D6D] mr-1.5" /> Select OCR Ingestion Engine
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {availableOCRProviders.map((p) => {
              const isSelected = settings.provider === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => handleProviderChange(p.id)}
                  className={`p-3.5 rounded-[5px] border text-left cursor-pointer transition-all ${
                    isSelected
                      ? "border-[#FF4D6D] bg-[rgba(255, 77, 109,0.12)] shadow-[0_0_15px_rgba(255, 77, 109,0.15)]"
                      : "border-[rgba(240, 160, 180,0.14)] hover:border-[rgba(240, 160, 180,0.25)] bg-[#1D1013]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#F2F7F3]">{p.name}</span>
                    {p.badge && (
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-[2px] ${
                          isSelected
                            ? "bg-[#FF4D6D] text-[#0B0708]"
                            : "bg-[#140C0E] text-[#A0AEA5] border border-[rgba(240, 160, 180,0.15)]"
                        }`}
                      >
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#A0AEA5] line-clamp-2">{p.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recognition Mode */}
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-[#A0AEA5] flex items-center mb-3">
            <FileCode2 className="w-3.5 h-3.5 text-[#FF758F] mr-1.5" /> Recognition Mode
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { id: "printed", label: "Printed Book / Exam", desc: "Standard published text" },
              { id: "handwritten", label: "Handwritten Notes", desc: "Worksheets & scans" },
              { id: "mixed", label: "Mixed Document", desc: "Text & diagrams" },
              { id: "math_dense", label: "Math & Equations", desc: "LaTeX & matrices" },
            ].map((m) => {
              const isSel = settings.mode === m.id;
              return (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => handleModeChange(m.id as OCRRecognitionMode)}
                  className={`p-3 rounded-[5px] border text-left transition-all ${
                    isSel
                      ? "border-[#FF4D6D] bg-[#FF4D6D] text-[#0B0708] shadow-sm font-bold"
                      : "border-[rgba(240, 160, 180,0.14)] bg-[#1D1013] text-[#A0AEA5] hover:text-[#F2F7F3]"
                  }`}
                >
                  <div className="text-xs font-bold">{m.label}</div>
                  <div className={`text-[10px] mt-0.5 ${isSel ? "text-[#0B0708]/80 font-medium" : "text-[#69786F]"}`}>
                    {m.desc}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Language Selection & Automations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#A0AEA5] flex items-center mb-2">
              <Languages className="w-3.5 h-3.5 text-[#FF4D6D] mr-1.5" /> OCR Target Language
            </label>
            <select
              value={settings.language}
              onChange={(e) => handleLanguageChange(e.target.value as OCRLanguage)}
              className="w-full text-xs font-mono p-2.5 rounded-[4px] border border-[rgba(240, 160, 180,0.2)] bg-[#1D1013] text-[#F2F7F3] focus:border-[#FF4D6D] focus:outline-none"
            >
              <option value="auto">Auto-detect Language</option>
              <option value="en">English (US / UK)</option>
              <option value="es">Spanish (Español)</option>
              <option value="fr">French (Français)</option>
              <option value="de">German (Deutsch)</option>
              <option value="hi">Hindi (हिन्दी)</option>
              <option value="zh">Chinese (中文)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#A0AEA5] flex items-center mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#FF758F] mr-1.5" /> Pedagogical Automations
            </label>
            <div className="space-y-2">
              {[
                { key: "autoNumbering", label: "Auto-detect Question Numbers" },
                { key: "autoTopicDetection", label: "Auto-assign Subject & Topic Taxonomy" },
                { key: "autoDifficultyDetection", label: "Auto-estimate Difficulty (Easy/Med/Hard)" },
              ].map((opt) => (
                <label
                  key={opt.key}
                  className="flex items-center space-x-2.5 text-xs text-[#A0AEA5] hover:text-[#F2F7F3] cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={Boolean(settings[opt.key as keyof OCRJobSettings])}
                    onChange={() => toggleOption(opt.key as keyof OCRJobSettings)}
                    className="rounded-[2px] border-[rgba(240, 160, 180,0.3)] bg-[#1D1013] text-[#FF4D6D] focus:ring-0 h-4 w-4"
                  />
                  <span>{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
