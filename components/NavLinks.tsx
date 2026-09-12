'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Meetings', href: '/meetings' },
  { name: 'Current Meeting', href: '/meetings/current' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="flex gap-6">
      {links.map((link) => {
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={
              isActive
                ? 'font-semibold text-blue-600'
                : 'text-gray-700 hover:text-blue-600'
            }
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
}