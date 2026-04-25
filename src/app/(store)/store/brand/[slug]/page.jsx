'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProductCard from '@/features/store/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@/features/store/components/ProductCard/ProductCard.skeleton';
import api from '@/lib/axios';

const TABS = ["All", "Bats", "Balls", "Protective Gear", "Footwear", "Accessories", "Jerseys"];

export default function BrandPage(props) {
  // Unwrapping params sequentially via React's newest `use()` hook standards
  const params = use(props.params);
  const slug = params.slug || '';
  const brandName = slug.replace(/-/g, ' ').toUpperCase();
  
  const [activeTab, setActiveTab] = useState('All');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.get(`/products?brand=${brandName}`)
      .then(res => setProducts(res.data.products || res.data || []))
      .catch(err => console.error("Error fetching brand products", err))
      .finally(() => setLoading(false));
  }, [brandName]);

  // Robustly filter category maps checking whether standard strings or populated documents are mapped internally
  const filteredProducts = activeTab === 'All' 
    ? products 
    : products.filter(p => {
        const catName = (p.category?.name || p.category || '').toLowerCase();
        return catName === activeTab.toLowerCase();
      });

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="text-[13px] text-[#6B7280] mb-6 flex items-center flex-wrap">
          <Link href="/store" className="hover:underline">Store</Link> 
          <span className="mx-2">→</span> 
          <span className="text-[#6B7280]">Brands</span>
          <span className="mx-2">→</span> 
          <span className="text-[#0F172A] font-[500]">{brandName}</span>
        </div>

        {/* Brand Hero */}
        <div className="bg-[#EBF3FF] rounded-[20px] p-[32px] mb-[32px] flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="w-[64px] h-[64px] rounded-full bg-[#0057A8] text-white flex items-center justify-center text-[28px] font-[700] flex-shrink-0">
              {brandName.charAt(0)}
            </div>
            <div>
              <h1 className="text-[28px] font-[700] text-[#0F172A] leading-tight mb-1">{brandName}</h1>
              <p className="text-[14px] text-[#6B7280]">Official Cricket Gear</p>
            </div>
          </div>
          
          <div className="bg-[#0057A8] text-white px-5 py-2 rounded-full text-[14px] font-[600] flex-shrink-0 shadow-sm">
            {loading ? '...' : products.length} Products
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-nowrap overflow-x-auto gap-3 mb-8 no-scrollbar pb-2 pt-1 border-b border-gray-100">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap px-[20px] py-[8px] rounded-[20px] text-[14px] font-[500] transition-all duration-200 ${
                activeTab === tab 
                  ? 'bg-[#0057A8] text-white shadow-sm' 
                  : 'text-[#6B7280] hover:text-[#0057A8] hover:bg-[#EBF3FF]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {Array.from({ length: 6 }).map((_, idx) => (
                 <ProductCardSkeleton key={idx} />
               ))}
             </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#E5E7EB] rounded-[16px] bg-gray-50/50">
            <div className="text-[48px] mb-4 opacity-80">🏏</div>
            <p className="text-[16px] font-[600] text-[#0F172A] mb-2">No products in this category</p>
            <p className="text-[14px] text-[#6B7280]">Try selecting a different tab to see more products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(prod => (
              <ProductCard
                key={prod._id || prod.slug}
                productId={prod._id}
                name={prod.name}
                brand={prod.brand}
                images={prod.images}
                minPrice={prod.minPrice || prod.price}
                maxPrice={prod.maxPrice || prod.price}
                slug={prod.slug}
                variants={prod.variants}
              />
            ))}
          </div>
        )}

      </div>

      <style dangerouslySetInnerHTML={{__html: `
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </div>
  );
}
