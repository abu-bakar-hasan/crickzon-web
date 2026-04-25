import Link from 'next/link';

const CATEGORIES = [
  { name: 'Bats', icon: '🏏', slug: 'bats' },
  { name: 'Balls', icon: '🎯', slug: 'balls' },
  { name: 'Protective Gear', icon: '🛡️', slug: 'protective-gear' },
  { name: 'Footwear', icon: '👟', slug: 'footwear' },
];

export default function CategorySection() {
  return (
    <section className="bg-white py-12 px-6 relative z-10">
      <div className="max-w-[1280px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-cz-ink mb-2">Shop by Category</h2>
          <p className="text-[15px] text-cz-gray">Find the perfect gear for your game</p>
        </div>

        <div className="grid grid-cols-4 gap-6 max-sm:flex max-sm:overflow-x-auto max-sm:snap-x max-sm:snap-mandatory max-sm:pb-4">
          {CATEGORIES.map((cat) => (
            <Link key={cat.slug} href={`/store/c/${cat.slug}`} className="no-underline max-sm:shrink-0 max-sm:w-[180px] max-sm:snap-start">
              <div className="bg-[#F0F4F8] rounded-2xl p-6 text-center flex flex-col items-center gap-3 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(0,0,0,0.06)]">
                <span className="text-3xl">{cat.icon}</span>
                <span className="text-[15px] font-semibold text-cz-ink">{cat.name}</span>
                <span className="text-[13px] text-cz-blue">Shop Now →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
