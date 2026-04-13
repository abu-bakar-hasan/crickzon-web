'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import { useToast } from '@/context/ToastContext';

export default function ProductCard({ productId, name, brand, images, minPrice, maxPrice, slug, variants }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { showToast } = useToast();

  const imageUrl = images && images.length > 0 ? images[0] : 'https://placehold.co/400x400/eeeeee/aaaaaa?text=Image';

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price || 0);

  const displayPrice =
    minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`;

  const isSingleVariant = variants?.length === 1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isSingleVariant) {
      router.push(`/store/${slug}`);
      return;
    }

    const variant = variants[0];
    addItem(
      { _id: productId, name, brand, images, slug },
      { _id: variant._id, price: variant.price, stock: variant.stock },
      {},
      1
    );
    showToast('Added to cart!', 'success');
  };

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '16px',
        border: '1px solid #E5E7EB',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
      }}
      className="cz-product-card"
    >
      <Link href={`/store/${slug}`} style={{ display: 'block', textDecoration: 'none' }}>
        {/* Image Container */}
        <div
          style={{
            height: '200px',
            backgroundColor: '#F0F4F8',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={name || 'Product Image'}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        {/* Content Body */}
        <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '16px', flex: 1 }}>
            <h3
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#0F172A',
                margin: '0 0 4px 0',
                lineHeight: 1.4,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {name}
            </h3>
            <span style={{ fontSize: '12px', color: '#6B7280' }}>{brand}</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span style={{ fontSize: '15px', fontWeight: 600, color: '#0057A8' }}>{displayPrice}</span>
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                backgroundColor: '#0057A8',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px 0',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              className="cz-add-to-cart-btn"
            >
              {isSingleVariant ? 'Add to Cart' : 'Select Options'}
            </button>
          </div>
        </div>
      </Link>

      <style>{`
        .cz-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 24px rgba(0,0,0,0.06);
        }
        .cz-add-to-cart-btn:hover {
          background-color: #004485 !important;
        }
      `}</style>
    </div>
  );
}
