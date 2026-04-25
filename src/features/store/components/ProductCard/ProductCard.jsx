'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import useCartStore from '@/store/cartStore';
import { useToast } from '@/context/ToastContext';

export default function ProductCard({ productId, name, brand, images, minPrice, maxPrice, slug, variants }) {
  const router = useRouter();
  const { addItem } = useCartStore();
  const { showToast } = useToast();

  const imageUrl = images?.length > 0 ? images[0] : 'https://placehold.co/400x400/eeeeee/aaaaaa?text=Image';

  const formatPrice = (price) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price || 0);

  const displayPrice =
    minPrice === maxPrice ? formatPrice(minPrice) : `${formatPrice(minPrice)} – ${formatPrice(maxPrice)}`;

  const isSingleVariant = variants?.length === 1;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isSingleVariant) { router.push(`/store/${slug}`); return; }
    const variant = variants[0];
    addItem({ _id: productId, name, brand, images, slug }, { _id: variant._id, price: variant.price, stock: variant.stock }, {}, 1);
    showToast('Added to cart!', 'success');
  };

  return (
    <div className="bg-white rounded-2xl border border-cz-border flex flex-col overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5">
      <Link href={`/store/${slug}`} className="block no-underline">
        {/* Image */}
        <div className="h-[200px] bg-[#F0F4F8] flex items-center justify-center overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={name || 'Product Image'} className="w-full h-full object-cover" />
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col flex-1">
          <div className="flex flex-col mb-4 flex-1">
            <h3 className="text-sm font-semibold text-cz-ink mb-1 leading-snug line-clamp-2">{name}</h3>
            <span className="text-xs text-cz-gray">{brand}</span>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[15px] font-semibold text-cz-blue">{displayPrice}</span>
            <button
              onClick={handleAddToCart}
              className="w-full bg-cz-blue hover:bg-cz-blue-dark text-white rounded-lg py-2.5 text-[13px] font-semibold cursor-pointer transition-colors duration-200"
            >
              {isSingleVariant ? 'Add to Cart' : 'Select Options'}
            </button>
          </div>
        </div>
      </Link>
    </div>
  );
}
