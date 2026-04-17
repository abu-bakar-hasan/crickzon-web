'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function BrandsSlider() {
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(true);

  // Fetch brands
  useEffect(() => {
    api.get('/brands')
      .then(res => setBrands(res.data.brands || res.data || []))
      .catch(err => console.error('Failed to load brands', err))
      .finally(() => setBrandsLoading(false));
  }, []);

  return (
    <>
      <section style={{ padding: '48px 0 24px 0' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>Shop by Brand</h2>
              <p style={{ fontSize: '14px', color: '#6B7280', margin: 0 }}>Explore gear from top cricket brands</p>
            </div>
            <Link href="/store/brands" style={{ fontSize: '14px', fontWeight: 600, color: '#0057A8', textDecoration: 'none' }}>View All</Link>
          </div>
        </div>

        {brandsLoading ? (
            <div style={{ display: 'flex', padding: '0 24px', gap: '16px', overflowX: 'auto', maxWidth: '1280px', margin: '0 auto' }}>
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[16px] min-w-[150px] h-[150px]"></div>
              ))}
            </div>
          ) : (
            <div className="cz-free-slider cz-hide-scrollbar" style={{ padding: '0 24px', maxWidth: '1280px', margin: '0 auto' }}>
              {brands.map((brand) => (
                <Link
                  key={brand.slug || brand._id}
                  href={`/store/brand/${brand.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="cz-brand-slider-card"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                      width: '150px',
                      flexShrink: 0,
                    }}
                  >
                    {/* Image / Initial area */}
                    {brand.image ? (
                      <div style={{
                        width: '100%',
                        height: '110px',
                        backgroundColor: '#F8FAFC',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '16px',
                      }}>
                        <img
                          src={brand.image}
                          alt={brand.name}
                          style={{
                            maxWidth: '100%',
                            maxHeight: '100%',
                            objectFit: 'contain',
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '110px',
                        backgroundColor: '#EBF3FF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '32px',
                        fontWeight: 700,
                        color: '#0057A8',
                      }}>
                        {brand.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Brand name */}
                    <div style={{
                      padding: '12px',
                      textAlign: 'center',
                      fontSize: '13px',
                      fontWeight: 700,
                      color: '#0F172A',
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {brand.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
      </section>

      <style>{`
        /* Free slider for Brands */
        .cz-free-slider {
          display: flex;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          gap: 16px;
        }

        .cz-free-slider > * {
          scroll-snap-align: start;
        }

        /* Hide scrollbar for free slider */
        .cz-hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .cz-hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .cz-brand-slider-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.06);
          transform: translateY(-2px);
        }
      `}</style>
    </>
  );
}
