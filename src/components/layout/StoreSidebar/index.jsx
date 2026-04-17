"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home01Icon,
  Search01Icon,
  ShoppingCart01Icon,
  UserIcon,
  ArrowLeft01Icon,
} from "@hugeicons/core-free-icons";

// Define the 5 explicit items here
const NAV_ITEMS = [
  { href: "/store", icon: Home01Icon, label: "Home" },
  { href: "/search", icon: Search01Icon, label: "Search" },
  { href: "/cart", icon: ShoppingCart01Icon, label: "Cart" },
  { href: "/account", icon: UserIcon, label: "Profile" },
  { href: "/", icon: ArrowLeft01Icon, label: "Back" },
];

export default function StoreSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 z-40 flex w-full flex-row items-center justify-around border-t border-gray-200 bg-white pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:top-0 lg:h-screen lg:w-[72px] lg:flex-col lg:justify-start lg:border-r lg:border-t-0 lg:pb-4 lg:pt-0 lg:shadow-none">
      {/* ── Logo (desktop only) ── */}
      <Link
        href="/"
        className="mb-3 hidden h-16 w-[72px] shrink-0 items-center justify-center border-b border-gray-200 lg:flex"
      >
        <span className="text-[22px] font-bold text-[#0057A8]">C</span>
      </Link>

      {/* ── Navigation ── */}
      <nav className="flex w-full flex-row justify-around lg:flex-1 lg:flex-col lg:items-center lg:justify-start lg:gap-2">
        {NAV_ITEMS.map((item) => {
          // Exact match for root-level links, loose match for sub-routes
          const isActive =
            pathname === item.href ||
            (pathname.startsWith(item.href) &&
              item.href !== "/" &&
              item.href !== "/store");
          const Icon = item.icon;

          return (
            <Link
              key={item.label}
              href={item.href}
              className="group relative flex flex-col items-center justify-center gap-1 p-2 transition-colors lg:h-11 lg:w-11 lg:rounded-md lg:hover:bg-gray-100"
            >
              {/* Icon */}
              <Icon
                className={`h-6 w-6 lg:h-5 lg:w-5 ${isActive ? "text-pink-600" : "text-gray-500 group-hover:text-gray-900"}`}
              />

              {/* Mobile Label (Hidden on Desktop) */}
              <span
                className={`text-[10px] font-medium lg:hidden ${isActive ? "text-pink-600" : "text-gray-500 group-hover:text-gray-900"}`}
              >
                {item.label}
              </span>

              {/* Desktop Tooltip (Hidden on Mobile) */}
              <span className="pointer-events-none absolute left-[calc(100%+12px)] top-1/2 z-50 -translate-y-1/2 whitespace-nowrap rounded-md bg-slate-900 px-2.5 py-1 text-xs font-medium text-white opacity-0 transition-opacity duration-150 group-hover:opacity-100 max-lg:hidden">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
