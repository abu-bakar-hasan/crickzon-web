export default function BannerStrip() {
  const items = [
    '🚚 Free Shipping on orders above ₹999',
    '↩️ Easy 7-day Returns',
    '✅ 100% Authentic Products',
  ];

  return (
    <section className="bg-cz-blue py-5 px-6">
      <div className="max-w-[1280px] mx-auto flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-0 text-center">
        {items.map((text, i) => (
          <div key={i} className="flex items-center">
            <span className="text-sm text-white font-medium">{text}</span>
            {i < items.length - 1 && (
              <span className="hidden sm:block w-px h-4 bg-white/30 mx-6" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
