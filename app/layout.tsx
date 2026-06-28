import type { Metadata, Viewport } from 'next';
import { Playfair_Display, Cormorant, Inter } from 'next/font/google';
import { site } from '@/content/site';
import { faqs } from '@/content/faq';
import SmoothScroll from '@/components/motion/SmoothScroll';
import ConsentProvider from '@/components/ConsentProvider';
import BookingProvider from '@/components/BookingProvider';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
});
const cormorant = Cormorant({
  subsets: ['latin'],
  weight: ['500', '600'],
  style: ['italic'],
  variable: '--font-accent',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const url = 'https://dersalon-euskirchen.de';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: 'Der Salon by Kristina · Premium Friseur & Color in Euskirchen',
    template: '%s · Der Salon by Kristina',
  },
  description:
    'Der Salon by Kristina in Euskirchen – Spezialist für Balayage, Airtouch, Color & langes Haar. Individuelle Beratung, Maria Nila Education Salon. No more bad hair days.',
  keywords: [
    'Friseur Euskirchen',
    'Balayage Euskirchen',
    'Airtouch',
    'Haare färben Euskirchen',
    'Coloration',
    'Der Salon by Kristina',
  ],
  alternates: { canonical: url },
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    url,
    siteName: site.name,
    title: 'Der Salon by Kristina · Premium Friseur in Euskirchen',
    description:
      'Spezialist für Balayage, Airtouch & Color. Individuelle Beratung in entspanntem Ambiente. No more bad hair days.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#1A1614',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: site.legalName,
    image: `${url}/images/salon/img_2662.jpg`,
    url,
    telephone: site.phone,
    email: site.email,
    priceRange: '€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.address.street,
      postalCode: site.address.zip,
      addressLocality: site.address.city,
      addressCountry: 'DE',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
    ],
    sameAs: [site.social.instagram, site.social.facebook],
  };

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <html lang="de" className={`${playfair.variable} ${cormorant.variable} ${inter.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
        />
        <ConsentProvider>
          <BookingProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </BookingProvider>
        </ConsentProvider>
      </body>
    </html>
  );
}
