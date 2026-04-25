"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/features/store/components/SearchBar/SearchBar";
import FilterSliders from "@/features/store/components/FilterSidebar/FilterSidebar";
import ProductCard from "@/features/store/components/ProductCard/ProductCard";

/* ── Skeleton card ─────────────────────────────────────────────── */
function SkeletonCard() {
  return <div className="h-[280px] bg-[#F0F4F8] rounded-2xl border border-cz-border animate-pulse" />;
}

/* ── Empty state ───────────────────────────────────────────────── */
function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="mb-5">
        <rect x="22" y="28" width="5" height="30" rx="2.5" fill="#E2E8F0" />
        <rect x="37.5" y="28" width="5" height="30" rx="2.5" fill="#E2E8F0" />
        <rect x="53" y="28" width="5" height="30" rx="2.5" fill="#E2E8F0" />
        <rect x="20" y="26" width="17" height="4" rx="2" fill="#CBD5E1" />
        <rect x="43" y="26" width="17" height="4" rx="2" fill="#CBD5E1" />
        <circle cx="58" cy="22" r="14" fill="#FEE2E2" />
        <line x1="52" y1="16" x2="64" y2="28" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <line x1="64" y1="16" x2="52" y2="28" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
      <h3 className="text-lg font-bold text-cz-ink mb-2">No products found</h3>
      <p className="text-sm text-cz-gray mb-6">Try adjusting your search or filters</p>
      <button
        onClick={onClear}
        className="bg-cz-blue hover:bg-cz-blue-dark text-white border-none rounded-lg px-5 py-2.5 text-sm font-semibold cursor-pointer transition-colors"
      >
        Clear Search &amp; Filters
      </button>
    </div>
  );
}

/* ── Main ProductGrid ──────────────────────────────────────────── */
export default function ProductGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "", brand: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 400);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (debouncedSearch) params.set("search", debouncedSearch);
    if (filters.category) params.set("category", filters.category);
    if (filters.brand) params.set("brand", filters.brand);
    const qs = params.toString();
    api
      .get(`/products${qs ? `?${qs}` : ""}`)
      .then((res) => setProducts(Array.isArray(res.data) ? res.data : []))
      .catch((err) => console.error("ProductGrid:", err))
      .finally(() => setLoading(false));
  }, [debouncedSearch, filters.category, filters.brand]);

  const handleFilterChange = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const handleClearAll = () => {
    setSearchTerm("");
    setFilters({ category: "", brand: "" });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Search */}
      <SearchBar value={searchTerm} onChange={setSearchTerm} />

      {/* Filter sliders */}
      <FilterSliders filters={filters} onFilterChange={handleFilterChange} />

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : products.length === 0 ? (
        <EmptyState onClear={handleClearAll} />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              productId={product._id}
              name={product.name}
              brand={product.brand}
              images={product.images}
              minPrice={product.minPrice}
              maxPrice={product.maxPrice}
              slug={product.slug}
              variants={product.variants}
            />
          ))}
        </div>
      )}
    </div>
  );
}
