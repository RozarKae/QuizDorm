"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight, Sparkles } from "lucide-react";
import Logo from "@/components/layout/Logo";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Features", href: "/features" },
    { name: "About", href: "/about" },
    { name: "Pricing", href: "/pricing" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#09090B]/80 backdrop-blur-xl border-b border-white/[0.08] py-3.5 shadow-2xl shadow-black/60"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 group">
            <Logo />
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-8 bg-white/[0.03] border border-white/[0.08] backdrop-blur-md px-6 py-2 rounded-full">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-[#B8BCC8] hover:text-white transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-sm font-medium text-[#B8BCC8] hover:text-white">
                Login
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-semibold rounded-[14px] px-5 shadow-lg shadow-blue-500/25">
                <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#09090B] border-l border-white/[0.08] p-6 shadow-2xl z-55 flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
                  <Logo />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6 text-white" />
                  </Button>
                </div>

                <nav className="flex flex-col space-y-4">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-base font-semibold text-white hover:text-blue-400 transition-colors flex items-center justify-between p-2 rounded-xl hover:bg-white/[0.04]"
                    >
                      <span>{item.name}</span>
                      <ChevronRight className="h-4 w-4 text-[#6B7280]" />
                    </Link>
                  ))}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/[0.08]">
                <Link href="/auth/login" className="block w-full" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full text-sm font-medium rounded-[14px]">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/register" className="block w-full" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-[14px] shadow-lg shadow-blue-500/25">
                    Get Started
                  </Button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
