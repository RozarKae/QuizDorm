import type { Metadata } from "next";
import "./globals.css";

import AuthProvider from "@/components/auth/AuthProvider";
import AnimatedBackground from "@/components/ui/animated-background";
import MouseGlow from "@/components/ui/mouse-glow";

export const metadata: Metadata = {
  title: "QuizDorm | AI-Powered Educational Platform",
  description: "Next-generation gamified quiz learning and competition platform.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
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
      className="dark h-full antialiased selection:bg-[#65F59A] selection:text-[#070B0A]"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans overflow-x-hidden relative transition-colors duration-150">
        <AnimatedBackground />
        <MouseGlow />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
