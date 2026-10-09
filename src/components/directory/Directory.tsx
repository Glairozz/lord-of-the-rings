'use client';

import { useMemo, useState } from 'react';
import type { EntityRef } from '@/lib/content';
import EntityCard from '@/components/ui/EntityCard';
import EmptyState from '@/components/ui/EmptyState';

export interface DirectoryItem extends EntityRef {
  /** Precomputed facet values, e.g. { race: 'Hobbits', continuity: 'Tolkien\u2019s texts' } */
  facets: Record<string, string>;
  /** Extra text to make searchable (aliases, titles). */
  keywords?: string;
}

export interface FacetDef {
  key: string;
  label: string;
  options?: { value: string; label: string }[];
}

export default function Directory({
  items,
  facets = [],
  pageSize = 12,
  searchPlaceholder = 'Search by name…',
}: {
  items: DirectoryItem[];
  facets?: FacetDef[];
  pageSize?: number;
  searchPlaceholder?: string;
}) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [sort, setSort] = useState<'name' | 'name-desc'>('name');
  const [page, setPage] = useState(1);

  const facetDefs = useMemo(
    () =>
      facets.map((f) => ({
        ...f,
        options:
          f.options ??
          Array.from(new Set(items.map((i) => i.facets[f.key]).filter(Boolean)))
            .sort()
            .map((v) => ({ value: v, label: v })),
      })),
    [facets, items],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const results = items.filter((item) => {
      for (const f of facetDefs) {
        const value = selected[f.key];
        if (value && item.facets[f.key] !== value) return false;
      }
      if (!q) return true;
      const haystack = `${item.name} ${item.summary} ${item.keywords ?? ''}`.toLowerCase();
      return q.split(/\s+/).every((token) => haystack.includes(token));
    });
    results.sort((a, b) => (sort === 'name' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)));
    return results;
  }, [items, facetDefs, selected, query, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const current = Math.min(page, totalPages);
  const pageItems = filtered.slice((current - 1) * pageSize, current * pageSize);

  function updateFacet(key: string, value: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (!value) delete next[key];
      else next[key] = value;
      return next;
    });
    setPage(1);
  }

  const hasFilters = query.trim() !== '' || Object.keys(selected).length > 0;

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-night-2/40 p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search directory</span>
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder={searchPlaceholder}
              className="w-full rounded-lg border border-border bg-night px-4 py-2.5 text-sm text-parchment placeholder:text-mist focus:border-gold focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-mist">
            <span className="shrink-0">Sort</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as 'name' | 'name-desc')}
              className="rounded-lg border border-border bg-night px-3 py-2.5 text-sm text-parchment focus:border-gold focus:outline-none"
            >
              <option value="name">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
            </select>
          </label>
        </div>

        {facetDefs.length > 0 && (
          <div className="flex flex-wrap gap-3">
            {facetDefs.map((f) => (
              <label key={f.key} className="flex items-center gap-2 text-xs text-mist">
                <span className="uppercase tracking-wider text-gold">{f.label}</span>
                <select
                  value={selected[f.key] ?? ''}
                  onChange={(e) => updateFacet(f.key, e.target.value)}
                  className="rounded-lg border border-border bg-night px-3 py-2 text-sm text-parchment focus:border-gold focus:outline-none"
                >
                  <option value="">All</option>
                  {f.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              </label>
            ))}
            {hasFilters && (
              <button
                type="button"
                onClick={() => {
                  setQuery('');
                  setSelected({});
                  setPage(1);
                }}
                className="rounded-lg border border-border px-3 py-2 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
              >
                Clear filters
              </button>
            )}
          </div>
        )}

        <p className="text-xs text-mist" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'entry' : 'entries'}
          {hasFilters ? ' match your filters' : ''}
        </p>
      </div>

      {pageItems.length === 0 ? (
        <EmptyState
          title="No entries found"
          message="Try a different spelling, or clear the filters to see the full directory."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((item, i) => (
            <EntityCard key={`${item.type}-${item.id}`} entity={item} priority={i < 4} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-2">
          <button
            type="button"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={current === 1}
            className="rounded-lg border border-border px-3 py-2 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light disabled:opacity-40"
          >
            Previous
          </button>
          <span className="px-3 text-sm text-mist">
            Page {current} of {totalPages}
          </span>
          <button
            type="button"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={current === totalPages}
            className="rounded-lg border border-border px-3 py-2 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light disabled:opacity-40"
          >
            Next
          </button>
        </nav>
      )}
    </div>
  );
}
