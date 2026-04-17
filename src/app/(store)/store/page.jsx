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
          /* mobile: small side padding, extra bottom for the bottom nav */
          padding: 12px 12px 90px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .czsh-section {
          width: 100%;
        }

        /* tablet and up */
        @media (min-width: 540px) {
          .czsh-page {
            padding: 16px 16px 90px;
            gap: 32px;
          }
        }

        /* desktop: sidebar is present, no bottom nav */
        @media (min-width: 1024px) {
          .czsh-page {
            padding: 24px 24px 48px;
            gap: 40px;
          }
        }
      `}</style>
    </div>
  );
}
