'use client';

import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';

/**
 * A single icon button in the sidebar.
 * On desktop it shows a tooltip on hover.
 * On mobile (bottom bar) the tooltip becomes a visible label below the icon.
 */
export default function NavItem({ href, icon, label, isActive, desktopOnly = false }) {
  return (
    <Link
      href={href}
      aria-label={label}
      style={{ textDecoration: 'none', position: 'relative' }}
      className={[
        'cz-nav-item-wrapper',
        isActive ? 'cz-active' : '',
        desktopOnly ? 'cz-desktop-only' : '',
      ].join(' ').trim()}
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
          backgroundColor: isActive ? '#EBF3FF' : 'transparent',
          color: isActive ? '#0057A8' : '#9CA3AF',
          transition: 'background-color 0.15s ease, color 0.15s ease',
          cursor: 'pointer',
          position: 'relative',
        }}
      >
        <HugeiconsIcon
          icon={icon}
          size={22}
          color="currentColor"
          strokeWidth={isActive ? 2 : 1.5}
        />
      </div>

      {/* Desktop: tooltip on hover. Mobile: always-visible label. */}
      <span className="cz-tooltip">{label}</span>
    </Link>
  );
}
