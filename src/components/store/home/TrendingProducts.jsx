'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  // Fetch trending products
  useEffect(() => {
    api.get('/products?limit=8')
      .then(res => setProducts(res.data.products || res.data || []))
      .catch(err => console.error('Failed to load products', err))
      .finally(() => setProductsLoading(false));
  }, []);

  return (
    <>
      <section className="cz-section-wrapper">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h2 className="cz-section-title">Trending Products</h2>
              <p className="cz-section-subtitle">Discover what players are buying right now</p>
            </div>
            <Link href="/store/search" className="cz-section-link">View All</Link>
          </div>

          {productsLoading ? (
             <div className="cz-store-products-grid">
               {Array.from({ length: 8 }).map((_, idx) => (
                 <div key={idx} className="bg-gray-100 animate-pulse border border-[#E5E7EB] rounded-[16px] h-[300px]"></div>
               ))}
             </div>
          ) : products && products.length > 0 ? (
             <div className="cz-store-products-grid">
               {products.map((product) => {
                 const imageUrl = product.images?.[0]?.url || product.image;
                 return (
                 <Link
                   key={product._id || product.slug}
                   href={`/store/p/${product.slug}`}
                   style={{ textDecoration: 'none' }}
                 >
                   <div
                     className="cz-store-product-card"
                     style={{
                       backgroundColor: '#ffffff',
                       border: '1px solid #E5E7EB',
                       borderRadius: '16px',
                       overflow: 'hidden',
                       transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                       cursor: 'pointer',
                       height: '100%',
                       display: 'flex',
                       flexDirection: 'column'
                     }}
                   >
                     {/* Image area */}
                     <div style={{
                         width: '100%',
                         height: '200px',
                         backgroundColor: '#F8FAFC',
                         padding: '16px',
                         display: 'flex',
                         justifyContent: 'center',
                         alignItems: 'center'
                       }}>
                     {imageUrl ? (
                       <img
                         src={imageUrl}
                         alt={product.name}
                         style={{
                           maxWidth: '100%',
                           maxHeight: '100%',
                           objectFit: 'contain',
                           display: 'block',
                         }}
                       />
                     ) : (
                       <div style={{ fontSize: '40px', color: '#CBD5E1' }}>🏏</div>
                     )}
                     </div>
                     {/* Product info */}
                     <div style={{
                       padding: '16px',
                       display: 'flex',
                       flexDirection: 'column',
                       flex: 1
                     }}>
                       <div style={{
                         fontSize: '15px',
                         fontWeight: 600,
                         color: '#0F172A',
                         marginBottom: '8px',
                         display: '-webkit-box',
                         WebkitLineClamp: 2,
                         WebkitBoxOrient: 'vertical',
                         overflow: 'hidden'
                       }}>
                         {product.name}
                       </div>
                       <div style={{ marginTop: 'auto', fontWeight: 700, color: '#E21B70', fontSize: '18px' }}>
                         ₹{product.price || 0}
                       </div>
                     </div>
                   </div>
                 </Link>
               )})}
             </div>
          ) : (
             <div style={{ textAlign: 'center', color: '#6B7280', padding: '40px 0', border: '1px dashed #E5E7EB', borderRadius: '16px' }}>
               No trending products available right now.
             </div>
          )}
        </div>
      </section>

      <style>{`
        /* ── Products grid ── */
        .cz-store-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .cz-store-product-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        @media (max-width: 1024px) {
          .cz-store-products-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .cz-store-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        .cz-section-wrapper {
          padding: 24px 24px 64px 24px;
        }

        .cz-section-title {
          font-size: 24px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px 0;
        }

        .cz-section-subtitle {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }

        .cz-section-link {
          font-size: 14px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
        }

        @media (max-width: 768px) {
          .cz-section-wrapper {
            padding: 16px 16px 48px 16px;
          }
          .cz-section-title {
            font-size: 20px;
          }
          .cz-section-subtitle {
            font-size: 13px;
          }
        }
      `}</style>
    </>
  );
}
