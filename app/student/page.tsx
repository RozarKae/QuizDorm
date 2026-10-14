import {
  PageHeader,
  DashboardContainer,
  DashboardGrid,
  StatsCard,
  DashboardCard,
  QuickActionCard,
  ActivityCard,
} from "@/components/dashboard/DashboardComponents";
import { Award, BookOpen, Clock, Play, Calendar, Bell, History } from "lucide-react";

export default function StudentPage() {
  const stats = [
    { title: "Quizzes Taken", value: "32", change: "+4 this week", icon: <Play className="h-4 w-4" /> },
    { title: "Average Score", value: "88%", change: "+1.2% rank up", icon: <Award className="h-4 w-4" /> },
    { title: "Study Hours", value: "12.5 hrs", change: "This week", icon: <Clock className="h-4 w-4" /> },
    { title: "Achievements", value: "8 unlocked", change: "New badge", icon: <BookOpen className="h-4 w-4" /> },
  ];

  const activities = [
    { id: "1", title: "Finished Biology quiz", description: "Score: 92% (A)", time: "40 mins ago" },
    { id: "2", title: "Joined classroom Chemistry-A", description: "Teacher: Mr. Pendelton", time: "2 days ago" },
    { id: "3", title: "Unlocked badge: Quiz Master", description: "Completed 20 quizzes successfully", time: "3 days ago" },
  ];

  return (
    <DashboardContainer>
      <PageHeader
        title="Student Portal & Learning Center"
        description="Access assigned quizzes, homework, classroom notices, and test records."
      />

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
        <div className="md:col-span-2">
          <DashboardCard title="Assigned Tasks & Classroom Learning" description="Participate in active classrooms and study groups.">
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
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
                title="Quiz Attempt History"
                description="Review past test answers, score percentage, and explanations."
                href="/dashboard/quizzes/history"
                actionLabel="View Attempts"
              />
            </div>
          </DashboardCard>
        </div>

        <div>
          <ActivityCard title="Recent Study Activity" items={activities} />
        </div>
      </div>
    </DashboardContainer>
  );
}
