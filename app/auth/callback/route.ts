import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (code && supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-supabase-project")) {
    const cookieStore = await cookies();
    try {
      const supabase = createServerClient(
        supabaseUrl,
        supabaseAnonKey,
        {
          cookies: {
            getAll() {
              return cookieStore.getAll();
            },
            setAll(cookiesToSet) {
              try {
                cookiesToSet.forEach(({ name, value, options }) =>
                  cookieStore.set(name, value, options)
                );
              } catch {
                // Ignore setAll failures in server routes
              }
            },
          },
        }
      );

      const { error, data } = await supabase.auth.exchangeCodeForSession(code);
      if (!error && data?.user) {
        const role = data.user.user_metadata?.role || "student";
        const redirectUrl = role === "admin" ? "/admin" : `/${role}`;
        return NextResponse.redirect(new URL(redirectUrl, origin));
      }
    } catch {
      // Fallback redirect
    }
  }

  // return the user to an error page or homepage if exchange fails
  return NextResponse.redirect(new URL("/auth/login?error=auth-callback-failed", origin));
}
