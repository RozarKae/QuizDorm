"use client";

import { Button } from "@/components/ui/button";
import { QuizClubManager } from "@/lib/community/clubManager";
import { QuizClub } from "@/lib/types/community";
import { CheckCircle2,UserPlus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface QuizClubCardProps {
  club: QuizClub;
}

export function QuizClubCard({ club }: QuizClubCardProps) {
  const [membersCount, setMembersCount] = useState(club.membersCount);
  const [isMember, setIsMember] = useState(false);

  const handleJoin = () => {
    if (!isMember) {
      const res = QuizClubManager.joinClub(club.id);
      setMembersCount(res.newCount);
      setIsMember(true);
      toast.success(`Joined "${club.name}"! Welcome to the club.`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
            {club.category.replace("_", " ")}
          </span>
          {club.verifiedBadge && (
            <span className="text-[10px] font-mono text-rose-600 font-bold flex items-center">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-rose-500" /> Verified Club
            </span>
          )}
        </div>

        <h3 className="font-bold text-sm text-gray-900 dark:text-white line-clamp-1">{club.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{club.description}</p>
      </div>

      <div className="space-y-3 pt-3 border-t border-gray-100 dark:border-gray-800">
        <div className="flex items-center justify-between text-[11px] text-gray-500 font-mono">
          <span>Leader: {club.leaderName}</span>
          <span className="font-bold text-indigo-600">{membersCount.toLocaleString()} Members</span>
        </div>

        <Button
          onClick={handleJoin}
          disabled={isMember}
          className={`w-full font-bold text-xs rounded-xl h-8 ${isMember ? "bg-rose-600 text-white" : "bg-indigo-600 hover:bg-indigo-700 text-white"}`}
        >
          {isMember ? <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> : <UserPlus className="w-3.5 h-3.5 mr-1" />}
          {isMember ? "Joined Club" : "Join Club"}
        </Button>
      </div>
    </div>
  );
}
