import { Card,CardContent } from "@/components/ui/card";
import Link from "next/link";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

export default function RoleCard({ title, description, icon, href }: RoleCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full border border-[rgba(240, 160, 180,0.18)] bg-[#140C0E] hover:border-[#FF4D6D]/60 hover:shadow-[0_0_20px_rgba(255, 77, 109,0.12)] transition-all duration-200 rounded-[6px] shadow-sm relative overflow-hidden">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div className="mb-4 p-3 rounded-full bg-[#1D1013] border border-[#FF4D6D]/30 text-[#FF4D6D] group-hover:bg-[#FF4D6D] group-hover:text-[#0B0708] group-hover:shadow-[0_0_15px_rgba(255, 77, 109,0.4)] transition-all duration-200">
            {icon}
          </div>
          <h3 className="text-base font-bold text-[#F2F7F3] mb-2 group-hover:text-[#FF4D6D] transition-colors font-display">
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
