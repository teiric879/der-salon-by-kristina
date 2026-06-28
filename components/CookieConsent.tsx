'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Cookie, ShieldCheck, X, Check } from 'lucide-react';
import { useState } from 'react';
import { useConsent } from '@/components/ConsentProvider';

type Toggle = {
  key: 'maps' | 'booking';
  title: string;
  desc: string;
};

const toggles: Toggle[] = [
  {
    key: 'booking',
    title: 'Online-Terminbuchung',
    desc: 'Lädt das Buchungstool von Studiolution. Dabei werden Daten an den externen Anbieter übertragen.',
  },
  {
    key: 'maps',
    title: 'Karten',
    desc: 'Lädt Google Maps zur Anzeige unseres Standorts. Dabei werden Daten an Google übertragen.',
  },
];

function Switch({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300 ease-smooth ${
        checked ? 'border-gold-deep bg-gold-deep' : 'border-line bg-stone/20'
      }`}
    >
      <span
        className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-canvas shadow-sm transition-all duration-300 ease-smooth ${
          checked ? 'left-[22px]' : 'left-[3px]'
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const {
    ready,
    decided,
    consent,
    acceptAll,
    rejectAll,
    save,
    settingsOpen,
    setSettingsOpen,
  } = useConsent();

  // local draft for the settings dialog
  const [draft, setDraft] = useState({ maps: consent.maps, booking: consent.booking });

  // sync draft whenever the dialog opens
  function openSettingsLocal() {
    setDraft({ maps: consent.maps, booking: consent.booking });
    setSettingsOpen(true);
  }

  if (!ready) return null;

  const bannerVisible = !decided && !settingsOpen;

  return (
    <>
      {/* ---- Banner ---- */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-0 bottom-0 z-[1100] px-4 pb-4 sm:px-6 sm:pb-6"
            role="dialog"
            aria-label="Cookie-Hinweis"
            aria-live="polite"
          >
            <div className="mx-auto flex max-w-3xl flex-col gap-5 rounded-[22px] border border-line bg-surface/95 p-6 shadow-[0_30px_70px_-30px_rgba(26,22,20,0.55)] backdrop-blur-md sm:p-7 lg:flex-row lg:items-center lg:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-2.5">
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/12 text-gold-deep">
                    <Cookie className="h-[18px] w-[18px]" />
                  </span>
                  <h2 className="font-display text-xl text-ink">
                    Wir respektieren deine Privatsphäre
                  </h2>
                </div>
                <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-soft">
                  Wir verwenden nur technisch notwendige Cookies. Externe Dienste wie die
                  Online-Terminbuchung und Google Maps laden wir erst nach deiner Zustimmung.
                  Mehr dazu in unserer{' '}
                  <a href="/datenschutz" className="link-gold">
                    Datenschutzerklärung
                  </a>
                  {' '}und im{' '}
                  <a href="/impressum" className="link-gold">
                    Impressum
                  </a>
                  .
                </p>
              </div>

              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row sm:flex-wrap lg:w-auto lg:flex-col">
                <button onClick={acceptAll} className="btn btn-primary justify-center">
                  <span>Alle akzeptieren</span>
                </button>
                <button onClick={rejectAll} className="btn btn-outline justify-center">
                  <span>Nur notwendige</span>
                </button>
                <button
                  onClick={openSettingsLocal}
                  className="link-gold justify-center text-center sm:w-full"
                >
                  Einstellungen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ---- Settings dialog ---- */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            className="fixed inset-0 z-[1110] flex items-end justify-center sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-noir/55 backdrop-blur-[3px]"
              onClick={() => setSettingsOpen(false)}
              aria-hidden
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Datenschutz-Einstellungen"
              className="relative z-10 flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-t-[24px] bg-surface sm:rounded-[24px]"
              initial={{ y: 40, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <header className="flex items-center justify-between border-b border-line px-6 py-4">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck className="h-4 w-4 text-gold-deep" />
                  <span className="font-display text-lg">Datenschutz-Einstellungen</span>
                </div>
                <button
                  onClick={() => setSettingsOpen(false)}
                  aria-label="Schließen"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink-soft transition-colors hover:bg-ink hover:text-canvas"
                >
                  <X className="h-4 w-4" />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto px-6 py-5">
                <p className="text-[0.9rem] leading-relaxed text-ink-soft">
                  Entscheide selbst, welche Dienste geladen werden dürfen. Du kannst deine
                  Auswahl jederzeit über den Link „Cookie-Einstellungen“ im Footer ändern.
                </p>

                <ul className="mt-6 space-y-3">
                  {/* Necessary — always on */}
                  <li className="flex items-start gap-4 rounded-[16px] border border-line bg-canvas/40 p-4">
                    <span className="grid h-6 w-11 shrink-0 place-items-center rounded-full bg-gold-deep text-canvas">
                      <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                    </span>
                    <div>
                      <p className="font-display text-base text-ink">Notwendig</p>
                      <p className="mt-1 text-[0.82rem] leading-snug text-ink-soft">
                        Für den Betrieb der Website erforderlich. Diese Cookies sind immer aktiv
                        und speichern u. a. deine Datenschutz-Auswahl.
                      </p>
                    </div>
                  </li>

                  {toggles.map((t) => (
                    <li
                      key={t.key}
                      className="flex items-start gap-4 rounded-[16px] border border-line p-4"
                    >
                      <Switch
                        checked={draft[t.key]}
                        onChange={(v) => setDraft((d) => ({ ...d, [t.key]: v }))}
                        label={t.title}
                      />
                      <div>
                        <p className="font-display text-base text-ink">{t.title}</p>
                        <p className="mt-1 text-[0.82rem] leading-snug text-ink-soft">
                          {t.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <footer className="flex flex-col gap-2.5 border-t border-line px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  onClick={() => save(draft)}
                  className="btn btn-outline justify-center"
                >
                  <span>Auswahl speichern</span>
                </button>
                <button onClick={acceptAll} className="btn btn-primary justify-center">
                  <span>Alle akzeptieren</span>
                </button>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
