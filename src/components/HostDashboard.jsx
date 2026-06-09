import { CHORES } from '../data.js';

const GoogleMark = () => (
  <svg width="18" height="18" viewBox="0 0 18 18">
    <path fill="#4285F4" d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62z" />
    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z" />
    <path fill="#FBBC05" d="M3.97 10.72a5.4 5.4 0 0 1 0-3.44V4.95H.96a9 9 0 0 0 0 8.1l3.01-2.33z" />
    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59C13.47.89 11.43 0 9 0A9 9 0 0 0 .96 4.95l3.01 2.33C4.68 5.16 6.66 3.58 9 3.58z" />
  </svg>
);

const sectionLabel = {
  fontSize: 13,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: '#d8b24a',
  fontWeight: 600,
};

function StatCard({ value, label, gold }) {
  return (
    <div
      style={{
        flex: '1 1 120px',
        background: gold ? 'rgba(216,178,74,0.12)' : 'rgba(255,255,255,0.05)',
        border: `1px solid ${gold ? 'rgba(216,178,74,0.3)' : 'rgba(255,255,255,0.12)'}`,
        borderRadius: 12,
        padding: '14px 16px',
        textAlign: 'center',
      }}
    >
      <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 30, color: gold ? '#d8b24a' : '#f7f1df' }}>
        {value}
      </div>
      <div style={{ fontSize: 13, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#e0d4b0' }}>{label}</div>
    </div>
  );
}

export default function HostDashboard({ party, onClose }) {
  const { hostUser, hostDenied, live, rsvps, claims } = party;
  const isHost = !!hostUser;

  const guestTotal = rsvps.reduce((a, r) => a + (parseInt(r.count, 10) || 1), 0);
  const puttingTotal = rsvps.filter((r) => r.putting === true).length;

  return (
    <div
      className="no-print"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'rgba(7,22,15,0.78)',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 24,
        overflow: 'auto',
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#0e2c1f',
          border: '1px solid rgba(216,178,74,0.4)',
          borderRadius: 18,
          maxWidth: 760,
          width: '100%',
          padding: '26px 26px 30px',
          color: '#f5efdf',
          boxShadow: '0 30px 80px rgba(0,0,0,0.5)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, color: '#f7f1df' }}>
            Host Dashboard
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'transparent',
              border: '1px solid rgba(245,239,223,0.3)',
              color: '#e0d4b0',
              fontSize: 15,
              padding: '7px 14px',
              borderRadius: 100,
              cursor: 'pointer',
            }}
          >
            Close
          </button>
        </div>

        {isHost ? (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 22 }}>
              <StatCard value={guestTotal} label="Guests" gold />
              <StatCard value={rsvps.length} label="RSVPs" />
              <StatCard value={puttingTotal} label="In the Cup" />
            </div>

            <div style={{ ...sectionLabel, marginBottom: 10 }}>Who's Coming</div>
            {rsvps.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {rsvps.map((r) => (
                  <div
                    key={r.id}
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 11, padding: '11px 14px' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10, flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 17, color: '#f5efdf', fontWeight: 600 }}>
                        {r.name || '—'} <span style={{ color: '#e0d4b0', fontWeight: 400 }}>×{r.count || '1'}</span>
                      </span>
                      <span style={{ fontSize: 15, color: '#d8b24a' }}>
                        {r.putting === true ? 'In the Cup' : r.putting === false ? 'No' : '—'}
                      </span>
                    </div>
                    <div style={{ fontSize: 15, color: '#b9c2ad', marginTop: 2 }}>{r.email || ''}</div>
                    {r.note ? (
                      <div style={{ fontSize: 15, color: '#cdd4c2', fontStyle: 'italic', marginTop: 4 }}>“{r.note}”</div>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#8a937f', fontStyle: 'italic', margin: '0 0 4px' }}>No RSVPs yet.</p>
            )}

            <div style={{ ...sectionLabel, margin: '24px 0 10px' }}>Who's Helping</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {CHORES.map((c) => {
                const who = claims[c.id] || '';
                return (
                  <div
                    key={c.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 10,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: 10,
                      padding: '9px 14px',
                    }}
                  >
                    <span style={{ fontSize: 16, color: '#f5efdf' }}>{c.label}</span>
                    {who ? (
                      <span style={{ fontSize: 16, color: '#d8b24a', fontWeight: 600 }}>{who}</span>
                    ) : (
                      <span style={{ fontSize: 15, color: '#7f8a78' }}>open</span>
                    )}
                  </div>
                );
              })}
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                flexWrap: 'wrap',
                marginTop: 22,
                borderTop: '1px solid rgba(216,178,74,0.2)',
                paddingTop: 16,
              }}
            >
              <span style={{ fontSize: 15, color: '#b9c2ad' }}>Signed in as {hostUser}</span>
              <button
                onClick={() => { party.hostLogout(); onClose(); }}
                style={{
                  background: 'transparent',
                  border: '1px solid rgba(245,239,223,0.3)',
                  color: '#e0d4b0',
                  fontSize: 15,
                  padding: '8px 16px',
                  borderRadius: 100,
                  cursor: 'pointer',
                }}
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div style={{ marginTop: 18 }}>
            {hostDenied && (
              <p style={{ fontSize: 17, lineHeight: 1.5, color: '#f6d8cf', margin: '0 0 16px' }}>
                That account isn't on the host list. Sign in with a host Google account (Chris, Ash, or Brian).
              </p>
            )}
            {live ? (
              <button
                onClick={() => party.hostLogin()}
                style={{
                  marginTop: 8,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 9,
                  background: '#ffffff',
                  color: '#1f1f1f',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  padding: '12px 22px',
                  borderRadius: 100,
                  cursor: 'pointer',
                }}
              >
                <GoogleMark />
                Sign in with Google
              </button>
            ) : (
              <p style={{ fontSize: 17, lineHeight: 1.55, color: '#e7dfc6', margin: 0 }}>
                The live host view turns on once Firebase is connected. Set your project's{' '}
                <strong style={{ color: '#f7f1df' }}>Firebase config</strong> (see the README) and the dashboard will
                show every RSVP and who's signed up to help — in real time.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
