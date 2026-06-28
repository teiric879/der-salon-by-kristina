'use client';

import Image from 'next/image';

/* All available work images (split across the two rows). */
const allWorks = [
  '/laufleiste/work-1.jpg',
  '/laufleiste/work-2.jpg',
  '/laufleiste/work-3.jpg',
  '/laufleiste/work-4.jpg',
  '/laufleiste/work-5.jpg',
  '/laufleiste/work-6.jpg',
  '/laufleiste/work-7.jpg',
  '/laufleiste/work-8.jpg',
];

const rowTop = allWorks.slice(0, 4);
const rowBottom = allWorks.slice(4, 8);

function Tile({ src, idx }: { src: string; idx: number }) {
  return (
    <div className="group/tile relative h-28 w-24 shrink-0 overflow-hidden rounded-[14px] border border-line bg-surface transition-[transform,box-shadow,z-index] duration-500 ease-smooth will-change-transform hover:z-30 hover:scale-[1.18] hover:shadow-[0_24px_50px_-18px_rgba(122,84,28,0.45)] sm:h-32 sm:w-28 lg:h-36 lg:w-32">
      <Image
        src={src}
        alt={`Arbeit aus unserem Salon ${idx + 1}`}
        fill
        sizes="128px"
        className="object-cover transition-transform duration-700 ease-smooth group-hover/tile:scale-[1.08]"
      />
      <div className="pointer-events-none absolute inset-0 bg-noir/10 opacity-100 transition-opacity duration-500 group-hover/tile:opacity-0" />
    </div>
  );
}

/* One marquee row. `reverse` flips the scroll direction. */
function Row({
  items,
  reverse = false,
}: {
  items: string[];
  reverse?: boolean;
}) {
  // Duplicate the set so the loop is seamless.
  const loop = [...items, ...items, ...items, ...items];
  return (
    <div className="group/row relative overflow-hidden">
      <div
        className={`flex w-max gap-4 ${reverse ? 'animate-marquee-reverse' : 'animate-marquee'} group-hover/row:[animation-play-state:paused]`}
      >
        {loop.map((src, i) => (
          <Tile key={`${src}-${i}`} src={src} idx={i % items.length} />
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <div
      className="relative flex flex-col gap-4"
      aria-label="Weitere Arbeiten aus unserem Salon"
    >
      {/* edge fades for an expensive, framed feel */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-canvas to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-canvas to-transparent sm:w-24" />

      <Row items={rowTop} reverse />
      <Row items={rowBottom} />
    </div>
  );
}
