import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let user = null;

  // Support demo test accounts (Teacher, School, Student)
  const demoCookie = request.cookies.get("quizdorm_demo_session")?.value;
  if (demoCookie) {
    try {
      user = JSON.parse(demoCookie);
    } catch {
      // Ignore
    }
  }

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
      user = data?.user ?? null;
    } catch {
      // Fallback
    }
  }

  const pathname = request.nextUrl.pathname;

  // Public live arena routes (allow QR, direct link, and PIN join without forced login)
  const isPublicLiveRoute =
    pathname === "/join" ||
    pathname.startsWith("/join/") ||
    pathname.startsWith("/student/live/join") ||
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
    user = null;
  }

  if (user) {
    const role = user.user_metadata?.role || "student";

    if (isAuthRoute && !pathname.startsWith("/auth/verify-email") && !pathname.startsWith("/auth/reset-password")) {
      // Authenticated user accessing auth page -> redirect to dashboard
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    // Role-Based Access Control (RBAC) enforcement
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/school") && !["school", "admin"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/teacher") && !["teacher", "school", "admin"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }

    if (pathname.startsWith("/student") && !["student", "teacher", "school", "admin"].includes(role)) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
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
