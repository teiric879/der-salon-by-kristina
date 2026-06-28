'use client';

import { motion, useReducedMotion } from 'framer-motion';

type Props = {
  text?: string;
  className?: string;
};

/* Circular rotating "seal" — editorial signature element. */
export default function RotatingBadge({
  text = 'NO MORE BAD HAIR DAYS  ·  ',
  className,
}: Props) {
  const reduce = useReducedMotion();
  const chars = text.split('');
  return (
    <div className={`relative h-[112px] w-[112px] ${className ?? ''}`}>
      <motion.div
        className="absolute inset-0"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
      >
        <svg viewBox="0 0 120 120" className="h-full w-full">
          <defs>
            <path id="circlePath" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
          </defs>
          <text className="fill-ink-soft" style={{ fontSize: '9.2px', letterSpacing: '6.2px', fontFamily: 'var(--font-sans)', fontWeight: 500 }}>
            <textPath href="#circlePath">{chars.join('')}</textPath>
          </text>
        </svg>
      </motion.div>
      <div className="absolute inset-0 flex items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/logo.svg" alt="Der Salon by Kristina" className="w-[68px]" />
      </div>
    </div>
  );
}
