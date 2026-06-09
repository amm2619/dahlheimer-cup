# The Dahlheimer Cup 🏌️

Brian Dahlheimer's retirement send-off — a single-page invitation site with a
live countdown, the day's lineup, a putting-contest leaderboard, a "claim your
job" help list, directions, a photo Wall of Fame, an RSVP form, and a
Firebase-gated host dashboard.

Built with **React + Vite**. Recreated pixel-for-pixel from the Claude Design
prototype (`Brians Send-Off.dc.html`).

- **When:** Saturday, August 8, 2026 · 3:00 PM
- **Where:** 1730 Saddle Drive, Gambrills, MD 21054

## Quick start

```bash
npm install
cp .env.example .env   # then fill in your Firebase values (optional, see below)
npm run dev            # http://localhost:5173
npm run build          # production build → dist/
npm run preview        # preview the production build
```

## Backend (Firebase)

The site works with **no backend at all**: leaderboard scores, chore claims,
and Wall of Fame photos persist to `localStorage`, and the RSVP form opens a
pre-filled email (`mailto:`). That's the graceful fallback.

To make RSVPs/claims/scores/photos **shared live across all guests**, connect a
Firebase project (Firestore + Google Auth):

1. Create a Firebase project and a Web App; copy its config.
2. Enable **Cloud Firestore** and the **Google** sign-in provider (Authentication).
3. Add your config to `.env` (local) and as **GitHub repository secrets** (deploy):

   | Variable | Example |
   | --- | --- |
   | `VITE_FIREBASE_API_KEY` | `AIza…` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `your-project.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | `your-project` |
   | `VITE_FIREBASE_APP_ID` | `1:123…:web:abc…` |

   These are public client identifiers (they ship in the browser bundle); access
   is enforced by the Firestore rules below — not by hiding them.

4. Deploy the security rules in [`firestore.rules`](./firestore.rules):

   ```bash
   firebase deploy --only firestore:rules
   ```

5. Set the **host allow-list**. Hosts who can open the dashboard are defined in
   two places (keep them in sync):
   - `VITE_HOST_EMAILS` (build-time, controls the UI) — repo variable or `.env`.
   - The email list inside `firestore.rules` (controls who can read RSVPs).

   Defaults: `chris.foster@gmail.com`, `amm2619@gmail.com`,
   `brian.dahlheimer@gmail.com`.

### Firestore collections

| Collection | Contents | Access |
| --- | --- | --- |
| `scores` | `{ name, score, createdAt }` | public read + create |
| `claims/{choreId}` | `{ name, ts }` | public read + write |
| `photos/{slotId}` | `{ url, ts }` (WebP data URL) | public read + write |
| `rsvps` | `{ name, email, count, putting, note, createdAt }` | guest create; **host-only** read |

## Deployment (GitHub Pages)

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every
push to `main`.

1. In **Settings → Pages**, set **Source = GitHub Actions**.
2. Add the `VITE_FIREBASE_*` **secrets** (Settings → Secrets and variables →
   Actions). Optionally add `VITE_BASE` / `VITE_HOST_EMAILS` as **variables**.
3. Push to `main`. The site publishes at `https://<user>.github.io/dahlheimer-cup/`.

`.github/workflows/ci.yml` builds every pull request as a sanity check (no
secrets required).

> **Base path:** the build defaults to `base: '/dahlheimer-cup/'` for a GitHub
> Pages *project* site. For a custom domain or a user/org Pages site, set
> `VITE_BASE=/`.

## Project layout

```
src/
  App.jsx              # page composition + dashboard toggle
  firebase.js          # Firebase bootstrap from VITE_* env (no-ops when unset)
  data.js              # static content (schedule, prizes, chores, …)
  lib/
    useCountdown.js    # 1s countdown to tee-off
    useParty.js        # live/shared state: scores, claims, photos, rsvps, auth
  components/          # one file per page section
firestore.rules        # Firestore security rules
```
