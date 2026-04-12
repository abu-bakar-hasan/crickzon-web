import Link from 'next/link';
import Image from 'next/image';
import ProductCard from '@/components/ui/ProductCard';

export const metadata = {
  title: 'Crickzon - Where Skill Meets Power',
};

const CATEGORIES = [
  { name: 'Bats', icon: '🏏', slug: 'bats' },
  { name: 'Balls', icon: '🎯', slug: 'balls' },
  { name: 'Protective Gear', icon: '🛡️', slug: 'protective-gear' },
  { name: 'Footwear', icon: '👟', slug: 'footwear' },
];

export default function LandingPage() {
  // Temporary mock data for New Arrivals (until API is connected)
  const mockProducts = [
    {
      id: '1',
      name: 'Pro Series English Willow Bat',
      brand: 'Crickzon Exclusive',
      minPrice: 12999,
      maxPrice: 12999,
      slug: 'pro-series-english-willow',
      images: ['https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp'], // Add real mock if available
    },
    {
      id: '2',
      name: 'Premium Leather Cricket Ball',
      brand: 'Crickzon',
      minPrice: 499,
      maxPrice: 499,
      slug: 'premium-leather-ball',
      images: ['https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp'],
    },
    {
      id: '3',
      name: 'Pro Batting Gloves',
      brand: 'Crickzon',
      minPrice: 1499,
      maxPrice: 1499,
      slug: 'pro-batting-gloves',
      images: ['https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp'],
    },
    {
      id: '4',
      name: 'All-Terrain Cricket Spikes',
      brand: 'Crickzon Sports',
      minPrice: 3499,
      maxPrice: 3499,
      slug: 'all-terrain-spikes',
      images: ['https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp'],
    },
  ];

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* ── Section 1: Above hero text & Player image ── */}
      <section style={{ position: 'relative', width: '100%', padding: '16px 24px' }}>
        <div 
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
            zIndex: 10, // Text behind the image
          }}
        >
          {/* Left Text */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#374151' }}>Built with</span>
            <span style={{ fontSize: '52px', fontWeight: 900, fontStyle: 'italic', color: '#000000', lineHeight: 1 }}>STYLE</span>
          </div>

          {/* Right Text */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#374151' }}>Made for</span>
            <span style={{ fontSize: '52px', fontWeight: 900, fontStyle: 'italic', color: '#000000', lineHeight: 1 }}>SKILL</span>
          </div>
        </div>

        {/* Player Image Overlapping */}
        <div
          style={{
            position: 'absolute',
            top: '0', 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30, // Above the hero card
            pointerEvents: 'none',
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          <div style={{ position: 'relative', height: '420px', width: '420px', marginTop: '-20px' }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://ik.imagekit.io/crickzon/batsman-hero-pose2.png" 
              alt="Cricket Player"
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Hero Card ── */}
      <section style={{ position: 'relative', zIndex: 20 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div 
            style={{
              backgroundColor: '#0057A8',
              borderRadius: '24px',
              padding: '40px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              position: 'relative',
              overflow: 'visible', // allow player image to overlap
              minHeight: '360px',
            }}
            className="cz-hero-card-inner"
          >
            {/* Left side content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', maxWidth: '400px', zIndex: 40 }}>
              <div 
                style={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.1)', 
                  color: '#ffffff', 
                  fontSize: '12px', 
                  padding: '4px 12px', 
                  borderRadius: '50px',
                  marginBottom: '16px'
                }}
              >
                New Arrivals
              </div>
              <h1 
                style={{ 
                  fontSize: '36px', 
                  fontWeight: 700, 
                  color: '#ffffff', 
                  lineHeight: 1.2,
                  whiteSpace: 'pre-line',
                  margin: '0 0 12px 0'
                }}
              >
                Where Skill{'\n'}Meets Power
              </h1>
              <p style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.8)', margin: '0 0 24px 0' }}>
                Shop into the future of cricket accessories today.
              </p>
              <Link 
                href="/store"
                style={{ 
                  backgroundColor: '#ffffff', 
                  color: '#0057A8', 
                  padding: '12px 24px', 
                  borderRadius: '50px', 
                  fontSize: '14px', 
                  fontWeight: 600,
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                New Drops &rarr;
              </Link>
            </div>

            {/* Right side content */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 40 }}>
              
              {/* Feature Icons Top Right */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }} className="cz-hero-features">
                {[
                  { icon: '⭐', label: 'Trusted Brand' },
                  { icon: '💎', label: 'Top Quality' },
                  { icon: '⚡', label: 'Quick Delivery' },
                ].map((feature, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '12px' }}>{feature.icon}</span>
                    <span style={{ fontSize: '10px', color: 'rgba(255, 255, 255, 0.7)' }}>{feature.label}</span>
                  </div>
                ))}
              </div>

              {/* Floating Product Card */}
              <div 
                style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '16px',
                  padding: '16px',
                  width: '160px',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px'
                }}
              >
                <div style={{ backgroundColor: '#F8FAFC', borderRadius: '8px', height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px' }}>
                 {/* eslint-disable-next-line @next/next/no-img-element */}
                 <img 
                    src="https://ik.imagekit.io/crickzon/product4.png" 
                    alt="Cricket Jersey"
                    style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>
                <div>
                  <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#0F172A', margin: 0 }}>Cricket Jersey</h4>
                  <p style={{ fontSize: '11px', color: '#6B7280', margin: '2px 0 8px 0' }}>Comfortable Sportswear</p>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <Link href="/store/p/cricket-jersey" style={{ textDecoration: 'none' }}>
                    <span 
                      style={{ 
                        backgroundColor: '#0057A8', 
                        color: '#ffffff', 
                        fontSize: '11px', 
                        padding: '4px 12px', 
                        borderRadius: '20px',
                        display: 'inline-block'
                      }}
                    >
                      Shop Now
                    </span>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: Featured Categories ── */}
      <section style={{ backgroundColor: '#ffffff', padding: '48px 24px', position: 'relative', zIndex: 10 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>Shop by Category</h2>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>Find the perfect gear for your game</p>
          </div>

          {/* Categories Grid */}
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
      </section>

      {/* ── Section 4: Featured Products ── */}
      <section style={{ backgroundColor: '#F8FAFC', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          
          {/* Header & View All */}
          <div className="cz-products-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
            <div style={{ textAlign: 'center', width: '100%' }} className="cz-products-header-title">
              <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>New Arrivals</h2>
              <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>Fresh gear just dropped</p>
            </div>
            
            <Link 
              href="/store"
              className="cz-view-all-btn"
              style={{
                display: 'inline-block',
                border: '1px solid #E5E7EB',
                padding: '8px 16px',
                borderRadius: '50px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#374151',
                textDecoration: 'none',
                transition: 'background-color 0.2s ease',
                whiteSpace: 'nowrap'
              }}
            >
              View All
            </Link>
          </div>

          <div className="cz-products-grid">
            {mockProducts.map((product) => (
              <ProductCard
                key={product.id}
                name={product.name}
                brand={product.brand}
                images={product.images}
                minPrice={product.minPrice}
                maxPrice={product.maxPrice}
                slug={product.slug}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── Section 5: Banner Strip ── */}
      <section style={{ backgroundColor: '#0057A8', padding: '20px 24px' }}>
        <div 
          style={{ 
            maxWidth: '1280px', 
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
          className="cz-banner-strip"
        >
          <div className="cz-banner-item">
            <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>🚚 Free Shipping on orders above ₹999</span>
          </div>
          <div className="cz-banner-divider"></div>
          <div className="cz-banner-item">
            <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>↩️ Easy 7-day Returns</span>
          </div>
          <div className="cz-banner-divider"></div>
          <div className="cz-banner-item">
            <span style={{ fontSize: '14px', color: '#ffffff', fontWeight: 500 }}>✅ 100% Authentic Products</span>
          </div>
        </div>
      </section>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* Categories Grid */
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

        /* Products Grid */
        .cz-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .cz-products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cz-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          
          .cz-products-header {
            flex-direction: column;
            align-items: center !important;
            gap: 16px;
          }
          
          .cz-products-header-title {
            text-align: center;
          }
        }

        /* Banner Strip */
        .cz-banner-divider {
          width: 1px;
          height: 16px;
          background-color: rgba(255,255,255,0.3);
          margin: 0 24px;
        }
        
        .cz-banner-item {
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .cz-banner-strip {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
          .cz-banner-divider {
            display: none;
          }
        }
        
        /* Hero card responsiveness */
        @media (max-width: 850px) {
           .cz-hero-card-inner {
              flex-direction: column;
              align-items: center !important;
              text-align: center;
              padding: 40px 24px !important;
              gap: 40px;
           }
           .cz-hero-card-inner > div {
              align-items: center !important;
              text-align: center;
           }
           .cz-hero-features {
               justify-content: center;
           }
        }
        
        @media (max-width: 600px) {
            .cz-hero-features {
               flex-direction: column;
               gap: 8px !important;
               margin-bottom: 24px !important;
            }
        }
      `}</style>

    </div>
  );
}
