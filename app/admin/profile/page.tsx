import { DashboardContainer,EmptyDashboard,PageHeader } from "@/components/dashboard/DashboardComponents";

export default function AdminProfilePage() {
  return (
    <DashboardContainer>
      <PageHeader title="Admin Profile" description="Manage personal administrator details and access levels." />
      <EmptyDashboard
        title="Admin Information"
        description="Verify security settings, set two-factor authentication, or update avatar details."
      />
    </DashboardContainer>
  );
}
