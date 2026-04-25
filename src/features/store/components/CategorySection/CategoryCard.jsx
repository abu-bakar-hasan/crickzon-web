import Link from 'next/link';

const FALLBACK_COLORS = [
  '#EBF3FF', '#FFF3E0', '#E8F5E9', '#FCE4EC',
  '#F3E5F5', '#E0F2F1', '#FFF8E1', '#E8EAF6',
];

/**
 * A single category card displaying its image or a fallback icon.
 */
export default function CategoryCard({ cat, index }) {
  const bg = FALLBACK_COLORS[index % FALLBACK_COLORS.length];

  return (
    <Link href={`/store/c/${cat.slug}`} className="block no-underline w-full">
      <div className="w-full bg-white border border-cz-border rounded-[14px] flex flex-col items-center gap-2 px-2 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(0,87,168,0.12)] cursor-pointer select-none">
        {cat.image ? (
          <div className="w-16 h-16 flex items-center justify-center bg-cz-surface rounded-[10px] overflow-hidden">
            <img src={cat.image} alt={cat.name} className="max-w-full max-h-full object-contain" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-[10px] flex items-center justify-center text-[26px]" style={{ backgroundColor: bg }}>
            {cat.icon || '🛍️'}
          </div>
        )}
        <span className="text-[11px] font-semibold text-cz-ink uppercase tracking-[0.04em] text-center truncate w-full">
          {cat.name}
        </span>
      </div>
    </Link>
  );
}
