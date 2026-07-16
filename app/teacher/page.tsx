import {
  PageHeader,
  DashboardContainer,
  DashboardGrid,
  StatsCard,
  DashboardCard,
  QuickActionCard,
  ActivityCard,
} from "@/components/dashboard/DashboardComponents";
import { Award, BookOpen, Clock, Users } from "lucide-react";

export default function TeacherPage() {
  const stats = [
    { title: "My Students", value: "128", change: "Across 4 classes", icon: <Users className="h-4 w-4" /> },
    { title: "Quizzes Created", value: "14", change: "+2 this month", icon: <BookOpen className="h-4 w-4" /> },
    { title: "Pending Grading", value: "8", change: "Urgent", icon: <Clock className="h-4 w-4" /> },
    { title: "Average Class Score", value: "82%", change: "+3% gain", icon: <Award className="h-4 w-4" /> },
  ];

  const activities = [
    { id: "1", title: "Chemistry Quiz submitted", description: "12 students completed recently", time: "20 mins ago" },
    { id: "2", title: "New quiz drafted", description: "Introduction to Organic Chemistry", time: "3 hours ago" },
    { id: "3", title: "Announced Pop Quiz", description: "Scheduled for Friday, 9:00 AM", time: "1 day ago" },
  ];

  return (
    <DashboardContainer>
      <PageHeader
        title="Teacher Dashboard"
        description="Build quizzes, assign assessments, grade work, and view performance charts."
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
          <DashboardCard title="Teacher Controls" description="Create and administer assessments.">
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <QuickActionCard
                title="Create a New Quiz"
                description="Design interactive questions, configure time limits, and set up options."
                href="/teacher/settings"
                actionLabel="Draft quiz"
              />
              <QuickActionCard
                title="Grade Center"
                description="Review pending student submissions and leave remarks."
                href="/teacher/reports"
                actionLabel="Open Gradebook"
              />
            </div>
          </DashboardCard>
        </div>

        <div>
          <ActivityCard title="Classroom Submissions" items={activities} />
        </div>
      </div>
    </DashboardContainer>
  );
}
