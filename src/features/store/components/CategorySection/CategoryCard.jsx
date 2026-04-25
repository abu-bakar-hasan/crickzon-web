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
    <Link href={`/store/c/${cat.slug}`} className="czcat-link">
      <div className="czcat-card">
        {cat.image ? (
          <div className="czcat-imgbox">
             <img src={cat.image} alt={cat.name} className="czcat-img" />
          </div>
        ) : (
          <div className="czcat-icon-box" style={{ backgroundColor: bg }}>
            <span className="czcat-icon">{cat.icon || '🛍️'}</span>
          </div>
        )}
        <span className="czcat-name">{cat.name}</span>
      </div>
    </Link>
  );
}
