'use client';

import { useEffect, useRef, useState } from 'react';
import { preloadAssets, preloadImage, prefersReducedMotion } from '@/lib/experience';

/** How long the ring is shown at minimum, so the reveal feels intentional. */
const MIN_DURATION_MS = 1500;
const MIN_DURATION_REDUCED_MS = 350;
/** A hard ceiling: the journey must never hang waiting on an asset. */
const MAX_DURATION_MS = 8000;
/** After this long, offer a manual "continue" escape hatch. */
const ESCAPE_HATCH_MS = 4200;

const RUNES = ['ᚠ', 'ᚢ', 'ᚦ', 'ᚨ', 'ᚱ', 'ᚲ', 'ᚷ', 'ᚹ', 'ᚺ', 'ᚾ', 'ᛁ', 'ᛃ'];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [showEscape, setShowEscape] = useState(false);
  const completed = useRef(false);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    const minDuration = reduced ? MIN_DURATION_REDUCED_MS : MIN_DURATION_MS;
    const start = Date.now();
    let cancelled = false;

    const finish = () => {
      if (cancelled || completed.current) return;
      completed.current = true;
      const elapsed = Date.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      window.setTimeout(() => {
        if (!cancelled) onComplete();
      }, wait);
    };

    let loaded = 0;
    const total = preloadAssets.length || 1;
    preloadAssets.forEach((src) => {
      void preloadImage(src).then(() => {
        loaded += 1;
        if (!cancelled) setProgress(Math.min(loaded / total, 1));
      });
    });

    const all = Promise.all(preloadAssets.map((src) => preloadImage(src)));
    const ceiling = new Promise<void>((resolve) => window.setTimeout(resolve, MAX_DURATION_MS));
    void Promise.race([all, ceiling]).then(finish);

    const escape = window.setTimeout(() => {
      if (!cancelled) setShowEscape(true);
    }, ESCAPE_HATCH_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(escape);
    };
  }, [onComplete]);

  const percent = Math.round(progress * 100);

  return (
    <div
      className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-night px-6 text-center"
      role="status"
      aria-live="polite"
      aria-label="Preparing the journey through Middle-earth"
    >
      {/* Ambient light */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          backgroundImage:
            'radial-gradient(circle at 50% 42%, rgba(200,162,74,0.16) 0%, transparent 46%), radial-gradient(circle at 50% 120%, rgba(63,125,90,0.14) 0%, transparent 55%)',
        }}
      />

      <div className="relative flex flex-col items-center">
        {/* The Ring */}
        <div className="relative mb-10 h-44 w-44 sm:h-52 sm:w-52">
          <svg viewBox="0 0 240 240" className="h-full w-full" aria-hidden>
            <defs>
              <linearGradient id="lome-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e7c877" />
                <stop offset="50%" stopColor="#c8a24a" />
                <stop offset="100%" stopColor="#9c6b2f" />
              </linearGradient>
            </defs>

            {/* Outer rune band */}
            <g className="lome-ring-spin-slow">
              {RUNES.map((rune, i) => (
                <text
                  key={i}
                  x="120"
                  y="18"
                  textAnchor="middle"
                  fontSize="15"
                  fill="#c8a24a"
                  opacity="0.75"
                  transform={`rotate(${(360 / RUNES.length) * i} 120 120)`}
                >
                  {rune}
                </text>
              ))}
            </g>

            {/* Static tick ring */}
            <circle
              cx="120"
              cy="120"
              r="92"
              fill="none"
              stroke="#2b4033"
              strokeWidth="1"
              strokeDasharray="2 6"
            />

            {/* The golden Ring, drawn in as loading proceeds */}
            <circle
              cx="120"
              cy="120"
              r="70"
              fill="none"
              stroke="url(#lome-ring)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 70}
              strokeDashoffset={2 * Math.PI * 70 * (1 - Math.max(progress, 0.06))}
              transform="rotate(-90 120 120)"
              className="lome-ring-progress"
            />

            {/* Inner glow */}
            <circle cx="120" cy="120" r="52" fill="none" stroke="#c8a24a" strokeOpacity="0.18" strokeWidth="1" />
            <circle cx="120" cy="120" r="6" fill="#e7c877" className="lome-ring-pulse" />
          </svg>
        </div>

        <p className="mb-3 font-display text-[10px] uppercase tracking-[0.45em] text-gold/80">
          A living atlas &amp; archive
        </p>
        <h1 className="font-display text-2xl leading-tight tracking-[0.14em] text-parchment sm:text-4xl">
          THE LEGEND OF <span className="gold-text">MIDDLE-EARTH</span>
        </h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-parchment-2 sm:text-base">
          Preparing the journey through Middle-earth…
        </p>

        {/* Progress */}
        <div className="mt-8 w-64 max-w-full">
          <div
            className="h-1 w-full overflow-hidden rounded-full bg-night-3"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={percent}
            aria-label="Loading progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-bronze via-gold to-gold-light transition-[width] duration-500 ease-out"
              style={{ width: `${Math.max(percent, 4)}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-mist">{percent}% ready</p>
        </div>

        {showEscape && (
          <button
            type="button"
            onClick={onComplete}
            className="mt-6 rounded-full border border-border px-4 py-1.5 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
          >
            Continue anyway
          </button>
        )}
      </div>
    </div>
  );
}
