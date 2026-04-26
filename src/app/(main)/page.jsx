"use client";

import HeroSlider from "@/features/home/components/HeroSlider/HeroSlider";
import TrendingSection from "@/features/home/sections/TrendingSection";
import CategoriesSection from "@/features/home/sections/CategoriesSection";
import BrandsSection from "@/features/home/sections/BrandsSection";
import PromoBanner from "@/features/home/sections/PromoBanner";
import NewArrivalsSection from "@/features/home/sections/NewArrivalsSection";

export default function HomePage() {
  return (
    <div className="font-['DM_Sans',sans-serif] bg-white min-h-screen pb-12 md:pb-20 overflow-x-hidden">
      
      {/* Section 1: Hero Slider */}
      <HeroSlider />

      <main className="flex flex-col gap-12 md:gap-20 mt-12 md:mt-20">
        
        {/* Section 2: Trending Now */}
        <TrendingSection />

        {/* Section 3: Shop by Category */}
        <CategoriesSection />

        {/* Section 4: Featured Brands */}
        <BrandsSection />

        {/* Section 5: Promotional Banner */}
        <PromoBanner />

        {/* Section 6: New Arrivals */}
        <NewArrivalsSection />
        
      </main>

      <style>{`
        /* Custom Scrollbar for horizontal scrolling rows to match wireframe */
        .custom-scrollbar::-webkit-scrollbar {
          height: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #E5E7EB;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4B5563;
          border-radius: 4px;
        }

        /* Swiper Overrides */
        .cz-hero-swiper .swiper-pagination {
          bottom: 0 !important;
        }
        .cz-hero-swiper .swiper-pagination-bullet {
          background: #E5E7EB;
          opacity: 1;
          width: 10px;
          height: 10px;
          transition: all 0.3s ease;
        }
        .cz-hero-swiper .swiper-pagination-bullet-active {
          background: #0F172A;
          width: 32px;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
