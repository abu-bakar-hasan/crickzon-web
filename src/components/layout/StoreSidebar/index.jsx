"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import SidebarNav, { NavItem } from "./SidebarNav";

export default function StoreSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed bottom-0 left-0 right-0 z-40 flex w-full flex-row items-center justify-around border-t border-gray-200 bg-white px-1 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:top-0 lg:bottom-auto lg:h-screen lg:w-[72px] lg:flex-col lg:justify-start lg:border-r lg:border-t-0 lg:px-0 lg:pb-4 lg:shadow-none">
      {/* ── Logo (desktop only) ── */}
      <Link
        href="/"
        className="hidden lg:mb-3 lg:flex lg:h-16 lg:w-[72px] lg:shrink-0 lg:items-center lg:justify-center lg:border-b lg:border-gray-200"
      >
        <span className="text-[22px] font-bold text-[#0057A8]">C</span>
      </Link>

      {/* ── Main nav icons ── */}
      <div className="flex flex-row items-center gap-0 lg:flex-1 lg:flex-col lg:gap-2">
        <SidebarNav pathname={pathname} />
      </div>

      {/* ── Bottom icons ── */}
      <div className="flex flex-row items-center gap-0 lg:flex-col lg:gap-2">
        <NavItem
          href="/account"
          icon={UserIcon}
          label="Account"
          active={pathname.startsWith("/account")}
        />
        {/* Back to site — hidden on mobile */}
        <div className="hidden lg:block">
          <NavItem
            href="/"
            icon={ArrowLeft01Icon}
            label="Back to site"
            active={false}
          />
        </div>
      </div>
    </aside>
  );
}
