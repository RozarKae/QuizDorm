"use client";

import React, { useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
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
  Laptop,
  RefreshCw,
  HeartHandshake,
  Baby,
  WifiOff,
  Server,
  GraduationCap,
  Swords,
  ShoppingBag,
  Store,
  Bot,
  Sparkles,
  TrendingUp,
  Users,
  Globe,
  Share2,
  LogOut,
} from "lucide-react";
import Logo from "@/components/layout/Logo";
import { dashboardNavConfig, NavItem } from "@/config/dashboard-nav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { signOutUser } from "@/app/auth/actions";
import { useSound } from "@/components/audio/useSound";
import { AudioToggle } from "@/components/audio/AudioToggle";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

interface SidebarProps {
  role: string;
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const getRoleAccentColors = (r: string) => {
  switch (r) {
    case "superadmin":
    case "admin":
      return {
        bar: "before:bg-[#65F59A]",
        text: "text-[#65F59A]",
        border: "border-[rgba(101,245,154,0.3)]",
        glow: "shadow-[0_0_12px_rgba(101,245,154,0.12)]",
      };
    case "masteradmin":
      return {
        bar: "before:bg-purple-400",
        text: "text-purple-400",
        border: "border-purple-500/35",
        glow: "shadow-[0_0_12px_rgba(168,85,247,0.15)]",
      };
    case "institution":
    case "school":
      return {
        bar: "before:bg-blue-400",
        text: "text-blue-400",
        border: "border-blue-500/35",
        glow: "shadow-[0_0_12px_rgba(37,99,235,0.15)]",
      };
    case "handler":
    case "teacher":
      return {
        bar: "before:bg-indigo-400",
        text: "text-indigo-400",
        border: "border-indigo-500/35",
        glow: "shadow-[0_0_12px_rgba(99,102,241,0.15)]",
      };
    case "subscriber":
      return {
        bar: "before:bg-amber-400",
        text: "text-amber-400",
        border: "border-amber-500/35",
        glow: "shadow-[0_0_12px_rgba(234,179,8,0.15)]",
      };
    case "member":
    case "student":
    default:
      return {
        bar: "before:bg-violet-400",
        text: "text-violet-400",
        border: "border-violet-500/35",
        glow: "shadow-[0_0_12px_rgba(139,92,246,0.15)]",
      };
  }
};

export default function Sidebar({
  role,
  isOpen,
  onClose,
  collapsed,
  setCollapsed,
}: SidebarProps) {
  const pathname = usePathname();
  const config =
    dashboardNavConfig[role] ||
    dashboardNavConfig.member ||
    dashboardNavConfig.subscriber ||
    dashboardNavConfig.student;
  const roleAccents = getRoleAccentColors(role);
  const { logout } = useAuth();
  const { playTap, playHover } = useSound();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    playTap();
    setIsSigningOut(true);
    try {
      await logout();
      await signOutUser();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("quizdorm_demo_user");
        document.cookie =
          "quizdorm_demo_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        window.location.href = "/auth/login?logout=true";
      }
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    dashboard: <LayoutDashboard className="h-4 w-4" />,
    organization: <Building2 className="h-4 w-4" />,
    school: <School className="h-4 w-4" />,
    assignments: <BookOpen className="h-4 w-4" />,
    bank: <Database className="h-4 w-4" />,
    ocr: <ScanText className="h-4 w-4" />,
    media: <FileImage className="h-4 w-4" />,
    quality: <ShieldCheck className="h-4 w-4" />,
    adaptive: <Brain className="h-4 w-4" />,
    revision: <RotateCcw className="h-4 w-4" />,
    credentials: <Award className="h-4 w-4" />,
    billing: <CreditCard className="h-4 w-4" />,
    communication: <Megaphone className="h-4 w-4" />,
    messaging: <MessageSquare className="h-4 w-4" />,
    developer: <Code2 className="h-4 w-4" />,
    integrations: <Boxes className="h-4 w-4" />,
    enterprise_admin: <ShieldAlert className="h-4 w-4" />,
    tenant_controls: <Building className="h-4 w-4" />,
    mobile_platform: <Smartphone className="h-4 w-4" />,
    offline_sync: <RefreshCw className="h-4 w-4" />,
    parent_portal: <HeartHandshake className="h-4 w-4" />,
    parent_insights: <Baby className="h-4 w-4" />,
    edge_offline: <WifiOff className="h-4 w-4" />,
    campus_server: <Server className="h-4 w-4" />,
    academic_integrations: <School className="h-4 w-4" />,
    gradebook_sync: <GraduationCap className="h-4 w-4" />,
    global_olympiads: <Trophy className="h-4 w-4" />,
    tournament_control: <Swords className="h-4 w-4" />,
    swords: <Swords className="h-4 w-4" />,
    marketplace_hub: <ShoppingBag className="h-4 w-4" />,
    creator_studio: <Store className="h-4 w-4" />,
    ai_tutor: <Bot className="h-4 w-4" />,
    ai_planner: <Sparkles className="h-4 w-4" />,
    ai_performance: <TrendingUp className="h-4 w-4" />,
    risk_interventions: <ShieldAlert className="h-4 w-4" />,
    community_hub: <Users className="h-4 w-4" />,
    users: <Users className="h-4 w-4" />,
    sessions: <Laptop className="h-4 w-4" />,
    quiz_clubs: <MessageSquare className="h-4 w-4" />,
    global_directory: <Globe className="h-4 w-4" />,
    curriculum_exchange: <Share2 className="h-4 w-4" />,
    ai_admin: <Cpu className="h-4 w-4" />,
    quizzes: <HelpCircle className="h-4 w-4" />,
    builder: <PlusSquare className="h-4 w-4" />,
    competitions: <Trophy className="h-4 w-4" />,
    calendar: <Calendar className="h-4 w-4" />,
    announcements: <Megaphone className="h-4 w-4" />,
    leaderboard: <Award className="h-4 w-4" />,
    profile: <User className="h-4 w-4" />,
    settings: <Settings className="h-4 w-4" />,
  };

  const navItems = config.items;

  // Group items by task / category
  const groupedNav = useMemo(() => {
    const groups: { [key: string]: NavItem[] } = {};
    navItems.forEach((item) => {
      const cat = item.category || "General";
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(item);
    });
    return groups;
  }, [navItems]);

  const getRoleHomeUrl = (r: string) => {
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

  return (
    <>
      {/* Mobile drawer overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-[#070B0A]/85 backdrop-blur-xs md:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex h-full flex-col transition-all duration-300 md:sticky md:top-0 md:z-20 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        } ${collapsed ? "w-16" : "w-60"}`}
      >
        <div className="relative flex h-full flex-col justify-between bg-[#0C1210] border-r border-[rgba(160,190,170,0.14)] transition-colors duration-200 overflow-hidden">
          {/* Cybernetic Vertical Scanning Beam */}
          <div className="aurora-side-scanner" />

          <div>
            {/* Header */}
            <div className="flex h-14 items-center justify-between px-3.5 border-b border-[rgba(160,190,170,0.12)]">
              <Link href={getRoleHomeUrl(role)} className="flex items-center space-x-2">
                {!collapsed ? (
                  <Logo />
                ) : (
                  <Logo showWordmark={false} iconSize="w-8 h-8" />
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon-xs"
                onClick={onClose}
                className="md:hidden text-[#A0AEA5] hover:text-[#F2F7F3] rounded-[3px]"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation Items (Task-Grouped) */}
            <nav className="space-y-4 px-2 py-3 overflow-y-auto max-h-[calc(100vh-7.5rem)]">
              {Object.entries(groupedNav).map(([category, items]) => (
                <div key={category} className="space-y-0.5">
                  {!collapsed ? (
                    <div className="px-2.5 pb-1 text-[9px] font-mono uppercase tracking-widest text-[#69786F] font-semibold">
                      {category}
                    </div>
                  ) : (
                    <div className="my-1.5 border-t border-[rgba(160,190,170,0.08)]" />
                  )}

                  {items.map((item) => {
                    const isActive =
                      pathname === item.href ||
                      (item.href !== "/dashboard" &&
                        item.href !== `/${role}` &&
                        pathname.startsWith(item.href));

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onMouseEnter={playHover}
                        onClick={() => {
                          playTap();
                          onClose();
                        }}
                        className={`group relative flex items-center justify-between rounded-[4px] px-2.5 py-1.5 text-xs transition-all ${
                          isActive
                            ? `text-[#F2F7F3] font-medium before:absolute before:left-0 before:top-1.5 before:bottom-1.5 before:w-[2px] ${roleAccents.bar} before:rounded-r shadow-xs`
                            : "text-[#A0AEA5] hover:bg-[#111B17] hover:text-[#F2F7F3] font-normal"
                        }`}
                        title={collapsed ? item.name : undefined}
                      >
                        {isActive && (
                          <motion.div
                            layoutId="sidebarActiveGlider"
                            className={`absolute inset-0 rounded-[4px] bg-[#17251E]/80 border ${roleAccents.border} ${roleAccents.glow} -z-10`}
                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                          />
                        )}
                        <div className="flex items-center space-x-2.5 min-w-0">
                          <div
                            className={`shrink-0 transition-colors ${
                              isActive ? roleAccents.text : "text-[#69786F] group-hover:text-[#A0AEA5]"
                            }`}
                          >
                            {item.icon && iconMap[item.icon] ? (
                              iconMap[item.icon]
                            ) : (
                              <LayoutDashboard className="h-4 w-4" />
                            )}
                          </div>
                          {!collapsed && (
                            <span className="truncate tracking-tight text-[11px]">{item.name}</span>
                          )}
                        </div>
                        {!collapsed && item.badge && (
                          <span
                            className={`text-[8.5px] uppercase font-mono tracking-wider px-1.5 py-0.2 rounded-[2px] ${
                              item.badge === "Locked"
                                ? "bg-[rgba(248,113,113,0.15)] text-[#F87171] border border-[rgba(248,113,113,0.3)] font-bold flex items-center gap-0.5"
                                : isActive
                                ? "bg-[rgba(101,245,154,0.18)] text-[#65F59A] border border-[rgba(101,245,154,0.3)] font-semibold"
                                : "bg-[#111B17] text-[#69786F] border border-[rgba(160,190,170,0.12)] font-medium"
                            }`}
                          >
                            {item.badge === "Locked" ? "🔒 Locked" : item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              ))}
            </nav>
          </div>

          {/* Audio Controls & System Status */}
          <div className="p-2 border-t border-[rgba(160,190,170,0.12)] space-y-1.5">
            {!collapsed && (
              <div className="flex items-center justify-between px-2 py-1 text-[9px] font-mono text-[#69786F] bg-[#070B0A]/60 rounded border border-[rgba(160,190,170,0.08)]">
                <span className="flex items-center gap-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#65F59A] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#65F59A]"></span>
                  </span>
                  <span>LIVE SYNC</span>
                </span>
                <span className="text-[#65F59A]">18ms</span>
              </div>
            )}
            <div className="flex items-center justify-between">
              <AudioToggle showLabel={!collapsed} className="w-full justify-start" />
            </div>
            <div className="flex items-center justify-between">
              <ThemeToggle showLabel={!collapsed} className="w-full justify-start" />
            </div>
          </div>

          {/* Sign Out Button */}
          <div className="p-2 border-t border-[rgba(160,190,170,0.12)]">
            <button
              onClick={handleSignOut}
              disabled={isSigningOut}
              className={`w-full flex items-center ${
                collapsed ? "justify-center" : "justify-start px-2.5"
              } py-1.5 text-xs font-mono text-[#F87171] hover:bg-[rgba(248,113,113,0.1)] rounded-[4px] transition-colors disabled:opacity-50 cursor-pointer`}
              title="Sign Out"
            >
              <LogOut className="h-3.5 w-3.5 shrink-0" />
              {!collapsed && (
                <span className="ml-2 uppercase tracking-wider text-[10px] font-semibold">
                  {isSigningOut ? "Signing Out..." : "Sign Out"}
                </span>
              )}
            </button>
          </div>

          {/* Collapse Toggle Button (Desktop Only) */}
          <div className="hidden md:block p-2 border-t border-[rgba(160,190,170,0.12)]">
            <Button
              variant="outline"
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center py-1 h-7 text-xs font-mono border-[rgba(160,190,170,0.14)] rounded-[4px] bg-[#070B0A]/40 text-[#69786F] hover:text-[#F2F7F3] hover:bg-[#111B17]"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-3.5 w-3.5 text-[#65F59A]" />
              ) : (
                <ChevronLeft className="h-3.5 w-3.5" />
              )}
              {!collapsed && (
                <span className="ml-1.5 tracking-wider uppercase text-[9px]">Collapse</span>
              )}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
