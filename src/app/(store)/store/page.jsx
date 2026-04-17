'use client';

import HeroBanner       from '@/components/store/home/HeroBanner';
import BrandsSlider     from '@/components/store/home/BrandsSlider';
import CategoryGrid     from '@/components/store/home/CategoryGrid';
import TrendingProducts from '@/components/store/home/TrendingProducts';

export default function StoreHome() {
  return (
    <div className="czsh-page">
      {/* ── 1. Feature banner / slider ── */}
      <HeroBanner />

      {/* ── 2. Brands free-scroll slider ── */}
      <section className="czsh-section">
        <BrandsSlider />
      </section>

      {/* ── 3. Categories grid ── */}
      <section className="czsh-section">
        <CategoryGrid />
      </section>

      {/* ── 4. Trending / new products ── */}
      <section className="czsh-section">
        <TrendingProducts />
      </section>

      <style>{`
        .czsh-page {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 20px 80px;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .czsh-section {
          width: 100%;
        }

        @media (max-width: 640px) {
          .czsh-page {
            padding: 12px 12px 80px;
            gap: 28px;
          }
        }
      `}</style>
    </div>
  );
}
