import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function SchoolReportsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="School Reports" description="Generate and export student performance summaries and class averages." />
      <EmptyDashboard
        title="No Reports"
        description="Select specific classes or grading criteria to download term averages."
      />
    </DashboardContainer>
  );
}
