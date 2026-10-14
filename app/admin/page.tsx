import {
  PageHeader,
  DashboardContainer,
  DashboardGrid,
  StatsCard,
  DashboardCard,
  QuickActionCard,
  ActivityCard,
} from "@/components/dashboard/DashboardComponents";
import { Users, Shield, BookOpen, Settings } from "lucide-react";

export default function AdminPage() {
  const stats = [
    { title: "Total Users", value: "1,248", change: "+12% this month", icon: <Users className="h-4 w-4" /> },
    { title: "Active Licenses", value: "48", change: "+3 new schools", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Platform Security", value: "99.9%", change: "Optimal", icon: <Shield className="h-4 w-4" /> },
    { title: "System Load", value: "12%", change: "Normal", icon: <Settings className="h-4 w-4" /> },
  ];

  const activities = [
    { id: "1", title: "New school admin registered", description: "Oakridge High School added", time: "10 minutes ago" },
    { id: "2", title: "Platform update v1.4 deployed", description: "Security patches applied", time: "2 hours ago" },
    { id: "3", title: "Database backup completed", description: "Automatic schedule", time: "5 hours ago" },
  ];

  return (
    <DashboardContainer>
      <PageHeader
        title="Admin Overview"
        description="Welcome to the QuizDorm platform administrator dashboard."
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
          <DashboardCard title="Quick Administration Tasks" description="Common platform management utilities.">
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <QuickActionCard
                title="Configure Licensing"
                description="Manage school tiers, credits, and validation rules."
                href="/admin/settings"
                actionLabel="Configure"
              />
              <QuickActionCard
                title="System Diagnostics"
                description="View real-time performance, server logs, and metrics."
                href="/admin/analytics"
                actionLabel="View logs"
              />
            </div>
          </DashboardCard>
        </div>

        <div>
          <ActivityCard title="System Activity Log" items={activities} />
        </div>
      </div>
    </DashboardContainer>
  );
}
