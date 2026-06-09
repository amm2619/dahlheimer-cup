import useCountdown from '../lib/useCountdown.js';
import { TARGET } from '../data.js';

const detailCard = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(216,178,74,0.25)',
  borderRadius: 14,
  padding: '16px 22px',
  minWidth: 150,
};
const detailLabel = {
  fontSize: 12,
  letterSpacing: '0.22em',
  textTransform: 'uppercase',
  color: '#d8b24a',
  fontWeight: 600,
};
const detailValue = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 22,
  marginTop: 4,
};
const cdCell = {
  background: '#0e2c1f',
  border: '1px solid rgba(216,178,74,0.3)',
  borderRadius: 12,
  padding: '14px 20px',
  minWidth: 84,
};
const cdNum = {
  fontFamily: "'Playfair Display', serif",
  fontWeight: 700,
  fontSize: 38,
  lineHeight: 1,
  color: '#f7f1df',
};
const cdUnit = {
  fontSize: 12,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  color: '#d8b24a',
  marginTop: 6,
};

function CountdownCell({ value, unit }) {
  return (
    <div style={cdCell}>
      <div style={cdNum}>{value}</div>
      <div style={cdUnit}>{unit}</div>
    </div>
  );
}

export default function Hero() {
  const cd = useCountdown(TARGET);

  return (
    <section
      data-screen-label="Hero"
      style={{
        position: 'relative',
        background: 'radial-gradient(120% 90% at 50% -10%, #1f5c3d 0%, #143d2b 45%, #0e2c1f 100%)',
        color: '#f5efdf',
        padding: '64px 40px 72px',
        textAlign: 'center',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.05) 0 1px, transparent 1px), radial-gradient(circle at 70% 60%, rgba(255,255,255,0.05) 0 1px, transparent 1px)',
          backgroundSize: '28px 28px, 36px 36px',
          opacity: 0.6,
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          border: '1px solid rgba(216,178,74,0.5)',
          color: '#d8b24a',
          padding: '7px 18px',
          borderRadius: 100,
          fontSize: 14,
          letterSpacing: '0.32em',
          textTransform: 'uppercase',
          fontWeight: 600,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d8b24a' }} />
        A Retirement Send-Off
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#d8b24a' }} />
      </div>

      <p style={{ position: 'relative', fontStyle: 'italic', fontSize: 20, color: '#e0d4b0', margin: '26px 0 6px' }}>
        After 30-some years, they're finally letting him leave the building.
      </p>

      <h1
        style={{
          position: 'relative',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          fontSize: 'clamp(48px, 9vw, 92px)',
          lineHeight: 0.98,
          margin: '6px 0 4px',
          color: '#f7f1df',
        }}
      >
        Brian Dahlheimer
      </h1>
      <p
        style={{
          position: 'relative',
          fontFamily: "'Playfair Display', serif",
          fontStyle: 'italic',
          fontSize: 'clamp(22px, 4vw, 34px)',
          color: '#d8b24a',
          margin: '0 0 8px',
        }}
      >
        is hitting the back nine — for good.
      </p>

      <p
        style={{
          position: 'relative',
          maxWidth: 620,
          margin: '18px auto 0',
          fontSize: 18,
          lineHeight: 1.55,
          color: '#e7dfc6',
        }}
      >
        Thirty-odd years, a few thousand spreadsheets, and one famously questionable golf swing later, the man is
        officially retired. Come help us roast him, toast him, and out-putt him.
      </p>

      {/* detail row */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: 14,
          marginTop: 34,
        }}
      >
        <div style={detailCard}>
          <div style={detailLabel}>The Date</div>
          <div style={detailValue}>Sat, Aug 8, 2026</div>
        </div>
        <div style={detailCard}>
          <div style={detailLabel}>Tee Time</div>
          <div style={detailValue}>3:00 PM → ???</div>
        </div>
        <div style={detailCard}>
          <div style={detailLabel}>The Clubhouse</div>
          <div style={detailValue}>1730 Saddle Drive</div>
          <div style={{ fontSize: 17, color: '#e0d4b0' }}>Gambrills, MD</div>
        </div>
      </div>

      {/* countdown */}
      <div style={{ position: 'relative', marginTop: 40 }}>
        <div style={{ fontSize: 12, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#e0d4b0', marginBottom: 14 }}>
          {cd.label}
        </div>
        <div style={{ display: 'inline-flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <CountdownCell value={cd.days} unit="Days" />
          <CountdownCell value={cd.hours} unit="Hours" />
          <CountdownCell value={cd.mins} unit="Mins" />
          <CountdownCell value={cd.secs} unit="Secs" />
        </div>
      </div>

      <div className="no-print" style={{ position: 'relative', marginTop: 36 }}>
        <a
          href="#rsvp"
          style={{
            display: 'inline-block',
            background: '#d8b24a',
            color: '#143d2b',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: 17,
            letterSpacing: '0.04em',
            padding: '15px 38px',
            borderRadius: 100,
            boxShadow: '0 10px 24px rgba(0,0,0,0.3)',
          }}
        >
          RSVP — Claim Your Spot
        </a>
        <p style={{ fontSize: 14, color: '#e0d4b0', margin: '14px 0 0' }}>
          Catering by Valanti. Bring your putter and your best heckles.
        </p>
      </div>
    </section>
  );
}
