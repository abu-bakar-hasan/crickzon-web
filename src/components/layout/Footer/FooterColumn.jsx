/**
 * A wrapper for a column of footer items, including the heading.
 */
export default function FooterColumn({ title, children }) {
  return (
    <div>
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
        {title}
      </h3>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {children}
      </ul>
    </div>
  );
}
