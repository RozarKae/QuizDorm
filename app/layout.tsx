import type { Metadata } from "next";
import { Space_Grotesk, Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import AuthProvider from "@/components/auth/AuthProvider";
import AnimatedBackground from "@/components/ui/animated-background";
import MouseGlow from "@/components/ui/mouse-glow";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

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
      className={`${plusJakartaSans.variable} ${inter.variable} ${jetbrainsMono.variable} ${spaceGrotesk.variable} dark h-full antialiased selection:bg-[#65F59A] selection:text-[#070B0A]`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans overflow-x-hidden relative transition-colors duration-150">
        <AnimatedBackground />
        <MouseGlow />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
