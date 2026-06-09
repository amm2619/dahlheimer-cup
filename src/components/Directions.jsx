export default function Directions() {
  return (
    <section
      id="directions"
      data-screen-label="Directions"
      style={{
        scrollMarginTop: 70,
        background: '#fbf7ec',
        borderTop: '1px solid #e6dcc2',
        borderBottom: '1px solid #e6dcc2',
        padding: '72px 40px',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 36,
          maxWidth: 920,
          margin: '0 auto',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#876a1b', fontWeight: 600 }}>
            Finding The Clubhouse
          </div>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              fontSize: 'clamp(32px, 5vw, 46px)',
              margin: '10px 0 14px',
              color: '#143d2b',
            }}
          >
            Where &amp; When
          </h2>
          <p style={{ fontSize: 19, lineHeight: 1.5, color: '#2b2417', margin: '0 0 4px' }}>
            <strong>1730 Saddle Drive</strong>
            <br />
            Gambrills, MD 21054
          </p>
          <p style={{ fontSize: 18, color: '#423c2b', margin: '12px 0 0' }}>
            Saturday, August 8, 2026
            <br />
            3:00 PM until we admit defeat.
          </p>
          <p style={{ fontSize: 18, color: '#4c4736', margin: '16px 0 0', fontStyle: 'italic' }}>
            Park along the drive, follow the flags to the backyard green, and find the catering table before the
            charcuterie disappears.
          </p>
          <a
            className="no-print"
            href="https://www.google.com/maps/search/?api=1&query=1730+Saddle+Drive+Gambrills+MD"
            target="_blank"
            rel="noopener"
            style={{
              display: 'inline-block',
              marginTop: 22,
              background: '#143d2b',
              color: '#f5efdf',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 18,
              padding: '13px 28px',
              borderRadius: 100,
            }}
          >
            Get Directions →
          </a>
        </div>

        <div
          style={{
            position: 'relative',
            aspectRatio: '4 / 3',
            borderRadius: 18,
            overflow: 'hidden',
            border: '1px solid #e6dcc2',
            background: 'linear-gradient(135deg, #e8f0e2 0%, #d6e6cf 100%)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'linear-gradient(rgba(20,61,43,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(20,61,43,0.08) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
            }}
          />
          <div style={{ position: 'absolute', left: 0, right: 0, top: '58%', height: 16, background: '#cbbf9c', transform: 'rotate(-7deg)' }} />
          <div style={{ position: 'absolute', left: '38%', top: 0, bottom: 0, width: 12, background: '#d8d2bd', transform: 'rotate(6deg)' }} />
          <div style={{ position: 'absolute', left: '50%', top: '42%', transform: 'translate(-50%,-100%)', textAlign: 'center' }}>
            <div style={{ width: 2, height: 34, background: '#143d2b', margin: '0 auto' }} />
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 1,
                width: 22,
                height: 14,
                background: '#c0392b',
                animation: 'flagwave 2.4s ease-in-out infinite',
                transformOrigin: 'left center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: -7,
                left: '50%',
                transform: 'translateX(-50%)',
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#143d2b',
              }}
            />
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: 14,
              left: 14,
              background: 'rgba(255,255,255,0.92)',
              borderRadius: 8,
              padding: '6px 12px',
              fontSize: 14,
              fontWeight: 600,
              color: '#143d2b',
            }}
          >
            1730 Saddle Drive
          </div>
        </div>
      </div>
    </section>
  );
}
