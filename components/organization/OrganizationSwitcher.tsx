"use client";

import { Check,ChevronDown,Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useOrganization } from "./OrganizationContext";

export function OrganizationSwitcher() {
  const { activeOrg, organizations, switchOrganization } = useOrganization();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2.5 p-2 rounded-2xl hover:bg-gray-100 dark:hover:bg-gray-900 border border-gray-200 dark:border-gray-800 transition-all"
      >
        <div className="w-7 h-7 rounded-xl bg-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm">
          {activeOrg.name.charAt(0)}
        </div>
        <div className="text-left hidden md:block max-w-[140px] truncate">
          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{activeOrg.name}</p>
          <p className="text-[10px] text-gray-400 font-medium">{activeOrg.type}</p>
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-950 rounded-2xl border border-gray-200 dark:border-gray-850 shadow-xl z-50 p-2 space-y-1 animate-in fade-in slide-in-from-top-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1.5">
            Switch Organization Workspace
          </p>

          {organizations.map((org) => (
            <button
              key={org.id}
              onClick={() => {
                switchOrganization(org.id);
                setOpen(false);
              }}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeOrg.id === org.id
                  ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 font-bold"
                  : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              }`}
            >
              <div className="flex items-center space-x-2.5 truncate">
                <div className="w-6 h-6 rounded-lg bg-gray-100 dark:bg-gray-800 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                  {org.name.charAt(0)}
                </div>
                <span className="truncate">{org.name}</span>
              </div>
              {activeOrg.id === org.id && <Check className="w-4 h-4 text-indigo-600 shrink-0" />}
            </button>
          ))}

          <div className="pt-2 border-t border-gray-100 dark:border-gray-900">
            <Link
              href="/dashboard/organizations/new"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2 p-2 rounded-xl text-xs font-semibold text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Register New Organization</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
