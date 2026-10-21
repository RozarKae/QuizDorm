import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-supabase-project")) {
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

      // Handle OTP / Email token hash flow
      if (token_hash && type) {
        const { error, data } = await supabase.auth.verifyOtp({
          token_hash,
          type,
        });

        if (!error && data?.user) {
          const role = data.user.user_metadata?.role || "student";
          const email = encodeURIComponent(data.user.email || "");
          return NextResponse.redirect(new URL(`/auth/verify-email?verified=true&role=${role}&email=${email}`, origin));
        }
      }

      // Handle PKCE code exchange flow
      if (code) {
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data?.user) {
          const role = data.user.user_metadata?.role || "student";
          const email = encodeURIComponent(data.user.email || "");
          return NextResponse.redirect(new URL(`/auth/verify-email?verified=true&role=${role}&email=${email}`, origin));
        }
      }
    } catch {
      // Fallback
    }
  }

  // If neither code nor token_hash was in query parameters, Supabase may have sent
  // tokens in the URL hash (#access_token=...&type=signup).
  // Return a client-side HTML bridge that resolves the hash and forwards to /dashboard
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>QuizDorm // Authorizing...</title>
  <style>
    body {
      background: #070B0A;
      color: #F2F7F3;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100vh;
      margin: 0;
    }
    .box {
      text-align: center;
      background: #111B17;
      border: 1px solid rgba(101, 245, 154, 0.25);
      border-radius: 8px;
      padding: 32px 40px;
      box-shadow: 0 0 30px rgba(101, 245, 154, 0.12);
    }
    .title {
      color: #65F59A;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      font-family: monospace;
      margin-bottom: 8px;
    }
    .sub {
      color: #A0AEA5;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="box">
    <div class="title">Verifying Credentials // Redirecting</div>
    <div class="sub">Completing authentication and routing to your workspace...</div>
  </div>
  <script>
    (function() {
      var hash = window.location.hash;
      var target = '/dashboard';
      if (hash) {
        // Forward hash to dashboard where client Supabase parses and consumes it
        window.location.replace(target + hash);
      } else {
        window.location.replace(target);
      }
    })();
  </script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
