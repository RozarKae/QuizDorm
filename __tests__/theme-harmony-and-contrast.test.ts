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
});
