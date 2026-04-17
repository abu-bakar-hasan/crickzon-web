'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.categories || res.data || []))
      .catch(err => console.error('Failed to load categories', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="cg-section">
        <div className="cg-inner">
          <div className="cg-header-row">
            <div>
              <h2 className="cg-title">Shop by Category</h2>
              <p className="cg-subtitle">Find the perfect gear for your game</p>
            </div>
            <Link href="/store/categories" className="cg-link">View All</Link>
          </div>

          <div className="cg-grid">
            {loading
              ? Array.from({ length: 4 }).map((_, idx) => <div key={idx} className="cg-skeleton" />)
              : categories.map((cat) => (
                  <Link key={cat.slug || cat._id} href={`/store/c/${cat.slug}`} style={{ textDecoration: 'none' }}>
                    <div className="cg-card">
                      {cat.image ? (
                        <div className="cg-card-img-area">
                          <img src={cat.image} alt={cat.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', display: 'block' }} />
                        </div>
                      ) : (
                        <div className="cg-card-fallback">{cat.icon || '🛍️'}</div>
                      )}
                      <div className="cg-card-name">{cat.name}</div>
                    </div>
                  </Link>
                ))
            }
          </div>
        </div>
      </section>

      <style>{`
        .cg-section {
          padding: 20px 20px 12px 20px;
        }

        .cg-inner {
          max-width: 1280px;
          margin: 0 auto;
        }

        .cg-header-row {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 20px;
        }

        .cg-title {
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px 0;
        }

        .cg-subtitle {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }

        .cg-link {
          font-size: 14px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
          white-space: nowrap;
        }

        .cg-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .cg-skeleton {
          height: 160px;
          background-color: #F1F5F9;
          border-radius: 14px;
          border: 1px solid #E5E7EB;
        }

        .cg-card {
          background-color: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }

        .cg-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .cg-card-img-area {
          width: 100%;
          height: 110px;
          background-color: #F8FAFC;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-sizing: border-box;
        }

        .cg-card-fallback {
          width: 100%;
          height: 110px;
          background-color: #EBF3FF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
        }

        .cg-card-name {
          padding: 12px 14px;
          font-size: 14px;
          font-weight: 600;
          color: #0F172A;
        }

        @media (max-width: 1024px) {
          .cg-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cg-section {
            padding: 12px 12px 8px 12px;
          }
          .cg-title {
            font-size: 18px;
            margin: 0;
          }
          .cg-subtitle {
            font-size: 12px;
          }
          .cg-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .cg-card-img-area,
          .cg-card-fallback {
            height: 85px;
          }
          .cg-card-name {
            font-size: 13px;
            padding: 10px 12px;
          }
        }
      `}</style>
    </>
  );
}
