import React from "react";
import { CalendarEvent } from "@/lib/types/academic";
import { Calendar as CalendarIcon, Clock, Trophy, BookOpen, Flag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface AcademicCalendarWidgetProps {
  events: CalendarEvent[];
}

export function AcademicCalendarWidget({ events }: AcademicCalendarWidgetProps) {
  const getTypeBadge = (type: CalendarEvent["type"]) => {
    switch (type) {
      case "quiz":
        return <Badge className="bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 text-[10px]">Quiz</Badge>;
      case "competition":
        return <Badge className="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px]">Competition</Badge>;
      case "assignment":
        return <Badge className="bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 text-[10px]">Deadline</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-700 text-[10px]">Event</Badge>;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-950 p-6 rounded-3xl border border-gray-100 dark:border-gray-850 shadow-sm space-y-4">
      <h3 className="text-xs font-bold uppercase tracking-wider text-gray-700 dark:text-gray-300 flex items-center justify-between">
        <span className="flex items-center"><CalendarIcon className="w-4 h-4 text-indigo-600 mr-2" /> Academic Calendar</span>
        <span className="text-[10px] text-gray-400 font-normal">July 2026</span>
      </h3>

      <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
        {events.map((ev) => (
          <div key={ev.id} className="p-3 rounded-2xl border border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-900/50 flex items-center justify-between text-xs">
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                {getTypeBadge(ev.type)}
                <span className="font-bold text-gray-900 dark:text-white">{ev.title}</span>
              </div>
              <p className="text-[11px] text-gray-400 flex items-center">
                <Clock className="w-3 h-3 mr-1" /> {ev.date} {ev.time ? `at ${ev.time}` : ""}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
