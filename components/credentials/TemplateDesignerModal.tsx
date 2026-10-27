"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CertificateBackgroundStyle } from "@/lib/types/credentials";
import { Sliders } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TemplateDesignerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TemplateDesignerModal({ open, onOpenChange }: TemplateDesignerModalProps) {
  const [templateName, setTemplateName] = useState("Custom Organization Award");
  const [bgStyle, setBgStyle] = useState<CertificateBackgroundStyle>("classic_gold");
  const [sealText, setSealText] = useState("OFFICIAL QUIZDORM ACADEMIC SEAL");
  const [signatureName, setSignatureName] = useState("Dr. Eleanor Vance");
  const [signatureRole, setSignatureRole] = useState("Academic Director");

  if (!open) return null;

  const handleSaveTemplate = () => {
    toast.success(`Template "${templateName}" saved to Organization Library!`);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Sliders className="w-5 h-5 text-indigo-600 mr-2" /> Certificate Template Designer
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400 hover:text-gray-600">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Template Name</label>
            <Input value={templateName} onChange={(e) => setTemplateName(e.target.value)} className="text-xs" />
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Background Theme & Border Style</label>
            <select
              value={bgStyle}
              onChange={(e) => setBgStyle(e.target.value as CertificateBackgroundStyle)}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-bold"
            >
              <option value="classic_gold">Classic Gold Foil Academic</option>
              <option value="modern_indigo">Modern Indigo Competition Winner</option>
              <option value="academic_navy">Academic Navy Course Diploma</option>
              <option value="corporate_emerald">Corporate Emerald Training Award</option>
            </select>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Seal Text</label>
            <Input value={sealText} onChange={(e) => setSealText(e.target.value)} className="text-xs" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Signatory Name</label>
              <Input value={signatureName} onChange={(e) => setSignatureName(e.target.value)} className="text-xs" />
            </div>
            <div>
              <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Signatory Role</label>
              <Input value={signatureRole} onChange={(e) => setSignatureRole(e.target.value)} className="text-xs" />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
          <Button onClick={handleSaveTemplate} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">Save Template</Button>
        </div>
      </div>
    </div>
  );
}
