import Link from 'next/link';

const CATEGORIES = [
  { name: 'Bats', icon: '🏏', slug: 'bats' },
  { name: 'Balls', icon: '🎯', slug: 'balls' },
  { name: 'Protective Gear', icon: '🛡️', slug: 'protective-gear' },
  { name: 'Footwear', icon: '👟', slug: 'footwear' },
];

export default function CategorySection() {
  return (
    <section style={{ backgroundColor: '#ffffff', padding: '48px 24px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>Shop by Category</h2>
          <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>Find the perfect gear for your game</p>
        </div>

        <div className="cz-categories-grid">
          {CATEGORIES.map((cat) => (
            <Link 
              key={cat.slug} 
              href={`/store/c/${cat.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <div 
                className="cz-category-card"
                style={{
                  backgroundColor: '#F0F4F8',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <span style={{ fontSize: '32px' }}>{cat.icon}</span>
                <span style={{ fontSize: '15px', fontWeight: 600, color: '#0F172A' }}>{cat.name}</span>
                <span style={{ fontSize: '13px', color: '#0057A8' }}>Shop Now &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      
      <style>{`
        .cz-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .cz-category-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
        }

        @media (max-width: 768px) {
          .cz-categories-grid {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            padding-bottom: 16px;
            margin: 0 -24px;
            padding: 0 24px 16px 24px;
          }
          .cz-category-card {
            min-width: 180px;
            flex-shrink: 0;
            scroll-snap-align: start;
          }
        }
      `}</style>
    </section>
  );
}
