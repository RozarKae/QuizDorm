"use client";

import Link from "next/link";
import { ArrowUpRight, Sparkles, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// 1. PageHeader
interface PageHeaderProps {
  title: string;
  description?: string;
  children?: React.ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-2">
      <div className="space-y-1">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h1>
        {description && (
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {description}
          </p>
        )}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
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
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {children}
    </div>
  );
}

// 4. SectionTitle
export function SectionTitle({ title }: { title: string }) {
  return (
    <h2 className="text-lg font-bold text-gray-900 dark:text-white pb-1">
      {title}
    </h2>
  );
}

// 5. StatsCard
interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon?: React.ReactNode;
}

export function StatsCard({ title, value, change, isPositive = true, icon }: StatsCardProps) {
  return (
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            {title}
          </p>
          {icon && <div className="text-gray-400 dark:text-gray-500">{icon}</div>}
        </div>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <span
              className={`inline-flex items-center text-xs font-medium ${
                isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {change}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
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
    <Card className={`border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md shadow-sm ${className || ""}`}>
      <CardHeader className="p-6">
        <CardTitle className="text-lg font-bold text-gray-900 dark:text-white">{title}</CardTitle>
        {description && <CardDescription className="text-xs">{description}</CardDescription>}
      </CardHeader>
      <CardContent className="px-6 pb-6 pt-0">{children}</CardContent>
    </Card>
  );
}

// 7. QuickActionCard
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
    <Card className="border border-gray-200 dark:border-gray-800 bg-white/60 dark:bg-gray-900/60 backdrop-blur-md hover:border-primary/50 dark:hover:border-primary/50 transition-all shadow-sm">
      <CardContent className="p-6 flex flex-col h-full justify-between">
        <div className="space-y-2">
          <div className="flex items-center space-x-3 text-primary">
            {icon || <Sparkles className="h-5 w-5" />}
            <h3 className="text-base font-bold text-gray-900 dark:text-white">{title}</h3>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
        </div>
        <div className="mt-4 pt-2">
          <Link href={href}>
            <Button size="sm" className="w-full flex items-center justify-center space-x-1">
              <span>{actionLabel}</span>
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

// 8. ActivityCard
interface ActivityItem {
  id: string;
  title: string;
  time: string;
  description?: string;
}

export function ActivityCard({ title, items }: { title: string; items: ActivityItem[] }) {
  return (
    <DashboardCard title={title} description="Your most recent activities and changes">
      <div className="flow-root">
        <ul className="-mb-8">
          {items.map((item, itemIdx) => (
            <li key={item.id}>
              <div className="relative pb-8">
                {itemIdx !== items.length - 1 ? (
                  <span
                    className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200 dark:bg-gray-800"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex space-x-3">
                  <div>
                    <span className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                      <Activity className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex-1 min-w-0 pt-1.5">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.title}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {item.description}
                      </p>
                    )}
                    <span className="text-[10px] text-gray-400 dark:text-gray-500 block mt-1">
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </DashboardCard>
  );
}

// 9. EmptyDashboard
interface EmptyDashboardProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyDashboard({
  title,
  description,
  actionLabel,
  onAction,
}: EmptyDashboardProps) {
  return (
    <div className="text-center py-12 px-4 rounded-2xl border border-dashed border-gray-300 dark:border-gray-800 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-400">
        <Sparkles className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-base font-bold text-gray-900 dark:text-white">{title}</h3>
      <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 max-w-sm mx-auto">{description}</p>
      {actionLabel && onAction && (
        <div className="mt-6">
          <Button onClick={onAction} className="bg-primary hover:bg-primary/90 text-white">
            {actionLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

// 10. Breadcrumb (alternative standalone display if needed)
export function Breadcrumb({ items }: { items: { name: string; href: string }[] }) {
  return (
    <nav className="flex text-sm text-gray-500 dark:text-gray-400 space-x-1 items-center">
      {items.map((item, idx) => (
        <div key={item.href} className="flex items-center space-x-1">
          {idx > 0 && <span>/</span>}
          {idx === items.length - 1 ? (
            <span className="font-semibold text-gray-900 dark:text-white capitalize">
              {item.name}
            </span>
          ) : (
            <Link href={item.href} className="hover:text-primary transition-colors capitalize">
              {item.name}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
}
