'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import BrandCard from './BrandCard';
import BrandSkeleton from './BrandSkeleton';

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
    <section className="w-full min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-cz-ink mb-0.5">Shop by Brand</h2>
          <p className="text-[13px] text-cz-gray">Explore top cricket brands</p>
        </div>
        <Link href="/store/brands" className="text-[13px] font-semibold text-cz-blue no-underline hover:underline whitespace-nowrap">
          See all →
        </Link>
      </div>

      {/* Slider */}
      <div className="w-full min-w-0">
        <Swiper modules={[FreeMode]} freeMode spaceBetween={12} slidesPerView="auto" className="!pb-3">
          {(loading ? Array.from({ length: 8 }).map((_, i) => ({ _id: i, __skeleton: true })) : brands).map((b) => (
            <SwiperSlide key={b._id} style={{ width: '110px' }}>
              {b.__skeleton ? <BrandSkeleton /> : <BrandCard brand={b} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
