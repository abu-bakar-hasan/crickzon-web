'use client';

/**
 * SearchBar — controlled input with search icon + clear button.
 * Props: value {string}, onChange {(value: string) => void}
 */
export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center w-full bg-white border border-cz-border rounded-xl px-4 gap-2.5 h-12 transition-all focus-within:border-cz-blue focus-within:shadow-sm">
      {/* Search icon */}
      <svg
        className="shrink-0 text-cz-gray"
        xmlns="http://www.w3.org/2000/svg"
        width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2"
        strokeLinecap="round" strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search bats, gloves, helmets..."
        className="flex-1 min-w-0 bg-transparent border-none outline-none text-sm text-cz-ink placeholder:text-gray-400"
      />

      {value && (
        <button
          onClick={() => onChange('')}
          aria-label="Clear search"
          className="shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-cz-gray hover:bg-slate-200 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
