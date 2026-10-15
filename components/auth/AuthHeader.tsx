import Logo from "@/components/layout/Logo";
import Link from "next/link";

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center space-y-3 mb-6">
      <Link href="/" className="transition-opacity hover:opacity-85">
        <Logo />
      </Link>
      <div className="space-y-1">
        <h1 className="text-2xl font-bold font-display tracking-tight text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs font-mono text-muted-foreground">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
