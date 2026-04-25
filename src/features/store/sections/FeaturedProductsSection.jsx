'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard from '@/features/store/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@/features/store/components/ProductCard/ProductCard.skeleton';
import api from '@/lib/axios';

export default function FeaturedProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products?limit=4')
      .then(res => setProducts(res.data.products || res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="bg-cz-surface py-12 px-6">
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="text-center sm:text-left">
            <h2 className="text-3xl font-bold text-cz-ink mb-2">New Arrivals</h2>
            <p className="text-[15px] text-cz-gray">Fresh gear just dropped</p>
          </div>
          <Link
            href="/store"
            className="shrink-0 border border-cz-border px-4 py-2 rounded-full text-[13px] font-semibold text-gray-700 no-underline hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            View All
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, idx) => <ProductCardSkeleton key={idx} />)
            : products.map((product) => (
                <ProductCard
                  key={product._id || product.slug}
                  productId={product._id}
                  name={product.name}
                  brand={product.brand}
                  images={product.images}
                  minPrice={product.minPrice || product.price}
                  maxPrice={product.maxPrice || product.price}
                  slug={product.slug}
                  variants={product.variants}
                />
              ))
          }
        </div>
      </div>
    </section>
  );
}
