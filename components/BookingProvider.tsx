'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Calendar, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { site } from '@/content/site';
import { useConsent } from '@/components/ConsentProvider';

type Ctx = { open: () => void; close: () => void };
const BookingContext = createContext<Ctx>({ open: () => {}, close: () => {} });

export function useBooking() {
  return useContext(BookingContext);
}

export default function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const { has, grant } = useConsent();
  const consent = has('booking');

  const open = useCallback(() => setOpen(true), []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  function accept() {
    grant('booking');
  }

  return (
    <BookingContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-noir/55 backdrop-blur-[3px]"
              onClick={close}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Termin online buchen"
              className="relative z-10 flex h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[24px] bg-surface sm:h-[82vh] sm:rounded-[24px]"
              initial={{ y: 40, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="flex items-center justify-between border-b border-line px-5 py-4 sm:px-7">
                <div className="flex items-center gap-2.5">
                  <Calendar className="h-4 w-4 text-gold-deep" />
                  <span className="font-display text-lg">Termin buchen</span>
                </div>
                <button
                  onClick={close}
                  aria-label="Schließen"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:bg-ink hover:text-canvas"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              {consent ? (
                <iframe
                  src={site.booking.url}
                  title="Online-Terminbuchung"
                  className="h-full w-full flex-1 border-0"
                  loading="lazy"
                />
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center px-6 py-10 text-center sm:px-12">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-gold/12 text-gold-deep">
                    <ShieldCheck className="h-6 w-6" />
                  </span>
                  <h3 className="display mt-6 text-2xl">Kurz dein Einverständnis</h3>
                  <p className="lead mt-3 max-w-md text-[0.98rem]">
                    Die Terminbuchung läuft über <strong>{site.booking.provider}</strong>. Dabei
                    werden Daten an den externen Anbieter übertragen. Mit dem Laden stimmst du der
                    Verarbeitung gemäß unserer{' '}
                    <a href="/datenschutz" className="link-gold">
                      Datenschutzerklärung
                    </a>{' '}
                    zu.
                  </p>
                  <div className="mt-7 flex flex-col items-center gap-3">
                    <button onClick={accept} className="btn btn-primary">
                      <span>Buchung laden &amp; fortfahren</span>
                    </button>
                    <a
                      href={site.booking.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-gold"
                    >
                      Stattdessen im neuen Tab öffnen <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </BookingContext.Provider>
  );
}
