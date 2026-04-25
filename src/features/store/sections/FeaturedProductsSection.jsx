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
    <section style={{ backgroundColor: '#F8FAFC', padding: '48px 24px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        
        <div className="cz-products-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px' }}>
          <div style={{ textAlign: 'center', width: '100%' }} className="cz-products-header-title">
            <h2 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 8px 0' }}>New Arrivals</h2>
            <p style={{ fontSize: '15px', color: '#6B7280', margin: 0 }}>Fresh gear just dropped</p>
          </div>
          
          <Link 
            href="/store"
            className="cz-view-all-btn"
            style={{
              display: 'inline-block',
              border: '1px solid #E5E7EB',
              padding: '8px 16px',
              borderRadius: '50px',
              fontSize: '13px',
              fontWeight: 600,
              color: '#374151',
              textDecoration: 'none',
              transition: 'background-color 0.2s ease',
              whiteSpace: 'nowrap'
            }}
          >
            View All
          </Link>
        </div>

        <div className="cz-products-grid">
          {loading ? (
            Array.from({ length: 4 }).map((_, idx) => (
              <ProductCardSkeleton key={idx} />
            ))
          ) : (
            products.map((product) => (
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
          )}
        </div>

      </div>
      
      <style>{`
        .cz-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1024px) {
          .cz-products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .cz-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
          
          .cz-products-header {
            flex-direction: column;
            align-items: center !important;
            gap: 16px;
          }
          
          .cz-products-header-title {
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
