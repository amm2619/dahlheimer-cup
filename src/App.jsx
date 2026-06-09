import { useState } from 'react';
import useParty from './lib/useParty.js';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Schedule from './components/Schedule.jsx';
import PuttingCup from './components/PuttingCup.jsx';
import Decorations from './components/Decorations.jsx';
import HelpList from './components/HelpList.jsx';
import Directions from './components/Directions.jsx';
import WallOfFame from './components/WallOfFame.jsx';
import Rsvp from './components/Rsvp.jsx';
import Footer from './components/Footer.jsx';
import HostDashboard from './components/HostDashboard.jsx';

export default function App() {
  const party = useParty();
  const [dashboardOpen, setDashboardOpen] = useState(false);

  function openDashboard() {
    setDashboardOpen(true);
    // If live and not yet signed in, kick off the Google popup right away.
    if (party.live && !party.hostUser) party.hostLogin();
  }

  return (
    <div
      style={{
        fontFamily: "'EB Garamond', Georgia, serif",
        color: '#241f12',
        background: '#f5efdf',
        fontSize: 18,
        lineHeight: 1.6,
        maxWidth: 1040,
        margin: '0 auto',
        boxShadow: '0 0 80px rgba(0,0,0,0.35)',
      }}
    >
      <Nav />
      <Hero />
      <Schedule />
      <PuttingCup party={party} />
      <Decorations />
      <HelpList party={party} />
      <Directions />
      <WallOfFame party={party} />
      <Rsvp party={party} />
      <Footer onHostLogin={openDashboard} />

      {dashboardOpen && <HostDashboard party={party} onClose={() => setDashboardOpen(false)} />}
    </div>
  );
}
