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
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="md:hidden text-slate-600 hover:text-slate-900"
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
        <nav className="hidden md:flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
          <Link href={`/${role}`} className="hover:text-slate-900 transition-colors capitalize">
            {role === "admin" ? "Platform Admin" : `${role} Portal`}
          </Link>
          {breadcrumbs.map((crumb) => {
            if (crumb.name.toLowerCase() === role.toLowerCase()) return null;
            return (
              <div key={crumb.href} className="flex items-center space-x-1.5">
                <span className="text-slate-300">/</span>
                {crumb.isLast ? (
                  <span className="font-semibold text-slate-900 capitalize">
                    {crumb.name}
                  </span>
                ) : (
                  <Link href={crumb.href} className="hover:text-slate-900 transition-colors capitalize">
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
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <Input
            type="search"
            placeholder="Search platform..."
            className="pl-9 h-9 w-full bg-slate-50 border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 rounded-md focus-visible:ring-blue-600"
          />
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden text-slate-600 hover:text-slate-900"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>

        {/* Notifications Button */}
        <Button
          variant="ghost"
          size="icon"
          className="relative text-slate-600 hover:text-slate-900"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600" />
        </Button>

        {/* User Profile */}
        <ProfileMenu role={role} />
      </div>
    </header>
  );
}
