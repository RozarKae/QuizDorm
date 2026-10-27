import { DashboardContainer,EmptyDashboard,PageHeader } from "@/components/dashboard/DashboardComponents";

export default function StudentProfilePage() {
  return (
    <DashboardContainer>
      <PageHeader title="Student Profile" description="Manage study profile, avatar details, and enrollment credentials." />
      <EmptyDashboard
        title="Admin Information"
        description="Verify security settings, set two-factor authentication, or update avatar details."
      />
    </DashboardContainer>
  );
}
