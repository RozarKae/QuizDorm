import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function SchoolAnalyticsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="School Analytics" description="Track school-wide performance metrics, active courses, and quiz stats." />
      <EmptyDashboard
        title="No School Metrics Recorded"
        description="Data will populate here once classes initiate assessments and submit answers."
      />
    </DashboardContainer>
  );
}
