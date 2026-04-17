'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

// Static slides — swap for API data when a banners endpoint exists
const SLIDES = [
  {
    id: 1,
    tag: 'New Arrival',
    title: 'Season 2025 — Cricket Gear',
    subtitle: 'Premium bats, gloves & more from the world\'s top brands.',
    cta: { label: 'Shop Now', href: '/store/search' },
    gradient: 'linear-gradient(135deg, #003A70 0%, #0057A8 60%, #1A78C2 100%)',
    accent: '#FFD700',
    emoji: '🏏',
  },
  {
    id: 2,
    tag: 'Limited Offer',
    title: 'Up to 40% Off on Helmets',
    subtitle: 'Stay protected. Stay stylish. Shop our premium helmet collection.',
    cta: { label: 'View Deals', href: '/store/search?q=helmets' },
    gradient: 'linear-gradient(135deg, #1B0036 0%, #4A00A0 60%, #7B2FF7 100%)',
    accent: '#00E5FF',
    emoji: '🪖',
  },
  {
    id: 3,
    tag: 'Top Brands',
    title: 'Find Your Favourite Brand',
    subtitle: 'Browse gear from Gray-Nicolls, Kookaburra, MRF, SG & more.',
    cta: { label: 'Browse Brands', href: '/store/brands' },
    gradient: 'linear-gradient(135deg, #003D2E 0%, #006B4F 60%, #00A878 100%)',
    accent: '#FFE500',
    emoji: '🏆',
  },
];

export default function HeroBanner() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);
  const total = SLIDES.length;

  const goTo = (idx) => setCurrent((idx + total) % total);

  // Auto-play
  useEffect(() => {
    timerRef.current = setInterval(() => goTo(current + 1), 4500);
    return () => clearInterval(timerRef.current);
  }, [current]);

  const slide = SLIDES[current];

  return (
    <section className="czh-hero">
      {/* Slides */}
      <div
        className="czh-track"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {SLIDES.map((s) => (
          <div key={s.id} className="czh-slide" style={{ background: s.gradient }}>
            {/* Decorative circles */}
            <div className="czh-circle czh-circle-1" style={{ borderColor: s.accent }} />
            <div className="czh-circle czh-circle-2" style={{ borderColor: s.accent }} />

            <div className="czh-content">
              <span className="czh-tag" style={{ backgroundColor: s.accent, color: '#0F172A' }}>
                {s.tag}
              </span>
              <div className="czh-emoji">{s.emoji}</div>
              <h2 className="czh-title">{s.title}</h2>
              <p className="czh-sub">{s.subtitle}</p>
              <Link href={s.cta.href} className="czh-btn" style={{ backgroundColor: s.accent, color: '#0F172A' }}>
                {s.cta.label} →
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Dot pagination */}
      <div className="czh-dots">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            className={`czh-dot ${i === current ? 'czh-dot--active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Arrow controls */}
      <button className="czh-arrow czh-arrow--prev" onClick={() => goTo(current - 1)} aria-label="Previous slide">‹</button>
      <button className="czh-arrow czh-arrow--next" onClick={() => goTo(current + 1)} aria-label="Next slide">›</button>

      <style>{`
        .czh-hero {
          position: relative;
          width: 100%;
          height: 320px;
          overflow: hidden;
          border-radius: 16px;
        }

        .czh-track {
          display: flex;
          width: 100%;
          height: 100%;
          transition: transform 0.6s cubic-bezier(0.77, 0, 0.18, 1);
        }

        .czh-slide {
          position: relative;
          min-width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          overflow: hidden;
          padding: 0 48px;
        }

        /* decorative rings */
        .czh-circle {
          position: absolute;
          border-radius: 50%;
          border: 2px solid;
          opacity: 0.15;
        }
        .czh-circle-1 {
          width: 400px;
          height: 400px;
          right: -80px;
          top: -100px;
        }
        .czh-circle-2 {
          width: 260px;
          height: 260px;
          right: 80px;
          bottom: -80px;
        }

        .czh-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
          max-width: 520px;
        }

        .czh-tag {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          width: fit-content;
        }

        .czh-emoji {
          font-size: 36px;
          line-height: 1;
        }

        .czh-title {
          font-size: clamp(18px, 2.5vw, 30px);
          font-weight: 800;
          color: #ffffff;
          margin: 0;
          line-height: 1.2;
        }

        .czh-sub {
          font-size: 13px;
          color: rgba(255,255,255,0.75);
          margin: 0;
          line-height: 1.5;
        }

        .czh-btn {
          display: inline-block;
          padding: 8px 20px;
          border-radius: 100px;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          width: fit-content;
          transition: opacity 0.18s ease, transform 0.18s ease;
        }
        .czh-btn:hover {
          opacity: 0.88;
          transform: translateY(-1px);
        }

        /* Dots */
        .czh-dots {
          position: absolute;
          bottom: 14px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 6px;
          z-index: 10;
        }

        .czh-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          border: none;
          background: rgba(255,255,255,0.4);
          cursor: pointer;
          padding: 0;
          transition: background 0.2s, width 0.2s;
        }
        .czh-dot--active {
          background: #ffffff;
          width: 20px;
          border-radius: 100px;
        }

        /* Arrows */
        .czh-arrow {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255,255,255,0.15);
          border: none;
          color: #ffffff;
          font-size: 26px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background 0.18s ease;
          backdrop-filter: blur(6px);
          line-height: 1;
        }
        .czh-arrow:hover { background: rgba(255,255,255,0.3); }
        .czh-arrow--prev { left: 12px; }
        .czh-arrow--next { right: 12px; }

        /* Tablet */
        @media (max-width: 768px) {
          .czh-hero { height: 240px; }
          .czh-slide { padding: 0 28px; }
          .czh-circle-1 { width: 280px; height: 280px; }
          .czh-circle-2 { display: none; }
          .czh-emoji { font-size: 28px; }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .czh-hero { height: 210px; border-radius: 12px; }
          .czh-slide { padding: 0 16px; }
          .czh-circle { display: none; }
          .czh-arrow { display: none; }
          .czh-sub { display: none; }
          .czh-emoji { font-size: 24px; }
        }
      `}</style>
    </section>
  );
}
