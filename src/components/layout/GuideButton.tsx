'use client';

import { Compass } from 'lucide-react';
import { useExperienceGuide } from '@/components/experience/ExperienceProvider';

/** Reopen the "how to explore" guide from anywhere in the site. */
export default function GuideButton({ className = '' }: { className?: string }) {
  const { openGuide } = useExperienceGuide();

  return (
    <button
      type="button"
      onClick={openGuide}
      aria-label="How to explore this site"
      title="How to explore"
      className={`inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface/60 px-3 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light ${className}`}
    >
      <Compass size={15} aria-hidden />
      <span className="hidden xl:inline">How to explore</span>
    </button>
  );
}
