import type { Metadata } from 'next';
import Link from 'next/link';
import { Search, Star } from 'lucide-react';
import type { AgeId, Continuity } from '@/types/content';
import { entityTypeMeta, continuityMeta, type EntityType } from '@/lib/content';
import { ages } from '@/data/sources';
import { searchLore } from '@/lib/search';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import SectionHeading from '@/components/ui/SectionHeading';
import EmptyState from '@/components/ui/EmptyState';
import RelatedGrid from '@/components/entity/RelatedGrid';

export const metadata: Metadata = {
  title: 'Search the archive',
  description:
    'Search every character, place, artifact, event, book, theme and people across The Legend of Middle-earth archive, and narrow results by type, age or continuity.',
  alternates: { canonical: '/search' },
};

const typeOrder: EntityType[] = ['character', 'location', 'artifact', 'event', 'book', 'theme', 'people'];

const continuityOrder = Object.keys(continuityMeta) as Continuity[];

const popularSearches = ['Imladris', 'Isildur', 'The One Ring', 'Pelennor', 'Númenor', 'Pity and mercy'];

/** Current filter state derived from the query string. */
interface SearchFiltersState {
  type?: string;
  age?: string;
  continuity?: string;
}

type FilterPatch = Partial<Record<'type' | 'age' | 'continuity', string | null>>;

function mergeFilters(current: SearchFiltersState, patch: FilterPatch): SearchFiltersState {
  const next: SearchFiltersState = { ...current };
  if (patch.type === null) delete next.type;
  else if (patch.type !== undefined) next.type = patch.type;
  if (patch.age === null) delete next.age;
  else if (patch.age !== undefined) next.age = patch.age;
  if (patch.continuity === null) delete next.continuity;
  else if (patch.continuity !== undefined) next.continuity = patch.continuity;
  return next;
}

/** Build a /search link that keeps the query and the other currently selected filters. */
function filterHref(query: string, current: SearchFiltersState, patch: FilterPatch): string {
  const merged = mergeFilters(current, patch);
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (merged.type) params.set('type', merged.type);
  if (merged.age) params.set('age', merged.age);
  if (merged.continuity) params.set('continuity', merged.continuity);
  const qs = params.toString();
  return qs ? `/search?${qs}` : '/search';
}

function chipClass(active: boolean): string {
  return `inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs transition-colors ${
    active
      ? 'border-gold bg-gold/5 text-gold-light'
      : 'border-border text-parchment-2 hover:border-gold hover:text-gold-light'
  }`;
}

function paramString(value: string | string[] | undefined): string {
  return typeof value === 'string' ? value : '';
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const q = paramString(params.q);
  const query = q.trim();

  const typeParam = paramString(params.type);
  const ageParam = paramString(params.age);
  const continuityParam = paramString(params.continuity);

  const selectedType: EntityType | undefined = (typeOrder as string[]).includes(typeParam)
    ? (typeParam as EntityType)
    : undefined;
  const selectedAge: AgeId | undefined = ages.some((a) => a.id === ageParam)
    ? (ageParam as AgeId)
    : undefined;
  const selectedContinuity: Continuity | undefined = continuityOrder.includes(
    continuityParam as Continuity,
  )
    ? (continuityParam as Continuity)
    : undefined;

  const current: SearchFiltersState = {
    ...(selectedType ? { type: selectedType } : {}),
    ...(selectedAge ? { age: selectedAge } : {}),
    ...(selectedContinuity ? { continuity: selectedContinuity } : {}),
  };

  const results = query
    ? searchLore(
        query,
        {
          types: selectedType ? [selectedType] : undefined,
          ages: selectedAge ? [selectedAge] : undefined,
          continuities: selectedContinuity ? [selectedContinuity] : undefined,
        },
        200,
      )
    : [];

  const groups = typeOrder
    .map((type) => ({ type, docs: results.filter((r) => r.type === type) }))
    .filter((g) => g.docs.length > 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12">
      <Breadcrumbs items={[{ label: 'Search' }]} />
      <SectionHeading
        eyebrow="Global search"
        title="Search the archive"
        intro="Search every character, place, artifact, event, book, theme and people across the archive. Every filter is a regular link, so a refined search can be bookmarked and shared."
      />

      <form action="/search" method="get" role="search" className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="search-q" className="sr-only">
            Search the archive
          </label>
          <input
            id="search-q"
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Search characters, places, artifacts, history, books…"
            className="w-full rounded-full border border-border bg-surface/60 px-5 py-3 text-base text-parchment placeholder:text-mist focus:border-gold focus:outline-none"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-gold px-6 py-3 font-display text-sm text-ink transition-colors hover:bg-gold-light"
          >
            <Search size={16} aria-hidden />
            Search
          </button>
        </div>
      </form>

      <div className="mt-8 space-y-6" aria-label="Filter search results">
        <div role="group" aria-label="Filter by type">
          <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-gold">Type</p>
          <div className="flex flex-wrap gap-2">
            <Link href={filterHref(query, current, { type: null })} className={chipClass(!selectedType)}>
              All
            </Link>
            {typeOrder.map((t) => {
              const active = selectedType === t;
              return (
                <Link
                  key={t}
                  href={filterHref(query, current, { type: active ? null : t })}
                  className={chipClass(active)}
                >
                  {entityTypeMeta[t].label}
                </Link>
              );
            })}
          </div>
        </div>

        <div role="group" aria-label="Filter by age">
          <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-gold">Age</p>
          <div className="flex flex-wrap gap-2">
            <Link href={filterHref(query, current, { age: null })} className={chipClass(!selectedAge)}>
              Any age
            </Link>
            {ages.map((a) => {
              const active = selectedAge === a.id;
              return (
                <Link
                  key={a.id}
                  href={filterHref(query, current, { age: active ? null : a.id })}
                  className={chipClass(active)}
                >
                  {a.name}
                </Link>
              );
            })}
          </div>
        </div>

        <div role="group" aria-label="Filter by continuity">
          <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-gold">Continuity</p>
          <div className="flex flex-wrap gap-2">
            <Link
              href={filterHref(query, current, { continuity: null })}
              className={chipClass(!selectedContinuity)}
            >
              Any continuity
            </Link>
            {continuityOrder.map((c) => {
              const active = selectedContinuity === c;
              return (
                <Link
                  key={c}
                  href={filterHref(query, current, { continuity: active ? null : c })}
                  className={chipClass(active)}
                >
                  {continuityMeta[c].label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {!query ? (
        <div className="mt-8 panel-soft px-6 py-8">
          <p className="mb-2 font-display text-xs uppercase tracking-[0.2em] text-gold">
            Popular searches
          </p>
          <p className="mb-4 text-sm text-mist">
            Not sure where to begin? Try a name, an alternate name, or a place from these well-travelled
            paths:
          </p>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className={chipClass(false)}
              >
                <Star size={12} className="text-gold" aria-hidden />
                {s}
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <>
          <h2 className="mt-10 font-display text-2xl text-parchment">
            {results.length} {results.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
          </h2>
          <div className="rule-gold mt-4 mb-8" />

          {results.length === 0 ? (
            <EmptyState
              title="No entries match"
              message={`Nothing in the archive matches “${query}” with the current filters. Try a different spelling, an alternate name, or clear the filters.`}
              action={
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 font-display text-sm text-gold-light transition-colors hover:bg-gold/10"
                >
                  Clear filters
                </Link>
              }
            />
          ) : (
            <div className="space-y-12">
              {groups.map(({ type, docs }) => (
                <section key={type} aria-labelledby={`search-group-${type}`}>
                  <h3
                    id={`search-group-${type}`}
                    className="mb-4 font-display text-xl text-parchment"
                  >
                    {entityTypeMeta[type].plural}{' '}
                    <span className="text-mist">· {docs.length}</span>
                  </h3>
                  <RelatedGrid entities={docs} />
                </section>
              ))}
            </div>
          )}

          <p className="mt-10 text-xs text-mist">
            <kbd className="rounded border border-border px-1.5 py-0.5 text-mist">⌘K</kbd>{' '}
            opens the global search dialog from anywhere via the header.
          </p>
        </>
      )}
    </div>
  );
}