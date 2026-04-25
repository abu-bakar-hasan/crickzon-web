import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon, CallIcon, Location01Icon } from '@hugeicons/core-free-icons';
import { SHOP_LINKS, SUPPORT_LINKS } from './footer.constants';
import FooterBrand from './FooterBrand';
import FooterColumn from './FooterColumn';
import FooterLink from './FooterLink';

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
          <FooterBrand />

          {/* Column 2 — Shop */}
          <FooterColumn title="Shop">
            {SHOP_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Column 3 — Support */}
          <FooterColumn title="Support">
            {SUPPORT_LINKS.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterColumn>

          {/* Column 4 — Contact */}
          <FooterColumn title="Contact">
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
          </FooterColumn>
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
