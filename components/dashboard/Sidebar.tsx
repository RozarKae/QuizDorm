"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Settings,
  User,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import { dashboardNavConfig } from "@/config/dashboard-nav";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export default function Sidebar({
  role,
  isOpen,
  onClose,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const config = dashboardNavConfig[role];

  if (!config) return null;

  const iconMap: Record<string, React.ReactNode> = {
    dashboard: <LayoutDashboard className="h-5 w-5" />,
    analytics: <BarChart3 className="h-5 w-5" />,
    reports: <FileText className="h-5 w-5" />,
    settings: <Settings className="h-5 w-5" />,
    profile: <User className="h-5 w-5" />,
  };

  const navItems = config.items;

  return (
    <>
      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col transition-all duration-300 md:sticky md:z-25 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "w-16" : "w-64"}`}
      >
        <div className="flex h-full flex-col justify-between bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-800 transition-colors duration-300">
          <div>
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-200 dark:border-gray-800">
              <Link href="/" className="flex items-center space-x-2">
                {!collapsed ? (
                  <Logo />
                ) : (
                  <div className="p-1 rounded-full bg-primary/10 text-primary">
                    <LayoutDashboard className="h-6 w-6" />
                  </div>
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-1 px-3 py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary text-white"
                        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900"
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <div className="flex-shrink-0">
                      {item.icon ? iconMap[item.icon] : <LayoutDashboard className="h-5 w-5" />}
                    </div>
                    {!collapsed && <span className="truncate">{item.name}</span>}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Collapse Toggle Button (Desktop Only) */}
          <div className="hidden md:block p-4 border-t border-gray-200 dark:border-gray-800">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center py-2 h-9 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
