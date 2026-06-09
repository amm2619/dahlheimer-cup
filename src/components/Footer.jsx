export default function Footer({ onHostLogin }) {
  return (
    <footer style={{ background: '#0e2c1f', color: '#8a937f', textAlign: 'center', padding: '30px 40px', fontSize: 14 }}>
      <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 18, color: '#d8b24a' }}>
        Happy retirement, Brian. The back nine awaits.
      </div>
      <div style={{ marginTop: 6, color: '#b3bda9' }}>
        August 8, 2026 · 1730 Saddle Drive, Gambrills, MD · Catering by Valanti
      </div>
      <button
        className="no-print"
        onClick={onHostLogin}
        style={{
          marginTop: 16,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          background: 'transparent',
          border: '1px solid rgba(216,178,74,0.35)',
          color: '#b3bda9',
          fontSize: 14,
          padding: '8px 16px',
          borderRadius: 100,
          cursor: 'pointer',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d8b24a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Host sign-in
      </button>
    </footer>
  );
}
