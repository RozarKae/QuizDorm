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
      <Card className="h-full border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md hover:border-primary dark:hover:border-primary transition-all duration-300 transform hover:-translate-y-1 shadow-sm hover:shadow-md">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow">
            {description}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}
