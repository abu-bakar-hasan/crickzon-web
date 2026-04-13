'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import ProductCard from '@/components/ui/ProductCard';

const TABS = ["All", "Bats", "Balls", "Protective Gear", "Footwear", "Accessories"];

function formatTitle(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function BrandPage() {
  const params = useParams();
  const slug = params?.slug || '';
  const brandName = formatTitle(slug) || 'Brand';
  
  const [activeTab, setActiveTab] = useState('All');

  // Generate 6 mock products specifically to match testing categories
  const MOCK_PRODUCTS = [
    { 
      id: '1', 
      category: 'Bats', 
      name: `${brandName} Elite Bat`, 
      brand: brandName, 
      minPrice: 15000, 
      maxPrice: 15000, 
      slug: 'elite-bat', 
      images: ['https://ik.imagekit.io/crickzon/product4.png'] 
    },
    { 
      id: '2', 
      category: 'Bats', 
      name: `${brandName} Master Bat`, 
      brand: brandName, 
      minPrice: 12000, 
      maxPrice: 12000, 
      slug: 'master-bat', 
      images: ['https://ik.imagekit.io/crickzon/product4.png'] 
    },
    { 
      id: '3', 
      category: 'Balls', 
      name: `${brandName} Pro Turf Ball`, 
      brand: brandName, 
      minPrice: 1500, 
      maxPrice: 1500, 
      slug: 'pro-ball', 
      images: ['https://ik.imagekit.io/crickzon/product4.png'] 
    },
    { 
      id: '4', 
      category: 'Protective Gear', 
      name: `${brandName} Test Match Pads`, 
      brand: brandName, 
      minPrice: 4500, 
      maxPrice: 4500, 
      slug: 'test-pads', 
      images: ['https://ik.imagekit.io/crickzon/product4.png'] 
    },
    { 
      id: '5', 
      category: 'Footwear', 
      name: `${brandName} Pro Spikes`, 
      brand: brandName, 
      minPrice: 6000, 
      maxPrice: 6000, 
      slug: 'pro-spikes', 
      images: ['https://ik.imagekit.io/crickzon/product4.png'] 
    },
    { 
      id: '6', 
      category: 'Accessories', 
      name: `${brandName} Premium Grip`, 
      brand: brandName, 
      minPrice: 300, 
      maxPrice: 300, 
      slug: 'premium-grip', 
      images: ['https://ik.imagekit.io/crickzon/product4.png'] 
    }
  ];

  const filteredProducts = activeTab === 'All' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeTab);

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
            {MOCK_PRODUCTS.length} Products
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
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#E5E7EB] rounded-[16px] bg-gray-50/50">
            <div className="text-[48px] mb-4 opacity-80">🏏</div>
            <p className="text-[16px] font-[600] text-[#0F172A] mb-2">No products in this category</p>
            <p className="text-[14px] text-[#6B7280]">Try selecting a different tab to see more products.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map(prod => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                brand={prod.brand}
                images={prod.images}
                minPrice={prod.minPrice}
                maxPrice={prod.maxPrice}
                slug={prod.slug}
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
