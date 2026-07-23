import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let user = null;

  if (supabaseUrl && supabaseAnonKey) {
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

  // Paths requiring authentication
  const protectedRoutes = ["/admin", "/school", "/teacher", "/student", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname === route || pathname.startsWith(`${route}/`));

  // Public Auth paths
  const isAuthRoute = pathname.startsWith("/auth");

  if (user) {
    const role = user.user_metadata?.role || "student";

    if (isAuthRoute && !pathname.startsWith("/auth/verify-email") && !pathname.startsWith("/auth/reset-password")) {
      // Authenticated user accessing auth page -> redirect to dashboard
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
