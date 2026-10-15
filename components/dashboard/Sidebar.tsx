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
    parent_portal: <HeartHandshake className="h-5 w-5" />,
    parent_insights: <Baby className="h-5 w-5" />,
    edge_offline: <WifiOff className="h-5 w-5" />,
    campus_server: <Server className="h-5 w-5" />,
    academic_integrations: <School className="h-5 w-5" />,
    gradebook_sync: <GraduationCap className="h-5 w-5" />,
    global_olympiads: <Trophy className="h-5 w-5" />,
    tournament_control: <Swords className="h-5 w-5" />,
    marketplace_hub: <ShoppingBag className="h-5 w-5" />,
    creator_studio: <Store className="h-5 w-5" />,
    ai_tutor: <Bot className="h-5 w-5" />,
    ai_planner: <Sparkles className="h-5 w-5" />,
    ai_performance: <TrendingUp className="h-5 w-5" />,
    risk_interventions: <ShieldAlert className="h-5 w-5" />,
    community_hub: <Users className="h-5 w-5" />,
    quiz_clubs: <MessageSquare className="h-5 w-5" />,
    global_directory: <Globe className="h-5 w-5" />,
    curriculum_exchange: <Share2 className="h-5 w-5" />,
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
        <div className="flex h-full flex-col justify-between bg-card border-r border-border transition-colors duration-200">
          <div>
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-4 border-b border-border">
              <Link href="/dashboard" className="flex items-center space-x-2">
                {!collapsed ? (
                  <Logo />
                ) : (
                  <div className="p-2 rounded-[3px] bg-primary text-primary-foreground font-mono text-xs font-bold tracking-tight">
                    QD
                  </div>
                )}
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="md:hidden text-muted-foreground hover:text-foreground rounded-[3px]"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Navigation Items */}
            <nav className="space-y-0.5 px-3 py-3 overflow-y-auto max-h-[calc(100vh-8rem)]">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={`flex items-center justify-between rounded-[3px] px-3 py-2 text-xs transition-colors ${
                      isActive
                        ? "bg-foreground text-background font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground font-normal"
                    }`}
                    title={collapsed ? item.name : undefined}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className={`flex-shrink-0 ${isActive ? "text-acid dark:text-acid" : ""}`}>
                        {item.icon ? iconMap[item.icon] : <LayoutDashboard className="h-4 w-4" />}
                      </div>
                      {!collapsed && <span className="truncate tracking-tight">{item.name}</span>}
                    </div>
                    {!collapsed && item.badge && (
                      <span
                        className={`text-[9px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded-[2px] ${
                          isActive
                            ? "bg-background/20 text-background dark:text-foreground font-bold"
                            : "bg-muted text-muted-foreground font-medium border border-border"
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
          <div className="hidden md:block p-3 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setCollapsed(!collapsed)}
              className="w-full flex items-center justify-center py-2 h-8 text-xs font-mono border-border rounded-[3px] hover:bg-muted text-muted-foreground hover:text-foreground"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
              {!collapsed && <span className="ml-2 tracking-wider uppercase text-[10px]">Collapse</span>}
            </Button>
          </div>
        </div>
      </aside>
    </>
  );
}
