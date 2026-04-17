'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';

const FALLBACK_COLORS = [
  '#EBF3FF', '#FFF3E0', '#E8F5E9', '#FCE4EC',
  '#F3E5F5', '#E0F2F1', '#FFF8E1', '#E8EAF6',
];

function CategorySkeleton() {
  return (
    <div className="czcat-card czcat-skeleton">
      <div className="czcat-skel-img" />
      <div className="czcat-skel-bar" />
      <div className="czcat-skel-bar czcat-skel-bar--sm" />
    </div>
  );
}

function CategoryCard({ cat, index }) {
  const bg = FALLBACK_COLORS[index % FALLBACK_COLORS.length];

  return (
    <Link href={`/store/c/${cat.slug}`} className="czcat-link">
      <div className="czcat-card">
        {cat.image ? (
          <img src={cat.image} alt={cat.name} className="czcat-img" />
        ) : (
          <div className="czcat-icon-box" style={{ backgroundColor: bg }}>
            <span className="czcat-icon">{cat.icon || '🛍️'}</span>
          </div>
        )}
        <div className="czcat-body">
          <span className="czcat-name">{cat.name}</span>
          {cat.productCount > 0 && (
            <span className="czcat-count">{cat.productCount} items</span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function CategoryGrid() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.categories || res.data || []))
      .catch(err => console.error('CategoryGrid:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="czcat-section">
      {/* Header */}
      <div className="czcat-header">
        <div>
          <h2 className="czcat-title">Shop by Category</h2>
          <p className="czcat-subtitle">Find the perfect gear for your game</p>
        </div>
        <Link href="/store/categories" className="czcat-see-all">See all →</Link>
      </div>

      {/* Grid */}
      <div className="czcat-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <CategorySkeleton key={i} />)
          : categories.map((cat, i) => (
              <CategoryCard key={cat._id || cat.slug} cat={cat} index={i} />
            ))
        }
      </div>

      <style>{`
        .czcat-section { width: 100%; }

        .czcat-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .czcat-title {
          font-size: 20px;
          font-weight: 700;
          color: #0F172A;
          margin: 0 0 2px 0;
        }

        .czcat-subtitle {
          font-size: 13px;
          color: #6B7280;
          margin: 0;
        }

        .czcat-see-all {
          font-size: 13px;
          font-weight: 600;
          color: #0057A8;
          text-decoration: none;
          white-space: nowrap;
        }
        .czcat-see-all:hover { text-decoration: underline; }

        /* Grid */
        .czcat-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 10px;
        }
        @media (min-width: 540px) {
          .czcat-grid { grid-template-columns: repeat(3, 1fr); gap: 12px; }
        }
        @media (min-width: 900px) {
          .czcat-grid { grid-template-columns: repeat(4, 1fr); gap: 14px; }
        }

        /* Link reset */
        .czcat-link { text-decoration: none; }

        /* Card */
        .czcat-card {
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          overflow: hidden;
          background: #ffffff;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
          cursor: pointer;
        }
        .czcat-card:hover {
          box-shadow: 0 6px 22px rgba(0,0,0,0.09);
          transform: translateY(-3px);
        }

        .czcat-img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          display: block;
        }

        .czcat-icon-box {
          width: 100%;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .czcat-icon { font-size: 44px; }

        .czcat-body {
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .czcat-name {
          font-size: 14px;
          font-weight: 600;
          color: #0F172A;
        }

        .czcat-count {
          font-size: 12px;
          color: #9CA3AF;
        }

        /* Skeleton */
        .czcat-skeleton {
          border: none;
          background: #F1F5F9;
          pointer-events: none;
          animation: czcat-pulse 1.4s ease-in-out infinite;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 14px;
        }
        .czcat-skel-img {
          width: 100%;
          height: 100px;
          border-radius: 10px;
          background: #E2E8F0;
        }
        .czcat-skel-bar {
          height: 12px;
          border-radius: 6px;
          background: #E2E8F0;
          width: 80%;
        }
        .czcat-skel-bar--sm { width: 50%; height: 10px; }

        @keyframes czcat-pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
