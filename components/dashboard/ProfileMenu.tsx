"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User, Settings, HelpCircle, LogOut } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileMenuProps {
  role: string;
}

export default function ProfileMenu({ role }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-hidden focus:ring-1 focus:ring-[#65F59A] rounded-[4px] p-0.5 transition-opacity"
        aria-label="User profile menu"
      >
        <Avatar className="h-7 w-7 rounded-[4px] border border-[rgba(160,190,170,0.22)] bg-[#17251E]">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback className="bg-[#17251E] text-[#65F59A] font-mono font-bold text-[10px] uppercase rounded-[4px]">
            {role.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-2 w-56 rounded-[6px] border border-[rgba(160,190,170,0.22)] bg-[#111B17] shadow-[0_16px_36px_rgba(0,0,0,0.8)] py-1 z-50 overflow-hidden"
          >
            <div className="px-3.5 py-2.5 border-b border-[rgba(160,190,170,0.12)] bg-[#0C1210]/60">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#F2F7F3] capitalize font-display">
                  {role} Account
                </p>
                <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.2 rounded-[2px] bg-[rgba(101,245,154,0.12)] text-[#65F59A] border border-[rgba(101,245,154,0.25)] font-semibold">
                  Active
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#69786F] truncate mt-0.5">
                {role}@quizdorm.com
              </p>
            </div>

            <div className="py-1">
              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#17251E] transition-colors font-medium"
              >
                <User className="h-3.5 w-3.5 text-[#65F59A]" />
                <span>Profile</span>
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#17251E] transition-colors font-medium"
              >
                <Settings className="h-3.5 w-3.5 text-[#38D9B0]" />
                <span>Settings</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#17251E] transition-colors font-medium"
              >
                <HelpCircle className="h-3.5 w-3.5 text-[#A0AEA5]" />
                <span>Documentation & Support</span>
              </Link>
            </div>

            <div className="border-t border-[rgba(160,190,170,0.12)] my-0.5" />

            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#F87171] hover:bg-[rgba(248,113,113,0.12)] transition-colors font-medium"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>Sign Out</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
