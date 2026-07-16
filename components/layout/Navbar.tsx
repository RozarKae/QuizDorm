import Link from "next/link";
import Logo from "@/components/layout/Logo";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { navigation } from "@/config/navigation";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 py-4">
      <Logo />
      <div className="hidden md:flex space-x-6">
        {navigation.map((item) => (
          <Link key={item.href} href={item.href} className="text-sm font-medium hover:text-primary">
            {item.name}
          </Link>
        ))}
        <ThemeToggle />
      </div>
      {/* Mobile menu button – will be handled by StickyNavbar wrapper */}
    </nav>
  );
}
