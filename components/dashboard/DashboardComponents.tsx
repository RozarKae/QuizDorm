"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 1. PageHeader — Editorial Masthead Style
interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-5 border-b border-border">
      <div className="space-y-1">
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-widest font-bold text-[#2855F5]">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-foreground uppercase">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2 shrink-0">{children}</div>}
    </div>
  );
}

// 2. DashboardContainer
export function DashboardContainer({ children }: { children: React.ReactNode }) {
  return <div className="space-y-6">{children}</div>;
}

// 3. DashboardGrid
export function DashboardGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

// 4. SectionTitle
export function SectionTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 pb-1">
      <div className="w-1.5 h-3.5 bg-[#2855F5]" />
      <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
        {title}
      </h2>
    </div>
  );
}

// 5. StatsCard — High Precision Metric Tile
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, change, isPositive = true, icon }: StatsCardProps) {
  return (
    <div className="p-4 rounded-[3px] bg-card border border-border hover:border-foreground/30 transition-colors flex flex-col justify-between">
      <div className="flex items-center justify-between pb-2 border-b border-border/40">
        <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        {icon && <div className="text-muted-foreground/70">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <p className="font-display text-2xl sm:text-3xl font-black text-foreground tabular-nums tracking-tight">
          {value}
        </p>
        {change && (
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-bold ${
              isPositive
                ? "bg-[#DFFF43] text-[#111318]"
                : "bg-[#E85D3F]/15 text-[#E85D3F]"
            }`}
          >
            {change}
          </span>
        )}
      </div>
    </div>
  );
}

// 6. DashboardCard
interface DashboardCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ title, description, children, className }: DashboardCardProps) {
  return (
    <div className={`p-5 rounded-[3px] bg-card border border-border ${className || ""}`}>
      <div className="pb-3 mb-4 border-b border-border/60 flex flex-col gap-0.5">
        <h3 className="font-display text-sm sm:text-base font-bold text-foreground uppercase tracking-tight">
          {title}
        </h3>
        {description && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

// 7. QuickActionCard — Editorial Action Tile
interface QuickActionCardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  actionLabel?: string;
}

export function QuickActionCard({
  title,
  description,
  href,
  icon,
  actionLabel = "Start",
}: QuickActionCardProps) {
  return (
    <Link
      href={href}
      className="group block p-4 rounded-[3px] bg-card border border-border hover:border-[#2855F5] transition-colors relative"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 text-[#2855F5]">
          {icon || <Sparkles className="h-4 w-4" />}
          <h4 className="font-display text-sm font-bold text-foreground group-hover:text-[#2855F5] transition-colors">
            {title}
          </h4>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-[#2855F5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="mt-3 flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-[#2855F5] tracking-wider">
        <span>{actionLabel}</span>
      </div>
    </Link>
  );
}

// 8. ActivityCard
interface ActivityItem {
  id: string;
  title: string;
  description: string;
  time: string;
}

export function ActivityCard({
  title = "Recent Activity",
  activities,
  items,
}: {
  title?: string;
  activities?: ActivityItem[];
  items?: ActivityItem[];
}) {
  const list = items || activities || [];

  return (
    <div className="p-4 rounded-[3px] bg-card border border-border">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border/60">
        <Activity className="h-4 w-4 text-[#2855F5]" />
        <h4 className="font-display text-xs uppercase font-bold tracking-wider text-foreground">
          {title}
        </h4>
      </div>
      <div className="divide-y divide-border/50">
        {list.map((act) => (
          <div key={act.id} className="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-foreground">{act.title}</p>
              <p className="text-[11px] text-muted-foreground mt-0.5">{act.description}</p>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground whitespace-nowrap">
              {act.time}
            </span>
          </div>
        ))}
        {list.length === 0 && (
          <p className="py-4 text-center text-xs font-mono text-muted-foreground">No recent events logged</p>
        )}
      </div>
    </div>
  );
}

// 9. EmptyDashboard
interface EmptyDashboardProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  icon?: React.ReactNode;
}

export function EmptyDashboard({
  title,
  description,
  actionLabel,
  onAction,
  icon,
}: EmptyDashboardProps) {
  return (
    <div className="p-8 sm:p-12 rounded-[3px] bg-card border border-border border-dashed text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 rounded-[2px] bg-muted/60 border border-border flex items-center justify-center text-muted-foreground">
        {icon || <Activity className="w-5 h-5 text-[#2855F5]" />}
      </div>
      <div className="space-y-1 max-w-md">
        <h3 className="font-display text-sm sm:text-base font-bold text-foreground uppercase tracking-tight">
          {title}
        </h3>
        {description && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      {actionLabel && (
        <Button
          size="sm"
          onClick={onAction}
          className="mt-2 bg-[#2855F5] hover:bg-[#1f44c7] text-white font-mono text-xs tracking-wider rounded-[3px]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

