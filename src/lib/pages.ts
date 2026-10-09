import type { Continuity, AgeId } from '@/types/content';
import {
  continuityMeta,
  resolveMany,
  refFrom,
  type EntityRef,
  type EntityType,
} from './content';
import { ages, ageById } from '@/data/sources';
import type { DirectoryItem, FacetDef } from '@/components/directory/Directory';

export type { DirectoryItem, FacetDef };

/** Minimal shape every entity shares for card/listing purposes. */
export interface BaseLike {
  id: string;
  slug: string;
  name: string;
  summary: string;
  image?: string;
}

/** Build a directory item with precomputed facet values for client-side filtering. */
export function item(
  type: EntityType,
  entity: BaseLike,
  facets: Record<string, string>,
  keywords?: string,
): DirectoryItem {
  return { ...refFrom(type, entity), facets, keywords };
}

export function toRef(type: EntityType, entity: BaseLike): EntityRef {
  return refFrom(type, entity);
}

export function related(ids: string[] | undefined): EntityRef[] {
  return resolveMany(ids);
}

export function continuityLabel(continuity: Continuity): string {
  return continuityMeta[continuity].label;
}

/** Facet builder that always includes a continuity facet. */
export function baseFacets(continuity: Continuity, extra: Record<string, string> = {}): Record<string, string> {
  return { continuity: continuityLabel(continuity), ...extra };
}

export const continuityFacet: FacetDef = {
  key: 'continuity',
  label: 'Continuity',
  options: [
    { value: 'Tolkien’s texts', label: 'Tolkien’s texts' },
    { value: 'Supplementary writings', label: 'Supplementary writings' },
    { value: 'Adaptation', label: 'Adaptation' },
    { value: 'Interpretation', label: 'Interpretation' },
  ],
};

export const ageFacet: FacetDef = {
  key: 'age',
  label: 'Age',
  options: ages.map((a) => ({ value: a.name, label: a.name })),
};

export function ageName(id: AgeId): string {
  return ageById.get(id)?.name ?? id;
}

export function ageSummary(id: AgeId): string {
  return ageById.get(id)?.summary ?? '';
}

/** Title-case a slug/identifier for display ("third-age" -> "Third Age"). */
export function humanize(value: string): string {
  return value
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

/** Build an ordered list of unique refs, tolerating duplicates. */
export function uniqueRefs(refs: EntityRef[]): EntityRef[] {
  const seen = new Set<string>();
  const out: EntityRef[] = [];
  for (const ref of refs) {
    const key = `${ref.type}:${ref.id}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(ref);
  }
  return out;
}

export { ages };
