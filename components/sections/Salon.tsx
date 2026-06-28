'use client';

import Image from 'next/image';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/motion/Reveal';
import SalonSlider from '@/components/SalonSlider';
import { experience } from '@/content/services';
import { salonSlides } from '@/content/gallery';

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

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-px sm:grid-cols-2">
            {experience.map((e, i) => (
              <Reveal key={e.title} delay={i * 0.08}>
                <div className="group flex items-start gap-5 border-t border-line py-6 transition-colors duration-300 ease-smooth hover:border-gold/40">
                  <Image
                    src={`/images/perks/${e.icon}.png`}
                    alt=""
                    width={88}
                    height={88}
                    className="h-16 w-16 shrink-0 object-contain transition-transform duration-300 ease-smooth group-hover:scale-105"
                  />
                  <div className="min-w-0 pt-1">
                    <h3 className="font-display text-[1.18rem] leading-tight text-ink">{e.title}</h3>
                    <p className="mt-1.5 text-[0.72rem] uppercase leading-relaxed tracking-[0.13em] text-stone">
                      {e.desc}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
