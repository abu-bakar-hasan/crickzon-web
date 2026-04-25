import Link from 'next/link';

export default function HeroSection() {
  return (
    <>
      {/* ── Section 1: Above hero text & Player image ── */}
      <section className="relative w-full px-6 py-4">
        <div className="max-w-[1280px] mx-auto flex justify-between items-center relative z-10">
          <div className="flex flex-col">
            <span className="text-xl font-normal text-gray-700">Built with</span>
            <span className="text-[52px] font-black italic text-black leading-none">STYLE</span>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-xl font-normal text-gray-700">Made for</span>
            <span className="text-[52px] font-black italic text-black leading-none">SKILL</span>
          </div>
        </div>

        {/* Player image — centered absolutely */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center w-full">
          <div className="relative h-[420px] w-[420px] -mt-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://ik.imagekit.io/crickzon/batsman-hero-pose2.png"
              alt="Cricket Player"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* ── Section 2: Hero Card ── */}
      <section className="relative z-20">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="bg-cz-blue rounded-3xl p-10 flex justify-between items-center relative overflow-visible min-h-[360px] max-[850px]:flex-col max-[850px]:items-center max-[850px]:text-center max-[850px]:gap-10 max-[850px]:p-10">

            {/* Left: copy */}
            <div className="flex flex-col items-start max-w-[400px] z-40 max-[850px]:items-center">
              <div className="bg-white/10 text-white text-xs px-3 py-1 rounded-full mb-4">
                New Arrivals
              </div>
              <h1 className="text-4xl font-bold text-white leading-snug whitespace-pre-line mb-3">
                {`Where Skill\nMeets Power`}
              </h1>
              <p className="text-sm text-white/80 mb-6">
                Shop into the future of cricket accessories today.
              </p>
              <Link
                href="/store"
                className="bg-white text-cz-blue px-6 py-3 rounded-full text-sm font-semibold no-underline inline-block"
              >
                New Drops →
              </Link>
            </div>

            {/* Right: features + mini product card */}
            <div className="flex flex-col items-end z-40 max-[850px]:items-center">
              <div className="flex gap-4 mb-8 max-[600px]:flex-col max-[600px]:gap-2 max-[850px]:justify-center">
                {[
                  { icon: '⭐', label: 'Trusted Brand' },
                  { icon: '💎', label: 'Top Quality' },
                  { icon: '⚡', label: 'Quick Delivery' },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <span className="text-xs">{f.icon}</span>
                    <span className="text-[10px] text-white/70">{f.label}</span>
                  </div>
                ))}
              </div>

              {/* Mini product card */}
              <div className="bg-white rounded-2xl p-4 w-[160px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] flex flex-col gap-2">
                <div className="bg-cz-surface rounded-lg h-[120px] flex items-center justify-center p-2">
                  <img
                    src="https://ik.imagekit.io/crickzon/product4.png"
                    alt="Cricket Jersey"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-[13px] font-semibold text-cz-ink m-0">Cricket Jersey</h4>
                  <p className="text-[11px] text-cz-gray mt-0.5 mb-2">Comfortable Sportswear</p>
                </div>
                <Link href="/store" className="no-underline">
                  <span className="bg-cz-blue text-white text-[11px] px-3 py-1 rounded-[20px] inline-block">
                    Shop Now
                  </span>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
