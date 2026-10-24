"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Search, Bell, Menu, Terminal } from "lucide-react";
import Logo from "@/components/layout/Logo";
import ProfileMenu from "./ProfileMenu";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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

  const getWorkspaceTitle = (r: string) => {
    switch (r) {
      case "superadmin":
      case "admin":
        return "SUPER ADMIN COMMAND OS";
      case "masteradmin":
        return "MASTER ADMIN CONTENT & SCHOLAR OS";
      case "institution":
      case "school":
        return "ACADEMY DIRECTORATE";
      case "handler":
      case "teacher":
        return "FACULTY MENTOR CONSOLE";
      case "member":
      case "student":
        return "SCHOLAR'S HUB";
      case "subscriber":
        return "INDEPENDENT SCHOLAR HUB";
      default:
        return `${r.toUpperCase()} WORKSPACE`;
    }
  };

  const getWorkspaceColor = (r: string) => {
    switch (r) {
      case "superadmin":
      case "admin":
        return "text-[#65F59A]";
      case "masteradmin":
        return "text-purple-400";
      case "institution":
      case "school":
        return "text-blue-400";
      case "handler":
      case "teacher":
        return "text-indigo-400";
      case "subscriber":
        return "text-amber-400";
      case "member":
      case "student":
      default:
        return "text-violet-400";
    }
  };

  const getWorkspaceRoot = (r: string) => {
    switch (r) {
      case "superadmin":
      case "admin":
        return "/admin";
      case "masteradmin":
        return "/admin/master";
      case "institution":
      case "school":
        return "/school";
      case "handler":
      case "teacher":
        return "/teacher";
      case "member":
      case "student":
      case "subscriber":
      default:
        return "/student";
    }
  };

  const isRoleRootCrumb = (name: string, r: string) => {
    const n = name.toLowerCase();
    const roleNorm = r.toLowerCase();
    if (n === roleNorm) return true;
    if ((roleNorm === "admin" || roleNorm === "superadmin") && (n === "admin" || n === "superadmin")) return true;
    if (roleNorm === "masteradmin" && (n === "masteradmin" || n === "master")) return true;
    if ((roleNorm === "institution" || roleNorm === "school") && (n === "institution" || n === "school")) return true;
    if ((roleNorm === "handler" || roleNorm === "teacher") && (n === "handler" || n === "teacher")) return true;
    if (
      (roleNorm === "member" || roleNorm === "student" || roleNorm === "subscriber") &&
      (n === "student" || n === "member" || n === "subscriber")
    ) {
      return true;
    }
    return false;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-[rgba(160,190,170,0.14)] bg-[#0C1210]/95 backdrop-blur-md px-4 sm:px-6">
      <div className="flex items-center space-x-3 md:space-x-4">
        {/* Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon-xs"
          onClick={onMenuClick}
          className="md:hidden text-[#A0AEA5] hover:text-[#F2F7F3] rounded-[3px]"
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4" />
        </Button>

        {/* Mobile Logo */}
        <div className="md:hidden flex items-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>

        {/* Desktop Breadcrumbs with Technical Monospace */}
        <nav className="hidden md:flex items-center space-x-2 text-xs font-mono text-[#69786F]">
          <div className={`flex items-center space-x-1.5 ${getWorkspaceColor(role)}`}>
            <Terminal className="w-3.5 h-3.5" />
            <Link
              href={getWorkspaceRoot(role)}
              className="hover:underline uppercase tracking-wider text-[11px] font-semibold"
            >
              {getWorkspaceTitle(role)}
            </Link>
          </div>
          {breadcrumbs.map((crumb) => {
            if (isRoleRootCrumb(crumb.name, role)) return null;
            return (
              <div key={crumb.href} className="flex items-center space-x-2">
                <span className="text-[rgba(160,190,170,0.25)]">/</span>
                {crumb.isLast ? (
                  <span className="font-semibold text-[#F2F7F3] uppercase tracking-wider text-[11px]">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-[#F2F7F3] transition-colors uppercase tracking-wider text-[11px]"
                  >
                    {crumb.name}
                  </Link>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center space-x-2 sm:space-x-3">
        {/* Search Input with Command Palette Hint */}
        <div className="relative hidden sm:block w-48 md:w-64">
          <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#69786F]" />
          <Input
            type="search"
            placeholder="Search OS... [Ctrl+K]"
            className="pl-8 pr-12 h-8 w-full bg-[#17251E] border-[rgba(160,190,170,0.18)] text-xs font-mono text-[#F2F7F3] placeholder:text-[#69786F] rounded-[4px] focus-visible:border-[#65F59A] focus-visible:ring-1 focus-visible:ring-[#65F59A]"
          />
          <span className="absolute right-2 top-2 font-mono text-[9px] text-[#69786F] border border-[rgba(160,190,170,0.14)] px-1 rounded-[2px] bg-[#0C1210]">
            ⌘K
          </span>
        </div>

        {/* Mobile Search Button */}
        <Button
          variant="ghost"
          size="icon-xs"
          className="sm:hidden text-[#A0AEA5] hover:text-[#F2F7F3] rounded-[3px]"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </Button>

        {/* Audio Effects Toggle */}
        <AudioToggle />

        {/* Light & Dark Theme Toggle */}
        <ThemeToggle />

        {/* Notifications Button with Luminous Pip */}
        <Button
          variant="ghost"
          size="icon-xs"
          className="relative text-[#A0AEA5] hover:text-[#F2F7F3] rounded-[3px]"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[#65F59A] ring-2 ring-[#0C1210]" />
        </Button>

        {/* User Profile */}
        <ProfileMenu role={role} />
      </div>
    </header>
  );
}
