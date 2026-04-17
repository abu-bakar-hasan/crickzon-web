'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { ShoppingCart01Icon, FireIcon } from '@hugeicons/core-free-icons';
import api from '@/lib/axios';
import useCartStore from '@/store/cartStore';

function ProductSkeleton() {
  return (
    <div className="czp-card czp-skeleton">
      <div className="czp-skel-img" />
      <div style={{ padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <div className="czp-skel-bar" />
        <div className="czp-skel-bar czp-skel-bar--sm" />
        <div className="czp-skel-bar czp-skel-bar--xs" />
      </div>
    </div>
  );
}

function ProductCard({ product }) {
  const { addItem } = useCartStore();
  const [added, setAdded] = useState(false);

  const price = product.price ?? product.variants?.[0]?.price ?? 0;
  const originalPrice = product.originalPrice ?? product.compareAtPrice ?? null;
  const discount = originalPrice && price < originalPrice
    ? Math.round(((originalPrice - price) / originalPrice) * 100)
    : null;

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem({
      id: product._id,
      name: product.name,
      price,
      image: product.images?.[0] || product.image || null,
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <Link href={`/store/${product.slug || product._id}`} className="czp-link">
      <div className="czp-card">
        {/* Image */}
        <div className="czp-imgbox">
          {product.images?.[0] || product.image ? (
            <img
              src={product.images?.[0] || product.image}
              alt={product.name}
              className="czp-img"
            />
          ) : (
            <div className="czp-img-placeholder">🏏</div>
          )}
          {discount && (
            <span className="czp-badge">-{discount}%</span>
          )}
        </div>

        {/* Info */}
        <div className="czp-body">
          <span className="czp-brand">{product.brand?.name || product.brandName || ''}</span>
          <span className="czp-name">{product.name}</span>
          <div className="czp-pricing">
            <span className="czp-price">Rs {price.toLocaleString()}</span>
            {originalPrice && (
              <span className="czp-original">Rs {originalPrice.toLocaleString()}</span>
            )}
          </div>

          <button
            className={`czp-cart-btn ${added ? 'czp-cart-btn--added' : ''}`}
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <HugeiconsIcon icon={ShoppingCart01Icon} size={14} color="currentColor" />
            {added ? 'Added!' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  );
}

export default function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Tries to get newest/trending products — adjust query params to match your API
    api.get('/products?sort=newest&limit=12')
      .then(res => setProducts(res.data.products || res.data || []))
      .catch(err => console.error('TrendingProducts:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="czp-section">
      {/* Header */}
      <div className="czp-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HugeiconsIcon icon={FireIcon} size={20} color="#EF4444" />
          <div>
            <h2 className="czp-title">New &amp; Trending</h2>
            <p className="czp-subtitle">Latest arrivals just for you</p>
          </div>
        </div>
        <Link href="/store/search" className="czp-see-all">See all →</Link>
      </div>

      {/* Grid */}
      <div className="czp-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ProductSkeleton key={i} />)
          : products.map(p => <ProductCard key={p._id} product={p} />)
        }
      </div>

      <style>{`
        .czp-section { width: 100%; }

        .czp-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .czp-title {
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 2px 0;
        }

        .czp-subtitle {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
        }

        .czp-see-all {
          font-size: 13px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
        }
        .czp-see-all:hover { text-decoration: underline; }

        /* Grid */
        .czp-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
        }
        @media (max-width: 900px) {
          .czp-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (max-width: 600px) {
          .czp-grid { grid-template-columns: repeat(2, 1fr); gap: 10px; }
        }

        .czp-link { text-decoration: none; }

        /* Card */
        .czp-card {
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .czp-card:hover {
          box-shadow: 0 6px 24px rgba(0,0,0,0.09);
          transform: translateY(-3px);
        }

        /* Image */
        .czp-imgbox {
          position: relative;
          width: 100%;
          height: 160px;
          background: #F8FAFC;
          overflow: hidden;
        }
        .czp-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          display: block;
          padding: 10px;
          transition: transform 0.3s ease;
        }
        .czp-card:hover .czp-img { transform: scale(1.04); }

        .czp-img-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 48px;
        }

        .czp-badge {
          position: absolute;
          top: 8px;
          left: 8px;
          background: #EF4444;
          color: #ffffff;
          font-size: 11px;
          font-weight: 700;
          padding: 2px 8px;
          border-radius: 100px;
        }

        /* Body */
        .czp-body {
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex: 1;
        }

        .czp-brand {
          font-size: 11px;
          font-weight: 600;
          color: #0057A8;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .czp-name {
          font-size: 13px;
          font-weight: 600;
          color: #0F172A;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .czp-pricing {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        .czp-price {
          font-size: 15px;
          font-weight: 700;
          color: #0F172A;
        }

        .czp-original {
          font-size: 12px;
          color: #9CA3AF;
          text-decoration: line-through;
        }

        /* Cart button */
        .czp-cart-btn {
          margin-top: auto;
          padding-top: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          width: 100%;
          padding: 8px 12px;
          border-radius: 8px;
          border: 1px solid #0057A8;
          background: transparent;
          color: #0057A8;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.18s ease, color 0.18s ease;
        }
        .czp-cart-btn:hover,
        .czp-cart-btn--added {
          background: #0057A8;
          color: #ffffff;
        }

        /* Skeleton */
        .czp-skeleton {
          background: #F1F5F9;
          border: none;
          pointer-events: none;
          animation: czp-pulse 1.4s ease-in-out infinite;
        }
        .czp-skel-img {
          width: 100%;
          height: 160px;
          background: #E2E8F0;
        }
        .czp-skel-bar {
          height: 12px;
          border-radius: 6px;
          background: #E2E8F0;
          width: 90%;
        }
        .czp-skel-bar--sm { width: 60%; height: 10px; }
        .czp-skel-bar--xs { width: 40%; height: 10px; }
        @keyframes czp-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
