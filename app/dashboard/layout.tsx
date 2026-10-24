import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function GenericDashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
