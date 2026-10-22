'use client';

import { useMemo, useState, type ReactNode } from 'react';
import { Filter, RotateCcw, Search } from 'lucide-react';
import type { CharacterDirectoryItem } from '@/lib/characters';
import { characterGroups } from '@/data/character-groups';
import CharacterCard from './CharacterCard';
import EmptyState from '@/components/ui/EmptyState';

type SortMode = 'race' | 'az' | 'za';

const sortLabels: Record<SortMode, string> = {
  race: 'Race & creature',
  az: 'Name (A–Z)',
  za: 'Name (Z–A)',
};

const controlClass =
  'h-10 w-full rounded-lg border border-border bg-night px-3 text-sm text-parchment placeholder:text-mist focus:border-gold focus:outline-none sm:w-auto';

function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">{label}</span>
      {children}
    </label>
  );
}

export default function CharacterDirectory({
  items,
  initialQuery = '',
  initialFilters = {},
}: {
  items: CharacterDirectoryItem[];
  initialQuery?: string;
  initialFilters?: Record<string, string>;
}) {
  const [query, setQuery] = useState(initialQuery);
  const [selected, setSelected] = useState<Record<string, string>>(initialFilters);
  const [sort, setSort] = useState<SortMode>('race');
  const [showFilters, setShowFilters] = useState(false);

  const raceOptions = useMemo(
    () => characterGroups.map((g) => ({ value: g.id, label: g.shortLabel })),
    [],
  );
  const peopleOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.people && set.add(i.people));
    return Array.from(set)
      .sort()
      .map((v) => ({ value: v, label: v }));
  }, [items]);
  const affiliationOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.affiliation && set.add(i.affiliation));
    return Array.from(set)
      .sort()
      .map((v) => ({ value: v, label: v }));
  }, [items]);
  const roleOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.roles.forEach((r) => set.add(r)));
    return Array.from(set)
      .sort()
      .map((v) => ({ value: v, label: v }));
  }, [items]);
  const continuityOptions = useMemo(() => {
    const set = new Set<string>();
    items.forEach((i) => i.continuityLabel && set.add(i.continuityLabel));
    return Array.from(set)
      .sort()
      .map((v) => ({ value: v, label: v }));
  }, [items]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const results = items.filter((item) => {
      if (selected.race && !item.groupIds.includes(selected.race)) return false;
      if (selected.people && item.people !== selected.people) return false;
      if (selected.affiliation && item.affiliation !== selected.affiliation) return false;
      if (selected.role && !item.roles.includes(selected.role as never)) return false;
      if (selected.continuity && item.continuityLabel !== selected.continuity) return false;
      if (!q) return true;
      const haystack = `${item.name} ${item.summary} ${item.keywords ?? ''}`.toLowerCase();
      return q.split(/\s+/).every((token) => haystack.includes(token));
    });

    if (sort === 'az') results.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === 'za') results.sort((a, b) => b.name.localeCompare(a.name));
    return results;
  }, [items, query, selected, sort]);

  const groups = useMemo(() => {
    if (sort !== 'race') return null;
    const map = new Map<string, CharacterDirectoryItem[]>();
    for (const item of filtered) {
      const key = item.groupId || 'other';
      const list = map.get(key);
      if (list) list.push(item);
      else map.set(key, [item]);
    }
    const keys = characterGroups
      .map((g) => g.id)
      .filter((k) => map.has(k))
      .concat([...map.keys()].filter((k) => !characterGroups.some((g) => g.id === k)));
    return keys.map((key) => ({
      key,
      label: characterGroups.find((g) => g.id === key)?.label ?? 'Other Peoples',
      items: map.get(key) ?? [],
    }));
  }, [filtered, sort]);

  const hasFilters = query.trim() !== '' || Object.keys(selected).length > 0;

  function update(key: string, value: string) {
    setSelected((prev) => {
      const next = { ...prev };
      if (!value) delete next[key];
      else next[key] = value;
      return next;
    });
  }

  function clearAll() {
    setQuery('');
    setSelected({});
  }

  return (
    <div>
      <div className="mb-8 rounded-xl border border-border bg-night-2/40 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search characters</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search characters, races, or legends..."
              className="h-10 w-full rounded-lg border border-border bg-night pl-9 pr-3 text-sm text-parchment placeholder:text-mist focus:border-gold focus:outline-none"
            />
          </label>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
          >
            <Filter size={16} />
            Filters
          </button>
        </div>

        {(showFilters || hasFilters) && (
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end">
            <FilterField label="Organise by">
              <select value={sort} onChange={(e) => setSort(e.target.value as SortMode)} className={controlClass}>
                {(Object.keys(sortLabels) as SortMode[]).map((mode) => (
                  <option key={mode} value={mode}>
                    {sortLabels[mode]}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Race">
              <select value={selected.race ?? ''} onChange={(e) => update('race', e.target.value)} className={controlClass}>
                <option value="">All</option>
                {raceOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="People">
              <select value={selected.people ?? ''} onChange={(e) => update('people', e.target.value)} className={controlClass}>
                <option value="">All</option>
                {peopleOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Allegiance">
              <select value={selected.affiliation ?? ''} onChange={(e) => update('affiliation', e.target.value)} className={controlClass}>
                <option value="">All</option>
                {affiliationOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Role">
              <select value={selected.role ?? ''} onChange={(e) => update('role', e.target.value)} className={controlClass}>
                <option value="">All</option>
                {roleOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Continuity">
              <select value={selected.continuity ?? ''} onChange={(e) => update('continuity', e.target.value)} className={controlClass}>
                <option value="">All</option>
                {continuityOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
          <p className="text-xs text-mist" aria-live="polite">
            {filtered.length} {filtered.length === 1 ? 'figure' : 'figures'}
            {hasFilters ? ' match your filters' : ''}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No characters found"
          message="Try adjusting your search or filters to reveal more figures from Middle-earth."
        />
      ) : groups ? (
        <div>
          {groups.map((group) => (
            <section key={group.key} className="mb-10 last:mb-0">
              <div className="mb-4 flex items-baseline gap-3 border-b border-border pb-2">
                <h3 className="font-display text-sm uppercase tracking-[0.22em] text-gold">{group.label}</h3>
                <span className="text-xs text-mist">
                  {group.items.length} {group.items.length === 1 ? 'figure' : 'figures'}
                </span>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {group.items.map((item) => (
                  <CharacterCard key={item.id} item={item} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((item) => (
            <CharacterCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
