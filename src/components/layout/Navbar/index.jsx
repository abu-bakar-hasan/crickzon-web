'use client';

import Link from 'next/link';
import { useState } from 'react';
import useCartStore from '@/store/cartStore';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShoppingCart,
  MenuIcon,
  Cancel,
} from '@hugeicons/core-free-icons';
import NavLinks from './NavLinks';
import NavUserMenu from './NavUserMenu';

export default function Navbar() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backgroundColor: '#ffffff',
          borderBottom: '1px solid #E5E7EB',
          height: '64px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            width: '100%',
            margin: '0 auto',
            padding: '0 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            height: '100%',
          }}
        >
          {/* ── LEFT: Logo ── */}
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: '22px',
              lineHeight: 1,
              flexShrink: 0,
            }}
          >
            <span style={{ color: '#0057A8', fontWeight: 600 }}>Crick</span>
            <span style={{ color: '#F5A623', fontWeight: 700 }}>zon</span>
          </Link>

          {/* ── CENTER: Nav links (desktop only) ── */}
          <NavLinks />

          {/* ── RIGHT: Actions ── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
            }}
          >
            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Shopping cart"
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                color: '#374151',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              className="cz-icon-btn"
            >
              <HugeiconsIcon
                icon={ShoppingCart}
                size={22}
                color="currentColor"
                strokeWidth={1.8}
              />
              {totalItems > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-9px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    backgroundColor: '#0057A8',
                    color: '#ffffff',
                    fontSize: '11px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 1,
                    pointerEvents: 'none',
                  }}
                >
                  {totalItems > 9 ? '9+' : totalItems}
                </span>
              )}
            </Link>

            {/* Account */}
            <NavUserMenu />

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                color: '#374151',
                display: 'flex',
                alignItems: 'center',
                transition: 'color 0.15s ease',
              }}
              className="cz-hamburger cz-icon-btn"
            >
              <HugeiconsIcon
                icon={mobileOpen ? Cancel : MenuIcon}
                size={22}
                color="currentColor"
                strokeWidth={1.8}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Drawer ── */}
      {mobileOpen && (
        <div
          className="cz-mobile-menu"
          style={{
            position: 'fixed',
            top: '64px',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #E5E7EB',
            zIndex: 49,
            padding: '16px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
          }}
        >
          <NavLinks mobile={true} onNavigate={() => setMobileOpen(false)} />
        </div>
      )}

      {/* ── Scoped styles ── */}
      <style>{`
        .cz-nav-link:hover {
          color: #0057A8 !important;
          border-bottom-color: #0057A8 !important;
        }
        .cz-icon-btn:hover {
          color: #0057A8 !important;
        }

        /* Desktop: show center nav, hide hamburger */
        @media (min-width: 768px) {
          .cz-desktop-nav { display: flex !important; }
          .cz-hamburger  { display: none  !important; }
          .cz-mobile-menu { display: none !important; }
        }

        /* Mobile: hide center nav, show hamburger */
        @media (max-width: 767px) {
          .cz-desktop-nav { display: none !important; }
          .cz-hamburger  { display: flex !important; }
        }
      `}</style>
    </>
  );
}
