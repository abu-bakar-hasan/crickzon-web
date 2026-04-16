'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Store', href: '/store' },
];

/**
 * Renders navigation links for both the desktop bar and the mobile drawer.
 * Pass `mobile` to switch to the mobile-drawer styling.
 */
export default function NavLinks({ mobile = false, onNavigate }) {
  const pathname = usePathname();

  if (mobile) {
    return (
      <>
        {NAV_LINKS.map(({ label, href }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
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
      </>
    );
  }

  return (
    <nav
      style={{ display: 'flex', alignItems: 'center', gap: '32px' }}
      className="cz-desktop-nav"
    >
      {NAV_LINKS.map(({ label, href }) => {
        const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              fontSize: '15px',
              fontWeight: 500,
              color: isActive ? '#0057A8' : '#374151',
              textDecoration: 'none',
              borderBottom: isActive ? '2px solid #0057A8' : '2px solid transparent',
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
  );
}
