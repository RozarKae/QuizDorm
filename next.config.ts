import type { NextConfig } from "next";
import { securityHeaders } from "./lib/security/headers";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      // Core Shortcuts & Aliases
      { source: "/quizzes", destination: "/dashboard/quizzes", permanent: false },
      { source: "/questions", destination: "/dashboard/questions", permanent: false },
      { source: "/arena", destination: "/live/arena", permanent: false },
      { source: "/live", destination: "/live/arena", permanent: false },
      { source: "/leaderboard", destination: "/dashboard/leaderboard", permanent: false },
      { source: "/competitions", destination: "/dashboard/competitions", permanent: false },
      { source: "/classes", destination: "/dashboard/classes", permanent: false },
      { source: "/assignments", destination: "/dashboard/assignments", permanent: false },
      { source: "/profile", destination: "/dashboard/profile", permanent: false },
      { source: "/settings", destination: "/dashboard/settings", permanent: false },
      
      // Documentation & Support
      { source: "/docs", destination: "/dashboard/developer", permanent: false },
      { source: "/documentation", destination: "/dashboard/developer", permanent: false },
      { source: "/help", destination: "/contact", permanent: false },
      { source: "/help-center", destination: "/contact", permanent: false },
      { source: "/support", destination: "/contact", permanent: false },
      { source: "/blog", destination: "/about", permanent: false },
      { source: "/research", destination: "/dashboard/research-studio", permanent: false },
      
      // Competitions & Tournament Shortcuts
      { source: "/join-arena", destination: "/live/join", permanent: false },
      { source: "/student/live/join", destination: "/live/join", permanent: false },
      { source: "/student/live", destination: "/live/join", permanent: false },
      { source: "/tournament", destination: "/dashboard/competitions/organizer", permanent: false },
      { source: "/organizer", destination: "/dashboard/competitions/organizer", permanent: false },
      { source: "/olympiads", destination: "/dashboard/competitions/global", permanent: false },
    ];
  },
};

export default nextConfig;
