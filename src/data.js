// Static content for the page — lifted verbatim from the design prototype.

export const TARGET = new Date('2026-08-08T15:00:00-04:00').getTime();

export const CHORES = [
  { id: 'charc', tag: 'A1', label: 'Charcuterie Captain', detail: 'Build the meat-and-cheese masterpiece. Grapes are non-negotiable.' },
  { id: 'cheese', tag: 'A2', label: 'Cheese Board Curator', detail: 'Three cheeses minimum. One should smell mildly alarming.' },
  { id: 'fruit', tag: 'A3', label: 'Fruit Plate Engineer', detail: 'Slice, fan, arrange. Make it look like a magazine cover.' },
  { id: 'ice', tag: 'B1', label: 'Ice & Cooler Duty', detail: 'Bags of ice, full coolers, cold drinks. The unsung hero.' },
  { id: 'drinks', tag: 'B2', label: 'Bar & Beverages', detail: 'Stock the drinks. Yes, including the good stuff.' },
  { id: 'decor', tag: 'C1', label: 'Decoration Crew', detail: 'Flags, banners, the green setup. Arrive by 1:30 to set up.' },
  { id: 'marshal', tag: 'C2', label: 'Putting Green Marshal', detail: 'Run the Dalhemier Cup, keep score, settle the disputes.' },
  { id: 'music', tag: 'C3', label: 'Playlist Boss', detail: 'A speaker and a playlist that is not just smooth jazz.' },
  { id: 'photos', tag: 'D1', label: 'Official Photographer', detail: 'Capture the putts, the speeches, the questionable dancing.' },
  { id: 'cleanup', tag: 'D2', label: 'Cleanup Crew (the MVPs)', detail: 'Stick around at the end. Many hands, light work.' },
];

export const SCHEDULE = [
  { time: '3:00', title: 'Arrival & Back-Nine Cocktails', desc: 'Roll in, grab a drink, find some shade. No need to be on time — Brian never was.' },
  { time: '3:30', title: 'The Dalhemier Cup Opens', desc: 'The putting green is live. Post a score any time before 6:30. Trash talk encouraged.' },
  { time: '4:30', title: 'The Valanti Spread', desc: 'Charcuterie, cheese, fruit, and the good catering hits the table. Pace yourself.' },
  { time: '5:30', title: 'Roast & Toasts', desc: 'Speeches, stories, and a few well-earned jokes at the guest of honor’s expense.' },
  { time: '6:30', title: 'Cup Finals & Trophy Ceremony', desc: 'Top putters face off. Prizes awarded. Brian pretends he let you win.' },
  { time: '7:00', title: 'Dinner', desc: 'Round two of Valanti. Settle in, the night is young-ish.' },
  { time: 'Til ???', title: 'Lawn Games & Long Stories', desc: 'We go until we give up. Designated drivers strongly recommended.' },
];

export const PRIZES = [
  { place: '1st Place', title: 'The Green Jacket', desc: 'A genuinely loud green blazer and a year of insufferable bragging rights.', bg: 'rgba(216,178,74,0.14)', border: 'rgba(216,178,74,0.5)', accent: '#d8b24a' },
  { place: '2nd Place', title: 'The Silver Putter', desc: 'So close. A shiny something and the runner-up’s eternal what-if.', bg: 'rgba(255,255,255,0.06)', border: 'rgba(255,255,255,0.18)', accent: '#cfd4cb' },
  { place: '3rd Place', title: 'Sleeve of Pride', desc: 'A sleeve of golf balls and a respectable spot on the podium.', bg: 'rgba(192,138,74,0.14)', border: 'rgba(192,138,74,0.4)', accent: '#cf9a5e' },
  { place: 'Dead Last', title: 'The Brian Award', desc: 'For the worst putt of the day. A booby prize in his honor. Wear it loud.', bg: 'rgba(255,255,255,0.04)', border: 'rgba(255,255,255,0.12)', accent: '#9aa394' },
];

export const DECOR = [
  { title: 'Color Story', desc: 'Clubhouse greens, cream, and brass-gold. Think Augusta, not arcade.' },
  { title: 'The Green', desc: 'Practice putting mat in the backyard, a real flagstick, and a chalkboard scoreboard.' },
  { title: 'Tablescape', desc: 'Cream linens, mason jars with greenery, scattered golf balls and tees as accents.' },
  { title: 'Signage', desc: 'A welcome flag at the drive, hand-lettered "Dalhemier Cup" signs, and the sticker job-sheet at the door.' },
];

export const WALL_OF_FAME = [
  { id: 'brian-1', placeholder: 'Drop a photo of Brian', caption: 'The early years.' },
  { id: 'brian-2', placeholder: 'Drop a photo', caption: 'That swing in question.' },
  { id: 'brian-3', placeholder: 'Drop a photo', caption: 'Peak career form.' },
  { id: 'brian-4', placeholder: 'Drop a photo', caption: 'Officially off the clock.' },
];
