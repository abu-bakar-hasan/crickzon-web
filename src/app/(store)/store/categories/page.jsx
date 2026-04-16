'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function AllCategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.categories || res.data || []))
      .catch(err => console.error('Failed to load categories', err))
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
          All Categories
        </h1>
        <p style={{ fontSize: '16px', color: '#6B7280', margin: 0 }}>
          Find the perfect gear for your game
        </p>
      </div>

      {/* ── Grid ── */}
      <section style={{ padding: '64px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {loading ? (
            <div className="cz-categories-grid">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[16px] h-[200px]" />
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', color: '#6B7280' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🛍️</div>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A' }}>No categories found</p>
            </div>
          ) : (
            <div className="cz-categories-grid">
              {categories.map((cat) => (
                <Link
                  key={cat.slug || cat._id}
                  href={`/store/c/${cat.slug}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div
                    className="cz-category-card"
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
                      <div
                        style={{
                          width: '100%',
                          height: '140px',
                          backgroundColor: '#EBF3FF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '40px',
                          borderRadius: '12px 12px 0 0',
                        }}
                      >
                        {cat.icon || '🛍️'}
                      </div>
                    )}
                    {/* Name */}
                    <div
                      style={{
                        padding: '14px 16px',
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#0F172A',
                      }}
                    >
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
        .cz-categories-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .cz-category-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: scale(1.02);
        }
        @media (max-width: 1024px) {
          .cz-categories-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cz-categories-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
}
