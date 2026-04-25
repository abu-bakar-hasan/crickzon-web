'use client';

import StoreSidebar from '@/components/layout/StoreSidebar';

/**
 * AppShell — wraps every page in the global sidebar layout.
 * Rendered inside the root layout (server component) via this thin client bridge.
 */
export default function AppShell({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <StoreSidebar />
      <main
        className="cz-store-main"
        style={{ flex: '1 1 0%', minHeight: '100vh', minWidth: 0 }}
      >
        {children}
      </main>
    </div>
  );
}
