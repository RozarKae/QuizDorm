"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
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
        <div className="flex items-center space-x-3">
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="text-xs font-mono text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#111B17] rounded-xl px-3.5 h-8">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-[#65F59A] hover:bg-[#65F59A]/90 text-[#070B0A] text-xs font-mono font-bold rounded-xl px-4 h-8 shadow-sm shadow-[#65F59A]/20">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
