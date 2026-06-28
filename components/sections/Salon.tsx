'use client';

import { Coffee, HeartHandshake, Leaf, Wind, AirVent, SquareParking } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SalonSlider from '@/components/SalonSlider';
import { experience } from '@/content/services';
import { salonSlides } from '@/content/gallery';

const icons = [HeartHandshake, Leaf, Wind, Coffee, AirVent, SquareParking];

export default function Salon() {
  return (
    <section id="salon" className="section relative py-24 lg:py-32">
      <div className="wrap grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* image column */}
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[24px] border border-line">
            <SalonSlider images={salonSlides} />
          </div>
        </div>

        {/* copy column */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="Mehr als ein Friseurbesuch"
            title="Ein Termin, auf den du dich schon beim Verlassen wieder *freust.*"
            intro="Die schönsten Ergebnisse entstehen nicht zufällig. Sie beginnen mit einem Gespräch. Deshalb nehmen wir uns Zeit, hören genau zu und entwickeln gemeinsam deinen Look. Denn erst wenn wir verstehen, was dir wichtig ist, entsteht ein Ergebnis, mit dem du dich rundum wohlfühlst."
          />

          <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            {experience.map((e, i) => {
              const Icon = icons[i % icons.length];
              return (
                <Reveal key={e.title} delay={i * 0.08}>
                  <div className="flex gap-4">
                    <span className="mt-0.5 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gold/10 text-gold-deep">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg text-ink">{e.title}</h3>
                      <p className="mt-1 text-[0.92rem] leading-snug text-ink-soft">{e.desc}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
