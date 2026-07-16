import Link from 'next/link';
import { navigation } from '@/config/navigation';

export default function Sidebar() {
  return (
    <aside className="w-64 bg-gray-100 dark:bg-gray-800 h-full p-4">
      <nav>
        <ul className="space-y-2">
          {navigation.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="block px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
