import type { Continuity } from '@/types/content';
import { characterById } from '@/data/characters';
import { locationById } from '@/data/locations';
import { artifacts } from '@/data/artifacts';
import { eventById } from '@/data/events';
import { books } from '@/data/books';
import { themes } from '@/data/themes';
import { peoples } from '@/data/peoples';
import { sources, getSources } from '@/data/sources';

export type EntityType =
  | 'character'
  | 'location'
  | 'artifact'
  | 'event'
  | 'book'
  | 'theme'
  | 'people';

export interface EntityRef {
  id: string;
  type: EntityType;
  slug: string;
  name: string;
  summary: string;
  image?: string;
  href: string;
}

export const entityTypeMeta: Record<EntityType, { label: string; plural: string; base: string }> = {
  character: { label: 'Character', plural: 'Characters', base: 'characters' },
  location: { label: 'Location', plural: 'Locations', base: 'locations' },
  artifact: { label: 'Artifact', plural: 'Artifacts', base: 'artifacts' },
  event: { label: 'Event', plural: 'History', base: 'history' },
  book: { label: 'Book', plural: 'Library', base: 'library' },
  theme: { label: 'Theme', plural: 'Themes', base: 'themes' },
  people: { label: 'People', plural: 'Peoples', base: 'peoples' },
};

export function hrefFor(type: EntityType, slug: string): string {
  return `/${entityTypeMeta[type].base}/${slug}`;
}

export function refFrom(type: EntityType, entity: {
  id: string;
  slug: string;
  name: string;
  summary: string;
  image?: string;
}): EntityRef {
  return {
    id: entity.id,
    type,
    slug: entity.slug,
    name: entity.name,
    summary: entity.summary,
    image: entity.image,
    href: hrefFor(type, entity.slug),
  };
}

const lookup: Record<EntityType, (id: string) => { id: string; slug: string; name: string; summary: string; image?: string } | undefined> = {
  character: (id) => characterById.get(id),
  location: (id) => locationById.get(id),
  artifact: (id) => artifacts.find((a) => a.id === id),
  event: (id) => eventById.get(id),
  book: (id) => books.find((b) => b.id === id),
  theme: (id) => themes.find((t) => t.id === id),
  people: (id) => peoples.find((p) => p.id === id),
};

export function resolveRef(type: EntityType, id: string): EntityRef | undefined {
  const entity = lookup[type](id);
  return entity ? refFrom(type, entity) : undefined;
}

/** Resolve a mixed list of id references against every entity type. */
export function resolveAny(id: string): EntityRef | undefined {
  for (const type of Object.keys(lookup) as EntityType[]) {
    const ref = resolveRef(type, id);
    if (ref) return ref;
  }
  return undefined;
}

export function resolveMany(ids: string[] | undefined): EntityRef[] {
  if (!ids) return [];
  return ids.map(resolveAny).filter((r): r is EntityRef => Boolean(r));
}

export function resolveType(ids: string[] | undefined, type: EntityType): EntityRef[] {
  if (!ids) return [];
  return ids.map((id) => resolveRef(type, id)).filter((r): r is EntityRef => Boolean(r));
}

export const continuityMeta: Record<Continuity, { label: string; description: string; tone: string }> = {
  'tolkien-texts': {
    label: 'Tolkien’s texts',
    description: 'Supported by the narratives published in Tolkien’s lifetime.',
    tone: 'canon',
  },
  supplementary: {
    label: 'Supplementary writings',
    description: 'From posthumously published works, notes, drafts or appendices.',
    tone: 'supplementary',
  },
  adaptation: {
    label: 'Adaptation',
    description: 'Introduced by a film or television production, not by Tolkien.',
    tone: 'adaptation',
  },
  interpretation: {
    label: 'Interpretation',
    description: 'Reasoned reader analysis rather than an authorial statement.',
    tone: 'interpretation',
  },
};

export { getSources, sources };
