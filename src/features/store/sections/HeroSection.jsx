import Link from 'next/link';

export default function HeroSection() {
  return (
    <>
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
            zIndex: 10,
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#374151' }}>Built with</span>
            <span style={{ fontSize: '52px', fontWeight: 900, fontStyle: 'italic', color: '#000000', lineHeight: 1 }}>STYLE</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: '20px', fontWeight: 400, color: '#374151' }}>Made for</span>
            <span style={{ fontSize: '52px', fontWeight: 900, fontStyle: 'italic', color: '#000000', lineHeight: 1 }}>SKILL</span>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            top: '0', 
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 30,
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
              overflow: 'visible',
              minHeight: '360px',
            }}
            className="cz-hero-card-inner"
          >
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

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', zIndex: 40 }}>
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
                  <Link href="/store" style={{ textDecoration: 'none' }}>
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

      <style>{`
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
    </>
  );
}
