"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, Session } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";
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
  id: "usr-mock-101",
  name: "Rozar Khan",
  email: "kratoskhanrk@gmail.com",
  role: "student",
  avatar: "",
  createdAt: "Jul 16, 2026",
  updatedAt: "Jul 23, 2026",
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: defaultProfile,
  session: null,
  role: "student",
  isLoading: true,
  logout: async () => {},
  updateProfileState: () => {},
});

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [role, setRole] = useState<UserRole>("student");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let subscription: { unsubscribe: () => void } | undefined;

    try {
      const supabase = createClient();

      async function getInitialSession() {
        try {
          if (typeof window !== "undefined") {
            const demoRaw = localStorage.getItem("quizdorm_demo_user");
            if (demoRaw) {
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
            }
          }

          const {
            data: { session: activeSession },
          } = await supabase.auth.getSession();
          setSession(activeSession);
          setUser(activeSession?.user ?? null);
          if (activeSession?.user) {
            const userRole = (activeSession.user.user_metadata?.role as UserRole) || "student";
            setRole(userRole);
            setProfile({
              id: activeSession.user.id,
              name: activeSession.user.user_metadata?.name || activeSession.user.email?.split("@")[0] || "User",
              email: activeSession.user.email || "",
              role: userRole,
              createdAt: activeSession.user.created_at || "Jul 2026",
              updatedAt: new Date().toISOString(),
            });
          }
        } catch {
          // Fallback to default state
        } finally {
          setIsLoading(false);
        }
      }

      getInitialSession();

      const { data } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        if (currentSession?.user) {
          const userRole = (currentSession.user.user_metadata?.role as UserRole) || "student";
          setRole(userRole);
          setProfile({
            id: currentSession.user.id,
            name: currentSession.user.user_metadata?.name || currentSession.user.email?.split("@")[0] || "User",
            email: currentSession.user.email || "",
            role: userRole,
            createdAt: currentSession.user.created_at || "Jul 2026",
            updatedAt: new Date().toISOString(),
          });
        }
        setIsLoading(false);
      });

      subscription = data.subscription;
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
        document.cookie = "quizdorm_demo_session=; path=/; max-age=0;";
      }
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setUser(null);
    setSession(null);
    setRole("student");
  };

  const updateProfileState = (updated: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updated }));
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
