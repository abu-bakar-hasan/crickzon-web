'use client';

import { useState, useEffect, use } from 'react';
import Link from 'next/link';
import ProductCard from '@/components/ui/ProductCard';
import api from '@/lib/axios';

// Helper to format slug to Title Case
function formatTitle(slug) {
  if (!slug) return '';
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const BRANDS = ['SS', 'MRF', 'SG', 'Kookaburra', 'Gray-Nicolls'];

export default function CategoryPage(props) {
  // Using Next.js 15 unwrapping standard as prompted
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
      .catch(err => console.error("Error fetching category products", err))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '64px' }}>
      <div 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '32px 24px',
          display: 'flex',
          gap: '32px',
          alignItems: 'flex-start'
        }}
      >
        
        {/* ── Desktop Sidebar (Filters) ── */}
        <aside className="cz-sidebar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', margin: 0 }}>Filters</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            
            {/* Price Range */}
            <div>
              <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                Price Range
              </label>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <div style={{ flex: 1, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                  <input 
                    type="number" 
                    placeholder="Min"
                    className="cz-input"
                    style={{ paddingLeft: '22px' }}
                  />
                </div>
                <div style={{ flex: 1, position: 'relative' }}>
                  <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                  <input 
                    type="number" 
                    placeholder="Max"
                    className="cz-input"
                    style={{ paddingLeft: '22px' }}
                  />
                </div>
              </div>
              <button className="cz-apply-btn">Apply</button>
            </div>

            {/* Brand Filter */}
            <div>
              <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                Brand
              </label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {BRANDS.map((b) => (
                  <label key={b} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                    <input type="checkbox" style={{ cursor: 'pointer' }} />
                    <span style={{ fontSize: '14px', color: '#374151' }}>{b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div>
              <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                Sort by
              </label>
              <select className="cz-select">
                <option>Newest</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>

          </div>
        </aside>

        {/* ── Mobile Filter Bottom Sheet ── */}
        {mobileFilterOpen && (
          <div className="cz-mobile-sheet-overlay" onClick={() => setMobileFilterOpen(false)}>
            <div className="cz-mobile-sheet" onClick={(e) => e.stopPropagation()}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', margin: 0 }}>Filters</h2>
                <button 
                  onClick={() => setMobileFilterOpen(false)}
                  style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#6B7280' }}
                >
                  ✕
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {/* Price Range */}
                <div>
                  <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                    Price Range
                  </label>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                      <input type="number" placeholder="Min" className="cz-input" style={{ paddingLeft: '22px' }} />
                    </div>
                    <div style={{ flex: 1, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#6B7280', fontSize: '13px' }}>₹</span>
                      <input type="number" placeholder="Max" className="cz-input" style={{ paddingLeft: '22px' }} />
                    </div>
                  </div>
                </div>

                {/* Brand Filter */}
                <div>
                  <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                    Brand
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {BRANDS.map((b) => (
                      <label key={`mob-${b}`} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                        <input type="checkbox" style={{ width: '18px', height: '18px' }} />
                        <span style={{ fontSize: '15px', color: '#374151' }}>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Dropdown */}
                <div>
                  <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                    Sort by
                  </label>
                  <select className="cz-select">
                    <option>Newest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
                </div>

                <button 
                  className="cz-apply-btn" 
                  style={{ marginTop: '16px', padding: '14px 0', fontSize: '15px' }}
                  onClick={() => setMobileFilterOpen(false)}
                >
                  Show {products.length} Products
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ── Main Content (Right Grid) ── */}
        <main style={{ flex: 1, minWidth: 0 }}>
          
          {/* Breadcrumb & Header */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '12px' }}>
              <Link href="/store" style={{ color: '#6B7280', textDecoration: 'none' }}>Store</Link> 
              <span style={{ margin: '0 8px' }}>&rarr;</span> 
              <span style={{ color: '#0F172A', fontWeight: 500 }}>{categoryTitle || 'Category'}</span>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
              <div>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#0F172A', margin: '0 0 4px 0' }}>
                  {categoryTitle || 'Products'}
                </h1>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>
                  {loading ? 'Loading...' : `${products.length} Products`}
                </span>
              </div>

              {/* Mobile Filter Trigger */}
              <button 
                className="cz-mobile-filter-btn"
                onClick={() => setMobileFilterOpen(true)}
              >
                Filters &amp; Sort
              </button>
            </div>
          </div>

          {loading ? (
             <div className="cz-product-list-grid">
               {Array.from({ length: 6 }).map((_, idx) => (
                 <div key={idx} className="bg-white border border-[#E5E7EB] rounded-[16px] overflow-hidden flex flex-col">
                   <div className="w-full h-[200px] bg-gray-200 animate-pulse"></div>
                   <div className="p-4 flex flex-col gap-4">
                      <div className="h-4 bg-gray-200 animate-pulse rounded w-3/4"></div>
                      <div className="h-3 bg-gray-200 animate-pulse rounded w-1/2"></div>
                      <div className="h-5 bg-gray-200 animate-pulse rounded w-2/5 my-2"></div>
                      <div className="h-10 bg-gray-200 animate-pulse rounded-lg w-full"></div>
                   </div>
                 </div>
               ))}
             </div>
          ) : products.length === 0 ? (
             <div className="flex flex-col items-center justify-center py-20 text-center">
               <div className="text-[48px] mb-4">🏏</div>
               <h3 className="text-xl font-bold text-gray-800">No products found</h3>
               <p className="text-gray-500 mt-2">Check back later for more gear arriving soon!</p>
             </div>
          ) : (
            <div className="cz-product-list-grid">
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
        .cz-sidebar {
          width: 240px;
          flex-shrink: 0;
          position: sticky;
          top: 88px;
        }

        .cz-input, .cz-select {
          width: 100%;
          height: 36px;
          border-radius: 8px;
          border: 1px solid #E5E7EB;
          font-size: 13px;
          color: #0F172A;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s ease;
        }
        
        .cz-input:focus, .cz-select:focus {
          border-color: #0057A8;
        }
        
        .cz-input { padding: 0 8px; }
        .cz-select { padding: 0 12px; cursor: pointer; }

        .cz-apply-btn {
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
        
        .cz-apply-btn:hover {
          background-color: #004485;
        }

        .cz-product-list-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }

        .cz-mobile-filter-btn {
          display: none;
          border: 1px solid #E5E7EB;
          background-color: #ffffff;
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          color: #374151;
          cursor: pointer;
        }

        @media (max-width: 1024px) {
          .cz-product-list-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cz-sidebar { display: none; }
          .cz-mobile-filter-btn { display: block; }
          .cz-product-list-grid {
            grid-template-columns: 1fr;
          }
        }

        .cz-mobile-sheet-overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(0,0,0,0.5);
          z-index: 100;
          display: flex;
          align-items: flex-end;
        }

        .cz-mobile-sheet {
          background-color: #ffffff;
          width: 100%;
          border-radius: 20px 20px 0 0;
          padding: 24px;
          max-height: 85vh;
          overflow-y: auto;
          animation: slideUp 0.3s ease forwards;
        }

        @keyframes slideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
