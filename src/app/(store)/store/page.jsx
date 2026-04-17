'use client';

import HeroBanner       from '@/components/store/home/HeroBanner';
import BrandsSlider     from '@/components/store/home/BrandsSlider';
import CategoryGrid     from '@/components/store/home/CategoryGrid';
import TrendingProducts from '@/components/store/home/TrendingProducts';

export default function StoreHome() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-8 lg:py-12">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 flex flex-col gap-8 lg:gap-10">
        {/* ── 1. Feature banner / slider ── */}
        <section className="w-full min-w-0">
          <HeroBanner />
        </section>

        {/* ── 2. Brands free-scroll slider ── */}
        <section className="w-full min-w-0 overflow-hidden">
          <BrandsSlider />
        </section>

        {/* ── 3. Categories grid ── */}
        <section className="w-full min-w-0">
          <CategoryGrid />
        </section>

        {/* ── 4. Trending / new products ── */}
        <section className="w-full min-w-0">
          <TrendingProducts />
        </section>
      </div>
    </div>
  );
}
