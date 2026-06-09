import { useState } from 'react';

const HOST = 'gmail.com';
const RSVP_TO = `chris.foster@${HOST},amm2619@${HOST}`;

const labelStyle = {
  display: 'block',
  fontSize: 14,
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  color: '#d8b24a',
  marginBottom: 6,
};
const inputStyle = {
  width: '100%',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(216,178,74,0.35)',
  color: '#f5efdf',
  fontSize: 17,
  padding: '13px 15px',
  borderRadius: 11,
  outline: 'none',
};

const TextIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d8b24a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);
const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d8b24a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
);

const contactBtn = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 7,
  background: 'rgba(216,178,74,0.14)',
  border: '1px solid rgba(216,178,74,0.45)',
  color: '#f3e9cb',
  textDecoration: 'none',
  fontSize: 17,
  fontWeight: 600,
  padding: '9px 16px',
  borderRadius: 100,
};

function puttingLabel(putting) {
  if (putting === true) return 'Yes — in the Cup';
  if (putting === false) return 'Not putting';
  return 'Undecided';
}

function mailtoSelf(user) {
  try { window.location.href = `mailto:${user}@${HOST}`; } catch { /* ignore */ }
}

export default function Rsvp({ party }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [count, setCount] = useState('');
  const [putting, setPutting] = useState(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedLive, setSavedLive] = useState(false);

  function mailtoRsvp() {
    const subject = encodeURIComponent("RSVP — Brian's Retirement Send-Off (Aug 8)");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nHeadcount: ${count || '1'}\nPutting Challenge: ${puttingLabel(putting)}\nNote: ${note || '—'}`
    );
    try { window.location.href = `mailto:${RSVP_TO}?subject=${subject}&body=${body}`; } catch { /* ignore */ }
    setSavedLive(false);
    setSubmitted(true);
  }

  function submit() {
    const n = name.trim();
    const e = email.trim();
    if (!n) { setError('Please add your name.'); return; }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e)) {
      setError('Please add a valid email so we can send reminders.');
      return;
    }
    setError('');
    if (party.live) {
      setSaving(true);
      party.submitRsvp({ name: n, email: e, count, putting, note })
        .then(() => { setSaving(false); setSavedLive(true); setSubmitted(true); })
        .catch(() => { setSaving(false); mailtoRsvp(); });
      return;
    }
    mailtoRsvp();
  }

  return (
    <section
      id="rsvp"
      data-screen-label="RSVP"
      style={{
        scrollMarginTop: 70,
        background: 'radial-gradient(120% 100% at 50% 0%, #1f5c3d 0%, #143d2b 60%)',
        color: '#f5efdf',
        padding: '76px 40px 80px',
      }}
    >
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d8b24a', fontWeight: 600 }}>
          Are You In?
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 'clamp(36px, 7vw, 56px)',
            margin: '10px 0 0',
            color: '#f7f1df',
          }}
        >
          RSVP
        </h2>
        <p style={{ fontStyle: 'italic', fontSize: 18, color: '#e0d4b0', margin: '12px 0 0' }}>
          Let us know you're coming so we buy enough cheese. A headcount keeps Valanti happy.
        </p>

        {!submitted ? (
          <div className="no-print" style={{ marginTop: 30, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ flex: '2 1 220px' }}>
                <label style={labelStyle}>Your Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="First & last" style={inputStyle} />
              </div>
              <div style={{ flex: '1 1 90px' }}>
                <label style={labelStyle}>How Many?</label>
                <input value={count} onChange={(e) => setCount(e.target.value)} type="number" min="1" placeholder="2" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>
                Email{' '}
                <span style={{ color: '#e0d4b0', textTransform: 'none', letterSpacing: 0, fontWeight: 400 }}>
                  (so we can send reminders)
                </span>
              </label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@email.com" style={inputStyle} />
            </div>
            <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(216,178,74,0.28)', borderRadius: 14, padding: '18px 18px 16px' }}>
              <label style={{ ...labelStyle, marginBottom: 0 }}>Join the putting challenge?</label>
              <p style={{ margin: '6px 0 12px', fontSize: 16, lineHeight: 1.45, color: '#e7dfc6' }}>
                The <strong style={{ color: '#f7f1df' }}>Dahlheimer Cup</strong> is our friendly putting contest with real
                prizes. Totally optional — pick "No thanks" and just enjoy the cheese.
              </p>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <button
                  onClick={() => setPutting(true)}
                  style={{
                    flex: '1 1 150px',
                    background: putting === true ? '#d8b24a' : 'rgba(255,255,255,0.06)',
                    color: putting === true ? '#143d2b' : '#f5efdf',
                    border: '1px solid rgba(216,178,74,0.45)',
                    fontSize: 17,
                    fontWeight: 600,
                    padding: '13px 10px',
                    borderRadius: 11,
                    cursor: 'pointer',
                  }}
                >
                  Yes, I'll putt
                </button>
                <button
                  onClick={() => setPutting(false)}
                  style={{
                    flex: '1 1 150px',
                    background: putting === false ? '#d8b24a' : 'rgba(255,255,255,0.06)',
                    color: putting === false ? '#143d2b' : '#f5efdf',
                    border: '1px solid rgba(216,178,74,0.45)',
                    fontSize: 17,
                    fontWeight: 600,
                    padding: '13px 10px',
                    borderRadius: 11,
                    cursor: 'pointer',
                  }}
                >
                  No thanks, just watching
                </button>
              </div>
            </div>
            <div>
              <label style={labelStyle}>A Note for Brian (optional)</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                placeholder="A kind word, a roast, a dietary need..."
                style={{ ...inputStyle, resize: 'vertical' }}
              />
            </div>
            {error && (
              <div
                style={{
                  background: 'rgba(192,57,43,0.18)',
                  border: '1px solid rgba(224,108,90,0.5)',
                  color: '#f6d8cf',
                  fontSize: 16,
                  padding: '11px 15px',
                  borderRadius: 10,
                }}
              >
                {error}
              </div>
            )}
            <button
              onClick={submit}
              style={{
                marginTop: 2,
                background: '#d8b24a',
                color: '#143d2b',
                border: 'none',
                fontWeight: 700,
                fontSize: 18,
                padding: 16,
                borderRadius: 100,
                cursor: 'pointer',
                boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
              }}
            >
              {saving ? 'Sending…' : 'Send My RSVP'}
            </button>
          </div>
        ) : (
          <div
            style={{
              marginTop: 30,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(216,178,74,0.35)',
              borderRadius: 16,
              padding: '32px 26px',
            }}
          >
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: '#d8b24a' }}>
              You're on the list, {name}!
            </div>
            {savedLive ? (
              <p style={{ fontSize: 17, lineHeight: 1.55, color: '#e7dfc6', margin: '12px 0 0' }}>
                Your RSVP is saved. We'll send reminders to <strong style={{ color: '#f7f1df' }}>{email}</strong> as the
                big day gets closer. See you on the green!
              </p>
            ) : (
              <p style={{ fontSize: 17, lineHeight: 1.55, color: '#e7dfc6', margin: '12px 0 0' }}>
                Your email app should have popped open with your RSVP ready to send. If it didn't, just reach a host
                directly — details below.
              </p>
            )}
            <button
              className="no-print"
              onClick={() => { setSubmitted(false); setError(''); }}
              style={{
                marginTop: 18,
                background: 'transparent',
                border: '1px solid rgba(245,239,223,0.4)',
                color: '#f5efdf',
                fontSize: 17,
                padding: '10px 22px',
                borderRadius: 100,
                cursor: 'pointer',
              }}
            >
              Edit my RSVP
            </button>
          </div>
        )}

        <div style={{ marginTop: 30, borderTop: '1px solid rgba(216,178,74,0.25)', paddingTop: 22 }}>
          <div style={{ fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#e0d4b0' }}>
            Or reach a host directly
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14, justifyContent: 'center', marginTop: 16 }}>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(216,178,74,0.22)', borderRadius: 14, padding: '16px 20px', minWidth: 200 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#f7f1df', marginBottom: 12 }}>
                Chris Foster
              </div>
              <div style={{ display: 'flex', gap: 9, justifyContent: 'center' }}>
                <a href="sms:+14433887190" aria-label="Text Chris Foster" style={contactBtn}><TextIcon />Text</a>
                <a
                  href="#rsvp"
                  onClick={(e) => { e.preventDefault(); mailtoSelf('chris.foster'); }}
                  aria-label="Email Chris Foster"
                  style={contactBtn}
                >
                  <MailIcon />Email
                </a>
              </div>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(216,178,74,0.22)', borderRadius: 14, padding: '16px 20px', minWidth: 200 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: '#f7f1df', marginBottom: 12 }}>
                Ash Moreno
              </div>
              <div style={{ display: 'flex', gap: 9, justifyContent: 'center' }}>
                <a href="sms:+12514587026" aria-label="Text Ash Moreno" style={contactBtn}><TextIcon />Text</a>
                <a
                  href="#rsvp"
                  onClick={(e) => { e.preventDefault(); mailtoSelf('amm2619'); }}
                  aria-label="Email Ash Moreno"
                  style={contactBtn}
                >
                  <MailIcon />Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
