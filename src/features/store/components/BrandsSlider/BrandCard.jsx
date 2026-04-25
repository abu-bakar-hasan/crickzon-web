import Link from 'next/link';

/**
 * A single brand card displaying its logo or initial.
 */
export default function BrandCard({ brand }) {
  return (
    <Link href={`/store/brand/${brand.slug || brand._id}`} className="block no-underline w-full">
      <div className="w-full bg-white border border-cz-border rounded-[14px] flex flex-col items-center gap-2 px-2 py-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(0,87,168,0.12)] select-none cursor-pointer">
        {brand.image ? (
          <div className="w-16 h-16 flex items-center justify-center bg-cz-surface rounded-[10px] overflow-hidden">
            <img src={brand.image} alt={brand.name} className="max-w-full max-h-full object-contain" />
          </div>
        ) : (
          <div className="w-16 h-16 bg-cz-blue-light rounded-[10px] flex items-center justify-center text-[26px] font-extrabold text-cz-blue">
            {brand.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="text-[11px] font-semibold text-cz-ink uppercase tracking-[0.04em] text-center truncate w-full">
          {brand.name}
        </span>
      </div>
    </Link>
  );
}
