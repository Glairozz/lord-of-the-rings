'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function CharactersError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-16">
      <div className="panel-soft px-6 py-14 text-center">
        <AlertTriangle size={28} className="mx-auto text-gold" aria-hidden />
        <h1 className="mt-4 font-display text-2xl text-parchment">The archive could not be opened</h1>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-mist">
          Something interrupted the character records. The rest of Middle-earth is still waiting —
          try again, or return to the character archive.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => unstable_retry()}
            className="inline-flex items-center gap-2 rounded-lg border border-gold/50 px-4 py-2 text-sm text-gold-light transition-colors hover:bg-gold/10"
          >
            <RotateCcw size={14} />
            Try again
          </button>
          <Link
            href="/characters"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
          >
            Back to characters
          </Link>
        </div>
      </div>
    </div>
  );
}
