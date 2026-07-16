import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function StudentAnalyticsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="My Performance Analytics" description="Review quiz scores, history log, and rank progress over time." />
      <EmptyDashboard
        title="No Performance Metrics Available"
        description="Practice quizzes and finish assessments to populate analytics metrics."
      />
    </DashboardContainer>
  );
}
