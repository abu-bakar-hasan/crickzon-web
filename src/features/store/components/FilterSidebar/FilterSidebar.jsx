'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/axios';

/**
 * FilterSidebar
 * Props:
 *   filters        { category: string, brand: string }
 *   onFilterChange (key: 'category' | 'brand', value: string) => void
 */
export default function FilterSidebar({ filters, onFilterChange }) {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    api.get('/categories')
      .then(res => setCategories(res.data.categories || res.data || []))
      .catch(err => console.error('FilterSidebar categories:', err));

    api.get('/brands')
      .then(res => setBrands(res.data.brands || res.data || []))
      .catch(err => console.error('FilterSidebar brands:', err));
  }, []);

  const hasActiveFilter = filters.category || filters.brand;

  const handleClearAll = () => {
    onFilterChange('category', '');
    onFilterChange('brand', '');
  };

  return (
    <aside style={styles.sidebar}>
      {/* Header */}
      <div style={styles.header}>
        <span style={styles.title}>Filters</span>
        {hasActiveFilter && (
          <button onClick={handleClearAll} style={styles.clearAll}>
            Clear All
          </button>
        )}
      </div>

      {/* ── Category ── */}
      <FilterSection label="Category">
        {categories.map((cat) => {
          const val = cat.slug || cat.name;
          const isActive = filters.category === val;
          return (
            <Pill
              key={val}
              label={cat.name}
              active={isActive}
              onClick={() => onFilterChange('category', isActive ? '' : val)}
            />
          );
        })}
      </FilterSection>

      {/* ── Brand ── */}
      <FilterSection label="Brand">
        {brands.map((brand) => {
          const val = brand.name;
          const isActive = filters.brand === val;
          return (
            <Pill
              key={brand._id || brand.name}
              label={brand.name}
              active={isActive}
              onClick={() => onFilterChange('brand', isActive ? '' : val)}
            />
          );
        })}
      </FilterSection>
    </aside>
  );
}

/* ── Internal sub-components ─────────────────────────────────────── */

function FilterSection({ label, children }) {
  return (
    <div style={styles.section}>
      <span style={styles.sectionLabel}>{label}</span>
      <div style={styles.pillGroup}>{children}</div>
    </div>
  );
}

function Pill({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...styles.pill,
        backgroundColor: active ? '#0057A8' : '#ffffff',
        color: active ? '#ffffff' : '#6B7280',
        border: `1px solid ${active ? '#0057A8' : '#E5E7EB'}`,
      }}
    >
      {label}
    </button>
  );
}

/* ── Styles ─────────────────────────────────────────────────────── */

const styles = {
  sidebar: {
    width: '260px',
    flexShrink: 0,
    backgroundColor: '#ffffff',
    border: '1px solid #E5E7EB',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignSelf: 'flex-start',
    position: 'sticky',
    top: '24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#0F172A',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  clearAll: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#0057A8',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: 0,
  },
  section: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sectionLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  pillGroup: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px',
  },
  pill: {
    fontSize: '13px',
    fontWeight: 500,
    borderRadius: '20px',
    padding: '5px 12px',
    cursor: 'pointer',
    transition: 'background-color 0.15s ease, color 0.15s ease',
    whiteSpace: 'nowrap',
  },
};
