"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { UserProfile, UserRole } from "@/lib/types/user";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  role: UserRole;
  isLoading: boolean;
  logout: () => Promise<void>;
  updateProfileState: (updated: Partial<UserProfile>) => void;
}

const defaultProfile: UserProfile = {
  id: "usr-rk-akbar-01",
  name: "RK Akbar",
  email: "rkakbar@quizdorm.edu",
  role: "student",
  avatar: "",
  createdAt: "Jul 16, 2026",
  updatedAt: "Oct 21, 2026",
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  role: "student",
  isLoading: true,
  logout: async () => {},
  updateProfileState: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    try {
      async function getInitialSession() {
        try {
          if (isSupabaseConfigured()) {
            const supabase = createClient();
            const {
              data: { session: activeSession },
            } = await supabase.auth.getSession();

            if (activeSession?.user) {
              // Real Supabase session takes absolute precedence
              setSession(activeSession);
              setUser(activeSession.user);
              const metadata = activeSession.user.user_metadata || {};
              const userRole = (metadata.role as UserRole) || "student";
              const userName = metadata.name || activeSession.user.email?.split("@")[0] || "User";
              setRole(userRole);
              setProfile({
                id: activeSession.user.id,
                name: userName,
                email: activeSession.user.email || "",
                role: userRole,
                createdAt: activeSession.user.created_at || "Oct 2026",
                updatedAt: new Date().toISOString(),
              });
              if (typeof window !== "undefined") {
                localStorage.removeItem("quizdorm_demo_user");

                // Auto-route to workspace when arriving from email confirmation link
                const hasConfirmationTokens =
                  window.location.hash.includes("access_token") ||
                  window.location.hash.includes("type=signup") ||
                  window.location.hash.includes("type=email") ||
                  window.location.search.includes("code=") ||
                  window.location.search.includes("token_hash=");

                if (hasConfirmationTokens && (window.location.pathname === "/" || window.location.pathname === "/auth/callback")) {
                  const target = userRole === "admin" ? "/admin" : `/${userRole}`;
                  window.location.replace(target);
                  return;
                }
              }
              setIsLoading(false);
              return;
            }
          }

          // Fallback to demo test account only if active demo session cookie is present
          if (typeof window !== "undefined") {
            const hasDemoCookie = document.cookie.includes("quizdorm_demo_session=");
            const demoRaw = localStorage.getItem("quizdorm_demo_user");
            if (hasDemoCookie && demoRaw) {
              const demoUser = JSON.parse(demoRaw);
              setRole(demoUser.role);
              setProfile({
                id: demoUser.id,
                name: demoUser.name,
                email: demoUser.email,
                role: demoUser.role,
                createdAt: "Oct 2026",
                updatedAt: new Date().toISOString(),
              });
              setIsLoading(false);
              return;
            } else {
              localStorage.removeItem("quizdorm_demo_user");
            }
          }

          // Unauthenticated state
          setUser(null);
          setSession(null);
        } catch {
          // Fallback to default state
        } finally {
          setIsLoading(false);
        }
      }

      getInitialSession();

      if (isSupabaseConfigured()) {
        const supabase = createClient();
        const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
          setSession(currentSession);
          setUser(currentSession?.user ?? null);
          if (currentSession?.user) {
            const metadata = currentSession.user.user_metadata || {};
            const userRole = (metadata.role as UserRole) || "student";
            const userName = metadata.name || currentSession.user.email?.split("@")[0] || "User";
            setRole(userRole);
            setProfile({
              id: currentSession.user.id,
              name: userName,
              email: currentSession.user.email || "",
              role: userRole,
              createdAt: currentSession.user.created_at || "Oct 2026",
              updatedAt: new Date().toISOString(),
            });
            if (typeof window !== "undefined") {
              localStorage.removeItem("quizdorm_demo_user");

              // Auto-forward to workspace when user signs in via confirmation link
              const hasConfirmationTokens =
                window.location.hash.includes("access_token") ||
                window.location.hash.includes("type=signup") ||
                window.location.hash.includes("type=email") ||
                window.location.search.includes("code=") ||
                window.location.search.includes("token_hash=");

              if (hasConfirmationTokens && (window.location.pathname === "/" || window.location.pathname === "/auth/callback")) {
                const target = userRole === "admin" ? "/admin" : `/${userRole}`;
                window.location.replace(target);
              }
            }
          }
          setIsLoading(false);
        });

        subscription = data.subscription;
      }
    } catch {
      setIsLoading(false);
    }

    return () => {
      if (subscription) subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("quizdorm_demo_user");
        localStorage.removeItem("quizdorm_active_role");
        document.cookie = "quizdorm_demo_session=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;";
        const cookies = document.cookie.split(";");
        for (const c of cookies) {
          const cookieName = c.split("=")[0].trim();
          if (cookieName.startsWith("sb-") || cookieName.includes("quizdorm")) {
            document.cookie = `${cookieName}=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:00 GMT;`;
          }
        }
      }
      if (isSupabaseConfigured()) {
        const supabase = createClient();
        await supabase.auth.signOut();
      }
    } catch {
      // Ignore
    }
    setUser(null);
    setProfile(null);
    setSession(null);
    setRole("student");
  };

  const updateProfileState = (updated: Partial<UserProfile>) => {
    setProfile((prev) => (prev ? { ...prev, ...updated } : null));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        session,
        role,
        isLoading,
        logout,
        updateProfileState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
