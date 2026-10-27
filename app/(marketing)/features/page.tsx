import Features from "@/components/landing/Features";
import Footer from "@/components/landing/Footer";
import Navbar from "@/components/landing/Navbar";

export default function FeaturesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-28">
        <Features />
      </main>
      <Footer />
    </div>
  );
}
