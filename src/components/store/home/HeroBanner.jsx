'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1540747913346-19e32fc3e6a6?q=80&w=2070&auto=format&fit=crop',
    title: 'New Season Gear',
    subtitle: 'Upgrade your kit with the latest arrivals.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=2069&auto=format&fit=crop',
    title: 'Pro Cricket Bats',
    subtitle: 'Handcrafted English Willow bats.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1624526267942-ab0f0b080613?q=80&w=1964&auto=format&fit=crop',
    title: 'Apparel Clearance',
    subtitle: 'Up to 50% off on all cricket apparel.',
  }
];

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto Slider effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <section className="cz-hero-section">
        {HERO_SLIDES.map((slide, index) => (
          <div
            key={slide.id}
            className="cz-hero-slide"
            style={{
              opacity: index === currentSlide ? 1 : 0,
              backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${slide.image})`,
              zIndex: index === currentSlide ? 1 : 0
            }}
          >
            <h1 className="cz-hero-title">{slide.title}</h1>
            <p className="cz-hero-subtitle">{slide.subtitle}</p>
            <Link href="/store" className="cz-hero-btn">
              Shop Now
            </Link>
          </div>
        ))}
      {/* Slider dots */}
      <div style={{ position: 'absolute', bottom: '24px', left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            style={{
              width: idx === currentSlide ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              backgroundColor: idx === currentSlide ? '#E21B70' : '#ffffff',
              border: 'none',
              opacity: idx === currentSlide ? 1 : 0.6,
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              padding: 0
            }}
          />
        ))}
      </div>
      </section>

      <style>{`
        .cz-hero-section {
          position: relative;
          width: 100%;
          height: 480px;
          overflow: hidden;
          background-color: #F8FAFC;
        }

        .cz-hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transition: opacity 0.8s ease-in-out;
          background-size: cover;
          background-position: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #fff;
          text-align: center;
          padding: 0 24px;
        }

        .cz-hero-title {
          font-size: 56px;
          font-weight: 800;
          margin: 0 0 16px 0;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          max-width: 800px;
          line-height: 1.1;
        }

        .cz-hero-subtitle {
          font-size: 22px;
          margin: 0;
          padding-bottom: 32px;
          text-shadow: 0 2px 10px rgba(0,0,0,0.5);
          max-width: 600px;
          opacity: 0.9;
        }

        .cz-hero-btn {
          padding: 16px 36px;
          background-color: #E21B70;
          color: #fff;
          font-weight: 700;
          border-radius: 30px;
          text-decoration: none;
          transition: background-color 0.2s, transform 0.2s;
          font-size: 16px;
          box-shadow: 0 4px 14px rgba(226, 27, 112, 0.4);
        }

        .cz-hero-btn:hover {
          background-color: #be165d;
          transform: translateY(-2px);
        }

        @media (max-width: 768px) {
          .cz-hero-section {
            height: 380px;
          }
          .cz-hero-title {
            font-size: 36px;
            margin-bottom: 12px;
          }
          .cz-hero-subtitle {
            font-size: 16px;
            padding-bottom: 24px;
          }
          .cz-hero-btn {
            padding: 12px 28px;
            font-size: 14px;
          }
        }
      `}</style>
    </>
  );
}
