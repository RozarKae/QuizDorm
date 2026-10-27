import AIStudioSection from "@/components/landing/AIStudioSection";
import AnalyticsSection from "@/components/landing/AnalyticsSection";
import Audience from "@/components/landing/Audience";
import CompeteSection from "@/components/landing/CompeteSection";
import CTA from "@/components/landing/CTA";
import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Hero from "@/components/landing/Hero";
import Navbar from "@/components/landing/Navbar";

/**
 * QuizDorm // Project Aurora Cinematic Experience
 * Full 7-stage visual storytelling progression matching Creative Direction:
 * 1. The Opening (Hero)
 * 2. Create (Features: "Great Questions Change Everything")
 * 3. Discover (Audience: "Curiosity Has No Finish Line")
 * 4. Compete (CompeteSection: "Step Into the Arena")
 * 5. Understand (AnalyticsSection: "See More Than the Score")
 * 6. Create with Intelligence (AIStudioSection: "From First Thought to Brilliant Question")
 * 7. The Closing (CTA: "Your Next Breakthrough Starts Right Here")
 */
export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B0708] text-[#F2F7F3]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Audience />
        <CompeteSection />
        <AnalyticsSection />
        <AIStudioSection />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
