'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProductCard from '@/features/store/components/ProductCard';
import ProductCardSkeleton from '@/features/store/components/ProductCard/ProductCard.skeleton';
import api from '@/lib/axios';

function formatTitle(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const BRANDS = ['SS', 'MRF', 'SG', 'Kookaburra', 'Gray-Nicolls'];

export default function CategoryPage(props) {
  const params = use(props.params);
  const slug = params.slug;
  const categoryTitle = formatTitle(slug);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.get(`/products?category=${slug}`)
      .then(res => setProducts(res.data.products || res.data || []))
      .catch(err => console.error('Error fetching category products', err))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div className="min-h-screen bg-white pb-16">
      <div className="max-w-[1240px] mx-auto px-4 lg:px-8 py-8 flex gap-8 items-start">

        {/* ── Desktop Filter Sidebar ── */}
        <aside className="cat-filter-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, color: '#0F172A', margin: 0, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Filters</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>

            {/* Price Range */}
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '10px', letterSpacing: '0.05em' }}>
                Price Range
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                  <input type="number" placeholder="Min" className="cat-filter-input" style={{ paddingLeft: '22px' }} />
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                  <input type="number" placeholder="Max" className="cat-filter-input" style={{ paddingLeft: '22px' }} />
                </div>
              </div>
              <button className="cat-apply-btn">Apply</button>
            </div>

            {/* Brand Filter */}
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '10px', letterSpacing: '0.05em' }}>
                Brand
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {BRANDS.map((b) => (
                  <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ cursor: 'pointer', accentColor: '#0057A8' }} />
                    <span style={{ fontSize: '14px', color: '#374151' }}>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '10px', letterSpacing: '0.05em' }}>
                Sort by
              </label>
              <select className="cat-filter-select">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

          </div>
        </aside>

        {/* ── Mobile Filter Bottom Sheet ── */}
        {mobileFilterOpen && (
          <div className="cat-mobile-overlay" onClick={() => setMobileFilterOpen(false)}>
            <div className="cat-mobile-sheet" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', margin: 0 }}>Filters</h2>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6B7280' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                <div>
                  <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Price Range</label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                      <input type="number" placeholder="Min" className="cat-filter-input" style={{ paddingLeft: '22px' }} />
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                      <input type="number" placeholder="Max" className="cat-filter-input" style={{ paddingLeft: '22px' }} />
                    </div>
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Brand</label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {BRANDS.map((b) => (
                      <label key={`mob-${b}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: '#0057A8' }} />
                        <span style={{ fontSize: '15px', color: '#374151' }}>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: '12px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Sort by</label>
                  <select className="cat-filter-select">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>

                <button
                  className="cat-apply-btn"
                  style={{ marginTop: '8px', padding: '14px 0', fontSize: '15px' }}
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Show {products.length} Products
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Content ── */}
        <main style={{ flex: 1, minWidth: 0 }}>

          {/* Breadcrumb */}
          <div className="text-[13px] text-[#6B7280] mb-6 flex items-center flex-wrap">
            <Link href="/store" className="hover:underline text-[#6B7280]">Store</Link>
            <span className="mx-2">→</span>
            <span className="text-[#6B7280]">Categories</span>
            <span className="mx-2">→</span>
            <span className="text-[#0F172A] font-[500]">{categoryTitle || 'Category'}</span>
          </div>

          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px', marginBottom: '28px' }}>
            <div>
              <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
                {categoryTitle || 'Products'}
              </h1>
              <span style={{ fontSize: '13px', color: '#6B7280' }}>
                {loading ? 'Loading...' : `${products.length} Products`}
              </span>
            </div>

            {/* Mobile Filter Trigger */}
            <button
              className="cat-mobile-filter-btn"
              onClick={() => setMobileFilterOpen(true)}
            >
              Filters &amp; Sort
            </button>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <ProductCardSkeleton key={idx} />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-[#E5E7EB] rounded-[16px] bg-gray-50/50">
              <div className="text-[48px] mb-4 opacity-80">🏏</div>
              <p className="text-[16px] font-[600] text-[#0F172A] mb-2">No products found</p>
              <p className="text-[14px] text-[#6B7280]">Check back later for more gear arriving soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
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

        </main>
      </div>

      <style>{`
        /* ── Filter panel (desktop) ── */
        .cat-filter-panel {
          width: 220px;
          flex-shrink: 0;
          position: sticky;
          top: 24px;
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 16px;
          padding: 20px;
        }

        .cat-filter-input, .cat-filter-select {
          width: 100%;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
          font-size: 13px;
          color: #0F172A;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
          background: #fff;
        }

        .cat-filter-input:focus, .cat-filter-select:focus {
          border-color: #0057A8;
        }

        .cat-filter-input { padding: 0 8px; }
        .cat-filter-select { padding: 0 12px; cursor: pointer; }

        .cat-apply-btn {
          width: 100%;
          background-color: #0057A8;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 10px 0;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .cat-apply-btn:hover {
          background-color: #004485;
        }

        /* ── Mobile filter trigger ── */
        .cat-mobile-filter-btn {
          display: none;
          border: 1px solid #E5E7EB;
          background-color: #ffffff;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
          white-space: nowrap;
        }

        /* ── Mobile bottom sheet ── */
        .cat-mobile-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.5);
          z-index: 100;
          display: flex;
          align-items: flex-end;
        }

        .cat-mobile-sheet {
          background-color: #ffffff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          max-height: 85vh;
          overflow-y: auto;
          animation: catSlideUp 0.3s ease forwards;
        }

        @keyframes catSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .cat-filter-panel { display: none; }
          .cat-mobile-filter-btn { display: block; }
        }
      `}</style>
    </div>
  );
}
