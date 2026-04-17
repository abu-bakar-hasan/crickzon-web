'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserIcon, ArrowLeft01Icon } from '@hugeicons/core-free-icons';
import SidebarNav, { NavItem } from './SidebarNav';

export default function StoreSidebar() {
  const pathname = usePathname();

  return (
    <>
      <aside className="cz-sidebar">

        {/* ── Logo (desktop only) ── */}
        <Link href="/" className="cz-sidebar-logo">
          <span style={{ fontSize: '22px', fontWeight: 700, color: '#0057A8' }}>C</span>
        </Link>

        {/* ── Main nav icons ── */}
        <SidebarNav pathname={pathname} />

        {/* ── Bottom icons ── */}
        <div className="cz-sidebar-bottom">
          <NavItem
            href="/account"
            icon={UserIcon}
            label="Account"
            active={pathname.startsWith('/account')}
          />
          {/* Back to site — hidden on mobile */}
          <NavItem
            href="/"
            icon={ArrowLeft01Icon}
            label="Back to site"
            active={false}
            extraClass="cz-sidebar-back"
          />
        </div>
      </aside>

      {/* ── Scoped styles ── */}
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

        /* ── Nav item hover ── */
        .cz-nav-item:hover {
          background-color: #F3F4F6 !important;
          color: #374151 !important;
        }

        .cz-nav-item-wrapper {
          position: relative;
        }

        /* ── Tooltip: appears to the RIGHT on desktop ── */
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
           MOBILE / TABLET: bottom nav (< 1024px)
           ════════════════════════════════ */
        @media (max-width: 1023px) {

          /* Convert sidebar → bottom bar */
          .cz-sidebar {
            top: auto !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            width: 100% !important;
            height: 64px !important;
            flex-direction: row !important;
            align-items: center !important;
            justify-content: space-around !important;
            padding: 0 4px !important;
            padding-bottom: env(safe-area-inset-bottom, 0px) !important;
            border-right: none !important;
            border-top: 1px solid #E5E7EB !important;
            box-shadow: 0 -4px 16px rgba(0,0,0,0.06) !important;
          }

          /* Hide the vertical logo */
          .cz-sidebar-logo {
            display: none !important;
          }

          /* Main nav: horizontal row */
          .cz-sidebar-main-nav {
            flex-direction: row !important;
            flex: unset !important;
            gap: 0 !important;
            align-items: center !important;
          }

          /* Bottom section: inline with main nav */
          .cz-sidebar-bottom {
            flex-direction: row !important;
            gap: 0 !important;
            align-items: center !important;
          }

          /* Hide "Back to site" on small screens — not useful in bottom bar */
          .cz-sidebar-back {
            display: none !important;
          }

          /* Tooltip: appear ABOVE icons on mobile */
          .cz-tooltip {
            left: 50% !important;
            top: auto !important;
            bottom: calc(100% + 8px) !important;
            transform: translateX(-50%) !important;
          }

          /* Nav item size — slightly compact on mobile */
          .cz-nav-item {
            width: 44px !important;
            height: 44px !important;
          }

          /* Main content: no left margin, add bottom padding for the bar */
          .cz-store-main {
            margin-left: 0 !important;
            padding-bottom: 64px !important;
          }
        }
      `}</style>
    </>
  );
}
