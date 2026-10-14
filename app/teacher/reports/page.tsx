import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function TeacherReportsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="Gradebook Reports" description="Generate student report cards, average grades, and class diagnostics." />
      <EmptyDashboard
        title="No Reports Generated"
        description="Select specific assignments or student lists to compile report statistics."
      />
    </DashboardContainer>
  );
}
