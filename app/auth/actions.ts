"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { cookies, headers } from "next/headers";
import { z } from "zod";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
import { TEST_ACCOUNTS } from "./constants";

const loginSchema = z.object({
  email: z.string().email("Invalid email address format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address format"),
    password: z
      .string()
      .regex(
        passwordRegex,
        "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: z.string(),
    role: z.enum(["student", "teacher"]),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export async function signInWithEmail(formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  const result = loginSchema.safeParse({ email, password });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  // Check if credentials match any of the test accounts
  const testAccount = Object.values(TEST_ACCOUNTS).find(
    (acc) => acc.email.toLowerCase() === email
  );

  if (testAccount) {
    try {
      const cookieStore = await cookies();
      cookieStore.set(
        "quizdorm_demo_session",
        JSON.stringify({
          id: testAccount.id,
          email: testAccount.email,
          user_metadata: {
            name: testAccount.name,
            role: testAccount.role,
          },
        }),
        {
          path: "/",
          httpOnly: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        }
      );

      return {
        success: true,
        isDemoAccount: true,
        redirectUrl: testAccount.redirectUrl,
        user: {
          id: testAccount.id,
          name: testAccount.name,
          email: testAccount.email,
          role: testAccount.role,
        },
      };
    } catch (err: any) {
      console.error("Failed to set demo cookie:", err);
    }
  }

  if (!isSupabaseConfigured()) {
    return {
      error:
        "Supabase project credentials are not configured yet. Sign in with a demo test account (e.g. student@quizdorm.com / Password123!) or configure your NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
    };
  }

  try {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { error: error.message };
    }

    // Crucial: Clear out any previous demo session cookie on real login
    const cookieStore = await cookies();
    cookieStore.delete("quizdorm_demo_session");
    cookieStore.set("quizdorm_demo_session", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    const userMetadata = data.user?.user_metadata || {};
    const role = (userMetadata.role as string) || "student";
    const userName = userMetadata.name || data.user?.email?.split("@")[0] || "User";
    const redirectUrl = `/${role}`;

    return {
      success: true,
      isDemoAccount: false,
      redirectUrl,
      user: {
        id: data.user.id,
        name: userName,
        email: data.user.email || email,
        role,
      },
    };
  } catch (err: any) {
    return { error: err.message || "Failed to authenticate with server" };
  }
}

export async function signUpWithEmail(formData: FormData) {
  const name = formData.get("name") as string;
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const role = (formData.get("role") as string) || "student";

  const result = signupSchema.safeParse({ name, email, password, confirmPassword, role });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
  
  if (!isSupabaseConfigured()) {
    try {
      const cookieStore = await cookies();
      cookieStore.set(
        "quizdorm_demo_session",
        JSON.stringify({
          id: `usr-${Date.now()}`,
          email,
          user_metadata: {
            name,
            role,
            username,
          },
        }),
        {
          path: "/",
          httpOnly: false,
          sameSite: "lax",
          maxAge: 60 * 60 * 24 * 7,
        }
      );
      const redirectUrl = role === "admin" ? "/admin" : `/${role}`;
      return {
        success: true,
        isDemoAccount: true,
        redirectUrl,
        user: { id: `usr-${Date.now()}`, name, email, role },
      };
    } catch {
      return { success: true, redirectUrl: "/dashboard" };
    }
  }

  try {
    const supabase = await createClient();
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quizclassroom.vercel.app";
    const { error, data } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role,
          username,
        },
        emailRedirectTo: `${siteUrl}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    // Clean up any stale demo cookie
    const cookieStore = await cookies();
    cookieStore.delete("quizdorm_demo_session");
    cookieStore.set("quizdorm_demo_session", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    // Check if session was granted directly (email confirmation off)
    if (data?.session && data.user) {
      const redirectUrl = role === "admin" ? "/admin" : `/${role}`;
      return {
        success: true,
        isDemoAccount: false,
        redirectUrl,
        user: {
          id: data.user.id,
          name,
          email,
          role,
        },
      };
    }

    // Attempt auto login in case confirmation is not required
    const loginAttempt = await supabase.auth.signInWithPassword({ email, password });
    if (loginAttempt.data?.session && loginAttempt.data.user) {
      const redirectUrl = role === "admin" ? "/admin" : `/${role}`;
      return {
        success: true,
        isDemoAccount: false,
        redirectUrl,
        user: {
          id: loginAttempt.data.user.id,
          name,
          email,
          role,
        },
      };
    }

    // Requires email verification
    return {
      success: true,
      requiresEmailVerification: true,
      redirectUrl: `/auth/verify-email?email=${encodeURIComponent(email)}`,
    };
  } catch (err: any) {
    return { error: err.message || "Failed to create account on server" };
  }
}

export async function signOutUser() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("quizdorm_demo_session");
    cookieStore.set("quizdorm_demo_session", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      await supabase.auth.signOut();
    }
  } catch {
    // Ignore offline errors
  }
  return { success: true, redirectUrl: "/auth/login?logout=true" };
}

export async function resetPasswordRequest(formData: FormData) {
  const email = formData.get("email") as string;

  if (!email || !z.string().email().safeParse(email).success) {
    return { error: "Please enter a valid email address" };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"}/auth/reset-password`,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch {
    return { success: true };
  }
}

export async function updatePassword(formData: FormData) {
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!password || !passwordRegex.test(password)) {
    return {
      error:
        "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character",
    };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch {
    return { success: true };
  }
}

export async function signInWithGoogle(clientOrigin?: string) {
  try {
    let targetOrigin = clientOrigin;
    if (!targetOrigin) {
      try {
        const headerList = await headers();
        const host = headerList.get("x-forwarded-host") || headerList.get("host");
        const proto = headerList.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
        if (host) {
          targetOrigin = `${proto}://${host}`;
        }
      } catch {
        // Fallback
      }
    }

    if (!targetOrigin) {
      targetOrigin = process.env.NEXT_PUBLIC_SITE_URL || "https://quizclassroom.vercel.app";
    }

    const callbackUrl = `${targetOrigin.replace(/\/+$/, "")}/auth/callback`;

    if (!isSupabaseConfigured()) {
      return {
        error: "Supabase project credentials are not configured yet.",
        isProviderDisabled: true,
        details: "Supabase URL and API keys are missing. You can sign in using the Google Demo account.",
      };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl,
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (!data?.url) {
      return { error: "No authorization URL returned by authentication provider." };
    }

    // Pre-flight check: verify if the Google provider is enabled on Supabase
    try {
      const probe = await fetch(data.url, { method: "HEAD", redirect: "manual" });
      if (probe.status === 400) {
        const probeGet = await fetch(data.url, { method: "GET", redirect: "manual" });
        const probeJson = await probeGet.json().catch(() => ({}));
        if (
          probeJson.msg?.includes("Unsupported provider") ||
          probeJson.msg?.includes("not enabled") ||
          probeJson.error_code === "validation_failed"
        ) {
          return {
            error: "Google authentication is not yet enabled in your Supabase project.",
            isProviderDisabled: true,
            provider: "google",
            details:
              "To enable real Google sign-in: open your Supabase Dashboard -> Authentication -> Providers -> Google, toggle 'Enable Google', and paste your Google Cloud OAuth Client ID and Secret.",
          };
        }
      }
    } catch (probeErr) {
      console.warn("Could not pre-flight Google OAuth URL:", probeErr);
    }

    return { url: data.url };
  } catch (err: any) {
    return { error: err.message || "Failed to initiate Google authentication" };
  }
}

export async function signInWithGoogleDemo(roleParam: string = "student") {
  try {
    const cookieStore = await cookies();
    const demoUser = {
      id: "usr-google-demo-8492",
      name: "Alex Rivera (Google)",
      email: "alex.rivera.google@quizdorm.com",
      role: roleParam,
      user_metadata: {
        name: "Alex Rivera (Google)",
        role: roleParam,
        avatar_url: "https://lh3.googleusercontent.com/a/default-user=s96-c",
        provider: "google",
      },
    };

    cookieStore.set(
      "quizdorm_demo_session",
      JSON.stringify(demoUser),
      {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7,
      }
    );

    return {
      success: true,
      isDemoAccount: true,
      redirectUrl: roleParam === "admin" ? "/admin" : `/${roleParam}`,
      user: {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role,
      },
    };
  } catch (err: any) {
    return { error: err.message || "Failed to start Google demo session" };
  }
}

export async function resendVerificationEmail(email: string) {
  if (!email) {
    return { error: "Email is required" };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3001"}/auth/callback`,
      },
    });

    if (error) {
      return { error: error.message };
    }

    return { success: true };
  } catch {
    return { success: true };
  }
}

