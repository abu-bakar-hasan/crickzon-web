'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

// Import Swiper React components and modules
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

// ── Skeleton card ──────────────────────────────────────────────────────────
function BrandSkeleton() {
  return (
    <div className="czb-card czb-skeleton">
      <div className="czb-skeleton-img" />
      <div className="czb-skeleton-label" />
    </div>
  );
}

// ── Brand card ─────────────────────────────────────────────────────────────
function BrandCard({ brand }) {
  return (
    <Link href={`/store/brand/${brand.slug || brand._id}`} className="czb-link">
      <div className="czb-card">
        {brand.image ? (
          <div className="czb-imgbox">
            <img src={brand.image} alt={brand.name} className="czb-img" />
          </div>
        ) : (
          <div className="czb-initial">
            {brand.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="czb-name">{brand.name}</span>
      </div>
    </Link>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function BrandsSlider() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/brands')
      .then(res => setBrands(res.data.brands || res.data || []))
      .catch(err => console.error('BrandsSlider:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="czb-section">
      {/* Header */}
      <div className="czb-header">
        <div>
          <h2 className="czb-title">Shop by Brand</h2>
          <p className="czb-subtitle">Explore top cricket brands</p>
        </div>
        <Link href="/store/brands" className="czb-see-all">See all →</Link>
      </div>

      {/* Actual Swiper implementation preventing layout stretch */}
      <div className="czb-slider-container">
        {loading ? (
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            spaceBetween={12}
            slidesPerView="auto"
            className="czb-swiper"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SwiperSlide key={i} style={{ width: '120px' }}>
                <BrandSkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            spaceBetween={12}
            slidesPerView="auto"
            className="czb-swiper"
          >
            {brands.map((b) => (
              <SwiperSlide key={b._id || b.slug} style={{ width: '120px' }}>
                <BrandCard brand={b} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style>{`
        .czb-section { width: 100%; min-width: 0; overflow: hidden; }

        .czb-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .czb-title {
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 2px 0;
        }

        .czb-subtitle {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
        }

        .czb-see-all {
          font-size: 13px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
          white-space: nowrap;
        }
        .czb-see-all:hover { text-decoration: underline; }

        /* Slider Constraints to avoid breaking layout */
        .czb-slider-container {
          width: 100%;
          min-width: 0;
          position: relative;
        }
        
        .czb-swiper {
          width: 100%;
          min-width: 0;
          padding-bottom: 12px;
        }

        /* Card styles inside SwiperSlide */
        .czb-link { 
          display: block;
          text-decoration: none; 
          width: 100%;
        }

        .czb-card {
          width: 100%;
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 16px 8px 12px;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          user-select: none;
        }
        .czb-card:hover {
          box-shadow: 0 4px 18px rgba(0,87,168,0.12);
          transform: translateY(-2px);
        }

        .czb-imgbox {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F8FAFC;
          border-radius: 10px;
          overflow: hidden;
        }

        .czb-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .czb-initial {
          width: 64px;
          height: 64px;
          background: #EBF3FF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 26px;
          font-weight: 800;
          color: #0057A8;
        }

        .czb-name {
          font-size: 12px;
          font-weight: 600;
          color: #0F172A;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }

        /* Skeleton */
        .czb-skeleton {
          border: none;
          background: #F1F5F9;
          pointer-events: none;
          animation: czb-pulse 1.4s ease-in-out infinite;
        }
        .czb-skeleton-img {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background: #E2E8F0;
        }
        .czb-skeleton-label {
          width: 60px;
          height: 10px;
          border-radius: 6px;
          background: #E2E8F0;
        }
        @keyframes czb-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
