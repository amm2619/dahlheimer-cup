import { useEffect, useState } from 'react';

const DAY = 86400000;
const HR = 3600000;
const MIN = 60000;
const pad = (n) => String(n).padStart(2, '0');

// Ticks once a second and returns the broken-down time remaining to `target`.
export default function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  let diff = Math.max(0, target - now);
  const past = target - now <= 0;
  const d = Math.floor(diff / DAY); diff -= d * DAY;
  const h = Math.floor(diff / HR); diff -= h * HR;
  const m = Math.floor(diff / MIN); diff -= m * MIN;
  const s = Math.floor(diff / 1000);

  return {
    past,
    days: pad(d),
    hours: pad(h),
    mins: pad(m),
    secs: pad(s),
    label: past ? "It's go time — grab a putter" : 'Tee-off countdown',
  };
}
