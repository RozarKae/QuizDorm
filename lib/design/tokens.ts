/**
 * QUIZDORM — EDITORIAL INTELLIGENCE DESIGN TOKENS
 * 
 * Centralized design tokens establishing a bold, authoritative editorial publication aesthetic
 * merged with the precision of a professional assessment and data platform.
 */

export const EDITORIAL_TOKENS = {
  colors: {
    // Primary Foundation
    ink: "#111318",           // Deepest authoritative newsprint/ink
    inkDark: "#090A0D",       // Absolute foundation for dark mode
    inkSubtle: "#1F232D",     // Elevated dark surface
    warmIvory: "#F7F5EF",     // Classic tactile paper / warm ivory foundation
    warmIvoryMuted: "#EFECE3",// Light surface tint
    softNeutral: "#E7E5DF",   // Restrained editorial boundary & hairline rules
    softNeutralDark: "#262B37",// Restrained hairline rules for dark surfaces
    
    // Brand & Semantic Accents
    cobalt: "#2855F5",        // Confident editorial blue for primary actions, focus, selections
    cobaltHover: "#1E44D6",
    cobaltSubtle: "rgba(40, 85, 245, 0.08)",
    
    acidLime: "#DFFF43",      // Electric editorial highlighter for scores, tags, live badges
    acidLimeHover: "#CEEF2A",
    acidLimeSubtle: "rgba(223, 255, 67, 0.15)",
    
    signalCoral: "#E85D3F",   // Pungent editorial red for urgent alerts, errors, deadlines, countdowns
    signalCoralHover: "#D04B2E",
    signalCoralSubtle: "rgba(232, 93, 63, 0.12)",
    
    // Muted Typography
    mutedTextLight: "#5F6674",
    mutedTextDark: "#8F97A8",
  },
  typography: {
    fontDisplay: "var(--font-space-grotesk), Space Grotesk, sans-serif",
    fontBody: "var(--font-inter), Inter, sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  geometry: {
    radiusNone: "0px",
    radiusSm: "2px",
    radiusMd: "4px",
    radiusLg: "6px",
    radiusPill: "9999px",
    borderWidth: "1px",
  },
  shadows: {
    none: "none",
    hairline: "0 1px 2px rgba(17, 19, 24, 0.04)",
    elevated: "0 4px 12px rgba(17, 19, 24, 0.06)",
  }
} as const;

export type EditorialColors = typeof EDITORIAL_TOKENS.colors;
