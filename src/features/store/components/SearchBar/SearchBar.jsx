'use client';

/**
 * SearchBar
 * Props:
 *   value    {string}   — controlled input value
 *   onChange {Function} — called on every keystroke with the new string value
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div style={styles.wrapper}>
      {/* Search icon */}
      <svg
        style={styles.searchIcon}
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#6B7280"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search bats, gloves, helmets..."
        style={styles.input}
        className="czb-searchbar-input"
      />

      {/* Clear button — only visible when value is non-empty */}
      {value && (
        <button
          onClick={() => onChange('')}
          style={styles.clearBtn}
          aria-label="Clear search"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}

      <style>{`
        .czb-searchbar-input::placeholder { color: #9CA3AF; }
        .czb-searchbar-input:focus { outline: none; }
        .czb-searchbar-input:focus-visible + style,
        .czb-searchbar-wrapper-focus { border-color: #0057A8 !important; }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#ffffff',
    border: '1px solid #E5E7EB',
    borderRadius: '12px',
    padding: '0 14px',
    gap: '10px',
    height: '48px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  searchIcon: {
    flexShrink: 0,
  },
  input: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    fontSize: '14px',
    color: '#0F172A',
    height: '100%',
  },
  clearBtn: {
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24px',
    height: '24px',
    background: '#F1F5F9',
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    color: '#6B7280',
    padding: 0,
    transition: 'background 0.15s ease',
  },
};
