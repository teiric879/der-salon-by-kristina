export type Service = {
  id: string;
  group: 'Color & Blond' | 'Schnitt & Styling' | 'Pflege & Treatment';
  title: string;
  desc: string;
  includes?: string[];
};

export const services: Service[] = [
  {
    id: 'balayage',
    group: 'Color & Blond',
    title: 'Balayage',
    desc: 'Im Gegensatz zu klassischen Strähnen entstehen bei einer Balayage besonders weiche Farbverläufe ohne sichtbare Kanten. Das Ergebnis wirkt natürlicher und wächst deutlich harmonischer heraus.',
    includes: ['Pflege', 'Olaplex', 'Gloss', 'Schnitt & Styling'],
  },
  {
    id: 'airtouch',
    group: 'Color & Blond',
    title: 'Airtouch Strähnen',
    desc: 'Statt ganze Haarpartien aufzuhellen, arbeitet Airtouch mit einer besonders präzisen Auswahl einzelner Haare. Dadurch entsteht ein feineres und gleichmäßigeres Blondbild.',
    includes: ['Pflege', 'Olaplex', 'Gloss', 'Schnitt & Styling'],
  },
  {
    id: 'highlights',
    group: 'Color & Blond',
    title: 'Strähnen & Highlights',
    desc: 'Während Highlights feine Lichtreflexe ins Haar bringen, sorgen klassische Strähnen für eine intensivere Farbwirkung. Gemeinsam wählen wir die Technik, die dein Wunschergebnis am besten unterstreicht.',
    includes: ['Pflege', 'Gloss', 'Schnitt & Styling'],
  },
  {
    id: 'color',
    group: 'Color & Blond',
    title: 'Farbe & Glossing',
    desc: 'Von Ansatzfarbe bis zur kompletten Coloration. Das anschließende Glossing bringt die Farbnuancen perfekt zur Geltung und verleiht deinem Haar ein glänzendes Finish.',
    includes: ['Pflege', 'Schnitt & Styling'],
  },
  {
    id: 'cut',
    group: 'Schnitt & Styling',
    title: 'Schnitt & Styling',
    desc: 'Jeder Schnitt endet mit einem individuellen Styling. Denn erst das richtige Styling bringt die Qualität eines guten Schnittes vollständig zur Geltung.',
  },
  {
    id: 'styling',
    group: 'Schnitt & Styling',
    title: 'Waschen & Styling',
    desc: 'Nach einer entspannenden Haarwäsche mit wohltuender Kopfmassage verleihen wir deinem Haar mit dem passenden Styling den perfekten Look für jeden Anlass.',
  },
  {
    id: 'olaplex',
    group: 'Pflege & Treatment',
    title: 'Olaplex Treatment',
    desc: 'Anders als klassische Pflege wirkt das Olaplex Treatment im Inneren der Haarstruktur. Es stärkt geschwächte Haarbindungen und schützt das Haar während chemischer Behandlungen.',
  },
];

export const groups = ['Color & Blond', 'Schnitt & Styling', 'Pflege & Treatment'] as const;

/* What sets the salon apart — pulled from the salon's real experience. */
export const experience = [
  { title: 'Beratung', icon: 'beratung', desc: 'Individuelle Beratung für dein perfektes Haar.' },
  { title: 'Vegane Produkte', icon: 'vegan', desc: 'Vegane & tierversuchsfreie Produkte für dich und unsere Umwelt.' },
  { title: 'Kopfmassage', icon: 'massage', desc: 'Entspannende Kopfmassage für mehr Wohlbefinden bei jeder Haarwäsche.' },
  { title: 'Kaffee & WLAN', icon: 'kaffee', desc: 'Hochwertige Kaffeespezialitäten, MONIN Sirups & kostenloses WLAN.' },
  { title: 'Klimaanlage', icon: 'klima', desc: 'Angenehmes Raumklima für deine kleine Auszeit.' },
  { title: 'Parkplätze', icon: 'parken', desc: 'Kostenlose Parkplätze direkt vor dem Salon.' },
];
