'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  // Fetch categories
  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.categories || res.data || []))
      .catch(err => console.error('Failed to load categories', err))
      .finally(() => setCategoriesLoading(false));
  }, []);

  return (
    <>
      <section className="cz-section-wrapper">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h2 className="cz-section-title">Shop by Category</h2>
              <p className="cz-section-subtitle">Find the perfect gear for your game</p>
            </div>
            <Link href="/store/categories" className="cz-section-link">View All</Link>
          </div>

          {categoriesLoading ? (
             <div className="cz-store-categories-grid">
               {Array.from({ length: 4 }).map((_, idx) => (
                 <div key={idx} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[16px] h-[180px]"></div>
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
                           height: '130px',
                           objectFit: 'cover',
                           display: 'block',
                         }}
                       />
                     ) : (
                       <div style={{
                         width: '100%',
                         height: '130px',
                         backgroundColor: '#EBF3FF',
                         display: 'flex',
                         alignItems: 'center',
                         justifyContent: 'center',
                         fontSize: '40px',
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

      <style>{`
        /* ── Categories grid ── */
        .cz-store-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .cz-store-category-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .cz-store-categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        .cz-section-wrapper {
          padding: 24px 24px;
        }

        .cz-section-title {
          font-size: 24px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px 0;
        }

        .cz-section-subtitle {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }

        .cz-section-link {
          font-size: 14px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .cz-section-wrapper {
            padding: 16px 16px;
          }
          .cz-section-title {
            font-size: 20px;
          }
          .cz-section-subtitle {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
