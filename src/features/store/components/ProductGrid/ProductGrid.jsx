"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useDebounce } from "@/hooks/useDebounce";
import SearchBar from "@/features/store/components/SearchBar/SearchBar";
import FilterSliders from "@/features/store/components/FilterSidebar/FilterSidebar";
import ProductCard from "@/features/store/components/ProductCard/ProductCard";

/* ── Skeleton card ────────────────────────────────────────────────── */
function SkeletonCard() {
  return <div style={skeletonStyles.card} className="czpg-skeleton" />;
}

/* ── Empty state ──────────────────────────────────────────────────── */
function EmptyState({ onClear }) {
  return (
    <div style={emptyStyles.wrapper}>
      {/* Minimal cricket-stump SVG with an X mark */}
      <svg
        width="80"
        height="80"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "20px" }}
      >
        {/* Stumps */}
        <rect x="22" y="28" width="5" height="30" rx="2.5" fill="#E2E8F0" />
        <rect x="37.5" y="28" width="5" height="30" rx="2.5" fill="#E2E8F0" />
        <rect x="53" y="28" width="5" height="30" rx="2.5" fill="#E2E8F0" />
        {/* Bails */}
        <rect x="20" y="26" width="17" height="4" rx="2" fill="#CBD5E1" />
        <rect x="43" y="26" width="17" height="4" rx="2" fill="#CBD5E1" />
        {/* X mark circle */}
        <circle cx="58" cy="22" r="14" fill="#FEE2E2" />
        <line
          x1="52"
          y1="16"
          x2="64"
          y2="28"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="64"
          y1="16"
          x2="52"
          y2="28"
          stroke="#EF4444"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>

      <h3 style={emptyStyles.heading}>No products found</h3>
      <p style={emptyStyles.subtext}>Try adjusting your search or filters</p>
      <button onClick={onClear} style={emptyStyles.btn}>
        Clear Search &amp; Filters
      </button>
    </div>
  );
}

/* ── Main ProductGrid component ───────────────────────────────────── */
export default function ProductGrid() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ category: "", brand: "" });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const debouncedSearch = useDebounce(searchTerm, 400);

  /* Build and fire the API request whenever search/filters change */
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
      .catch((err) => console.error("ProductGrid fetch error:", err))
      .finally(() => setLoading(false));
  }, [debouncedSearch, filters.category, filters.brand]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleClearAll = () => {
    setSearchTerm("");
    setFilters({ category: "", brand: "" });
  };

  return (
    <div style={styles.root}>
      {/* ── Search bar (full width) ── */}
      <div style={styles.searchRow}>
        <SearchBar value={searchTerm} onChange={setSearchTerm} />
      </div>

      {/* ── Filter sliders (full width, above grid) ── */}
      <div style={styles.filtersRow}>
        <FilterSliders filters={filters} onFilterChange={handleFilterChange} />
      </div>

      {/* ── Product grid ── */}
      <div style={styles.gridWrapper}>
        {loading ? (
          <div style={styles.grid} className="czpg-grid">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : products.length === 0 ? (
          <EmptyState onClear={handleClearAll} />
        ) : (
          <div style={styles.grid} className="czpg-grid">
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

      {/* ── Scoped styles ── */}
      <style>{`
        /* Responsive grid breakpoints */
        .czpg-grid {
          display: grid;
          gap: 20px;
          grid-template-columns: repeat(2, 1fr);
        }
        @media (min-width: 768px) {
          .czpg-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .czpg-grid { grid-template-columns: repeat(4, 1fr); }
        }

        /* Skeleton pulse animation */
        @keyframes czpg-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        .czpg-skeleton {
          animation: czpg-pulse 1.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

/* ── Layout styles ───────────────────────────────────────────────── */
const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  searchRow: {
    width: "100%",
  },
  filtersRow: {
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
  },
  gridWrapper: {
    width: "100%",
    minWidth: 0,
  },
  grid: {
    /* base grid set in <style> for media query support */
  },
};

const skeletonStyles = {
  card: {
    height: "280px",
    backgroundColor: "#F0F4F8",
    borderRadius: "16px",
    border: "1px solid #E5E7EB",
  },
};

const emptyStyles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "80px 24px",
    textAlign: "center",
  },
  heading: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#0F172A",
    margin: "0 0 8px 0",
  },
  subtext: {
    fontSize: "14px",
    color: "#6B7280",
    margin: "0 0 24px 0",
  },
  btn: {
    backgroundColor: "#0057A8",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "10px 20px",
    fontSize: "14px",
    fontWeight: 600,
    cursor: "pointer",
  },
};
