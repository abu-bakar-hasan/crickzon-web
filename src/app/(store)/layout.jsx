'use client';

import StoreSidebar from '@/components/layout/StoreSidebar';

export default function StoreLayout({ children }) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <StoreSidebar />
      <main className="cz-store-main" style={{ flex: '1 1 0%', minHeight: '100vh', minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}
