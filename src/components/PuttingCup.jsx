import { useState } from 'react';
import { PRIZES } from '../data.js';

const card = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(216,178,74,0.28)',
  borderRadius: 16,
  padding: 24,
};
const cardTitle = { fontFamily: "'Playfair Display', serif", fontSize: 22, color: '#d8b24a' };
const badges = ['#d8b24a', '#cfd4cb', '#cf9a5e'];

export default function PuttingCup({ party }) {
  const [name, setName] = useState('');
  const [score, setScore] = useState('');

  const sorted = party.scores
    .slice()
    .sort((a, b) => b.score - a.score)
    .map((s, i) => ({ ...s, rank: i + 1, first: i === 0, badge: badges[i] || '#6f7d6f' }));

  function post() {
    const n = name.trim();
    const v = parseInt(score, 10);
    if (!n || isNaN(v)) return;
    party.addScore(n, v);
    setName('');
    setScore('');
  }

  return (
    <section
      id="cup"
      data-screen-label="Putting Challenge"
      style={{
        scrollMarginTop: 70,
        background: 'radial-gradient(120% 100% at 50% 0%, #1f5c3d 0%, #143d2b 60%)',
        color: '#f5efdf',
        padding: '76px 40px 72px',
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: 16 }}>
        <div style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#d8b24a', fontWeight: 600 }}>
          The Main Event
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 800,
            fontSize: 'clamp(36px, 7vw, 58px)',
            margin: '10px 0 0',
            color: '#f7f1df',
          }}
        >
          The Dahlheimer Cup
        </h2>
        <p style={{ fontStyle: 'italic', fontSize: 18, color: '#e0d4b0', maxWidth: 640, margin: '12px auto 0' }}>
          A putting contest of questionable fairness, open to anyone brave enough. Brian thinks he'll win his own
          retirement party. Prove him wrong.
        </p>
      </div>

      {/* rules cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 18,
          maxWidth: 820,
          margin: '40px auto 0',
        }}
      >
        <div style={card}>
          <div style={cardTitle}>How It Works</div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#e7dfc6', margin: '10px 0 0' }}>
            Five putts each, from three distances on the practice green. Stop by the green any time between 3:30 and
            6:30. One scorecard per challenger — no mulligans, no matter how loudly you ask.
          </p>
        </div>
        <div style={card}>
          <div style={cardTitle}>Scoring</div>
          <ul style={{ margin: '10px 0 0', paddingLeft: 18, fontSize: 18, lineHeight: 1.7, color: '#e7dfc6' }}>
            <li>Short putt sunk — <strong style={{ color: '#f7f1df' }}>1 pt</strong></li>
            <li>Mid-range drained — <strong style={{ color: '#f7f1df' }}>3 pts</strong></li>
            <li>The "Brian Special" (way back) — <strong style={{ color: '#f7f1df' }}>5 pts</strong></li>
          </ul>
          <p style={{ fontSize: 17, color: '#e0d4b0', margin: '10px 0 0' }}>
            Most points wins. Ties settled by sudden-death putt-off and merciless heckling.
          </p>
        </div>
        <div style={card}>
          <div style={cardTitle}>The Fine Print</div>
          <p style={{ fontSize: 18, lineHeight: 1.55, color: '#e7dfc6', margin: '10px 0 0' }}>
            The Putting Marshal's word is final. Bribery is frowned upon but not technically against the rules. Brian's
            score does not count toward the prize — it's his party, but we're not animals.
          </p>
        </div>
      </div>

      {/* prizes */}
      <h3
        style={{
          textAlign: 'center',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 30,
          color: '#f7f1df',
          margin: '56px 0 24px',
        }}
      >
        The Hardware
      </h3>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 18,
          maxWidth: 880,
          margin: '0 auto',
        }}
      >
        {PRIZES.map((p) => (
          <div
            key={p.place}
            style={{ background: p.bg, border: `1px solid ${p.border}`, borderRadius: 16, padding: '26px 22px', textAlign: 'center' }}
          >
            <div style={{ fontSize: 14, letterSpacing: '0.2em', textTransform: 'uppercase', fontWeight: 700, color: p.accent }}>
              {p.place}
            </div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, color: '#f7f1df', margin: '8px 0 6px' }}>
              {p.title}
            </div>
            <p style={{ fontSize: 17, lineHeight: 1.5, color: '#d7cfb6', margin: 0 }}>{p.desc}</p>
          </div>
        ))}
      </div>

      {/* leaderboard */}
      <div
        style={{
          maxWidth: 680,
          margin: '56px auto 0',
          background: '#0e2c1f',
          border: '1px solid rgba(216,178,74,0.3)',
          borderRadius: 20,
          padding: '30px 28px 34px',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 28, color: '#f7f1df', margin: 0 }}>
            Live Leaderboard
          </h3>
          <p style={{ fontSize: 17, color: '#e0d4b0', margin: '6px 0 0', fontStyle: 'italic' }}>
            Log your score and watch yourself climb (or sink).
          </p>
        </div>

        <div
          className="no-print"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 10, margin: '22px 0 8px', justifyContent: 'center' }}
        >
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            style={{
              flex: '1 1 180px',
              background: '#143d2b',
              border: '1px solid rgba(216,178,74,0.35)',
              color: '#f5efdf',
              fontSize: 18,
              padding: '12px 14px',
              borderRadius: 10,
              outline: 'none',
            }}
          />
          <input
            value={score}
            onChange={(e) => setScore(e.target.value)}
            type="number"
            placeholder="Points"
            style={{
              width: 110,
              background: '#143d2b',
              border: '1px solid rgba(216,178,74,0.35)',
              color: '#f5efdf',
              fontSize: 18,
              padding: '12px 14px',
              borderRadius: 10,
              outline: 'none',
            }}
          />
          <button
            onClick={post}
            style={{
              background: '#d8b24a',
              color: '#143d2b',
              border: 'none',
              fontWeight: 600,
              fontSize: 18,
              padding: '12px 22px',
              borderRadius: 10,
              cursor: 'pointer',
            }}
          >
            Post
          </button>
        </div>

        {sorted.length > 0 ? (
          <div style={{ marginTop: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {sorted.map((row) => (
              <div
                key={row.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr auto auto',
                  alignItems: 'center',
                  gap: 12,
                  background: row.first ? 'rgba(216,178,74,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${row.first ? 'rgba(216,178,74,0.4)' : 'rgba(255,255,255,0.08)'}`,
                  borderRadius: 12,
                  padding: '11px 14px',
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: row.badge,
                    color: '#0e2c1f',
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    fontSize: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {row.rank}
                </div>
                <div style={{ fontSize: 18, color: '#f5efdf', fontWeight: 500 }}>{row.name}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, color: '#d8b24a' }}>
                  {row.score}
                  <span style={{ fontSize: 14, color: '#e0d4b0', fontFamily: "'EB Garamond', serif", fontWeight: 400 }}> pts</span>
                </div>
                <button
                  className="no-print"
                  onClick={() => party.removeScore(row.id)}
                  title="Remove"
                  style={{ background: 'transparent', border: 'none', color: '#6f7d6f', fontSize: 18, cursor: 'pointer', lineHeight: 1, padding: 4 }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ textAlign: 'center', color: '#8a937f', fontStyle: 'italic', margin: '22px 0 4px' }}>
            No challengers yet. The green is wide open.
          </p>
        )}
      </div>
    </section>
  );
}
