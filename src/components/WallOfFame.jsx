import { WALL_OF_FAME } from '../data.js';
import ImageSlot from './ImageSlot.jsx';

export default function WallOfFame({ party }) {
  return (
    <section
      data-screen-label="Wall of Fame"
      className="no-print"
      style={{ padding: '72px 40px 64px', textAlign: 'center' }}
    >
      <div style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#876a1b', fontWeight: 600 }}>
        Exhibit A Through D
      </div>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 'clamp(32px, 6vw, 50px)',
          margin: '10px 0 0',
          color: '#143d2b',
        }}
      >
        The Wall of Fame
      </h2>
      <p style={{ fontStyle: 'italic', fontSize: 18, color: '#4c4736', maxWidth: 600, margin: '10px auto 30px' }}>
        Drop in your favorite photos of the man of the hour. The more embarrassing, the better.
      </p>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          maxWidth: 900,
          margin: '0 auto',
        }}
      >
        {WALL_OF_FAME.map((slot) => (
          <div key={slot.id}>
            <ImageSlot
              id={slot.id}
              src={party.photos[slot.id] || ''}
              placeholder={slot.placeholder}
              radius={14}
              onSet={party.setPhoto}
              onClear={party.clearPhoto}
            />
            <p style={{ fontSize: 17, color: '#4c4736', fontStyle: 'italic', margin: '8px 0 0' }}>{slot.caption}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
