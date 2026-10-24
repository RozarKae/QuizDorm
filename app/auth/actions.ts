"use server";

import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { cookies, headers } from "next/headers";
import { z } from "zod";
import { signSessionPayload, verifySessionPayload } from "@/lib/security/cookieSigner";

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
    role: z
      .enum([
        "subscriber",
        "member",
        "handler",
        "institution",
        "student",
        "teacher",
        "school",
      ])
      .default("subscriber"),
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
    if (testAccount.password !== password) {
      return {
        error: `Invalid password for ${testAccount.email}. Please enter the correct password.`,
      };
    }

    try {
      const cookieStore = await cookies();

      // Clear any existing Supabase session cookies so they don't conflict with demo session
      const allCookies = cookieStore.getAll();
      for (const c of allCookies) {
        if (c.name.startsWith("sb-")) {
          cookieStore.delete(c.name);
          cookieStore.set(c.name, "", { path: "/", maxAge: 0, expires: new Date(0) });
        }
      }

      const sessionPayload = {
        id: testAccount.id,
        email: testAccount.email,
        user_metadata: {
          name: testAccount.name,
          role: testAccount.role,
        },
      };

      const signedToken = await signSessionPayload(sessionPayload);

      cookieStore.set("quizdorm_demo_session", signedToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set("quizdorm_client_logged_in", "1", {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

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
        "Unable to connect to authentication services. Please verify your credentials or contact system administration.",
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
    cookieStore.delete("quizdorm_client_logged_in");
    cookieStore.set("quizdorm_client_logged_in", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    const userMetadata = data.user?.user_metadata || {};
    let role = (userMetadata.role as string) || "subscriber";
    if (role === "student") role = "member";
    else if (role === "teacher") role = "handler";
    else if (role === "school") role = "institution";

    const userName = userMetadata.name || data.user?.email?.split("@")[0] || "User";
    let redirectUrl = "/student";
    if (role === "superadmin" || role === "admin") redirectUrl = "/admin";
    else if (role === "masteradmin") redirectUrl = "/admin/master";
    else if (role === "institution" || role === "school") redirectUrl = "/school";
    else if (role === "handler" || role === "teacher") redirectUrl = "/teacher";
    else if (role === "member" || role === "student" || role === "subscriber") redirectUrl = "/student";

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
  const rawRole = (formData.get("role") as string) || "subscriber";
  let role = rawRole;
  if (role === "student") role = "member";
  else if (role === "teacher") role = "handler";
  else if (role === "school") role = "institution";

  const result = signupSchema.safeParse({ name, email, password, confirmPassword, role });
  if (!result.success) {
    return { error: result.error.issues[0].message };
  }

  const username = email.split("@")[0] + Math.floor(Math.random() * 1000);
  
  if (!isSupabaseConfigured()) {
    try {
      const cookieStore = await cookies();
      const sessionPayload = {
        id: `usr-${Date.now()}`,
        email,
        user_metadata: {
          name,
          role,
          username,
        },
      };

      const signedToken = await signSessionPayload(sessionPayload);

      cookieStore.set("quizdorm_demo_session", signedToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      cookieStore.set("quizdorm_client_logged_in", "1", {
        path: "/",
        httpOnly: false,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });
      let redirectUrl = "/student";
      if (role === "superadmin" || role === "admin") redirectUrl = "/admin";
      else if (role === "masteradmin") redirectUrl = "/admin/master";
      else if (role === "institution" || role === "school") redirectUrl = "/school";
      else if (role === "handler" || role === "teacher") redirectUrl = "/teacher";
      else if (role === "member" || role === "student" || role === "subscriber") redirectUrl = "/student";
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
    cookieStore.delete("quizdorm_client_logged_in");
    cookieStore.set("quizdorm_client_logged_in", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });

    // Check if session was granted directly (email confirmation off)
    if (data?.session && data.user) {
      let redirectUrl = "/student";
      if (role === "superadmin" || role === "admin") redirectUrl = "/admin";
      else if (role === "masteradmin") redirectUrl = "/admin/master";
      else if (role === "institution" || role === "school") redirectUrl = "/school";
      else if (role === "handler" || role === "teacher") redirectUrl = "/teacher";
      else if (role === "member" || role === "student" || role === "subscriber") redirectUrl = "/student";
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
      let redirectUrl = "/student";
      if (role === "superadmin" || role === "admin") redirectUrl = "/admin";
      else if (role === "masteradmin") redirectUrl = "/admin/master";
      else if (role === "institution" || role === "school") redirectUrl = "/school";
      else if (role === "handler" || role === "teacher") redirectUrl = "/teacher";
      else if (role === "member" || role === "student" || role === "subscriber") redirectUrl = "/student";
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
    cookieStore.delete("quizdorm_client_logged_in");
    cookieStore.set("quizdorm_client_logged_in", "", {
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

/**
 * Server action to securely update active demo session role with HMAC signature
 */
export async function updateDemoRoleAction(newRole: string) {
  try {
    const cookieStore = await cookies();
    const existingCookie = cookieStore.get("quizdorm_demo_session")?.value;
    if (!existingCookie) return { error: "No active session found" };

    const current = await verifySessionPayload<any>(existingCookie);
    if (!current) return { error: "Invalid or tampered session" };

    current.user_metadata = current.user_metadata || {};
    current.user_metadata.role = newRole;

    const signedToken = await signSessionPayload(current);
    cookieStore.set("quizdorm_demo_session", signedToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7,
    });
    return { success: true };
  } catch (err: any) {
    return { error: err.message || "Failed to update session role" };
  }
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
    if (targetOrigin && targetOrigin.includes("rozarkaes-projects.vercel.app")) {
      targetOrigin = "https://quizclassroom.vercel.app";
    }

    if (!targetOrigin) {
      try {
        const headerList = await headers();
        const host = headerList.get("x-forwarded-host") || headerList.get("host");
        const proto = headerList.get("x-forwarded-proto") || (host?.includes("localhost") ? "http" : "https");
        if (host) {
          if (host.includes("rozarkaes-projects.vercel.app")) {
            targetOrigin = "https://quizclassroom.vercel.app";
          } else {
            targetOrigin = `${proto}://${host}`;
          }
        }
      } catch {
        // Fallback
      }
    }

    if (!targetOrigin || targetOrigin.includes("rozarkaes-projects.vercel.app")) {
      targetOrigin = "https://quizclassroom.vercel.app";
    }

    const callbackUrl = `${targetOrigin.replace(/\/+$/, "")}/auth/callback`;

    if (!isSupabaseConfigured()) {
      return {
        error: "Supabase project credentials are not configured yet.",
      };
    }

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: callbackUrl,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      return { error: error.message };
    }

    if (!data?.url) {
      return { error: "No authorization URL returned by authentication provider." };
    }

    return { url: data.url };
  } catch (err: any) {
    return { error: err.message || "Failed to initiate Google authentication" };
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

