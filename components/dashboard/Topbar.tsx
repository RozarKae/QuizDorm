"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Bell, Menu } from "lucide-react";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md px-4 sm:px-6 transition-colors duration-300">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Toggle Button for mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
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
        <nav className="hidden md:flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
          <Link href={`/${role}`} className="hover:text-primary transition-colors font-medium capitalize">
            {role === "admin" ? "Platform Admin" : `${role} Portal`}
          </Link>
          {breadcrumbs.map((crumb) => {
            if (crumb.name.toLowerCase() === role.toLowerCase()) return null;
            return (
              <div key={crumb.href} className="flex items-center space-x-1">
                <span>/</span>
                {crumb.isLast ? (
                  <span className="font-semibold text-gray-900 dark:text-white capitalize">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-primary transition-colors capitalize">
                    {crumb.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-4">
        {/* Search Input */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search quizzes, reports..."
            className="pl-9 h-9 w-full bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 focus-visible:ring-primary"
          />
        </div>

        {/* Mobile search button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary" />
        </Button>

        {/* Theme Toggle */}
        <div className="scale-90">
          <ThemeToggle />
        </div>

        {/* User Profile */}
        <ProfileMenu role={role} />
      </div>
    </header>
  );
}
