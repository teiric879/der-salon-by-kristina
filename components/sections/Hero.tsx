'use client';

import { Fragment, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { Star, StarHalf, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import SmartImage from '@/components/SmartImage';
import RotatingBadge from '@/components/RotatingBadge';
import MagneticButton from '@/components/motion/MagneticButton';
import { useBooking } from '@/components/BookingProvider';
import { site } from '@/content/site';

const headline = ['Wo Farbe', 'zur', '*Handschrift*', 'wird.'];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { open } = useBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -60]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section id="top" ref={ref} className="section relative min-h-[100svh] overflow-hidden pt-[var(--nav-h)]">
      {/* warm ambient glows */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-24 h-[520px] w-[520px] rounded-full bg-gold/10 blur-[120px]" />
        <div className="absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-[rgb(214,180,140)]/15 blur-[120px]" />
      </div>

      <div className="wrap grid min-h-[calc(100svh-var(--nav-h))] grid-cols-1 items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-0">
        {/* ── Left: copy ── */}
        <motion.div style={{ y: textY }} className="relative z-10 max-w-xl">
          {/* Eyebrow-Chip — original PNG asset */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="-mb-6 inline-block"
          >
            <Image
              src="/images/eyebrow-chip.png"
              alt="Natürlich schöne Ergebnisse"
              width={480}
              height={128}
              priority
              className="w-[min(330px,80vw)] h-auto"
            />
          </motion.div>

          <h1 className="display mt-0 text-[3.1rem] leading-[0.98] sm:text-[4rem] lg:text-[4.7rem]">
            {headline.map((w, i) => {
              const emph = w.startsWith('*');
              const clean = w.replace(/\*/g, '');
              return (
                <Fragment key={i}>
                  <span className="inline-block overflow-hidden align-bottom">
                    <motion.span
                      className={'inline-block ' + (emph ? 'accent-italic' : '')}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.85, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {clean}
                    </motion.span>
                  </span>{' '}
                </Fragment>
              );
            })}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="lead mt-7 max-w-lg text-[1.08rem]"
          >
            Balayage, Airtouch und Blondtechniken mit Präzision kombiniert – mit ehrlicher Beratung
            und Ergebnissen, die sich einfach nach dir anfühlen.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.68 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={open} className="btn btn-primary">
              <span>Termin buchen</span>
            </MagneticButton>
            <a href="#leistungen" className="btn btn-outline">
              <span>Unsere Leistungen</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="mt-10 flex items-center gap-6"
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-gold text-gold" />
              ))}
              <span className="relative inline-block h-4 w-4">
                <Star className="absolute inset-0 h-4 w-4 text-gold/35" />
                <StarHalf className="absolute inset-0 h-4 w-4 fill-gold text-gold" />
              </span>
              <span className="ml-1 text-sm font-medium tabular-nums text-ink">4,5</span>
              <span className="ml-1 text-sm text-ink-soft">Top bewertet in Euskirchen</span>
            </div>
          </motion.div>

          {/* Maria Nila partner lockup — agency-grade horizontal credential */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.05 }}
            className="mt-9 flex flex-nowrap items-center gap-x-3.5 sm:gap-x-5"
          >
            <span className="shrink-0 whitespace-nowrap text-[0.62rem] font-medium uppercase tracking-[0.28em] text-gold-deep sm:text-[0.72rem]">
              Official
            </span>
            <span aria-hidden className="h-9 w-px shrink-0 bg-gradient-to-b from-transparent via-line to-transparent sm:h-11" />
            <Image
              src="/maria-nila.png"
              alt="Maria Nila Stockholm"
              width={1200}
              height={468}
              className="h-9 w-auto shrink-0 sm:h-11"
            />
            <span aria-hidden className="h-9 w-px shrink-0 bg-gradient-to-b from-transparent via-line to-transparent sm:h-11" />
            <span className="shrink-0 whitespace-nowrap text-[0.62rem] font-medium uppercase tracking-[0.24em] text-ink-soft sm:text-[0.72rem]">
              Salon &amp; Educator
            </span>
          </motion.div>
        </motion.div>

        {/* ── Right: image stage ── */}
        <motion.div style={{ opacity: fade }} className="relative">
          <motion.div
            initial={{ clipPath: 'inset(12% 12% 12% 12% round 28px)', opacity: 0 }}
            animate={{ clipPath: 'inset(0% 0% 0% 0% round 28px)', opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] border border-line/70 shadow-[0_40px_90px_-50px_rgb(var(--ink)/0.5)] sm:aspect-[5/6]"
          >
            <motion.div style={{ y: imgY, scale: imgScale }} className="absolute inset-0">
              <SmartImage
                src="/images/results/hero.jpg"
                alt="Dimensionales Balayage mit softem Blond-Verlauf – Der Salon by Kristina"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 46vw"
                rounded="rounded-[28px]"
                className="object-cover object-top"
              />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/30 via-transparent to-transparent" />
          </motion.div>

          {/* rotating seal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="absolute -right-4 -top-4 hidden rounded-full bg-canvas/70 p-1 backdrop-blur sm:block"
          >
            <RotatingBadge />
          </motion.div>

        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#salon"
        aria-label="Weiter scrollen"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-stone lg:flex"
      >
        <span className="text-[0.7rem] uppercase tracking-widest2">Scrollen</span>
        <motion.span animate={reduce ? undefined : { y: [0, 7, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ArrowDown className="h-4 w-4" />
        </motion.span>
      </motion.a>
    </section>
  );
}
