export type NavItem = {
  name: string;
  href: string;
};

export const navigation: NavItem[] = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Login', href: '/auth/login' },
  { name: 'Get Started', href: '/auth/register' },
];
