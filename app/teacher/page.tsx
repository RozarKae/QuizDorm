import {
  PageHeader,
  DashboardContainer,
  DashboardGrid,
  StatsCard,
  DashboardCard,
  QuickActionCard,
  ActivityCard,
} from "@/components/dashboard/DashboardComponents";
import { Award, BookOpen, Clock, Users, School, Megaphone, Calendar } from "lucide-react";

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
        title="Teacher Portal & Ecosystem"
        description="Build quizzes, assign assessments, manage classrooms, grade work, and publish notices."
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
        <div className="md:col-span-2 space-y-6">
          <DashboardCard title="Teacher Operations & Classroom Tools" description="Create and administer assessments.">
            <div className="grid gap-4 sm:grid-cols-2 mt-2">
              <QuickActionCard
                title="Classrooms & Roster"
                description="Manage Grade 12-A & 11-B classrooms, student rosters, and co-teachers."
                href="/dashboard/classes"
                actionLabel="Manage Classes"
              />
              <QuickActionCard
                title="Assign Quiz to Class"
                description="Publish quizzes with deadlines, attempt rules, and timer controls."
                href="/dashboard/assignments"
                actionLabel="Assign Quiz"
              />
              <QuickActionCard
                title="Announcements Publisher"
                description="Post targeted notices and instructions to specific student classes."
                href="/dashboard/announcements"
                actionLabel="Post Notice"
              />
              <QuickActionCard
                title="Academic Calendar"
                description="View scheduled quiz dates, assignment deadlines, and competitions."
                href="/dashboard/calendar"
                actionLabel="View Calendar"
              />
            </div>
          </DashboardCard>
        </div>

        <div>
          <ActivityCard title="Classroom Submissions & Activity" items={activities} />
        </div>
      </div>
    </DashboardContainer>
  );
}
