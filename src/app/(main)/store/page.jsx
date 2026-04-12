import Link from 'next/link';

export const metadata = {
  title: 'Store - Crickzon',
};

const BRANDS = [
  { name: 'SS', slug: 'ss' },
  { name: 'MRF', slug: 'mrf' },
  { name: 'SG', slug: 'sg' },
  { name: 'Kookaburra', slug: 'kookaburra' },
  { name: 'Gray-Nicolls', slug: 'gray-nicolls' },
  { name: 'Dukes', slug: 'dukes' },
];

const CATEGORIES = [
  { name: 'Bats', icon: '🏏', slug: 'bats' },
  { name: 'Balls', icon: '🎯', slug: 'balls' },
  { name: 'Protective Gear', icon: '🛡️', slug: 'protective-gear' },
  { name: 'Footwear', icon: '👟', slug: 'footwear' },
  { name: 'Accessories', icon: '🎒', slug: 'accessories' },
  { name: 'Jerseys', icon: '👕', slug: 'jerseys' },
];

export default function StoreHome() {
  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '64px' }}>
      
      {/* ── Header ── */}
      <div 
        style={{ 
          backgroundColor: '#F8FAFC', 
          padding: '48px 24px', 
          textAlign: 'center',
          borderBottom: '1px solid #E5E7EB'
        }}
      >
        <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0' }}>Store</h1>
        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>Discover premium cricket gear and apparel.</p>
      </div>

      {/* ── Section 1: Brands ── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>Shop by Brand</h2>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>Explore gear from top cricket brands</p>
          </div>

          <div className="cz-brands-grid">
            {BRANDS.map((brand) => (
              <Link 
                key={brand.slug} 
                href={`/store/brand/${brand.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div 
                  className="cz-brand-card"
                  style={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #E5E7EB',
                    borderRadius: '16px',
                    padding: '24px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '16px',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <div 
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '50%',
                      backgroundColor: '#EBF3FF',
                      color: '#0057A8',
                      fontSize: '20px',
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {brand.name.charAt(0)}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600, color: '#0F172A', textAlign: 'center' }}>
                    {brand.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 2: Categories ── */}
      <section style={{ padding: '0 24px 64px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>Shop by Category</h2>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>Find the perfect gear for your game</p>
          </div>

          <div className="cz-store-categories-grid">
            {CATEGORIES.map((cat) => (
              <Link 
                key={cat.slug} 
                href={`/store/c/${cat.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <div 
                  className="cz-store-category-card"
                  style={{
                    backgroundColor: '#F0F4F8',
                    borderRadius: '20px',
                    padding: '32px 24px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '16px',
                    transition: 'background-color 0.2s ease, transform 0.2s ease',
                  }}
                >
                  <span style={{ fontSize: '40px' }}>{cat.icon}</span>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span 
                      className="cz-scc-title"
                      style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', transition: 'color 0.2s ease' }}
                    >
                      {cat.name}
                    </span>
                    <span 
                      className="cz-scc-count"
                      style={{ fontSize: '13px', color: '#6B7280', transition: 'color 0.2s ease' }}
                    >
                      24 Products
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* Brands Grid */
        .cz-brands-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }

        .cz-brand-card:hover {
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }

        @media (max-width: 1024px) {
          .cz-brands-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 768px) {
          .cz-brands-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 20px;
            margin: 0 -24px;
            padding: 0 24px 20px 24px;
            gap: 16px;
          }
          .cz-brand-card {
            min-width: 160px;
            flex-shrink: 0;
            scroll-snap-align: start;
          }
        }

        /* Store Categories Grid */
        .cz-store-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .cz-store-category-card:hover {
          background-color: #0057A8 !important;
          transform: translateY(-4px);
        }

        .cz-store-category-card:hover .cz-scc-title,
        .cz-store-category-card:hover .cz-scc-count {
          color: #ffffff !important;
        }

        @media (max-width: 1024px) {
          .cz-store-categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cz-store-categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        
        @media (max-width: 480px) {
          .cz-store-categories-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
