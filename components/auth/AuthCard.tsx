import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card className={`border border-[rgba(160,190,170,0.18)] bg-[#0C1210] text-[#F2F7F3] shadow-[0_0_50px_rgba(0,0,0,0.8),0_0_25px_rgba(101,245,154,0.06)] rounded-[6px] overflow-hidden relative backdrop-blur-md ${className || ""}`}>
      {/* Top Emerald Ambient Accent Line */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#65F59A]/70 to-transparent pointer-events-none" />
      <CardContent className="p-6 sm:p-8 relative z-10">
        {children}
      </CardContent>
    </Card>
  );
}
