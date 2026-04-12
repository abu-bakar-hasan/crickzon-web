'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

const mockProduct = {
  name: "SS Ton Elite Bat",
  brand: "SS",
  category: "Bats",
  description: "Professional cricket bat crafted for elite players. Delivering unparalleled power and a legendary sweet spot for the modern game.",
  // Generating identical images to demonstrate the thumbnail gallery functionally
  images: [
    "https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp",
    "https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp",
    "https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp",
    "https://ik.imagekit.io/crickzon/mrf-genius_dSGO-OAk-.webp"
  ],
  options: [
    { name: "Weight", values: ["1.1kg", "1.2kg", "1.3kg"] },
    { name: "Grade", values: ["English Willow", "Kashmir Willow"] }
  ],
  variants: [
    { options: { Weight: "1.1kg", Grade: "English Willow" }, price: 3999, stock: 20 },
    { options: { Weight: "1.1kg", Grade: "Kashmir Willow" }, price: 2499, stock: 15 },
    { options: { Weight: "1.2kg", Grade: "English Willow" }, price: 4299, stock: 8 },
    { options: { Weight: "1.2kg", Grade: "Kashmir Willow" }, price: 2799, stock: 0 },
    // Mock missing variants to show what happens if none match
  ]
};

export default function ProductDetailPage() {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [quantity, setQuantity] = useState(1);

  // Initialize selected options with the first available values
  useEffect(() => {
    const initialOptions = {};
    mockProduct.options.forEach(opt => {
      initialOptions[opt.name] = opt.values[0];
    });
    setSelectedOptions(initialOptions);
  }, []);

  // Find the currently selected variant
  const currentVariant = useMemo(() => {
    return mockProduct.variants.find(v => {
      // Check if all selected option values match the variant's options
      for (const key in selectedOptions) {
        if (v.options[key] !== selectedOptions[key]) return false;
      }
      return true;
    });
  }, [selectedOptions]);

  // Handle stock boundary logic
  useEffect(() => {
    if (!currentVariant || currentVariant.stock === 0) {
      setQuantity(1);
    } else if (quantity > currentVariant.stock) {
      setQuantity(currentVariant.stock);
    }
  }, [currentVariant, quantity]);

  const handleOptionSelect = (optName, valName) => {
    setSelectedOptions(prev => ({ ...prev, [optName]: valName }));
  };

  const handleDecQty = () => {
    setQuantity(q => Math.max(1, q - 1));
  };
  
  const handleIncQty = () => {
    if (!currentVariant) return;
    setQuantity(q => Math.min(currentVariant.stock, q + 1));
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price || 0);
  };

  // Determine price display
  const priceDisplay = useMemo(() => {
    if (currentVariant) {
      return formatPrice(currentVariant.price);
    }
    // Variant doesn't exist
    return 'Unavailable';
  }, [currentVariant]);

  const inStock = currentVariant && currentVariant.stock > 0;

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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={mockProduct.images[activeImageIdx]} 
              alt={mockProduct.name}
              style={{ width: '80%', height: '80%', objectFit: 'contain' }}
            />
          </div>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {mockProduct.images.map((img, idx) => {
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
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={img} alt="" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'cover' }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* ── RIGHT: Product Info ── */}
        <div className="cz-pdp-info">
          
          {/* Breadcrumb */}
          <div style={{ fontSize: '13px', color: '#6B7280', marginBottom: '16px' }}>
            <Link href="/store" style={{ color: '#6B7280', textDecoration: 'none' }}>Store</Link>
            <span style={{ margin: '0 8px' }}>&rarr;</span>
            <Link href={`/store/c/${mockProduct.category.toLowerCase()}`} style={{ color: '#6B7280', textDecoration: 'none' }}>
              {mockProduct.category}
            </Link>
            <span style={{ margin: '0 8px' }}>&rarr;</span>
            <span style={{ color: '#0F172A', fontWeight: 500 }}>{mockProduct.name}</span>
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
              {mockProduct.brand}
            </span>
          </div>
          
          <h1 style={{ fontSize: '28px', fontWeight: 700, color: '#0F172A', margin: '0 0 12px 0' }}>
            {mockProduct.name}
          </h1>

          {/* Price */}
          <div style={{ fontSize: '24px', fontWeight: 700, color: '#0057A8', marginBottom: '24px' }}>
            {priceDisplay}
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid #E5E7EB', margin: '0 0 24px 0' }} />

          {/* Variants */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '24px' }}>
            {mockProduct.options.map(opt => (
              <div key={opt.name}>
                <label style={{ fontSize: '13px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, display: 'block', marginBottom: '12px' }}>
                  {opt.name}
                </label>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {opt.values.map(val => {
                    const isSelected = selectedOptions[opt.name] === val;
                    return (
                      <button
                        key={val}
                        onClick={() => handleOptionSelect(opt.name, val)}
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
            {(!currentVariant) ? (
               <>
                 <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#EF4444' }}></span>
                 <span style={{ fontSize: '14px', color: '#EF4444', fontWeight: 500 }}>Unavailable</span>
               </>
            ) : currentVariant.stock > 10 ? (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#10B981' }}></span>
                <span style={{ fontSize: '14px', color: '#10B981', fontWeight: 500 }}>In Stock</span>
              </>
            ) : currentVariant.stock > 0 ? (
              <>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#F59E0B' }}></span>
                <span style={{ fontSize: '14px', color: '#F59E0B', fontWeight: 500 }}>Only {currentVariant.stock} left</span>
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
                disabled={!inStock || quantity >= (currentVariant?.stock || 0)}
                style={{ width: '40px', height: '100%', background: 'none', border: 'none', fontSize: '18px', cursor: (!inStock || quantity >= (currentVariant?.stock || 0)) ? 'not-allowed' : 'pointer', color: '#374151' }}
              >+</button>
            </div>

            {/* Add to Cart */}
            <button
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
              {mockProduct.description}
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
