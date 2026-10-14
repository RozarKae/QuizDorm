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
        className="flex items-center space-x-2 focus:outline-none hover:opacity-80 transition-opacity"
        aria-label="User profile menu"
      >
        <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-800">
          <AvatarImage src="" alt="Avatar" />
          <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs uppercase">
            {role.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-52 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 shadow-xl py-1.5 z-50 overflow-hidden"
          >
            <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-900">
              <p className="text-xs font-semibold text-gray-900 dark:text-white capitalize">
                {role} Account
              </p>
              <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">
                {role}@quizdorm.com
              </p>
            </div>

            <Link
              href="/dashboard/profile"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <User className="h-4 w-4 text-indigo-500" />
              <span>Profile</span>
            </Link>

            <Link
              href="/dashboard/settings"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <Settings className="h-4 w-4 text-indigo-500" />
              <span>Settings</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors"
            >
              <HelpCircle className="h-4 w-4 text-indigo-500" />
              <span>Support & Help</span>
            </Link>

            <div className="border-t border-gray-100 dark:border-gray-900 my-1" />

            <Link
              href="/auth/login"
              onClick={() => setOpen(false)}
              className="flex items-center space-x-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors font-medium"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
