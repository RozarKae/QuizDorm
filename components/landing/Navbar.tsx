"use client";

import Link from "next/link";
import Logo from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Create Quiz", href: "/create-quiz" },
    { name: "Quizzes", href: "/dashboard/quizzes" },
    { name: "Marketplace", href: "/dashboard/marketplace" },
    { name: "Certifications", href: "/dashboard/certifications" },
    { name: "EduCloud OS", href: "/dashboard/cloud-ops" },
  ];

  return (
    <header className="border-b border-border bg-card/90 backdrop-blur-md py-3 px-6 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-xs font-mono uppercase tracking-wider text-muted-foreground font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`hover:text-foreground transition-colors ${
                item.name === "Create Quiz"
                  ? "text-cobalt font-semibold"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2">
          <Link href="/create-quiz">
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-mono border-border hover:bg-muted rounded-[3px] px-3 h-8"
            >
              + Create Quiz
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="text-xs font-mono text-muted-foreground hover:text-foreground rounded-[3px] px-3 h-8">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-cobalt hover:bg-cobalt/90 text-white text-xs font-mono font-medium rounded-[3px] px-3.5 h-8 shadow-xs">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
