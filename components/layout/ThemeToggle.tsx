import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggle = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };
  return <Button onClick={toggle}>Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode</Button>;
}
