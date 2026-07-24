"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  HelpCircle,
  PlusSquare,
  Trophy,
  Award,
  User,
  Settings,
  ChevronLeft,
  ChevronRight,
  X,
  Database,
  Building2,
  School,
  BookOpen,
  Calendar,
  Megaphone,
  ScanText,
  FileImage,
  Cpu,
  ShieldCheck,
  Brain,
  RotateCcw,
  CreditCard,
  MessageSquare,
  Code2,
  Boxes,
  ShieldAlert,
  Building,
  Smartphone,
  RefreshCw,
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
  const config = dashboardNavConfig[role] || dashboardNavConfig.student;

  const iconMap: Record<string, React.ReactNode> = {
    dashboard: <LayoutDashboard className="h-5 w-5" />,
    organization: <Building2 className="h-5 w-5" />,
    school: <School className="h-5 w-5" />,
    assignments: <BookOpen className="h-5 w-5" />,
    bank: <Database className="h-5 w-5" />,
    ocr: <ScanText className="h-5 w-5" />,
    media: <FileImage className="h-5 w-5" />,
    quality: <ShieldCheck className="h-5 w-5" />,
    adaptive: <Brain className="h-5 w-5" />,
    revision: <RotateCcw className="h-5 w-5" />,
    credentials: <Award className="h-5 w-5" />,
    billing: <CreditCard className="h-5 w-5" />,
    communication: <Megaphone className="h-5 w-5" />,
    messaging: <MessageSquare className="h-5 w-5" />,
    developer: <Code2 className="h-5 w-5" />,
    integrations: <Boxes className="h-5 w-5" />,
    enterprise_admin: <ShieldAlert className="h-5 w-5" />,
    tenant_controls: <Building className="h-5 w-5" />,
    mobile_platform: <Smartphone className="h-5 w-5" />,
    offline_sync: <RefreshCw className="h-5 w-5" />,
    ai_admin: <Cpu className="h-5 w-5" />,
    quizzes: <HelpCircle className="h-5 w-5" />,
    builder: <PlusSquare className="h-5 w-5" />,
    competitions: <Trophy className="h-5 w-5" />,
    calendar: <Calendar className="h-5 w-5" />,
    announcements: <Megaphone className="h-5 w-5" />,
    leaderboard: <Award className="h-5 w-5" />,
    profile: <User className="h-5 w-5" />,
    settings: <Settings className="h-5 w-5" />,
  };

  const navItems = config.items;

  return (
    <>
      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-900/50 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col transition-all duration-300 md:sticky md:top-0 md:z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "w-20" : "w-64"}`}
      >
        <div className="flex h-full flex-col justify-between bg-white dark:bg-gray-950 border-r border-gray-200 dark:border-gray-850 shadow-sm transition-colors duration-300">
          <div>
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-gray-100 dark:border-gray-900">
              <Link href="/dashboard" className="flex items-center space-x-2">
                {!collapsed ? (
                  <Logo />
                ) : (
                  <div className="p-2 rounded-xl bg-indigo-600 text-white shadow-sm">
                    <LayoutDashboard className="h-5 w-5" />
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
            <nav className="space-y-1.5 px-3 py-4">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-sm font-semibold"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 hover:text-gray-900 dark:hover:text-white"
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="flex-shrink-0">
                        {item.icon ? iconMap[item.icon] : <LayoutDashboard className="h-5 w-5" />}
                      </div>
                      {!collapsed && <span className="truncate">{item.name}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Collapse Toggle Button (Desktop Only) */}
          <div className="hidden md:block p-3 border-t border-gray-100 dark:border-gray-900">
            <Button
              variant="ghost"
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center py-2.5 h-10 border border-gray-200 dark:border-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-900 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
              {!collapsed && <span className="ml-2 text-xs font-medium">Collapse Menu</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
