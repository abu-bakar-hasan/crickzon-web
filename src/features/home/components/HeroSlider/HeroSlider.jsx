"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { slides } from '../../data/mockData';

export default function HeroSlider() {
  return (
    <section className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 mt-8 md:mt-16 mb-20">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        spaceBetween={16}
        slidesPerView={1} // Shows a peek of the next slide on mobile
        breakpoints={{
          768: {
            slidesPerView: 1, // Full width on desktop
            spaceBetween: 24,
          }
        }}
        className="cz-hero-swiper !pb-12"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className={`w-full min-h-[220px] sm:min-h-[280px] md:min-h-[480px] rounded-3xl md:rounded-[32px] ${slide.bgColor} text-white relative overflow-hidden flex items-center`}>
              <div className="relative w-full h-full p-6 md:px-16 md:py-12 flex flex-row items-center justify-between gap-4 md:gap-12 z-20">
                
                {/* Left Content */}
                <div className="flex-1 space-y-2 md:space-y-6 w-full flex flex-col items-start text-left">
                  <span className={`inline-block px-3 py-1 rounded-full text-[10px] md:text-sm font-semibold tracking-wider ${slide.tagBg}`}>
                    {slide.tag}
                  </span>
                  <h1 className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-[1.1] whitespace-pre-line">
                    {slide.title}
                  </h1>
                  <p className="text-xs md:text-lg text-white/90 max-w-sm leading-relaxed hidden sm:block">
                    {slide.subtext}
                  </p>
                  <button className={`mt-2 md:mt-4 px-4 md:px-8 py-2 md:py-3 text-[10px] sm:text-xs md:text-base font-bold rounded-full border-2 transition-colors ${slide.ctaBorder}`}>
                    {slide.cta}
                  </button>
                </div>
                
                {/* Right Image */}
                <div className="flex-1 w-full h-full flex flex-col items-end justify-center relative">
                  {slide.hasTrustBadges && (
                    <div className="hidden md:flex gap-2 text-xs font-semibold text-white/90 mb-4 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                      <span className="flex items-center gap-1">⭐ Trusted Brand</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">🏅 Top Quality</span>
                      <span>·</span>
                      <span className="flex items-center gap-1">⚡ Quick Delivery</span>
                    </div>
                  )}
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full max-w-[120px] sm:max-w-[160px] md:max-w-[320px] aspect-[4/5] object-cover rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl drop-shadow-xl md:drop-shadow-2xl"
                  />
                </div>

              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
