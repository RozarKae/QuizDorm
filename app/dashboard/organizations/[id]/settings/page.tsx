"use client";

import { BrandingPreview } from "@/components/organization/BrandingPreview";
import { useOrganization } from "@/components/organization/OrganizationContext";
import { Button } from "@/components/ui/button";
import { ImageDropzone } from "@/components/ui/image-dropzone";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { ArrowLeft,Palette,Save } from "lucide-react";
import Link from "next/link";
import React,{ useState } from "react";
import { toast } from "sonner";

export default function OrganizationSettingsPage({ params }: { params: { id: string } }) {
  const { activeOrg, updateBranding } = useOrganization();

  const [primaryColor, setPrimaryColor] = useState(activeOrg.branding?.primaryColor || "#4F46E5");
  const [secondaryColor, setSecondaryColor] = useState(activeOrg.branding?.secondaryColor || "#10B981");
  const [dashboardTheme, setDashboardTheme] = useState<"light" | "dark" | "system">(
    activeOrg.branding?.dashboardTheme || "light"
  );

  const handleSaveBranding = (e: React.FormEvent) => {
    e.preventDefault();
    updateBranding({ primaryColor, secondaryColor, dashboardTheme });
    toast.success("Organization custom branding saved!");
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href={`/dashboard/organizations/${params.id}`} className="inline-flex items-center text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white mb-2">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" /> Back to Organization Profile
        </Link>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <Palette className="w-6 h-6 text-indigo-600 mr-2" /> Custom Branding & Organization Settings
        </h1>
        <p className="text-sm text-gray-500">Customize portal theme colors, logos, and tenant preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 7 cols: Settings Form */}
        <form onSubmit={handleSaveBranding} className="lg:col-span-7 bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-gray-900 pb-3">
            Theme & Color Palette
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Primary Color (Hex)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={(e) => setPrimaryColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border cursor-pointer p-0.5"
                />
                <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="text-xs font-mono uppercase font-bold" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Secondary Accent Color</label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={(e) => setSecondaryColor(e.target.value)}
                  className="w-9 h-9 rounded-xl border cursor-pointer p-0.5"
                />
                <Input value={secondaryColor} onChange={(e) => setSecondaryColor(e.target.value)} className="text-xs font-mono uppercase font-bold" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-400 mb-1">Default Dashboard Theme</label>
            <Select
              value={dashboardTheme}
              onChange={(e) => setDashboardTheme(e.target.value as "light" | "dark" | "system")}
              options={[
                { value: "light", label: "Clean Light Mode" },
                { value: "dark", label: "Dark Glassmorphism Mode" },
                { value: "system", label: "Match User System Theme" },
              ]}
              className="text-xs font-medium"
            />
          </div>

          <ImageDropzone label="Custom Logo Asset (PNG/WEBP)" />
          <ImageDropzone label="Login Screen Background (Optional)" />

          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl px-6">
              <Save className="w-4 h-4 mr-1.5" /> Save Custom Branding
            </Button>
          </div>
        </form>

        {/* Right 5 cols: Live Preview */}
        <div className="lg:col-span-5 space-y-4">
          <BrandingPreview
            branding={{ primaryColor, secondaryColor, dashboardTheme }}
            orgName={activeOrg.name}
          />
        </div>
      </div>
    </div>
  );
}
