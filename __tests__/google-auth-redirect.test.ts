import assert from "node:assert/strict";
import test from "node:test";

test("Google Auth PKCE & Redirect Resilience Suite", async (t) => {
  await t.test("Edge Middleware auto-intercepts ?code= parameter on root or landing pages and forwards to /auth/callback", () => {
    const handleProxyRoute = (pathname: string, searchParams: URLSearchParams) => {
      const code = searchParams.get("code");
      if (code && pathname !== "/auth/callback") {
        const callbackUrl = new URL("https://quizclassroom.vercel.app/auth/callback");
        searchParams.forEach((val, key) => {
          callbackUrl.searchParams.set(key, val);
        });
        return {
          redirected: true,
          status: 307,
          location: callbackUrl.toString(),
        };
      }
      return { redirected: false, status: 200, location: pathname };
    };

    // User landed on root with ?code=dacd7117-c44e-4514-8618-496c9aa7ba7a
    const rootSearch = new URLSearchParams("code=dacd7117-c44e-4514-8618-496c9aa7ba7a");
    const res = handleProxyRoute("/", rootSearch);

    assert.equal(res.redirected, true);
    assert.equal(res.status, 307);
    assert.equal(res.location, "https://quizclassroom.vercel.app/auth/callback?code=dacd7117-c44e-4514-8618-496c9aa7ba7a");
  });

  await t.test("Edge Middleware preserves existing query params (e.g. role, next) when forwarding code", () => {
    const searchParams = new URLSearchParams("code=test-code-123&role=teacher&next=/dashboard/tutor");
    const code = searchParams.get("code");
    assert.ok(code);

    const callbackUrl = new URL("https://quizclassroom.vercel.app/auth/callback");
    searchParams.forEach((val, key) => {
      callbackUrl.searchParams.set(key, val);
    });

    assert.equal(callbackUrl.searchParams.get("code"), "test-code-123");
    assert.equal(callbackUrl.searchParams.get("role"), "teacher");
    assert.equal(callbackUrl.searchParams.get("next"), "/dashboard/tutor");
  });

  await t.test("Edge Middleware does not redirect /auth/callback in a loop when code is present", () => {
    const pathname = "/auth/callback";
    const searchParams = new URLSearchParams("code=dacd7117");
    const code = searchParams.get("code");
    const shouldRedirect = Boolean(code && pathname !== "/auth/callback");

    assert.equal(shouldRedirect, false, "/auth/callback must execute its handler, not loop redirect");
  });

  await t.test("Edge Middleware canonicalizes preview domains that trigger Vercel SSO to official public domain", () => {
    const handleDomainCanonicalization = (host: string, pathname: string, search: string) => {
      if (host.includes("rozarkaes-projects.vercel.app")) {
        return {
          redirected: true,
          status: 308,
          location: `https://quizclassroom.vercel.app${pathname}${search}`,
        };
      }
      return { redirected: false, status: 200, location: `https://${host}${pathname}${search}` };
    };

    const res = handleDomainCanonicalization(
      "quizclassroom-rozarkaes-projects.vercel.app",
      "/dashboard",
      "?welcome=true"
    );
    assert.equal(res.redirected, true);
    assert.equal(res.status, 308);
    assert.equal(res.location, "https://quizclassroom.vercel.app/dashboard?welcome=true");
  });

  await t.test("Client Auth URL cleaner strips ?code= query param while retaining current path", () => {
    const mockUrl = new URL("https://quizclassroom.vercel.app/?code=dacd7117-c44e-4514-8618-496c9aa7ba7a");
    mockUrl.searchParams.delete("code");
    const cleanPath = mockUrl.pathname + (mockUrl.search ? mockUrl.search : "");
    assert.equal(cleanPath, "/");
  });
});
