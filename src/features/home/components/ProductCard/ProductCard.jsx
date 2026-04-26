import Link from "next/link";

export default function ProductCard({ product }) {
  const imageUrl = product.images?.[0] || "https://placehold.co/400x400/F5F5F5/0057A8?text=No+Image";
  const priceDisplay = product.minPrice ? `₹${product.minPrice.toLocaleString()}` : "Price Unavailable";

  return (
    <div className="group flex flex-col gap-4 h-full">
      <Link href={`/store/${product.slug}`} className="relative aspect-square bg-[#F5F5F5] rounded-2xl overflow-hidden block">
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{product.brand}</span>
        <Link href={`/store/${product.slug}`} className="hover:underline">
          <h3 className="font-bold text-[#0F172A] text-lg truncate">{product.name}</h3>
        </Link>
        <p className="font-bold text-[#0057A8] text-lg">{priceDisplay}</p>
      </div>
      <Link href={`/store/${product.slug}`} className="w-full py-3 bg-[#0057A8] hover:bg-[#004282] text-white font-semibold rounded-xl transition-colors mt-auto text-center block">
        Select Options
      </Link>
    </div>
  );
}
