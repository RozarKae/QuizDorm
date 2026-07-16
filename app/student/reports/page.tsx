import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function StudentReportsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="My Quiz Reports" description="Generate and export student performance summaries and answers." />
      <EmptyDashboard
        title="No Reports"
        description="Select specific exams or practice sessions to export report details."
      />
    </DashboardContainer>
  );
}
