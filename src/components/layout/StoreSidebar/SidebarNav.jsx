'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  Home01Icon,
  Search01Icon,
  GridIcon,
  Award01Icon,
  ShoppingCart01Icon,
} from '@hugeicons/core-free-icons';
import useCartStore from '@/store/cartStore';

export const mainNav = [
  { href: '/',             icon: Home01Icon,    label: 'Home'       },
  { href: '/store',        icon: GridIcon,      label: 'Store'      },
  { href: '/store/search', icon: Search01Icon,  label: 'Search'     },
  { href: '/store/brands', icon: Award01Icon,   label: 'Brands',    extraClass: 'cz-desktop-only' },
];

// ─── Individual nav item ───────────────────────────────────────────────────
export function NavItem({ href, icon, label, active, extraClass = '' }) {
  return (
    <Link
      href={href}
      style={{ textDecoration: 'none', position: 'relative' }}
      className={`cz-nav-item-wrapper ${active ? 'cz-active' : ''} ${extraClass}`}
    >
      <div
        className="cz-nav-item"
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: active ? '#EBF3FF' : 'transparent',
          color: active ? '#0057A8' : '#9CA3AF',
          transition: 'background-color 0.15s ease, color 0.15s ease',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <HugeiconsIcon icon={icon} size={22} color="currentColor" strokeWidth={active ? 2 : 1.5} />
      </div>
      <span className="cz-tooltip">{label}</span>
    </Link>
  );
}

// ─── Main nav section (icons + cart) ──────────────────────────────────────
export default function SidebarNav({ pathname }) {
  const { items } = useCartStore();
  const cartCount = items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  const isActive = (href) => {
    if (href === '/') return pathname === '/';
    if (href === '/store') return pathname === '/store';
    return pathname.startsWith(href);
  };

  return (
    <div className="cz-sidebar-main-nav">
      {mainNav.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          active={isActive(item.href)}
          extraClass={item?.extraClass || ''}
        />
      ))}

      {/* Cart (with badge) */}
      <Link href="/cart" style={{ textDecoration: 'none', position: 'relative' }} className={`cz-nav-item-wrapper ${pathname === '/cart' ? 'cz-active' : ''}`}>
        <div
          className="cz-nav-item"
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: pathname === '/cart' ? '#EBF3FF' : 'transparent',
            color: pathname === '/cart' ? '#0057A8' : '#9CA3AF',
            transition: 'background-color 0.15s ease, color 0.15s ease',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <HugeiconsIcon
            icon={ShoppingCart01Icon}
            size={22}
            color="currentColor"
            strokeWidth={pathname === '/cart' ? 2 : 1.5}
          />
          {cartCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '6px',
                right: '6px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                backgroundColor: '#0057A8',
                color: '#ffffff',
                fontSize: '10px',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}
            >
              {cartCount > 9 ? '9+' : cartCount}
            </span>
          )}
        </div>
        <span className="cz-tooltip">Cart</span>
      </Link>
    </div>
  );
}
