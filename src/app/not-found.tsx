import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="panel-soft max-w-xl px-8 py-14 text-center">
        <p className="font-display text-7xl text-gold" aria-hidden>
          404
        </p>
        <h1 className="mt-4 font-display text-3xl text-parchment">That page lies unrecorded</h1>
        <div className="rule-gold mx-auto my-6 max-w-xs" />
        <p className="mx-auto max-w-md text-sm leading-relaxed text-mist">
          The chronicles hold no entry for this address. It may have been moved, renamed, or simply
          never written. Return to the archive, keep to the map, or search the lore.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 font-display text-sm text-ink transition-colors hover:bg-gold-light"
          >
            Return home
          </Link>
          <Link
            href="/atlas"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-display text-sm text-parchment transition-colors hover:border-gold hover:text-gold-light"
          >
            Enter the Atlas
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-display text-sm text-parchment transition-colors hover:border-gold hover:text-gold-light"
          >
            Search the archive
          </Link>
        </div>
      </div>
    </div>
  );
}