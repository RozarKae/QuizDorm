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
    <footer className="relative z-10 border-t border-border bg-card py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
        
        {/* Brand info */}
        <div className="space-y-4">
          <Logo />
          <p className="text-xs text-muted-foreground leading-relaxed font-normal">
            QuizDorm is an Editorial Intelligence assessment system designed for institutional testing, competitive academic tournaments, and student retention analytics.
          </p>
          <div className="pt-2 font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Verified Production Bank: 535 Items
          </div>
        </div>

        {/* Links Column 1 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
            Navigation
          </h4>
          <ul className="space-y-2">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 2 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
            Resources
          </h4>
          <ul className="space-y-2">
            {resources.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Links Column 3 */}
        <div className="space-y-3">
          <h4 className="font-mono text-xs font-bold text-foreground uppercase tracking-wider">
            Institutional
          </h4>
          <ul className="space-y-2">
            {company.map((link) => (
              <li key={link.name}>
                <Link href={link.href} className="text-xs text-muted-foreground hover:text-foreground transition-colors font-mono">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} QuizDorm Platform. Editorial Intelligence Assessment.
        </p>
        <p className="mt-2 sm:mt-0 text-[11px]">
          Space Grotesk &bull; Inter &bull; Monospace
        </p>
      </div>
    </footer>
  );
}
