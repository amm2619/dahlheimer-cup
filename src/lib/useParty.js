import { useEffect, useState } from 'react';
import {
  collection, doc, onSnapshot, addDoc, setDoc, deleteDoc,
  query, orderBy, serverTimestamp,
} from 'firebase/firestore';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, googleProvider, isFirebaseConfigured, HOST_EMAILS } from '../firebase.js';

// Central hook: owns every piece of live/shared state for the page and
// exposes plain action functions. Persistence is the database only — when
// Firebase is configured, Firestore is the single source of truth. When it
// isn't, writes update in-memory state for the current session only (nothing
// is stored on the device); they sync to nobody and don't survive a reload.
export default function useParty() {
  const live = isFirebaseConfigured;

  const [scores, setScores] = useState([]);
  const [claims, setClaims] = useState({});
  const [photos, setPhotos] = useState({});
  const [rsvps, setRsvps] = useState([]);

  const [hostUser, setHostUser] = useState('');
  const [hostDenied, setHostDenied] = useState(false);
  const [fbError, setFbError] = useState('');

  // ---- Firestore subscriptions (the only persistence) ----
  useEffect(() => {
    if (!live) return undefined;
    const unsubs = [];

    unsubs.push(
      onSnapshot(query(collection(db, 'scores'), orderBy('score', 'desc')), (snap) => {
        setScores(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
      }, () => {})
    );
    unsubs.push(
      onSnapshot(collection(db, 'claims'), (snap) => {
        const next = {};
        snap.forEach((d) => { next[d.id] = (d.data() || {}).name || ''; });
        setClaims(next);
      }, () => {})
    );
    unsubs.push(
      onSnapshot(collection(db, 'photos'), (snap) => {
        const next = {};
        snap.forEach((d) => { next[d.id] = (d.data() || {}).url || ''; });
        setPhotos(next);
      }, () => {})
    );

    return () => unsubs.forEach((u) => u());
  }, [live]);

  // ---- Auth: track host sign-in; subscribe to RSVPs only for hosts ----
  useEffect(() => {
    if (!live) return undefined;
    return onAuthStateChanged(auth, (user) => {
      const email = user && user.email ? user.email.toLowerCase() : '';
      setHostUser(email && HOST_EMAILS.includes(email) ? user.email : '');
    });
  }, [live]);

  useEffect(() => {
    if (!live || !hostUser) { setRsvps([]); return undefined; }
    return onSnapshot(
      query(collection(db, 'rsvps'), orderBy('createdAt', 'desc')),
      (snap) => setRsvps(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => setFbError('Cannot read RSVPs (' + (err.code || 'error') + ')')
    );
  }, [live, hostUser]);

  // ---- Leaderboard ----
  function addScore(name, score) {
    if (live) {
      addDoc(collection(db, 'scores'), { name, score, createdAt: serverTimestamp() }).catch(() => {});
      return;
    }
    setScores((prev) => prev.concat([{ id: Date.now() + '-' + Math.random().toString(36).slice(2, 6), name, score }]));
  }
  function removeScore(id) {
    if (live) { deleteDoc(doc(db, 'scores', id)).catch(() => {}); return; }
    setScores((prev) => prev.filter((s) => s.id !== id));
  }

  // ---- Chore claims ----
  function claim(id, name) {
    if (live) { setDoc(doc(db, 'claims', id), { name, ts: Date.now() }).catch(() => {}); return; }
    setClaims((prev) => ({ ...prev, [id]: name }));
  }
  function release(id) {
    if (live) { deleteDoc(doc(db, 'claims', id)).catch(() => {}); return; }
    setClaims((prev) => { const next = { ...prev }; delete next[id]; return next; });
  }

  // ---- Wall of Fame photos ----
  function setPhoto(id, url) {
    if (live) { setDoc(doc(db, 'photos', id), { url, ts: Date.now() }).catch(() => {}); return; }
    setPhotos((prev) => ({ ...prev, [id]: url }));
  }
  function clearPhoto(id) {
    if (live) { deleteDoc(doc(db, 'photos', id)).catch(() => {}); return; }
    setPhotos((prev) => { const next = { ...prev }; delete next[id]; return next; });
  }

  // ---- RSVP (returns a promise; rejects so the form can fall back to mailto) ----
  function submitRsvp(payload) {
    if (!live) return Promise.reject(new Error('not-configured'));
    return addDoc(collection(db, 'rsvps'), {
      name: payload.name,
      email: payload.email,
      count: payload.count || '1',
      putting: payload.putting,
      note: payload.note || '',
      createdAt: serverTimestamp(),
    });
  }

  // ---- Host auth ----
  function hostLogin() {
    if (!live) return Promise.resolve({ opened: true });
    return signInWithPopup(auth, googleProvider).then((res) => {
      const email = res.user && res.user.email ? res.user.email.toLowerCase() : '';
      if (HOST_EMAILS.includes(email)) {
        setHostUser(res.user.email);
        setHostDenied(false);
        return { opened: true, host: true };
      }
      signOut(auth);
      setHostUser('');
      setHostDenied(true);
      return { opened: true, host: false };
    }).catch((err) => {
      setFbError('Sign-in failed (' + (err.code || 'error') + ')');
      return { opened: true, error: true };
    });
  }
  function hostLogout() {
    if (live && auth) signOut(auth);
    setHostUser('');
  }

  return {
    live,
    hostEmails: HOST_EMAILS,
    scores, claims, photos, rsvps,
    hostUser, hostDenied, fbError,
    addScore, removeScore,
    claim, release,
    setPhoto, clearPhoto,
    submitRsvp,
    hostLogin, hostLogout,
  };
}
