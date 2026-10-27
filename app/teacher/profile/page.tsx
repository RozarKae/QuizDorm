import { DashboardContainer,EmptyDashboard,PageHeader } from "@/components/dashboard/DashboardComponents";

export default function TeacherProfilePage() {
  return (
    <DashboardContainer>
      <PageHeader title="Teacher Profile" description="Manage teacher credentials, classrooms, and contact details." />
      <EmptyDashboard
        title="Admin Information"
        description="Verify security settings, set two-factor authentication, or update avatar details."
      />
    </DashboardContainer>
  );
}
