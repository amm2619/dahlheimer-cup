const link = {
  display: 'inline-flex',
  alignItems: 'center',
  color: '#f1e9cf',
  textDecoration: 'none',
  fontSize: 18,
  fontWeight: 600,
  letterSpacing: '0.02em',
  whiteSpace: 'nowrap',
  padding: '10px 18px',
  borderRadius: 100,
  border: '1px solid rgba(216,178,74,0.3)',
  background: 'rgba(255,255,255,0.06)',
};

const rsvpLink = {
  ...link,
  color: '#143d2b',
  fontWeight: 700,
  padding: '10px 20px',
  border: '1px solid #d8b24a',
  background: '#d8b24a',
};

export default function Nav() {
  return (
    <nav
      className="no-print"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(11,36,25,0.97)',
        borderBottom: '1px solid rgba(216,178,74,0.4)',
        padding: '11px 14px',
      }}
    >
      <a href="#schedule" style={link}>Schedule</a>
      <a href="#cup" style={link}>Putting Cup</a>
      <a href="#help" style={link}>Help Out</a>
      <a href="#directions" style={link}>Directions</a>
      <a href="#rsvp" style={rsvpLink}>RSVP</a>
    </nav>
  );
}
