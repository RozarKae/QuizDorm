import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { EmailOtpType } from "@supabase/supabase-js";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Resolve canonical origin: strictly avoid internal Vercel preview domains that trigger Vercel SSO login
  const forwardedHost = request.headers.get("x-forwarded-host");
  const isLocal = forwardedHost?.includes("localhost") || request.url.includes("localhost");
  const canonicalOrigin = isLocal
    ? `http://${forwardedHost || "localhost:3000"}`
    : "https://quizclassroom.vercel.app";

  if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes("your-supabase-project")) {
    const cookieStore = await cookies();
    const targetPath = next || "/dashboard";
    const redirectResponse = NextResponse.redirect(new URL(targetPath, canonicalOrigin));

    try {
      const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) => {
                cookieStore.set(name, value, options);
                redirectResponse.cookies.set(name, value, options);
              });
            } catch {
              // Ignore setAll failures in server routes
            }
          },
        },
      });

      // Handle OTP / Email token hash flow
      if (token_hash && type) {
        const { error, data } = await supabase.auth.verifyOtp({
          token_hash,
          type,
        });

        if (!error && data?.user) {
          const role = data.user.user_metadata?.role || "student";
          const email = encodeURIComponent(data.user.email || "");
          const verifyUrl = new URL(`/auth/verify-email?verified=true&role=${role}&email=${email}`, canonicalOrigin);
          const verifyResponse = NextResponse.redirect(verifyUrl);
          redirectResponse.cookies.getAll().forEach((c) => verifyResponse.cookies.set(c));
          return verifyResponse;
        }
      }

      // Handle PKCE code exchange flow (OAuth / Google Auth)
      if (code) {
        const { error, data } = await supabase.auth.exchangeCodeForSession(code);
        if (!error && data?.user) {
          const role = data.user.user_metadata?.role || "student";
          const resolvedPath = next ? next : (role === "admin" ? "/admin" : `/${role}`);
          const finalResponse = NextResponse.redirect(new URL(resolvedPath, canonicalOrigin));
          redirectResponse.cookies.getAll().forEach((c) => finalResponse.cookies.set(c));
          return finalResponse;
        }
      }
    } catch {
      // Fallback to client-side bridge below
    }
  }

  // If server-side exchange encountered an issue (e.g. PKCE verifier cookie stored client-side),
  // return the client-side HTML bridge that resolves searchParams & hash and forwards to /dashboard
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
    <div class="title">Verifying Google Credentials // Redirecting</div>
    <div class="sub">Completing authentication and routing to your workspace...</div>
  </div>
  <script>
    (function() {
      var search = window.location.search;
      var hash = window.location.hash;
      var canonicalBase = 'https://quizclassroom.vercel.app';
      if (window.location.hostname.includes('localhost')) {
        canonicalBase = window.location.origin;
      }
      var target = canonicalBase + '/dashboard';
      if (search || hash) {
        window.location.replace(target + search + hash);
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
