'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import CookieConsent from '@/components/CookieConsent';

export type ConsentCategory = 'maps' | 'booking';

export type ConsentState = {
  necessary: true;
  maps: boolean;
  booking: boolean;
};

const DEFAULT: ConsentState = { necessary: true, maps: false, booking: false };
const STORAGE_KEY = 'ds_consent_v1';

type Ctx = {
  /** current consent flags */
  consent: ConsentState;
  /** hydrated from storage yet? (avoids SSR flash) */
  ready: boolean;
  /** user has made an explicit choice → banner hidden */
  decided: boolean;
  /** check a single category */
  has: (c: ConsentCategory) => boolean;
  /** accept every category */
  acceptAll: () => void;
  /** decline all non-essential */
  rejectAll: () => void;
  /** persist a granular selection */
  save: (partial: Partial<Pick<ConsentState, 'maps' | 'booking'>>) => void;
  /** grant one category inline (e.g. "Karte laden") */
  grant: (c: ConsentCategory) => void;
  /** re-open the settings dialog */
  openSettings: () => void;
  settingsOpen: boolean;
  setSettingsOpen: (b: boolean) => void;
};

const ConsentContext = createContext<Ctx | null>(null);

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error('useConsent must be used within ConsentProvider');
  return ctx;
}

export default function ConsentProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [consent, setConsent] = useState<ConsentState>(DEFAULT);
  const [decided, setDecided] = useState(false);
  const [ready, setReady] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // hydrate from storage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setConsent({
          necessary: true,
          maps: !!parsed.maps,
          booking: !!parsed.booking,
        });
        setDecided(true);
      }
    } catch {}
    setReady(true);
  }, []);

  const persist = useCallback((next: ConsentState) => {
    setConsent(next);
    setDecided(true);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ...next, v: 1, ts: Date.now() }),
      );
    } catch {}
  }, []);

  const acceptAll = useCallback(() => {
    persist({ necessary: true, maps: true, booking: true });
    setSettingsOpen(false);
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist({ necessary: true, maps: false, booking: false });
    setSettingsOpen(false);
  }, [persist]);

  const save = useCallback(
    (partial: Partial<Pick<ConsentState, 'maps' | 'booking'>>) => {
      persist({ ...consent, necessary: true, ...partial });
      setSettingsOpen(false);
    },
    [persist, consent],
  );

  const grant = useCallback(
    (c: ConsentCategory) => {
      persist({ ...consent, necessary: true, [c]: true });
    },
    [persist, consent],
  );

  const has = useCallback((c: ConsentCategory) => consent[c], [consent]);
  const openSettings = useCallback(() => setSettingsOpen(true), []);

  return (
    <ConsentContext.Provider
      value={{
        consent,
        ready,
        decided,
        has,
        acceptAll,
        rejectAll,
        save,
        grant,
        openSettings,
        settingsOpen,
        setSettingsOpen,
      }}
    >
      {children}
      <CookieConsent />
    </ConsentContext.Provider>
  );
}
