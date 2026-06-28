'use client';

import { Leaf, Rabbit, MapPin, GraduationCap } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';

const attributes = [
  { icon: Leaf, label: 'Vegan' },
  { icon: Rabbit, label: '100 % tierversuchsfrei' },
  { icon: MapPin, label: 'Made in Stockholm' },
];

/* Official Maria Nila partnership — editorial luxury panel that gives the
   brand collaboration real presence rather than a thin logo strip. */
export default function MariaNila() {
  return (
    <section className="section relative overflow-hidden border-y border-line bg-surface/40 py-20 lg:py-28">
      {/* warm ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[130px]" />
      </div>

      <div className="wrap">
        <Reveal>
          <div className="mx-auto flex max-w-3xl flex-col items-center rounded-[28px] border border-line bg-canvas/60 px-8 py-12 text-center shadow-[0_50px_100px_-60px_rgba(122,84,28,0.35)] backdrop-blur-sm lg:px-16 lg:py-16">
            {/* eyebrow */}
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-gold/60" />
              <span className="text-[0.72rem] font-medium uppercase tracking-[0.28em] text-gold-deep">
                Offizieller Partner
              </span>
              <span className="h-px w-8 bg-gold/60" />
            </div>

            {/* brand wordmark */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/maria-nila.png"
              alt="Maria Nila Stockholm"
              className="mt-8 h-16 w-auto lg:h-[5rem]"
            />

            {/* premium attributes */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
              {attributes.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2.5">
                  <Icon className="h-[18px] w-[18px] text-gold-deep" strokeWidth={1.6} />
                  <span className="text-[0.82rem] font-medium tracking-wide text-ink">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* educator emblem — signature trust mark */}
            <div className="mt-11 flex flex-col items-center gap-5">
              <span className="h-px w-20 bg-gradient-to-r from-transparent via-gold/55 to-transparent" />
              <div className="group relative inline-flex items-center gap-4 rounded-full border border-gold/30 bg-gradient-to-b from-surface to-canvas px-7 py-3.5 shadow-[0_26px_55px_-30px_rgba(122,84,28,0.55)]">
                {/* feiner Innen-Goldschimmer */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-px rounded-full ring-1 ring-inset ring-canvas/60"
                />
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-gold to-gold-deep text-canvas shadow-[0_8px_18px_-8px_rgba(122,84,28,0.9)]">
                  <GraduationCap className="h-[19px] w-[19px]" strokeWidth={1.7} />
                </span>
                <span className="flex flex-col text-left leading-none">
                  <span className="font-display text-[1.12rem] text-ink">Salon &amp; Educator</span>
                  <span className="mt-1.5 text-[0.6rem] uppercase tracking-[0.26em] text-gold-deep">
                    Maria Nila Zertifiziert
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
