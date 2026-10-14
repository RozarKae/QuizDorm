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
    <header className="border-b border-slate-200 bg-white py-3 px-6 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
        </Link>
        <nav className="flex items-center space-x-6 text-xs text-slate-600 font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`hover:text-slate-900 transition-colors ${
                item.name === "Create Quiz"
                  ? "text-indigo-600 font-bold hover:text-indigo-800"
                  : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2.5">
          <Link href="/create-quiz">
            <Button
              size="sm"
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold rounded-xl px-3.5 py-1.5 shadow-sm"
            >
              + Create Quiz
            </Button>
          </Link>
          <Link href="/auth/login">
            <Button variant="ghost" size="sm" className="text-xs text-slate-600">
              Sign In
            </Button>
          </Link>
          <Link href="/auth/register">
            <Button size="sm" className="bg-slate-900 text-white text-xs rounded-xl px-3 py-1.5">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
