import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
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
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Paths requiring authentication
  const protectedRoutes = ["/admin", "/school", "/teacher", "/student", "/dashboard"];
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route));

  // Auth paths (login, register, forgot-password, reset-password, choose-role)
  const isAuthRoute = pathname.startsWith("/auth");

  if (user) {
    const role = user.user_metadata?.role || "student";

    if (isAuthRoute && !pathname.startsWith("/auth/verify-email")) {
      // Authenticated user trying to access auth pages -> redirect to their role home
      const redirectUrl = role === "admin" ? "/admin" : `/${role}`;
      return NextResponse.redirect(new URL(redirectUrl, request.url));
    }

    // Role-based route guard
    if (pathname.startsWith("/admin") && role !== "admin") {
      return NextResponse.redirect(new URL(role === "admin" ? "/admin" : `/${role}`, request.url));
    }
    if (pathname.startsWith("/school") && role !== "school") {
      return NextResponse.redirect(new URL(role === "admin" ? "/admin" : `/${role}`, request.url));
    }
    if (pathname.startsWith("/teacher") && role !== "teacher") {
      return NextResponse.redirect(new URL(role === "admin" ? "/admin" : `/${role}`, request.url));
    }
    if (pathname.startsWith("/student") && role !== "student") {
      return NextResponse.redirect(new URL(role === "admin" ? "/admin" : `/${role}`, request.url));
    }
  } else {
    // Unauthenticated user trying to access protected dashboards
    if (isProtectedRoute) {
      const loginUrl = new URL("/auth/login", request.url);
      // Remember target path
      loginUrl.searchParams.set("redirectedFrom", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
