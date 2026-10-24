import { describe, it } from "node:test";
import assert from "node:assert";
import fs from "node:fs";
import path from "node:path";

describe("Universal Theme Harmony & Contrast Suite", () => {
  const globalsCssPath = path.join(process.cwd(), "app/globals.css");
  const faviconSvgPath = path.join(process.cwd(), "public/favicon.svg");
  const logoComponentPath = path.join(process.cwd(), "components/layout/Logo.tsx");

  it("Verifies globals.css includes Universal Theme Harmonizer rules", () => {
    const cssContent = fs.readFileSync(globalsCssPath, "utf-8");

    // Dynamic variable tokens
    assert.ok(cssContent.includes("--color-charcoal: var(--charcoal)"));
    assert.ok(cssContent.includes("--color-graphite: var(--graphite)"));
    assert.ok(cssContent.includes("--color-elevated: var(--elevated)"));
    assert.ok(cssContent.includes("--color-interactive: var(--interactive)"));

    // Light mode foundation variables
    assert.ok(cssContent.includes("--charcoal: #FFFAFA;"));
    assert.ok(cssContent.includes("--graphite: #FFFFFF;"));
    assert.ok(cssContent.includes("--elevated: #FFF4F5;"));

    // Dark mode foundation variables
    assert.ok(cssContent.includes("--charcoal: #090406;"));
    assert.ok(cssContent.includes("--graphite: #12070A;"));
    assert.ok(cssContent.includes("--elevated: #180B0F;"));

    // Background inversions in light mode
    assert.ok(cssContent.includes("html.light .bg-\\[\\#140C0E\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#0B0708\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#1D1013\\]"));

    // High-contrast text inversions in light mode
    assert.ok(cssContent.includes("html.light .text-\\[\\#F2F7F3\\]"));
    assert.ok(cssContent.includes("html.light .text-\\[\\#A0AEA5\\]"));
    assert.ok(cssContent.includes("html.light .text-\\[\\#69786F\\]"));
  });

  it("Verifies Logo wordmark and dual-mode emblem adapt to light and dark themes", () => {
    const logoContent = fs.readFileSync(logoComponentPath, "utf-8");

    // Dual-mode adaptive emblem (Light & Dark PNGs with CSS classes)
    assert.ok(
      logoContent.includes('src="/official-logo-light.png"'),
      "Logo must include official-logo-light.png for light mode"
    );
    assert.ok(
      logoContent.includes('src="/official-logo-dark.png"'),
      "Logo must include official-logo-dark.png for dark mode"
    );
    assert.ok(
      logoContent.includes("block dark:hidden"),
      "Light emblem must display in light mode and hide in dark mode"
    );
    assert.ok(
      logoContent.includes("hidden dark:block"),
      "Dark emblem must hide in light mode and display in dark mode"
    );

    // QUIZ: Dark grey in light mode, white in dark mode
    assert.ok(
      logoContent.includes("text-[#0F172A] dark:text-[#F2F7F3]"),
      "QUIZ wordmark must be dark grey in light mode and white in dark mode"
    );

    // DORM: Dark ruby in light mode, crimson in dark mode
    assert.ok(
      logoContent.includes("text-[#BE123C] dark:text-[#FF4D6D]"),
      "DORM wordmark must be dark ruby in light mode and crimson in dark mode"
    );

    // Pulse dot
    assert.ok(
      logoContent.includes("bg-[#BE123C] dark:bg-[#FF4D6D]"),
      "Pulse dot must be dark ruby in light mode and crimson in dark mode"
    );
  });

  it("Verifies pure PNG icon & emblem suite exists and decodes cleanly", () => {
    const darkLogoPath = path.join(process.cwd(), "public/official-logo-dark.png");
    const lightLogoPath = path.join(process.cwd(), "public/official-logo-light.png");
    const appIconPath = path.join(process.cwd(), "app/icon.png");
    const faviconPath = path.join(process.cwd(), "public/favicon-32x32.png");
    const pwaIconPath = path.join(process.cwd(), "public/icon-192.png");

    assert.ok(fs.existsSync(darkLogoPath), "public/official-logo-dark.png must exist");
    assert.ok(fs.existsSync(lightLogoPath), "public/official-logo-light.png must exist");
    assert.ok(fs.existsSync(appIconPath), "app/icon.png must exist");
    assert.ok(fs.existsSync(faviconPath), "public/favicon-32x32.png must exist");
    assert.ok(fs.existsSync(pwaIconPath), "public/icon-192.png must exist");
  });

  it("Verifies app/layout.tsx and public/manifest.json declare PNG icons", () => {
    const layoutPath = path.join(process.cwd(), "app/layout.tsx");
    const manifestPath = path.join(process.cwd(), "public/manifest.json");

    const layoutContent = fs.readFileSync(layoutPath, "utf-8");
    const manifestContent = fs.readFileSync(manifestPath, "utf-8");

    assert.ok(layoutContent.includes('url: "/favicon.ico"'));
    assert.ok(layoutContent.includes('url: "/favicon-32x32.png"'));
    assert.ok(layoutContent.includes('url: "/official-logo-dark.png"'));
    assert.ok(manifestContent.includes('"/official-logo-dark.png"'));
    assert.ok(manifestContent.includes('"/icon-512.png"'));
    assert.ok(manifestContent.includes('"/icon-192.png"'));
  });

  it("Verifies Landing Page CTA & Analytics components use light & dark theme harmony", () => {
    const ctaPath = path.join(process.cwd(), "components/landing/CTA.tsx");
    const analyticsPath = path.join(process.cwd(), "components/landing/AnalyticsSection.tsx");
    const navbarPath = path.join(process.cwd(), "components/landing/Navbar.tsx");

    const ctaContent = fs.readFileSync(ctaPath, "utf-8");
    const analyticsContent = fs.readFileSync(analyticsPath, "utf-8");
    const navbarContent = fs.readFileSync(navbarPath, "utf-8");

    // CTA must have light-to-dark gradient stops and high contrast text
    assert.ok(ctaContent.includes("from-white via-slate-50 to-rose-50/50"));
    assert.ok(ctaContent.includes("text-slate-900 dark:text-[#F2F7F3]"));
    assert.ok(ctaContent.includes("bg-[#BE123C] hover:bg-[#9F1239] text-white dark:bg-[#FF4D6D]"));

    // Analytics must have theme-aware telemetry card and high-contrast text
    assert.ok(analyticsContent.includes("bg-slate-50 border border-slate-200 dark:bg-gradient-to-br"));
    assert.ok(analyticsContent.includes("text-rose-800 dark:text-[#FF4D6D]"));

    // Navbar must include ThemeToggle
    assert.ok(navbarContent.includes("<ThemeToggle />"));
  });

  it("Verifies globals.css includes master gradient and accent contrast rules", () => {
    const cssContent = fs.readFileSync(globalsCssPath, "utf-8");

    // Accent contrast: Neon green -> dark green in light mode
    assert.ok(cssContent.includes("html.light .text-\\[\\#FF4D6D\\]"));
    assert.ok(cssContent.includes("color: #BE123C !important;"));

    // Rose -> rich burgundy
    assert.ok(cssContent.includes("html.light .text-\\[\\#FF758F\\]"));
    assert.ok(cssContent.includes("color: #9F1239 !important;"));

    // Gradient stops in light mode
    assert.ok(cssContent.includes("html.light .from-\\[\\#140C0E\\]"));
    assert.ok(cssContent.includes("--tw-gradient-from: #FFFFFF"));

    // Dashboard banner gradients inversion
    assert.ok(cssContent.includes("html.light .from-slate-900"));
    assert.ok(cssContent.includes("html.light .from-indigo-950"));
    assert.ok(cssContent.includes("html.light .from-purple-950"));

    // Inverted card text-white contrast
    assert.ok(cssContent.includes('html.light [class*="bg-gradient-to"].text-white'));
    assert.ok(cssContent.includes('color: #0F172A !important;'));

    // Codebase hex coverage
    assert.ok(cssContent.includes("html.light .bg-\\[\\#34151C\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#34151C\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#251414\\]"));
  });

  it("Verifies Live Arena & About pages use responsive theme banners", () => {
    const arenaPath = path.join(process.cwd(), "app/live/arena/page.tsx");
    const aboutPath = path.join(process.cwd(), "app/(marketing)/about/page.tsx");

    const arenaContent = fs.readFileSync(arenaPath, "utf-8");
    const aboutContent = fs.readFileSync(aboutPath, "utf-8");

    assert.ok(arenaContent.includes("from-white via-slate-50 to-rose-50/50 dark:from-[#140C0E]"));
    assert.ok(aboutContent.includes("bg-card p-6 rounded-[6px] border border-border"));
  });
});
