import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card className={`border border-[#262B37] bg-[#13161F] text-[#F7F5EF] shadow-xl rounded-[4px] overflow-hidden ${className || ""}`}>
      <CardContent className="p-6 sm:p-8">
        {children}
      </CardContent>
    </Card>
  );
}
