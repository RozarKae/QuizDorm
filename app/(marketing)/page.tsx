import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";
import Audience from "@/components/landing/Audience";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export default function MarketingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#070B0A] text-[#F2F7F3]">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <HowItWorks />
        <Audience />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
