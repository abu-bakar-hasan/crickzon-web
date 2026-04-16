'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

import api from '@/lib/axios';

export default function StoreHome() {
  const [brands, setBrands] = useState([]);
  const [brandsLoading, setBrandsLoading] = useState(true);

  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch brands
  useEffect(() => {
    api.get('/brands')
      .then(res => setBrands(res.data.brands || res.data || []))
      .catch(err => console.error('Failed to load brands', err))
      .finally(() => setBrandsLoading(false));
  }, []);

  // Fetch categories
  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.categories || res.data || []))
      .catch(err => console.error('Failed to load categories', err))
      .finally(() => setCategoriesLoading(false));
  }, []);

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

          {brandsLoading ? (
            <div className="cz-brands-grid">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[16px] h-[160px]"></div>
              ))}
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
                      <div style={{
                        width: '100%',
                        height: '120px',
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
                        height: '120px',
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
                    }}>
                      {brand.name}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Section 2: Categories ── */}
      <section style={{ padding: '0 24px 64px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>Shop by Category</h2>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>Find the perfect gear for your game</p>
          </div>

          {categoriesLoading ? (
             <div className="cz-store-categories-grid">
               {Array.from({ length: 4 }).map((_, idx) => (
                 <div key={idx} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[16px] h-[200px]"></div>
               ))}
             </div>
          ) : (
             <div className="cz-store-categories-grid">
               {categories.map((cat) => (
                 <Link
                   key={cat.slug || cat._id}
                   href={`/store/c/${cat.slug}`}
                   style={{ textDecoration: 'none' }}
                 >
                   <div
                     className="cz-store-category-card"
                     style={{
                       backgroundColor: '#ffffff',
                       border: '1px solid #E5E7EB',
                       borderRadius: '16px',
                       overflow: 'hidden',
                       transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                       cursor: 'pointer',
                     }}
                   >
                     {/* Image / Emoji area */}
                     {cat.image ? (
                       <img
                         src={cat.image}
                         alt={cat.name}
                         style={{
                           width: '100%',
                           height: '140px',
                           objectFit: 'contain',
                           borderRadius: '12px 12px 0 0',
                           display: 'block',
                         }}
                       />
                     ) : (
                       <div style={{
                         width: '100%',
                         height: '140px',
                         backgroundColor: '#EBF3FF',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         fontSize: '40px',
                         borderRadius: '12px 12px 0 0',
                       }}>
                         {cat.icon || '🛍️'}
                       </div>
                     )}
                     {/* Category name */}
                     <div style={{
                       padding: '14px 16px',
                       fontSize: '15px',
                       fontWeight: 600,
                       color: '#0F172A',
                     }}>
                       {cat.name}
                     </div>
                   </div>
                 </Link>
               ))}
             </div>
          )}
        </div>
      </section>

      {/* ── Scoped Styles ── */}
      <style>{`
        /* ── Brands grid ── */
        .cz-brands-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .cz-brand-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: scale(1.02);
        }

        @media (max-width: 768px) {
          .cz-brands-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }

        /* ── Categories grid ── */
        .cz-store-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .cz-store-category-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: scale(1.02);
        }

        @media (max-width: 768px) {
          .cz-store-categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
