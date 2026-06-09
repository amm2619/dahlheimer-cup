import { useState } from 'react';
import { CHORES } from '../data.js';

const claimedBox = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 8,
  background: '#143d2b',
  borderRadius: 10,
  padding: '10px 14px',
};

function ClaimForm({ onClaim }) {
  const [draft, setDraft] = useState('');
  return (
    <div className="no-print" style={{ display: 'flex', gap: 8, width: '100%' }}>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        placeholder="Your name"
        style={{
          flex: '1 1 auto',
          minWidth: 0,
          background: '#fff',
          border: '1px solid #d9cfb4',
          color: '#2b2417',
          fontSize: 17,
          padding: '10px 12px',
          borderRadius: 9,
          outline: 'none',
        }}
      />
      <button
        onClick={() => {
          const n = draft.trim();
          if (!n) return;
          onClaim(n);
          setDraft('');
        }}
        style={{
          flex: '0 0 auto',
          background: '#143d2b',
          color: '#f5efdf',
          border: 'none',
          fontWeight: 600,
          fontSize: 14,
          padding: '10px 14px',
          borderRadius: 9,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        I've got it
      </button>
    </div>
  );
}

function ChoreCard({ chore, isHost, claimedBy, mineName, onClaim, onRelease }) {
  // Hosts see the real claim state from the database. Guests never see who
  // signed up (the list is host-only); they just see a claim form, plus a
  // local confirmation for jobs they grabbed in this session.
  const showClaimed = isHost ? !!claimedBy : false;
  const isClaimed = showClaimed; // controls the green "tasteful" card tint

  return (
    <div
      style={{
        position: 'relative',
        background: isClaimed ? '#eef3e8' : '#fbf7ec',
        border: `2px dashed ${isClaimed ? '#9bbf8e' : '#cdbf98'}`,
        borderRadius: 16,
        padding: '20px 20px 18px',
        transition: 'all 0.2s',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 28,
            height: 28,
            borderRadius: '50%',
            background: '#143d2b',
            color: '#d8b24a',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.05em',
          }}
        >
          {chore.tag}
        </span>
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19, color: '#143d2b', lineHeight: 1.1 }}>
          {chore.label}
        </div>
      </div>
      <p style={{ fontSize: 17, lineHeight: 1.5, color: '#423c2b', margin: '0 0 14px', minHeight: 44 }}>{chore.detail}</p>

      {isHost && claimedBy ? (
        <div style={claimedBox}>
          <div style={{ color: '#f5efdf', fontSize: 17 }}>
            <span style={{ color: '#d8b24a', fontWeight: 600 }}>✓ {claimedBy}</span> has this
          </div>
          <button
            className="no-print"
            onClick={onRelease}
            style={{
              background: 'transparent',
              border: '1px solid rgba(245,239,223,0.3)',
              color: '#e0d4b0',
              fontSize: 14,
              padding: '5px 10px',
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Release
          </button>
        </div>
      ) : mineName ? (
        <div style={claimedBox}>
          <div style={{ color: '#f5efdf', fontSize: 17 }}>
            <span style={{ color: '#d8b24a', fontWeight: 600 }}>✓ {mineName}</span> — you're signed up!
          </div>
        </div>
      ) : (
        <ClaimForm onClaim={onClaim} />
      )}
    </div>
  );
}

export default function HelpList({ party }) {
  const isHost = !!party.hostUser;
  // Jobs this guest grabbed this session → { choreId: name }. Guests can't read
  // the claim list back, so we remember locally just to confirm their own pick.
  const [mine, setMine] = useState({});

  return (
    <section id="help" data-screen-label="Help List" style={{ scrollMarginTop: 70, padding: '20px 40px 72px' }}>
      <div style={{ textAlign: 'center', marginBottom: 14 }}>
        <div style={{ fontSize: 14, letterSpacing: '0.3em', textTransform: 'uppercase', color: '#876a1b', fontWeight: 600 }}>
          Many Hands, Light Work
        </div>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: 'clamp(32px, 6vw, 48px)',
            margin: '10px 0 0',
            color: '#143d2b',
          }}
        >
          Claim Your Job
        </h2>
        <p style={{ fontStyle: 'italic', fontSize: 18, color: '#4c4736', maxWidth: 660, margin: '10px auto 0' }}>
          Everyone always asks how they can help — so here it is. Pop your name on a job below and the hosts will see
          you've got it. (No need to check what's taken — the hosts keep the master list and will sort out any overlap.)
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: 16,
          maxWidth: 940,
          margin: '36px auto 0',
        }}
      >
        {CHORES.map((c) => (
          <ChoreCard
            key={c.id}
            chore={c}
            isHost={isHost}
            claimedBy={party.claims[c.id] || ''}
            mineName={mine[c.id] || ''}
            onClaim={(name) => {
              party.claim(c.id, name);
              if (!isHost) setMine((prev) => ({ ...prev, [c.id]: name }));
            }}
            onRelease={() => party.release(c.id)}
          />
        ))}
      </div>
    </section>
  );
}
