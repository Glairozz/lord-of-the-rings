'use client';

import { useEffect, useRef } from 'react';
import { Compass, Map as MapIcon } from 'lucide-react';

export default function WelcomeScreen({
  onStart,
  onExplore,
}: {
  onStart: () => void;
  onExplore: () => void;
}) {
  const startRef = useRef<HTMLButtonElement>(null);

  // Move focus onto the primary action so keyboard users land inside the card.
  useEffect(() => {
    startRef.current?.focus();
  }, []);

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center overflow-y-auto bg-night px-5 py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-title"
      aria-describedby="welcome-intro"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 30%, rgba(200,162,74,0.14) 0%, transparent 44%), radial-gradient(circle at 50% 120%, rgba(63,125,90,0.14) 0%, transparent 55%)',
        }}
      />

      <div className="panel relative w-full max-w-xl p-8 text-center sm:p-10">
        <p className="mb-4 font-display text-[10px] uppercase tracking-[0.42em] text-gold/80">
          Welcome, traveller
        </p>

        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10">
          <MapIcon size={24} className="text-gold-light" aria-hidden />
        </div>

        <h1 id="welcome-title" className="font-display text-3xl leading-tight text-parchment sm:text-4xl">
          The Legend of <span className="gold-text">Middle-earth</span>
        </h1>

        <div className="rule-gold mx-auto my-6 max-w-xs" />

        <p id="welcome-intro" className="mx-auto max-w-md text-sm leading-relaxed text-parchment-2 sm:text-base">
          An independent, source-referenced atlas and archive of Tolkien’s legendarium. Wander the
          map of the Westlands, open the places that catch your eye, and follow every claim back to
          the works it came from.
        </p>

        <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            ref={startRef}
            onClick={onStart}
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-display text-sm tracking-[0.12em] text-ink transition-colors hover:bg-gold-light"
          >
            <span aria-hidden className="text-ink/50">[</span>
            START YOUR JOURNEY
            <span aria-hidden className="text-ink/50">]</span>
          </button>
          <button
            type="button"
            onClick={onExplore}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border px-6 py-3 font-display text-sm tracking-[0.12em] text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
          >
            <Compass size={15} aria-hidden />
            <span aria-hidden className="text-mist">[</span>
            HOW TO EXPLORE
            <span aria-hidden className="text-mist">]</span>
          </button>
        </div>

        <p className="mt-6 text-xs text-mist">
          You can reopen this guide any time with the “How to explore” button.
        </p>
      </div>
    </div>
  );
}
