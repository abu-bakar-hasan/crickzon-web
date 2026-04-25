export default function BannerStrip() {
  return (
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
      
      <style>{`
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
      `}</style>
    </section>
  );
}
