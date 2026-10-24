"use client";

import React from "react";
import Link from "next/link";
import {
  PageHeader,
  DashboardContainer,
  DashboardGrid,
  StatsCard,
  DashboardCard,
  QuickActionCard,
  ActivityCard,
} from "@/components/dashboard/DashboardComponents";
import {
  Award,
  BookOpen,
  Clock,
  Play,
  Calendar,
  Bell,
  History,
  Lock,
  Sparkles,
  Swords,
  Trophy,
  ShieldAlert,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/button";

export default function StudentPage() {
  const { role } = useAuth();
  const isSubscriber = role === "subscriber";

  const stats = [
    { title: "Cognitive Sprints", value: isSubscriber ? "12" : "32", change: "+4 this week", icon: <Play className="h-4 w-4" /> },
    { title: "Mastery Quotient", value: isSubscriber ? "82%" : "88%", change: "+1.2% rank up", icon: <Award className="h-4 w-4" /> },
    { title: "Intellectual Immersion", value: isSubscriber ? "4.5 hrs" : "12.5 hrs", change: "This week", icon: <Clock className="h-4 w-4" /> },
    { title: "Dorm Honours & Badges", value: isSubscriber ? "3 unlocked" : "8 unlocked", change: "Verified badges", icon: <BookOpen className="h-4 w-4" /> },
  ];

  const activities = [
    { id: "1", title: "Mastered Cognitive Sprint", description: "Score: 92% (A) • Conceptual Precision", time: "40 mins ago" },
    { id: "2", title: "Competed in Battle Arena", description: "Placed #4 in South Zone Showdown", time: "Yesterday" },
    { id: "3", title: "Earned Honour: Speed Solver", description: "Solved 10 questions under 15s", time: "3 days ago" },
  ];

  return (
    <DashboardContainer>
      <PageHeader
        title={isSubscriber ? "Independent Scholar Hub" : "Scholar's Hub & Cognitive Center"}
        description={
          isSubscriber
            ? "Self-paced intellectual dormitory. Access the Dorm Vault, review cognitive telemetry, and join live arena decathlons."
            : "Accelerate conceptual mastery, complete curriculum quests, review cognitive telemetry, and climb the Podium of Intellect."
        }
      />

      {/* Subscriber Tier Notice Banner */}
      {isSubscriber && (
        <div className="rounded-[6px] bg-[#0C1210] border border-[rgba(248,113,113,0.3)] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[3px] bg-[rgba(248,113,113,0.15)] text-[#F87171] border border-[rgba(248,113,113,0.3)] font-mono text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Lock className="w-3 h-3" />
                Subscriber Tier (Features Locked)
              </span>
              <span className="font-mono text-[11px] text-[#A0AEA5]">Free Personal Plan</span>
            </div>
            <p className="text-xs text-[#A0AEA5] max-w-2xl leading-relaxed">
              Institutional features (classroom assignments, academic calendar, notices, and AI coach) are locked for Subscribers.
              To unlock full classroom features, ask your Institution or Teacher for an enrolled Member link.
            </p>
          </div>
          <Link href="/live/join" className="shrink-0">
            <Button size="sm" className="bg-[#65F59A] text-[#070B0A] hover:bg-[#52E086] font-mono text-xs font-bold uppercase h-8">
              <Swords className="w-3.5 h-3.5 mr-1.5" />
              Join Live Arena
            </Button>
          </Link>
        </div>
      )}

      <DashboardGrid>
        {stats.map((stat) => (
          <StatsCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            icon={stat.icon}
          />
        ))}
      </DashboardGrid>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          {/* Unlocked Personal Practice Features */}
          <DashboardCard
            title="Intellectual Dormitory & Practice Vault"
            description="Take self-paced cognitive sprints and compete in live synchronized decathlon arenas."
          >
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <QuickActionCard
                title="The Dorm Vault (All Quizzes)"
                description="Browse hundreds of validated assessments and accelerate your IQ."
                href="/dashboard/quizzes"
                actionLabel="Enter Vault"
              />
              <QuickActionCard
                title="Join Battle Arena"
                description="Enter a tournament room PIN to compete live against scholars."
                href="/live/join"
                actionLabel="Join via PIN"
              />
              <QuickActionCard
                title="Podium of Intellect"
                description="Check ranking standings and top scoring participants."
                href="/dashboard/leaderboard"
                actionLabel="View Podium"
              />
              <QuickActionCard
                title="Cognitive Telemetry"
                description="Review past answers, speed curves, and distractor rationales."
                href="/dashboard/quizzes/history"
                actionLabel="Review Telemetry"
              />
            </div>
          </DashboardCard>

          {/* Institutional Classroom Features */}
          <DashboardCard
            title={isSubscriber ? "Campus Modules (Locked for Subscribers)" : "Assigned Tasks & Classroom Learning"}
            description={
              isSubscriber
                ? "These modules require an Institutional Member enrollment license."
                : "Participate in active classrooms and study groups."
            }
          >
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              {isSubscriber ? (
                <>
                  <div className="p-4 rounded-[4px] bg-[#111B17] border border-[rgba(248,113,113,0.2)] opacity-75 relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F2F7F3]">Assigned Quizzes & Homework</span>
                      <span className="px-1.5 py-0.5 rounded-[2px] bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.3)] text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0AEA5] leading-relaxed">
                      Requires campus classroom membership.
                    </p>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#111B17] border border-[rgba(248,113,113,0.2)] opacity-75 relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F2F7F3]">Classroom Notices</span>
                      <span className="px-1.5 py-0.5 rounded-[2px] bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.3)] text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0AEA5] leading-relaxed">
                      Teacher announcements reserved for enrolled members.
                    </p>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#111B17] border border-[rgba(248,113,113,0.2)] opacity-75 relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F2F7F3]">Academic Agenda Calendar</span>
                      <span className="px-1.5 py-0.5 rounded-[2px] bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.3)] text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0AEA5] leading-relaxed">
                      Campus test dates and semester schedules.
                    </p>
                  </div>

                  <div className="p-4 rounded-[4px] bg-[#111B17] border border-[rgba(248,113,113,0.2)] opacity-75 relative space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#F2F7F3]">AI Study Coach & Planner</span>
                      <span className="px-1.5 py-0.5 rounded-[2px] bg-[rgba(248,113,113,0.12)] text-[#F87171] border border-[rgba(248,113,113,0.3)] text-[9px] font-mono font-bold uppercase flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> Locked
                      </span>
                    </div>
                    <p className="text-[11px] text-[#A0AEA5] leading-relaxed">
                      AI personalized tutor available on Member Pro plan.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <QuickActionCard
                    title="Assigned Quizzes & Homework"
                    description="View assigned quizzes with due dates and submit homework."
                    href="/dashboard/assignments"
                    actionLabel="View Assignments"
                  />
                  <QuickActionCard
                    title="Classroom Notices"
                    description="Read announcements published by your subject teachers."
                    href="/dashboard/announcements"
                    actionLabel="Read Notices"
                  />
                  <QuickActionCard
                    title="Academic Agenda Calendar"
                    description="Check test dates, competition times, and submission deadlines."
                    href="/dashboard/calendar"
                    actionLabel="View Calendar"
                  />
                  <QuickActionCard
                    title="AI Study Coach"
                    description="Personalized study planner and AI recommendations."
                    href="/dashboard/tutor/planner"
                    actionLabel="Open Coach"
                  />
                </>
              )}
            </div>
          </DashboardCard>
        </div>

        <div>
          <ActivityCard title="Recent Activity" items={activities} />
        </div>
      </div>
    </DashboardContainer>
  );
}
