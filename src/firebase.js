// Firebase bootstrap. Reads config from Vite env vars (VITE_FIREBASE_*).
// When the config is absent the app still runs — RSVPs fall back to a
// mailto: link and the leaderboard / chore claims fall back to localStorage,
// exactly like the original prototype.
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const cfg = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || undefined,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || undefined,
};

// "Configured" means a real apiKey + projectId were provided at build time.
export const isFirebaseConfigured = !!(cfg.apiKey && cfg.projectId && !String(cfg.apiKey).includes('PASTE'));

export const HOST_EMAILS = (import.meta.env.VITE_HOST_EMAILS ||
  'chris.foster@gmail.com,amm2619@gmail.com,brian.dahlheimer@gmail.com')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

let app = null;
let auth = null;
let db = null;
let googleProvider = null;

if (isFirebaseConfigured) {
  app = initializeApp(cfg);
  auth = getAuth(app);
  db = getFirestore(app);
  googleProvider = new GoogleAuthProvider();
}

export { app, auth, db, googleProvider };
