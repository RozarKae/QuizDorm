import Logo from "@/components/layout/Logo";
import Link from "next/link";

export default function Footer() {
  const quickLinks = [
    { name: "The Dorm", href: "#dorm" },
    { name: "Cognitive Engine", href: "#features" },
    { name: "Battle Arenas", href: "/live/arena" },
    { name: "Knowledge Matrix", href: "#audience" },
  ];

  const resources = [
    { name: "Help Center", href: "/contact" },
    { name: "Documentation", href: "/dashboard/developer" },
    { name: "Terms of Service", href: "/terms" },
  ];

  const company = [
    { name: "About & Founder's Desk", href: "/about" },
    { name: "Research Studio", href: "/dashboard/research-studio" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="relative z-10 border-t border-border bg-background py-14 text-slate-600 dark:text-[#A0AEA5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        
        {/* Brand info */}
        <div className="space-y-4">
          <Logo />
          <p className="text-xs text-slate-600 dark:text-[#A0AEA5] leading-relaxed font-normal">
            QuizDorm is the universal dormitory for every quiz format and cognitive discipline. Synthesize high-rigor assessments, sharpen intellectual stamina, accelerate IQ, and dominate live decathlon arenas.
          </p>
          <div className="inline-flex items-center space-x-2 font-mono text-[10px] text-rose-800 dark:text-[#FF4D6D] bg-rose-50 dark:bg-[#2A141A] px-2.5 py-1 rounded-full border border-rose-300 dark:border-[#FF4D6D]/20 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BE123C] dark:bg-[#FF4D6D] animate-pulse" />
            <span>Universal Quiz Dormitory &amp; IQ Acceleration</span>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-[#F2F7F3] uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-slate-600 dark:text-[#A0AEA5] hover:text-[#BE123C] dark:hover:text-[#FF4D6D] transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-[#F2F7F3] uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2">
            {resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-slate-600 dark:text-[#A0AEA5] hover:text-[#BE123C] dark:hover:text-[#FF4D6D] transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-slate-900 dark:text-[#F2F7F3] uppercase tracking-wider">
            Platform
          </h4>
          <ul className="space-y-2">
            {company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-slate-600 dark:text-[#A0AEA5] hover:text-[#BE123C] dark:hover:text-[#FF4D6D] transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500 dark:text-[#69786F]">
        <p>
          &copy; {new Date().getFullYear()} QuizDorm Platform. Founded by <strong className="text-slate-900 dark:text-[#F2F7F3]">RK Akbar</strong> (Tamil Nadu &amp; Kerala).
        </p>
        <p className="mt-2 sm:mt-0 text-[11px] text-[#BE123C] dark:text-[#FF4D6D] font-semibold">
          Engineered for Institutional &amp; Competitive Excellence
        </p>
      </div>
    </footer>
  );
}
