import Link from 'next/link';
import NavLinks from './NavLinks';

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900"
        >
          Sacrament Meeting Planner
        </Link>

        <NavLinks />
      </div>
    </header>
  );
}