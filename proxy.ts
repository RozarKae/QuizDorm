import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { verifySessionPayload } from "@/lib/security/cookieSigner";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let user = null;

  // 1. Check for active demo test session first (strictly verified via HMAC-SHA256 signature)
  const demoCookie = request.cookies.get("quizdorm_demo_session")?.value;
  if (demoCookie) {
    try {
      const verified = await verifySessionPayload<any>(demoCookie);
      if (verified && verified.id && verified.user_metadata?.role) {
        user = verified;
      } else {
        // Tampered, forged, or invalid signature - obliterate cookie
        supabaseResponse.cookies.delete("quizdorm_demo_session");
        supabaseResponse.cookies.set("quizdorm_demo_session", "", {
          path: "/",
          maxAge: 0,
          expires: new Date(0),
        });
      }
    } catch {
      // Ignore
    }
  }

  // 2. Only if no active demo session exists, check for live Supabase user
  if (!user && supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-supabase-project")) {
    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
            supabaseResponse = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              supabaseResponse.cookies.set(name, value, options)
            );
          },
        },
      });

      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        user = data.user;
      }
    } catch {
      // Fallback
    }
  }

  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || request.nextUrl.host;

  // Canonicalize internal preview domain (which triggers Vercel SSO Protection) to official public domain
  if (host && host.includes("rozarkaes-projects.vercel.app")) {
    const canonicalUrl = new URL(request.nextUrl.pathname + request.nextUrl.search, "https://quizclassroom.vercel.app");
    return NextResponse.redirect(canonicalUrl, 308);
  }

  const pathname = request.nextUrl.pathname;
  const code = request.nextUrl.searchParams.get("code");

  // Intercept OAuth/PKCE return codes that hit root (/) or other non-callback paths
  // and immediately forward to /auth/callback with all parameters preserved
  if (code && pathname !== "/auth/callback") {
    const isLocal = host?.includes("localhost");
    const callbackBase = isLocal ? request.url : "https://quizclassroom.vercel.app";
    const callbackUrl = new URL("/auth/callback", callbackBase);
    request.nextUrl.searchParams.forEach((val, key) => {
      callbackUrl.searchParams.set(key, val);
    });
    return NextResponse.redirect(callbackUrl, 307);
  }

  // Immediate sanitize redirect: live arena contenders join through public /live/join, never inside /student/* hierarchy
  if (pathname === "/student/live/join" || pathname.startsWith("/student/live")) {
    const liveJoinUrl = new URL("/live/join", request.url);
    if (request.nextUrl.search) {
      liveJoinUrl.search = request.nextUrl.search;
    }
    return NextResponse.redirect(liveJoinUrl, 307);
  }

  // Public live arena routes (allow QR, direct link, and PIN join without forced login)
  const isPublicLiveRoute =
    pathname === "/join" ||
    pathname.startsWith("/join/") ||
    pathname.startsWith("/live") ||
    pathname.startsWith("/api/live");

  // Paths requiring authentication
  const protectedRoutes = ["/admin", "/school", "/teacher", "/student", "/dashboard"];
  const isProtectedRoute =
    !isPublicLiveRoute &&
    protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // Public Auth paths
  const isAuthRoute = pathname.startsWith("/auth");

  // Check if user is explicitly logging out or requesting logout
  const isExplicitLogout = request.nextUrl.searchParams.get("logout") === "true";
  if (isExplicitLogout) {
    supabaseResponse.cookies.delete("quizdorm_demo_session");
    supabaseResponse.cookies.set("quizdorm_demo_session", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    supabaseResponse.cookies.delete("quizdorm_client_logged_in");
    supabaseResponse.cookies.set("quizdorm_client_logged_in", "", {
      path: "/",
      maxAge: 0,
      expires: new Date(0),
    });
    // Obliterate any Supabase auth cookies on logout
    request.cookies.getAll().forEach((c) => {
      if (c.name.startsWith("sb-") || c.name.includes("quizdorm")) {
        supabaseResponse.cookies.delete(c.name);
        supabaseResponse.cookies.set(c.name, "", {
          path: "/",
          maxAge: 0,
          expires: new Date(0),
        });
      }
    });
    user = null;
  }

  if (user) {
    const rawRole = user.user_metadata?.role || "subscriber";
    let role = rawRole;
    if (role === "student") role = "member";
    else if (role === "teacher") role = "handler";
    else if (role === "school") role = "institution";

    const getRoleDefaultPath = (r: string) => {
      if (r === "admin") return "/admin";
      if (["institution", "school"].includes(r)) return "/school";
      if (["handler", "teacher"].includes(r)) return "/teacher";
      return "/student";
    };

    if (isAuthRoute && !pathname.startsWith("/auth/verify-email") && !pathname.startsWith("/auth/reset-password")) {
      // Authenticated user accessing auth page -> redirect to role-specific workspace
      return NextResponse.redirect(new URL(getRoleDefaultPath(role), request.url));
    }

    // Direct /dashboard navigation -> redirect authenticated users to their canonical role workspace
    if (pathname === "/dashboard") {
      return NextResponse.redirect(new URL(getRoleDefaultPath(role), request.url));
    }

    // Role-Based Access Control (RBAC) enforcement
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(getRoleDefaultPath(role), request.url));
    }

    if (pathname.startsWith("/school") && !["institution", "school", "admin"].includes(role)) {
      return NextResponse.redirect(new URL(getRoleDefaultPath(role), request.url));
    }

    if (pathname.startsWith("/teacher") && !["handler", "teacher", "institution", "school", "admin"].includes(role)) {
      return NextResponse.redirect(new URL(getRoleDefaultPath(role), request.url));
    }

    // Ground Rule: Students, Members & Subscribers cannot host arena or access tournament organizer
    if (
      (pathname.startsWith("/dashboard/competitions/new") ||
        pathname.startsWith("/dashboard/competitions/organizer")) &&
      ["student", "member", "subscriber"].includes(role)
    ) {
      return NextResponse.redirect(new URL("/dashboard/competitions", request.url));
    }

    if (
      pathname.startsWith("/student") &&
      !["subscriber", "member", "student", "handler", "teacher", "institution", "school", "admin"].includes(role)
    ) {
      return NextResponse.redirect(new URL(getRoleDefaultPath(role), request.url));
    }
  } else {
    // Unauthenticated user trying to access protected route
    if (isProtectedRoute) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
