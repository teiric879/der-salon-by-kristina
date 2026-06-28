export type Review = {
  quote: string;
  highlight?: string;
  author: string;
  stars: number;
};

export const reviewsRating = { value: 4.5, label: 'auf Google' };

export const reviews: Review[] = [
  {
    quote:
      'Für mich der beste Salon im Raum Euskirchen! Super professionell, immer up to date und mit den besten Produkten. Der neue Salon ist richtig schön geworden. Die Beratung ist top, man merkt, dass hier echte Profis am Werk sind. Besonders bei Farben bin ich jedes Mal begeistert. Dazu ein super nettes, hilfsbereites Team. Klare Empfehlung!',
    highlight: 'Die Beratung ist top, man merkt, dass hier echte Profis am Werk sind.',
    author: 'Nadja A.',
    stars: 5,
  },
  {
    quote:
      'Ich bin sehr zufrieden! Alle Mitarbeiterinnen sind kompetent und freundlich. Die Preise sind fair. Klare Empfehlung von mir!',
    highlight: 'Alle Mitarbeiterinnen sind kompetent und freundlich.',
    author: 'Vera V.',
    stars: 5,
  },
  {
    quote:
      'Super liebes Team, wo man sich wirklich in guten Händen fühlt! Das Wohl des Kunden steht immer im Vordergrund und es wird sehr viel Wert darauf gelegt, dass der Kunde zufrieden nach Hause geht. Eure Farben und Produkte von Maria Nila sind toll und super verträglich. Danke Emma & Louisa für eure geduldige und liebe Art. Ich komme gerne jederzeit wieder und fühle mich bei euch super aufgehoben. By the Way: Man bekommt bei jedem Besuch ein Getränk mit kleinen Leckereien dazu. Schöner Service, den ich nicht selbstverständlich finde.',
    highlight: 'Schöner Service, den ich nicht selbstverständlich finde.',
    author: 'Gina S.',
    stars: 5,
  },
  {
    quote:
      'Wirklich toller Salon! Kleiner Spa-Tag, super Beratung und Behandlung mit wundervollem Styling in einem.',
    highlight: 'Kleiner Spa-Tag, super Beratung und Behandlung mit wundervollem Styling in einem.',
    author: 'Caroline A.',
    stars: 5,
  },
  {
    quote:
      'Ich habe schon lange eine Hairstylistin gesucht, die wirklich schafft meinen dicken Haaren einen Schnitt zu machen, so dass ich absolut zufrieden bin. Endlich gefunden. Danke schön Louisa! Ihr seid ein modernes Salon mit schöner Ambiente und ihr seid ein tolles modernes Team. Bin so froh bei euch zu sein und freue mich immer wieder auf einen neuen Termin.',
    highlight: 'Endlich gefunden.',
    author: 'Local Guide',
    stars: 5,
  },
];
