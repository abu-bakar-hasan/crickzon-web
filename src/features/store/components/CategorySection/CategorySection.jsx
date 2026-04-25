'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode } from 'swiper/modules';
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
    <section className="w-full min-w-0 overflow-hidden">
      {/* Header */}
      <div className="flex items-end justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-cz-ink mb-0.5">Shop by Category</h2>
          <p className="text-[13px] text-cz-gray">Find the perfect gear for your game</p>
        </div>
        <Link href="/store/categories" className="text-[13px] font-semibold text-cz-blue no-underline hover:underline whitespace-nowrap">
          See all →
        </Link>
      </div>

      {/* Slider */}
      <div className="w-full min-w-0">
        <Swiper modules={[FreeMode]} freeMode spaceBetween={12} slidesPerView="auto" className="!pb-3">
          {(loading ? Array.from({ length: 8 }).map((_, i) => ({ _id: i, __skeleton: true })) : categories).map((cat, i) => (
            <SwiperSlide key={cat._id || i} style={{ width: '110px' }}>
              {cat.__skeleton ? <CategorySkeleton /> : <CategoryCard cat={cat} index={i} />}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
