import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { SOCIAL_LINKS } from './footer.constants';

/**
 * Brand details, description, and social media icons for the Footer column 1.
 */
export default function FooterBrand() {
  return (
    <div>
      <Link
        href="/"
        style={{
          display: 'inline-block',
          textDecoration: 'none',
          fontSize: '22px',
          lineHeight: 1,
          marginBottom: '12px',
        }}
      >
        <span style={{ color: '#ffffff', fontWeight: 600 }}>Crick</span>
        <span style={{ color: '#F5A623', fontWeight: 700 }}>zon</span>
      </Link>
      <p
        style={{
          fontSize: '14px',
          color: '#94A3B8',
          lineHeight: 1.6,
          marginBottom: '20px',
          maxWidth: '220px',
        }}
      >
        Your one-stop cricket gear destination.
      </p>

      {/* Social icons */}
      <div style={{ display: 'flex', gap: '12px' }}>
        {SOCIAL_LINKS.map(({ label, href, icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              border: '1px solid #1E293B',
              backgroundColor: '#1E293B',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#94A3B8',
              textDecoration: 'none',
              transition: 'background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease',
              flexShrink: 0,
            }}
            className="cz-social-btn"
          >
            <HugeiconsIcon icon={icon} size={16} color="currentColor" strokeWidth={1.8} />
          </a>
        ))}
      </div>
    </div>
  );
}
