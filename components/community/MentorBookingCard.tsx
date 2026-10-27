"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MentorProfile } from "@/lib/types/community";
import { Calendar,CheckCircle2,Star } from "lucide-react";
import { toast } from "sonner";

interface MentorBookingCardProps {
  mentor: MentorProfile;
}

export function MentorBookingCard({ mentor }: MentorBookingCardProps) {
  const handleBookSession = () => {
    toast.success(`Booked Office Hours with ${mentor.name}! Calendar invite sent.`);
  };

  return (
    <Card className="p-5 bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800 rounded-3xl shadow-sm space-y-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-2xl bg-indigo-600 font-bold text-white flex items-center justify-center text-sm">
          {mentor.name.substring(0, 2)}
        </div>
        <div>
          <h4 className="font-bold text-sm text-gray-900 dark:text-white flex items-center">
            {mentor.name} <CheckCircle2 className="w-3.5 h-3.5 text-rose-500 ml-1.5" />
          </h4>
          <span className="text-xs text-gray-500">{mentor.title} • {mentor.organization}</span>
        </div>
      </div>

      <div className="flex justify-between items-center text-[11px] text-gray-500 font-mono pt-1">
        <span className="flex items-center text-amber-500 font-bold">
          <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500 mr-1" /> {mentor.rating} ({mentor.reviewsCount})
        </span>
        <span>{mentor.totalMentees} Mentees</span>
      </div>

      <div className="p-2.5 rounded-2xl bg-gray-50 dark:bg-gray-900 text-[10px] font-mono text-gray-600 dark:text-gray-400 flex items-center justify-between">
        <span>Office Hours:</span>
        <span className="font-bold text-indigo-600">{mentor.availableOfficeHours}</span>
      </div>

      <Button onClick={handleBookSession} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs rounded-xl h-8">
        <Calendar className="w-3.5 h-3.5 mr-1" /> Book 1-on-1 Mentorship
      </Button>
    </Card>
  );
}
