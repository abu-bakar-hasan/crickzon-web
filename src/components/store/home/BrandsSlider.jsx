'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function BrandsSlider() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/brands')
      .then(res => setBrands(res.data.brands || res.data || []))
      .catch(err => console.error('Failed to load brands', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <section className="bs-section">
        <div className="bs-header">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <div>
              <h2 className="bs-title">Shop by Brand</h2>
              <p className="bs-subtitle">Explore gear from top cricket brands</p>
            </div>
            <Link href="/store/brands" className="bs-link">View All</Link>
          </div>
        </div>

        {loading ? (
          <div className="bs-track">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bs-skeleton" />
            ))}
          </div>
        ) : (
          <div className="bs-track">
            {brands.map((brand) => (
              <Link key={brand.slug || brand._id} href={`/store/brand/${brand.slug}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
                <div className="bs-card">
                  {brand.image ? (
                    <div className="bs-card-img-area">
                      <img src={brand.image} alt={brand.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
                    </div>
                  ) : (
                    <div className="bs-card-initial">
                      {brand.name?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="bs-card-name">{brand.name}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <style>{`
        .bs-section {
          padding: 32px 0 16px 0;
        }

        .bs-header {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 20px 20px 20px;
        }

        .bs-title {
          font-size: 22px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px 0;
        }

        .bs-subtitle {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }

        .bs-link {
          font-size: 14px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
          white-space: nowrap;
        }

        .bs-track {
          display: flex;
          gap: 14px;
          overflow-x: auto;
          padding: 4px 20px 12px 20px;
          max-width: 1280px;
          margin: 0 auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .bs-track::-webkit-scrollbar {
          display: none;
        }

        .bs-track > * {
          scroll-snap-align: start;
        }

        .bs-skeleton {
          min-width: 130px;
          height: 145px;
          background-color: #F1F5F9;
          border-radius: 14px;
          border: 1px solid #E5E7EB;
          flex-shrink: 0;
        }

        .bs-card {
          width: 130px;
          background-color: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          flex-shrink: 0;
        }

        .bs-card:hover {
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          transform: translateY(-2px);
        }

        .bs-card-img-area {
          width: 100%;
          height: 95px;
          background-color: #F8FAFC;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 12px;
          box-sizing: border-box;
        }

        .bs-card-initial {
          width: 100%;
          height: 95px;
          background-color: #EBF3FF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 28px;
          font-weight: 700;
          color: #0057A8;
        }

        .bs-card-name {
          padding: 10px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          color: #0F172A;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        @media (max-width: 768px) {
          .bs-section {
            padding: 20px 0 8px 0;
          }
          .bs-title {
            font-size: 18px;
          }
          .bs-subtitle {
            font-size: 12px;
          }
          .bs-card {
            width: 105px;
          }
          .bs-card-img-area,
          .bs-card-initial {
            height: 75px;
          }
          .bs-card-name {
            font-size: 11px;
            padding: 8px;
          }
        }
      `}</style>
    </>
  );
}
