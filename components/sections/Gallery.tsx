'use client';

import { useRef, useState, useCallback, useEffect } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Marquee from '@/components/Marquee';

/* ─── data ─────────────────────────────────────────────────── */
const pairs = [
  {
    before: '/sliderfotos/before-1.jpg',
    after: '/sliderfotos/after-1.jpg',
    label: 'Balayage Transformation',
    tag: 'COLOR',
  },
  {
    before: '/sliderfotos/before-2.jpg',
    after: '/sliderfotos/after-2.jpg',
    label: 'Airtouch Blond',
    tag: 'BLOND',
  },
  {
    before: '/sliderfotos/before-3.jpg',
    after: '/sliderfotos/after-3.jpg',
    label: 'Farbe & Glossing',
    tag: 'GLOSS',
  },
];

/* ─── single before/after slider card ──────────────────────── */
function BeforeAfterCard({
  pair,
  index,
}: {
  pair: (typeof pairs)[number];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: '-10%' });

  /* position 0–1 (left edge = 0, right edge = 1) */
  const [pos, setPos] = useState(0.5);
  const dragging = useRef(false);
  const animating = useRef(false);

  /* on first in-view: sweep from 1 → 0.5 to reveal the after side */
  useEffect(() => {
    if (!inView || animating.current) return;
    animating.current = true;
    const delay = index * 0.18; // stagger
    const controls = animate(1, 0.5, {
      duration: 1.1,
      delay,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setPos(v),
    });
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView]);

  /* drag handling (pointer events, works mouse + touch) */
  const getPercent = useCallback((e: PointerEvent | React.PointerEvent) => {
    const el = cardRef.current;
    if (!el) return 0.5;
    const rect = el.getBoundingClientRect();
    return Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    setPos(getPercent(e));
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    setPos(getPercent(e));
  };
  const onPointerUp = () => {
    dragging.current = false;
  };

  const pct = `${(pos * 100).toFixed(2)}%`;

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.14, ease: [0.22, 1, 0.36, 1] }}
      className="group relative w-full"
    >
      {/* card container */}
      <div
        className="relative aspect-[3/4] cursor-col-resize select-none overflow-hidden rounded-[20px] border border-line"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {/* AFTER (base, full width) */}
        <Image
          src={pair.after}
          alt={`${pair.label} – Nachher`}
          fill
          sizes="(max-width: 768px) 90vw, 33vw"
          className="pointer-events-none object-cover"
          priority={index === 0}
        />

        {/* BEFORE (clipped to left of divider) */}
        <div
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${(1 - pos) * 100}% 0 0)` }}
        >
          <Image
            src={pair.before}
            alt={`${pair.label} – Vorher`}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-cover"
          />
        </div>

        {/* subtle gradient overlay (bottom) */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noir/60 via-noir/0 to-transparent" />

        {/* ── Divider line ── */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-px bg-canvas/80 shadow-[0_0_12px_2px_rgba(176,132,70,0.35)]"
          style={{ left: pct }}
        />

        {/* ── Handle ── */}
        <div
          className="pointer-events-none absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          style={{ left: pct }}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/60 bg-canvas/90 shadow-[0_4px_24px_rgba(122,84,28,0.28)] backdrop-blur-sm transition-transform duration-150 group-active:scale-95">
            {/* double chevron icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              className="text-gold-deep"
            >
              <path
                d="M7 5L3 9l4 4M11 5l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Labels: VORHER / NACHHER */}
        <div className="pointer-events-none absolute inset-x-0 top-4 z-10 flex justify-between px-5">
          <span
            className="rounded-full bg-canvas/15 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-widest text-canvas backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: pos > 0.06 ? 1 : 0 }}
          >
            Vorher
          </span>
          <span
            className="rounded-full bg-canvas/15 px-3 py-1 text-[0.62rem] font-medium uppercase tracking-widest text-canvas backdrop-blur-sm transition-opacity duration-300"
            style={{ opacity: pos < 0.94 ? 1 : 0 }}
          >
            Nachher
          </span>
        </div>

        {/* caption bottom */}
        <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between p-5">
          <span className="font-display text-[1.05rem] text-canvas">{pair.label}</span>
          <span className="rounded-full bg-canvas/15 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-wider text-canvas backdrop-blur-sm">
            {pair.tag}
          </span>
        </figcaption>
      </div>
    </motion.div>
  );
}

/* ─── section ───────────────────────────────────────────────── */
export default function Gallery() {
  return (
    <section id="ergebnisse" className="section py-24 lg:py-32">
      <div className="wrap">
        <SectionHeading
          eyebrow="Vorher & Nachher"
          title="Ergebnisse, die für sich *sprechen.*"
          intro="Keine Modelle — echte Kundinnen, echte Transformationen aus unserem Salon. Ziehe den Regler, um das Ergebnis zu enthüllen."
        />
      </div>

      {/* Laufleiste: weitere Arbeiten, 2 gegenläufige Reihen */}
      <div className="my-14 lg:my-16">
        <Marquee />
      </div>

      <div className="wrap">
        <div className="grid gap-5 sm:grid-cols-3">
          {pairs.map((pair, i) => (
            <BeforeAfterCard key={pair.label} pair={pair} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
