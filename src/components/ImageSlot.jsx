import { useRef, useState } from 'react';

const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];
const MAX_DIM = 1200;

// Downscale + re-encode to WebP so a dropped photo is retina-sharp but small
// enough to store as a data URL in a Firestore doc (well under the 1MB limit).
function toDataUrl(file, maxDim = MAX_DIM) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      try {
        resolve(canvas.toDataURL('image/webp', 0.85));
      } catch (e) {
        reject(e);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('decode failed')); };
    img.src = url;
  });
}

const Icon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.45 }}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <path d="m21 15-5-5L5 21" />
  </svg>
);

export default function ImageSlot({ id, src, placeholder = 'Drop an image', radius = 14, onSet, onClear }) {
  const inputRef = useRef(null);
  const [over, setOver] = useState(false);
  const [hover, setHover] = useState(false);
  const [error, setError] = useState('');

  async function ingest(file) {
    setError('');
    if (!file || !ACCEPT.includes(file.type)) {
      setError('Drop a PNG, JPEG, WebP, or AVIF image.');
      setTimeout(() => setError(''), 3000);
      return;
    }
    try {
      const url = await toDataUrl(file);
      onSet(id, url);
    } catch {
      setError('Could not read that image.');
      setTimeout(() => setError(''), 3000);
    }
  }

  const filled = !!src;

  return (
    <div
      onDragEnter={(e) => { e.preventDefault(); setOver(true); }}
      onDragOver={(e) => { e.preventDefault(); if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy'; }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) ingest(f);
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'block',
        width: '100%',
        height: 240,
        borderRadius: radius,
        overflow: 'hidden',
        background: filled ? 'transparent' : 'rgba(20,61,43,0.04)',
        cursor: filled ? 'default' : 'pointer',
        outline: over ? '2px solid #b8932f' : 'none',
        outlineOffset: -2,
      }}
      onClick={() => { if (!filled) inputRef.current && inputRef.current.click(); }}
    >
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPT.join(',')}
        hidden
        onChange={(e) => {
          const f = e.target.files && e.target.files[0];
          if (f) ingest(f);
          e.target.value = '';
        }}
      />

      {filled ? (
        <>
          <img src={src} alt="" draggable="false" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div
            className="no-print"
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: 6,
              padding: 8,
              opacity: hover ? 1 : 0,
              transition: 'opacity 0.12s',
              background: hover ? 'linear-gradient(to top, rgba(0,0,0,0.45), transparent 55%)' : 'transparent',
              pointerEvents: hover ? 'auto' : 'none',
            }}
          >
            <button
              onClick={(e) => { e.stopPropagation(); inputRef.current && inputRef.current.click(); }}
              style={ctlBtn}
            >
              Replace
            </button>
            <button onClick={(e) => { e.stopPropagation(); onClear(id); }} style={ctlBtn}>
              Remove
            </button>
          </div>
        </>
      ) : (
        <>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6,
              textAlign: 'center',
              padding: 12,
              color: over ? '#b8932f' : 'rgba(20,61,43,0.55)',
              userSelect: 'none',
            }}
          >
            <Icon />
            <div style={{ maxWidth: '90%', fontWeight: 500, letterSpacing: '0.01em', fontSize: 14 }}>{placeholder}</div>
            <div style={{ fontSize: 12 }}>
              or <u style={{ textUnderlineOffset: 2 }}>browse files</u>
            </div>
          </div>
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              borderRadius: radius,
              border: `1.5px dashed ${over ? '#b8932f' : 'rgba(20,61,43,0.28)'}`,
              transition: 'border-color 0.12s',
            }}
          />
        </>
      )}

      {error && (
        <div
          style={{
            position: 'absolute',
            left: 8,
            bottom: 8,
            right: 8,
            color: '#b3261e',
            fontSize: 11,
            background: 'rgba(255,255,255,0.9)',
            padding: '4px 6px',
            borderRadius: 5,
            pointerEvents: 'none',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}

const ctlBtn = {
  appearance: 'none',
  border: 0,
  borderRadius: 6,
  padding: '5px 10px',
  cursor: 'pointer',
  background: 'rgba(0,0,0,0.65)',
  color: '#fff',
  fontSize: 11,
  lineHeight: 1,
  fontFamily: 'inherit',
};
