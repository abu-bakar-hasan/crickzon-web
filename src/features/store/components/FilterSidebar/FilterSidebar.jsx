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

/**
 * FilterSliders
 * Props:
 *   filters        { category: string, brand: string }
 *   onFilterChange (key, value) => void
 *
 * Two horizontal Swiper image-card sliders — Category and Brand —
 * styled identically to BrandsSlider / CategorySection.
 * Active card gets a blue ring + label colour change.
 */
export default function FilterSliders({ filters, onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api
      .get("/categories")
      .then((res) => setCategories(res.data.categories || res.data || []))
      .catch((err) => console.error("FilterSliders categories:", err));

    api
      .get("/brands")
      .then((res) => setBrands(res.data.brands || res.data || []))
      .catch((err) => console.error("FilterSliders brands:", err));
  }, []);

  const toggle = (key, val) =>
    onFilterChange(key, filters[key] === val ? "" : val);

  return (
    <div style={styles.root}>
      {/* ── Category strip ── */}
      {categories.length > 0 && (
        <FilterCardStrip label="Category">
          {categories.map((cat, i) => {
            const val = cat.slug || cat.name;
            const isActive = filters.category === val;
            return (
              <SwiperSlide key={cat._id || val} style={{ width: "100px" }}>
                <FilterCard
                  image={cat.image}
                  fallbackBg={FALLBACK_COLORS[i % FALLBACK_COLORS.length]}
                  fallbackIcon={cat.icon || "🛍️"}
                  label={cat.name}
                  active={isActive}
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
            const isActive = filters.brand === val;
            return (
              <SwiperSlide key={brand._id || brand.name} style={{ width: "100px" }}>
                <FilterCard
                  image={brand.image}
                  fallbackInitial={brand.name?.charAt(0).toUpperCase()}
                  label={brand.name}
                  active={isActive}
                  onClick={() => toggle("brand", val)}
                />
              </SwiperSlide>
            );
          })}
        </FilterCardStrip>
      )}

      <style>{`
        /* Active ring on the card wrapper */
        .czfs-card--active {
          outline: 2px solid #0057A8;
          outline-offset: 2px;
          box-shadow: 0 4px 14px rgba(0,87,168,0.18) !important;
          transform: translateY(-2px) !important;
        }
        .czfs-card {
          width: 100%;
          background: #ffffff;
          border: 1px solid #E5E7EB;
          border-radius: 14px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          padding: 12px 6px 10px;
          cursor: pointer;
          user-select: none;
          transition: box-shadow 0.2s ease, transform 0.2s ease;
        }
        .czfs-card:hover:not(.czfs-card--active) {
          box-shadow: 0 4px 12px rgba(0,87,168,0.10);
          transform: translateY(-2px);
        }
        .czfs-imgbox {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F8FAFC;
          border-radius: 10px;
          overflow: hidden;
        }
        .czfs-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }
        .czfs-initial {
          width: 52px;
          height: 52px;
          background: #EBF3FF;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          font-weight: 800;
          color: #0057A8;
        }
        .czfs-icon-box {
          width: 52px;
          height: 52px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
        }
        .czfs-label {
          font-size: 11px;
          font-weight: 600;
          color: #0F172A;
          text-transform: uppercase;
          letter-spacing: 0.03em;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
        .czfs-card--active .czfs-label {
          color: #0057A8;
        }
        .czfs-swiper {
          width: 100%;
          padding-bottom: 8px !important;
        }
      `}</style>
    </div>
  );
}

/* ── Strip wrapper with label ───────────────────────────────────────── */
function FilterCardStrip({ label, children }) {
  return (
    <div style={stripStyles.wrapper}>
      <span style={stripStyles.label}>{label}</span>
      <div style={stripStyles.sliderContainer}>
        <Swiper
          modules={[FreeMode]}
          freeMode={true}
          spaceBetween={10}
          slidesPerView="auto"
          className="czfs-swiper"
        >
          {children}
        </Swiper>
      </div>
    </div>
  );
}

/* ── Individual filter card ─────────────────────────────────────────── */
function FilterCard({ image, fallbackBg, fallbackInitial, fallbackIcon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`czfs-card${active ? " czfs-card--active" : ""}`}
      style={{ background: "none", border: "none", padding: 0, width: "100%" }}
    >
      <div className={`czfs-card${active ? " czfs-card--active" : ""}`} style={{ width: "100%" }}>
        {/* Image or fallback */}
        {image ? (
          <div className="czfs-imgbox">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={image} alt={label} className="czfs-img" />
          </div>
        ) : fallbackInitial ? (
          <div className="czfs-initial">{fallbackInitial}</div>
        ) : (
          <div className="czfs-icon-box" style={{ backgroundColor: fallbackBg }}>
            <span>{fallbackIcon}</span>
          </div>
        )}
        <span className="czfs-label">{label}</span>
      </div>
    </button>
  );
}

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
    minWidth: 0,
  },
};

const stripStyles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
  },
  label: {
    fontSize: "14px",
    fontWeight: 700,
    color: "#0F172A",
    letterSpacing: "0.01em",
  },
  sliderContainer: {
    width: "100%",
    minWidth: 0,
    overflow: "hidden",
  },
};
