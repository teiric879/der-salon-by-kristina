'use client';

import { Instagram, Facebook, ArrowUpRight } from 'lucide-react';
import RevealText from '@/components/motion/RevealText';
import { site, nav } from '@/content/site';
import { useBooking } from '@/components/BookingProvider';
import { useConsent } from '@/components/ConsentProvider';

export default function Footer() {
  const { open } = useBooking();
  const { openSettings } = useConsent();
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-noir text-canvas">
      <div aria-hidden className="absolute -top-24 left-1/2 h-72 w-[40rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]" />

      <div className="section relative z-10">
        {/* CTA band */}
        <div className="wrap border-b border-canvas/10 py-16 text-center lg:py-24">
          <RevealText
            as="h2"
            text="Bereit für deinen *besten Look?*"
            className="display mx-auto max-w-3xl text-[2.2rem] leading-[1.05] text-canvas sm:text-[3.2rem] lg:text-[4rem]"
          />
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button onClick={open} className="btn btn-light">
              <span>Termin online buchen</span>
            </button>
            <a href={site.phoneHref} className="btn btn-outline border-canvas/30 text-canvas">
              <span>{site.phone}</span>
            </a>
          </div>
        </div>

        {/* link grid */}
        <div className="wrap grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo.svg"
              alt="Der Salon by Kristina"
              className="h-14 w-auto"
              style={{ filter: 'brightness(0) invert(1)' }}
            />
            <p className="mt-5 max-w-xs text-[0.92rem] leading-relaxed text-canvas/60">
              {site.legalName} – dein Spezialist für Color, Balayage und gesundes Blond in Euskirchen.
            </p>
          </div>

          <div>
            <p className="text-[0.74rem] uppercase tracking-widest2 text-canvas/40">Entdecken</p>
            <ul className="mt-4 space-y-2.5">
              {nav.map((n) => (
                <li key={n.href}>
                  <a
                    href={n.href}
                    className="group relative inline-flex items-center text-[0.95rem] text-canvas/75 transition-colors duration-300 hover:text-gold"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 h-px w-3 origin-left scale-x-0 bg-gold transition-transform duration-300 ease-smooth group-hover:scale-x-100"
                    />
                    <span className="transition-transform duration-300 ease-smooth group-hover:translate-x-5">
                      {n.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[0.74rem] uppercase tracking-widest2 text-canvas/40">Kontakt</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-canvas/75">
              <li>{site.address.street}</li>
              <li>{site.address.zip} {site.address.city}</li>
              <li><a href={site.phoneHref} className="hover:text-gold">{site.phone}</a></li>
              <li><a href={`mailto:${site.email}`} className="hover:text-gold break-all">{site.email}</a></li>
            </ul>
            <div className="mt-5 flex gap-3">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-canvas/20 text-canvas/80 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold">
                <Instagram className="h-4 w-4 transition-transform duration-300 ease-smooth hover:scale-110" />
              </a>
              <a href={site.social.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-canvas/20 text-canvas/80 transition-all duration-300 ease-smooth hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold">
                <Facebook className="h-4 w-4 transition-transform duration-300 ease-smooth hover:scale-110" />
              </a>
            </div>
          </div>

          <div>
            <p className="text-[0.74rem] uppercase tracking-widest2 text-canvas/40">Öffnungszeiten</p>
            <ul className="mt-4 space-y-2.5 text-[0.95rem] text-canvas/75">
              {site.hours.map((h) => (
                <li key={h.day} className="flex flex-col">
                  <span>{h.day}</span>
                  <span className="text-canvas/50">{h.time}</span>
                </li>
              ))}
            </ul>
            <a href={site.booking.url} target="_blank" rel="noopener noreferrer" className="group mt-5 inline-flex items-center gap-1.5 text-[0.9rem] text-gold">
              Online buchen
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        {/* bottom bar */}
        <div className="wrap flex flex-col items-center justify-between gap-4 border-t border-canvas/10 py-7 text-[0.84rem] text-canvas/50 sm:flex-row">
          <p>© {year} {site.legalName}</p>
          <div className="flex gap-6">
            <a href="/impressum" className="hover:text-gold">Impressum</a>
            <a href="/datenschutz" className="hover:text-gold">Datenschutz</a>
            <button type="button" onClick={openSettings} className="hover:text-gold">
              Cookie-Einstellungen
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
