'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import useCartStore from '@/store/cartStore';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  ShoppingCart,
  UserIcon,
  MenuIcon,
  Cancel,
} from '@hugeicons/core-free-icons';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Store', href: '/store' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuth();
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
            className="cz-desktop-nav"
          >
            {NAV_LINKS.map(({ label, href }) => {
              const isActive =
                href === '/' ? pathname === '/' : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  style={{
                    fontSize: '15px',
                    fontWeight: 500,
                    color: isActive ? '#0057A8' : '#374151',
                    textDecoration: 'none',
                    borderBottom: isActive
                      ? '2px solid #0057A8'
                      : '2px solid transparent',
                    paddingBottom: '2px',
                    transition: 'color 0.15s ease, border-color 0.15s ease',
                  }}
                  className="cz-nav-link"
                >
                  {label}
                </Link>
              );
            })}
          </nav>

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
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                aria-label="My account"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#374151',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'color 0.15s ease',
                }}
                className="cz-icon-btn"
              >
                <HugeiconsIcon
                  icon={UserIcon}
                  size={22}
                  color="currentColor"
                  strokeWidth={1.8}
                />
              </button>

              {dropdownOpen && (
                <div 
                  className="absolute right-0 top-full mt-3 bg-white border border-[#E5E7EB] rounded-[12px] shadow-sm min-w-[160px] py-2 flex flex-col z-[100] text-left"
                >
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-[#E5E7EB] mb-1">
                        <p className="text-[13px] text-[#0F172A] font-[600] truncate">Hi, {user.name}</p>
                      </div>
                      <Link 
                        href="/account" 
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-2 text-[14px] text-[#374151] hover:bg-gray-50 transition-colors font-[500] no-underline block"
                      >
                        My Account
                      </Link>
                      <button 
                        onClick={() => {
                          setDropdownOpen(false);
                          logout();
                        }}
                        className="px-4 py-2 text-[14px] text-[#EF4444] hover:bg-red-50 transition-colors font-[500] w-full text-left bg-transparent border-none cursor-pointer"
                      >
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link 
                        href="/login" 
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-2.5 text-[14px] text-[#0057A8] hover:bg-[#EBF3FF] transition-colors font-[600] no-underline block"
                      >
                        Login
                      </Link>
                      <Link 
                        href="/login" 
                        onClick={() => setDropdownOpen(false)}
                        className="px-4 py-2.5 text-[14px] text-[#374151] hover:bg-gray-50 transition-colors font-[500] no-underline block"
                      >
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>

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
          {NAV_LINKS.map(({ label, href }) => {
            const isActive =
              href === '/' ? pathname === '/' : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: '16px',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? '#0057A8' : '#374151',
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid #F3F4F6',
                  transition: 'color 0.15s ease',
                }}
              >
                {label}
              </Link>
            );
          })}
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