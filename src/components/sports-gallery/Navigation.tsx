"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { name: "Gallery", path: "/sports-gallery" },
    { name: "Featured", path: "/sports-gallery/featured" },
    { name: "New Arrivals", path: "/sports-gallery/new" },
    { name: "Collections", path: "/sports-gallery/collections" },
  ];

  return (
    <nav className="bg-gray-800 rounded-lg p-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex items-center mb-4 md:mb-0">
          <Link href="/sports-gallery" className="text-xl font-bold text-white">
            Sports Gallery
          </Link>
        </div>

        <div className="flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`px-4 py-2 rounded-md text-sm ${
                pathname === item.path
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
