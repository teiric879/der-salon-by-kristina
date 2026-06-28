'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Star } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import TiltCard from '@/components/motion/TiltCard';
import { reviews, reviewsRating } from '@/content/reviews';

/* Splits quote text and bolds the highlight substring. */
function HighlightedQuote({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight) return <>{text}</>;
  const idx = text.indexOf(highlight);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-semibold text-ink">{highlight}</strong>
      {text.slice(idx + highlight.length)}
    </>
  );
}

/* Subtle per-card height variation for an editorial, non-masonry rhythm. */
const cardPaddings = ['pb-7', 'pb-5', 'pb-9', 'pb-6', 'pb-8'];

export default function Reviews() {
  const reduce = useReducedMotion();
  return (
    <section className="section bg-surface/40 py-24 lg:py-32">
      <div className="wrap">
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Echte Kundenstimmen"
            title="Schönes Haar spricht für sich. *Unsere* *Kundinnen* *auch.*"
          />

          {/* Rating badge — 5.0 prominent */}
          <motion.div
            className="flex shrink-0 items-center gap-4"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const full = i < Math.floor(reviewsRating.value);
                const half = !full && i < reviewsRating.value;
                return (
                  <motion.span
                    key={i}
                    initial={reduce ? undefined : { scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 380, damping: 14, delay: i * 0.07 }}
                    className="relative"
                  >
                    {/* base: empty star outline */}
                    <Star className="h-5 w-5 fill-transparent text-gold" />
                    {/* overlay: full or half fill */}
                    {(full || half) && (
                      <span
                        className="absolute inset-0 overflow-hidden"
                        style={{ width: full ? '100%' : '50%' }}
                      >
                        <Star className="h-5 w-5 fill-gold text-gold" />
                      </span>
                    )}
                  </motion.span>
                );
              })}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[2.4rem] leading-none text-ink">
                {reviewsRating.value.toFixed(1).replace('.', ',')}
              </span>
              <span className="text-[0.85rem] text-ink-soft">{reviewsRating.label}</span>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 gap-5 sm:columns-2 lg:columns-3">
          {reviews.map((r, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8%' }}
              transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="mb-5 break-inside-avoid"
            >
              <TiltCard max={4} className="group perspective block">
                <div
                  className={`card-surface preserve-3d relative flex flex-col p-7 ${cardPaddings[i]} transition-[border-color,box-shadow] duration-300 ease-smooth group-hover:border-gold/40 group-hover:shadow-[0_34px_70px_-36px_rgba(122,84,28,0.30)]`}
                >
                  {/* Editorial serif quotation mark */}
                  <span
                    aria-hidden
                    className="font-display text-[3.4rem] leading-[0.5] text-gold/30 transition-colors duration-300 ease-smooth group-hover:text-gold-deep/55"
                  >
                    &ldquo;
                  </span>
                  <blockquote className="mt-5 flex-1 text-[0.96rem] leading-[1.72] text-ink/80">
                    <HighlightedQuote text={r.quote} highlight={r.highlight} />
                  </blockquote>
                  <figcaption className="mt-6 flex items-end justify-between gap-3 border-t border-line pt-5">
                    <div>
                      <p className="relative inline-block font-display text-[1.05rem] leading-tight text-ink">
                        {r.author}
                        <span
                          aria-hidden
                          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-gold-deep transition-transform duration-300 ease-smooth group-hover:scale-x-100"
                        />
                      </p>
                      <p className="mt-1 text-[0.7rem] uppercase tracking-widest2 text-stone">
                        Google Rezension
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-0.5 pb-0.5">
                      {Array.from({ length: r.stars }).map((_, si) => (
                        <Star key={si} className="h-3 w-3 fill-gold text-gold" />
                      ))}
                    </div>
                  </figcaption>
                </div>
              </TiltCard>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
