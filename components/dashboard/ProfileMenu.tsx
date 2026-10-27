"use client";

import { signOutUser } from "@/app/auth/actions";
import { useAuth } from "@/components/auth/AuthProvider";
import { Avatar,AvatarFallback,AvatarImage } from "@/components/ui/avatar";
import { AnimatePresence,motion } from "framer-motion";
import { HelpCircle,Laptop,LogOut,Moon,Settings,Sun,User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect,useRef,useState } from "react";

interface ProfileMenuProps {
  role: string;
}

export default function ProfileMenu({ role }: ProfileMenuProps) {
  const [open, setOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, profile, logout } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    setOpen(false);
    try {
      // 1. Client-side Auth context & Supabase state cleanup
      await logout();
      // 2. Server-side session cookie eradication
      await signOutUser();
    } catch (err) {
      console.error("Sign out error:", err);
    } finally {
      if (typeof window !== "undefined") {
        localStorage.removeItem("quizdorm_demo_user");
        document.cookie =
          "quizdorm_demo_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        window.location.href = "/auth/login?logout=true";
      }
    }
  };

  const displayName = profile?.name || user?.user_metadata?.name || `${role} Account`;
  const displayEmail = profile?.email || user?.email || `${role}@quizdorm.com`;
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase() || role.substring(0, 2).toUpperCase();

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-hidden focus:ring-1 focus:ring-[#FF4D6D] rounded-[4px] p-0.5 transition-opacity"
        aria-label="User profile menu"
      >
        <Avatar className="h-7 w-7 rounded-[4px] border border-[rgba(240, 160, 180,0.22)] bg-[#2A141A]">
          <AvatarImage src={profile?.avatar || ""} alt="Avatar" />
          <AvatarFallback className="bg-[#2A141A] text-[#FF4D6D] font-mono font-bold text-[10px] uppercase rounded-[4px]">
            {initials}
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
            className="absolute right-0 mt-2 w-56 rounded-[6px] border border-[rgba(240, 160, 180,0.22)] bg-[#1D1013] shadow-[0_16px_36px_rgba(0,0,0,0.8)] py-1 z-50 overflow-hidden"
          >
            <div className="px-3.5 py-2.5 border-b border-[rgba(240, 160, 180,0.12)] bg-[#140C0E]/60">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#F2F7F3] truncate max-w-[140px] font-display">
                  {displayName}
                </p>
                <span className="text-[9px] uppercase font-mono tracking-wider px-1.5 py-0.2 rounded-[2px] bg-[rgba(255, 77, 109,0.12)] text-[#FF4D6D] border border-[rgba(255, 77, 109,0.25)] font-semibold">
                  {role === "admin" || role === "superadmin" ? "SUPERADMIN" : role === "masteradmin" ? "MASTERADMIN" : role}
                </span>
              </div>
              <p className="text-[11px] font-mono text-[#69786F] truncate mt-0.5" title={displayEmail}>
                {displayEmail}
              </p>
            </div>

            <div className="py-1">
              <Link
                href={["member", "student", "subscriber"].includes(role) ? "/student/profile" : "/dashboard/profile"}
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#2A141A] transition-colors font-medium"
              >
                <User className="h-3.5 w-3.5 text-[#FF4D6D]" />
                <span>Profile</span>
              </Link>

              <Link
                href={
                  role === "admin" || role === "superadmin"
                    ? "/admin/settings"
                    : role === "masteradmin"
                    ? "/admin/master"
                    : ["institution", "school"].includes(role)
                    ? "/school/settings"
                    : ["handler", "teacher"].includes(role)
                    ? "/teacher/settings"
                    : "/student/settings"
                }
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#2A141A] transition-colors font-medium"
              >
                <Settings className="h-3.5 w-3.5 text-[#FF758F]" />
                <span>Settings</span>
              </Link>

              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#A0AEA5] hover:text-[#F2F7F3] hover:bg-[#2A141A] transition-colors font-medium"
              >
                <HelpCircle className="h-3.5 w-3.5 text-[#A0AEA5]" />
                <span>Documentation & Support</span>
              </Link>
            </div>

            <div className="border-t border-[rgba(240, 160, 180,0.12)] my-1" />

            {/* Theme Preference Switcher */}
            <div className="px-3.5 py-1.5 flex items-center justify-between text-xs text-[#A0AEA5]">
              <div className="flex items-center space-x-2">
                {theme === "system" ? (
                  <Laptop className="h-3.5 w-3.5 text-[#FF758F]" />
                ) : resolvedTheme === "dark" ? (
                  <Moon className="h-3.5 w-3.5 text-[#FF4D6D]" />
                ) : (
                  <Sun className="h-3.5 w-3.5 text-[#F59E0B]" />
                )}
                <span>Theme</span>
              </div>
              <div className="flex items-center space-x-1 font-mono text-[10px] bg-[#140C0E] p-0.5 rounded border border-[rgba(240, 160, 180,0.12)]">
                <button
                  type="button"
                  onClick={() => setTheme("light")}
                  className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                    theme === "light"
                      ? "bg-[#FF4D6D] text-[#0B0708] font-bold"
                      : "text-[#69786F] hover:text-[#F2F7F3]"
                  }`}
                  title="Light mode"
                >
                  Light
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("dark")}
                  className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                    theme === "dark"
                      ? "bg-[#FF4D6D] text-[#0B0708] font-bold"
                      : "text-[#69786F] hover:text-[#F2F7F3]"
                  }`}
                  title="Dark mode"
                >
                  Dark
                </button>
                <button
                  type="button"
                  onClick={() => setTheme("system")}
                  className={`px-1.5 py-0.5 rounded-[2px] transition-colors cursor-pointer ${
                    theme === "system"
                      ? "bg-[#FF4D6D] text-[#0B0708] font-bold"
                      : "text-[#69786F] hover:text-[#F2F7F3]"
                  }`}
                  title="System preference"
                >
                  Auto
                </button>
              </div>
            </div>

            <div className="border-t border-[rgba(240, 160, 180,0.12)] my-1" />

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="w-full flex items-center space-x-2.5 px-3.5 py-1.5 text-xs text-[#F87171] hover:bg-[rgba(248,113,113,0.12)] transition-colors font-medium text-left cursor-pointer disabled:opacity-50"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span>{isSigningOut ? "Signing Out..." : "Sign Out"}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}