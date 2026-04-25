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

import CategoryCard from './CategoryCard';
import CategorySkeleton from './CategorySkeleton';

export default function CategorySection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.categories || res.data || []))
      .catch(err => console.error('CategorySection:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="czcat-section">
      {/* Header */}
      <div className="czcat-header">
        <div>
          <h2 className="czcat-title">Shop by Category</h2>
          <p className="czcat-subtitle">Find the perfect gear for your game</p>
        </div>
        <Link href="/store/categories" className="czcat-see-all">See all →</Link>
      </div>

      {/* Grid */}
      <div className="czcat-slider-container">
        {loading ? (
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            spaceBetween={12}
            slidesPerView="auto"
            className="czcat-swiper"
          >
            {Array.from({ length: 8 }).map((_, i) => (
              <SwiperSlide key={i} style={{ width: '120px' }}>
                <CategorySkeleton />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <Swiper
            modules={[FreeMode]}
            freeMode={true}
            spaceBetween={12}
            slidesPerView="auto"
            className="czcat-swiper"
          >
            {categories.map((cat, i) => (
              <SwiperSlide key={cat._id || cat.slug} style={{ width: '120px' }}>
                <CategoryCard cat={cat} index={i} />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      <style>{`
        .czcat-section { width: 100%; min-width: 0; overflow: hidden; }

        .czcat-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .czcat-title {
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 2px 0;
        }

        .czcat-subtitle {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
        }

        .czcat-see-all {
          font-size: 13px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
          white-space: nowrap;
        }
        .czcat-see-all:hover { text-decoration: underline; }

        /* Slider Constraints */
        .czcat-slider-container {
          width: 100%;
          min-width: 0;
          position: relative;
        }

        .czcat-swiper {
          width: 100%;
          min-width: 0;
          padding-bottom: 12px;
        }

        /* Link reset */
        .czcat-link { 
          display: block;
          text-decoration: none; 
          width: 100%;
        }

        /* Card */
        .czcat-card {
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
          cursor: pointer;
          user-select: none;
        }
        .czcat-card:hover {
          box-shadow: 0 4px 18px rgba(0,87,168,0.12);
          transform: translateY(-2px);
        }

        .czcat-imgbox {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F8FAFC;
          border-radius: 10px;
          overflow: hidden;
        }

        .czcat-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .czcat-icon-box {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .czcat-icon { font-size: 26px; }

        .czcat-name {
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
        .czcat-skeleton {
          border: none;
          background: #F1F5F9;
          pointer-events: none;
          animation: czcat-pulse 1.4s ease-in-out infinite;
        }
        .czcat-skel-img {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          background: #E2E8F0;
        }
        .czcat-skel-label {
          width: 60px;
          height: 10px;
          border-radius: 6px;
          background: #E2E8F0;
        }

        @keyframes czcat-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
