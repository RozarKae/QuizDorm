import { OrganizationBranding } from "@/lib/types/organization";
import { Eye } from "lucide-react";

interface BrandingPreviewProps {
  branding: OrganizationBranding;
  orgName: string;
}

export function BrandingPreview({ branding, orgName }: BrandingPreviewProps) {
  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center">
        <Eye className="w-4 h-4 text-indigo-600 mr-2" /> Custom Branding Live Preview
      </h4>

      {/* Mock Header */}
      <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div
              className="w-7 h-7 rounded-lg text-white font-bold text-xs flex items-center justify-center shadow-sm"
              style={{ backgroundColor: branding.primaryColor || "#4F46E5" }}
            >
              {orgName.charAt(0)}
            </div>
            <span className="text-xs font-bold text-gray-900 dark:text-white">{orgName}</span>
          </div>

          <div
            className="px-2.5 py-1 rounded-full text-[10px] font-bold text-white shadow-sm"
            style={{ backgroundColor: branding.secondaryColor || "#10B981" }}
          >
            Verified Portal
          </div>
        </div>

        {/* Mock Button */}
        <div className="pt-2">
          <button
            type="button"
            className="w-full py-2 rounded-xl text-xs font-bold text-white shadow-sm transition-all"
            style={{ backgroundColor: branding.primaryColor || "#4F46E5" }}
          >
            Sign In to {orgName} Portal
          </button>
        </div>
      </div>
    </div>
  );
}
