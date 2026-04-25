"use client";

import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

const FALLBACK_COLORS = [
  "#EBF3FF", "#FFF3E0", "#E8F5E9", "#FCE4EC",
  "#F3E5F5", "#E0F2F1", "#FFF8E1", "#E8EAF6",
];

export default function FilterSliders({ filters, onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api.get("/categories")
      .then((res) => setCategories(res.data.categories || res.data || []))
      .catch((err) => console.error("FilterSliders categories:", err));
    api.get("/brands")
      .then((res) => setBrands(res.data.brands || res.data || []))
      .catch((err) => console.error("FilterSliders brands:", err));
  }, []);

  const toggle = (key, val) =>
    onFilterChange(key, filters[key] === val ? "" : val);

  return (
    <div className="flex flex-col gap-4 w-full min-w-0">
      {/* ── Category strip ── */}
      {categories.length > 0 && (
        <FilterCardStrip label="Category">
          {categories.map((cat, i) => {
            const val = cat.slug || cat.name;
            return (
              <SwiperSlide key={cat._id || val} style={{ width: "100px" }}>
                <FilterCard
                  image={cat.image}
                  fallbackBg={FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                  fallbackIcon={cat.icon || "🛍️"}
                  label={cat.name}
                  active={filters.category === val}
                  onClick={() => toggle("category", val)}
                />
              </SwiperSlide>
            );
          })}
        </FilterCardStrip>
      )}

      {/* ── Brand strip ── */}
      {brands.length > 0 && (
        <FilterCardStrip label="Brand">
          {brands.map((brand) => {
            const val = brand.name;
            return (
              <SwiperSlide key={brand._id || brand.name} style={{ width: "100px" }}>
                <FilterCard
                  image={brand.image}
                  fallbackInitial={brand.name?.charAt(0).toUpperCase()}
                  label={brand.name}
                  active={filters.brand === val}
                  onClick={() => toggle("brand", val)}
                />
              </SwiperSlide>
            );
          })}
        </FilterCardStrip>
      )}
    </div>
  );
}

/* ── Strip with heading ─────────────────────────────────────────── */
function FilterCardStrip({ label, children }) {
  return (
    <div className="flex flex-col gap-2.5 w-full min-w-0 overflow-hidden">
      <span className="text-sm font-bold text-cz-ink">{label}</span>
      <div className="w-full min-w-0 overflow-hidden">
        <Swiper modules={[FreeMode]} freeMode spaceBetween={10} slidesPerView="auto" className="!pb-2">
          {children}
        </Swiper>
      </div>
    </div>
  );
}

/* ── Individual image card ──────────────────────────────────────── */
function FilterCard({ image, fallbackBg, fallbackInitial, fallbackIcon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={[
        "w-full bg-white border rounded-[14px] flex flex-col items-center gap-2 px-1.5 py-3 cursor-pointer select-none transition-all duration-150",
        active
          ? "border-cz-blue outline outline-2 outline-cz-blue outline-offset-2 shadow-[0_2px_8px_rgba(0,87,168,0.25)] -translate-y-0.5"
          : "border-cz-border hover:border-cz-blue hover:shadow-[0_4px_12px_rgba(0,87,168,0.10)] hover:-translate-y-0.5",
      ].join(" ")}
    >
      {/* Image / fallback */}
      {image ? (
        <div className="w-13 h-13 flex items-center justify-center bg-cz-surface rounded-[10px] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={label} className="max-w-full max-h-full object-contain" />
        </div>
      ) : fallbackInitial ? (
        <div className="w-13 h-13 bg-cz-blue-light rounded-[10px] flex items-center justify-center text-[22px] font-extrabold text-cz-blue">
          {fallbackInitial}
        </div>
      ) : (
        <div className="w-13 h-13 rounded-[10px] flex items-center justify-center text-[22px]" style={{ backgroundColor: fallbackBg }}>
          {fallbackIcon}
        </div>
      )}
      <span className={`text-[11px] font-semibold uppercase tracking-[0.03em] text-center truncate w-full ${active ? "text-cz-blue" : "text-cz-ink"}`}>
        {label}
      </span>
    </button>
  );
}
