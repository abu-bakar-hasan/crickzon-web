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
    <section style={{ position: 'relative', width: '100%', height: '400px', overflow: 'hidden', backgroundColor: '#F8FAFC' }}>
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            opacity: index === currentSlide ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
            backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(${slide.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            textAlign: 'center',
            padding: '0 24px',
            zIndex: index === currentSlide ? 1 : 0
          }}
        >
          <h1 style={{ fontSize: '48px', fontWeight: 800, margin: '0 0 16px 0', textShadow: '0 2px 10px rgba(0,0,0,0.5)', maxWidth: '800px', lineHeight: 1.1 }}>{slide.title}</h1>
          <p style={{ fontSize: '20px', margin: 0, paddingBottom: '32px', textShadow: '0 2px 10px rgba(0,0,0,0.5)', maxWidth: '600px', opacity: 0.9 }}>{slide.subtitle}</p>
          <Link href="/store" style={{ padding: '14px 32px', backgroundColor: '#E21B70', color: '#fff', fontWeight: 700, borderRadius: '30px', textDecoration: 'none', transition: 'background-color 0.2s, transform 0.2s', fontSize: '16px', boxShadow: '0 4px 14px rgba(226, 27, 112, 0.4)' }}>
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
  );
}
