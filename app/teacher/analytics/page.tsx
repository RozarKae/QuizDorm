import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function TeacherAnalyticsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="Class Analytics" description="Review classroom averages, quiz completion logs, and subject performance." />
      <EmptyDashboard
        title="No Classroom Data Available"
        description="Students must complete and submit quizzes before metrics populate here."
      />
    </DashboardContainer>
  );
}
