import { Card, CardContent } from "@/components/ui/card";

interface AuthCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({ children, className }: AuthCardProps) {
  return (
    <Card className={`border border-gray-200/50 dark:border-gray-800/50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg shadow-xl rounded-2xl overflow-hidden ${className || ""}`}>
      <CardContent className="p-6 sm:p-8">
        {children}
      </CardContent>
    </Card>
  );
}
