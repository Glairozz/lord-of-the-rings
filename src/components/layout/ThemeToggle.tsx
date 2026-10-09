'use client';

import { useSyncExternalStore } from 'react';
import { Moon, Sun } from 'lucide-react';

const LIGHT = 'light' as const;
const DARK = 'dark' as const;
type Theme = typeof LIGHT | typeof DARK;

/** Reads the theme authorities: the <html data-theme> attribute (set by the
 * bootstrapping script in the root layout) and localStorage. */
function readTheme(): Theme {
  if (typeof document === 'undefined') return DARK;
  return document.documentElement.getAttribute('data-theme') === LIGHT ? LIGHT : DARK;
}

function subscribe(callback: () => void): () => void {
  window.addEventListener('lome-theme', callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener('lome-theme', callback);
    window.removeEventListener('storage', callback);
  };
}

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useSyncExternalStore(subscribe, readTheme, () => DARK);

  function toggle() {
    const next: Theme = readTheme() === DARK ? LIGHT : DARK;
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('lome-theme', next);
    } catch {
      /* ignore storage failures */
    }
    window.dispatchEvent(new Event('lome-theme'));
  }

  const label = theme === DARK ? 'Switch to reading mode' : 'Switch to dark mode';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-parchment-2 transition-colors hover:border-gold hover:text-gold-light ${className}`}
    >
      {theme === DARK ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}