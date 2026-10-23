'use client';

import { useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Users,
  X,
} from 'lucide-react';
import type { CharacterDirectoryItem } from '@/lib/characters';
import { characterGroups } from '@/data/character-groups';
import CharacterCard from './CharacterCard';
import EmptyState from '@/components/ui/EmptyState';
import { getGroupIcon } from './groupIcons';

const controlClass =
  'h-10 w-full rounded-lg border border-border bg-night px-3 text-sm text-parchment placeholder:text-mist focus:border-gold focus:outline-none';

function FilterField({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="flex min-w-0 flex-col gap-1.5">
      <span className="font-display text-[11px] uppercase tracking-[0.18em] text-gold">{label}</span>
      {children}
    </label>
  );
}

function RaceButton({
  active,
  label,
  count,
  icon: Icon,
  onClick,
}: {
  active: boolean;
  label: string;
  count: number;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`group flex min-h-11 min-w-0 items-center gap-2 rounded-xl border px-3 py-2 text-left text-sm transition-colors ${
        active
          ? 'border-gold/70 bg-gold/15 text-gold-light shadow-[inset_0_0_0_1px_rgba(200,162,74,0.15)]'
          : 'border-border bg-night-2/50 text-parchment-2 hover:border-gold/50 hover:bg-night-3 hover:text-parchment'
      }`}
    >
      {Icon ? (
        <Icon size={16} className={`shrink-0 ${active ? 'text-gold-light' : 'text-gold/80'}`} />
      ) : null}
      <span className="truncate">{label}</span>
      <span
        className={`ml-auto shrink-0 rounded-full px-2 py-0.5 text-[11px] tabular-nums ${
          active ? 'bg-gold/20 text-gold-light' : 'bg-night text-mist'
        }`}
      >
        {count}
      </span>
    </button>
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
  const [showFilters, setShowFilters] = useState(false);

  const raceCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const item of items) {
      for (const id of item.groupIds) counts.set(id, (counts.get(id) ?? 0) + 1);
    }
    return counts;
  }, [items]);

  /** Only groups that have members in the archive, in taxonomy order. */
  const raceOptions = useMemo(
    () =>
      characterGroups
        .filter((group) => (raceCounts.get(group.id) ?? 0) > 0)
        .map((group) => ({
          id: group.id,
          label: group.shortLabel,
          fullLabel: group.label,
          count: raceCounts.get(group.id) ?? 0,
          icon: getGroupIcon(group.icon),
        })),
    [raceCounts],
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

  const activeRace =
    selected.race && raceOptions.some((option) => option.id === selected.race)
      ? selected.race
      : '';

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return items.filter((item) => {
      if (activeRace && !item.groupIds.includes(activeRace)) return false;
      if (selected.people && item.people !== selected.people) return false;
      if (selected.affiliation && item.affiliation !== selected.affiliation) return false;
      if (selected.role && !item.roles.includes(selected.role as never)) return false;
      if (selected.continuity && item.continuityLabel !== selected.continuity) return false;
      if (!q) return true;
      const haystack = [
        item.name,
        item.aliases.join(' '),
        item.titles.join(' '),
        item.people,
        item.groupLabel,
        item.affiliation,
      ]
        .join(' ')
        .toLowerCase();
      return q.split(/\s+/).every((token) => haystack.includes(token));
    });
    // The data has a considered editorial order (major figures and races first);
    // preserve it rather than imposing an alphabetical sort.
  }, [items, query, selected, activeRace]);

  /** Group by primary race whenever no single race is selected. */
  const groups = useMemo(() => {
    if (activeRace) return null;
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
  }, [filtered, activeRace]);

  const activeGroup = activeRace
    ? characterGroups.find((group) => group.id === activeRace)
    : undefined;
  const activeGroupCount = activeGroup ? (raceCounts.get(activeGroup.id) ?? 0) : items.length;
  const activeAdvancedFilters = ['people', 'affiliation', 'role', 'continuity'].filter(
    (key) => selected[key],
  );
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
        {/* Search and the optional refinement panel. */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search characters by name, title or people</span>
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search characters by name, title or people…"
              className="h-10 w-full rounded-lg border border-border bg-night pl-9 pr-10 text-sm text-parchment placeholder:text-mist focus:border-gold focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 inline-flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-mist transition-colors hover:bg-night-3 hover:text-gold-light"
              >
                <X size={14} />
              </button>
            )}
          </label>
          <button
            type="button"
            onClick={() => setShowFilters((v) => !v)}
            aria-expanded={showFilters}
            aria-controls="character-advanced-filters"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
          >
            <SlidersHorizontal size={16} />
            Refine
            {activeAdvancedFilters.length > 0 && (
              <span className="rounded-full bg-gold/20 px-1.5 py-0.5 text-[11px] text-gold-light">
                {activeAdvancedFilters.length}
              </span>
            )}
          </button>
        </div>

        {/* Race browsing — the primary way into the archive. */}
        <div className="mt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2
              id="race-filter-label"
              className="font-display text-[11px] uppercase tracking-[0.2em] text-gold"
            >
              Browse by race
            </h2>
            {activeRace && (
              <button
                type="button"
                onClick={() => update('race', '')}
                className="text-xs text-mist underline-offset-4 transition-colors hover:text-gold-light hover:underline"
              >
                Show all races
              </button>
            )}
          </div>
          <div
            role="group"
            aria-labelledby="race-filter-label"
            className="mt-2.5 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6"
          >
            <RaceButton
              active={!activeRace}
              label="All Races"
              count={items.length}
              icon={Users}
              onClick={() => update('race', '')}
            />
            {raceOptions.map((option) => (
              <RaceButton
                key={option.id}
                active={activeRace === option.id}
                label={option.label}
                count={option.count}
                icon={option.icon}
                onClick={() => update('race', option.id)}
              />
            ))}
          </div>
        </div>

        {activeGroup && (
          <div className="mt-4 flex flex-col gap-3 rounded-lg border border-gold/25 bg-night/40 px-3.5 py-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-relaxed text-parchment-2">
              <span className="font-display text-gold-light">{activeGroup.label}</span>
              {' — '}
              {activeGroup.tagline}
            </p>
            <Link
              href={`/races/${activeGroup.id}`}
              className="inline-flex shrink-0 items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-gold-light transition-colors hover:text-parchment"
            >
              Race overview
              <ArrowRight size={13} />
            </Link>
          </div>
        )}

        {showFilters && (
          <div
            id="character-advanced-filters"
            className="mt-5 grid gap-3 border-t border-border/60 pt-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            <FilterField label="People or culture">
              <select
                value={selected.people ?? ''}
                onChange={(e) => update('people', e.target.value)}
                className={controlClass}
              >
                <option value="">All peoples</option>
                {peopleOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Allegiance">
              <select
                value={selected.affiliation ?? ''}
                onChange={(e) => update('affiliation', e.target.value)}
                className={controlClass}
              >
                <option value="">All allegiances</option>
                {affiliationOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Role">
              <select
                value={selected.role ?? ''}
                onChange={(e) => update('role', e.target.value)}
                className={controlClass}
              >
                <option value="">All roles</option>
                {roleOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
            <FilterField label="Continuity">
              <select
                value={selected.continuity ?? ''}
                onChange={(e) => update('continuity', e.target.value)}
                className={controlClass}
              >
                <option value="">All sources</option>
                {continuityOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </FilterField>
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border/60 pt-3">
          <p className="text-xs text-mist" role="status" aria-live="polite">
            Showing <span className="font-semibold text-parchment">{filtered.length}</span> of{' '}
            {activeGroup ? activeGroupCount : items.length}{' '}
            {(activeGroup ? activeGroupCount : items.length) === 1 ? 'figure' : 'figures'}
            {activeGroup ? ` in ${activeGroup.shortLabel}` : ' across all races'}
            {query.trim() ? ` for “${query.trim()}”` : ''}
          </p>
          {hasFilters && (
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
            >
              <RotateCcw size={12} />
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          title="No characters found"
          message={
            activeGroup
              ? `No figures in ${activeGroup.shortLabel} match your search. Try another name, or return to all races.`
              : 'Try adjusting your search or filters to reveal more figures from Middle-earth.'
          }
          action={
            <button
              type="button"
              onClick={clearAll}
              className="inline-flex items-center gap-2 rounded-lg border border-gold/50 px-4 py-2 text-sm text-gold-light transition-colors hover:bg-gold/10"
            >
              <RotateCcw size={14} />
              Clear search and filters
            </button>
          }
        />
      ) : groups ? (
        <div>
          {groups.map((group) => (
            <section key={group.key} className="mb-10 last:mb-0">
              <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-border pb-2">
                <div className="flex flex-wrap items-baseline gap-3">
                  <h3 className="font-display text-sm uppercase tracking-[0.22em] text-gold">
                    {group.label}
                  </h3>
                  <span className="text-xs text-mist">
                    {group.items.length} {group.items.length === 1 ? 'figure' : 'figures'}
                  </span>
                </div>
                <Link
                  href={`/races/${group.key}`}
                  className="hidden shrink-0 text-xs text-mist transition-colors hover:text-gold-light sm:inline"
                >
                  View race →
                </Link>
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
