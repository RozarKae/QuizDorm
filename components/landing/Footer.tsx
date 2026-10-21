import Link from "next/link";
import Logo from "@/components/layout/Logo";

export default function Footer() {
  const quickLinks = [
    { name: "Features", href: "#features" },
    { name: "Audience", href: "#audience" },
    { name: "How It Works", href: "#how-it-works" },
  ];

  const resources = [
    { name: "Help Center", href: "#" },
    { name: "Documentation", href: "#" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const company = [
    { name: "About & Founder's Desk", href: "/about" },
    { name: "Blog & Research", href: "#" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="relative z-10 border-t border-[rgba(160,190,170,0.12)] bg-[#070B0A] py-14 text-[#A0AEA5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        
        {/* Brand info */}
        <div className="space-y-4">
          <Logo />
          <p className="text-xs text-[#A0AEA5] leading-relaxed font-normal">
            QuizDorm is your dorm study squad & live battle arena: drop your notes, cook up instant quizzes with AI, and crush your exams together.
          </p>
          <div className="inline-flex items-center space-x-2 font-mono text-[10px] text-[#65F59A] bg-[#17251E] px-2.5 py-1 rounded-full border border-[#65F59A]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#65F59A] animate-pulse" />
            <span>Live Dorm Study Platform</span>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-[#F2F7F3] uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-[#A0AEA5] hover:text-[#65F59A] transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-[#F2F7F3] uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2">
            {resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-[#A0AEA5] hover:text-[#65F59A] transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-[#F2F7F3] uppercase tracking-wider">
            Platform
          </h4>
          <ul className="space-y-2">
            {company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-[#A0AEA5] hover:text-[#65F59A] transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-[rgba(160,190,170,0.12)] flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-[#69786F]">
        <p>
          &copy; {new Date().getFullYear()} QuizDorm Platform. Founded by <strong className="text-[#F2F7F3]">RK Akbar</strong> (Tamil Nadu &amp; Kerala).
        </p>
        <p className="mt-2 sm:mt-0 text-[11px] text-[#65F59A]">
          Engineered for Institutional &amp; Competitive Excellence
        </p>
      </div>
    </footer>
  );
}
