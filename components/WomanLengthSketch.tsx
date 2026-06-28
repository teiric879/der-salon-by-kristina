'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/* Editorial length guide — the salon's own hand-drawn sketch.
   M = Schulterlänge, L = Brustlänge (labels are part of the artwork). */
export default function WomanLengthSketch() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="w-full max-w-[360px]"
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/images/skizze.png"
        alt="Längen-Guide: M entspricht Schulterlänge, L entspricht Brustlänge"
        width={1122}
        height={1402}
        sizes="(max-width: 768px) 80vw, 360px"
        className="h-auto w-full"
        priority={false}
      />
    </motion.div>
  );
}
