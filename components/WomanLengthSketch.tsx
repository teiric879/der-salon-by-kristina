'use client';

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';

/* Editorial length guide — the salon's own hand-drawn sketch.
   M = Schulterlänge, L = Brustlänge (labels are part of the artwork). */
export default function WomanLengthSketch() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="w-[360px] max-w-full shrink-0 sm:w-[410px] lg:w-[460px]"
      initial={{ opacity: 0, y: reduce ? 0 : 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-15%' }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <Image
        src="/images/skizze.png"
        alt="Längen-Guide: M entspricht Schulterlänge, L entspricht Brustlänge"
        width={1536}
        height={1024}
        sizes="(max-width: 768px) 88vw, 440px"
        className="h-auto w-full"
        priority={false}
      />
    </motion.div>
  );
}
