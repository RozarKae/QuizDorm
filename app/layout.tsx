import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";

import "./globals.css";

import AuthProvider from "@/components/auth/AuthProvider";
import AnimatedBackground from "@/components/ui/animated-background";
import MouseGlow from "@/components/ui/mouse-glow";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "QuizDorm | AI-Powered Educational Platform",
  description: "Next-generation gamified quiz learning and competition platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} dark h-full antialiased selection:bg-blue-500/30 selection:text-blue-200`}
    >
      <body className="min-h-full flex flex-col bg-[#09090B] text-white font-sans overflow-x-hidden relative">
        <AnimatedBackground />
        <MouseGlow />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
