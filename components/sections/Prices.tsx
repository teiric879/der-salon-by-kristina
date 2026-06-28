'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Check, ShoppingBag } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import { priceGroups, priceNotes } from '@/content/prices';
import { useBooking } from '@/components/BookingProvider';
import WomanLengthSketch from '@/components/WomanLengthSketch';

export default function Prices() {
  const { open } = useBooking();
  const reduce = useReducedMotion();

  const list = { show: { transition: { staggerChildren: 0.05 } } };
  const item = {
    hidden: { opacity: 0, y: reduce ? 0 : 14 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section id="preise" className="section py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Preise & Pakete"
            title="Schönes Haar beginnt mit *klaren Preisen.*"
            intro="Viele Leistungen beinhalten bereits Pflege und Styling. So erwarten dich keine versteckten Zusatzkosten."
          />
          <div className="flex w-full flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center sm:gap-8 lg:w-auto lg:shrink-0 lg:justify-end">
            <WomanLengthSketch />
            <div className="flex max-w-[12rem] items-center gap-3">
              <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-gold/40 text-gold-deep">
                <Check className="h-3.5 w-3.5" strokeWidth={2.25} />
              </span>
              <span className="font-accent text-[1.25rem] italic leading-tight text-ink">
                Beratung in jedem Paket inklusive
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-x-14 gap-y-12 lg:grid-cols-2">
          {priceGroups.map((grp, gi) => (
            <Reveal key={grp.group} delay={gi * 0.06}>
              <div>
                <div className="flex items-baseline justify-between border-b border-line pb-3">
                  <h3 className="font-display text-2xl text-ink">{grp.group}</h3>
                  <div className="flex gap-10 text-[0.72rem] font-medium uppercase tracking-wider text-stone">
                    <span className="w-14 text-right">M</span>
                    <span className="w-14 text-right">L</span>
                  </div>
                </div>
                <motion.ul
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: '-10%' }}
                  variants={list}
                >
                  {grp.items.map((it) => (
                    <motion.li key={it.title} variants={item}>
                      <button
                        type="button"
                        onClick={open}
                        aria-label={`${it.title} – Termin buchen`}
                        className="group relative flex w-full items-start justify-between gap-4 overflow-hidden rounded-md border-b border-line/60 py-4 pl-3 pr-1 text-left transition-colors duration-300 hover:bg-surface/60"
                      >
                        {/* gold accent bar that draws in on hover */}
                        <span
                          aria-hidden
                          className="absolute bottom-3 left-0 top-3 w-[2px] origin-bottom scale-y-0 bg-gold-deep transition-transform duration-300 ease-smooth group-hover:scale-y-100"
                        />
                        <div className="min-w-0 transition-transform duration-300 ease-smooth group-hover:translate-x-1">
                          <p className="flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-medium text-ink">
                            <span className="flex items-center gap-1.5">
                              {it.title}
                              <ArrowUpRight
                                className="h-3.5 w-3.5 -translate-x-1 text-gold-deep opacity-0 transition-all duration-300 ease-smooth group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </span>
                            {it.isPackage && (
                              <span className="relative inline-flex items-center gap-1.5 rounded-full border border-gold/45 bg-gradient-to-b from-[rgb(var(--gold)/0.16)] to-[rgb(var(--gold)/0.04)] px-3 py-[5px] shadow-[0_2px_10px_-5px_rgba(122,84,28,0.45)]">
                                <span
                                  aria-hidden
                                  className="pointer-events-none absolute inset-[1px] rounded-full ring-1 ring-inset ring-white/45"
                                />
                                <ShoppingBag className="relative h-3 w-3 text-gold-deep" strokeWidth={1.6} />
                                <span className="relative text-[0.58rem] font-semibold uppercase tracking-[0.24em] text-gold-deep">
                                  Paket
                                </span>
                              </span>
                            )}
                          </p>
                          {it.includes && it.includes.length > 0 && (
                            <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
                              {it.includes.map((tag) => (
                                <span key={tag} className="flex items-center gap-1 text-[0.78rem] text-stone">
                                  <span className="text-gold-deep">✓</span>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex shrink-0 gap-10 pt-0.5 font-display tabular-nums text-ink">
                          <span className="w-14 text-right">{it.m} €</span>
                          <span className="w-14 text-right text-gold-deep transition-transform duration-300 ease-smooth group-hover:-translate-y-0.5">
                            {it.l} €
                          </span>
                        </div>
                      </button>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div className="mt-12 overflow-hidden rounded-[24px] border border-gold/25 bg-gold/[0.05] p-8 sm:p-10">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-14">
              <div className="max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="h-[2px] w-9 rounded-full bg-gold" />
                  <span className="eyebrow text-gold">Gut zu wissen</span>
                </div>
                <div className="mt-7 space-y-6">
                  {priceNotes.map((n, i) => (
                    <div key={n} className="flex gap-5">
                      <span className="shrink-0 font-display text-[1.6rem] leading-none text-gold-deep/55 tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="max-w-prose pt-1.5 text-[0.97rem] leading-relaxed text-ink-soft">{n}</p>
                    </div>
                  ))}
                </div>
              </div>
              <button onClick={open} className="btn btn-primary shrink-0">
                <span>Wunschtermin buchen</span>
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
