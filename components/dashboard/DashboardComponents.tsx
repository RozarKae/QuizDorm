"use client";

import { Button } from "@/components/ui/button";
import { Activity,ArrowUpRight,Sparkles } from "lucide-react";
import Link from "next/link";

// 1. PageHeader — Semantic Style
interface PageHeaderProps {
  title: string;
  description?: string;
  eyebrow?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, eyebrow, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between pb-4 border-b border-border">
      <div className="space-y-1">
        {eyebrow && (
          <p className="font-mono text-[10px] uppercase tracking-widest font-semibold text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground uppercase">
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
      <div className="w-1.5 h-3 bg-primary rounded-[1px] shadow-[0_0_6px_var(--primary)]" />
      <h2 className="font-display text-xs font-bold uppercase tracking-wider text-foreground">
        {title}
      </h2>
    </div>
  );
}

// 5. StatsCard — Semantic Metric Tile
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, change, isPositive = true, icon }: StatsCardProps) {
  return (
    <div className="p-4 rounded-[6px] bg-card border border-border hover:border-primary/40 transition-all flex flex-col justify-between shadow-xs">
      <div className="flex items-center justify-between pb-2 border-b border-border/60">
        <p className="font-mono text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="mt-3 flex items-baseline justify-between">
        <p className="font-display text-2xl sm:text-3xl font-extrabold text-foreground tabular-nums tracking-tight">
          {value}
        </p>
        {change && (
          <span
            className={`inline-flex items-center px-1.5 py-0.5 rounded-[2px] font-mono text-[10px] font-semibold ${
              isPositive
                ? "bg-primary/10 text-primary border border-primary/25"
                : "bg-destructive/10 text-destructive border border-destructive/25"
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
    <div className={`p-5 rounded-[6px] bg-card border border-border shadow-xs ${className || ""}`}>
      <div className="pb-3 mb-4 border-b border-border flex flex-col gap-0.5">
        <h3 className="font-display text-sm sm:text-base font-bold text-foreground uppercase tracking-tight">
          {title}
        </h3>
        {description && <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>}
      </div>
      <div>{children}</div>
    </div>
  );
}

// 7. QuickActionCard — Action Tile
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
      className="group block p-4 rounded-[4px] bg-secondary/80 border border-border hover:border-primary/50 transition-all hover:bg-secondary relative"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5 text-primary">
          {icon || <Sparkles className="h-4 w-4" />}
          <h4 className="font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
            {title}
          </h4>
        </div>
        <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
        {description}
      </p>
      <div className="mt-3 flex items-center gap-1 font-mono text-[10px] uppercase font-bold text-primary tracking-wider">
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
    <div className="p-4 rounded-[6px] bg-card border border-border shadow-xs">
      <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border">
        <Activity className="h-4 w-4 text-primary" />
        <h4 className="font-display text-xs uppercase font-bold tracking-wider text-foreground">
          {title}
        </h4>
      </div>
      <div className="divide-y divide-border/60">
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
    <div className="p-8 sm:p-12 rounded-[6px] bg-card border border-border border-dashed text-center flex flex-col items-center justify-center space-y-3">
      <div className="w-10 h-10 rounded-[4px] bg-secondary border border-border flex items-center justify-center text-muted-foreground">
        {icon || <Activity className="w-5 h-5 text-primary" />}
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
          className="mt-2 font-mono text-xs tracking-wider rounded-[4px]"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
