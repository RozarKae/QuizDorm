import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/components/auth/AuthProvider";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import AnimatedBackground from "@/components/ui/animated-background";
import MouseGlow from "@/components/ui/mouse-glow";

export const metadata: Metadata = {
  title: "QuizDorm | AI-Powered Educational Platform",
  description: "Next-generation gamified quiz learning and competition platform.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/official-logo-dark.png", type: "image/png", sizes: "1024x1024" },
    ],
    apple: [{ url: "/icon-192.png", sizes: "192x192" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="h-full antialiased selection:bg-[#FF4D6D] selection:text-[#0B0708]"
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans overflow-x-hidden relative transition-colors duration-200">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="quizdorm-theme"
          disableTransitionOnChange={false}
        >
          <AnimatedBackground />
          <MouseGlow />
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
