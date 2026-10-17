'use client';

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Compass,
  Flag,
  Map as MapIcon,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { markTutorialComplete, tutorialSteps, type TutorialIcon } from '@/lib/experience';

const icons: Record<TutorialIcon, React.ComponentType<{ size?: number; className?: string }>> = {
  map: MapIcon,
  compass: Compass,
  search: Search,
  book: BookOpen,
  sliders: SlidersHorizontal,
  flag: Flag,
};

export default function TutorialDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const last = tutorialSteps.length - 1;

  const current = tutorialSteps[step];
  const Icon = icons[current.icon];

  function finish() {
    markTutorialComplete();
    onClose();
  }

  function next() {
    if (step < last) setStep((s) => s + 1);
    else finish();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setStep((s) => Math.max(0, s - 1));
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={(v) => (v ? undefined : onClose())}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[130] bg-black/75 backdrop-blur-sm" />
        <Dialog.Content
          onKeyDown={onKeyDown}
          className="fixed left-1/2 top-1/2 z-[140] flex max-h-[90vh] w-[94vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-2xl focus:outline-none"
        >
          <Dialog.Title className="sr-only">How to explore the atlas</Dialog.Title>
          <Dialog.Description className="sr-only">
            A six-step introduction to the map, its places and its controls.
          </Dialog.Description>

          {/* Header */}
          <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
            <p className="font-display text-xs uppercase tracking-[0.3em] text-gold">How to explore</p>
            <button
              type="button"
              onClick={finish}
              aria-label="Close guide"
              className="flex h-8 w-8 items-center justify-center rounded-full text-mist transition-colors hover:text-parchment"
            >
              <X size={18} aria-hidden />
            </button>
          </div>

          {/* Progress rail */}
          <div className="flex items-center gap-1.5 px-5 pt-4" aria-hidden>
            {tutorialSteps.map((s, i) => (
              <span
                key={s.id}
                className={`h-1 flex-1 rounded-full transition-colors ${
                  i <= step ? 'bg-gold' : 'bg-night-3'
                }`}
              />
            ))}
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-7">
            <div className="flex items-start gap-4">
              <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold-light">
                <Icon size={20} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="font-display text-[11px] uppercase tracking-[0.28em] text-mist">
                  Step {step + 1} of {tutorialSteps.length}
                </p>
                <h2 className="mt-1.5 font-display text-xl text-parchment sm:text-2xl">
                  {current.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-parchment-2 sm:text-base">
                  {current.body}
                </p>
                {current.tip && (
                  <p className="mt-4 flex gap-2 rounded-lg border border-border/70 bg-night-2/50 px-3.5 py-2.5 text-xs leading-relaxed text-mist">
                    <span aria-hidden className="text-gold">✦</span>
                    <span>{current.tip}</span>
                  </p>
                )}
              </div>
            </div>

            <ol className="mt-7 flex flex-wrap gap-x-3 gap-y-1.5 text-[11px] text-mist" aria-hidden>
              {tutorialSteps.map((s, i) => (
                <li
                  key={s.id}
                  className={i === step ? 'font-medium text-gold-light' : undefined}
                >
                  {i + 1}. {s.label}
                </li>
              ))}
            </ol>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border px-5 py-4">
            <button
              type="button"
              onClick={finish}
              className="text-xs text-mist underline-offset-2 transition-colors hover:text-parchment-2 hover:underline"
            >
              Skip guide
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-border disabled:hover:text-parchment-2"
              >
                <ArrowLeft size={15} aria-hidden />
                Back
              </button>
              {step < last ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2 font-display text-sm text-ink transition-colors hover:bg-gold-light"
                >
                  Next
                  <ArrowRight size={15} aria-hidden />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={finish}
                  className="inline-flex items-center gap-1.5 rounded-full bg-gold px-5 py-2 font-display text-[13px] tracking-[0.08em] text-ink transition-colors hover:bg-gold-light"
                >
                  <span aria-hidden className="text-ink/50">[</span>
                  ENTER MIDDLE-EARTH
                  <span aria-hidden className="text-ink/50">]</span>
                </button>
              )}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
