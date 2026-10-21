import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function RoleCard({ title, description, icon, href }: RoleCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full border border-[rgba(160,190,170,0.18)] bg-[#0C1210] hover:border-[#65F59A]/60 hover:shadow-[0_0_20px_rgba(101,245,154,0.12)] transition-all duration-200 rounded-[6px] shadow-sm relative overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div className="mb-4 p-3 rounded-full bg-[#111B17] border border-[#65F59A]/30 text-[#65F59A] group-hover:bg-[#65F59A] group-hover:text-[#070B0A] group-hover:shadow-[0_0_15px_rgba(101,245,154,0.4)] transition-all duration-200">
            {icon}
          </div>
          <h3 className="text-base font-bold text-[#F2F7F3] mb-2 group-hover:text-[#65F59A] transition-colors font-display">
            {title}
          </h3>
          <p className="text-xs text-[#A0AEA5] flex-grow leading-relaxed font-sans">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
