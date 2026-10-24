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
    assert.ok(cssContent.includes("--charcoal: #F8FAF9;"));
    assert.ok(cssContent.includes("--graphite: #FFFFFF;"));
    assert.ok(cssContent.includes("--elevated: #F1F5F3;"));

    // Dark mode foundation variables
    assert.ok(cssContent.includes("--charcoal: #070B0A;"));
    assert.ok(cssContent.includes("--graphite: #0C1210;"));
    assert.ok(cssContent.includes("--elevated: #111B17;"));

    // Background inversions in light mode
    assert.ok(cssContent.includes("html.light .bg-\\[\\#0C1210\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#070B0A\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#111B17\\]"));

    // High-contrast text inversions in light mode
    assert.ok(cssContent.includes("html.light .text-\\[\\#F2F7F3\\]"));
    assert.ok(cssContent.includes("html.light .text-\\[\\#A0AEA5\\]"));
    assert.ok(cssContent.includes("html.light .text-\\[\\#69786F\\]"));
  });

  it("Verifies Logo wordmark adapts to light and dark themes", () => {
    const logoContent = fs.readFileSync(logoComponentPath, "utf-8");

    // QUIZ: Dark grey in light mode, white in dark mode
    assert.ok(
      logoContent.includes("text-[#0F172A] dark:text-[#F2F7F3]"),
      "QUIZ wordmark must be dark grey in light mode and white in dark mode"
    );

    // DORM: Dark green in light mode, light green in dark mode
    assert.ok(
      logoContent.includes("text-[#047857] dark:text-[#65F59A]"),
      "DORM wordmark must be dark green in light mode and neon green in dark mode"
    );

    // Pulse dot
    assert.ok(
      logoContent.includes("bg-[#047857] dark:bg-[#65F59A]"),
      "Pulse dot must be dark green in light mode and neon green in dark mode"
    );
  });

  it("Verifies public/favicon.svg includes prefers-color-scheme media query", () => {
    const svgContent = fs.readFileSync(faviconSvgPath, "utf-8");

    assert.ok(svgContent.includes("@media (prefers-color-scheme: light)"));
    assert.ok(svgContent.includes("--fav-bg: #FFFFFF;"));
    assert.ok(svgContent.includes("--fav-stroke: #047857;"));
    assert.ok(svgContent.includes("--fav-cap: #1E293B;"));
    assert.ok(svgContent.includes("--fav-q: #047857;"));
  });

  it("Verifies icon.svg includes light & dark theme color settings", () => {
    const publicIconPath = path.join(process.cwd(), "public/icon.svg");
    const appIconPath = path.join(process.cwd(), "app/icon.svg");

    assert.ok(fs.existsSync(publicIconPath), "public/icon.svg must exist");
    assert.ok(fs.existsSync(appIconPath), "app/icon.svg must exist");

    const iconContent = fs.readFileSync(publicIconPath, "utf-8");

    // Media query
    assert.ok(iconContent.includes("@media (prefers-color-scheme: light)"));

    // Dark theme defaults (White cap, light green Q, dark bg)
    assert.ok(iconContent.includes(".icon-bg { fill: #0C1210;"));
    assert.ok(iconContent.includes(".icon-cap-top { fill: #FFFFFF;"));
    assert.ok(iconContent.includes(".icon-q-face { fill: #65F59A;"));
    assert.ok(iconContent.includes(".icon-q-tail { fill: #FFFFFF;"));

    // Light theme settings (Dark grey cap #1E293B, dark green Q #047857, white bg #FFFFFF)
    assert.ok(iconContent.includes(".icon-bg { fill: #FFFFFF; stroke: #047857;"));
    assert.ok(iconContent.includes(".icon-cap-top { fill: #1E293B; stroke: #047857;"));
    assert.ok(iconContent.includes(".icon-q-face { fill: #047857;"));
    assert.ok(iconContent.includes(".icon-q-tail { fill: #1E293B;"));
  });

  it("Verifies Landing Page CTA & Analytics components use light & dark theme harmony", () => {
    const ctaPath = path.join(process.cwd(), "components/landing/CTA.tsx");
    const analyticsPath = path.join(process.cwd(), "components/landing/AnalyticsSection.tsx");
    const navbarPath = path.join(process.cwd(), "components/landing/Navbar.tsx");

    const ctaContent = fs.readFileSync(ctaPath, "utf-8");
    const analyticsContent = fs.readFileSync(analyticsPath, "utf-8");
    const navbarContent = fs.readFileSync(navbarPath, "utf-8");

    // CTA must have light-to-dark gradient stops and high contrast text
    assert.ok(ctaContent.includes("from-white via-slate-50 to-emerald-50/50"));
    assert.ok(ctaContent.includes("text-slate-900 dark:text-[#F2F7F3]"));
    assert.ok(ctaContent.includes("bg-[#047857] hover:bg-[#065F46] text-white dark:bg-[#65F59A]"));

    // Analytics must have theme-aware telemetry card and high-contrast text
    assert.ok(analyticsContent.includes("bg-slate-50 border border-slate-200 dark:bg-gradient-to-br"));
    assert.ok(analyticsContent.includes("text-emerald-800 dark:text-[#65F59A]"));

    // Navbar must include ThemeToggle
    assert.ok(navbarContent.includes("<ThemeToggle />"));
  });

  it("Verifies globals.css includes master gradient and accent contrast rules", () => {
    const cssContent = fs.readFileSync(globalsCssPath, "utf-8");

    // Accent contrast: Neon green -> dark green in light mode
    assert.ok(cssContent.includes("html.light .text-\\[\\#65F59A\\]"));
    assert.ok(cssContent.includes("color: #047857 !important;"));

    // Mint -> deep teal
    assert.ok(cssContent.includes("html.light .text-\\[\\#38D9B0\\]"));
    assert.ok(cssContent.includes("color: #0D9488 !important;"));

    // Gradient stops in light mode
    assert.ok(cssContent.includes("html.light .from-\\[\\#0C1210\\]"));
    assert.ok(cssContent.includes("--tw-gradient-from: #FFFFFF"));

    // Dashboard banner gradients inversion
    assert.ok(cssContent.includes("html.light .from-slate-900"));
    assert.ok(cssContent.includes("html.light .from-indigo-950"));
    assert.ok(cssContent.includes("html.light .from-purple-950"));

    // Inverted card text-white contrast
    assert.ok(cssContent.includes('html.light [class*="bg-gradient-to"].text-white'));
    assert.ok(cssContent.includes('color: #0F172A !important;'));

    // Codebase hex coverage
    assert.ok(cssContent.includes("html.light .bg-\\[\\#23372C\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#20342a\\]"));
    assert.ok(cssContent.includes("html.light .bg-\\[\\#251414\\]"));
  });

  it("Verifies Live Arena & About pages use responsive theme banners", () => {
    const arenaPath = path.join(process.cwd(), "app/live/arena/page.tsx");
    const aboutPath = path.join(process.cwd(), "app/(marketing)/about/page.tsx");

    const arenaContent = fs.readFileSync(arenaPath, "utf-8");
    const aboutContent = fs.readFileSync(aboutPath, "utf-8");

    assert.ok(arenaContent.includes("from-white via-slate-50 to-emerald-50/50 dark:from-[#0C1210]"));
    assert.ok(aboutContent.includes("bg-card p-6 rounded-[6px] border border-border"));
  });
});
