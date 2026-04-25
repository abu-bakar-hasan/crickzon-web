'use client';

import { usePathname } from 'next/navigation';
import { UserIcon } from '@hugeicons/core-free-icons';
import SidebarLogo from './SidebarLogo';
import SidebarNav from './SidebarNav';
import NavItem from './NavItem';

/**
 * Global sidebar — fixed on the left on desktop, bottom bar on mobile/tablet.
 * Rendered once in AppShell so it appears on every page.
 */
export default function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="cz-sidebar">
        {/* Logo — desktop only */}
        <SidebarLogo />

        {/* Main navigation icons */}
        <SidebarNav />

        {/* Bottom section: account */}
        <div className="cz-sidebar-bottom">
          <NavItem
            href="/account"
            icon={UserIcon}
            label="Account"
            isActive={pathname.startsWith('/account')}
          />
        </div>
      </aside>

      <style>{`
        /* ════════════════════════════════
           DESKTOP: left sidebar (≥ 1024px)
           ════════════════════════════════ */
        .cz-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 72px;
          height: 100vh;
          background-color: #ffffff;
          border-right: 1px solid #E5E7EB;
          z-index: 40;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-bottom: 16px;
        }

        .cz-sidebar-logo {
          width: 72px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          flex-shrink: 0;
          border-bottom: 1px solid #E5E7EB;
          margin-bottom: 12px;
        }

        .cz-sidebar-main-nav {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          flex: 1;
        }

        .cz-sidebar-bottom {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
        }

        /* Nav item hover */
        .cz-nav-item:hover {
          background-color: #F3F4F6 !important;
          color: #374151 !important;
        }

        .cz-nav-item-wrapper {
          position: relative;
        }

        /* Tooltip — appears to the RIGHT on desktop */
        .cz-tooltip {
          position: absolute;
          left: calc(100% + 12px);
          top: 50%;
          transform: translateY(-50%);
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

        /* Main content offset — desktop */
        .cz-store-main {
          margin-left: 72px;
        }

        /* ════════════════════════════════
           MOBILE / TABLET: bottom bar (< 1024px)
           ════════════════════════════════ */
        @media (max-width: 1023px) {

          /* Sidebar becomes a bottom bar */
          .cz-sidebar {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 70px !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-around !important;
            padding: 0 4px !important;
            padding-bottom: env(safe-area-inset-bottom, 0px) !important;
            border-right: none !important;
            border-top: 1px solid #E5E7EB !important;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.06) !important;
          }

          /* Logo is vertical — hide it on mobile */
          .cz-sidebar-logo {
            display: none !important;
          }

          /* Both nav sections distribute their items evenly in the row */
          .cz-sidebar-main-nav,
          .cz-sidebar-bottom {
            display: contents !important;
          }

          /* Desktop-only items are hidden */
          .cz-nav-item-wrapper.cz-desktop-only {
            display: none !important;
          }

          /* Each item becomes a column (icon on top, label below) */
          .cz-nav-item-wrapper {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            gap: 2px !important;
            width: 20% !important;
          }

          /* Tooltip becomes a static visible label */
          .cz-tooltip {
            position: static !important;
            opacity: 1 !important;
            background: transparent !important;
            color: #9CA3AF !important;
            font-size: 11px !important;
            padding: 0 !important;
            transform: none !important;
            pointer-events: auto !important;
            font-weight: 500 !important;
          }

          /* Active item colours */
          .cz-nav-item-wrapper.cz-active .cz-tooltip {
            color: #0057A8 !important;
          }
          .cz-nav-item-wrapper.cz-active .cz-nav-item {
            color: #0057A8 !important;
          }

          /* Compact icon size with no background */
          .cz-nav-item {
            width: 32px !important;
            height: 32px !important;
            background-color: transparent !important;
          }

          /* Content area: no left margin, pad bottom so it clears the bar */
          .cz-store-main {
            margin-left: 0 !important;
            padding-bottom: 70px !important;
          }
        }
      `}</style>
    </>
  );
}
