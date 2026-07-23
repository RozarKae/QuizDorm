"use client";

import React from "react";
import { AcademicCalendarWidget } from "@/components/academic/AcademicCalendarWidget";
import { CalendarEvent } from "@/lib/types/academic";

const mockEvents: CalendarEvent[] = [
  { id: "e1", title: "Calculus Derivatives Quiz #3 Deadline", date: "2026-07-28", time: "11:59 PM", type: "assignment" },
  { id: "e2", title: "National Science Olympiad Championship", date: "2026-07-29", time: "07:30 PM", type: "competition" },
  { id: "e3", title: "Organic Chemistry Homework Submission", date: "2026-07-30", time: "05:00 PM", type: "assignment" },
  { id: "e4", title: "Mid-Term Physics Assessment", date: "2026-08-02", time: "10:00 AM", type: "quiz" },
];

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Academic Calendar</h1>
        <p className="text-sm text-gray-500">Monthly agenda for quiz schedules, homework deadlines, and tournaments</p>
      </div>

      <AcademicCalendarWidget events={mockEvents} />
    </div>
  );
}
