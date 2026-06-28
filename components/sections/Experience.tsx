'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import SmartImage from '@/components/SmartImage';
import RevealText from '@/components/motion/RevealText';
import Reveal from '@/components/motion/Reveal';
import Counter from '@/components/Counter';

/* Baut einen Text Buchstabe für Buchstabe von links nach rechts auf. */
function LetterReveal({ text }: { text: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{text}</>;
  return (
    <motion.span
      aria-label={text}
      className="inline-flex"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15%' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055 } } }}
    >
      {[...text].map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          variants={{
            hidden: { opacity: 0, x: -10 },
            show: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
          }}
        >
          {ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

type Perk =
  | { icon: string; kind: 'count'; to: number; unit: string; sub: string }
  | { icon: string; kind: 'letters'; text: string; sub: string };

const perks: Perk[] = [
  { icon: 'beratung', kind: 'count', to: 5, unit: ' Expertinnen', sub: 'mit Leidenschaft für schönes Haar' },
  { icon: 'vegan', kind: 'count', to: 100, unit: ' %', sub: 'Vegane Premium Produkte' },
  { icon: 'kaffee', kind: 'letters', text: 'Kaffee', sub: 'Eiskaffee, Cappuccino & mehr' },
  { icon: 'massage', kind: 'letters', text: 'Kopfmassage', sub: 'Bei jeder Haarwäsche' },
];

export default function Experience() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  // dezente Parallaxe des gerahmten Fotos
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['6%', '-6%']);

  return (
    <section className="relative overflow-hidden bg-noir text-canvas">
      {/* warme Gold-Atmosphäre */}
      <div aria-hidden className="absolute -left-24 top-1/4 h-80 w-80 rounded-full bg-gold/15 blur-[130px]" />
      <div aria-hidden className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-gold/10 blur-[140px]" />
      {/* zarte Hairline oben für editoriale Anmutung */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="section relative z-10 py-28 lg:py-36">
        <div className="wrap grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* ── Inhalt ── */}
          <div className="order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <span className="h-[2px] w-9 rounded-full bg-gold" />
              <span className="eyebrow text-gold">Dein Moment</span>
            </div>
            <RevealText
              as="h2"
              text="Hier geht es nicht nur um Haare. *Sondern* *um* *dich.*"
              className="display mt-5 text-[2.1rem] leading-[1.05] text-gold [&_.accent-italic]:text-gold sm:text-[2.7rem] lg:text-[3.1rem]"
            />
            <Reveal delay={0.15}>
              <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-canvas/75">
                Eiskaffee, Cappuccino oder dein Lieblingskaffee mit MONIN Sirup, eine kleine
                Süßigkeit und eine entspannende Kopfmassage. Manchmal sind es genau diese Details,
                die den Unterschied machen.
              </p>
            </Reveal>

            <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 border-t border-canvas/12 pt-9 sm:grid-cols-2">
              {perks.map((p, i) => (
                <Reveal key={p.kind === 'count' ? p.unit : p.text} delay={i * 0.08}>
                  <div className="flex items-center gap-3.5">
                    <Image
                      src={`/images/perks/${p.icon}.png`}
                      alt=""
                      width={96}
                      height={96}
                      className="h-14 w-14 shrink-0 object-contain"
                    />
                    <div className="min-w-0">
                      <p className="font-display text-[1.15rem] leading-tight text-canvas">
                        {p.kind === 'count' ? (
                          <>
                            <Counter to={p.to} />
                            {p.unit}
                          </>
                        ) : (
                          <LetterReveal text={p.text} />
                        )}
                      </p>
                      <p className="mt-0.5 text-[0.82rem] leading-snug text-canvas/60">{p.sub}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ── Gerahmtes Team-Foto mit Zoom-Reveal ── */}
          <div ref={ref} className="order-1 lg:order-2">
            <Reveal delay={0.1}>
              <motion.div style={{ y }} className="relative mx-auto max-w-[440px]">
                {/* Gold-Schein hinter dem Rahmen */}
                <div
                  aria-hidden
                  className="absolute -inset-6 rounded-[36px] bg-gold/15 blur-3xl"
                />

                {/* Rahmen */}
                <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-gold/30 shadow-[0_50px_130px_-50px_rgba(0,0,0,0.85)]">
                  <motion.div
                    className="h-full w-full"
                    style={{ transformOrigin: 'top' }}
                    initial={reduce ? { scale: 1 } : { scale: 1.28 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: '-12%' }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <SmartImage
                      src="/images/salon/team-group.jpg"
                      alt="Das Team von Der Salon by Kristina"
                      fill
                      sizes="(max-width: 1024px) 90vw, 440px"
                      className="object-cover object-top"
                    />
                  </motion.div>

                  {/* sanfter Verlauf am unteren Rand für edle Tiefe */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-noir/50 to-transparent"
                  />

                  {/* feiner Innenrahmen */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-3 rounded-[20px] border border-canvas/15"
                  />

                  {/* Gold-Eckakzente */}
                  <span aria-hidden className="pointer-events-none absolute left-5 top-5 h-6 w-6 border-l border-t border-gold/70" />
                  <span aria-hidden className="pointer-events-none absolute right-5 top-5 h-6 w-6 border-r border-t border-gold/70" />
                  <span aria-hidden className="pointer-events-none absolute bottom-5 left-5 h-6 w-6 border-b border-l border-gold/70" />
                  <span aria-hidden className="pointer-events-none absolute bottom-5 right-5 h-6 w-6 border-b border-r border-gold/70" />

                  {/* Signatur-Label */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                    <span className="text-[0.62rem] uppercase tracking-[0.34em] text-canvas/80">
                      Unser Team
                    </span>
                  </div>
                </div>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
