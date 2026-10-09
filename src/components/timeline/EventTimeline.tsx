'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Age, AgeId, DateCertainty, HistoricalEvent } from '@/types/content';
import EmptyState from '@/components/ui/EmptyState';

const certaintyMeta: Record<DateCertainty, { label: string; className: string }> = {
  exact: { label: 'Exact', className: 'border-emerald/60 text-emerald' },
  approximate: { label: 'Approximate', className: 'border-bronze/60 text-bronze' },
  disputed: { label: 'Disputed', className: 'border-morgul/60 text-morgul' },
  unknown: { label: 'Uncertain', className: 'border-border text-mist' },
};

/** Title-case a slug/identifier for display ("third-age" -> "Third Age"). */
function humanize(value: string): string {
  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default function EventTimeline({ events, ages }: { events: HistoricalEvent[]; ages: Age[] }) {
  const agesById = useMemo(() => new Map(ages.map((a) => [a.id, a])), [ages]);
  const eventTypes = useMemo(() => Array.from(new Set(events.map((e) => e.eventType))), [events]);
  const certainties = useMemo(() => Array.from(new Set(events.map((e) => e.date.certainty))), [events]);

  const [query, setQuery] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [certaintyFilter, setCertaintyFilter] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return events.filter((e) => {
      if (ageFilter && e.date.age !== ageFilter) return false;
      if (typeFilter && e.eventType !== typeFilter) return false;
      if (certaintyFilter && e.date.certainty !== certaintyFilter) return false;
      if (!q) return true;
      const haystack = `${e.name} ${e.summary}`.toLowerCase();
      return q.split(/\s+/).every((token) => haystack.includes(token));
    });
  }, [events, query, ageFilter, typeFilter, certaintyFilter]);

  // The input array is already chronological; grouping in order keeps Ages ordered.
  const groups = useMemo(() => {
    const out: { age: AgeId; events: HistoricalEvent[] }[] = [];
    for (const e of filtered) {
      const last = out[out.length - 1];
      if (last && last.age === e.date.age) last.events.push(e);
      else out.push({ age: e.date.age, events: [e] });
    }
    return out;
  }, [filtered]);

  const hasFilters = query.trim() !== '' || ageFilter !== '' || typeFilter !== '' || certaintyFilter !== '';

  function resetFilters() {
    setQuery('');
    setAgeFilter('');
    setTypeFilter('');
    setCertaintyFilter('');
  }

  const selectClass =
    'rounded-lg border border-border bg-night px-3 py-2 text-sm text-parchment focus:border-gold focus:outline-none';

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 rounded-xl border border-border bg-night-2/40 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search events</span>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name or summary…"
              className="w-full rounded-lg border border-border bg-night px-4 py-2.5 text-sm text-parchment placeholder:text-mist focus:border-gold focus:outline-none"
            />
          </label>
          <label className="flex items-center gap-2 text-xs text-mist">
            <span className="uppercase tracking-wider text-gold">Age</span>
            <select value={ageFilter} onChange={(e) => setAgeFilter(e.target.value)} className={selectClass}>
              <option value="">All</option>
              {ages.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-mist">
            <span className="uppercase tracking-wider text-gold">Type</span>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className={selectClass}>
              <option value="">All</option>
              {eventTypes.map((t) => (
                <option key={t} value={t}>
                  {humanize(t)}
                </option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 text-xs text-mist">
            <span className="uppercase tracking-wider text-gold">Certainty</span>
            <select
              value={certaintyFilter}
              onChange={(e) => setCertaintyFilter(e.target.value)}
              className={selectClass}
            >
              <option value="">All</option>
              {certainties.map((c) => (
                <option key={c} value={c}>
                  {certaintyMeta[c].label}
                </option>
              ))}
            </select>
          </label>
          {hasFilters && (
            <button
              type="button"
              onClick={resetFilters}
              className="rounded-lg border border-border px-3 py-2 text-xs text-parchment-2 transition-colors hover:border-gold hover:text-gold-light"
            >
              Reset filters
            </button>
          )}
        </div>
        <p className="text-xs text-mist" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? 'event' : 'events'}
          {hasFilters ? ' match your filters' : ''}
          {!hasFilters ? ' in the chronology' : ''}
        </p>
      </div>

      {groups.length === 0 ? (
        <EmptyState
          title="No events match"
          message="Try a different search or spelling, or clear the filters to see the full chronology."
          action={
            hasFilters ? (
              <button
                type="button"
                onClick={resetFilters}
                className="rounded-full border border-gold/50 px-5 py-2.5 font-display text-sm text-gold-light transition-colors hover:bg-gold/10"
              >
                Clear filters
              </button>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-12">
          {groups.map((group) => {
            const age = agesById.get(group.age);
            return (
              <section key={group.age} aria-label={age?.name ?? humanize(group.age)} className="scroll-mt-24">
                <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                  <div>
                    <h3 className="font-display text-xl text-parchment md:text-2xl">
                      {age?.name ?? humanize(group.age)}
                    </h3>
                    {age && (
                      <p className="font-display text-xs uppercase tracking-[0.2em] text-gold">{age.span}</p>
                    )}
                  </div>
                  <p className="text-xs text-mist">
                    {group.events.length} {group.events.length === 1 ? 'event' : 'events'}
                  </p>
                </div>
                <div className="rule-gold my-5" />
                <ol className="relative border-l border-border pl-6">
                  {group.events.map((event) => (
                    <li key={event.id} className="mb-7 last:mb-0">
                      <span
                        className="absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full border border-gold bg-night"
                        aria-hidden
                      />
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <p className="font-display text-xs uppercase tracking-wider text-gold">
                          {event.date.display}
                        </p>
                        <span
                          title={
                            event.date.note ??
                            `${certaintyMeta[event.date.certainty].label} dating for this event`
                          }
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-wider ${certaintyMeta[event.date.certainty].className}`}
                        >
                          {certaintyMeta[event.date.certainty].label}
                        </span>
                        <span className="rounded-full border border-border bg-night-2/60 px-2.5 py-0.5 text-[10px] uppercase tracking-wider text-parchment-2">
                          {humanize(event.eventType)}
                        </span>
                      </div>
                      <Link
                        href={`/history/${event.slug}`}
                        className="mt-1 block font-display text-lg text-parchment transition-colors hover:text-gold-light"
                      >
                        {event.name}
                      </Link>
                      <p className="mt-1 max-w-3xl text-sm leading-relaxed text-mist">{event.summary}</p>
                    </li>
                  ))}
                </ol>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}