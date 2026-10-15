"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Bell, Menu } from "lucide-react";
import Logo from "@/components/layout/Logo";
import ProfileMenu from "./ProfileMenu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopbarProps {
  role: string;
  onMenuClick: () => void;
}

export default function Topbar({ role, onMenuClick }: TopbarProps) {
  const pathname = usePathname();

  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      const name = segment.charAt(0).toUpperCase() + segment.slice(1);
      const isLast = index === segments.length - 1;

      return { name, href, isLast };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-card px-4 sm:px-6">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden text-muted-foreground hover:text-foreground rounded-[3px]"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Mobile Logo */}
        <div className="md:hidden flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Breadcrumbs */}
        <nav className="hidden md:flex items-center space-x-2 text-xs font-mono text-muted-foreground">
          <Link href={`/${role}`} className="hover:text-foreground transition-colors uppercase tracking-wider text-[11px]">
            {role === "admin" ? "Platform Admin" : `${role} Portal`}
          </Link>
          {breadcrumbs.map((crumb) => {
            if (crumb.name.toLowerCase() === role.toLowerCase()) return null;
            return (
              <div key={crumb.href} className="flex items-center space-x-2">
                <span className="text-border">/</span>
                {crumb.isLast ? (
                  <span className="font-semibold text-foreground uppercase tracking-wider text-[11px]">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-foreground transition-colors uppercase tracking-wider text-[11px]">
                    {crumb.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Search Input */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search platform..."
            className="pl-8 h-8 w-full bg-muted/40 border-border text-xs text-foreground placeholder:text-muted-foreground rounded-[3px] focus-visible:ring-cobalt"
          />
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden text-muted-foreground hover:text-foreground rounded-[3px]"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Notifications Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-muted-foreground hover:text-foreground rounded-[3px]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-coral ring-2 ring-card" />
        </Button>

        {/* User Profile */}
        <ProfileMenu role={role} />
      </div>
    </header>
  );
}
