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
    { name: "About Us", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Privacy Policy", href: "/privacy" },
  ];

  return (
    <footer className="relative z-10 border-t border-white/[0.08] bg-[#09090B]/60 backdrop-blur-xl py-16">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
        
        {/* Brand info */}
        <div className="space-y-4">
          <Logo />
          <p className="text-xs sm:text-sm text-[#B8BCC8] leading-relaxed">
            QuizDorm is an AI-powered educational platform designed to elevate classroom engagement, live quiz competition, and academic performance tracking.
          </p>
          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-[#6B7280] hover:text-blue-400 transition-colors" aria-label="Twitter">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a href="#" className="text-[#6B7280] hover:text-blue-400 transition-colors" aria-label="GitHub">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a href="#" className="text-[#6B7280] hover:text-blue-400 transition-colors" aria-label="Discord">
              <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.094 13.094 0 01-1.873-.894.077.077 0 01-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 01.077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 01.078.009c.12.099.246.195.373.289a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.894.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.1825 0-2.1569-1.085-2.1569-2.419 0-1.3332.9562-2.419 2.1569-2.419 1.21 0 2.1756 1.0962 2.157 2.419 0 1.334-.9563 2.419-2.157 2.419zm7.975 0c-1.1825 0-2.1569-1.085-2.1569-2.419 0-1.3332.9554-2.419 2.1569-2.419 1.21 0 2.1756 1.0962 2.157 2.419 0 1.334-.9468 2.419-2.157 2.419z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-4">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Quick Links
          </h4>
          <ul className="space-y-2.5">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs sm:text-sm text-[#B8BCC8] hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-4">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2.5">
            {resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs sm:text-sm text-[#B8BCC8] hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-4">
          <h4 className="font-heading text-sm font-bold text-white uppercase tracking-wider">
            Company
          </h4>
          <ul className="space-y-2.5">
            {company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs sm:text-sm text-[#B8BCC8] hover:text-white transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-white/[0.08] text-center">
        <p className="text-xs text-[#6B7280]">
          &copy; {new Date().getFullYear()} QuizDorm. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
