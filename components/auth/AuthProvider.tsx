"use client";

import { createClient,isSupabaseConfigured } from "@/lib/supabase/client";
import { UserProfile,UserRole,normalizeCanonicalRole } from "@/lib/types/user";
import { Session,User } from "@supabase/supabase-js";
import { createContext,useContext,useEffect,useState } from "react";

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  role: UserRole;
  isLoading: boolean;
  logout: () => Promise<void>;
  updateProfileState: (updated: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  session: null,
  role: "subscriber",
  isLoading: true,
  logout: async () => {},
  updateProfileState: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [role, setRole] = useState<UserRole>("subscriber");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    try {
      async function getInitialSession() {
        try {
          if (isSupabaseConfigured()) {
            const supabase = createClient();

            // Client-side resilience: check and exchange PKCE code if present in browser URL
            if (typeof window !== "undefined") {
              const url = new URL(window.location.href);
              const code = url.searchParams.get("code");
              if (code) {
                try {
                  const { data: exchangeData, error: exchangeError } =
                    await supabase.auth.exchangeCodeForSession(code);
                  if (!exchangeError && exchangeData?.session) {
                    url.searchParams.delete("code");
                    window.history.replaceState({}, document.title, url.pathname + (url.search ? url.search : ""));
                  }
                } catch {
                  // Fall through to getSession
                }
              }
            }

            const {
              data: { session: activeSession },
            } = await supabase.auth.getSession();

            if (activeSession?.user) {
              // Real Supabase session takes absolute precedence
              setSession(activeSession);
              setUser(activeSession.user);
              const metadata = activeSession.user.user_metadata || {};
              const rawRole = (metadata.role as string) || "subscriber";
              const userRole: UserRole = normalizeCanonicalRole(rawRole);

              const userName = metadata.name || metadata.full_name || activeSession.user.email?.split("@")[0] || "User";
              setRole(userRole);
              setProfile({
                id: activeSession.user.id,
                name: userName,
                email: activeSession.user.email || "",
                role: userRole,
                avatar: metadata.avatar_url || metadata.picture || "",
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
                  const target = `/auth/verify-email?verified=true&role=${userRole}&email=${encodeURIComponent(activeSession.user.email || "")}`;
                  window.location.replace(target);
                  return;
                }

                // If arriving authenticated on /auth/callback or an auth page, redirect to dashboard
                if (window.location.pathname === "/auth/callback" || window.location.pathname.startsWith("/auth/login") || window.location.pathname.startsWith("/auth/register")) {
                  let target = "/student";
                  if (userRole === "superadmin" || userRole === "admin") target = "/admin";
                  else if (userRole === "masteradmin") target = "/admin/master";
                  else if (userRole === "institution") target = "/school";
                  else if (userRole === "handler") target = "/teacher";
                  else target = "/student";
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
            const hasDemoCookie =
              document.cookie.includes("quizdorm_client_logged_in=1") ||
              document.cookie.includes("quizdorm_demo_session=");
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
            const rawRole = (metadata.role as string) || "subscriber";
            const userRole: UserRole = normalizeCanonicalRole(rawRole);
            const userName = metadata.name || metadata.full_name || currentSession.user.email?.split("@")[0] || "User";
            setRole(userRole);
            setProfile({
              id: currentSession.user.id,
              name: userName,
              email: currentSession.user.email || "",
              role: userRole,
              avatar: metadata.avatar_url || metadata.picture || "",
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
                const target = `/auth/verify-email?verified=true&role=${userRole}&email=${encodeURIComponent(currentSession.user.email || "")}`;
                window.location.replace(target);
              }
            }
          }
          setIsLoading(false);
        });

        subscription = data.subscription;
      }
    } catch {
      queueMicrotask(() => setIsLoading(false));
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
