"use client";

import React from "react";
import { CreatorProfile } from "@/lib/types/marketplace";
import { CheckCircle2, Star, Users, Store, DollarSign } from "lucide-react";
import { Card } from "@/components/ui/card";

interface CreatorStorefrontHeaderProps {
  profile: CreatorProfile;
}

export function CreatorStorefrontHeader({ profile }: CreatorStorefrontHeaderProps) {
  return (
    <Card className="p-6 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 font-bold text-white flex items-center justify-center text-lg shadow-lg">
            {profile.name.substring(0, 2)}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h2 className="text-xl font-extrabold text-white">{profile.name}</h2>
              {profile.verifiedBadge && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
            </div>
            <span className="text-xs text-indigo-300 font-mono">@{profile.storefrontSlug}</span>
          </div>
        </div>

        <div className="flex items-center space-x-4 font-mono text-xs">
          <div className="text-center p-2.5 rounded-xl bg-white/10">
            <span className="text-gray-400 text-[10px] block font-sans">Total Sales</span>
            <span className="font-bold text-emerald-400 text-sm">${profile.totalSalesUSD.toLocaleString()}</span>
          </div>
          <div className="text-center p-2.5 rounded-xl bg-white/10">
            <span className="text-gray-400 text-[10px] block font-sans">Followers</span>
            <span className="font-bold text-indigo-300 text-sm">{profile.followersCount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <p className="text-xs text-indigo-100/80 max-w-3xl">{profile.bio}</p>
    </Card>
  );
}
