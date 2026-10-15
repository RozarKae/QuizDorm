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
        className="flex items-center space-x-2 focus:outline-none focus:ring-1 focus:ring-cobalt rounded-[3px] p-0.5 transition-opacity"
        aria-label="User profile menu"
      >
        <Avatar className="h-8 w-8 rounded-[3px] border border-border">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback className="bg-primary text-primary-foreground font-mono font-bold text-[11px] uppercase rounded-[3px]">
            {role.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.12 }}
            className="absolute right-0 mt-2 w-56 rounded-[3px] border border-border bg-card shadow-lg py-1 z-50 overflow-hidden"
          >
            <div className="px-3.5 py-2.5 border-b border-border bg-muted/30">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-foreground capitalize font-display">
                  {role} Account
                </p>
                <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded-[2px] bg-acid/20 text-foreground border border-acid/40 font-bold">
                  Active
                </span>
              </div>
              <p className="text-[11px] font-mono text-muted-foreground truncate mt-0.5">
                {role}@quizdorm.com
              </p>
            </div>

            <div className="py-1">
              <Link
                href="/dashboard/profile"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
              >
                <User className="h-3.5 w-3.5 text-cobalt" />
                <span>Profile</span>
              </Link>

              <Link
                href="/dashboard/settings"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
              >
                <Settings className="h-3.5 w-3.5 text-cobalt" />
                <span>Settings</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-2 text-xs text-muted-foreground hover:text-foreground hover:bg-muted transition-colors font-medium"
              >
                <HelpCircle className="h-3.5 w-3.5 text-cobalt" />
                <span>Support & Help</span>
              </Link>
            </div>

            <div className="border-t border-border my-0.5" />

            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2.5 px-3.5 py-2 text-xs text-coral hover:bg-coral/10 transition-colors font-medium"
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
