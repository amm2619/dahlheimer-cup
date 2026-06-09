import { SCHEDULE } from '../data.js';

export default function Schedule() {
  return (
    <section
      id="schedule"
      data-screen-label="Schedule"
      style={{ scrollMarginTop: 70, padding: '76px 40px 64px' }}
    >
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#876a1b', fontWeight: 600 }}>
          The Scorecard
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
          The Day's Lineup
        </h2>
        <p style={{ fontStyle: 'italic', fontSize: 18, color: '#4c4736', margin: '10px 0 0' }}>
          Loosely scheduled, generously catered. Times are suggestions; the cheese is not.
        </p>
      </div>

      <div style={{ position: 'relative', maxWidth: 720, margin: '0 auto' }}>
        <div
          style={{
            position: 'absolute',
            left: 96,
            top: 8,
            bottom: 8,
            width: 2,
            background: 'repeating-linear-gradient(#b8932f, #b8932f 6px, transparent 6px, transparent 12px)',
          }}
        />
        {SCHEDULE.map((item) => (
          <div
            key={item.time + item.title}
            style={{
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: '80px 1fr',
              gap: 28,
              alignItems: 'start',
              padding: '14px 0',
            }}
          >
            <div
              style={{
                textAlign: 'right',
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                fontSize: 20,
                color: '#143d2b',
                paddingTop: 2,
              }}
            >
              {item.time}
            </div>
            <div style={{ position: 'relative', paddingLeft: 28 }}>
              <span
                style={{
                  position: 'absolute',
                  left: -7,
                  top: 7,
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#f5efdf',
                  border: '3px solid #b8932f',
                }}
              />
              <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, fontSize: 22, color: '#143d2b' }}>
                {item.title}
              </div>
              <div style={{ fontSize: 17, lineHeight: 1.5, color: '#423c2b', marginTop: 3 }}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
