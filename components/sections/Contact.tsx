'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, MapIcon, MessageCircle } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { site } from '@/content/site';
import { useBooking } from '@/components/BookingProvider';

export default function Contact() {
  const [map, setMap] = useState(false);
  const { open } = useBooking();
  const embed =
    'https://www.google.com/maps?q=Billiger+Str.+60,+53879+Euskirchen&output=embed';

  return (
    <section id="kontakt" className="section py-24 lg:py-32">
      <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHeading
            eyebrow="Besuche uns"
            title="Mitten in *Euskirchen.*"
            intro="Spezialisiert auf Balayage, Airtouch, Blond und moderne Colorationen. Zentral in Euskirchen und mit Leidenschaft für schönes Haar."
          />

          <div className="mt-10 space-y-6">
            <Reveal>
              <a href={site.maps} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold-deep transition-all duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:bg-gold-deep group-hover:text-canvas group-hover:shadow-[0_10px_22px_-12px_rgb(var(--gold-deep)/0.7)]">
                  <MapPin className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-[0.78rem] uppercase tracking-wider text-stone">Adresse</p>
                  <p className="font-display text-lg text-ink group-hover:text-gold-deep">
                    {site.address.street}, {site.address.zip} {site.address.city}
                  </p>
                </div>
              </a>
            </Reveal>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Reveal delay={0.05}>
                <div className="flex items-start gap-4">
                  <a
                    href={site.phoneHref}
                    aria-label={`${site.phone} anrufen`}
                    className="group grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold-deep transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:bg-gold-deep hover:text-canvas hover:shadow-[0_10px_22px_-12px_rgb(var(--gold-deep)/0.7)]"
                  >
                    <Phone className="h-5 w-5" />
                  </a>
                  <div>
                    <p className="text-[0.78rem] uppercase tracking-wider text-stone">
                      Telefon &amp; WhatsApp
                    </p>
                    <a
                      href={site.phoneHref}
                      className="font-display text-lg text-ink transition-colors hover:text-gold-deep"
                    >
                      {site.phone}
                    </a>
                    <div className="mt-2 flex items-center gap-3 text-[0.82rem]">
                      <a href={site.phoneHref} className="link-gold">
                        Anrufen
                      </a>
                      <span className="h-3 w-px bg-line" />
                      <a
                        href={site.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 link-gold"
                      >
                        <MessageCircle className="h-3.5 w-3.5" />
                        WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <a href={`mailto:${site.email}`} className="flex items-start gap-4 group">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold-deep transition-all duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:bg-gold-deep group-hover:text-canvas group-hover:shadow-[0_10px_22px_-12px_rgb(var(--gold-deep)/0.7)]">
                    <Mail className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-[0.78rem] uppercase tracking-wider text-stone">E-Mail</p>
                    <p className="font-display text-base text-ink group-hover:text-gold-deep break-all">{site.email}</p>
                  </div>
                </a>
              </Reveal>
            </div>

            <Reveal delay={0.15}>
              <div className="group flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold-deep transition-all duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:bg-gold-deep group-hover:text-canvas group-hover:shadow-[0_10px_22px_-12px_rgb(var(--gold-deep)/0.7)]">
                  <Clock className="h-5 w-5" />
                </span>
                <div className="w-full">
                  <p className="text-[0.78rem] uppercase tracking-wider text-stone">Öffnungszeiten</p>
                  <ul className="mt-2 w-full space-y-1.5">
                    {site.hours.map((h) => (
                      <li
                        key={h.day}
                        className="flex items-baseline justify-between gap-8 font-display text-lg text-ink"
                      >
                        <span>{h.day}</span>
                        <span className="text-right text-ink-soft">{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>

            <div className="flex flex-wrap items-center gap-x-6 gap-y-4 pt-2">
              <button onClick={open} className="btn btn-primary">
                <span>Termin buchen</span>
              </button>
              <div className="flex items-center gap-2">
                <a
                  href={site.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-gold-deep hover:text-gold-deep"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={site.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink-soft transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-gold-deep hover:text-gold-deep"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Map (click-to-load for DSGVO) */}
        <Reveal delay={0.1}>
          <div className="relative aspect-square overflow-hidden rounded-[24px] border border-line lg:aspect-auto lg:h-full lg:min-h-[420px]">
            {map ? (
              <iframe
                src={embed}
                title="Standort Der Salon by Kristina"
                className="h-full w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <button
                onClick={() => setMap(true)}
                className="group flex h-full w-full flex-col items-center justify-center gap-4 bg-surface text-center"
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-gold/10 text-gold-deep transition-all duration-300 ease-smooth group-hover:-translate-y-1 group-hover:bg-gold-deep group-hover:text-canvas group-hover:shadow-[0_14px_30px_-14px_rgb(var(--gold-deep)/0.7)]">
                  <MapIcon className="h-7 w-7" />
                </span>
                <span className="max-w-xs px-6">
                  <span className="font-display text-lg text-ink">Karte anzeigen</span>
                  <span className="mt-1 block text-[0.84rem] text-ink-soft">
                    Mit Klick lädst du Google Maps und stimmst der Datenübertragung gemäß{' '}
                    <a href="/datenschutz" className="link-gold">Datenschutz</a> zu.
                  </span>
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
