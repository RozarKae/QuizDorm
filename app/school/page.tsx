import {
  PageHeader,
  DashboardContainer,
  DashboardGrid,
  StatsCard,
  DashboardCard,
  QuickActionCard,
  ActivityCard,
} from "@/components/dashboard/DashboardComponents";
import { Users, GraduationCap, School, FileText } from "lucide-react";

export default function SchoolPage() {
  const stats = [
    { title: "Total Students", value: "840", change: "+4% this term", icon: <GraduationCap className="h-4 w-4" /> },
    { title: "Total Teachers", value: "32", change: "Stable", icon: <Users className="h-4 w-4" /> },
    { title: "Active Classes", value: "24", change: "+2 this week", icon: <School className="h-4 w-4" /> },
    { title: "Quizzes Completed", value: "1,890", change: "+120 today", icon: <FileText className="h-4 w-4" /> },
  ];

  const activities = [
    { id: "1", title: "Teacher added to Science dept", description: "Mr. Arthur Pendelton assigned", time: "1 hour ago" },
    { id: "2", title: "Monthly exam schedule published", description: "Sent to all teachers & students", time: "Yesterday" },
    { id: "3", title: "Gradebook sync completed", description: "Synced with school SIS", time: "2 days ago" },
  ];

  return (
    <DashboardContainer>
      <PageHeader
        title="School Dashboard"
        description="Manage your school, classes, teachers, and student directories."
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
          <DashboardCard title="School Management Quick Actions" description="Core operations for school administrators.">
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <QuickActionCard
                title="Manage Directories"
                description="Invite, edit, or remove school teachers and students."
                href="/school/settings"
                actionLabel="Manage"
              />
              <QuickActionCard
                title="Academic Reports"
                description="View aggregate school metrics and class pass rates."
                href="/school/reports"
                actionLabel="View reports"
              />
            </div>
          </DashboardCard>
        </div>

        <div>
          <ActivityCard title="Recent School Activities" items={activities} />
        </div>
      </div>
    </DashboardContainer>
  );
}
