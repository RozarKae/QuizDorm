import { PageHeader, DashboardContainer, EmptyDashboard } from "@/components/dashboard/DashboardComponents";

export default function TeacherSettingsPage() {
  return (
    <DashboardContainer>
      <PageHeader title="Teacher Settings" description="Configure default quiz limits, classroom parameters, and automatic grading rules." />
      <EmptyDashboard
        title="Settings Locked"
        description="Configuration parameters will unlock once a classroom is configured."
      />
    </DashboardContainer>
  );
}
