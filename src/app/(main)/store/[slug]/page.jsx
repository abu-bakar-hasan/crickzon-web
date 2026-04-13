'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import api from '@/lib/axios';
import useCartStore from '@/store/cartStore';

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params?.slug || '';

  const [product, setProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCartStore();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Fetch product data
  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    api.get(`/products/${slug}`)
      .then(res => {
        setProduct(res.data.product);
        setVariants(res.data.variants);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [slug]);

  // Build options from variants dynamically
  const optionsMap = useMemo(() => {
    const options = {};
    variants.forEach(variant => {
      variant.options.forEach(opt => {
        const optName = opt.option?.name || opt.option;
        if (!options[optName]) options[optName] = new Set();
        options[optName].add(opt.value);
      });
    });
    // Convert sets to arrays
    return Object.fromEntries(
      Object.entries(options).map(([k, v]) => [k, [...v]])
    );
  }, [variants]);

  // Initialize selected options with the first available values whenever options evaluate
  useEffect(() => {
    if (Object.keys(optionsMap).length > 0 && Object.keys(selectedOptions).length === 0) {
      const initialOptions = {};
      Object.keys(optionsMap).forEach(optName => {
        initialOptions[optName] = optionsMap[optName][0];
      });
      setSelectedOptions(initialOptions);
    }
  }, [optionsMap, selectedOptions]);

  // Find the currently selected variant safely evaluating option permutations
  const selectedVariant = useMemo(() => {
    if (variants.length === 0) return null;
    return variants.find(variant =>
      Object.entries(selectedOptions).every(([optName, val]) =>
        variant.options.some(o => (o.option?.name || o.option) === optName && o.value === val)
      )
    );
  }, [variants, selectedOptions]);

  // Handle stock boundary logic directly mapped to active variants
  useEffect(() => {
    if (!selectedVariant || selectedVariant.stock === 0) {
      setQuantity(1);
    } else if (quantity > selectedVariant.stock) {
      setQuantity(selectedVariant.stock);
    }
  }, [selectedVariant, quantity]);

  const handleOptionSelect = (optName, valName) => {
    setSelectedOptions(prev => ({ ...prev, [optName]: valName }));
  };

  const handleDecQty = () => {
    setQuantity(q => Math.max(1, q - 1));
  };
  
  const handleIncQty = () => {
    if (!selectedVariant) return;
    setQuantity(q => Math.min(selectedVariant.stock, q + 1));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // Determine pricing UI
  const priceDisplay = useMemo(() => {
    if (selectedVariant) {
      return formatPrice(selectedVariant.price);
    }
    return 'Unavailable';
  }, [selectedVariant]);

  const inStock = selectedVariant && selectedVariant.stock > 0;

  const handleAddToCart = () => {
    if (!selectedVariant || !product) return;
    addItem(product, selectedVariant, selectedOptions, quantity);
    alert('Added to cart!');
  };

  // UI STATE: Loading Skeleton Hook
  if (loading) {
    return (
      <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '64px' }}>
        <div 
          style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px' }}
          className="cz-pdp-container animate-pulse"
        >
          <div style={{ width: '100%', aspectRatio: '1/1', backgroundColor: '#E5E7EB', borderRadius: '16px' }}></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div style={{ width: '60%', height: '40px', backgroundColor: '#E5E7EB', borderRadius: '8px' }}></div>
            <div style={{ width: '40%', height: '30px', backgroundColor: '#E5E7EB', borderRadius: '8px' }}></div>
            <div style={{ width: '100%', height: '200px', backgroundColor: '#E5E7EB', borderRadius: '16px' }}></div>
          </div>
        </div>
        <style>{`
          .cz-pdp-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 64px;
          }
          @media (max-width: 768px) {
            .cz-pdp-container {
              grid-template-columns: 1fr;
              gap: 32px;
            }
          }
        `}</style>
      </div>
    );
  }

  // UI STATE: 404 Missing
  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 min-h-screen bg-white">
        <h1 className="text-[20px] font-[600] text-[#0F172A] mb-2">Product Not Found</h1>
        <Link href="/store" className="text-[#0057A8] hover:underline">Return to Store</Link>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#ffffff', minHeight: '100vh', paddingBottom: '64px' }}>
      <div 
        style={{ 
          maxWidth: '1280px', 
          margin: '0 auto', 
          padding: '32px 24px',
        }}
        className="cz-pdp-container"
      >
        
        {/* ── LEFT: Image Gallery ── */}
        <div className="cz-pdp-gallery">
          {/* Main Image */}
          <div 
            style={{ 
              width: '100%', 
              aspectRatio: '1/1', 
              backgroundColor: '#F0F4F8',
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              overflow: 'hidden'
            }}
          >
            {product.images && product.images.length > 0 ? (
              <img 
                src={product.images[activeImageIdx] || product.images[0]} 
                alt={product.name}
                style={{ width: '80%', height: '80%', objectFit: 'contain' }}
              />
            ) : (
              <div style={{ color: '#9CA3AF' }}>No Image</div>
            )}
          </div>

          {/* Thumbnails */}
          {(product.images && product.images.length > 1) && (
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              {product.images.map((img, idx) => {
                const isActive = idx === activeImageIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '8px',
                      border: isActive ? '2px solid #0057A8' : '2px solid transparent',
                      backgroundColor: '#F0F4F8',
                      cursor: 'pointer',
                      padding: '4px',
                      transition: 'border-color 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <img src={img} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div className="cz-pdp-info">
          
          {/* Breadcrumb */}
          <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
            <Link href="/store" style={{ color: '#6B7280', textDecoration: 'none' }}>Store</Link>
            {product.category && (
              <>
                <span style={{ margin: '0 8px' }}>&rarr;</span>
                <Link href={`/store/c/${product.category.toLowerCase()}`} style={{ color: '#6B7280', textDecoration: 'none' }}>
                  {product.category}
                </Link>
              </>
            )}
            <span style={{ margin: '0 8px' }}>&rarr;</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>{product.name}</span>
          </div>

          {/* Title & Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <span 
              style={{ 
                backgroundColor: '#EBF3FF', 
                color: '#0057A8', 
                fontSize: '12px', 
                fontWeight: 600,
                padding: '4px 12px', 
                borderRadius: '50px' 
              }}
            >
              {product.brand}
            </span>
          </div>
          
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0' }}>
            {product.name}
          </h1>

          {/* Price */}
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0057A8', marginBottom: '24px' }}>
            {priceDisplay}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 24px 0' }} />

          {/* Variants */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
            {Object.entries(optionsMap).map(([optName, values]) => (
              <div key={optName}>
                <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                  {optName}
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {values.map(val => {
                    const isSelected = selectedOptions[optName] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleOptionSelect(optName, val)}
                        style={{
                          backgroundColor: isSelected ? '#0057A8' : '#ffffff',
                          color: isSelected ? '#ffffff' : '#374151',
                          border: `1px solid ${isSelected ? '#0057A8' : '#E5E7EB'}`,
                          borderRadius: '20px',
                          padding: '8px 16px',
                          fontSize: '13px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {val}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Stock Indicator */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px' }}>
            {(!selectedVariant) ? (
               <>
                 <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                 <span style={{ fontSize: '14px', color: '#EF4444', fontWeight: 500 }}>Unavailable</span>
               </>
            ) : selectedVariant.stock > 10 ? (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                <span style={{ fontSize: '14px', color: '#10B981', fontWeight: 500 }}>In Stock</span>
              </>
            ) : selectedVariant.stock > 0 ? (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
                <span style={{ fontSize: '14px', color: '#F59E0B', fontWeight: 500 }}>Only {selectedVariant.stock} left</span>
              </>
            ) : (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                <span style={{ fontSize: '14px', color: '#EF4444', fontWeight: 500 }}>Out of Stock</span>
              </>
            )}
          </div>

          {/* Actions: Quantity & Add to Cart */}
          <div className="cz-add-actions" style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            {/* Quantity */}
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                border: '1px solid #E5E7EB', 
                borderRadius: '12px',
                height: '48px',
                overflow: 'hidden'
              }}
            >
              <button 
                onClick={handleDecQty}
                disabled={!inStock || quantity <= 1}
                style={{ width: '40px', height: '100%', background: 'none', border: 'none', fontSize: '18px', cursor: (!inStock || quantity <= 1) ? 'not-allowed' : 'pointer', color: '#374151' }}
              >-</button>
              <input 
                type="text" 
                value={inStock ? quantity : 0} 
                readOnly
                style={{ width: '40px', height: '100%', textAlign: 'center', border: 'none', outline: 'none', fontSize: '15px', fontWeight: 500, color: '#0F172A', backgroundColor: '#ffffff' }}
              />
              <button 
                onClick={handleIncQty}
                disabled={!inStock || quantity >= (selectedVariant?.stock || 0)}
                style={{ width: '40px', height: '100%', background: 'none', border: 'none', fontSize: '18px', cursor: (!inStock || quantity >= (selectedVariant?.stock || 0)) ? 'not-allowed' : 'pointer', color: '#374151' }}
              >+</button>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              style={{
                flex: 1,
                backgroundColor: inStock ? '#0057A8' : '#D1D5DB',
                color: inStock ? '#ffffff' : '#9CA3AF',
                border: 'none',
                borderRadius: '12px',
                height: '48px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: inStock ? 'pointer' : 'not-allowed',
                transition: 'background-color 0.2s ease'
              }}
            >
              {inStock ? 'Add to Cart' : 'Out of Stock'}
            </button>
          </div>

          {/* Description */}
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#0F172A', marginBottom: '8px' }}>Description</h3>
            <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: 1.6, margin: 0 }}>
              {product.description}
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 24px 0' }} />

          {/* Features Strip */}
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {[
              { icon: '🚚', text: 'Free Shipping' },
              { icon: '↩️', text: '7-day Returns' },
              { icon: '✅', text: 'Authentic Product' }
            ].map(ft => (
              <div key={ft.text} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '18px' }}>{ft.icon}</span>
                <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{ft.text}</span>
              </div>
            ))}
          </div>

        </div>

      </div>

      <style>{`
        /* PDP Layout Layout */
        .cz-pdp-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
        }

        @media (max-width: 1024px) {
          .cz-pdp-container {
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .cz-pdp-container {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          
          .cz-add-actions {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>
    </div>
  );
}
