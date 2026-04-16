'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function AllBrandsPage() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/brands')
      .then(res => setBrands(res.data.brands || res.data || []))
      .catch(err => console.error('Failed to load brands', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '64px' }}>

      {/* ── Header ── */}
      <div
        style={{
          backgroundColor: '#F8FAFC',
          padding: '48px 24px',
          textAlign: 'center',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <h1 style={{ fontSize: '36px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0' }}>
          All Brands
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
          Explore gear from top cricket brands
        </p>
      </div>

      {/* ── Grid ── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {loading ? (
            <div className="cz-brands-grid">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[16px] h-[160px]" />
              ))}
            </div>
          ) : brands.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6B7280' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🏷️</div>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>No brands found</p>
            </div>
          ) : (
            <div className="cz-brands-grid">
              {brands.map((brand) => (
                <Link
                  key={brand.slug || brand._id}
                  href={`/store/brand/${brand.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="cz-brand-card"
                    style={{
                      backgroundColor: '#ffffff',
                      border: '1px solid #E5E7EB',
                      borderRadius: '16px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    }}
                  >
                    {/* Image / Initial area */}
                    {brand.image ? (
                      <div
                        style={{
                          width: '100%',
                          height: '120px',
                          backgroundColor: '#F8FAFC',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: '16px',
                        }}
                      >
                        <img
                          src={brand.image}
                          alt={brand.name}
                          style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '120px',
                          backgroundColor: '#EBF3FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '32px',
                          fontWeight: 700,
                          color: '#0057A8',
                        }}
                      >
                        {brand.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                    {/* Brand name */}
                    <div
                      style={{
                        padding: '12px',
                        textAlign: 'center',
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0F172A',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em',
                      }}
                    >
                      {brand.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <style>{`
        .cz-brands-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .cz-brand-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: scale(1.02);
        }
        @media (max-width: 1024px) {
          .cz-brands-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cz-brands-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
