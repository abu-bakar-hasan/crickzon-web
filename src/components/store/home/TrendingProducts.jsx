'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  useEffect(() => {
    api.get('/products?limit=8')
      .then(res => setProducts(res.data.products || res.data || []))
      .catch(err => console.error('Failed to load products', err))
      .finally(() => setProductsLoading(false));
  }, []);

  return (
    <>
      <section className="cz-tp-section">
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
            <div>
              <h2 className="cz-tp-title">Trending Products</h2>
              <p className="cz-tp-subtitle">Discover what players are buying right now</p>
            </div>
            <Link href="/store/search" className="cz-tp-link">View All</Link>
          </div>

          {productsLoading ? (
            <div className="cz-tp-grid">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} style={{ backgroundColor: '#F1F5F9', borderRadius: '16px', height: '280px', border: '1px solid #E5E7EB' }} />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="cz-tp-grid">
              {products.map((product) => {
                const imageUrl = product.images?.[0]?.url || product.image;
                return (
                  <Link
                    key={product._id || product.slug}
                    href={`/store/p/${product.slug}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <div
                      className="cz-tp-card"
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
                      <div className="cz-tp-img-area">
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
                      <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <div className="cz-tp-name">
                          {product.name}
                        </div>
                        <div className="cz-tp-price">
                          ₹{product.price || 0}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div style={{ textAlign: 'center', color: '#6B7280', padding: '40px 0', border: '1px dashed #E5E7EB', borderRadius: '16px' }}>
              No trending products available right now.
            </div>
          )}
        </div>
      </section>

      <style>{`
        .cz-tp-section {
          padding: 24px 24px 32px 24px;
        }

        .cz-tp-title {
          font-size: 24px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 4px 0;
        }

        .cz-tp-subtitle {
          font-size: 14px;
          color: #6B7280;
          margin: 0;
        }

        .cz-tp-link {
          font-size: 14px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
          white-space: nowrap;
        }

        .cz-tp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .cz-tp-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .cz-tp-img-area {
          width: 100%;
          height: 200px;
          background-color: #F8FAFC;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          box-sizing: border-box;
        }

        .cz-tp-name {
          font-size: 14px;
          font-weight: 600;
          color: #0F172A;
          margin-bottom: 8px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .cz-tp-price {
          margin-top: auto;
          font-weight: 700;
          color: #E21B70;
          font-size: 16px;
        }

        @media (max-width: 1024px) {
          .cz-tp-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
          }
        }

        @media (max-width: 768px) {
          .cz-tp-section {
            padding: 16px 12px 24px 12px;
          }
          .cz-tp-title {
            font-size: 18px;
            margin: 0;
          }
          .cz-tp-subtitle {
            font-size: 12px;
          }
          .cz-tp-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .cz-tp-img-area {
            height: 130px;
            padding: 10px;
          }
          .cz-tp-name {
            font-size: 13px;
          }
          .cz-tp-price {
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
