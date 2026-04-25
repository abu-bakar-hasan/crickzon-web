import Link from 'next/link';

/**
 * A single brand card displaying its logo or initial.
 */
export default function BrandCard({ brand }) {
  return (
    <Link href={`/store/brand/${brand.slug || brand._id}`} className="czb-link">
      <div className="czb-card">
        {brand.image ? (
          <div className="czb-imgbox">
            <img src={brand.image} alt={brand.name} className="czb-img" />
          </div>
        ) : (
          <div className="czb-initial">
            {brand.name?.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="czb-name">{brand.name}</span>
      </div>
    </Link>
  );
}
