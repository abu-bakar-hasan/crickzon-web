"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserIcon, ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import SidebarNav, { NavItem } from "./SidebarNav";

export default function StoreSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="fixed bottom-0 left-0 right-0 z-40 flex h-16 w-full flex-row items-center justify-around border-t border-gray-200 bg-white px-1 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-4px_16px_rgba(0,0,0,0.06)] lg:top-0 lg:bottom-auto lg:h-screen lg:w-[72px] lg:flex-col lg:justify-start lg:border-r lg:border-t-0 lg:px-0 lg:pb-4 lg:shadow-none">
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

      {/* ── External Styles (Maintains zero edits to other files) ── */}
      <style>{`
        /* Main content offset */
        .cz-store-main {
          padding-bottom: 64px;
        }
        
        @media (min-width: 1024px) {
          .cz-store-main {
            padding-bottom: 0;
            margin-left: 72px;
          }
        }

        /* External NavItem styles */
        .cz-nav-item {
          width: 44px !important;
          height: 44px !important;
        }

        .cz-nav-item:hover {
          background-color: #F3F4F6 !important;
          color: #374151 !important;
        }

        .cz-nav-item-wrapper {
          position: relative;
        }

        /* Tooltip styles */
        .cz-tooltip {
          position: absolute;
          left: 50%;
          bottom: calc(100% + 8px);
          transform: translateX(-50%);
          background-color: #0F172A;
          color: #ffffff;
          font-size: 12px;
          font-weight: 500;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.15s ease;
          z-index: 50;
        }

        .cz-nav-item-wrapper:hover .cz-tooltip {
          opacity: 1;
        }

        @media (min-width: 1024px) {
          .cz-nav-item {
            width: auto !important;
            height: auto !important;
          }
          
          .cz-tooltip {
            left: calc(100% + 12px);
            top: 50%;
            bottom: auto;
            transform: translateY(-50%);
          }
        }
      `}</style>
    </>
  );
}
