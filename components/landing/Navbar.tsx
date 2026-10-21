"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";
import { Menu, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Overview", href: "/" },
    { name: "Assessment Engine", href: "/#features" },
    { name: "Live Arena", href: "/live/arena" },
    { name: "Question Bank", href: "/dashboard/questions" },
    { name: "Role Workspaces", href: "/#audience" },
  ];

  return (
    <header className="border-b border-[rgba(160,190,170,0.12)] bg-[#070B0A]/85 backdrop-blur-md py-3.5 px-6 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-7 text-xs font-mono uppercase tracking-wider text-[#A0AEA5] font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="hover:text-[#65F59A] transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden sm:flex items-center space-x-3">
          <Link href="/auth/login">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-mono text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#111B17] rounded-[4px] px-3.5 h-8"
            >
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button
              size="sm"
              className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] text-xs font-mono font-bold rounded-[4px] px-4 h-8 shadow-[0_0_12px_rgba(101,245,154,0.18)]"
            >
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center space-x-2">
          <Link href="/auth/login" className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              className="text-xs font-mono text-[#A0AEA5] hover:text-[#F2F7F3] px-2.5 h-8"
            >
              Sign In
            </Button>
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-[4px] bg-[#111B17] border border-[rgba(160,190,170,0.18)] text-[#A0AEA5] hover:text-[#F2F7F3] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#65F59A]" /> : <Menu className="w-5 h-5" />}
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
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-[rgba(160,190,170,0.12)] bg-[#0C1210]/95 backdrop-blur-xl mt-3.5 -mx-6 px-6 py-5 space-y-4 shadow-2xl"
          >
            <nav className="flex flex-col space-y-3 font-mono text-xs uppercase tracking-wider">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-2 text-[#A0AEA5] hover:text-[#65F59A] border-b border-[rgba(160,190,170,0.08)] flex items-center justify-between"
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#65F59A]" />
                </Link>
              ))}
            </nav>

            <div className="pt-2 flex flex-col space-y-2">
              <Link href="/auth/register" onClick={() => setMobileMenuOpen(false)} className="w-full">
                <Button className="w-full bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] font-mono text-xs font-bold rounded-[4px] h-10 shadow-[0_0_15px_rgba(101,245,154,0.18)]">
                  Launch Platform
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
