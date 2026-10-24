/**
 * QUIZDORM — IMMERSIVE FUTURE OS DESIGN TOKENS
 * 
 * Centralized design tokens establishing a dark-first, futuristic, cinematic Assessment Operating System.
 * Visual direction: Linear / Raycast / High-end AI and competitive gaming interface fidelity.
 */

export const FUTURE_OS_TOKENS = {
  colors: {
    // Foundation Surfaces
    background: "#090406",          // Deep obsidian with subtle burgundy/crimson undertone
    surfacePrimary: "#12070A",      // Deep obsidian crimson primary surface / card
    surfaceElevated: "#180B0F",     // Layered crimson elevated surface (dropdowns, dialogs, popovers)
    surfaceInteractive: "#220F15",  // Interactive surface (input fields, active states, hover layers)
    surfaceSubtle: "rgba(255, 77, 109, 0.04)", // Ambient crimson surface wash

    // Brand & Semantic Accents
    accentCrimson: "#FF4D6D",       // Electric Neon Crimson primary accent (important actions, active states, AI intelligence)
    accentCrimsonHover: "#FF3366",  // Hover state for primary actions
    accentCrimsonSubtle: "rgba(255, 77, 109, 0.12)", // Tinted background for active indicators
    accentRose: "#FF758F",          // Secondary accent (restrained rose for tags, progress, secondary stats)
    accentRoseSubtle: "rgba(255, 117, 143, 0.12)",

    // Backward Compatibility Aliases for Emerald & Mint
    accentEmerald: "#FF4D6D",
    accentEmeraldHover: "#FF3366",
    accentEmeraldSubtle: "rgba(255, 77, 109, 0.12)",
    accentMint: "#FF758F",
    accentMintSubtle: "rgba(255, 117, 143, 0.12)",

    // Typography & Contrast
    textPrimary: "#FFF0F2",         // Soft white primary text
    textSecondary: "#B59FA5",       // Restrained secondary text
    textMuted: "#826E74",           // Muted labels, metadata, disabled copy
    textInverse: "#0B0708",         // Dark text when rendered on luminous accents

    // Borders & Dividers
    borderSubtle: "rgba(240, 160, 180, 0.14)", // Standard hairline border
    borderStrong: "rgba(240, 160, 180, 0.28)", // Emphasized border on hover or active cards
    borderAccent: "rgba(255, 77, 109, 0.40)", // Luminous border for focused or winning states

    // Semantic States
    destructive: "#F87171",         // Controlled coral-red for warnings, errors, destructive actions
    destructiveSubtle: "rgba(248, 113, 113, 0.12)",
    warning: "#FBBF24",             // Amber warning
    warningSubtle: "rgba(251, 191, 36, 0.12)",
    info: "#FF758F",                // Rose info
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
    glowCrimson: "0 0 24px -4px rgba(255, 77, 109, 0.20)",
    glowRose: "0 0 24px -4px rgba(255, 117, 143, 0.20)",
    glowEmerald: "0 0 24px -4px rgba(255, 77, 109, 0.20)",
    glowMint: "0 0 24px -4px rgba(255, 117, 143, 0.20)",
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
