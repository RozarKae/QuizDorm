"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight, LayoutDashboard } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/components/auth/AuthProvider";
import { ThemeToggle } from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, role } = useAuth();

  const getWorkspaceUrl = (r?: string) => {
    if (r === "admin" || r === "superadmin") return "/admin";
    if (r === "masteradmin") return "/admin/master";
    if (r === "institution" || r === "school") return "/school";
    if (r === "handler" || r === "teacher") return "/teacher";
    return "/student";
  };

  const navItems = [
    { name: "The Dorm", href: "/" },
    { name: "Cognitive Engine", href: "/#features" },
    { name: "Battle Arenas", href: "/live/arena" },
    { name: "Knowledge Matrix", href: "/dashboard/questions" },
    { name: "Founder's Desk", href: "/about" },
  ];

  return (
    <header className="border-b border-border bg-background/90 dark:bg-[#070B0A]/85 backdrop-blur-md py-3.5 px-6 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-mono uppercase tracking-wider text-slate-600 dark:text-[#A0AEA5] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-[#047857] dark:hover:text-[#65F59A] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <ThemeToggle />

          {user ? (
            <Link href={getWorkspaceUrl(role)}>
              <Button
                size="sm"
                className="bg-[#047857] hover:bg-[#065F46] text-white dark:bg-[#65F59A] dark:hover:bg-[#65F59A]/90 dark:text-[#070B0A] text-xs font-mono font-bold rounded-[4px] px-4 h-8 shadow-[0_0_12px_rgba(4,120,87,0.2)] dark:shadow-[0_0_12px_rgba(101,245,154,0.18)] flex items-center space-x-1.5"
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                <span>Open Workspace</span>
              </Button>
            </Link>
          ) : (
            <>
              <Link href="/auth/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-xs font-mono text-slate-600 dark:text-[#A0AEA5] hover:text-slate-900 dark:hover:text-[#F2F7F3] hover:bg-slate-100 dark:hover:bg-[#111B17] rounded-[4px] px-3.5 h-8"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-[#047857] hover:bg-[#065F46] text-white dark:bg-[#65F59A] dark:hover:bg-[#65F59A]/90 dark:text-[#070B0A] text-xs font-mono font-bold rounded-[4px] px-4 h-8 shadow-[0_0_12px_rgba(4,120,87,0.2)] dark:shadow-[0_0_12px_rgba(101,245,154,0.18)]"
                >
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Actions & Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <ThemeToggle />

          {user ? (
            <Link href={getWorkspaceUrl(role)} className="sm:hidden">
              <Button
                size="sm"
                className="bg-[#047857] text-white dark:bg-[#65F59A] dark:text-[#070B0A] text-xs font-mono font-bold px-2.5 h-8 rounded-[4px]"
              >
                Workspace
              </Button>
            </Link>
          ) : (
            <Link href="/auth/login" className="sm:hidden">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs font-mono text-slate-600 dark:text-[#A0AEA5] hover:text-slate-900 dark:hover:text-[#F2F7F3] px-2.5 h-8"
              >
                Sign In
              </Button>
            </Link>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[4px] bg-slate-100 dark:bg-[#111B17] border border-border text-slate-700 dark:text-[#A0AEA5] hover:text-slate-900 dark:hover:text-[#F2F7F3] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#047857] dark:text-[#65F59A]" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border mt-3 pt-4 pb-6 space-y-4 font-mono text-xs uppercase"
          >
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-slate-600 dark:text-[#A0AEA5] hover:text-[#047857] dark:hover:text-[#65F59A] border-b border-border/50 flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#047857] dark:text-[#65F59A]" />
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#047857] hover:bg-[#065F46] text-white dark:bg-[#65F59A] dark:hover:bg-[#65F59A]/90 dark:text-[#070B0A] font-mono text-xs font-bold rounded-[4px] h-10 shadow-sm">
                  Get Started Free
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
