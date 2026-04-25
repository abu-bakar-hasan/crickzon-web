'use client';

import Link from 'next/link';

/**
 * The "C" monogram logo in the top of the sidebar.
 * Only visible on desktop — hidden on mobile bottom bar via CSS.
 */
export default function SidebarLogo() {
  return (
    <Link href="/" className="cz-sidebar-logo" aria-label="Go to home">
      <span style={{ fontSize: '22px', fontWeight: 700, color: '#0057A8' }}>C</span>
    </Link>
  );
}
