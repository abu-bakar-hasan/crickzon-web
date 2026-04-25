import Link from 'next/link';

/**
 * A single link item inside a footer column list.
 */
export default function FooterLink({ href, children }) {
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
