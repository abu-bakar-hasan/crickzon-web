'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import api from '@/lib/axios';
import { useDebounce } from '@/hooks/useDebounce';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const inputRef = useRef(null);
  const debouncedQuery = useDebounce(query, 300);

  // Auto-focus on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Fetch on debounced query change
  useEffect(() => {
    const trimmed = debouncedQuery.trim();
    if (!trimmed) {
      setProducts([]);
      setSearched(false);
      return;
    }

    setLoading(true);
    setSearched(true);

    api.get('/products', { params: { search: trimmed } })
      .then(res => setProducts(res.data.products || res.data || []))
      .catch(err => {
        console.error('Search failed', err);
        setProducts([]);
      })
      .finally(() => setLoading(false));
  }, [debouncedQuery]);

  const formatCurrency = (amount) => `₹${Number(amount || 0).toLocaleString('en-IN')}`;

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '64px' }}>

      {/* ── Search Header ── */}
      <div
        style={{
          backgroundColor: '#F8FAFC',
          padding: '48px 24px',
          borderBottom: '1px solid #E5E7EB',
        }}
      >
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: '#0F172A',
              marginBottom: '24px',
              textAlign: 'center',
            }}
          >
            Search Products
          </h1>

          {/* Search Input */}
          <div style={{ position: 'relative' }}>
            {/* Icon */}
            <div
              style={{
                position: 'absolute',
                left: '18px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#6B7280',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for bats, pads, gloves, helmets…"
              style={{
                width: '100%',
                height: '56px',
                paddingLeft: '52px',
                paddingRight: query ? '48px' : '20px',
                fontSize: '17px',
                borderRadius: '16px',
                border: '2px solid #E5E7EB',
                outline: 'none',
                backgroundColor: '#ffffff',
                color: '#0F172A',
                boxSizing: 'border-box',
                transition: 'border-color 0.15s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
              onFocus={(e) => (e.target.style.borderColor = '#0057A8')}
              onBlur={(e) => (e.target.style.borderColor = '#E5E7EB')}
            />

            {/* Clear button */}
            {query && (
              <button
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '4px',
                  borderRadius: '50%',
                }}
                aria-label="Clear search"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Results ── */}
      <section style={{ padding: '40px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

          {/* Loading */}
          {loading && (
            <div className="cz-search-grid">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="animate-pulse"
                  style={{
                    backgroundColor: '#F1F5F9',
                    borderRadius: '16px',
                    height: '280px',
                  }}
                />
              ))}
            </div>
          )}

          {/* Empty state — not yet searched */}
          {!loading && !searched && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>🔍</div>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
                Start typing to search products
              </p>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Search by product name, brand, or category
              </p>
            </div>
          )}

          {/* No results */}
          {!loading && searched && products.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '56px', marginBottom: '20px' }}>😔</div>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>
                No products found for &ldquo;{debouncedQuery}&rdquo;
              </p>
              <p style={{ fontSize: '14px', color: '#6B7280' }}>
                Try a different search term or browse our store.
              </p>
            </div>
          )}

          {/* Results grid */}
          {!loading && products.length > 0 && (
            <>
              <p
                style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  marginBottom: '24px',
                }}
              >
                {products.length} result{products.length !== 1 ? 's' : ''} for &ldquo;{debouncedQuery}&rdquo;
              </p>

              <div className="cz-search-grid">
                {products.map((product) => {
                  const price =
                    product.basePrice ||
                    product.variants?.[0]?.price ||
                    product.price ||
                    0;
                  const image =
                    product.images?.[0] ||
                    product.image ||
                    null;

                  return (
                    <Link
                      key={product._id || product.slug}
                      href={`/store/${product.slug || product._id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <div
                        className="cz-search-card"
                        style={{
                          backgroundColor: '#ffffff',
                          border: '1px solid #E5E7EB',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                          cursor: 'pointer',
                        }}
                      >
                        {/* Product Image */}
                        {image ? (
                          <div
                            style={{
                              width: '100%',
                              height: '180px',
                              backgroundColor: '#F8FAFC',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              padding: '16px',
                            }}
                          >
                            <img
                              src={image}
                              alt={product.name}
                              style={{
                                maxWidth: '100%',
                                maxHeight: '100%',
                                objectFit: 'contain',
                              }}
                            />
                          </div>
                        ) : (
                          <div
                            style={{
                              width: '100%',
                              height: '180px',
                              backgroundColor: '#EBF3FF',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '40px',
                            }}
                          >
                            🏏
                          </div>
                        )}

                        {/* Info */}
                        <div style={{ padding: '14px 16px' }}>
                          {product.brand && (
                            <p
                              style={{
                                fontSize: '11px',
                                fontWeight: 700,
                                color: '#0057A8',
                                textTransform: 'uppercase',
                                letterSpacing: '0.05em',
                                marginBottom: '4px',
                              }}
                            >
                              {product.brand?.name || product.brand}
                            </p>
                          )}
                          <h2
                            style={{
                              fontSize: '14px',
                              fontWeight: 600,
                              color: '#0F172A',
                              marginBottom: '8px',
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: 'vertical',
                            }}
                          >
                            {product.name}
                          </h2>
                          <p
                            style={{
                              fontSize: '15px',
                              fontWeight: 700,
                              color: '#0F172A',
                            }}
                          >
                            {formatCurrency(price)}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <style>{`
        .cz-search-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        .cz-search-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.08);
          transform: scale(1.02);
        }
        @media (max-width: 1024px) {
          .cz-search-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .cz-search-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
        @media (max-width: 480px) {
          .cz-search-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
