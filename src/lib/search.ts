import type { AgeId, Continuity } from '@/types/content';
import { characters } from '@/data/characters';
import { locations } from '@/data/locations';
import { artifacts } from '@/data/artifacts';
import { events } from '@/data/events';
import { books } from '@/data/books';
import { themes } from '@/data/themes';
import { peoples } from '@/data/peoples';
import { hrefFor, type EntityType } from './content';

export interface SearchDoc {
  id: string;
  type: EntityType;
  slug: string;
  name: string;
  aliases: string[];
  summary: string;
  href: string;
  continuity: Continuity;
  tags: string[];
  age?: AgeId;
  image?: string;
}

function buildIndex(): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const c of characters) {
    docs.push({ id: c.id, type: 'character', slug: c.slug, name: c.name, aliases: c.aliases ?? [], summary: c.summary, href: hrefFor('character', c.slug), continuity: c.continuity, tags: [...(c.tags ?? []), c.race], image: c.image });
  }
  for (const l of locations) {
    docs.push({ id: l.id, type: 'location', slug: l.slug, name: l.name, aliases: l.aliases ?? [], summary: l.summary, href: hrefFor('location', l.slug), continuity: l.continuity, tags: [...(l.tags ?? []), l.type, l.region ?? ''].filter(Boolean), age: l.age, image: l.image });
  }
  for (const a of artifacts) {
    docs.push({ id: a.id, type: 'artifact', slug: a.slug, name: a.name, aliases: a.aliases ?? [], summary: a.summary, href: hrefFor('artifact', a.slug), continuity: a.continuity, tags: [...(a.tags ?? []), a.type], image: a.image });
  }
  for (const e of events) {
    docs.push({ id: e.id, type: 'event', slug: e.slug, name: e.name, aliases: e.aliases ?? [], summary: e.summary, href: hrefFor('event', e.slug), continuity: e.continuity, tags: [...(e.tags ?? []), e.eventType], age: e.date.age });
  }
  for (const b of books) {
    docs.push({ id: b.id, type: 'book', slug: b.slug, name: b.name, aliases: b.aliases ?? [], summary: b.summary, href: hrefFor('book', b.slug), continuity: b.continuity, tags: [...(b.tags ?? []), b.workType], image: b.image });
  }
  for (const t of themes) {
    docs.push({ id: t.id, type: 'theme', slug: t.slug, name: t.name, aliases: t.aliases ?? [], summary: t.summary, href: hrefFor('theme', t.slug), continuity: t.continuity, tags: t.tags ?? [] });
  }
  for (const p of peoples) {
    docs.push({ id: p.id, type: 'people', slug: p.slug, name: p.name, aliases: p.aliases ?? [], summary: p.summary, href: hrefFor('people', p.slug), continuity: p.continuity, tags: [...(p.tags ?? []), p.kind] });
  }

  return docs;
}

export const searchIndex: SearchDoc[] = buildIndex();

export interface SearchFilters {
  types?: EntityType[];
  ages?: AgeId[];
  continuities?: Continuity[];
}

function score(doc: SearchDoc, q: string): number {
  const name = doc.name.toLowerCase();
  const aliases = doc.aliases.map((a) => a.toLowerCase());
  let s = 0;

  if (name === q) s += 120;
  else if (name.startsWith(q)) s += 80;
  else if (name.includes(q)) s += 50;

  for (const a of aliases) {
    if (a === q) s += 90;
    else if (a.startsWith(q)) s += 55;
    else if (a.includes(q)) s += 35;
  }

  if (doc.summary.toLowerCase().includes(q)) s += 12;
  if (doc.tags.some((t) => t.toLowerCase().includes(q))) s += 8;

  // Small boost so named things outrank incidental matches.
  if (doc.type === 'character' || doc.type === 'location') s += 3;
  return s;
}

export function searchLore(query: string, filters: SearchFilters = {}, limit = 30): SearchDoc[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  // Support multi-word queries: every token should match somewhere.
  const tokens = q.split(/\s+/).filter(Boolean);

  return searchIndex
    .filter((doc) => {
      if (filters.types?.length && !filters.types.includes(doc.type)) return false;
      if (filters.ages?.length && (!doc.age || !filters.ages.includes(doc.age))) return false;
      if (filters.continuities?.length && !filters.continuities.includes(doc.continuity)) return false;
      return true;
    })
    .map((doc) => {
      let total = 0;
      for (const token of tokens) {
        const sc = score(doc, token);
        if (sc === 0) return { doc, total: -1 };
        total += sc;
      }
      return { doc, total };
    })
    .filter((r) => r.total > 0)
    .sort((a, b) => b.total - a.total)
    .slice(0, limit)
    .map((r) => r.doc);
}

/** Lightweight suggestion list for the header autocomplete. */
export function suggest(query: string, limit = 8): SearchDoc[] {
  return searchLore(query, {}, limit);
}
