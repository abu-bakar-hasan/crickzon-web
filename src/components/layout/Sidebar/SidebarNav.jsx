'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingCart01Icon } from '@hugeicons/core-free-icons';
import useCartStore from '@/store/cartStore';
import NavItem from './NavItem';
import { mainNav } from './sidebar.constants';

/**
 * Renders all navigation icons in the sidebar: main nav items + shopping cart.
 * Active state is computed from the current pathname.
 */
export default function SidebarNav() {
  const pathname = usePathname();
  const { items } = useCartStore();
  const cartCount = items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const isCartActive = pathname === '/cart';

  // Exact match for '/' and '/store', prefix match for everything else.
  function isActive(href) {
    if (href === '/' || href === '/store') return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="cz-sidebar-main-nav">
      {mainNav.map((item) => (
        <NavItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          label={item.label}
          isActive={isActive(item.href)}
          desktopOnly={item.desktopOnly ?? false}
        />
      ))}

      {/* Cart button — rendered separately because it carries a badge */}
      <Link
        href="/cart"
        aria-label="Shopping cart"
        style={{ textDecoration: 'none', position: 'relative' }}
        className={`cz-nav-item-wrapper ${isCartActive ? 'cz-active' : ''}`}
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
            backgroundColor: isCartActive ? '#EBF3FF' : 'transparent',
            color: isCartActive ? '#0057A8' : '#9CA3AF',
            transition: 'background-color 0.15s ease, color 0.15s ease',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <HugeiconsIcon
            icon={ShoppingCart01Icon}
            size={22}
            color="currentColor"
            strokeWidth={isCartActive ? 2 : 1.5}
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
