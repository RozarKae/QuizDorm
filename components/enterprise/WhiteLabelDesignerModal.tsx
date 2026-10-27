"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TenantManager } from "@/lib/enterprise/tenantManager";
import { Tenant } from "@/lib/types/enterprise";
import { Palette } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface WhiteLabelDesignerModalProps {
  tenant: Tenant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WhiteLabelDesignerModal({ tenant, open, onOpenChange }: WhiteLabelDesignerModalProps) {
  const [domain, setDomain] = useState(tenant?.domain || "quiz.school.edu");
  const [primaryColor, setPrimaryColor] = useState(tenant?.primaryColor || "#4f46e5");
  const [theme, setTheme] = useState(tenant?.theme || "dark");

  if (!open || !tenant) return null;

  const handleSave = () => {
    TenantManager.updateTenant(tenant.id, {
      domain,
      primaryColor,
      theme,
    });
    toast.success(`White-Label configuration saved for ${tenant.name}!`);
    onOpenChange(false);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
            <Palette className="w-5 h-5 text-indigo-600 mr-2" /> White-Label Tenant Customizer
          </h3>
          <button onClick={() => onOpenChange(false)} className="text-gray-400">✕</button>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Custom Institution Domain</label>
            <Input value={domain} onChange={(e) => setDomain(e.target.value)} className="text-xs font-mono" />
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Primary Accent Color</label>
            <div className="flex items-center space-x-3">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-10 h-10 rounded-xl cursor-pointer border-none bg-transparent"
              />
              <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="text-xs font-mono w-32" />
            </div>
          </div>

          <div>
            <label className="font-bold text-gray-700 dark:text-gray-300 block mb-1">Default UI Theme</label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value as "dark" | "light" | "custom")}
              className="w-full p-2.5 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 font-bold"
            >
              <option value="dark">Sleek Dark Mode (Default)</option>
              <option value="light">Academic Light Mode</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="text-xs rounded-xl">Cancel</Button>
          <Button onClick={handleSave} className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl">Save White-Label</Button>
        </div>
      </div>
    </div>
  );
}
