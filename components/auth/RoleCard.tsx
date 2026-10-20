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
      <Card className="h-full border border-[#262B37] bg-[#161922] hover:border-[#3864F8] transition-all duration-200 rounded-[4px] shadow-sm hover:shadow-md">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div className="mb-4 p-3 rounded-full bg-[#3864F8]/10 text-[#3864F8] group-hover:bg-[#3864F8] group-hover:text-white transition-all duration-200">
            {icon}
          </div>
          <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#3864F8] transition-colors">
            {title}
          </h3>
          <p className="text-xs text-zinc-400 flex-grow leading-relaxed">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
