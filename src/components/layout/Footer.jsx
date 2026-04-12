import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import {
  InstagramIcon,
  NewTwitterIcon,
  YoutubeIcon,
  Mail01Icon,
  CallIcon,
  Location01Icon,
} from '@hugeicons/core-free-icons';

const SHOP_LINKS = [
  { label: 'All Products', href: '/store' },
  { label: 'Bats', href: '/store?category=bats' },
  { label: 'Balls', href: '/store?category=balls' },
  { label: 'Protective Gear', href: '/store?category=protective-gear' },
  { label: 'Accessories', href: '/store?category=accessories' },
];

const SUPPORT_LINKS = [
  { label: 'Contact Us', href: '/contact' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Shipping Policy', href: '/shipping-policy' },
  { label: 'Return Policy', href: '/return-policy' },
];

const SOCIAL = [
  {
    label: 'Instagram',
    href: 'https://instagram.com/crickzon',
    icon: InstagramIcon,
  },
  {
    label: 'Twitter / X',
    href: 'https://twitter.com/crickzon',
    icon: NewTwitterIcon,
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@crickzon',
    icon: YoutubeIcon,
  },
];

function FooterHeading({ children }) {
  return (
    <h3
      style={{
        fontSize: '13px',
        fontWeight: 700,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: '#94A3B8',
        marginBottom: '16px',
      }}
    >
      {children}
    </h3>
  );
}

function FooterLink({ href, children }) {
  return (
    <li style={{ marginBottom: '10px' }}>
      <Link
        href={href}
        style={{
          fontSize: '14px',
          color: '#CBD5E1',
          textDecoration: 'none',
          transition: 'color 0.15s ease',
        }}
        className="cz-footer-link"
      >
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0F172A', color: '#ffffff' }}>
      {/* ── Main grid ── */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '48px 24px 32px',
        }}
      >
        <div className="cz-footer-grid">

          {/* Column 1 — Brand */}
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
              {SOCIAL.map(({ label, href, icon }) => (
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
                  <HugeiconsIcon
                    icon={icon}
                    size={16}
                    color="currentColor"
                    strokeWidth={1.8}
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2 — Shop */}
          <div>
            <FooterHeading>Shop</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {SHOP_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 3 — Support */}
          <div>
            <FooterHeading>Support</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {SUPPORT_LINKS.map((l) => (
                <FooterLink key={l.href} href={l.href}>
                  {l.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Column 4 — Contact */}
          <div>
            <FooterHeading>Contact</FooterHeading>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                <span style={{ color: '#0057A8', marginTop: '1px', flexShrink: 0 }}>
                  <HugeiconsIcon icon={Mail01Icon} size={15} color="currentColor" strokeWidth={1.8} />
                </span>
                <a
                  href="mailto:support@crickzon.in"
                  style={{ fontSize: '14px', color: '#CBD5E1', textDecoration: 'none' }}
                  className="cz-footer-link"
                >
                  support@crickzon.in
                </a>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  marginBottom: '12px',
                }}
              >
                <span style={{ color: '#0057A8', marginTop: '1px', flexShrink: 0 }}>
                  <HugeiconsIcon icon={CallIcon} size={15} color="currentColor" strokeWidth={1.8} />
                </span>
                <a
                  href="tel:+910000000000"
                  style={{ fontSize: '14px', color: '#CBD5E1', textDecoration: 'none' }}
                  className="cz-footer-link"
                >
                  +91 XXXXX XXXXX
                </a>
              </li>
              <li
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                }}
              >
                <span style={{ color: '#0057A8', marginTop: '1px', flexShrink: 0 }}>
                  <HugeiconsIcon icon={Location01Icon} size={15} color="currentColor" strokeWidth={1.8} />
                </span>
                <span style={{ fontSize: '14px', color: '#CBD5E1' }}>India</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        style={{
          borderTop: '1px solid #1E293B',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
            © 2026 Crickzon. All rights reserved.
          </p>
          <p style={{ fontSize: '13px', color: '#94A3B8', margin: 0 }}>
            Made with ❤️ in India
          </p>
        </div>
      </div>

      {/* ── Scoped styles ── */}
      <style>{`
        .cz-footer-link:hover {
          color: #F5A623 !important;
        }
        .cz-social-btn:hover {
          background-color: #0057A8 !important;
          border-color: #0057A8 !important;
          color: #ffffff !important;
        }

        /* 4-column grid on desktop */
        .cz-footer-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 40px;
        }

        @media (max-width: 1024px) {
          .cz-footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 32px;
          }
        }

        @media (max-width: 600px) {
          .cz-footer-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
        }
      `}</style>
    </footer>
  );
}