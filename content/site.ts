export const site = {
  name: 'Der Salon by Kristina',
  legalName: 'Der Salon by Kristina GmbH',
  tagline: 'No more bad hair days',
  owner: 'Kristina Breuer',
  ownerTitle: 'Friseurmeisterin',
  address: {
    street: 'Billiger Str. 60',
    zip: '53879',
    city: 'Euskirchen',
  },
  phone: '02251 7736339',
  phoneHref: 'tel:+4922517736339',
  whatsappHref: 'https://wa.me/4922517736339',
  email: 'team@dersalon-euskirchen.de',
  hours: [
    { day: 'Montag – Freitag', time: '09:00 – 18:00 Uhr' },
    { day: 'Samstag & Sonntag', time: 'Geschlossen' },
  ],
  booking: {
    url: 'https://www.studiobookr.com/vorfreude-rheinbach-gmbh-66721#/',
    provider: 'StudioBookr',
  },
  social: {
    instagram: 'https://www.instagram.com/dersalon_euskirchen/',
    instagramHandle: '@dersalon_euskirchen',
    facebook: 'https://www.facebook.com/dersaloneuskirchen/?locale=de_DE',
  },
  maps: 'https://www.google.com/maps/search/?api=1&query=Der+Salon+by+Kristina+Billiger+Str.+60+53879+Euskirchen',
} as const;

export const nav = [
  { label: 'Salon', href: '#salon' },
  { label: 'Leistungen', href: '#leistungen' },
  { label: 'Ergebnisse', href: '#ergebnisse' },
  { label: 'Team', href: '#team' },
  { label: 'Preise', href: '#preise' },
  { label: 'Kontakt', href: '#kontakt' },
] as const;
