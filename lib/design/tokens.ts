/**
 * QUIZDORM — IMMERSIVE FUTURE OS DESIGN TOKENS
 * 
 * Centralized design tokens establishing a dark-first, futuristic, cinematic Assessment Operating System.
 * Visual direction: Linear / Raycast / High-end AI and competitive gaming interface fidelity.
 */

export const FUTURE_OS_TOKENS = {
  colors: {
    // Foundation Surfaces
    background: "#070B0A",          // Primary near-black charcoal with subtle green undertone
    surfacePrimary: "#0C1210",      // Deep graphite primary surface / card
    surfaceElevated: "#111B17",     // Layered charcoal elevated surface (dropdowns, dialogs, popovers)
    surfaceInteractive: "#17251E",  // Interactive surface (input fields, active states, hover layers)
    surfaceSubtle: "rgba(101, 245, 154, 0.04)", // Ambient emerald surface wash

    // Brand & Semantic Accents
    accentEmerald: "#65F59A",       // Luminous primary accent (important actions, active states, AI intelligence)
    accentEmeraldHover: "#52E086",  // Hover state for primary actions
    accentEmeraldSubtle: "rgba(101, 245, 154, 0.12)", // Tinted background for active indicators
    accentMint: "#38D9B0",          // Secondary accent (restrained mint/teal for tags, progress, secondary stats)
    accentMintSubtle: "rgba(56, 217, 176, 0.12)",

    // Typography & Contrast
    textPrimary: "#F2F7F3",         // Soft white primary text
    textSecondary: "#A0AEA5",       // Restrained secondary text
    textMuted: "#69786F",           // Muted labels, metadata, disabled copy
    textInverse: "#070B0A",         // Dark text when rendered on luminous accents

    // Borders & Dividers
    borderSubtle: "rgba(160, 190, 170, 0.14)", // Standard hairline border
    borderStrong: "rgba(160, 190, 170, 0.28)", // Emphasized border on hover or active cards
    borderAccent: "rgba(101, 245, 154, 0.40)", // Luminous border for focused or winning states

    // Semantic States
    destructive: "#F87171",         // Controlled coral-red for warnings, errors, destructive actions
    destructiveSubtle: "rgba(248, 113, 113, 0.12)",
    warning: "#FBBF24",             // Amber warning
    warningSubtle: "rgba(251, 191, 36, 0.12)",
    info: "#38D9B0",                // Mint info
  },
  typography: {
    fontDisplay: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
    fontBody: "var(--font-inter), 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    fontMono: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  },
  geometry: {
    radiusSm: "3px",
    radiusMd: "6px",
    radiusLg: "8px",
    radiusPill: "9999px",
    borderWidth: "1px",
  },
  shadows: {
    none: "none",
    hairline: "0 1px 2px rgba(0, 0, 0, 0.4)",
    card: "0 4px 20px -2px rgba(0, 0, 0, 0.5)",
    glowEmerald: "0 0 24px -4px rgba(101, 245, 154, 0.20)",
    glowMint: "0 0 24px -4px rgba(56, 217, 176, 0.20)",
  },
} as const;

export type FutureOSTokens = typeof FUTURE_OS_TOKENS;

// Backward compatibility alias for any existing imports
export const EDITORIAL_TOKENS = {
  colors: {
    ink: FUTURE_OS_TOKENS.colors.background,
    inkDark: FUTURE_OS_TOKENS.colors.background,
    inkSubtle: FUTURE_OS_TOKENS.colors.surfacePrimary,
    warmIvory: FUTURE_OS_TOKENS.colors.textPrimary,
    warmIvoryMuted: FUTURE_OS_TOKENS.colors.textSecondary,
    softNeutral: FUTURE_OS_TOKENS.colors.surfaceElevated,
    softNeutralDark: FUTURE_OS_TOKENS.colors.surfaceInteractive,
    cobalt: FUTURE_OS_TOKENS.colors.accentEmerald,
    cobaltHover: FUTURE_OS_TOKENS.colors.accentEmeraldHover,
    cobaltSubtle: FUTURE_OS_TOKENS.colors.accentEmeraldSubtle,
    acidLime: FUTURE_OS_TOKENS.colors.accentEmerald,
    acidLimeHover: FUTURE_OS_TOKENS.colors.accentEmeraldHover,
    acidLimeSubtle: FUTURE_OS_TOKENS.colors.accentEmeraldSubtle,
    signalCoral: FUTURE_OS_TOKENS.colors.destructive,
    signalCoralHover: "#EF4444",
    signalCoralSubtle: FUTURE_OS_TOKENS.colors.destructiveSubtle,
    mutedTextLight: FUTURE_OS_TOKENS.colors.textMuted,
    mutedTextDark: FUTURE_OS_TOKENS.colors.textMuted,
  },
  typography: FUTURE_OS_TOKENS.typography,
  geometry: FUTURE_OS_TOKENS.geometry,
  shadows: FUTURE_OS_TOKENS.shadows,
} as const;
