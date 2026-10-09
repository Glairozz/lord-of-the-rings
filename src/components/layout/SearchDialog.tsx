'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as Dialog from '@radix-ui/react-dialog';
import { Search, X } from 'lucide-react';
import type { SearchDoc } from '@/lib/search';

let cachedIndex: SearchDoc[] | null = null;

async function loadIndex(): Promise<SearchDoc[]> {
  if (cachedIndex) return cachedIndex;
  const mod = (await import('@/lib/search')) as unknown as { searchIndex: SearchDoc[] };
  cachedIndex = mod.searchIndex;
  return cachedIndex;
}

function rank(docs: SearchDoc[], query: string): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const tokens = q.split(/\s+/).filter(Boolean);
  const scored: { doc: SearchDoc; score: number }[] = [];
  for (const doc of docs) {
    const name = doc.name.toLowerCase();
    const aliases = doc.aliases.map((a) => a.toLowerCase());
    let score = 0;
    for (const token of tokens) {
      let t = 0;
      if (name === token) t += 100;
      else if (name.startsWith(token)) t += 70;
      else if (name.includes(token)) t += 45;
      for (const a of aliases) {
        if (a === token) t += 80;
        else if (a.startsWith(token)) t += 50;
        else if (a.includes(token)) t += 30;
      }
      if (doc.summary.toLowerCase().includes(token)) t += 10;
      if (doc.tags.some((tag) => tag.toLowerCase().includes(token))) t += 6;
      if (t === 0) {
        score = -1;
        break;
      }
      score += t;
    }
    if (score > 0) scored.push({ doc, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((s) => s.doc);
}

const typeLabel: Record<string, string> = {
  character: 'Character',
  location: 'Location',
  artifact: 'Artifact',
  event: 'History',
  book: 'Library',
  theme: 'Theme',
  people: 'People',
};

export default function SearchDialog() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchDoc[]>([]);
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = 'global-search-results';

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!open || ready) return;
    let cancelled = false;
    loadIndex().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [open, ready]);

  // Clear the previous search whenever the dialog closes. Moving this out of
  // an effect into the render phase is the React-recommended pattern; the
  // guard against a stale mirror stops an infinite loop.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) {
      setQuery('');
      setResults([]);
      setActive(0);
    }
  }

  // Drop stale results the moment the query becomes empty (or the index is
  // not ready yet). Same render-phase pattern as above.
  const filterKey = `${query}|${ready}`;
  const [lastFilterKey, setLastFilterKey] = useState(filterKey);
  if (lastFilterKey !== filterKey) {
    setLastFilterKey(filterKey);
    if (!ready || !query.trim()) {
      setResults([]);
      setActive(0);
    }
  }

  useEffect(() => {
    if (!ready || !query.trim()) return;
    let cancelled = false;
    const id = window.setTimeout(async () => {
      const docs = await loadIndex();
      if (!cancelled) {
        setResults(rank(docs, query));
        setActive(0);
      }
    }, 90);
    return () => {
      cancelled = true;
      window.clearTimeout(id);
    };
  }, [query, ready]);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router],
  );

  function submit() {
    const q = query.trim();
    if (!q) return;
    if (results[active]) go(results[active].href);
    else go(`/search?q=${encodeURIComponent(q)}`);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    }
  }

  const hint = useMemo(
    () => (ready ? 'Search characters, places, artifacts, history and books…' : 'Loading archive…'),
    [ready],
  );

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-3 py-1.5 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
          aria-label="Open search"
        >
          <Search size={15} />
          <span className="hidden lg:inline">Search</span>
          <kbd className="hidden lg:inline rounded border border-border px-1.5 py-0.5 text-[10px] text-mist">⌘K</kbd>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-black/70 backdrop-blur-sm data-[state=open]:animate-in" />
        <Dialog.Content className="fixed left-1/2 top-[12vh] z-[90] w-[94vw] max-w-2xl -translate-x-1/2 rounded-xl border border-border bg-surface shadow-2xl focus:outline-none">
          <Dialog.Title className="sr-only">Search the archive</Dialog.Title>
          <Dialog.Description className="sr-only">
            Search across characters, locations, artifacts, history, books, peoples and themes.
          </Dialog.Description>
          <div className="flex items-center gap-3 border-b border-border px-4">
            <Search size={18} className="text-gold" />
            <input
              ref={inputRef}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={onKeyDown}
              role="combobox"
              aria-expanded={results.length > 0}
              aria-controls={listboxId}
              aria-activedescendant={results[active] ? `search-opt-${results[active].id}` : undefined}
              placeholder={hint}
              className="w-full bg-transparent py-4 text-base text-parchment placeholder:text-mist focus:outline-none"
            />
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close search"
                className="rounded-full p-1 text-mist transition-colors hover:text-gold-light"
              >
                <X size={18} />
              </button>
            </Dialog.Close>
          </div>

          {query.trim() && (
            <ul id={listboxId} role="listbox" className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <li className="px-3 py-6 text-center text-sm text-mist">
                  No entries match “{query}”.{' '}
                  <button
                    type="button"
                    onClick={submit}
                    className="text-gold-light underline underline-offset-2"
                  >
                    Search all lore
                  </button>
                </li>
              )}
              {results.map((doc, i) => (
                <li key={`${doc.type}-${doc.id}`} role="none">
                  <button
                    type="button"
                    id={`search-opt-${doc.id}`}
                    role="option"
                    aria-selected={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(doc.href)}
                    className={`flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors ${
                      i === active ? 'bg-night-3' : 'hover:bg-night-2'
                    }`}
                  >
                    <span className="mt-0.5 inline-flex shrink-0 rounded-full border border-border px-2 py-0.5 text-[10px] uppercase tracking-wider text-gold">
                      {typeLabel[doc.type] ?? doc.type}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate font-display text-sm text-parchment">{doc.name}</span>
                      <span className="mt-0.5 block truncate text-xs text-mist">{doc.summary}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}

          {!query.trim() && (
            <div className="px-4 py-5 text-sm text-mist">
              <p className="mb-2 text-parchment-2">Try a name, an alternate name, or a place:</p>
              <div className="flex flex-wrap gap-2">
                {['Imladris', 'Isildur', 'The One Ring', 'Pelennor', 'Númenor', 'Pity and mercy'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="rounded-full border border-border px-3 py-1 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
