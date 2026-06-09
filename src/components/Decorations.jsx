import { DECOR } from '../data.js';

export default function Decorations() {
  return (
    <section data-screen-label="Decorations" style={{ padding: '76px 40px 56px' }}>
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#876a1b', fontWeight: 600 }}>
          Setting the Scene
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(34px, 6vw, 52px)',
            margin: '10px 0 0',
            color: '#143d2b',
          }}
        >
          The Decoration Plan
        </h2>
        <p style={{ fontStyle: 'italic', fontSize: 18, color: '#4c4736', maxWidth: 640, margin: '10px auto 0' }}>
          Think tasteful country club, not mini-golf windmill. Here's the look we're going for.
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 18,
          maxWidth: 900,
          margin: '36px auto 0',
        }}
      >
        {DECOR.map((d) => (
          <div
            key={d.title}
            style={{
              background: '#fbf7ec',
              border: '1px solid #e6dcc2',
              borderRadius: 16,
              padding: 24,
            }}
          >
            <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 21, color: '#143d2b' }}>
              {d.title}
            </div>
            <p style={{ fontSize: 18, lineHeight: 1.55, color: '#423c2b', margin: '8px 0 0' }}>{d.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
